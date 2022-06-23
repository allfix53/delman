import React, { useRef } from 'react'
import { AutoSizer } from 'react-virtualized'
import { VariableSizeGrid as Grid } from 'react-window'
import Draggable from 'react-draggable'
import { FaGripLinesVertical } from 'react-icons/fa'
import { IoIosArrowDroprightCircle, IoIosCloseCircle } from 'react-icons/io'
import { Box } from '@chakra-ui/react'

class DefaultTable extends React.Component {
  constructor(props) {
    super(props)
    this.gridRef = React.createRef()
  }

  // get column name
  columns = Object.keys(this.props.data[0])

  // column width
  getInitialColumnWidths = () => {
    return Array(this.columns.length).fill(250)
  }
  calcHeaderWidth = (cols) => {
    let width = 0
    if (cols) {
      cols.map((w) => (width += w))
    } else {
      this.getInitialColumnWidths().map((w) => {
        width += w
      })
    }
    return width
  }

  state = {
    columnWidth: this.getInitialColumnWidths(),
    headerWidth: this.calcHeaderWidth(),
    openedShowMore: null /** (x,y) of grid */,
    rowOpenedShowMore: null /** row number show more */,
  }

  Cell = ({ columnIndex, rowIndex, style }) => {
    const refItem = React.useRef()
    const content = this.props.data[rowIndex][this.columns[columnIndex]]
    return (
      <>
        <div
          style={{
            ...style,
            marginTop: '30px',
            background:
              this.state.rowOpenedShowMore == rowIndex ? `cyan` : `white`,
          }}
          className="main-grid"
          ref={refItem}
        >
          {content}
          {/* Icon to open show more */}
          {content.length * 12 > this.state.columnWidth[columnIndex] && (
            <>
              {/* overflow blocker */}
              <Box
                position="absolute"
                top={0}
                right={0}
                height={30}
                bgGradient="linear(to-r, rgba(255,255,255,0), white, white)"
                w="50px"
              />
              <IoIosArrowDroprightCircle
                size="20px"
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  color: '#aaa',
                  cursor: 'pointer',
                }}
                onClick={() =>
                  this.setState({
                    openedShowMore: `${columnIndex},${rowIndex}`,
                    rowOpenedShowMore: rowIndex,
                  })
                }
              />
            </>
          )}
        </div>

        {this.state.openedShowMore == `${columnIndex},${rowIndex}` && (
          <div
            style={{
              ...style,
              height: '80px',
              background: 'white',
              border: 'cyan 1px solid',
              padding: '5px',
              zIndex: 999,
              fontWeight: 'bold',
              marginTop: '30px',
            }}
          >
            {/* Icon to close show more */}
            <Box
              bg="gray"
              position="absolute"
              top={-13}
              right={-13}
              rounded="full"
            >
              <IoIosCloseCircle
                style={{
                  color: 'whitesmoke',
                  cursor: 'pointer',
                }}
                size="24px"
                onClick={() =>
                  this.setState({
                    openedShowMore: null,
                    rowOpenedShowMore: null,
                  })
                }
              />
            </Box>
            {this.props.data[rowIndex][this.columns[columnIndex]]}
          </div>
        )}
      </>
    )
  }

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            ref={this.gridRef}
            columnCount={this.columns.length}
            columnWidth={(index) => this.state.columnWidth[index]}
            height={height}
            rowCount={this.props.data.length}
            rowHeight={() => 30}
            width={width}
            innerElementType={({ children }) => (
              <Box
                fontFamily="mono"
                className="grid-container"
                fontSize="sm"
                style={{
                  height: this.props.data.length * 30,
                }}
              >
                <div
                  className="header"
                  style={{ width: this.state.headerWidth }}
                >
                  {this.columns.map((colName, key) => (
                    <div
                      className="col"
                      key={`colHeader-${key}`}
                      style={{ width: this.state.columnWidth[key] }}
                    >
                      {colName}
                      <Draggable
                        axis="x"
                        onDrag={(event, { deltaX, deltaY }) => {
                          let prevWidths = this.state.columnWidth
                          prevWidths[key] = prevWidths[key] + deltaX
                        }}
                        onStop={(event, drag) => {
                          let prevWidths = this.state.columnWidth
                          const newWidth = prevWidths[key] + drag.x

                          prevWidths[key] =
                            newWidth > 300
                              ? 300
                              : newWidth < 100
                              ? 100
                              : newWidth
                          this.setState({
                            columnWidth: prevWidths,
                            headerWidth: this.calcHeaderWidth(prevWidths),
                          })

                          this.gridRef.current.resetAfterColumnIndex(key)
                        }}
                      >
                        <div className="hadle grid-draggable-handler">
                          <FaGripLinesVertical />
                        </div>
                      </Draggable>
                    </div>
                  ))}
                </div>
                <div>{children}</div>
              </Box>
            )}
          >
            {this.Cell}
          </Grid>
        )}
      </AutoSizer>
    )
  }
}

export default DefaultTable

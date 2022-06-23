import { useState, useRef } from 'react'
import { AutoSizer } from 'react-virtualized'
import { VariableSizeGrid as Grid } from 'react-window'
import Draggable from 'react-draggable'
import { CgMergeHorizontal } from 'react-icons/cg'

export default function RWSalesTableNew({ data }) {
  const [widthCol1, setWidthCol1] = useState(200)
  const columns = Object.keys(data[0])
  // init column widths = default 200px
  const [columnWidths, setColumnWidths] = useState(
    Array(columns.length).fill(200)
  )

  // add first row blank
  data.unshift('')

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div style={{ ...style }}>{data[rowIndex][columns[columnIndex]]}</div>
  )

  const ref = useRef()

  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            ref={ref}
            columnCount={columns.length}
            columnWidth={(index) => widthCol1}
            height={height}
            rowCount={data.length}
            rowHeight={() => 50}
            width={width}
            innerElementType={({ children }) => (
              <div
                className="grid-container"
                style={{
                  width: columnWidths.reduce((col, a) => col + a, 0),
                  height: data.length * 50,
                }}
              >
                <div className="header">
                  {columns.map((colName, key) => (
                    <div
                      className="col"
                      key={`colHeader-${key}`}
                      style={{ width: columnWidths[key] }}
                    >
                      {colName}
                      <Draggable
                        axis="x"
                        onDrag={(event, { deltaX, deltaY }) => {
                          let newColumnWidths = [...columnWidths]
                          newColumnWidths[key] = columnWidths[key] + deltaX
                          setColumnWidths(newColumnWidths)
                          console.log(newColumnWidths[key])
                          console.log(newColumnWidths)
                        }}
                      >
                        <div className="hadle grid-draggable-handler">⋮</div>
                      </Draggable>
                    </div>
                  ))}
                </div>
                <div>{children}</div>
              </div>
            )}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </>
  )
}

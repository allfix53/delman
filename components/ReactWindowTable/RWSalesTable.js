import { Table, Column, AutoSizer } from 'react-virtualized'
import Draggable from 'react-draggable'
import { useState } from 'react'

export default function RWSalesTable({ lists }) {
  const [w, setW] = useState(100)
  const MIN_TABLE_WIDTH = 2500

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          width={2000}
          height={height}
          headerHeight={30}
          rowHeight={30}
          rowCount={lists.length}
          rowGetter={({ index }) => lists[index]}
        >
          <Column
            label="id"
            dataKey="id"
            width={w}
            headerRenderer={({ label }) => {
              return (
                <>
                  <div
                    style={{ textTransform: 'lowercase' }}
                    className="ReactVirtualized__Table__headerTruncatedText"
                  >
                    {label}
                  </div>
                  <Draggable
                    axis="x"
                    defaultClassName="DragHandle"
                    defaultClassNameDragging="DragHandleActive"
                    onDrag={(event, { deltaX }) =>
                      setW((prev) => prev + deltaX)
                    }
                    position={{ x: 0 }}
                    zIndex={999}
                  >
                    <span className="DragHandleIcon">⋮</span>
                  </Draggable>
                </>
              )
            }}
          />
          <Column label="name" dataKey="name" width={150} />
          <Column label="sales_id" dataKey="sales_id" width={150} />
          <Column label="item_id" dataKey="item_id" width={50} />
          <Column label="qty" dataKey="qty" width={50} />
          <Column label="consumen_name" dataKey="consumen_name" width={300} />
          <Column
            label="transaction_date"
            dataKey="transaction_date"
            width={300}
          />
        </Table>
      )}
    </AutoSizer>
  )
}

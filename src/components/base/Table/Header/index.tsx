import React from 'react';
import { RowProps } from '../interface';
import TableColumn from './columns';
import ResizeObserver from 'rc-resize-observer';
import { useSafeState } from 'ahooks';

const TableRow: React.FC<RowProps> = (props) => {
  const { columns } = props;
  const [outerOffset, setOuterOffset] = useSafeState({ width: null });

  return (
    <ResizeObserver onResize={setOuterOffset}>
      <thead>
        <tr className="table-th">
          {columns?.map((colItem, colIndex) => (
            <TableColumn
              className="api-post-table-td-border"
              key={colIndex}
              colItem={colItem}
              colIndex={colIndex}
              outerWidth={outerOffset?.width}
            />
          ))}
        </tr>
      </thead>
    </ResizeObserver>
  );
};

export default TableRow;

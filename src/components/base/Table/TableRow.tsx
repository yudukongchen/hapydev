import React from 'react';
import TableColumn from './TableColumn';
import { RowProps } from './interface';
import { Checkbox } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TableRow: React.FC<RowProps> = (props) => {
  const { onSelectChange, rowSelection, rowData, columns, rowKey, rowIndex, ...restProps } = props;

  const { setNodeRef, listeners, transform, transition, attributes, isSorting } = useSortable({
    id: `${rowIndex}`,
  });
  const styles = {
    transform: CSS.Transform.toString(transform),
    ...(isSorting ? { transition } : {}),
  };

  const handleSelectRows = (status) => {
    if (typeof onSelectChange === 'function') {
      onSelectChange(status, rowKey);
    }
  };

  const renderSelection = (selection: typeof rowSelection, rowKey: string) => {
    const checkStatus = selection?.selectedRowKeys?.includes(rowKey) ? true : false;
    if (selection?.type === 'checkbox') {
      return (
        <td className="td-selection">
          <Checkbox checked={checkStatus} onChange={handleSelectRows} />
        </td>
      );
    }
    return null;
  };
  return (
    <tr className="table-tr" ref={setNodeRef} style={styles} {...restProps}>
      {rowSelection !== undefined && renderSelection(rowSelection, rowKey)}
      {columns?.map((colItem, colIndex) => (
        <TableColumn
          key={colIndex}
          {...colItem}
          rowIndex={rowIndex}
          rowData={rowData}
          attributes={attributes}
          listeners={listeners}
        />
      ))}
    </tr>
  );
};

export default React.memo(TableRow);

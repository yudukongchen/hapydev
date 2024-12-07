import React, { useContext } from 'react';
import cn from 'classnames';
import { ColumnProps } from './interface';
import { isFunction, isObject } from 'lodash';
import { ColumnContext } from './contexts';

const TableColumn: React.FC<ColumnProps> = (props) => {
  const {
    bodyCellStyle,
    className,
    align,
    render,
    element,
    rowData,
    dataIndex,
    rowIndex,
    attributes,
    listeners,
  } = props;

  const { onFiledChange, onDeleteRow } = useContext(ColumnContext);
  const content = rowData[dataIndex];
  const handleItemChange = (newVal: any, coverRowData = false) => {
    const newData = {
      ...rowData,
      [dataIndex]: newVal,
    };
    if (!isFunction(onFiledChange)) {
      return;
    }
    if (coverRowData === true) {
      onFiledChange(newVal, rowIndex);
      return;
    }
    onFiledChange(newData, rowIndex);
  };

  const handleDeleteRow = () => {
    if (!isFunction(onDeleteRow)) {
      debugger;
      return;
    }
    onDeleteRow(rowIndex);
  };

  const renderContent = (render: any, element: React.ReactNode, content: any) => {
    if (isFunction(render)) {
      return render(content, rowData, rowIndex, dataIndex);
    } else if (isObject(element)) {
      const TableItem: any = element;
      return (
        <TableItem
          value={content}
          rowData={rowData}
          onDeleteRow={handleDeleteRow}
          onChange={handleItemChange}
          attributes={attributes}
          listeners={listeners}
        />
      );
    }
    return content;
  };

  return (
    <td style={{ ...bodyCellStyle, textAlign: align }} className={cn(className, 'table-td')}>
      <div className="table-cell">{renderContent(render, element, content)}</div>
    </td>
  );
};

export default React.memo(TableColumn);

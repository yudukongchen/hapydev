import React, { useRef, useMemo } from 'react';
import cn from 'classnames';
import { cloneDeep } from 'lodash';
import TableRow from './TableRow';
import { TableContext, ColumnContext } from './contexts';
import Header from './Header';
import { TableProps } from './interface';
import { TableWrapper } from './style';
import { theme } from 'antd';

const Table: React.FC<TableProps> = (props) => {
  const {
    data,
    style,
    className,
    columns,
    showHeader = true,
    noDataElement,
    layouts,
    rowKey,
    onLayoutsChange = () => undefined,
    renderRow = () => undefined,
    onFiledChange,
    onDeleteRow,
  } = props;

  const refTable = useRef<any>(null);
  const { token } = theme.useToken();

  const handleLayoutChange = (_ayout: any, index: number) => {
    const newLayout: any = layouts !== undefined ? cloneDeep(layouts) : {};
    newLayout[index] = _ayout;
    onLayoutsChange(newLayout);
  };

  if (data === undefined) {
    return null;
  }

  const renderRowItem = (rowData: any, index: number) => {
    return (
      <TableRow
        key={`${index}`}
        rowKey={rowKey === undefined ? rowKey : rowData?.[rowKey]}
        rowIndex={index}
        rowData={rowData}
        columns={columns}
      />
    );
  };

  const columnContext = useMemo(() => {
    return {
      onFiledChange,
      onDeleteRow,
    };
  }, [onFiledChange, onDeleteRow]);

  return (
    <TableContext.Provider
      value={{
        refTable,
        layouts,
        handleLayoutChange,
      }}
    >
      <ColumnContext.Provider value={columnContext}>
        <TableWrapper token={token} style={style} className={className}>
          <table
            ref={refTable}
            className={cn({
              table: true,
              'table-border': true,
            })}
          >
            {showHeader === true && <Header columns={columns} />}
            {data.length === 0 ? (
              noDataElement
            ) : 'renderRow' in props && typeof renderRow === 'function' ? (
              <tbody>{renderRow(data, renderRowItem)}</tbody>
            ) : (
              <tbody>
                {data.map((rowData, index) =>
                  React.cloneElement(<>{renderRowItem(rowData, index)}</>, {
                    key: index,
                  })
                )}
              </tbody>
            )}
          </table>
        </TableWrapper>
      </ColumnContext.Provider>
    </TableContext.Provider>
  );
};

export default Table;

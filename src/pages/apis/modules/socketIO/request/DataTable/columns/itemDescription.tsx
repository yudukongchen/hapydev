import { Input, Space } from 'antd';
import { columnWrapper } from './style';
import ItemDelete from './itemDelete';

export const ItemDescription = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={columnWrapper}>
      <Input
        {...resetProps}
        spellCheck={false}
        placeholder=""
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <ItemDelete onDeleteRow={onDeleteRow} />
    </Space.Compact>
  );
};

export default ItemDescription;

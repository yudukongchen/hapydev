import { Input, Space } from 'antd';
import { columnWrapper } from './style';
import ItemDelete from './itemDelete';

export const ItemDescription = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={columnWrapper}>
      <Input
        {...resetProps}
        placeholder=""
        value={value}
        spellCheck={false}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <ItemDelete onDeleteRow={onDeleteRow} />
    </Space.Compact>
  );
};

export default ItemDescription;

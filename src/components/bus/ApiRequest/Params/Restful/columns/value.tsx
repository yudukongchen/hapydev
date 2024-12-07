import { Input, Space } from 'antd';
import { columnWrapper } from './style';

export const ItemValue = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={columnWrapper}>
      <Input
        {...resetProps}
        placeholder=""
        spellCheck={false}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Space.Compact>
  );
};

export default ItemValue;

import { Input, Space } from 'antd';
import { columnWrapper } from './style';

export const ItemValue = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={columnWrapper}>
      <Input
        spellCheck={false}
        placeholder=""
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        {...resetProps}
      />
    </Space.Compact>
  );
};

export default ItemValue;

import { Input, Space } from 'antd';
import { columnWrapper } from './style';

export const ItemName = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={columnWrapper}>
      <Input {...resetProps} placeholder="" readOnly disabled spellCheck={false} value={value} />
    </Space.Compact>
  );
};

export default ItemName;

import { Input, Space } from 'antd';
import { defaultColumnWrapper } from '@components/themes/columns';
import ItemDelete from './itemDelete';

export const ItemDescription = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={defaultColumnWrapper}>
      <Input
        {...resetProps}
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

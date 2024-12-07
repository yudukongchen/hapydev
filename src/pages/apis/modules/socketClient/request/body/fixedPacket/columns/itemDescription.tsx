import { Input, Space } from 'antd';
import ItemDelete from './itemDelete';
import { defaultColumnWrapper } from '@components/themes/columns';

export const ItemDescription = (props) => {
  const { value, rowData, onChange, onDeleteRow, ...resetProps } = props;

  return (
    <Space.Compact className={defaultColumnWrapper}>
      <Input
        spellCheck={false}
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

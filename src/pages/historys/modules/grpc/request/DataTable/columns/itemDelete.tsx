import { Button } from 'antd';
import SvgDelete from '@assets/icons/delete.svg?react';

export const ItemDelete = (props) => {
  const { onDeleteRow } = props;

  return (
    <Button
      type="text"
      icon={<SvgDelete style={{ width: 16, height: 16 }} />}
      onClick={onDeleteRow}
    />
  );
};

export default ItemDelete;

import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

interface ItemTitleProps {
  checkedAll: boolean;
  onCheckedAll: (checkedAll: boolean) => void;
}
export const ItemTitle: React.FC<ItemTitleProps> = (props) => {
  const { checkedAll, onCheckedAll } = props;

  const handleCheckAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked === true) {
      onCheckedAll(true);
      return;
    }
    onCheckedAll(false);
  };

  return (
    <>
      <Checkbox checked={checkedAll} onChange={handleCheckAll} />
      <span style={{ paddingLeft: 10 }}>域编号</span>
    </>
  );
};

export default ItemTitle;

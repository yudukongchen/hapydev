import React from 'react';
import { Button, Dropdown } from 'antd';
import SvgMore from '@assets/icons/more.svg?react';

type Props = {
  enableDel: boolean;
  onDelete: () => void;
  onModify: () => void;
};

const ItemMenu: React.FC<Props> = (props) => {
  const { enableDel, onDelete, onModify } = props;

  const handleModify = () => {
    onModify();
  };

  const handleDelete = () => {
    if (!enableDel) {
      return;
    }
    onDelete();
  };

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 'modify',
            label: '修改名称',
            onClick: handleModify,
          },
          {
            key: 'delete',
            label: '删除服务',

            disabled: enableDel === false,
            onClick: handleDelete,
          },
        ],
      }}
    >
      <Button size="small" type="text" icon={<SvgMore />}></Button>
    </Dropdown>
  );
};

export default ItemMenu;

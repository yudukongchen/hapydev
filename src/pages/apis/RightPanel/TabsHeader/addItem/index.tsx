import { Button, Dropdown } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import cn from 'classnames';
import { addItemWrapper } from './style';

import { v4 as uuidV4 } from 'uuid';
import { emitGlobal } from '@subjects/global';
import { MORE_ITEMS } from './constants';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import { isString } from 'lodash';

type Props = {
  activeId?: string;
  tabsList: string[];
};
const AddItem: React.FC<Props> = (props) => {
  const { activeId, tabsList } = props;

  const handleAddEmptyPage = () => {
    const id = uuidV4();
    emitGlobal('apis/createNewItem', {
      type: 'empty',
      id,
    });
  };

  const handleMoreItemClick = useMemoizedFn(({ key }) => {
    if (key === 'CLOSE_ALL') {
      emitGlobal('APIS/OPENS/removeAllItems');
    }
    if (key === 'CLOSE_CURRENT') {
      if (isString(activeId)) {
        emitGlobal('APIS/OPENS/closeItem', activeId);
      }
    }
    if (key === 'CLOSE_OTHERS') {
      if (tabsList.length < 1) {
        return;
      }
      const delList = tabsList.filter((item) => item !== activeId);
      emitGlobal('APIS/OPENS/batchRemoveOpensItem', delList);
    }
    if (key === 'SHOW_PROJECT_INFO') {
      emitGlobal('APIS/OPENS/addOpensItem', {
        id: 'project_info',
        parent_id: '0',
        name: '项目概览',
        node_type: 'project',
      });
    }
  });

  return (
    <div className={cn(addItemWrapper, 'add-item')}>
      <Button onClick={handleAddEmptyPage} size="middle" icon={<SvgAdd />} />
      <Dropdown
        destroyPopupOnHide
        trigger={['click']}
        menu={{ items: MORE_ITEMS, onClick: handleMoreItemClick }}
      >
        <Button size="middle" icon={<SvgMore />} />
      </Dropdown>
    </div>
  );
};
export default AddItem;

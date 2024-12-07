import { Button, Dropdown } from 'antd';
import SvgMore from '@assets/icons/more.svg?react';
import cn from 'classnames';
import { addItemWrapper } from './style';
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

  const handleMoreItemClick = useMemoizedFn(({ key }) => {
    if (key === 'CLOSE_ALL') {
      emitGlobal('TESTING/OPENS/removeAllItems');
    }
    if (key === 'CLOSE_CURRENT') {
      if (isString(activeId)) {
        emitGlobal('TESTING/OPENS/closeItem', activeId);
      }
    }
    if (key === 'CLOSE_OTHERS') {
      if (tabsList.length < 1) {
        return;
      }
      const delList = tabsList.filter((item) => item !== activeId);
      emitGlobal('TESTING/OPENS/batchRemoveOpensItem', delList);
    }
  });

  return (
    <div className={cn(addItemWrapper, 'add-item')}>
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

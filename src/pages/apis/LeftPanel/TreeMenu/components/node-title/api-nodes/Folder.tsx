import React from 'react';
import { nodeWarpper } from './style';
import SvgFolder from '@assets/icons/folder.svg?react';
import cn from 'classnames';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import { Button, Dropdown } from 'antd';
import { FOLDER_ADD_ITEMS, FOLDER_MORE_ITEMS } from './constants/folder';
import { handlePrevDefaultClick } from '../utils';

type Props = {
  item: any;
  onMenuClick: (item: any, e: any) => void;
};
const FolderNode: React.FC<Props> = (props) => {
  const { item, onMenuClick } = props;

  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'folder')}>
        <SvgFolder />
      </span>
      <Dropdown
        trigger={['contextMenu']}
        destroyPopupOnHide
        menu={{ items: FOLDER_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
      >
        <span className="node-title">{item.name}</span>
      </Dropdown>
      <span className="node-more">
        <Dropdown
          trigger={['click']}
          destroyPopupOnHide
          menu={{ items: FOLDER_ADD_ITEMS, onClick: onMenuClick.bind(null, item) }}
        >
          <Button size="small" type="text" icon={<SvgAdd />} onClick={handlePrevDefaultClick} />
        </Dropdown>
        <Dropdown
          destroyPopupOnHide
          trigger={['click']}
          menu={{ items: FOLDER_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
        >
          <Button onClick={handlePrevDefaultClick} size="small" type="text" icon={<SvgMore />} />
        </Dropdown>
      </span>
    </div>
  );
};

export default FolderNode;

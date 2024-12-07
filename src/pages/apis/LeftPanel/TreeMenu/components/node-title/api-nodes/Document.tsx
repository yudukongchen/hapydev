import { nodeWarpper } from './style';
import SvgMarkdown from '@assets/icons/markdown.svg?react';
import { Button, Dropdown } from 'antd';
import cn from 'classnames';
import React from 'react';
import { DOC_MORE_ITEMS } from './constants/doc';
import SvgMore from '@assets/icons/more.svg?react';
import { handlePrevDefaultClick } from '../utils';

type Props = {
  item: any;
  onMenuClick: (item: any, e: any) => void;
};
const DocumentNode: React.FC<Props> = (props) => {
  const { item, onMenuClick } = props;

  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'doc')}>
        <SvgMarkdown />
      </span>
      <Dropdown
        trigger={['contextMenu']}
        destroyPopupOnHide
        menu={{ items: DOC_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
      >
        <span className="node-title">{item?.name}</span>
      </Dropdown>
      <span className="node-more">
        <Dropdown
          destroyPopupOnHide
          trigger={['click']}
          menu={{ items: DOC_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
        >
          <Button onClick={handlePrevDefaultClick} size="small" type="text" icon={<SvgMore />} />
        </Dropdown>
      </span>
    </div>
  );
};

export default DocumentNode;

import { nodeWarpper } from './style';
import SvgFolder from '@assets/icons/folder.svg?react';
import { Switch } from 'antd';
import cn from 'classnames';
import { MouseEventHandler } from 'react';

const FolderNode = (props) => {
  const { item, is_all = false, onAllChange } = props;

  const handleChange = (ckd) => {
    onAllChange?.(ckd);
  };
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'folder')}>
        <SvgFolder />
      </span>
      <span className="node-title">{item.name}</span>
      <div className="more-item" onClick={handleClick}>
        <Switch checked={is_all} size="small" onChange={handleChange} />
        <span>整目录分享</span>
      </div>
    </div>
  );
};

export default FolderNode;

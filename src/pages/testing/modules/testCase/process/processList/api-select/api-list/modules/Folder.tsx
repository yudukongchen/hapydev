import { NodeWrapper } from './style';
import SvgFolder from '@assets/icons/folder.svg?react';
import { theme } from 'antd';
import cn from 'classnames';

const FolderNode = (props) => {
  const { item } = props;
  const { token } = theme.useToken();

  return (
    <NodeWrapper token={token}>
      <span className={cn('type-icon', 'folder')}>
        <SvgFolder />
      </span>
      <span className="node-title">{item.name}</span>
    </NodeWrapper>
  );
};

export default FolderNode;

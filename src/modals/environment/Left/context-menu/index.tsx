import SvgCopy from '@assets/icons/copy.svg?react';
import SvgDelete from '@assets/icons/delete.svg?react';
import { ContextWrapper } from './style';
import { theme } from 'antd';
import React from 'react';
import cn from 'classnames';

type Props = {
  env_id: string;
  onCopy: (env_id: string) => void;
  onDelete: (env_id: string) => void;
};

const ContextMenu: React.FC<Props> = (props) => {
  const { env_id, onCopy, onDelete } = props;
  const { token } = theme.useToken();

  return (
    <ContextWrapper token={token}>
      <div
        className="menu-item"
        onClick={(domEvent) => {
          domEvent.preventDefault();
          domEvent.stopPropagation();
          onCopy(env_id);
        }}
      >
        <SvgCopy />
        <span className="title">复制</span>
      </div>
      <div
        className={cn('menu-item', {
          disabled: ['local_mock', 'remote_mock'].includes(env_id),
        })}
        onClick={(domEvent) => {
          domEvent.preventDefault();
          domEvent.stopPropagation();
          if (['local_mock', 'remote_mock'].includes(env_id)) {
            return;
          }
          onDelete(env_id);
        }}
      >
        <SvgDelete />
        <span className="title">删除</span>
      </div>
    </ContextWrapper>
  );
};

export default ContextMenu;

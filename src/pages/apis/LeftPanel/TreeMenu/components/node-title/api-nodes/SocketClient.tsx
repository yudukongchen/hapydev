import cn from 'classnames';
import { nodeWarpper } from './style';
import { methodsWrapper } from '@theme/methods';
import React from 'react';
import { Button, Dropdown, Tooltip } from 'antd';
import { SOCKET_CLIENT_MORE_ITEMS } from './constants/socket-client';
import SvgMore from '@assets/icons/more.svg?react';
import { handlePrevDefaultClick } from '../utils';
import { API_STATUS } from '@constants/api_status';
import SvgLock from '@assets/icons/lock.svg?react';
import { isString } from 'lodash';

type Props = {
  item: any;
  onMenuClick: (item: any, e: any) => void;
};

const SocketClientNode: React.FC<Props> = (props) => {
  const { item, onMenuClick } = props;
  const statusInfo = API_STATUS?.[item?.data?.status];
  return (
    <div className={cn(nodeWarpper, methodsWrapper)}>
      <span className={cn('method', 'socket_client')}>SOCK</span>
      <Dropdown
        trigger={['contextMenu']}
        destroyPopupOnHide
        menu={{ items: SOCKET_CLIENT_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
      >
        <span className="node-title">{item?.name}</span>
      </Dropdown>
      {isString(item?.locker_id) && (
        <Tooltip title="接口已锁定">
          <span className="lock-item">
            <SvgLock />
          </span>
        </Tooltip>
      )}
      <Tooltip title={statusInfo?.title}>
        <span className={cn('status-icon')}>
          <dd style={{ backgroundColor: statusInfo?.color }} />
        </span>
      </Tooltip>
      <span className="node-more">
        <Dropdown
          destroyPopupOnHide
          trigger={['click']}
          menu={{ items: SOCKET_CLIENT_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
        >
          <Button onClick={handlePrevDefaultClick} size="small" type="text" icon={<SvgMore />} />
        </Dropdown>
      </span>
    </div>
  );
};

export default SocketClientNode;

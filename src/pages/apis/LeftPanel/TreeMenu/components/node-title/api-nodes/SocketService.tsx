import { nodeWarpper } from './style';
import SvgSocketService from '@assets/icons/socket-service.svg?react';
import SvgLock from '@assets/icons/lock.svg?react';
import cn from 'classnames';
import { Button, Dropdown, Tooltip } from 'antd';
import SvgAdd from '@assets/icons/add.svg?react';
import SvgMore from '@assets/icons/more.svg?react';
import React from 'react';
import { SOCKET_SERVICE_MORE_ITEMS } from './constants/socket-service';
import { handlePrevDefaultClick } from '../utils';
import { API_STATUS } from '@constants/api_status';
import { isString } from 'lodash';

type Props = {
  item: any;
  onMenuClick: (item: any, e: any) => void;
};
const SocketServiceNode: React.FC<Props> = (props) => {
  const { item, onMenuClick } = props;
  const statusInfo = API_STATUS?.[item?.data?.status];

  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'socket')}>
        <SvgSocketService />
      </span>
      <Dropdown
        trigger={['contextMenu']}
        destroyPopupOnHide
        menu={{ items: SOCKET_SERVICE_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
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
        <Button
          size="small"
          type="text"
          icon={<SvgAdd />}
          onClick={(e) => {
            e?.stopPropagation();
            e?.preventDefault();
            onMenuClick(item, { key: 'ADD_SOCKET_CLIENT' });
          }}
        />
        <Dropdown
          destroyPopupOnHide
          trigger={['click']}
          menu={{ items: SOCKET_SERVICE_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
        >
          <Button onClick={handlePrevDefaultClick} size="small" type="text" icon={<SvgMore />} />
        </Dropdown>
      </span>
    </div>
  );
};

export default SocketServiceNode;

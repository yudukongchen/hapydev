import { nodeWarpper } from './style';
import SvgGrpc from '@assets/icons/grpc.svg?react';
import { Button, Dropdown, Tooltip } from 'antd';
import cn from 'classnames';
import SvgMore from '@assets/icons/more.svg?react';
import SvgLock from '@assets/icons/lock.svg?react';
import React from 'react';
import { GRPC_MORE_ITEMS } from './constants/grpc';
import { handlePrevDefaultClick } from '../utils';
import { API_STATUS } from '@constants/api_status';
import { isString } from 'lodash';

type Props = {
  item: any;
  onMenuClick: (item: any, e: any) => void;
};
const GrpcNode: React.FC<Props> = (props) => {
  const { item, onMenuClick } = props;
  const statusInfo = API_STATUS?.[item?.data?.status];
  return (
    <div className={nodeWarpper}>
      <span className={cn('type-icon', 'grpc')}>
        <SvgGrpc />
      </span>
      <Dropdown
        trigger={['contextMenu']}
        destroyPopupOnHide
        menu={{ items: GRPC_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
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
          menu={{ items: GRPC_MORE_ITEMS, onClick: onMenuClick.bind(null, item) }}
        >
          <Button onClick={handlePrevDefaultClick} size="small" type="text" icon={<SvgMore />} />
        </Dropdown>
      </span>
    </div>
  );
};

export default GrpcNode;

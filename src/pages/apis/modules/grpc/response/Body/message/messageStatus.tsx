import SvgSent from './icons/sent.svg?react';
import SvgReceived from './icons/received.svg?react';
import { MenuProps } from 'antd';

export const MESASAGE_STATUS: MenuProps['items'] = [
  {
    key: 'sent',
    label: '已发送的消息',
    icon: (
      <div className="msg-type-icon sent">
        <SvgSent />
      </div>
    ),
  },
  {
    key: 'received',
    label: '已接收的消息',
    icon: (
      <div className="msg-type-icon receive">
        <SvgReceived />
      </div>
    ),
  },
  {
    type: 'divider',
  },
  {
    key: 'all',
    label: '全部消息',
  },
];

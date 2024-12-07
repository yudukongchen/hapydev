import qywx from './icons/qiyewx.svg?react';
import dingding from './icons/dingding.svg?react';
import feishu from './icons/feishu.svg?react';
import webhook from './icons/webhook.svg?react';
import jenkins from './icons/jenkins.svg?react';

export const CHANNEL_TYPES = [
  {
    type: 'qywx',
    title: '企业微信',
    icon: qywx,
  },
  {
    type: 'dingding',
    title: '钉钉',
    icon: dingding,
  },
  {
    type: 'feishu',
    title: '飞书',
    icon: feishu,
  },
  {
    type: 'webhook',
    title: 'Webhook',
    icon: webhook,
  },
  {
    type: 'jenkins',
    title: 'Jenkins',
    icon: jenkins,
  },
];

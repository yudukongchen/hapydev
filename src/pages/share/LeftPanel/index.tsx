import { theme } from 'antd';
import { LeftWrapper } from './style';
import SvgQuickShare from '@assets/icons/quick-share.svg?react';
import SvgProjectDoc from '@assets/icons/project-doc.svg?react';
import React from 'react';
import cn from 'classnames';

const MENU_LIST = [
  {
    cate_name: '快捷分享',
    icon: SvgQuickShare,
    children: [{ item_name: '分享列表', key: 'share-list' }],
  },
  {
    cate_name: '项目文档',
    icon: SvgProjectDoc,
    slot: <div className="more-item">预览</div>,
    children: [
      { item_name: '发布设置', key: 'publish-config' },
      { item_name: '基础设置', key: 'base-config' },
    ],
  },
];

type Props = {
  active: string;
  onActiveChange: (name: string) => void;
};

const LeftPanel: React.FC<Props> = (props) => {
  const { active, onActiveChange } = props;
  const { token } = theme.useToken();

  return (
    <LeftWrapper token={token}>
      <div className="big-title">分享管理</div>

      {MENU_LIST.map((item, index) => (
        <React.Fragment key={index}>
          <div className="cate-item">
            <item.icon className="cate-icon" />
            <div className="cate-title">{item.cate_name}</div>
            {item.slot}
          </div>
          <>
            {item.children.map((cItem) => (
              <div
                key={cItem.key}
                className={cn('sec-item', {
                  active: active === cItem.key,
                })}
                onClick={onActiveChange.bind(null, cItem.key)}
              >
                {cItem.item_name}
              </div>
            ))}
          </>
        </React.Fragment>
      ))}
    </LeftWrapper>
  );
};

export default LeftPanel;

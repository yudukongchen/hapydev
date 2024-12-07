import { Avatar, Button, Dropdown, message } from 'antd';
import React from 'react';
import SvgMore from '@assets/icons/more.svg?react';
import { getAssertsPath } from '@utils/utils';
import { isString } from 'lodash';
import { MENU_OPTIONS } from '../constants';
import { useMemoizedFn } from 'ahooks';

type Props = {
  item: any;
  onContextMenu: (action: string, item: any) => void;
};
const ProjectItem: React.FC<Props> = (props) => {
  const { item, onContextMenu } = props;

  const handleAction = useMemoizedFn(({ key }) => {
    if (item.is_offline === 1 && key === 'move') {
      message.error('开源版暂不支持');
      return;
    }

    onContextMenu(key, item);
  });
  return (
    <div className="list-item">
      <div className="img-panel">
        <Avatar
          className="img-icon"
          src={isString(item?.logo) ? getAssertsPath(item?.logo) : null}
        />
        <Dropdown
          menu={{
            items: MENU_OPTIONS,
            onClick: handleAction,
          }}
        >
          <Button className="btn-more" icon={<SvgMore />} type="text" />
        </Dropdown>
      </div>
      <div className="text">{item?.name}</div>
      <div className="desc">{item?.description ?? ''}</div>
    </div>
  );
};
export default ProjectItem;

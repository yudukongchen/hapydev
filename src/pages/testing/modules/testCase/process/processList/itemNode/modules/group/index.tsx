import { Button, Dropdown, theme } from 'antd';
import { GroupWrapper } from './style';
import { GroupProcess } from '#types/testing';
import React from 'react';
import SvgArrowRight from '@assets/icons/angle-right.svg?react';
import cn from 'classnames';
import { useMemoizedFn } from 'ahooks';
import SvgModify from '@assets/icons/modify.svg?react';
import ModifyPanel from './modify';
import NodeWrapper from '../../wrapper';

type Props = {
  value: GroupProcess;
  onChange?: (newVal: GroupProcess) => void;
  expand: boolean;
  onChangeExpand: (newExpand: boolean) => void;
  onDelete: () => void;
};
const GroupNode: React.FC<Props> = (props) => {
  const { value, onChange, expand, onChangeExpand, onDelete } = props;
  const { token } = theme.useToken();

  const handleToggleExpand = useMemoizedFn(() => {
    onChangeExpand(!expand);
  });

  const renderModifyPanel = () => {
    return <ModifyPanel value={value} onChange={onChange} />;
  };

  return (
    <NodeWrapper value={value} onChange={onChange} expand={expand} onDelete={onDelete}>
      <GroupWrapper token={token} onClick={handleToggleExpand}>
        <div
          className={cn('expand-icon', {
            expand: expand,
          })}
        >
          <SvgArrowRight />
        </div>
        <div className="node-type group">分组</div>
        <div>{value?.data?.name}</div>
      </GroupWrapper>
      <Dropdown trigger={['click']} dropdownRender={renderModifyPanel}>
        <Button icon={<SvgModify />} size="small" type="text" />
      </Dropdown>
    </NodeWrapper>
  );
};

export default GroupNode;

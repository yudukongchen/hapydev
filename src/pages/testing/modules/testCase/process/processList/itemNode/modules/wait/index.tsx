import { Button, Dropdown, theme } from 'antd';
import { WaitWrapper } from './style';
import { WaitProcess } from '#types/testing';
import React from 'react';
import SvgArrowRight from '@assets/icons/angle-right.svg?react';
import cn from 'classnames';
import { useMemoizedFn } from 'ahooks';
import SvgModify from '@assets/icons/modify.svg?react';
import ModifyPanel from './modify';
import NodeWrapper from '../../wrapper';

type Props = {
  value: WaitProcess;
  onChange?: (newVal: WaitProcess) => void;
  expand: boolean;
  onChangeExpand: (newExpand: boolean) => void;
  onDelete: () => void;
};
const WaitNode: React.FC<Props> = (props) => {
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
      <WaitWrapper token={token} onClick={handleToggleExpand}>
        <div
          className={cn('expand-icon', {
            expand: expand,
          })}
        >
          <SvgArrowRight />
        </div>
        <div className="node-type wait">等待</div>
        <div>{value?.data?.wait_time}毫秒</div>
      </WaitWrapper>
      <Dropdown trigger={['click']} dropdownRender={renderModifyPanel}>
        <Button icon={<SvgModify />} size="small" type="text" />
      </Dropdown>
    </NodeWrapper>
  );
};

export default WaitNode;

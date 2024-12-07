import { Button, Dropdown, theme } from 'antd';
import { IfWrapper } from './style';
import { IfProcess } from '#types/testing';
import React from 'react';
import SvgArrowRight from '@assets/icons/angle-right.svg?react';
import cn from 'classnames';
import { useMemoizedFn } from 'ahooks';
import SvgModify from '@assets/icons/modify.svg?react';
import ModifyPanel from './modify';
import { COMPARE_TYPES } from '@constants/compare';
import NodeWrapper from '../../wrapper';

const compareDatas = COMPARE_TYPES.reduce((a, b) => ({ ...a, [b.type]: b.title }), {});

type Props = {
  value: IfProcess;
  onChange?: (newVal: IfProcess) => void;
  expand: boolean;
  onChangeExpand: (newExpand: boolean) => void;
  onDelete: () => void;
};
const IfNode: React.FC<Props> = (props) => {
  const { value, onChange, expand, onChangeExpand, onDelete } = props;
  const { token } = theme.useToken();

  const handleToggleExpand = useMemoizedFn(() => {
    onChangeExpand(!expand);
  });

  const renderModifyPanel = () => {
    return <ModifyPanel value={value} onChange={onChange} />;
  };

  const isShowValue = (type) => {
    return !['toBeNull', 'notBeNull', 'toBeUndefined', 'notBeUndefined'].includes(type);
  };

  return (
    <NodeWrapper value={value} onChange={onChange} expand={expand} onDelete={onDelete}>
      <IfWrapper token={token} onClick={handleToggleExpand}>
        <div
          className={cn('expand-icon', {
            expand: expand,
          })}
        >
          <SvgArrowRight />
        </div>
        <div className="node-type if">条件</div>
        <div className="data-item">
          当: {value?.data?.var ?? '-'}
          {compareDatas?.[value?.data?.compare] ?? '-'}
          {isShowValue(value?.data?.compare) && <>{value?.data?.value ?? '-'}</>}时
        </div>
      </IfWrapper>
      <Dropdown trigger={['click']} dropdownRender={renderModifyPanel}>
        <Button icon={<SvgModify />} size="small" type="text" />
      </Dropdown>
    </NodeWrapper>
  );
};

export default IfNode;

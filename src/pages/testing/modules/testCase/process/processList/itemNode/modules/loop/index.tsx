import { Button, theme, Dropdown } from 'antd';
import { ForWrapper } from './style';
import { LoopProcess } from '#types/testing';
import React, { useMemo } from 'react';
import SvgArrowRight from '@assets/icons/angle-right.svg?react';
import cn from 'classnames';
import { useMemoizedFn } from 'ahooks';
import SvgModify from '@assets/icons/modify.svg?react';
import ModifyPanel from './modify';
import { selectContext } from '../../../../../context';
import { isArray } from 'lodash';
import { COMPARE_TYPES } from '@constants/compare';
import NodeWrapper from '../../wrapper';

const compareDatas = COMPARE_TYPES.reduce((a, b) => ({ ...a, [b.type]: b.title }), {});

type Props = {
  value: LoopProcess;
  onChange?: (newVal: LoopProcess) => void;
  expand: boolean;
  onChangeExpand: (newExpand: boolean) => void;
  onDelete: () => void;
};
const ForNode: React.FC<Props> = (props) => {
  const { value, onChange, expand, onChangeExpand, onDelete } = props;

  const iteration_data = selectContext((store) => store?.data?.iteration_data) as any[];

  const iterationDatas = useMemo(() => {
    if (!isArray(iteration_data)) {
      return {};
    }
    const result = {};
    iteration_data.forEach((item) => {
      result[item.id] = item.name;
    });
    return result;
  }, [iteration_data]);

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
      <ForWrapper token={token} onClick={handleToggleExpand}>
        <div
          className={cn('expand-icon', {
            expand: expand,
          })}
        >
          <SvgArrowRight />
        </div>
        <div className="node-type for">循环</div>
        {value?.data?.loop_type === 'for' && (
          <>
            <div className="data-item">执行: {value?.data?.for?.execute_count}次</div>
            <div className="data-item">
              测试数据: {iterationDatas?.[value?.data?.for?.iteration_data_id] ?? '无'}
            </div>
          </>
        )}
        {value?.data?.loop_type === 'map' && (
          <div className="data-item">
            遍历:
            {value.data?.map?.location === 'iteration_data' && (
              <>测试数据 {iterationDatas?.[value?.data?.map?.data] ?? '无'}</>
            )}
            {value.data?.map?.location === 'env_variable' && <>变量 {value?.data?.map?.data}</>}
            {value.data?.map?.location === 'constant' && (
              <div className="max-len">{value?.data?.map?.data}</div>
            )}
          </div>
        )}
        {value?.data?.loop_type === 'while' && (
          <div className="data-item">
            当: {value?.data?.while?.var ?? '-'}
            {compareDatas?.[value?.data?.while?.compare] ?? '-'}
            {isShowValue(value?.data?.while?.compare) && <>{value?.data?.while?.value ?? '-'}</>}时
          </div>
        )}
        <div className="data-item">间隔:{value?.data?.interval_time}毫秒</div>
      </ForWrapper>
      <Dropdown trigger={['click']} dropdownRender={renderModifyPanel}>
        <Button icon={<SvgModify />} size="small" type="text" />
      </Dropdown>
    </NodeWrapper>
  );
};

export default ForNode;

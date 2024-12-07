import { ProcessItem } from '#types/testing';
import React, { useMemo } from 'react';
import { ProcessListWrapper } from './style';
import { Empty, theme } from 'antd';
import ItemNode from './itemNode';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import NodeList from './nodeList';
import { digCheckContains, digFindDelete, digInsertValue, flattenItems } from './utils';
import { cloneDeep, isObject, isString } from 'lodash';
import { customCollisionDetectionAlgorithm } from './collision';
import AddPanel from './addPanel';

type Props = {
  value: ProcessItem[];
  onChange: (newVal: ProcessItem[]) => void;
};

const ProcessList: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const { token } = theme.useToken();

  const flattedItems = useMemo(() => {
    return flattenItems(value);
  }, [value]);

  const [activeId, setActiveId] = useSafeState(null);

  const handleChange = useMemoizedFn((index, newVal) => {
    const result = produce(value, (draft) => {
      draft[index] = newVal;
    });
    onChange(result);
  });

  const getItemIndex = (id) => {
    return value.findIndex((item) => item.id === id);
  };

  const handleDragStart = useMemoizedFn((event) => {
    setActiveId(event.active.id);
  });

  const handleDragEnd = useMemoizedFn((event) => {
    const { active, over } = event;
    if (!isString(over?.id)) {
      return;
    }

    const [over_id, rule] = over?.id?.split('|');
    //不能拖自己前面位置，且不能拖到自己子级
    if (active?.id === over_id) {
      return;
    }
    //同样不能拖到自己孙级
    const contains = digCheckContains(flattedItems, active?.id, over_id);

    if (contains) {
      return;
    }
    const sourceData = flattedItems?.[active?.id];
    const targetData = flattedItems?.[over_id];

    //如果被操作对象为空则返回
    if (!isObject(sourceData) || !isObject(targetData)) {
      return;
    }
    const result = produce(value, (draft) => {
      //step1.找到源节点父节点，对该节点进行删除
      digFindDelete(draft, active?.id);
      //step2.插入到指定位置
      digInsertValue(draft, over_id, rule, cloneDeep(sourceData));
    });
    onChange(result);
  });

  return (
    <ProcessListWrapper token={token} className="beautify-scrollbar">
      <div className="list-panel beautify-scrollbar">
        {value?.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="请点击下方按钮添加测试步骤"
            style={{ marginTop: '30%' }}
          />
        )}
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          collisionDetection={customCollisionDetectionAlgorithm}
        >
          <NodeList isRoot value={value} onChange={onChange} />
          <DragOverlay>
            {activeId ? (
              <ItemNode
                key={activeId}
                value={flattedItems?.[activeId]}
                index={getItemIndex(activeId)}
                onChange={handleChange}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      <AddPanel parent_id="0" value={value} onChange={onChange} />
    </ProcessListWrapper>
  );
};
export default ProcessList;

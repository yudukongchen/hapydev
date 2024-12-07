import { MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { isString } from 'lodash';
import { useDispatch } from 'react-redux';
import { checkEnableSort, getChildList, getParentKeys } from './utils';
import { emitGlobal } from '@subjects/global';
import { updateApiSorts } from '@reducers/apis/datas';
import { useMemo } from 'react';
import { Testing } from '#types/testing';

const useNodeSort = (props) => {
  const { dataList } = props;

  const dispatch = useDispatch();
  const [dragItem, setDragItem] = useSafeState(null);

  const testDatas: { [key: string]: Testing } = useMemo(() => {
    const result = {};
    for (const item of dataList as Testing[]) {
      result[item.test_id] = item;
    }
    return result;
  }, [dataList]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const onDragStart = useMemoizedFn((event) => {
    const itemData = {
      id: event?.active?.id,
      data: event?.active?.data,
    };
    setDragItem(itemData);
  });

  const onDragEnd = useMemoizedFn((event) => {
    const { active, over } = event;

    if (!isString(over?.id)) {
      return;
    }
    const [target, drageMode] = over?.id?.split('|');
    const source = active.id;

    const sourceData = testDatas?.[source];
    const targetData = testDatas?.[target];
    if (!checkEnableSort(targetData, drageMode)) {
      return;
    }

    // 禁止父节点拖动到子节点
    const targetParentKeys = getParentKeys(testDatas, targetData, 'test_id');
    if (targetParentKeys.includes(source) || source === target) {
      return;
    }

    let targetList: Testing[] = [];
    let new_parent_id = null;
    //插到前面或后面
    if (drageMode === 'before' || drageMode === 'after') {
      new_parent_id = targetData.parent_id;

      targetList = getChildList(testDatas, targetData.parent_id).filter(
        (item) => item.test_id !== source
      );
      // 被拖进目标序号
      let sortIndex = 0;
      targetList.forEach((item, index) => {
        if (item?.test_id === target) {
          sortIndex = index;
        }
      });
      if (drageMode === 'before') {
        targetList.splice(sortIndex, 0, sourceData);
      } else if (drageMode === 'after') {
        targetList.splice(sortIndex + 1, 0, sourceData);
      }
    } else if (drageMode === 'inside') {
      new_parent_id = targetData?.test_id;
      targetList = getChildList(testDatas, targetData?.test_id).filter(
        (item) => item?.test_id !== source
      );
      targetList.splice(0, 0, sourceData);
    }

    const resultData = {
      sort_id: source,
      new_parent_id,
      new_sort_list: targetList.map((item, index) => ({ id: item.test_id, sort: index + 1 })),
    };

    emitGlobal('PAGES/TESTING/updateTestingSorts', resultData);
    //更新排序值
    // dispatch(updateApiSorts(resultData));
    // emitGlobal('APIS/sortList', {
    //   project_id: sourceData.project_id,
    //   data: resultData,
    // });
  });

  return {
    testDatas,
    onDragStart,
    onDragEnd,
    sensors,
    dragItem,
  };
};

export default useNodeSort;

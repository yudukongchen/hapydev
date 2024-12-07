import { MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { isString } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { checkEnableSort, getChildList, getParentKeys } from './utils';
import { emitGlobal } from '@subjects/global';
import { updateApiSorts } from '@reducers/apis/datas';
import { updateModelSorts } from '@reducers/models';

const PRIMARY_KEYS = {
  interface: 'id',
  model: 'id',
  template: 'id',
};

const useNodeSort = () => {
  const dispatch = useDispatch();
  const [dragItem, setDragItem] = useSafeState(null);

  const apiDatas = useSelector((store: any) => store?.apis?.datas?.base_datas);
  const modelDatas = useSelector((store: any) => store?.models?.base_datas);
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

  const sortApi = (sourceDatas, source, new_parent_id, targetList) => {
    const sourceData = sourceDatas?.[source];
    //socket 服务不允许其他节点拖进去
    const parentNode = sourceDatas[new_parent_id];
    if (parentNode?.data_type === 'socket_service' && sourceData?.data_type !== 'socket_client') {
      return;
    }

    //socket客户端不允许拖动到非客户端服务节点下
    if (sourceData?.data_type === 'socket_client' && parentNode?.data_type !== 'socket_service') {
      return;
    }

    const resultData = {
      sort_id: source,
      new_parent_id,
      new_sort_list: targetList.map((item, index) => ({ id: item.id, sort: index + 1 })),
    };
    //更新排序值
    dispatch(updateApiSorts(resultData));
    emitGlobal('APIS/sortList', {
      project_id: sourceData.project_id,
      data: resultData,
    });
  };

  const sortModel = (sourceDatas, source, new_parent_id, targetList) => {
    const sourceData = sourceDatas?.[source];
    //socket 服务不允许其他节点拖进去
    const parentNode = sourceDatas[new_parent_id];

    // if (parentNode?.data_type === 'socket_service' && sourceData?.data_type !== 'socket_client') {
    //   return;
    // }

    const resultData = {
      sort_id: source,
      new_parent_id,
      new_sort_list: targetList.map((item, index) => ({ id: item.id, sort: index + 1 })),
    };

    //更新排序值
    dispatch(updateModelSorts(resultData));
    emitGlobal('MODELS/sortModelsList', {
      project_id: sourceData.project_id,
      data: resultData,
    });
  };

  const onDragEnd = useMemoizedFn((event) => {
    const { active, over } = event;

    if (!isString(over?.id)) {
      return;
    }

    //不能夸类型拖拽
    if (active?.data?.current?.type !== over?.data?.current?.type) {
      return;
    }

    const [target, drageMode] = over?.id?.split('|');
    const node_type = active?.data?.current?.type;
    const source = active.id;

    const SOURCE_DATAS = {
      interface: apiDatas,
      model: modelDatas,
      // template: templateDatas,
    };
    const primaryKey = PRIMARY_KEYS?.[node_type];
    const sourceDatas = SOURCE_DATAS?.[node_type] || {};
    const sourceData = sourceDatas?.[source];
    const targetData = sourceDatas?.[target];

    if (!checkEnableSort(node_type, sourceData, targetData, drageMode)) {
      return;
    }
    // 禁止父节点拖动到子节点
    const targetParentKeys = getParentKeys(sourceDatas, targetData, primaryKey);
    if (targetParentKeys.includes(source) || source === target) {
      return;
    }
    let targetList = [];
    let new_parent_id = null;
    //插到前面或后面
    if (drageMode === 'before' || drageMode === 'after') {
      new_parent_id = targetData.parent_id;

      targetList = getChildList(sourceDatas, targetData.parent_id).filter(
        (item: any) => item.id !== source
      );
      // 被拖进目标序号
      let sortIndex = 0;
      targetList.forEach((item, index) => {
        if (item?.[primaryKey] === target) {
          sortIndex = index;
        }
      });
      if (drageMode === 'before') {
        targetList.splice(sortIndex, 0, sourceData);
      } else if (drageMode === 'after') {
        targetList.splice(sortIndex + 1, 0, sourceData);
      }
    } else if (drageMode === 'inside') {
      new_parent_id = targetData?.[primaryKey];
      targetList = getChildList(sourceDatas, targetData?.[primaryKey]).filter(
        (item) => item?.[primaryKey] !== source
      );
      targetList.splice(0, 0, sourceData);
    }
    if (node_type === 'interface') {
      sortApi(sourceDatas, source, new_parent_id, targetList);
      return;
    }
    if (node_type === 'model') {
      sortModel(sourceDatas, source, new_parent_id, targetList);
    }
  });

  return {
    onDragStart,
    onDragEnd,
    sensors,
    dragItem,
  };
};

export default useNodeSort;

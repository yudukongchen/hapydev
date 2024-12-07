import { useSelector } from 'react-redux';
import { NodeType, TreeNode } from '../../types';
import { useMemo } from 'react';
import { cloneDeep, isEmpty, isUndefined } from 'lodash';

const MODEL_ROOT_KEY = 'model_root';

type Props = {
  filter: any;
};
const useModelNodes = (props: Props) => {
  const { filter } = props;
  const modelDatas = useSelector((store: any) => store.models?.base_datas);

  const filteredDatas = useMemo(() => {
    if (isUndefined(modelDatas)) {
      return {};
    }
    const newDatas = {};
    const sourceData = cloneDeep(modelDatas);
    Object.entries(sourceData).forEach(([id, data]: [string, any]) => {
      const filterKey = filter?.name?.toLowerCase();

      //是否包含名称
      const isIncludeName = `${data?.name}`.toLowerCase().indexOf(filterKey) !== -1;
      if (isEmpty(filterKey) || isIncludeName) {
        newDatas[id] = data;
        let parent = sourceData[data.parent_id];
        //父节点也要放进来
        while (!isUndefined(parent) && newDatas?.[parent?.id] !== parent) {
          newDatas[parent.id] = parent;
          parent = sourceData[parent.parent_id];
        }
      }
    });
    return newDatas;
  }, [modelDatas, filter]);

  const modelsDataList: TreeNode[] = Object.values(filteredDatas).map((item: any) => {
    return {
      id: item.id,
      parent: item.parent_id === '0' ? MODEL_ROOT_KEY : item.parent_id,
      name: item?.name ?? null,
      sort: item.sort,
      data_type: item?.data_type,
      node_type: 'model',
    };
  });

  const modelNodes: TreeNode[] = [
    {
      id: MODEL_ROOT_KEY,
      parent: '0',
      name: '数据模型',
      data_type: 'folder',
      node_type: 'model' as NodeType,
      sort: 2,
      isRoot: true,
    } as TreeNode,
  ].concat(modelsDataList);

  return modelNodes;
};

export default useModelNodes;

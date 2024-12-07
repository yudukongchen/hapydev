import { useSelector } from 'react-redux';
import { NodeType, TreeNode } from '../../types';
import { cloneDeep, isEmpty, isNull, isUndefined } from 'lodash';
import React, { useMemo } from 'react';
import { ApiCollection } from '#types/collection/api';

const API_ROOT_KEY = 'interface_root';

type Props = {
  filter: any;
};

const useApiNodes = (props: Props) => {
  const { filter } = props;

  const apiDatas = useSelector((store: any) => store.apis?.datas?.base_datas);

  const filteredDatas = useMemo(() => {
    if (isUndefined(apiDatas)) {
      return {};
    }
    const newDatas = {};
    const sourceData = cloneDeep(apiDatas);
    Object.entries(sourceData).forEach(([id, data]: [string, any]) => {
      const filterKey = filter?.name?.toLowerCase();
      //是否包含url
      const isIncludeUrl = `${data?.url}`.toLowerCase().indexOf(filterKey) !== -1;
      //是否包含名称
      const isIncludeName = `${data?.name}`.toLowerCase().indexOf(filterKey) !== -1;
      if (isEmpty(filterKey) || isIncludeUrl || isIncludeName) {
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
  }, [apiDatas, filter]);

  const apiDataList: TreeNode[] = Object.values(filteredDatas)
    .map((item: ApiCollection) => {
      return {
        id: item.id,
        parent: item.parent_id === '0' ? API_ROOT_KEY : item.parent_id,
        name: item.name,
        sort: item.sort,
        data_type: item?.data_type,
        locker_id: item?.locker_id,
        node_type: 'interface',
      };
    })
    .filter((item) => !isNull(item.name)) as TreeNode[];

  const apiNodes: TreeNode[] = [
    {
      id: API_ROOT_KEY,
      parent: '0',
      name: '接口',
      node_type: 'interface' as NodeType,
      sort: 1,
      isRoot: true,
    } as TreeNode,
  ].concat(apiDataList);

  return apiNodes;
};

export default useApiNodes;

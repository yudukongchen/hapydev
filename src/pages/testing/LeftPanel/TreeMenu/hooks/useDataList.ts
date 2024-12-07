import { Testing } from '#types/testing';
import { isArray, isEmpty, isUndefined, omit } from 'lodash';
import { useMemo } from 'react';

type Props = {
  filter: any;
  dataList: Testing[];
};

const useDataList = (props: Props) => {
  const { dataList, filter } = props;

  const filteredList = useMemo(() => {
    if (!isArray(dataList)) {
      return [];
    }
    const newDatas: { [key: string]: Omit<Testing, 'data'> } = {};
    const sourceData: { [key: string]: Omit<Testing, 'data'> } = {};
    dataList.forEach((item) => {
      sourceData[item.test_id] = omit(item, ['data']);
    });

    Object.entries(sourceData).forEach(([id, data]: [string, Testing]) => {
      const filterKey = filter?.name?.toLowerCase();
      //是否包含url
      //是否包含名称
      const isIncludeName = `${data?.name}`.toLowerCase().indexOf(filterKey) !== -1;
      if (isEmpty(filterKey) || isIncludeName) {
        newDatas[id] = data;
        let parent = sourceData[data.parent_id];
        //父节点也要放进来
        while (!isUndefined(parent) && newDatas?.[parent?.test_id] !== parent) {
          newDatas[parent.test_id] = parent;
          parent = sourceData[parent.parent_id];
        }
      }
    });
    return Object.values(newDatas);
  }, [dataList, filter]);

  return filteredList;
};

export default useDataList;

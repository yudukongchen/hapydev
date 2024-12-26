import { isArray, isUndefined } from 'lodash';

export const apilist2Tree = (dataList) => {
  const rootDatas = {};
  const dbDatas: any = {};
  dataList?.forEach((item) => {
    dbDatas[item.id] = item;
  });
  dataList.forEach((item: any) => {
    const parentItem = dbDatas?.[item?.parent_id];
    if (item?.parent_id === '0') {
      rootDatas[item.id] = item;
    }
    if (isUndefined(parentItem)) {
      return;
    }
    if (!isArray(parentItem?.children)) {
      parentItem.children = [];
    }
    parentItem.children.push(item);
  });
  return Object.values(rootDatas);
};

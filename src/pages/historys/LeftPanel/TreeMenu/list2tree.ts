import dayjs from 'dayjs';
import { isUndefined } from 'lodash';

export const list2Tree = (list) => {
  //1.按时间倒序排序
  const datalist = list.sort((a, b) => b.time - a.time);

  //2.转换时间
  const time_list: any[] = datalist.map((item) => ({
    id: item.id,
    parent: dayjs(item.time).format('YYYY年M月D日'),
    item,
  }));

  //3.list 转tree
  const treeData = {};
  time_list.forEach((item) => {
    if (isUndefined(treeData?.[item?.parent])) {
      treeData[item.parent] = {
        id: item.parent,
        title: item.parent,
        parent: '0',
        data_type: 'group',
        child_items: [],
      };
    }
    treeData[item.parent].child_items.push(item.id);
  });
  const rootList = Object.values(treeData);
  return rootList.concat(time_list);
};

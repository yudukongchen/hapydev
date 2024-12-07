import { FolderCollection } from '#types/collection/folder';
import { isUndefined } from 'lodash';

export const getApiServerId = (id: string, parent_datas: { [key: string]: FolderCollection }) => {
  const result = 'default'; //默认使用default
  const targetInfo = parent_datas?.[id];
  //如果父级找不到则使用默认的
  if (isUndefined(targetInfo)) {
    return result;
  }
  //继承父级
  if (targetInfo?.data?.server_id === 'inherit') {
    return getApiServerId(targetInfo?.parent_id, parent_datas);
  }
  return targetInfo?.data?.server_id ?? 'default';
};

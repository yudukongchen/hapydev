import { getApiItem } from '@bll/apis/local';
import { isElectron } from '@utils/is';
import { isFunction, isPlainObject, isString, isUndefined } from 'lodash';
import { FolderCollection } from '#types/collection/folder';

export const getParentCollections = async (parent_id: string) => {
  const result: { [key: string]: FolderCollection } = {};

  const digFind = async (pid) => {
    const parentItem = await getApiItem(pid);
    if (!isPlainObject(parentItem) || pid === '0') {
      return;
    }
    result[pid] = parentItem as FolderCollection;
    await digFind(parentItem.parent_id);
  };
  await digFind(parent_id);
  return result;
};

export const sendRequest = (params) => {
  const { module, action, data, runtime_id } = params;

  //console.log('全局发送方法', params);

  if (isElectron()) {
    window?.ipcRenderer?.send(module, {
      action,
      data,
      runtime_id,
    });
    return;
  }
  if (window.cloud_proxy && window.cloud_proxy.connected) {
    window?.cloud_proxy.emit(module, { action, runtime_id, data });
  }
};

export const stopRunner = (runner_id, type) => {
  if (window.cloud_proxy && window.cloud_proxy.connected) {
    window?.cloud_proxy.emit('stop', {
      runner_id,
      type,
    });
  }
};

//云端代理初始化
export const onProxyInit = () => {
  return new Promise((resolve, reject) => {
    if (isElectron()) {
      resolve(true);
      return;
    }
    const intervalTime = setInterval(() => {
      if (isFunction(window?.cloud_proxy?.on)) {
        clearInterval(intervalTime);
        resolve(true);
      }
    }, 100);

    setTimeout(() => {
      reject(new Error('time out'));
    }, 2000);
  });
};

// 绑定云端代理或者apiRender发送监听
export const bindProxy = (name: string, listener: Function) => {
  if (!isString(name) || !isFunction(listener)) {
    return;
  }
  if (isElectron() && !isUndefined(window?.ipcRenderer)) {
    window?.ipcRenderer.on(name, listener);
    return;
  }
  if (window.cloud_proxy) {
    window?.cloud_proxy.on(name, listener);
  }
};

export const unBindProxy = (name: string, listener: Function) => {
  if (!isString(name)) {
    return;
  }
  if (isElectron() && !isUndefined(window?.ipcRenderer)) {
    window?.ipcRenderer.removeListener(name, listener);
    return;
  }
  if (window.cloud_proxy) {
    window?.cloud_proxy.off(name, listener);
  }
};

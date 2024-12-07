import { getUserID } from './uid';

export const isOnline = () => {
  const netStatus = localStorage.getItem('net-status');
  return netStatus === 'online';
};

export const isLogIn = () => {
  const userId = getUserID();
  return userId !== 'NO_LOGIN';
};

//当前项目是否是离线项目
export const isOfflineProject = () => {
  const projectStatus = localStorage.getItem('project-net-status');
  return projectStatus === 'offline';
};

export const setNetStatus = (status) => {
  localStorage.setItem('net-status', status);
};

//设置当前项目在线状态
export const setProjectNetStatus = (status) => {
  localStorage.setItem('project-net-status', status);
};

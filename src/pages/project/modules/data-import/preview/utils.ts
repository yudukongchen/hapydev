import { EnvironmentItem } from '#types/environment';

export const prepareEnvsList = (envList: EnvironmentItem[], ckeckedKeys: string[]) => {
  const checkedData = {};
  ckeckedKeys?.forEach((key) => {
    checkedData[key] = true;
  });
  const resultList = [];
  envList?.forEach((item) => {
    if (checkedData?.[item?.env_id] === true) {
      resultList.push(item);
    }
  });
  return resultList;
};

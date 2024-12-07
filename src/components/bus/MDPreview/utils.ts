export const filterList = (list) => {
  return list.filter((item) => item?.is_used === 1);
};

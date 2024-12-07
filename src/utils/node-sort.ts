import { isString, pick } from 'lodash';

export const nodeSort = (pre, after) => {
  // console.log(pre, '===pre===');
  //  console.log({ pre: pick(pre, ['sort', 'name']), after: pick(after, ['sort', 'name']) });
  if (pre.sort !== after.sort) {
    // console.log('sort');
    return pre.sort - after.sort;
  }
  if (isString(pre?.name) && isString(after?.name)) {
    // console.log('localeCompare');
    return `${pre.name}`.localeCompare(`${after.name}`);
  }
  return 0;
};

import { setApi, appendAssert } from '@reducers/tempDatas/api';
import { isUndefined } from 'lodash';

const ACTIONS = {
  error: (params) => {
    console.log('error', params);
  },
  visualizing: (params) => {
    const { data } = params;
    return setApi({
      id: data?.id,
      data: {
        visualiz_html: data?.html ?? '',
      },
    });
  },
  assert: (params) => {
    const { data } = params;
    const { id, ...restData } = params?.data ?? {};
    return appendAssert({
      id,
      data: restData,
    });
  },
};

export const getReducerAction = (params) => {
  const action = ACTIONS?.[params.type];
  if (isUndefined(action)) {
    return null;
  }
  return action(params);
};

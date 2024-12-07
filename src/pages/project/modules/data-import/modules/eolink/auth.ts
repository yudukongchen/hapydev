import { HTTP_AUTH, TYPE_AUTH_BASIC, TYPE_AUTH_JWT } from '#types/auth/http';
import { isBoolean, isEmpty, isPlainObject, isUndefined } from 'lodash';
import { PICK_KEYS } from '../constants';

const flattenDatas = (foxAuth, keys) => {
  const result = {};
  if (!isPlainObject(foxAuth)) {
    return result;
  }

  keys.forEach((key) => {
    const itemValue = foxAuth?.[key];
    if (isUndefined(itemValue)) {
      return;
    }
    if (isBoolean(itemValue)) {
      result[key] = itemValue ? 1 : -1;
      return;
    }
    result[key] = itemValue;
  });
  return result;
};

export const parseAuth = (authInfo) => {
  const result = {} as HTTP_AUTH;
  if (isUndefined(authInfo) || isEmpty(authInfo)) {
    result.type = 'inherit';
    return result;
  }
  //没有认证
  if (authInfo?.status === '0') {
    result.type = 'noauth';
    return result;
  }
  //basic认证
  if (authInfo?.status === '1') {
    result.type = 'basic';
    result.basic = flattenDatas(authInfo?.basicAuth, PICK_KEYS.basic) as TYPE_AUTH_BASIC;
    return result;
  }
  if (authInfo?.status === '2') {
    result.type = 'jwt';
    const jwt = flattenDatas(authInfo?.jwtAuth, PICK_KEYS.jwt) as TYPE_AUTH_JWT;
    jwt.algorithm = authInfo?.jwtAuth?.alg;
    jwt.headerPrefix = isEmpty(authInfo?.jwtAuth?.isBearer) ? 'Bearer' : '';
    jwt.addTokenTo = authInfo?.jwtAuth?.position === 'header' ? 'header' : 'query';
    result.jwt = jwt;
    return result;
  }
  return result;
};

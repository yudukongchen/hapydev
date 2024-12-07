import {
  HTTP_AUTH,
  TYPE_AUTH_API_KEY,
  TYPE_AUTH_ASAP,
  TYPE_AUTH_AWSV4,
  TYPE_AUTH_BASIC,
  TYPE_AUTH_DIGEST,
  TYPE_AUTH_EDGEGRID,
  TYPE_AUTH_HAWK,
  TYPE_AUTH_JWT,
  TYPE_AUTH_NTLM,
  TYPE_AUTH_OAUTH1,
  TYPE_AUTH_OAUTH2,
} from '#types/auth/http';
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

export const parseAuth = (auth) => {
  const result = {} as HTTP_AUTH;
  if (isUndefined(auth) || isEmpty(auth) || auth.type === 'inherit') {
    result.type = 'inherit';
    return result;
  }
  result.type = auth?.type;
  if (auth?.type === 'noauth') {
    return result;
  }
  if (auth?.type === 'kv') {
    result.type = 'apikey';
    result.apikey = flattenDatas(auth?.kv, PICK_KEYS.apikey) as TYPE_AUTH_API_KEY;
    return result;
  }
  if (auth?.type === 'basic') {
    result.basic = flattenDatas(auth?.basic, PICK_KEYS.basic) as TYPE_AUTH_BASIC;
    return result;
  }
  if (auth?.type === 'bearer') {
    result.bearer = {
      token: auth?.bearer?.key,
    };
    return result;
  }
  if (auth?.type === 'jwt') {
    const jwt = flattenDatas(auth?.jwt, PICK_KEYS.jwt) as TYPE_AUTH_JWT;
    jwt.addTokenTo = auth?.jwt?.addTokenTo === 'header' ? 'header' : 'query';
    result.jwt = jwt;
    return result;
  }
  if (auth?.type === 'digest') {
    result.digest = flattenDatas(auth?.digest, PICK_KEYS.digest) as TYPE_AUTH_DIGEST;
    result.digest.nonceCount = auth?.digest?.nc ?? '';
    result.digest.clientNonce = auth?.digest?.cnonce ?? '';
    return result;
  }
  if (auth?.type === 'oauth1') {
    const oauth1 = flattenDatas(auth?.oauth1, PICK_KEYS.oauth1) as TYPE_AUTH_OAUTH1;
    oauth1.addParamsToHeader = auth?.oauth1?.in === 'header' ? 1 : -1;
    result.oauth1 = oauth1;
    return result;
  }
  if (auth?.type === 'oauth2') {
    const oauth2 = flattenDatas(auth?.oauth2, PICK_KEYS.oauth2) as TYPE_AUTH_OAUTH2;
    if (auth?.oauth2?.useTokenConfigAsRefreshTokenConfig === true) {
      oauth2.fllowAcceccTokenUrl = 1;
    }
    oauth2.addTokenTo = auth?.oauth2?.addTokenTo === 'header' ? 'header' : 'url';
    result.oauth2 = oauth2;
  }
  if (auth?.type === 'hawk') {
    result.hawk = flattenDatas(auth?.hawk, PICK_KEYS.hawk) as TYPE_AUTH_HAWK;
    return result;
  }
  if (auth?.type === 'awsv4') {
    result.awsv4 = flattenDatas(auth?.awsv4, PICK_KEYS.awsv4) as TYPE_AUTH_AWSV4;
    return result;
  }
  if (auth?.type === 'ntlm') {
    result.ntlm = flattenDatas(auth?.ntlm, PICK_KEYS.ntlm) as TYPE_AUTH_NTLM;
    return result;
  }
  if (auth?.type === 'edgegrid') {
    const edgegrid = flattenDatas(auth?.edgegrid, PICK_KEYS.edgegrid) as TYPE_AUTH_EDGEGRID;
    result.edgegrid = edgegrid;
    return result;
  }
  if (auth?.type === 'asap') {
    result.asap = flattenDatas(auth?.asap, PICK_KEYS.asap) as TYPE_AUTH_ASAP;
  }
  return result;
};

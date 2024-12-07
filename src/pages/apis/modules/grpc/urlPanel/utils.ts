import { GrpcService } from '#types/collection/grpc';
import method1 from './icons/method1.svg?react';
import method2 from './icons/method2.svg?react';
import method3 from './icons/method3.svg?react';
import method4 from './icons/method4.svg?react';

export const getMethodIndex = (request_stream, response_stream) => {
  if (request_stream === -1 && response_stream === -1) {
    return 1;
  }
  if (request_stream === 1 && response_stream === -1) {
    return 2;
  }
  if (request_stream === -1 && response_stream === 1) {
    return 3;
  }
  if (request_stream === 1 && response_stream === 1) {
    return 4;
  }
};

export const getMethodSvg = (request_stream, response_stream) => {
  const result = {
    1: method1,
    2: method2,
    3: method3,
    4: method4,
  };
  const index = getMethodIndex(request_stream, response_stream);

  return result?.[index];
};

export const listDataToObj = (list: GrpcService[]) => {
  const result = {};
  list.forEach((item) => {
    const methodData = {};
    item.methods.forEach((methodItem) => {
      methodData[methodItem.method_name] = methodItem;
    });
    result[item.service_name] = methodData;
  });
  return result;
};

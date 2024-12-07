import { cloneDeep, isArray, isUndefined } from 'lodash';

export const getBodyMode = (data) => {
  if (isUndefined(data)) {
    return 'none';
  }
  if (!isUndefined(data?.['multipart/form-data'])) {
    return 'form-data';
  }
  if (!isUndefined(data?.['application/x-www-form-urlencoded'])) {
    return 'urlencoded';
  }
  if (!isUndefined(data?.['application/octet-stream'])) {
    return 'binary';
  }
  if (!isUndefined(data?.['text/plain'])) {
    return 'plain';
  }
  if (!isUndefined(data?.['application/javascript'])) {
    return 'javascript';
  }
  if (!isUndefined(data?.['application/json'])) {
    return 'json';
  }
  if (!isUndefined(data?.['text/html'])) {
    return 'html';
  }
  if (!isUndefined(data?.['application/xml'])) {
    return 'xml';
  }
};

// 获取对象类型
export const getItemType = (props) => {
  if (!isUndefined(props?.APIPOST_REFS)) {
    return 'ref';
  }
  if (isArray(props?.type)) {
    if (props.type.length > 2) {
      return 'other';
    }
    return props.type?.[0] ?? '';
  }

  if (!isUndefined(props?.type)) {
    return props.type;
  }
  if (!isUndefined(props?.oneOf)) {
    return 'oneOf';
  }
  if (!isUndefined(props?.anyOf)) {
    return 'anyOf';
  }
  if (!isUndefined(props?.allOf)) {
    return 'allOf';
  }
  return '';
};

// const parseObject = (schema) => {
//   const result: any = {};
//   Object.entries(schema).forEach(([key, dataValue]) => {
//     //如果是对象下的属性，进行二次遍历
//     if (key === 'properties') {
//       const newProperties = {};
//       Object.keys(dataValue).forEach((attr) => {
//         newProperties[attr] = parseApipostSchema(dataValue[attr]);
//       });
//       result.properties = newProperties;
//       return;
//     }
//     result[key] = dataValue;
//   });
//   return result;
// };

// export const parseApipostSchema = (apipostSchema) => {
//   const dataType = getItemType(apipostSchema);
//   const tempData = cloneDeep(apipostSchema);

//   if (dataType === 'object') {
//     return parseObject(tempData);
//   }
//   if (dataType === 'allOf') {
//     tempData.allOf = parseObject(tempData.allOf);
//     return tempData;
//   }
//   if (dataType === 'anyOf') {
//     tempData.anyOf = parseObject(tempData.anyOf);
//     return tempData;
//   }
//   if (dataType === 'oneOf') {
//     tempData.oneOf = parseObject(tempData.oneOf);
//     return tempData;
//   }
//   if (dataType === 'array') {
//     tempData.items = parseObject(tempData.items);
//     return tempData;
//   }
//   if (dataType === 'ref') {
//     debugger;
//   }
//   return tempData;
// };

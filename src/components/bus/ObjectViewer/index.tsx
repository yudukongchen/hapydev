import React from 'react';
import cn from 'classnames';
import { ObjectViewWrapper, StringViewWrapper } from './style';
import { theme } from 'antd';
import {
  isArray,
  isBoolean,
  isEmpty,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isString,
} from 'lodash';

import ObjectItem from './objectItem';

type Props = {
  data: any;
};

const ObjectView: React.FC<Props> = (props) => {
  const { data } = props;
  const { token } = theme.useToken();

  if (isString(data) && !isEmpty(data)) {
    return <StringViewWrapper token={token}>{data}</StringViewWrapper>;
  }

  //不是对象不渲染
  if (!isObject(data)) {
    return null;
  }

  //如果是对象，则遍历当前
  if (isArray(data)) {
    return (
      <>
        {data.map((item, index) => (
          <ObjectView data={item} key={index} />
        ))}
      </>
    );
  }

  const renderValue = (val) => {
    if (isBoolean(val)) {
      return 'null';
    }
    if (isNumber(val)) {
      return val;
    }
    if (isString(val)) {
      return `"${val.toString()}"`;
    }
    if (isFunction(val)) {
      return 'Function';
    }
    return null;
  };

  //对象解析
  const renderData = (objData) => {
    const dataList = isPlainObject(objData) ? Object.entries(objData) : [];
    return dataList.map(([key, item], index) => {
      if (isArray(item)) {
        return (
          <React.Fragment key={index}>
            {item.map((arrItem, index) => (
              <ObjectItem
                itemKey={`${key}[${index}]`}
                itemValue={arrItem}
                key={index}
                renderData={renderData}
              />
            ))}
          </React.Fragment>
        );
      }
      if (isPlainObject(item)) {
        return <ObjectItem itemKey={key} itemValue={item} key={index} renderData={renderData} />;
      }
      return (
        <div key={index} className={cn('key-item', 'string')}>
          <div className="string-key">{key}:</div>
          <div className="string-value">{renderValue(item)}</div>
        </div>
      );
    });
  };

  return <ObjectViewWrapper token={token}>{renderData(data)}</ObjectViewWrapper>;
};

export default ObjectView;

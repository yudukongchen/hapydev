import { theme } from 'antd';
import React from 'react';
import { StatusWrapper } from './style';
import { getConetntSize, getStatusTime } from './utils';
import { isObject } from 'lodash';

type Props = {
  response: any;
};

const Status: React.FC<Props> = (props) => {
  const { response } = props;

  const { token } = theme.useToken();

  const messageData = response?.messages?.[0]?.data;
  const bolbData = new Blob([isObject(messageData) ? JSON.stringify(messageData) : messageData]);

  return (
    <StatusWrapper token={token}>
      <div className="status-item">
        <span>状态码:</span>
        <span className="green">{response?.statusCode}</span>
        <span className="green">{response?.statusCode == 0 && 'OK'}</span>
      </div>
      <div className="status-item">
        <span>耗时:</span>
        <span className="green">{getStatusTime(response?.responseTime)}</span>
      </div>
      <div className="status-item">
        <span>大小:</span>
        <span className="green">{getConetntSize(bolbData?.size)}</span>
      </div>
    </StatusWrapper>
  );
};

export default Status;

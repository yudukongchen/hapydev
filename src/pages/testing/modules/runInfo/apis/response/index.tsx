import { methodsWrapper } from '@theme/methods';
import { ResponseWrapper } from './style';
import cn from 'classnames';
import AssertPanel from './asserts';
import { theme } from 'antd';
import RequestDetail from './request-info';
import ResponseDetail from './response-info';
import React from 'react';
import { getConetntSize, getStatusTime } from '@utils/response';

type Props = {
  resultInfo: any;
};

const ResponseInfo: React.FC<Props> = (props) => {
  const { resultInfo } = props;

  const { token } = theme.useToken();
  return (
    <ResponseWrapper token={token} className="beautify-scrollbar">
      <div className={cn('url-panel', methodsWrapper)}>
        <span className={cn('method', resultInfo?.request?.method)}>
          {resultInfo?.request?.method}
        </span>
        <span>{resultInfo?.request?.url}</span>
      </div>
      <div className="status-panel">
        <div>
          状态<span>{resultInfo?.response?.statusCode}</span>
        </div>
        <div>
          耗时<span>{getStatusTime(resultInfo?.response?.timingPhases?.total)}</span>
        </div>
        <div>
          大小<span>{getConetntSize(resultInfo?.response?.contentSize)}</span>
        </div>
      </div>
      <div className="case-item">
        <div className="case-title">断言:</div>
        <AssertPanel className="case-content" asserts={resultInfo?.asserts} />
      </div>
      <div className="case-item">
        <div className="case-title">请求详情:</div>
        <RequestDetail request={resultInfo?.request} />
      </div>
      <div className="case-item">
        <div className="case-title">响应详情:</div>
        <ResponseDetail response={resultInfo?.response} />
      </div>
    </ResponseWrapper>
  );
};

export default ResponseInfo;

import { Drawer, theme } from 'antd';
import { ListWrapper } from './style';
import cn from 'classnames';
import { methodsWrapper } from '@theme/methods';
import { useSafeState } from 'ahooks';
import ResponseInfo from '../response';
import { isNull, isNumber, isString } from 'lodash';
import { getStatusTime } from '@utils/response';
import React from 'react';

type Props = {
  apiList: any[];
};
const ListPanel: React.FC<Props> = (props) => {
  const { apiList } = props;
  const { token } = theme.useToken();
  const [resultInfo, setResultInfo] = useSafeState(null);

  return (
    <>
      <Drawer
        title="请求详情"
        destroyOnClose
        width={600}
        open={!isNull(resultInfo)}
        onClose={setResultInfo.bind(null, null)}
      >
        <ResponseInfo resultInfo={resultInfo} />
      </Drawer>
      <ListWrapper token={token}>
        {apiList.map((item, index) => {
          const isSuccess =
            item?.data?.asserts?.every((item) => item.result === true) &&
            item?.data?.response?.statusCode >= 200 &&
            item?.data?.response?.statusCode < 300 &&
            item.data?.error === null;
          return (
            <React.Fragment key={index}>
              <div
                className={cn('list-item', methodsWrapper)}
                onClick={setResultInfo.bind(null, item?.data)}
              >
                <div
                  className={cn('result ', {
                    success: isSuccess,
                    failed: !isSuccess,
                  })}
                >
                  {isSuccess ? '通过' : '失败'}
                </div>
                <div className={cn('method', item?.data?.request?.method ?? 'GET')}>
                  {item?.data?.request?.method ?? 'GET'}
                </div>
                <div className="api-name">{item?.name}</div>
                <div className="url">
                  {isString(item?.data?.request?.url)
                    ? item?.data?.request?.url
                    : item?.data?.error}
                </div>
                <div className="code">
                  状态码:
                  {isNumber(item?.data?.response?.statusCode) ? (
                    <span
                      className={cn({
                        green: isSuccess,
                        red: !isSuccess,
                      })}
                    >
                      {item?.data?.response?.statusCode ?? '-'}
                    </span>
                  ) : (
                    '-'
                  )}
                </div>
                <div className="time">
                  耗时:
                  {isNumber(item?.data?.response?.timingPhases?.total) ? (
                    <span className="green">
                      {getStatusTime(item?.data?.response?.timingPhases?.total)}
                    </span>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </ListWrapper>
    </>
  );
};
export default ListPanel;

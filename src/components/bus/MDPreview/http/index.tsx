import { ApiCollection } from '#types/collection/api';
import React, { useMemo } from 'react';
import { theme } from 'antd';
import cn from 'classnames';
import { HttpPreviewWrapper } from './style';
import { isArray, isEmpty, isString } from 'lodash';
import dayjs from 'dayjs';
import DataTable from '../components/dataTable';
import PathTable from '../components/dataTable/path-table';
import { filterList } from '../utils';
import JsonView from '@components/base/JsonView';
import { BODY_MODES } from '@constants/apis/body-modes';
import { API_STATUS } from '@constants/api_status';
import { methodsWrapper } from '@theme/methods';
import UserInfo from '../components/userInfo';
import Examples from './examples';

type Props = {
  value: ApiCollection;
};

const HttpPreview: React.FC<Props> = (props) => {
  const { value } = props;
  const { token } = theme.useToken();

  const requestData = value?.data?.request;
  const pathList = filterList(requestData?.params?.restful);
  const headerList = filterList(requestData?.headers?.parameter);
  const queryList = filterList(requestData?.params?.parameter);
  const bodyList = filterList(requestData?.body?.parameter);

  const bodyContent = useMemo(() => {
    if (requestData?.body?.mode === 'none') {
      return null;
    }
    if (['urlencoded', 'form-data'].includes(requestData?.body?.mode)) {
      if (isArray(bodyList) && bodyList.length > 0) {
        return (
          <div className="request-item">
            <div className="item-title">Body 参数</div>
            <DataTable value={bodyList} />
          </div>
        );
      }
      return null;
    }
    if (requestData?.body?.mode === 'binary') {
      return (
        <div className="request-item">
          <div className="item-title">Body 参数</div>
          <div className="binary">二进制文件</div>
        </div>
      );
    }

    if (['json', 'xml', 'javascript', 'plain', 'html'].includes(requestData?.body?.mode)) {
      if (isString(requestData?.body?.raw) && requestData?.body?.raw.length > 0) {
        return (
          <div className="request-item">
            <div className="item-title">
              Body 参数
              {isString(BODY_MODES?.[requestData?.body?.mode]) && (
                <span className="mode">{BODY_MODES?.[requestData?.body?.mode]}</span>
              )}
            </div>
            <JsonView value={requestData?.body?.raw} />
          </div>
        );
      }
    }

    return null;
  }, [requestData]);

  return (
    <HttpPreviewWrapper className="beautify-scrollbar" token={token}>
      <div className="doc-name">
        <span className="name">{value?.name}</span>
        <span className="status" style={{ color: API_STATUS?.[value?.data?.status]?.color }}>
          {API_STATUS?.[value?.data?.status]?.title}
        </span>
      </div>
      <div className={cn(methodsWrapper, 'url-panel')}>
        <span className={cn('method', value?.data?.request?.method)}>
          {value?.data?.request?.method}
        </span>
        <span className="url">{value?.data?.request?.url}</span>
      </div>
      <div className="info-panel">
        <div>
          <span className="case-name">创建时间: </span>
          <span className="case-value">
            {!isEmpty(value?.create_time)
              ? dayjs(value?.create_time).format('YYYY-MM-DD HH:mm')
              : '-'}
          </span>
          <span className="case-name">创建人: </span>
          <span className="case-value">
            <UserInfo uid={value?.creator_id} />
          </span>
        </div>
        <div>
          <span className="case-name">最后更新: </span>
          <span className="case-value">
            {!isEmpty(value?.update_time)
              ? dayjs(value?.update_time).format('YYYY-MM-DD HH:mm')
              : '-'}
          </span>
          <span className="case-name">更新人: </span>
          <span className="case-value">
            <UserInfo uid={value?.updater_id} />
          </span>
        </div>
      </div>

      <div className="big-title">请求参数</div>
      {pathList?.length > 0 ||
      headerList?.length > 0 ||
      queryList?.length > 0 ||
      bodyContent !== null ? (
        <>
          <div className="request-panel">
            {isArray(pathList) && pathList.length > 0 && (
              <div className="request-item">
                <div className="item-title">路径参数</div>
                <PathTable value={pathList} />
              </div>
            )}

            {isArray(headerList) && headerList.length > 0 && (
              <div className="request-item">
                <div className="item-title">Header 参数</div>
                <DataTable value={headerList} />
              </div>
            )}
            {isArray(queryList) && queryList.length > 0 && (
              <div className="request-item">
                <div className="item-title">Query 参数</div>
                <DataTable value={queryList} />
              </div>
            )}
            {bodyContent}
          </div>
        </>
      ) : (
        <div className="request-none">
          <span>无请求参数</span>
        </div>
      )}
      <Examples examples={value?.data?.examples} />
    </HttpPreviewWrapper>
  );
};

export default HttpPreview;

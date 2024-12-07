import { ApiResponse } from '#types/collection/api';
import { isEmpty, isEqual } from 'lodash';
import React from 'react';
import SchemaViewer from '@components/base/SchemaViewer';
import { ExamplesWrapper } from './style';
import JsonView from '@components/base/JsonView';
import { theme } from 'antd';

type Props = {
  examples: ApiResponse[];
};
const Examples: React.FC<Props> = (props) => {
  const { examples } = props;
  const { token } = theme.useToken();

  if (isEmpty(examples)) {
    return null;
  }

  return (
    <ExamplesWrapper token={token}>
      <div className="big-title">响应示例</div>

      {examples?.map((item, index) => (
        <div className="example-item" key={index}>
          <div className="example-title">{item?.name}</div>
          <div className="example-info">
            <div>
              <span>HTTP状态码：</span>
              <span>{item?.http_code}</span>
            </div>
            <div>
              <span>内容格式：</span>
              <span>{item?.content_type}</span>
            </div>
          </div>
          <div className="item-content">
            <div className="schema-viewer">
              <div className="item-title">数据结构</div>
              <div className="viewer-content">
                {isEmpty(item.schema) || isEqual({ type: 'object' }, item.schema) ? (
                  <>未定义</>
                ) : (
                  <SchemaViewer value={item.schema} />
                )}
              </div>
            </div>
            <div className="raw-panel">
              <div className="item-title">响应示例</div>
              <div className="raw-content">
                {isEmpty(item?.raw) ? <>未定义</> : <JsonView value={item?.raw} />}
              </div>
            </div>
          </div>
        </div>
      ))}
    </ExamplesWrapper>
  );
};

export default Examples;

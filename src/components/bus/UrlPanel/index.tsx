import React from 'react';
import { UrlPanelWrapper, methodWrapper } from './style';
import { Space, Select, Input, Button, Dropdown } from 'antd';
import { API_METHODS } from './constant';
import SvgDown from '@assets/icons/angle-down.svg?react';
import produce from 'immer';
import { useMemoizedFn } from 'ahooks';
import { ApiRequest } from '#types/collection/api';
import { parseUrlToPath, parseUrlToQuery } from '@utils/query';
import { isNull } from 'lodash';

type Props = {
  value: ApiRequest;
  onChange: (newVal: any) => void;
  onRequest: (withSave: boolean) => void;
  onSave: () => void;
  className?: string;
};

const ApiURLPanel: React.FC<Props> = (props) => {
  const { value, onChange, onRequest, onSave, className } = props;

  const compuatedMethods = API_METHODS.map((item) => ({
    value: item,
    label: item,
  }));

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    const result = produce(value, (draft) => {
      draft.url = newUrl;
      //同时修改paramter
      draft.params.parameter = parseUrlToQuery(draft.url, draft.params.parameter);
      const path = parseUrlToPath(draft.url, draft.params.restful);
      if (!isNull(path)) {
        draft.params.restful = path;
      }
    });

    onChange(result);
  };

  return (
    <UrlPanelWrapper className={className}>
      <Space.Compact className="api-url-group">
        <Select
          popupClassName={methodWrapper}
          defaultValue="GET"
          value={value?.method}
          onChange={handleChange.bind(null, 'method')}
          options={compuatedMethods}
        />
        <Input value={value?.url} spellCheck={false} onChange={handleChangeUrl} />
      </Space.Compact>
      <Space.Compact>
        <Button onClick={onRequest.bind(null, false)} className="api-btn" type="primary">
          发送
        </Button>
        <Dropdown
          menu={{
            items: [
              {
                label: '发送并保存',
                key: 'send-save',
                onClick: onRequest.bind(null, true),
              },
            ],
          }}
          placement="bottomRight"
        >
          <Button
            style={{ width: 26, fontSize: 12, paddingTop: 5 }}
            icon={<SvgDown />}
            type="primary"
          ></Button>
        </Dropdown>
      </Space.Compact>

      <Button className="api-btn" type="default" onClick={onSave}>
        保存
      </Button>
    </UrlPanelWrapper>
  );
};

export default ApiURLPanel;

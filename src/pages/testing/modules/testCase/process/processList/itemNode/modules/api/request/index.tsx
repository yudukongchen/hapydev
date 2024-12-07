import { ApiCollection, ApiRequest } from '#types/collection/api';
import React, { useEffect } from 'react';
import ApiRequestPanel from '@components/bus/ApiRequest';
import { Button, Input, Select, Space, Switch, theme } from 'antd';
import { css } from '@emotion/css';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';
import { API_METHODS } from '@constants/api_methods';
import { RequestWrapper } from './style';
import { cloneDeep, isNull, isObject } from 'lodash';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';

type Props = {
  defaultValue: ApiRequest;
  onClose: () => void;
  onSave: (is_link: 1 | -1, newVal: ApiRequest) => void;
  api_id: string;
  is_link: 1 | -1;
};

const RequestPanel: React.FC<Props> = (props) => {
  const { defaultValue, onClose, onSave, api_id, is_link } = props;
  const apiData: ApiCollection = useSelector(
    (store: any) => store?.apis?.datas?.base_datas?.[api_id]
  );

  const { token } = theme.useToken();

  const [link, setLink] = useSafeState<1 | -1>(null);
  const [value, onChange] = useSafeState<ApiRequest>(null);

  useEffect(() => {
    setLink(is_link);
  }, [is_link]);

  useEffect(() => {
    onChange(defaultValue);
  }, [defaultValue]);

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

  const handleSave = useMemoizedFn(() => {
    //如果不是同步
    if (link === -1) {
      onSave(link, value);
      return;
    }
    const saveApiData = cloneDeep(apiData);
    saveApiData.data.request = value;
    emitGlobal('APIS/saveApi', {
      data: saveApiData,
      callback: () => {
        onSave(link, value);
      },
    });
  });

  const handlePullData = useMemoizedFn(() => {
    if (isObject(apiData?.data?.request)) {
      onChange(apiData?.data?.request);
    }
  });

  const handleChangeLink = useMemoizedFn((ckd) => {
    if (ckd) {
      setLink(1);
      return;
    }
    setLink(-1);
  });

  if (isNull(value) || isNull(link)) {
    return null;
  }

  return (
    <RequestWrapper token={token}>
      <div className="url-panel">
        <Space.Compact className="api-url-group">
          <Select
            popupClassName={css`
              width: 120px !important;
            `}
            defaultValue="GET"
            value={value?.method}
            onChange={handleChange.bind(null, 'method')}
            options={compuatedMethods}
          />
          <Input
            value={value?.url}
            spellCheck={false}
            onChange={(e) => {
              handleChange('url', e.target.value);
            }}
          />
        </Space.Compact>
      </div>
      <div className="request-container">
        <ApiRequestPanel value={value} onChange={onChange} />
      </div>
      <div className="footer-panel">
        <div className="footer-left">
          <Switch checked={link === 1} onChange={handleChangeLink} />
          <span>自动同步接口数据</span>
        </div>
        <div className="btns-panel">
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSave}>
            保存
          </Button>
          {link === -1 && <Button onClick={handlePullData}>获取最新数据</Button>}
        </div>
      </div>
    </RequestWrapper>
  );
};

export default RequestPanel;

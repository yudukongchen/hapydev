import React from 'react';
import { Tabs, TabsProps, theme } from 'antd';
import { ResponseWrapper } from './style';
import Initial from './Initial';
import Sending from './Sending';
import SendError from './SendError';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { setApi } from '@reducers/tempDatas/api';
import { isEmpty, isObject } from 'lodash';
import Body from './Body';
import Cookies from '../ApiCookies';
import Headers from './Headers';
import Asserts from './Asserts';
import Status from './Status';
import { defaultTabsWrapper } from '@components/themes/tabs';
import { ApiResponse } from '#types/collection/api';
import Examples from './examples';

interface ResponseProps {
  api_id: string;
  value: ApiResponse[];
  onChange: (newVal: ApiResponse[]) => void;
}

const ResponsePanel: React.FC<ResponseProps> = (props) => {
  const { api_id, value, onChange } = props;

  const dispatch = useDispatch();

  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);

  const { token } = theme.useToken();

  const handleTabChange = () => {};

  const items: TabsProps['items'] = [
    {
      key: 'body',
      label: 'Body',
      children: isEmpty(tempData?.response) ? (
        <Initial />
      ) : (
        <Body visualiz_html={tempData?.visualiz_html} response={tempData?.response} />
      ),
    },
    {
      key: 'cookies',
      label: 'Cookies',
      children: isEmpty(tempData?.response) ? (
        <Initial />
      ) : (
        <Cookies list={tempData?.response?.cookies} />
      ),
    },
    {
      key: 'headers',
      label: 'Headers',
      children: isEmpty(tempData?.response) ? (
        <Initial />
      ) : (
        <Headers headers={tempData?.response?.headers} />
      ),
    },
    {
      key: 'tests',
      label: '测试结果',
      children: isEmpty(tempData?.response) ? <Initial /> : <Asserts asserts={tempData?.asserts} />,
    },
    {
      key: 'examples',
      label: '响应示例',
      children: <Examples api_id={api_id} value={value} onChange={onChange} />,
    },
  ];

  const handleSetStatus = useMemoizedFn((status) => {
    dispatch(
      setApi({
        id: api_id,
        data: {
          status,
        },
      })
    );
  });

  return (
    <ResponseWrapper token={token}>
      {tempData?.status === 'sending' && <Sending api_id={api_id} />}
      {tempData?.status === 'sendError' && (
        <SendError
          errorMessage={tempData?.message}
          onClose={handleSetStatus.bind(null, 'initial')}
        />
      )}

      <Tabs
        tabBarExtraContent={{
          right: isObject(tempData?.response) ? <Status response={tempData?.response} /> : null,
        }}
        className={defaultTabsWrapper}
        defaultActiveKey="body"
        items={items}
        onChange={handleTabChange}
      />
    </ResponseWrapper>
  );
};

export default React.memo(ResponsePanel);

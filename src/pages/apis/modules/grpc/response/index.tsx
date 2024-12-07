import React from 'react';
import { Tabs, TabsProps, theme } from 'antd';
import { ResponseWrapper } from './style';
import Initial from './Initial';
import Sending from './Sending';
import SendError from './SendError';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { setApi } from '@reducers/tempDatas/api';
import { isEmpty, isObject, isUndefined } from 'lodash';
import Body from './Body';
import Metadata from './Metadata';
import Trailers from './Trailers';
import Asserts from './Asserts';
import Status from './Status';
import { defaultTabsWrapper } from '@components/themes/tabs';

interface ResponseProps {
  api_id: string;
  direction?: 'horizontal' | 'vertical';
}

const ResponsePanel: React.FC<ResponseProps> = (props) => {
  const { api_id, direction } = props;

  const dispatch = useDispatch();

  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);

  const { token } = theme.useToken();

  const items: TabsProps['items'] = [
    {
      key: 'body',
      label: 'Body',
      children: isUndefined(tempData?.messages) ? (
        <Initial />
      ) : (
        <Body api_id={api_id} tempData={tempData} />
      ),
    },
    {
      key: 'metadata',
      label: 'Metadata',
      children: isEmpty(tempData?.response) ? (
        <Initial />
      ) : (
        <Metadata dataList={tempData?.response?.metadata ?? []} />
      ),
    },
    {
      key: 'trailers',
      label: 'Trailers',
      children: isEmpty(tempData?.response) ? (
        <Initial />
      ) : (
        <Trailers dataList={tempData?.response?.trailer ?? []} />
      ),
    },
    {
      key: 'tests',
      label: '测试结果',
      children: isEmpty(tempData?.response) ? <Initial /> : <Asserts asserts={tempData?.asserts} />,
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
      />
    </ResponseWrapper>
  );
};

export default React.memo(ResponsePanel);

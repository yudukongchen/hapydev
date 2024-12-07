import React from 'react';
import { Tabs, TabsProps, theme } from 'antd';
import { ResponseWrapper } from './style';
import Initial from './Initial';
import Sending from './Sending';
import SendError from './SendError';
import { useMemoizedFn } from 'ahooks';
import { useDispatch, useSelector } from 'react-redux';
import { setApi } from '@reducers/tempDatas/api';
import { isEmpty } from 'lodash';
import Body from './Body';
import Asserts from './Asserts';
import { defaultTabsWrapper } from '@components/themes/tabs';

interface ResponseProps {
  api_id: string;
}

const ResponsePanel: React.FC<ResponseProps> = (props) => {
  const { api_id } = props;

  const dispatch = useDispatch();

  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);

  const { token } = theme.useToken();

  const handleTabChange = () => {};

  const items: TabsProps['items'] = [
    {
      key: 'body',
      label: '实时响应',
      children: isEmpty(tempData?.response) ? (
        <Initial />
      ) : (
        <Body visualiz_html={tempData?.visualiz_html} response={tempData?.response} />
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
        className={defaultTabsWrapper}
        defaultActiveKey="body"
        items={items}
        onChange={handleTabChange}
      />
    </ResponseWrapper>
  );
};

export default React.memo(ResponsePanel);

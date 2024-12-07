import { DescriptionsProps, theme } from 'antd';
import { DescriptionWrapper } from './style';
import React from 'react';
import dayjs from 'dayjs';
import { getConetntSize, getStatusTime } from '@utils/response';

type Props = {
  create_time: string;
  finish_time: string;
  cost_time: string;
  env_name: string;
  user_name: string;
  response_time: {
    total_time: number;
    avg_time: number;
  };
  total_size: number;
};

const CountsPanel: React.FC<Props> = (props) => {
  const { create_time, finish_time, cost_time, env_name, user_name, response_time, total_size } =
    props;

  const { token } = theme.useToken();

  const descriptionsItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '开始时间',
      children: dayjs(create_time)?.format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: '2',
      label: '结束时间',
      children: dayjs(finish_time)?.format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      key: '3',
      label: '总耗时',
      children: getStatusTime(cost_time),
    },
    {
      key: '4',
      label: '总响应时间',
      children: getStatusTime(response_time.total_time),
    },
    {
      key: '5',
      label: '平均响应时间',
      children: getStatusTime(response_time.avg_time),
    },
    {
      key: '6',
      label: '总响应数据大小',
      children: getConetntSize(total_size),
    },
    {
      key: '7',
      label: '执行环境',
      children: env_name ?? '-',
    },
    {
      key: '8',
      label: '创建人',
      children: user_name ?? '-',
    },
  ];

  return (
    <DescriptionWrapper token={token}>
      {descriptionsItems.map((item, index) => (
        <div key={index} className="desc-item">
          <span className="desc-title">{item.label}:</span>
          <span>{item.children}</span>
        </div>
      ))}
    </DescriptionWrapper>
  );
};

export default CountsPanel;

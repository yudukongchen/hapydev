import { Popover, theme } from 'antd';
import React from 'react';
import { StatusWrapper } from './style';
import SvgNetWork from '@assets/icons/network.svg?react';
import SvgSave from '@assets/icons/save.svg?react';
import { getConetntSize, getStatusTime } from './utils';
import Network from './network';
import Time from './time';
import { download } from '@utils/utils';

type Props = {
  response: any;
};

const Status: React.FC<Props> = (props) => {
  const { response } = props;

  const { token } = theme.useToken();

  return (
    <StatusWrapper token={token}>
      <div className="status-item">
        <Popover content={<Network network={response?.netWork} />} title="网络">
          <SvgNetWork className="status-icon green" />
        </Popover>
        <span>状态码:</span>
        <span className="green">{response?.statusCode}</span>
        <span className="green">{response?.statusMessage}</span>
      </div>
      <div className="status-item">
        <span>耗时:</span>
        {/* <span className="green">{response?.responseAt}</span> */}
        <Popover content={<Time response={response} />} title="事件详情">
          <span className="green">{getStatusTime(response?.timingPhases?.total)}</span>
        </Popover>
      </div>
      <div className="status-item">
        <span>大小:</span>
        <span className="green">{getConetntSize(response?.contentSize)}</span>
        <SvgSave onClick={download.bind(null, response)} className="status-icon" />
      </div>
    </StatusWrapper>
  );
};

export default Status;

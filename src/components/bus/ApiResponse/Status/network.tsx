import { isObject, isString } from 'lodash';
import React from 'react';
import { netWorkWrapper } from './style';

type Props = {
  network: any;
};

const Network: React.FC<Props> = (props) => {
  const { network } = props;

  return (
    <div className={netWorkWrapper}>
      {isString(network?.agent) && (
        <div className="network-item">
          <span className="case-name">代理引擎:</span>
          <span>{network?.agent}</span>
        </div>
      )}
      {isObject(network?.localAddress) && (
        <div className="network-item">
          <span className="case-name">本地网络:</span>
          <span>
            {network?.localAddress?.ip}:{network?.localAddress?.port}
          </span>
        </div>
      )}
      {isObject(network?.remoteAddress) && (
        <div className="network-item">
          <span className="case-name">远端网络:</span>
          <span>
            {network?.remoteAddress?.ip}:{network?.remoteAddress?.port}
          </span>
        </div>
      )}
    </div>
  );
};

export default Network;
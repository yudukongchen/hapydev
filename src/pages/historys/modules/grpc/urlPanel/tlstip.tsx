import React from 'react';
import { tlsTipsWrapper } from './style';

type Props = {
  enabled: boolean;
};
const TlsTip: React.FC<Props> = (props) => {
  const { enabled } = props;

  return (
    <div className={tlsTipsWrapper}>
      {enabled ? (
        <>
          <div className="big-title">启用 TLS</div>
          <div>
            <p className="warning">当前使用不安全的连接</p>
            <p>启用 TLS 以通过安全连接调用该方法。</p>
          </div>
        </>
      ) : (
        <>
          <div className="big-title">禁用 TLS</div>
          <div>
            <p className="green">当前使用安全连接。</p>
            <p>禁用 TLS 以通过不安全的连接调用该方法。</p>
          </div>
        </>
      )}
    </div>
  );
};
export default TlsTip;

import { WebsocketConfig } from '#types/collection/websocket';
import React from 'react';
import { SettingsWrapper } from './style';
import { InputNumber, Switch, theme } from 'antd';

type Props = {
  value: WebsocketConfig;
  onChange: (key: keyof WebsocketConfig, newVal: any) => void;
};
const ConfigWebsocket: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  return (
    <SettingsWrapper token={token}>
      <div className="case-item">
        <div className="left">
          <div className="case-title">启用服务器证书验证</div>
          <div className="desc">通过安全连接进行连接时验证服务器证书</div>
        </div>
        <div className="right">
          <Switch
            checked={value?.enable_ssl_verify === 1}
            onChange={(checked) => {
              onChange('enable_ssl_verify', checked ? 1 : -1);
            }}
          />
          <span className="status-text">
            {value?.enable_ssl_verify === 1 ? '已开启' : '已关闭'}
          </span>
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">握手超时时间</div>
          <div className="desc">
            设置socket请求连接等待超时时长（以毫秒为单位）。 要永不超时，请设置为 0。
          </div>
        </div>
        <div className="right">
          <InputNumber
            size="small"
            spellCheck={false}
            min={0}
            addonAfter="ms"
            value={value?.handshake_timeout}
            onChange={onChange.bind(null, 'handshake_timeout')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">重连次数</div>
          <div className="desc">连接突然断开时的最大重新尝试连接次数。</div>
        </div>
        <div className="right">
          <InputNumber
            size="small"
            min={0}
            addonAfter="次"
            value={value?.max_reconnect_count}
            onChange={onChange.bind(null, 'max_reconnect_count')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">重连间隔时间</div>
          <div className="desc">每次重新连接尝试之间的时间间隔。(以毫秒为单位)</div>
        </div>
        <div className="right">
          <InputNumber
            size="small"
            min={0}
            addonAfter="ms"
            value={value?.reconnect_interval}
            onChange={onChange.bind(null, 'reconnect_interval')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">最大内容大小</div>
          <div className="desc">
            允许的最大发送内容大小（以 MB 为单位）。 要接收任何大小的消息，请设置为 0。
          </div>
        </div>
        <div className="right">
          <InputNumber
            size="small"
            addonAfter="mb"
            min={0}
            value={value?.max_message_size}
            onChange={onChange.bind(null, 'max_message_size')}
          />
        </div>
      </div>
    </SettingsWrapper>
  );
};

export default ConfigWebsocket;

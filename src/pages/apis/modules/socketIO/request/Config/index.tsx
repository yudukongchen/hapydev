import React from 'react';
import { SettingsWrapper } from './style';
import { Input, InputNumber, Select, Switch, theme } from 'antd';
import { SOCKET_IO_VERSIONS } from './constants';
import { css } from '@emotion/css';
import { SocketIOConfig } from '#types/collection/socketIO';

type Props = {
  value: SocketIOConfig;
  onChange: (key: keyof SocketIOConfig, newVal: any) => void;
};
const ConfigSocketIO: React.FC<Props> = (props) => {
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
          <div className="case-title">客户端版本</div>
          <div className="desc">选择应该用于连接服务器的客户端版本</div>
        </div>
        <div className="right">
          <Select
            value={value?.client_version}
            onChange={onChange.bind(null, 'client_version')}
            popupClassName={css`
              width: 60px !important;
            `}
            size="small"
            options={SOCKET_IO_VERSIONS}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">握手路径</div>
          <div className="desc">设置握手请求期间应使用的服务器路径</div>
        </div>
        <div className="right">
          <Input
            size="small"
            spellCheck={false}
            value={value?.handshake_path}
            onChange={(e) => {
              onChange('handshake_path', e.target.value);
            }}
          />
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
    </SettingsWrapper>
  );
};

export default ConfigSocketIO;

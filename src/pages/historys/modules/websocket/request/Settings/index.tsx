import { WebsocketConfig } from '#types/collection/websocket';
import React from 'react';
import { SettingsWrapper } from './style';
import { Input, InputNumber, Select, theme } from 'antd';
import { SOCKET_IO_VERSIONS } from './constants';
import { css } from '@emotion/css';

type Props = {
  value: WebsocketConfig;
  onChange: (key: keyof WebsocketConfig, newVal: any) => void;
};
const Settings: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  return (
    <SettingsWrapper token={token}>
      <div className="case-item">
        <div className="left">
          <div className="case-title">客户端版本</div>
          <div className="desc">选择应该用于连接服务器的客户端版本</div>
        </div>
        <div className="right">
          <Select
            value={value?.socket_io_version}
            onChange={onChange.bind(null, 'socket_io_version')}
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
            value={value?.shake_hand_path}
            onChange={(e) => {
              onChange('shake_hand_path', e.target.value);
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
            min={0}
            addonAfter="ms"
            value={value?.shake_hand_timeout}
            onChange={onChange.bind(null, 'shake_hand_timeout')}
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
            value={value?.reconnect_time}
            onChange={onChange.bind(null, 'reconnect_time')}
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
            value={value?.information_size}
            onChange={onChange.bind(null, 'information_size')}
          />
        </div>
      </div>
    </SettingsWrapper>
  );
};

export default Settings;

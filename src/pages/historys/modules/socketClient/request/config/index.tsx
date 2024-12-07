import { AutoComplete, InputNumber, Select, Switch, theme } from 'antd';
import { ConfigWrapper } from './style';
import { SocketConfig } from '#types/collection/socketClient';
import React from 'react';
import { PACKET_END_OPTIONS, SOCKET_ENCODES } from './constants';
import { css } from '@emotion/css';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';

type Props = {
  value: SocketConfig;
  onChange: (newVal: SocketConfig) => void;
};

const Config: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  const socketEncodeOptions = Object.entries(SOCKET_ENCODES).map(([value, label]) => ({
    label,
    value,
  }));

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce<SocketConfig>(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const handleChangeDeep = useMemoizedFn((attr, key, newVal) => {
    const result = produce<SocketConfig>(value, (draft) => {
      draft[attr][key] = newVal;
    });
    onChange(result);
  });

  return (
    <ConfigWrapper token={token}>
      <div className="case-item">
        <div className="left">
          <div className="case-title">请求报文编码格式:</div>
        </div>
        <div className="right">
          <Select
            options={socketEncodeOptions}
            size="small"
            popupClassName={css`
              width: 120px !important;
            `}
            value={value?.encode_type}
            onChange={handleChange.bind(null, 'encode_type')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">
            <span>请求数据包尾字符:</span>
            <Switch
              className="switch-item"
              size="small"
              checked={value?.packet_end_char?.enabled === 1}
              onChange={(checked) => {
                handleChangeDeep('packet_end_char', 'enabled', checked ? 1 : -1);
              }}
            />
          </div>
          <div className="desc">将特殊字符添加到请求数据包尾</div>
        </div>
        <div className="right">
          <AutoComplete
            size="small"
            options={PACKET_END_OPTIONS}
            value={value?.packet_end_char?.char}
            onChange={handleChangeDeep.bind(null, 'packet_end_char', 'char')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">
            <span>包头携带内容长度:</span>
            <Switch
              className="switch-item"
              size="small"
              checked={value?.packet_header_carry_size === 1}
              onChange={(checked) => {
                handleChange('packet_header_carry_size', checked ? 1 : -1);
              }}
            />
          </div>
          <div className="desc">计算内容长度并添加到包头（文本）</div>
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">
            <span>返回数据去除包头:</span>
            <Switch
              className="switch-item"
              size="small"
              checked={value?.remove_packet_header?.enabled === 1}
              onChange={(checked) => {
                handleChangeDeep('remove_packet_header', 'enabled', checked ? 1 : -1);
              }}
            />
          </div>
          <div className="desc">指定长度去除返回数据包头</div>
        </div>
        <div className="right">
          <InputNumber
            spellCheck={false}
            size="small"
            min={0}
            value={value?.remove_packet_header?.length}
            onChange={handleChangeDeep.bind(null, 'remove_packet_header', 'length')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">
            <span>去除返回数据包尾换行符:</span>
            <Switch
              className="switch-item"
              size="small"
              checked={value?.remove_wrap_char === 1}
              onChange={(checked) => {
                handleChange('remove_wrap_char', checked ? 1 : -1);
              }}
            />
          </div>
          <div className="desc">去除返回包尾换行符 \n</div>
        </div>
      </div>
      <div className="case-item">
        <div className="left">
          <div className="case-title">
            <span>XML转JSON:</span>
            <Switch
              className="switch-item"
              size="small"
              checked={value?.xml_to_json === 1}
              onChange={(checked) => {
                handleChange('xml_to_json', checked ? 1 : -1);
              }}
            />
          </div>
          <div className="desc">返回数据包如果是XML格式，则转换成JSON格式</div>
        </div>
      </div>
    </ConfigWrapper>
  );
};

export default Config;

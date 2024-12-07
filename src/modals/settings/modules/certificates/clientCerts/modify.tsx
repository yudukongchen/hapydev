import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Input, InputNumber, Space, message } from 'antd';
import React, { useEffect } from 'react';
import { DEFAULT_CLIENT_CERT } from './constant';
import { isEmpty, isPlainObject } from 'lodash';
import CertFile from './certFile';
import produce from 'immer';
import { ClientCertInfo } from '#types/settings';

type Props = {
  defaultValue?: ClientCertInfo;
  onSave: (newVal: ClientCertInfo) => void;
  mode: 'modify' | 'create';
  onCancel: () => void;
};

const Modify: React.FC<Props> = (props) => {
  const { defaultValue, mode, onSave, onCancel } = props;
  const [value, setValue] = useSafeState<ClientCertInfo>(null);
  useEffect(() => {
    if (isPlainObject(defaultValue)) {
      setValue(defaultValue);
      return;
    }
    setValue(DEFAULT_CLIENT_CERT);
  }, [defaultValue, DEFAULT_CLIENT_CERT]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    setValue(newData);
  });

  const handleSave = useMemoizedFn(() => {
    if (isEmpty(value.host)) {
      message.error('证书域名不能为空');
      return;
    }

    onSave(value);
    return;
  });

  return (
    <div>
      <div className="case-item">
        <div className="item-name">Host (必填)</div>
        <div className="item-values">
          <Space direction="horizontal">
            <Input
              size="small"
              spellCheck={false}
              addonBefore="https://"
              value={value?.host ?? ''}
              onChange={(e) => {
                handleChange('host', e.target.value);
              }}
            />
            <span>:</span>
            <InputNumber
              size="small"
              spellCheck={false}
              style={{ width: 60 }}
              placeholder="443"
              value={value?.port}
              onChange={(value) => {
                handleChange('port', value);
              }}
            />
          </Space>
        </div>
      </div>
      <CertFile title="CRT 文件" value={value?.crt} onChange={handleChange.bind(null, 'crt')} />
      <CertFile title="KEY 文件" value={value?.key} onChange={handleChange.bind(null, 'key')} />
      <CertFile title="PFX 文件" value={value?.pfx} onChange={handleChange.bind(null, 'pfx')} />
      <div className="case-item">
        <div className="item-name">私钥密码</div>
        <div className="item-values">
          <Input.Password
            spellCheck={false}
            size="small"
            style={{ width: 270 }}
            value={value?.password ?? ''}
            onChange={(e) => {
              handleChange('password', e.target.value);
            }}
          />
        </div>
      </div>
      <div className="modify-footer">
        <Button type="primary" onClick={handleSave}>
          {mode === 'create' ? '添加' : '保存'}
        </Button>
        <Button onClick={onCancel}>返回</Button>
      </div>
    </div>
  );
};
export default Modify;

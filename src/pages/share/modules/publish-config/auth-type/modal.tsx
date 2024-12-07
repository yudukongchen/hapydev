import { PublishConfig } from '#types/share';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Input, Modal, Radio, Space } from 'antd';
import produce from 'immer';
import React, { useEffect } from 'react';
import generator from 'generate-password-browser';
import { AUTH_TYPE_OPTIONS } from '../constants';
import { authTypeWrapper } from './style';

type Props = {
  value: PublishConfig;
  onChange: (newVal: PublishConfig) => void;
  open: boolean;
  onClose: () => void;
};
const AuthTypePanel: React.FC<Props> = (props) => {
  const { value, onChange, open, onClose } = props;

  const [data, setData] = useSafeState(null);

  useEffect(() => {
    setData(value);
  }, [value]);

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(data, (draft) => {
      draft[key] = newVal;
    });
    setData(result);
  });

  const handleNewPwd = () => {
    const text = generator.generate({ length: 10, numbers: true, excludeSimilarCharacters: true });
    handleChange('password', text);
  };

  const handleOk = () => {
    onChange(data);
    onClose();
  };
  return (
    <Modal
      destroyOnClose
      width={450}
      title="访问限制"
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      className={authTypeWrapper}
    >
      <div className="form-item">
        <div className="item-name">访问类型</div>
        <div className="item-value">
          <Radio.Group
            options={AUTH_TYPE_OPTIONS}
            value={data?.auth_type}
            onChange={(e) => {
              handleChange('auth_type', e.target.value);
            }}
          />
        </div>
      </div>
      {data?.auth_type === 2 && (
        <div className="form-item">
          <div className="item-name">访问密码</div>
          <div className="item-value">
            <Space.Compact style={{ width: '100%' }}>
              <Input.Password
                value={data?.password}
                onChange={(e) => {
                  handleChange('password', e.target.value);
                }}
              />
              <Button onClick={handleNewPwd}>随机生成</Button>
            </Space.Compact>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AuthTypePanel;

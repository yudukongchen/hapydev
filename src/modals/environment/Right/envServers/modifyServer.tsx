import React, { useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import { useSafeState } from 'ahooks';

type Props = {
  value: string;
  onCancel: () => void;
  onSave: (newVal: string) => void;
};

const AddServer: React.FC<Props> = (props) => {
  const { value, onCancel, onSave } = props;

  const [serverName, setServerName] = useSafeState(value);

  useEffect(() => {
    setServerName(value);
  }, [value]);

  const handleOk = () => {
    if (serverName?.trim()?.length === 0) {
      message.error('服务名不能为空！');
      return;
    }
    onSave(serverName);
  };

  return (
    <Modal width={360} onCancel={onCancel} onOk={handleOk} open title="修改名称">
      <div>
        <span className="spn-server-name">服务名</span>
        <Input
          className="txt-server-name"
          spellCheck={false}
          value={serverName}
          onChange={(e) => {
            setServerName(e.target.value);
          }}
        />
      </div>
    </Modal>
  );
};

export default AddServer;

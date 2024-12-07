import { emitGlobal } from '@subjects/global';
import { useSafeState } from 'ahooks';
import { Button, Input, message, Modal } from 'antd';
import React, { useEffect } from 'react';
import webCurlToHar, { setConfig } from 'curl2hars';
import { parseCookie, parseSafeBash } from './utils';
import { isEmpty, isPlainObject } from 'lodash';
import { hartoHapydev } from '@utils/tools/har-hapydev';

setConfig(`${import.meta.env.VITE_PUBLIC_PATH}/assets/`);

type Props = {
  open: boolean;
  onClose: () => void;
};

const CurlImport: React.FC<Props> = (props) => {
  const { open, onClose } = props;
  const [text, setText] = useSafeState('');

  useEffect(() => {
    if (!open) {
      setText('');
    }
  }, [open]);

  const handleSave = () => {
    let harData = null;
    try {
      const harDatas = webCurlToHar(parseSafeBash(text));
      harData = harDatas?.[0];
      const cookies = parseCookie(harData?.request?.cookies);
      if (!isEmpty(cookies)) {
        harData.request.headers.push({
          name: 'Cookie',
          value: cookies,
        });
      }
      // harData.request.queryString = parseRequestQuery(
      //   harData.request.url,
      //   harData.request.queryString
      // );
    } catch (ex) {
      message.error('解析失败！');
    }
    if (!isPlainObject(harData)) {
      return;
    }

    const hapydevData = hartoHapydev(harData?.request);

    emitGlobal('apis/createOpensItem', hapydevData);
    onClose();
  };

  return (
    <Modal
      open={open}
      title="从CURL导入接口"
      onCancel={onClose}
      width={600}
      onOk={handleSave}
      destroyOnClose
      footer={
        <>
          <Button onClick={onClose}>取消</Button>
          <Button type="primary" onClick={handleSave}>
            确定
          </Button>
        </>
      }
    >
      <Input.TextArea
        spellCheck={false}
        style={{ height: 300, resize: 'none' }}
        value={text}
        status=""
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </Modal>
  );
};

export default CurlImport;

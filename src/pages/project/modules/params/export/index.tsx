import { Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { ExportWrapper } from './style';
import { useSafeState } from 'ahooks';
import { json2csv } from 'json-2-csv';
import { isArray } from 'lodash';
import { copyTextToClipboard } from '@utils/copy';

type Props = {
  onCancel: (reload: boolean) => void;
  open: boolean;
  listData: any[];
};
const Add: React.FC<Props> = (props) => {
  const { open, onCancel, listData } = props;

  const [csvText, setCsvText] = useSafeState('');

  useEffect(() => {
    if (!isArray(listData)) {
      return;
    }
    const dataList = listData.map((item) => ({
      name: item.name,
      description: item.description,
    }));
    const csvContent = json2csv(dataList, {
      prependHeader: false,
    });
    setCsvText(csvContent);
  }, [listData]);

  const handleCopy = () => {
    copyTextToClipboard(csvText);
  };

  return (
    <Modal
      width={600}
      destroyOnClose
      open={open}
      onCancel={onCancel.bind(null, false)}
      onOk={handleCopy}
      okText="复制内容到剪贴板"
      cancelText="关闭"
      title="导出参数描述"
    >
      <ExportWrapper>
        <Input.TextArea
          readOnly
          className="textarea beautify-scrollbar"
          value={csvText}
          spellCheck={false}
        />
      </ExportWrapper>
    </Modal>
  );
};

export default Add;

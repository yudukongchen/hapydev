import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Alert, message, Modal, theme, Upload } from 'antd';
import React from 'react';
import SvgUpload from '@assets/icons/upload.svg?react';
import { SchemaWrapper } from './style';
import { getFileText } from '@utils/file';
import $RefParser from '@apidevtools/json-schema-ref-parser';
import { useSelector } from 'react-redux';
import { cloneDeep, isArray } from 'lodash';
import { DEFAULT_MODEL_DATA } from '@constants/models/data-model';
import { v4 as uuidV4 } from 'uuid';

type Props = {
  open: boolean;
  parent_id: string;
  onClose: () => void;
};

const ReName: React.FC<Props> = (props) => {
  const { open, parent_id, onClose } = props;
  const [loading, setLoading] = useSafeState(false);
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const { token } = theme.useToken();

  const handleSaveSchemas = useMemoizedFn((dataList) => {
    const modelList = [];
    if (isArray(dataList)) {
      dataList.forEach((item) => {
        const modelItem = cloneDeep(DEFAULT_MODEL_DATA);
        modelItem.id = uuidV4();
        modelItem.parent_id = parent_id;
        modelItem.project_id = current_project_id;
        modelItem.name = item?.name;
        modelItem.data = item?.data;
        modelList.push(modelItem);
      });
    }
    if (modelList.length === 0) {
      return;
    }
    setLoading(true);
    emitGlobal('MODELS/batchSaveModels', {
      project_id: current_project_id,
      modelList,
      callback(result) {
        setLoading(false);
        if (result === true) {
          onClose();
        }
      },
    });
  });

  const handleImportFiles = async (file, fileList) => {
    const index = fileList.findIndex((item) => item === file);
    if (index > 0) {
      return false;
    }
    const dataList = [];
    for (const fileItem of fileList) {
      const text = (await getFileText(fileItem)) as string;
      try {
        const data = JSON.parse(text);
        const fileName = fileItem?.name?.split('.')?.[0];
        const schemaData = await $RefParser.dereference(data, {
          dereference: {
            circular: 'ignore',
          },
        });
        dataList.push({
          name: fileName,
          data: schemaData,
        });
      } catch (ex) {
        console.log(ex);
      }
    }
    if (dataList.length === 0) {
      message.error('未导入任何有效文件');
      return;
    }

    handleSaveSchemas(dataList);
    return false;
  };

  return (
    <Modal
      open={open}
      title="导入 JSON Schema 文件"
      onCancel={onClose}
      width={500}
      destroyOnClose
      footer={null}
      loading={loading}
    >
      <SchemaWrapper token={token}>
        <Alert type="info" message="支持批量导入 JSON Schema 文件。" banner className="tips" />
        <Upload.Dragger multiple showUploadList={false} beforeUpload={handleImportFiles}>
          <div style={{ padding: '20px 0' }}>
            <p className="ant-upload-drag-icon">
              <SvgUpload />
            </p>
            <p>
              拖拽文件到此处或选择
              <span className="warning">文件</span>或<span className="warning">文件夹</span>
            </p>
          </div>
        </Upload.Dragger>
      </SchemaWrapper>
    </Modal>
  );
};

export default ReName;

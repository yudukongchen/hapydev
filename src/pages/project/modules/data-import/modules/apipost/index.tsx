import { Alert } from 'antd';
import { Upload } from 'antd';
import SvgUpload from '@assets/icons/upload.svg?react';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import { parseApiList } from './apis';
import { parseModelList } from './models';
import { parseEnvList } from './envs';

type Props = {
  onChangeEnvList: (val: any[]) => void;
  onChangeApiList: (val: any[]) => void;
  onChangeModelList: (val: any[]) => void;
  onChangeShow: (show: boolean) => void;
};

const OpenApi: React.FC<Props> = (props) => {
  const { onChangeEnvList, onChangeApiList, onChangeModelList, onChangeShow } = props;

  const handleAddData = useMemoizedFn((apipostData) => {
    const apiList = parseApiList(apipostData?.apis);
    const modelList = parseModelList(apipostData?.models);
    const envList = parseEnvList(apipostData?.global?.envs);
    onChangeApiList(apiList);
    onChangeModelList(modelList);
    onChangeEnvList(envList);
    onChangeShow(true);
    return;
  });

  const handleImport = async (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const text = reader.result as string;
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (ex) {
        return;
      }
      handleAddData(data);
    };
    return false;
  };

  return (
    <>
      <Alert
        banner
        showIcon={false}
        type="info"
        message={
          <div>
            支持导入 Apipost 接口、数据模型、环境等数据。了解如何从 Apipost 导出数据。
            <a>查看详细说明</a>
          </div>
        }
      />
      <div className="upload-form">
        <Upload.Dragger beforeUpload={handleImport} fileList={[]} multiple={true}>
          <SvgUpload className="upload-icon" />
          <p className="upload-text">点击或拖拽文件到此区域导入</p>
        </Upload.Dragger>
      </div>
    </>
  );
};

export default OpenApi;

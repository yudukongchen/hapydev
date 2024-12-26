import { Upload } from 'antd';
import SvgUpload from '@assets/icons/upload.svg?react';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import { parseApilist, parseEnvlist, parseModellist } from './utils';

type Props = {
  onChangeEnvList: (val: any[]) => void;
  onChangeApiList: (val: any[]) => void;
  onChangeModelList: (val: any[]) => void;
  onChangeShow: (show: boolean) => void;
};

const Apifox: React.FC<Props> = (props) => {
  const { onChangeEnvList, onChangeApiList, onChangeModelList, onChangeShow } = props;

  const handleAddData = useMemoizedFn((data) => {
    const apiList = parseApilist(data?.api_list);
    const modelList = parseModellist(data?.model_list);
    const envList = parseEnvlist(data?.env_list);

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
      <div className="upload-form">
        <Upload.Dragger beforeUpload={handleImport} fileList={[]} multiple={true}>
          <SvgUpload className="upload-icon" />
          <p className="upload-text">点击或拖拽文件到此区域导入</p>
        </Upload.Dragger>
      </div>
    </>
  );
};

export default Apifox;

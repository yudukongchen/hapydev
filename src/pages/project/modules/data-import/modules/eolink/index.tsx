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

  const handleAddData = useMemoizedFn((eolinkData) => {
    const apiList = parseApiList(eolinkData?.apiGroupList);
    // const modelList = parseModelList(eolinkData?.dataStructureList);
    const envList = parseEnvList(eolinkData?.env);
    onChangeApiList(apiList);
    // onChangeModelList(modelList);
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
            支持Eolink 项目数据 (.json)格式，数据导出方法: 打开 Eolink
            左侧“项目管理”，然后点击“项目设置”二级菜单，在“其他操作下”点击导出项目，选择Eolink
            Apikit项目数据 (.json)，然后导出。
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

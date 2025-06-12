import { Alert } from 'antd';
import { Upload } from 'antd';
import SvgUpload from '@assets/icons/upload.svg?react';
import { useMemoizedFn } from 'ahooks';
import React from 'react';
import { parseApiList } from './apis';
import { parseDefinitions, parseModelList } from './models';
import { parseEnvList } from './envs';
import SwaggerParser from '@apidevtools/swagger-parser';
import { isObject } from 'lodash';

type Props = {
  onChangeEnvList: (val: any[]) => void;
  onChangeApiList: (val: any[]) => void;
  onChangeModelList: (val: any[]) => void;
  onChangeShow: (show: boolean) => void;
};

const OpenApi: React.FC<Props> = (props) => {
  const { onChangeEnvList, onChangeApiList, onChangeModelList, onChangeShow } = props;

  const handleAddData = useMemoizedFn((openApiData) => {
    const apiList = parseApiList(openApiData?.paths);
    let modelList = [];
    if (isObject(openApiData?.definitions)) {
      modelList = parseDefinitions(openApiData?.definitions);
    } else if (isObject(openApiData?.components)) {
      modelList = parseModelList(openApiData?.components);
    }

    const envList = parseEnvList(openApiData?.servers);

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
      SwaggerParser.dereference(data).then((openapiData) => {
        handleAddData(openapiData);
      });
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
            支持导入 OpenAPI 3、Swagger 1、2、3数据格式的json或yaml文件。
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

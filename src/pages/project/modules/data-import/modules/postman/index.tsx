import { Alert } from 'antd';
import { Upload } from 'antd';
import SvgUpload from '@assets/icons/upload.svg?react';
import { useMemoizedFn } from 'ahooks';
import { getDataType, parseCollections, parseEnviroment } from './utils';
import React from 'react';
import { isUndefined } from 'lodash';

type Props = {
  onChangeEnvList: (val: any[]) => void;
  onChangeApiList: (val: any[]) => void;
  onChangeShow: (show: boolean) => void;
};

const Postman: React.FC<Props> = (props) => {
  const { onChangeEnvList, onChangeApiList, onChangeShow } = props;

  const handleAddData = useMemoizedFn((dataType, schema_data) => {
    if (dataType === 'environment') {
      const envData = parseEnviroment(schema_data);
      onChangeEnvList([envData]);
      onChangeShow(true);
      return;
    }

    if (dataType === 'collection_2.0' || dataType === 'collection_2.1') {
      const PostmanVersions = {
        'collection_2.0': '2.0',
        'collection_2.1': '2.1',
      };
      const version = PostmanVersions?.[dataType];
      if (isUndefined(version)) {
        return;
      }
      const collections = parseCollections(schema_data, -1);
      onChangeApiList(collections);
      onChangeShow(true);
      return;
    }
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
      const dataType = getDataType(data);
      if (dataType === null) {
        return;
      }
      handleAddData(dataType, data);
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
            支持导入 Postman 集合、环境、全局数据。了解如何从 Postman 导出数据。
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

export default Postman;

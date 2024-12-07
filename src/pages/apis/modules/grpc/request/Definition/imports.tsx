import { BaseProto, ServiceDefinition } from '#types/collection/grpc';
import { getFileText } from '@utils/file';
import { useSafeState } from 'ahooks';
import { Button, Checkbox, Upload } from 'antd';
import produce from 'immer';
import React from 'react';

type Props = {
  value: ServiceDefinition;
  onChange: (newVal: ServiceDefinition) => void;
  getProtoMethods: () => void;
};

const Imports: React.FC<Props> = (props) => {
  const { value, onChange, getProtoMethods } = props;

  const [showInclude, setShowInclude] = useSafeState(false);

  const handleImportProto = async (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const text = reader.result as string;
      const result = produce(value, (draft) => {
        draft.main_proto = {
          name: file.name,
          path: file.webkitRelativePath,
          code: text,
        };
      });
      onChange(result);
    };
    return false;
  };

  const handleImportFiles = async (file, fileList) => {
    const index = fileList.findIndex((item) => item === file);
    if (index > 0) {
      return false;
    }
    const dependFiles: BaseProto[] = [];
    for (const fileItem of fileList) {
      const text = (await getFileText(fileItem)) as string;
      const protoItem: BaseProto = {
        name: fileItem.name,
        path: fileItem.webkitRelativePath,
        code: text,
      };
      dependFiles.push(protoItem);
    }
    const result = produce(value, (draft) => {
      draft.depend_files = dependFiles;
    });
    onChange(result);
    return false;
  };

  return (
    <div className="imports-panel">
      <div className="import-item">
        <Upload multiple={false} beforeUpload={handleImportProto} fileList={[]}>
          <Button size="small">选择proto文件</Button>
        </Upload>
        <Checkbox
          checked={showInclude}
          onChange={(e) => {
            setShowInclude(e.target.checked);
          }}
        >
          包含依赖项
        </Checkbox>
      </div>
      {showInclude && (
        <div className="depends-item">
          <Upload multiple directory showUploadList={false} beforeUpload={handleImportFiles}>
            <Button size="small">依赖文件目录</Button>
          </Upload>
        </div>
      )}

      <div className="btns-item">
        <Button type="primary" size="small" onClick={getProtoMethods}>
          刷新服务
        </Button>
      </div>
    </div>
  );
};

export default Imports;

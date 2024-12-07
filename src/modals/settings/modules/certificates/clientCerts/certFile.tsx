import { fileTodataUrl } from '@utils/file';
import { isElectron } from '@utils/is';
import { Button, Upload, UploadFile, message } from 'antd';
import produce from 'immer';
import { isEmpty, isObject, isPlainObject } from 'lodash';
import React, { useMemo } from 'react';
import { v4 as uuidV4 } from 'uuid';

type CertInfo = {
  path: string; //本地路径
  base64: string; //base64地址
  file_name: string; //文件名
};

type Props = {
  title: string;
  value: CertInfo;
  onChange: (newVal: CertInfo) => void;
};

const MAX_SIZE = 500 * 1024;
const CertFile: React.FC<Props> = (props) => {
  const { title, value, onChange } = props;

  const initValue: CertInfo = isPlainObject(value)
    ? value
    : { base64: '', file_name: '', path: '' };

  const handleRemoveFile = () => {
    const newResult = produce(initValue, (draft) => {
      draft.base64 = '';
      draft.file_name = '';
      draft.path = '';
    });
    onChange(newResult);
    return true;
  };

  const customRequest = async (option) => {
    //文件大小超过500K禁止上传
    if (option?.file?.size > MAX_SIZE) {
      message.error('暂不支持超过500kb以上的文件');
      return;
    }
    const base64_url = await fileTodataUrl(option?.file);
    const file_path = isElectron() ? option?.file?.path : null;
    const newResult = produce(initValue, (draft) => {
      draft.base64 = base64_url;
      draft.file_name = option.file?.name;
      draft.path = file_path;
    });
    onChange(newResult);
    option.onSuccess(null);
  };

  const computedFileList = useMemo(() => {
    if (!isObject(value) || isEmpty(value?.file_name)) {
      return [];
    }
    const file: UploadFile<any> = {
      uid: uuidV4(),
      name: value?.file_name,
      status: 'done',
    };
    return [file];
  }, [value]);

  return (
    <div className="case-item">
      <div className="item-name">{title}</div>
      <div className="item-values" style={{ height: 28 }}>
        <Upload
          fileList={computedFileList}
          customRequest={customRequest}
          onRemove={handleRemoveFile}
        >
          {computedFileList.length < 1 && <Button size="small">选择文件</Button>}
        </Upload>
      </div>
    </div>
  );
};

export default CertFile;

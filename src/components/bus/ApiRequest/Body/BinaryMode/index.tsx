import React, { useMemo } from 'react';
import { binaryWrapper } from './style';
import { Upload, Button, message, UploadFile } from 'antd';
import { isEmpty, isObject } from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { isElectron } from '@utils/is';
import SvgUpload from '@assets/icons/upload.svg?react';
import { fileTodataUrl } from '@utils/file';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};

const MAX_SIZE = 2 * 1024 * 1024;
const Binary: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const customRequest = async (option) => {
    //如果是web端，并且文件大小超过5M，则禁止上传
    if (!isElectron() && option?.file?.size > MAX_SIZE) {
      message.error('暂不支持超过5Mb以上的文件，请使用客户端进行调试');
      return;
    }
    let data_url = null;
    //如果是web端，使用base64
    if (!isElectron()) {
      data_url = await fileTodataUrl(option?.file);
    }

    //如果是electron，且文件小于2M，则生成base64文件
    else if (isElectron() && option?.file?.size <= MAX_SIZE) {
      data_url = await fileTodataUrl(option?.file);
    }

    const file_path = isElectron() ? option?.file?.path : null;
    const newResult = {
      file_name: option.file?.name,
      data_url,
      file_path,
    };
    onChange(newResult);
    option.onSuccess(null);
  };

  const handleRemoveFile = () => {
    onChange(null);
    return true;
  };

  const computedFileList = useMemo(() => {
    if (!isObject(value) || isEmpty(value?.file_name)) {
      return [];
    }
    return [
      {
        uid: uuidV4(),
        name: value?.file_name,
        status: 'done',
      } as UploadFile<any>,
    ];
  }, [value]);

  return (
    <div className={binaryWrapper}>
      <Upload
        fileList={computedFileList}
        onRemove={handleRemoveFile}
        customRequest={customRequest}
        className="upload-wrapper"
      >
        <Button icon={<SvgUpload />} block>
          上传文件
        </Button>
      </Upload>
    </div>
  );
};
export default Binary;

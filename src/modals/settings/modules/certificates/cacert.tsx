import { useMemoizedFn } from 'ahooks';
import { Button, Switch, Upload, UploadFile, message } from 'antd';
import produce from 'immer';
import { v4 as uuidV4 } from 'uuid';
import { isEmpty, isObject } from 'lodash';
import React, { useMemo } from 'react';
import { isElectron } from '@utils/is';
import { fileTodataUrl } from '@utils/file';
import SvgCA1 from '@assets/icons/ca1.svg?react';

type CertInfo = {
  is_used: 1 | -1;
  path: string;
  base64: string;
  file_name: string;
};

type Props = {
  value: CertInfo;
  onChange: (newVal: CertInfo) => void;
};
const MAX_SIZE = 500 * 1024;
const CACert: React.FC<Props> = (props) => {
  const { value, onChange } = props;

  const handleChange = useMemoizedFn((key, newVal) => {
    const newResult = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newResult);
  });

  const handleRemoveFile = () => {
    const newResult = produce(value, (draft) => {
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
    const newResult = produce(value, (draft) => {
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
    <>
      <div className="case-item">
        <div className="item-name">
          <div>是否开启CA证书</div>
        </div>
        <div className="item-values">
          <Switch
            value={value?.is_used === 1}
            onChange={(checked) => {
              handleChange('is_used', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      {value?.is_used === 1 && (
        <div className="case-item">
          <div className="pem-item">
            <Upload
              fileList={computedFileList}
              customRequest={customRequest}
              onRemove={handleRemoveFile}
            >
              <Button size="small" icon={<SvgCA1 />}>
                上传CA证书
              </Button>
            </Upload>
          </div>
          {computedFileList.length === 0 && (
            <div className="item-name-desc">该文件应包含一个或多个PEM格式的可信证书</div>
          )}
        </div>
      )}
    </>
  );
};

export default CACert;

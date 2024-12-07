import { Avatar, Button, theme, Upload } from 'antd';
import LogoList from './logo-list';
import React from 'react';
import { getAssertsPath } from '@utils/utils';
import { LeftPanelWrapper } from './style';
import useFileUpload from '@hooks/useFileUpload';
import { Project } from '#types/project';
import produce from 'immer';
import { useMemoizedFn } from 'ahooks';

type Props = {
  value: Partial<Project & { create_example_datas: 1 | -1 }>;
  onChange: (info: Project) => void;
  is_offline: 1 | -1;
};

const LeftPanel: React.FC<Props> = (props) => {
  const { value, onChange, is_offline } = props;
  const { token } = theme.useToken();

  const handleChangeUrl = useMemoizedFn((newVal) => {
    const result = produce(value, (draft) => {
      draft.logo = newVal;
    }) as any;
    onChange(result);
  });

  const { customRequest } = useFileUpload({
    file_name: `logo-${value?.project_id}`,
    onOk: handleChangeUrl,
  });

  return (
    <LeftPanelWrapper token={token} className="left-panel">
      <div className="left-title">项目图标:</div>
      <div className="logo-panel">
        <Avatar shape="square" src={getAssertsPath(value?.logo)} className="logo-image" size={60} />
        <Upload fileList={[]} customRequest={customRequest}>
          <Button disabled={is_offline === 1} className="btn-upload" size="small">
            上传图片
          </Button>
        </Upload>
      </div>
      <div className="sec-title">使用内置图片</div>
      <LogoList url={value?.logo} onCheck={handleChangeUrl} />
    </LeftPanelWrapper>
  );
};

export default LeftPanel;

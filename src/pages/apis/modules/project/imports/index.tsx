import { Button, theme } from 'antd';
import { ImportsWrapper } from './style';
import SvgInfo from '@assets/icons/info.svg?react';
import SvgClouddownload from '@assets/icons/clouddownload.svg?react';

const Imports = () => {
  const { token } = theme.useToken();
  return (
    <ImportsWrapper token={token} className="container-box">
      <div className="big-title">数据导入</div>
      <div className="desc-content">
        <SvgInfo />
        <span>将 OpenAPI（Swagger）或 apiDoc 等格式的在线 URL 接口数据定时导入到 Hapydev。</span>
      </div>
      <div className="btn-panel">
        <Button icon={<SvgClouddownload />} type="default" disabled>
          导入设置
        </Button>
      </div>
    </ImportsWrapper>
  );
};

export default Imports;

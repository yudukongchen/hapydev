import { Alert } from 'antd';
import ImgCurl from './curl.png';

const Curl = () => {
  return (
    <>
      <Alert
        banner
        showIcon={false}
        type="info"
        message={
          <div>
            导入 cURL 功能请在“接口管理”模块使用，如下图所示，点击“+”号，选择“导入 cURL”即可使用。
            <a>查看详细说明</a>
          </div>
        }
      />
      <div className="image-form">
        <img src={ImgCurl} />
      </div>
    </>
  );
};

export default Curl;

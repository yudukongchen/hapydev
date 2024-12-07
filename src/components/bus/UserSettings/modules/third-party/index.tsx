import { Button, theme } from 'antd';
import { ThirdPartyWrapper } from './style';
import wechat from '@assets/images/wechat.png';
import github from '@assets/images/github.png';
const ThirdParty = () => {
  const { token } = theme.useToken();

  return (
    <ThirdPartyWrapper token={token}>
      <div className="case-item">
        <img className="icon" src={wechat} />
        <div className="info">
          <div className="title">
            <span className="name">微信</span>
            <div className="status false">未绑定</div>
          </div>
          <div className="desc">绑定微信后，您可通过微信扫码登录</div>
        </div>
        <div>
          <Button size="small">绑定</Button>
        </div>
      </div>
      <div className="case-item">
        <img className="icon" src={github} />
        <div className="info">
          <div className="title">
            <span className="name">GitHub</span>
            <div className="status false">未绑定</div>
          </div>
          <div className="desc">绑定后，您可通过GitHub账户授权登录</div>
        </div>
        <div>
          <Button size="small">绑定</Button>
        </div>
      </div>
    </ThirdPartyWrapper>
  );
};

export default ThirdParty;

import { Button, theme } from 'antd';
import { OpenApiWrapper } from './style';
import SvgInfo from '@assets/icons/info.svg?react';
import SvgTerminal from '@assets/icons/terminal.svg?react';
import { emitGlobal } from '@subjects/global';
import { useDispatch } from 'react-redux';
import { updateWorkspace } from '@reducers/workspace';

const OpenApi = () => {
  const { token } = theme.useToken();
  const dispatch = useDispatch();

  const handleGoOpenApi = () => {
    emitGlobal('MAIN/updateActiveTab', 'project');
    dispatch(
      updateWorkspace({
        project_active_page: 'open-api',
      })
    );
  };

  return (
    <OpenApiWrapper token={token} className="container-box">
      <div className="big-title">Open API</div>
      <div className="desc-content">
        <SvgInfo />
        <span>
          通过Open API可以访问您在 Hapydev 中的项目数据，Open
          API需要携带API_token，根据用途可以生产不同的API_token
        </span>
      </div>
      <div className="btn-panel">
        <Button icon={<SvgTerminal />} type="default" onClick={handleGoOpenApi}>
          点此设置
        </Button>
      </div>
    </OpenApiWrapper>
  );
};

export default OpenApi;

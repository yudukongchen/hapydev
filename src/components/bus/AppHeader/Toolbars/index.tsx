import { Button, Tooltip, theme } from 'antd';
import { SyncOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { ToolbarsWrapper } from './style';
import Notice from './notice';
import UserItem from './userItem';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';
import { openUrl } from '@utils/utils';

const ToolBars = () => {
  const { token } = theme.useToken();
  const is_loading_user = useSelector((store: any) => store?.user?.info?.is_loading);
  const is_loading_teams = useSelector((store: any) => store?.teams?.is_loading);
  const is_loading_projects = useSelector((store: any) => store?.projects?.datas?.is_loading);
  const is_loading_api = useSelector((store: any) => store?.apis?.datas?.is_loading);
  const is_loading_envs = useSelector((store: any) => store?.envs?.is_loading);

  const isLoading =
    is_loading_user || is_loading_teams || is_loading_projects || is_loading_api || is_loading_envs;

  const handlePullData = () => {
    emitGlobal('initApplication');
  };

  return (
    <>
      <ToolbarsWrapper token={token} className="head-right">
        <Button
          onClick={handlePullData}
          type="primary"
          shape="circle"
          icon={<SyncOutlined spin={isLoading} />}
          size="small"
        />
        <Notice />
        <Tooltip title="帮助中心">
          <Button
            onClick={() => {
              openUrl(`${import.meta.env.VITE_HOME_URL}/docs`);
            }}
            type="text"
            icon={<QuestionCircleOutlined />}
            size="small"
          />
        </Tooltip>
        <UserItem />
      </ToolbarsWrapper>
    </>
  );
};

export default ToolBars;

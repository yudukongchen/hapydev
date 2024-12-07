import { Alert, Tabs, theme } from 'antd';
import { ScriptsWrapper } from './style';
import Builtin from './builtin';
import Custom from './custom';
import { useSafeState } from 'ahooks';
import useParamsData from './hooks/useParamsData';
import { useSelector } from 'react-redux';

const Database = () => {
  const { token } = theme.useToken();
  const [tabIndex, setTabIndex] = useSafeState('custom');
  const project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const dataList = useParamsData({ project_id });

  return (
    <ScriptsWrapper token={token} className="beautify-scrollbar">
      <div className="panel-header">
        <div className="panel-header-left">参数描述库</div>
      </div>
      <Alert
        banner
        showIcon={false}
        type="info"
        message="参数描述库用来管理高频使用的参数，便于后续快速填入参数描述。"
      />
      <Tabs
        activeKey={tabIndex}
        onChange={setTabIndex}
        items={[
          {
            label: '自定义参数',
            key: 'custom',
            children: <Custom dataList={dataList} project_id={project_id} />,
          },
          { label: '内置参数', key: 'builtin', children: <Builtin /> },
        ]}
      />
    </ScriptsWrapper>
  );
};

export default Database;

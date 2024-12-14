import { Alert, Button, message, theme } from 'antd';
import { OpenApiWrapper } from './style';
import DataList from './datalist';
import SvgAdd from '@assets/icons/add.svg?react';
import Add from './add';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { openUrl } from '@utils/utils';
import useOpenApiData from './hooks/useOpenApiData';
import { emitGlobal } from '@subjects/global';
import { deleteOpenApi } from '@bll/open-api';
import useProjectInfo from '@hooks/useProjectInfo';

const OpenApi = () => {
  const { token } = theme.useToken();
  const [modelType, setModelType] = useSafeState(null);
  const projectInfo = useProjectInfo();

  const dataList = useOpenApiData();

  const handleCloseModal = (reload) => {
    setModelType(null);
    if (reload) {
      emitGlobal('OPEN_API/getdatalist');
    }
  };

  const handleDelete = useMemoizedFn((id) => {
    deleteOpenApi(id).subscribe((resp) => {
      if (resp?.code !== 10000) {
        message.error(resp?.message);
        return;
      }
      emitGlobal('OPEN_API/getdatalist');
    });
  });

  return (
    <OpenApiWrapper token={token}>
      <Add open={modelType === 'add'} onClose={handleCloseModal} />
      <div className="panel-header">
        <div className="panel-header-left">OpenAPI</div>
      </div>
      <Alert
        banner
        showIcon={false}
        type="info"
        message={
          <div>
            通过 Open API 可以访问您在 Hapydev 中的项目数据，访问API需要携带
            API_token，您可以根据不同用途，生成不同的API_token。
            <a onClick={openUrl.bind(null, `${import.meta.env.VITE_HOME_URL}/docs/open-api`)}>
              点此查看 OpenAPI 文档
            </a>
          </div>
        }
      />
      <div className="case-title">
        <div className="left">
          <span className="title">API Token</span>
          <span className="desc">(仅自己可见)</span>
        </div>
        <div className="slot-item">
          <Button
            disabled={projectInfo?.is_offline === 1}
            onClick={setModelType.bind(null, 'add')}
            icon={<SvgAdd />}
          >
            创建Token
          </Button>
        </div>
      </div>
      <DataList dataList={dataList} onDelete={handleDelete} />
    </OpenApiWrapper>
  );
};

export default OpenApi;

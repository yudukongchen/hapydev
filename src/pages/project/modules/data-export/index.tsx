import { Button, theme, Tooltip } from 'antd';
import { DataExportWrapper } from './style';
import { DATA_TYPES } from './constants';
import cn from 'classnames';
import SvgDownload from '@assets/icons/download.svg?react';
import { useSafeState } from 'ahooks';
import OpenApi from './openapi';

const DataExport = () => {
  const { token } = theme.useToken();
  const [dataType, setDataType] = useSafeState('openapi');
  return (
    <DataExportWrapper token={token}>
      <div className="panel-header">
        <div className="panel-header-left">导出数据</div>
      </div>
      <div className="sec-title">选择数据格式</div>
      <div className="data-types">
        {DATA_TYPES.map((item, index) => (
          <div
            key={index}
            className={cn('type-item', {
              active: dataType === item.type,
            })}
            onClick={setDataType.bind(null, item.type)}
          >
            <img className="item-icon" src={item.icon} />
            <div className="item-text">{item.title}</div>
          </div>
        ))}
      </div>
      {dataType === 'openapi' && <OpenApi />}

      <div className="btns-panel">
        <Tooltip title="即将支持">
          <Button icon={<SvgDownload />} type="primary" disabled>
            导出数据
          </Button>
        </Tooltip>
      </div>
    </DataExportWrapper>
  );
};

export default DataExport;

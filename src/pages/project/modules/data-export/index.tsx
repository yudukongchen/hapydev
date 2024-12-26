import { Button, theme, Tooltip } from 'antd';
import { DataExportWrapper } from './style';
import { DATA_TYPES } from './constants';
import cn from 'classnames';
import SvgDownload from '@assets/icons/download.svg?react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import OpenApi from './openapi';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { exportDatas } from './utils';
import { saveAs } from 'file-saver';

const DataExport = () => {
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const { token } = theme.useToken();
  const [dataType, setDataType] = useSafeState('hapydev');

  const dataTypes = useMemo(() => {
    const result = {};
    DATA_TYPES?.forEach((item) => {
      result[item.type] = item;
    });
    return result;
  }, [DATA_TYPES]);

  const handleExportData = useMemoizedFn(async () => {
    const exportData = await exportDatas?.[dataType]?.(current_project_id);
    const blob = new Blob([JSON.stringify(exportData)], {
      type: 'application/json',
    });
    saveAs(blob, `${exportData?.name}.hapydev.json`);
  });

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
        {dataTypes?.[dataType].disabled ? (
          <Tooltip title="即将支持">
            <Button
              onClick={handleExportData}
              icon={<SvgDownload />}
              type="primary"
              disabled={dataTypes?.[dataType].disabled}
            >
              导出数据
            </Button>
          </Tooltip>
        ) : (
          <Button
            onClick={handleExportData}
            icon={<SvgDownload />}
            type="primary"
            disabled={dataTypes?.[dataType].disabled}
          >
            导出数据
          </Button>
        )}
      </div>
    </DataExportWrapper>
  );
};

export default DataExport;

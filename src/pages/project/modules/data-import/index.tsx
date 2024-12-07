import { Tooltip, theme } from 'antd';
import { DataImportWrapper } from './style';
import { useSafeState } from 'ahooks';
import { DATA_TYPES } from './constants';
import cn from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import { MODULES } from './modules';
import { isUndefined } from 'lodash';
import { Suspense, useEffect } from 'react';
import Lazyloading from '@components/bus/LazyLoading';
import Preview from './preview';

const DataImport = () => {
  const { token } = theme.useToken();
  const [dataType, setDataType] = useSafeState('openapi');
  const [envList, setEnvList] = useSafeState([]);
  const [apiList, setApiList] = useSafeState([]);
  const [modelList, setModelList] = useSafeState([]);
  const [show, setShow] = useSafeState(false);

  useEffect(() => {
    if (!show) {
      setEnvList([]);
      setApiList([]);
    }
  }, [show]);

  const renderElement = (type) => {
    const Element = MODULES?.[type];
    if (isUndefined(Element)) {
      return null;
    }
    return (
      <Element
        onChangeEnvList={setEnvList}
        onChangeModelList={setModelList}
        onChangeApiList={setApiList}
        onChangeShow={setShow}
      />
    );
  };

  return (
    <DataImportWrapper token={token}>
      {show && (
        <Preview
          open={show}
          apiList={apiList}
          modelList={modelList}
          envList={envList}
          onClose={setShow.bind(null, false)}
        />
      )}
      <div className="panel-header">
        <div className="panel-header-left">导入数据</div>
      </div>
      <div className="types-container">
        {DATA_TYPES.map((item, index) => (
          <Fragment key={index}>
            {item.disabled ? (
              <Tooltip title="即将上线">
                <div key={index} className={cn('type-item', 'disabled')}>
                  <div className="icon">
                    <img src={item.icon} />
                  </div>
                  <div className="title">{item.title}</div>
                </div>
              </Tooltip>
            ) : (
              <div
                className={cn('type-item', {
                  active: dataType === item.type,
                })}
                onClick={setDataType.bind(null, item.type)}
              >
                <div className="icon">
                  <img src={item.icon} />
                </div>
                <div className="title">{item.title}</div>
              </div>
            )}
          </Fragment>
        ))}
      </div>
      <div className="import-panel">
        <Suspense fallback={<Lazyloading />}>{renderElement(dataType)}</Suspense>
      </div>
    </DataImportWrapper>
  );
};

export default DataImport;

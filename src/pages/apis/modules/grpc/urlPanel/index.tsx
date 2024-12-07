import { Button, Dropdown, Input, Space, Spin, Tooltip, theme } from 'antd';
import React, { useMemo } from 'react';
import { UrlPanelWrapper, dropdownWrapper, methodIconWrapper } from './style';
import { useMemoizedFn } from 'ahooks';
import produce from 'immer';
import { GrpcRequest, GrpcService } from '#types/collection/grpc';
import SvgTlsOn from './icons/tls-on.svg?react';
import SvgTlsOff from './icons/tls-off.svg?react';
import TlsTip from './tlstip';

import { getMethodIndex, listDataToObj } from './utils';
import { METHOD_ICONS } from './constants';
import cn from 'classnames';
import { isUndefined } from 'lodash';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';

type Props = {
  api_id: string;
  value: GrpcRequest;
  onChange: (newVal: GrpcRequest) => void;
  service_list: GrpcService[];
  onSave: () => void;
  reflecting: boolean;
  onSend: () => void;
};
const UrlPanel: React.FC<Props> = (props) => {
  const { api_id, value, onChange, service_list, onSave, reflecting, onSend } = props;
  const tempData = useSelector((store: any) => store?.tempDatas?.api?.[api_id]);

  const { token } = theme.useToken();

  const activeSvg = useMemo(() => {
    const serviceData = listDataToObj(service_list);
    const methodInfo = serviceData?.[value?.service_name]?.[value?.method_name];

    const svgIndex = getMethodIndex(methodInfo?.request_stream, methodInfo?.response_stream);
    const SvgElement = METHOD_ICONS?.[svgIndex];
    if (isUndefined(svgIndex)) {
      return null;
    }
    return <SvgElement className={'method' + svgIndex} />;
  }, [service_list, value]);

  const activeMethod = value?.service_name + '/' + value?.method_name;

  const handleChangeRequest = useMemoizedFn((key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(result);
  });

  const computedMenuList = useMemo(() => {
    const menuList = [];
    service_list?.forEach((item) => {
      const methods = item?.methods?.map((methodItem) => {
        const svgIndex = getMethodIndex(methodItem?.request_stream, methodItem?.response_stream);
        const SvgElement = METHOD_ICONS?.[svgIndex];
        return {
          icon: <SvgElement className={'method' + svgIndex} />,
          key: item?.service_name + '/' + methodItem?.method_name,
          label: methodItem?.method_name,
        };
      });
      menuList.push({
        type: 'group',
        label: item?.service_name,
        children: methods,
      });
    });
    return menuList;
  }, [service_list]);

  const handleChangeMethod = ({ key }) => {
    const keys = key.split('/');
    const result = produce(value, (draft) => {
      draft.service_name = keys[0];
      draft.method_name = keys[1];
    });
    onChange(result);
  };

  const handleEndStream = useMemoizedFn(() => {
    emitGlobal('PROXYS/GRPC/endStream', api_id);
  });

  const renderButton = () => {
    if (tempData?.status === 'streaming') {
      return (
        <Button onClick={handleEndStream} className="api-btn cancel">
          取消
        </Button>
      );
    }

    return (
      <Button onClick={onSend} type="primary" className="api-btn">
        调用
      </Button>
    );
  };

  return (
    <UrlPanelWrapper token={token}>
      <Space.Compact className={cn('url-inputs', methodIconWrapper)}>
        <Tooltip
          title={<TlsTip enabled={value.is_tls === 1} />}
          placement="bottomLeft"
          color={token.colorBgBase}
        >
          <Button
            icon={
              value.is_tls === 1 ? (
                <SvgTlsOff className="warning" />
              ) : (
                <SvgTlsOn className="green" />
              )
            }
            onClick={handleChangeRequest.bind(null, 'is_tls', value.is_tls === 1 ? -1 : 1)}
          />
        </Tooltip>
        <Input
          spellCheck={false}
          className="txt-url"
          placeholder="Socket服务IP"
          value={value?.url}
          onChange={(e) => {
            handleChangeRequest('url', e.target.value);
          }}
        />

        <Dropdown
          disabled={reflecting}
          trigger={['click']}
          rootClassName={methodIconWrapper}
          menu={{
            className: cn(dropdownWrapper, 'beautify-scrollbar'),
            onClick: handleChangeMethod,
            activeKey: activeMethod,
            items: computedMenuList,
          }}
        >
          <div className="txt-method">
            <Spin spinning={reflecting}>
              <div className="active-panel">
                <span className="ant-input-prefix">{activeSvg}</span>
                <span className="service-name">{value?.service_name}</span>
                <div className="split-item">/</div>
                <span className="method-name">{value?.method_name}</span>
              </div>
            </Spin>
          </div>
        </Dropdown>
      </Space.Compact>
      {renderButton()}
      <Button onClick={onSave}>保存</Button>
    </UrlPanelWrapper>
  );
};

export default UrlPanel;

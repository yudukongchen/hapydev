import { ApiProcess } from '#types/testing';
import { ApiCollection } from '#types/collection/api';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ApiWrapper } from './style';
import { Button, theme, Drawer, Tooltip } from 'antd';
import SvgModify from '@assets/icons/modify.svg?react';
import { useSafeState } from 'ahooks';
import Request from './request';
import cn from 'classnames';
import SvgLink from '@assets/icons/link.svg?react';
import SvgLinkOff from '@assets/icons/link-off.svg?react';
import produce from 'immer';
import NodeWrapper from '../../wrapper';
import { isUndefined } from 'lodash';

type Props = {
  value: ApiProcess;
  onChange?: (newVal: ApiProcess) => void;
  onDelete: () => void;
};

const ApiNode: React.FC<Props> = (props) => {
  const { value, onChange, onDelete } = props;
  const { token } = theme.useToken();
  const apiData: ApiCollection = useSelector(
    (store: any) => store?.apis?.datas?.base_datas?.[value?.data?.api_id]
  );

  const [showRequest, setShowRequest] = useSafeState(false);

  const computedRequest = useMemo(() => {
    if (value?.data.is_link === 1) {
      return apiData?.data?.request;
    }
    return value?.data?.request;
  }, [value?.data, apiData]);

  const handleChange = (is_link, newRequest) => {
    const result = produce(value, (draft) => {
      draft.data.is_link = is_link;
      if (is_link === 1) {
        delete draft.data.request;
      } else {
        draft.data.request = newRequest;
      }
    });
    onChange(result);
    setShowRequest(false);
  };

  return (
    <NodeWrapper
      className={isUndefined(computedRequest) ? 'disabled' : undefined}
      value={value}
      onChange={onChange}
      expand={false}
      onDelete={onDelete}
    >
      <ApiWrapper token={token}>
        {value?.data.is_link === 1 ? (
          <Tooltip title="自动同步">
            <div className={cn('link-type', 'linked')}>
              <SvgLink />
            </div>
          </Tooltip>
        ) : (
          <Tooltip title="手动同步">
            <div className={cn('link-type', 'manual')}>
              <SvgLinkOff />
            </div>
          </Tooltip>
        )}
        <div className="node-type api">接口</div>
        <div className="info-panel">
          {isUndefined(computedRequest) ? (
            <div className="disabled-api">数据不存在</div>
          ) : (
            <>
              <div>{apiData?.name}</div>
              <div>{computedRequest?.method}</div>
              <div>{computedRequest?.url}</div>
            </>
          )}
        </div>
        <Button
          disabled={isUndefined(computedRequest)}
          icon={<SvgModify />}
          size="small"
          type="text"
          onClick={setShowRequest.bind(null, true)}
        />
        <Drawer
          destroyOnClose
          title={apiData?.name}
          width={800}
          open={showRequest}
          onClose={setShowRequest.bind(null, false)}
        >
          <Request
            is_link={value?.data?.is_link}
            defaultValue={computedRequest}
            onSave={handleChange}
            onClose={setShowRequest.bind(null, false)}
            api_id={value?.data?.api_id}
          />
        </Drawer>
      </ApiWrapper>
    </NodeWrapper>
  );
};

export default ApiNode;

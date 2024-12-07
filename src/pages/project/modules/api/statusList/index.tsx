import { message, Spin, theme } from 'antd';
import { SatusPanel } from './style';
import StatusHeader from './header';
import { API_STATUS } from '@constants/api_status';
import useApisConfigs from '@hooks/modules/useApisConfigs';
import { useMemoizedFn, useSafeState } from 'ahooks';
import produce from 'immer';
import { updateApisConfig } from '@bll/projects/apis-config';
import React from 'react';
import { isPlainObject } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { updateConfig } from '@reducers/projects/apis-config';
import StatusRow from './status-row';

type Props = {
  project_id: string;
};
const StatusList: React.FC<Props> = (props) => {
  const { project_id } = props;
  const dispatch = useDispatch();

  const enabled_status = useSelector((store: any) => store?.projects?.apis_config?.enabled_status);
  const statusList = Object.entries(API_STATUS).map(([id, value]) => ({ key: id, id, ...value }));
  const [loading, setLoading] = useSafeState(false);
  const { token } = theme.useToken();
  const { enabledApiStatus } = useApisConfigs();

  const handleChangeStatus = useMemoizedFn((id, status) => {
    if (!isPlainObject(enabledApiStatus)) {
      return;
    }

    const checkedDatas = {};
    enabled_status.split(',').forEach((key) => {
      checkedDatas[key] = true;
    });
    if (status === true) {
      checkedDatas[id] = true;
    } else {
      delete checkedDatas[id];
    }

    setLoading(true);
    const newStaus = Object.keys(checkedDatas).join(',');

    updateApisConfig(project_id, {
      enabled_status: newStaus,
    }).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        dispatch(
          updateConfig({
            enabled_status: newStaus,
          })
        );
      },
      error(err) {
        setLoading(false);
        message.error(err?.message);
      },
      complete() {
        setLoading(false);
      },
    });
  });

  return (
    <SatusPanel token={token}>
      <Spin spinning={loading}>
        <table className="status-table">
          <thead>
            <tr>
              <StatusHeader />
              <StatusHeader />
              <StatusHeader />
            </tr>
          </thead>
          <tbody>
            <StatusRow
              statusList={statusList}
              row={0}
              onChange={handleChangeStatus}
              enabledApiStatus={enabledApiStatus}
            />
            <StatusRow
              statusList={statusList}
              row={1}
              onChange={handleChangeStatus}
              enabledApiStatus={enabledApiStatus}
            />
            <StatusRow
              statusList={statusList}
              row={2}
              onChange={handleChangeStatus}
              enabledApiStatus={enabledApiStatus}
            />
            <StatusRow
              statusList={statusList}
              row={3}
              onChange={handleChangeStatus}
              enabledApiStatus={enabledApiStatus}
            />
          </tbody>
        </table>
      </Spin>
    </SatusPanel>
  );
};

export default StatusList;

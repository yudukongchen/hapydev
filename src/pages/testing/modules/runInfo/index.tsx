import { Drawer, theme } from 'antd';
import { ReportInfoWrapper } from './style';
import ChartPanel from './chart';
import CountsPanel from './counts';
import DescriptionPanel from './descriptions';
import ApisPanel from './apis';
import React from 'react';
import { css } from '@emotion/css';
import useTempInfo from './hooks/useTempInfo';
import Progress from './progress';

type Props = {
  open: boolean;
  tempData: any;
  onClose: () => void;
};

const RunInfo: React.FC<Props> = (props) => {
  const { open, tempData, onClose } = props;

  const { token } = theme.useToken();

  const tempInfo = useTempInfo(tempData);

  return (
    <Drawer
      open={open}
      width={900}
      title="测试结果"
      onClose={onClose}
      className={css`
        .ant-drawer-body {
          padding: 10px;
        }
      `}
    >
      <ReportInfoWrapper token={token} className="beautify-scrollbar">
        <div className="base-info">
          <ChartPanel
            succesApiPercent={tempInfo?.succesApiPercent}
            failedApiPercent={tempInfo?.failedApiPercent}
            successAssertPercent={tempInfo?.successAssertPercent}
            failedAssertPercent={tempInfo?.failedAssertPercent}
          />
          <CountsPanel
            apiCount={tempInfo?.apiList?.length ?? 0}
            failedCount={tempInfo?.failedApiList?.length ?? 0}
            assertCount={tempInfo?.assertsList?.length ?? 0}
            failedAssertCount={tempInfo?.failedAssertList?.length ?? 0}
          />
          {tempData?.status === 'running' && <Progress progress={tempData?.progress} />}
          {tempData?.status === 'completed' && (
            <DescriptionPanel
              create_time={tempData?.create_time}
              finish_time={tempData?.finish_time}
              cost_time={tempData?.cost_time}
              env_name={tempData?.env_name}
              user_name={tempData?.user_name}
              response_time={tempInfo?.response_time}
              total_size={tempInfo?.total_size}
            />
          )}
        </div>
        <ApisPanel
          apiList={tempInfo?.apiList}
          successApiList={tempInfo?.successApiList}
          failedApiList={tempInfo?.failedApiList}
        />
      </ReportInfoWrapper>
    </Drawer>
  );
};

export default RunInfo;

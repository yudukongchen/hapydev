import { Progress, theme } from 'antd';
import React from 'react';

type Props = {
  progress: number;
};

const RunPercent: React.FC<Props> = (props) => {
  const { progress } = props;
  const { token } = theme.useToken();
  return (
    <div className="progress-panel ">
      <Progress
        className="progress"
        percent={Number(progress?.toFixed(2))}
        strokeColor={token.colorSuccess}
        showInfo={false}
      />
      <div className="text-panel">{progress?.toFixed(2)}%</div>
    </div>
  );
};

export default RunPercent;

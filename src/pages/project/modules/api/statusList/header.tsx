import { Tooltip } from 'antd';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';

const StatusHeader = () => {
  return (
    <th>
      <div className="status-header">
        <div>接口状态名称</div>
        <div>
          <span>启用</span>
          <Tooltip title="“启用”后，项目内所有接口都可选择该接口状态">
            <span>
              <SvgQuesstion className="svg-icon" />
            </span>
          </Tooltip>
        </div>
      </div>
    </th>
  );
};

export default StatusHeader;

import { Switch } from 'antd';
import React from 'react';
type Props = {
  id: string;
  title: string;
  color: string;
  enabledApiStatus: { [key: string]: boolean };
  onChange: (id: string, enabled: boolean) => void;
};

const StatusItem: React.FC<Props> = (props) => {
  const { id, title, color, enabledApiStatus, onChange } = props;
  return (
    <td>
      <div className="status-item">
        <div
          className="status-icon"
          style={{
            backgroundColor: color,
          }}
        ></div>
        <div className="status-title">{title} </div>
        <div className="btn">
          <Switch
            size="small"
            checked={enabledApiStatus?.[id] === true}
            onChange={(checked) => {
              onChange(id, checked);
            }}
          />
        </div>
      </div>
    </td>
  );
};
export default StatusItem;

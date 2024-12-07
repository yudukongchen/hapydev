import { Button, DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import { isNull } from 'lodash';
import React from 'react';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Dayjs from '@utils/dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

dayjs.extend(customParseFormat);

const dateFormat = 'YYYY-MM-DD';
type Props = {
  value: string;
  onChange: (newVal: string) => void;
};
const ExpireTime: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const computedValue = isNull(value) ? undefined : dayjs(dayjs(value).format(), dateFormat);
  const handleChange = (newVal) => {
    const result = Dayjs(newVal).format();
    onChange(result);
  };

  const handleSetNull = () => {
    onChange(null);
  };

  return (
    <div className="form-item">
      <div className="item-name">过期时间</div>
      <div className="item-value right">
        <Space.Compact>
          <DatePicker
            allowClear={false}
            size="small"
            value={computedValue}
            onChange={handleChange}
          />
          <Button onClick={handleSetNull}>永不过期</Button>
        </Space.Compact>
      </div>
    </div>
  );
};

export default ExpireTime;

import { Tooltip } from 'antd';
import dayjs from 'dayjs';
import { isUndefined } from 'lodash';
import SvgFolder from '@assets/icons/folder.svg?react';
import SvgResponseTemplate from '@assets/icons/response-template.svg?react';

const renderTemplate = (value) => {
  return (
    <Tooltip
      placement="bottom"
      showArrow
      title={
        <div className="apis-tooltip">
          <div>
            <span className="api-name">{value?.name}</span>
          </div>
          {!isUndefined(value?.create_time) && (
            <div>
              创建于：
              {dayjs(value?.create_time * 1000).format('YYYY-MM-DD')}
            </div>
          )}
          {!isUndefined(value?.update_time) && (
            <div>
              修改于：
              {dayjs(value?.update_time * 1000).format('YYYY-MM-DD')}
            </div>
          )}
        </div>
      }
    >
      <>
        <span className="item-icon">
          <SvgResponseTemplate />
        </span>
        {value.name}
      </>
    </Tooltip>
  );
};

export default renderTemplate;

import { isEmpty } from 'lodash';
import { Button, Empty, Popconfirm, Tooltip } from 'antd';
import SvgToken from './token.svg?react';
import SvgCopy from '@assets/icons/copy.svg?react';
import React from 'react';
import dayjs from 'dayjs';
import { copyTextToClipboard } from '@utils/copy';
import SvgDelete from '@assets/icons/delete.svg?react';

type Props = {
  dataList: any[];
  onDelete: (id: string) => void;
};

const DataList: React.FC<Props> = (props) => {
  const { dataList, onDelete } = props;

  if (isEmpty(dataList)) {
    return (
      <div className="empty-item">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无API Token数据" />
      </div>
    );
  }

  return (
    <div className="token-list beautify-scrollbar">
      {dataList.map((item, index) => (
        <div key={index} className="token-item">
          <div className="item-icon">
            <SvgToken />
          </div>
          <div className="item-values">
            <div className="token-title">{item?.name}</div>
            <div className="line-item">
              <div className="line-item-name">API Token:</div>
              <div className="line-item-value">
                <span>{item?.token.replace(/^(.{16}).*(.{8})$/g, '$1****$2')}</span>
                <Tooltip title="复制到剪贴板">
                  <Button
                    onClick={() => {
                      copyTextToClipboard(item?.token);
                    }}
                    className="btn-copy"
                    icon={<SvgCopy />}
                    type="text"
                    size="small"
                  ></Button>
                </Tooltip>
              </div>
            </div>
            <div className="line-item">
              <div className="line-item-name">创建时间:</div>
              <div className="line-item-value">
                {dayjs(item?.create_time).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
            <div className="line-item">
              <div className="line-item-name">过期时间:</div>
              <div className="line-item-value">
                {dayjs(item?.expire_time).format('YYYY-MM-DD HH:mm:ss')}
              </div>
            </div>
          </div>
          <div className="item-btns">
            <Popconfirm
              placement="topRight"
              title="删除提示"
              description="确定要删除吗？将不可恢复！"
              onConfirm={onDelete.bind(null, item?.id)}
            >
              <Button danger type="text" size="small" icon={<SvgDelete />}></Button>
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>
  );
};
export default DataList;

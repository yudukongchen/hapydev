import Dayjs from '@utils/dayjs';
import { Empty } from 'antd';
import React from 'react';

type Props = {
  dataList: any[];
};
const Information: React.FC<Props> = (props) => {
  const { dataList } = props;

  const emptyContent = (
    <Empty
      style={{ margin: '40px 0' }}
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description="暂无新通知"
    />
  );

  return (
    <div className="todo-list beautify-scrollbar">
      {dataList.length === 0
        ? emptyContent
        : dataList.map((item, index) => (
            <React.Fragment key={index}>
              <div className="item" key={index}>
                <div className="item-type">
                  <span className="name">{item?.title}</span>
                  <span className="date">{Dayjs(item?.send_time).format('YYYY-MM-DD')}</span>
                </div>
                <div className="item-desc">{item?.content}</div>
              </div>
              {index < dataList.length - 1 && <div className="divider"></div>}
            </React.Fragment>
          ))}
    </div>
  );
};

export default Information;

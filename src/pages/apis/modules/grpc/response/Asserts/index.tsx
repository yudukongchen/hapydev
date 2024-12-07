import { Segmented, theme } from 'antd';
import { AssertsWrapper } from './style';
import { useSafeState } from 'ahooks';
import { BODY_MODES } from './constants';
import React, { useMemo } from 'react';
import cn from 'classnames';
import { isArray, isEmpty } from 'lodash';
import Empty from './empty';

type Props = {
  asserts: any[];
};

const Asserts: React.FC<Props> = (props) => {
  const { asserts = [] } = props;
  const { token } = theme.useToken();
  const [mode, setMode] = useSafeState<string>('all');

  const computedList = useMemo(() => {
    if (!isArray(asserts)) {
      return [];
    }
    if (mode === 'all') {
      return asserts;
    }
    if (mode === 'success') {
      return asserts.filter((item) => item.result === true);
    }
    if (mode === 'failed') {
      return asserts.filter((item) => item.result === false);
    }
    return [];
  }, [asserts, mode]);

  if (isEmpty(asserts)) {
    return <Empty token={token} />;
  }

  return (
    <AssertsWrapper token={token}>
      <div className="assert-header">
        <Segmented value={mode} onChange={setMode} options={BODY_MODES} size="small" />
      </div>
      <div className="assert-contents">
        {computedList.map((item, index) => (
          <div key={index} className="asssert-item">
            <div className={cn('item-status', item.result === true ? 'success' : 'failed')}>
              {item.result === true ? '成功' : '失败'}
            </div>
            <div className="item-message">
              <span>{item.desc}</span>
              <span className="message">{item.message}</span>
            </div>
          </div>
        ))}
      </div>
    </AssertsWrapper>
  );
};

export default Asserts;

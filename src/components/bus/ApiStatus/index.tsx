import { Dropdown, MenuProps } from 'antd';
import React, { useMemo } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { optionItem, statusWrapper } from './style';
import useApisConfigs from '@hooks/modules/useApisConfigs';
import { API_STATUS } from '@constants/api_status';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
  showAll?: boolean;
};

const Status: React.FC<Props> = (props) => {
  const { value = 'developing', onChange, showAll = false } = props;

  const { enabledApiStatus } = useApisConfigs();

  const computedStatusList = useMemo(() => {
    const statusList = Object.entries(API_STATUS)
      .map(([key, item]) => ({ key, ...item }))
      .filter(
        (item) => enabledApiStatus[item?.key] === true || (showAll === true && item.key === 'all')
      );
    const result: MenuProps['items'] = statusList.map((item) => ({
      label: (
        <div className={optionItem}>
          <div className="status-icon" style={{ backgroundColor: item?.color }}></div>
          <div>{item?.title}</div>
        </div>
      ),
      key: item?.key,
    }));

    return result;
  }, [showAll, enabledApiStatus]);

  const handleItemClick = ({ key }) => {
    onChange(key);
  };

  return (
    <Dropdown
      trigger={['click']}
      placement="bottomRight"
      menu={{
        //className: enviromentWrapper,
        selectedKeys: [value],
        onClick: handleItemClick,
        items: computedStatusList,
      }}
    >
      <div className={statusWrapper}>
        <div className="status-icon" style={{ backgroundColor: API_STATUS?.[value]?.color }}></div>
        {API_STATUS?.[value]?.title}
        <DownOutlined />
      </div>
    </Dropdown>
  );
};

export default Status;

import { Button, Dropdown, Tabs, TabsProps, Tooltip, theme } from 'antd';
import { NoticeWrapper } from './style';
import TodoList from './todo';
import Information from './information';
import SvgClear from '@assets/icons/clear.svg?react';
import { BellOutlined } from '@ant-design/icons';
import useNoticeDatas from './useNoticeData';
import React from 'react';

const Notice = () => {
  const { token } = theme.useToken();
  const { todoList, noticeList, onClearDatas, loadDataList } = useNoticeDatas();

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '待办',
      children: <TodoList dataList={todoList} />,
    },
    {
      key: '2',
      label: '系统消息',
      children: <Information dataList={noticeList} />,
    },
  ];

  const renderDropdown = () => {
    return (
      <NoticeWrapper token={token}>
        <Tabs
          items={items}
          tabBarExtraContent={{
            right: (
              <Tooltip title="全部清除">
                <Button onClick={onClearDatas} type="text" icon={<SvgClear />} />
              </Tooltip>
            ),
          }}
        />
      </NoticeWrapper>
    );
  };
  return (
    <Dropdown
      onOpenChange={(open) => {
        if (open) {
          loadDataList();
        }
      }}
      dropdownRender={renderDropdown}
      placement="bottomRight"
    >
      <Button type="text" icon={<BellOutlined />} size="small" />
    </Dropdown>
  );
};

export default React.memo(Notice);

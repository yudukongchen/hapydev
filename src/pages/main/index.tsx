import { Tabs, theme } from 'antd';
import Header from '@components/bus/AppHeader';
import { LEFT_TAB_MENUS } from './constants';
import MenuItem from './menuItem';
import { MainPageWrapper } from './style';
import { Suspense } from 'react';
import LazyLoading from '@components/bus/LazyLoading';
import useGlobal from '@hooks/useGlobal';
import GlobalModals from '@modals/index';
import { UserAddOutlined } from '@ant-design/icons';
import { useSafeState } from 'ahooks';
import InviteProject from '@components/bus/InviteProject';
import { useGlobalSubject } from '@hooks/useSubject';

const MainPage = () => {
  const { token } = theme.useToken();
  const [modal, setModal] = useSafeState(null);
  const [activeTab, setActiveTab] = useSafeState('apis');
  useGlobal();
  const computedItems = LEFT_TAB_MENUS.map((item) => {
    return {
      label: <MenuItem menuKey={item.key} icon={item.icon} title={item.title} />,
      key: item.key,
      children: (
        <Suspense fallback={<LazyLoading />}>
          <item.element />
        </Suspense>
      ),
    };
  });

  useGlobalSubject('MAIN/updateActiveTab', setActiveTab, []);

  return (
    <MainPageWrapper token={token}>
      <InviteProject open={modal === 'invite-users'} onClose={setModal.bind(null, null)} />
      <GlobalModals />
      <Header />
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        destroyInactiveTabPane
        size="small"
        tabBarGutter={0}
        prefixCls="left-tabs"
        tabPosition="left"
        items={computedItems}
      />
      <div className="invite-button" onClick={setModal.bind(null, 'invite-users')}>
        <UserAddOutlined className="svg-icon" />
        <span className="invite-text">邀请成员</span>
      </div>
    </MainPageWrapper>
  );
};

export default MainPage;

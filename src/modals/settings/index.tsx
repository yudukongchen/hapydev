import { useSafeState } from 'ahooks';
import Left from './Left';
import { SettingsWrapper } from './style';
import { TAB_LIST } from './constant';
import { isObject } from 'lodash';
import { TabItem } from './types';
import { useMemo } from 'react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import ResizeBar from '@components/bus/ResizeBar';
import { theme } from 'antd';

const Settings = (props) => {
  const {} = props;

  const { token } = theme.useToken();

  const [activeKey, setActiveKey] = useSafeState('skins');

  const activeItem: TabItem = useMemo(() => {
    return TAB_LIST.find((item) => item.key === activeKey);
  }, [activeKey]);

  return (
    <SettingsWrapper token={token}>
      <PanelGroup direction="horizontal">
        <Panel minSize={15} maxSize={50} collapsible defaultSize={25}>
          <Left activeKey={activeKey} onActiveChange={setActiveKey} />
        </Panel>
        <ResizeBar direction="horizontal" />
        <Panel>
          <div className="right-container">
            <div className="right-title">{activeItem?.title}</div>
            <div className="right-content beautify-scrollbar">
              {isObject(activeItem) && <activeItem.element />}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </SettingsWrapper>
  );
};

export default Settings;

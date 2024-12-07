import { Panel, PanelGroup } from 'react-resizable-panels';
import { UserSettingsWrapper, modalWrapper } from './style';
import { Modal, theme } from 'antd';
import ResizeBar from '@components/bus/ResizeBar';
import LeftPanel from './left';
import React, { useMemo } from 'react';
import { useSafeState } from 'ahooks';
import { TAB_LIST } from './constant';
import { isObject } from 'lodash';

type Props = {
  open: boolean;
  onClose: () => void;
};

const UserSettings: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { open, onClose } = props;
  const [activeKey, setActiveKey] = useSafeState('base');

  const activeItem: { title: string; element: any } = useMemo(() => {
    return TAB_LIST.find((item) => item.key === activeKey);
  }, [activeKey]);

  return (
    <Modal
      destroyOnClose
      width={700}
      open={open}
      title={null}
      onCancel={onClose}
      className={modalWrapper}
      footer={null}
    >
      <UserSettingsWrapper token={token}>
        <PanelGroup direction="horizontal">
          <Panel minSize={20} maxSize={50} collapsible defaultSize={25}>
            <LeftPanel activeKey={activeKey} onActiveChange={setActiveKey} />
          </Panel>
          <ResizeBar direction="horizontal" />
          <Panel>
            <div className="right-container">
              <div className="right-title">{activeItem?.title}</div>
              <div className="right-content beautify-scrollbar">
                {isObject(activeItem) && <activeItem.element onClose={onClose} />}
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </UserSettingsWrapper>
    </Modal>
  );
};

export default UserSettings;

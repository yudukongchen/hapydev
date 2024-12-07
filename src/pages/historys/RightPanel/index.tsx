import React from 'react';
import { useSelector } from 'react-redux';
import TabsHeader from './TabsHeader';
import { RightPanelWrapper } from './style';
import TabsBody from './TabsBody';
import StatusBar from '@components/bus/StatusBar';
import { Panel, PanelGroup } from 'react-resizable-panels';
import Terminal from '@components/bus/Terminal';
import ResizeBar from '@components/bus/ResizeBar';
import { theme } from 'antd';
import { useGlobalSubject } from '@hooks/useSubject';
import useProjectInfo from '@hooks/useProjectInfo';

const RightPanel = () => {
  const { token } = theme.useToken();
  const opensData = useSelector((store: any) => store?.historys?.opens);
  const tabsList = useSelector((store: any) => store?.historys?.tabs?.list);
  const activeId = useSelector((store: any) => store?.historys?.tabs?.active_id);

  const projectInfo = useProjectInfo();

  const terminalRef = React.useRef(null);

  const handleToggleShowTerminal = () => {
    if (terminalRef?.current?.isCollapsed() === true) {
      terminalRef.current?.resize(50);
      return;
    }
    terminalRef.current?.collapse();
  };

  const handleCloseTerminal = () => {
    if (terminalRef?.current?.isCollapsed() !== true) {
      terminalRef.current?.collapse();
    }
  };

  useGlobalSubject('TERMINAL/toggleShow', handleToggleShowTerminal, []);
  useGlobalSubject('TERMINAL/close', handleCloseTerminal, []);

  return (
    <RightPanelWrapper token={token}>
      <PanelGroup className="resize-container" direction="vertical">
        <Panel>
          <div className="request-container">
            <TabsHeader
              opensData={opensData}
              tabsList={tabsList}
              activeId={activeId}
              isReadOnly={projectInfo?.role !== 6}
            />
            <TabsBody activeId={activeId} />
          </div>
        </Panel>
        <ResizeBar direction="vertical" />
        <Panel ref={terminalRef} minSize={10} collapsible defaultSize={0}>
          <Terminal className="console-container" onClose={() => void 0} />
        </Panel>
      </PanelGroup>
      <StatusBar />
    </RightPanelWrapper>
  );
};

export default RightPanel;

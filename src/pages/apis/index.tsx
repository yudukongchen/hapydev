import LeftPanel from './LeftPanel';
import { Panel, PanelGroup, PanelProps } from 'react-resizable-panels';
import RightPanel from './RightPanel';
import ResizeBar from '@components/bus/ResizeBar';
import { useLayoutEffect, useRef } from 'react';
import { useSafeState } from 'ahooks';
import { isNumber } from 'lodash';
import { ApisWrapper } from './style';
import useCreation from './hooks/useCreation';
import useLeftMenu from './hooks/useLeftMenu';
import { useGlobalSubject } from '@hooks/useSubject';
import CreateShare from '@modals/create-share';

const Apis = () => {
  const [defaultSize, setDefaultSize] = useSafeState<PanelProps['defaultSize']>();
  const [shareData, setShareData] = useSafeState(null);

  const refContainer = useRef(null);

  //使用创建数据钩子
  useCreation();
  const { refLeftPanel, handleCollapse, handleExpand } = useLeftMenu({ defaultSize });

  useLayoutEffect(() => {
    const panelGroup = refContainer.current;
    if (panelGroup instanceof HTMLElement) {
      setDefaultSize((320 / panelGroup.offsetWidth) * 100);
    }
  }, []);

  const handleShowShareModal = (data) => {
    setShareData(data);
  };

  useGlobalSubject('APIS/showShareModal', handleShowShareModal, []);

  return (
    <ApisWrapper ref={refContainer}>
      <CreateShare
        open={shareData !== null}
        default_share={shareData}
        onClose={setShareData.bind(null, null)}
      />

      <PanelGroup direction="horizontal" style={{ height: '100%' }}>
        {isNumber(defaultSize) && (
          <Panel
            onCollapse={handleCollapse}
            onExpand={handleExpand}
            ref={refLeftPanel}
            defaultSize={defaultSize}
            //minSize={minSize}
            maxSize={45}
            collapsible
            order={1}
          >
            <LeftPanel />
          </Panel>
        )}
        <ResizeBar direction="horizontal" />
        <Panel order={2}>
          <RightPanel />
        </Panel>
      </PanelGroup>
    </ApisWrapper>
  );
};

export default Apis;

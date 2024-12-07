import produce from 'immer';
import { messageWrapper } from './style';
import { Panel, PanelGroup } from 'react-resizable-panels';
import BodyList from './bodyList';
import { Get } from '#types/libs';
import ResizeBar from '@components/bus/ResizeBar';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { useEffect, useRef } from 'react';
import { isObject } from 'lodash';
import RawPanel from './rawPanel';
import SvgLeft from '@assets/icons/angle-left.svg?react';
import { SocketIOCollection } from '#types/collection/socketIO';

type SocketIOData = Get<SocketIOCollection, 'data'>;
type Props = {
  api_id: string;
  value: SocketIOData;
  onChange: (newVal: SocketIOData) => void;
};

const Message: React.FC<Props> = (props) => {
  const { api_id, value, onChange } = props;
  const [activeIndex, setActiveIndex] = useSafeState(0);
  const [open, setOpen] = useSafeState(true);

  const refBodyPanel = useRef(null);

  const handleChangeMessages = (newVal: any) => {
    const newData = produce(value, (draft) => {
      draft.messages = newVal;
    });
    onChange(newData);
  };

  const handleActiveChange = useMemoizedFn((index) => {
    const activeBody = value?.messages?.[index];
    if (!isObject(activeBody)) {
      return;
    }
    const result = produce(value, (draft) => {
      draft.request.body = activeBody;
    });
    onChange(result);
    setActiveIndex(index);
  });

  useEffect(() => {}, []);

  return (
    <div className={messageWrapper}>
      <PanelGroup direction="horizontal">
        <Panel>
          <RawPanel api_id={api_id} activeIndex={activeIndex} value={value} onChange={onChange} />
        </Panel>
        <ResizeBar direction="horizontal" />
        <Panel
          ref={refBodyPanel}
          maxSize={40}
          defaultSize={25}
          onCollapse={setOpen.bind(null, false)}
          onExpand={setOpen.bind(null, true)}
          minSize={15}
          collapsible
          collapsedSize={3}
        >
          {open ? (
            <BodyList
              activeIndex={activeIndex}
              value={value?.messages}
              onChange={handleChangeMessages}
              onActiveChange={handleActiveChange}
              onCollapse={() => {
                refBodyPanel.current.collapse();
              }}
            />
          ) : (
            <div
              className="mini-message-bar"
              onClick={() => {
                refBodyPanel.current.expand();
              }}
            >
              <div className="bar-head">
                <SvgLeft />
              </div>
              <div className="bar-title">消息列表</div>
            </div>
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Message;

import { Button, Dropdown, Input, theme } from 'antd';
import { ResponseHeader, messageTypeWrapper } from './style';
import { MESASAGE_STATUS } from '../constants';
import SvgClear from '@assets/icons/clear.svg?react';
import SvgDown from '@assets/icons/angle-down.svg?react';
import SvgReceived from '../icons/received.svg?react';
import SvgSent from '../icons/sent.svg?react';
import { useMemoizedFn } from 'ahooks';
import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import { emitGlobal } from '@subjects/global';
import produce from 'immer';

type Props = {
  api_id: string;
  filter: { type: string; text: string };
  setFilter: (newVal: { type: string; text: string }) => void;
};
const Header: React.FC<Props> = (props) => {
  const { api_id, filter, setFilter } = props;

  const socketStatus = useSelector((store: any) => store?.tempDatas?.api?.[api_id]?.status);
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);

  const { token } = theme.useToken();

  const handleChangeFilter = useMemoizedFn((key, newVal) => {
    const result = produce(filter, (draft) => {
      draft[key] = newVal;
    });
    setFilter(result);
  });

  const handleTypeChange = ({ key }) => {
    handleChangeFilter('type', key);
  };

  const renderStatus = () => {
    if (socketStatus === 'connected') {
      return '连接成功';
    }
    if (socketStatus === 'connectioning') {
      return '正在连接';
    }
    if (socketStatus === 'disconnect') {
      return '连接断开';
    }
    return '未连接';
  };

  const handleClearMessage = useMemoizedFn(() => {
    emitGlobal('PROXYS/WEBSOCKET/clearMessages', api_id);
  });

  const isShowText = panel_view_mode !== 'horizontal';

  return (
    <ResponseHeader token={token}>
      <div className="left">
        {isShowText && <div className="case-title">消息列表</div>}

        <Input
          size="small"
          placeholder="搜索消息"
          spellCheck={false}
          value={filter?.text ?? ''}
          onChange={(e) => {
            handleChangeFilter('text', e.target.value);
          }}
        />
        <Dropdown
          overlayClassName={messageTypeWrapper}
          menu={{
            activeKey: filter?.type,
            onClick: handleTypeChange,
            items: MESASAGE_STATUS,
          }}
        >
          <div className={cn(messageTypeWrapper, 'message-types')}>
            {filter?.type === 'received' && (
              <>
                <div className="msg-type-icon receive">
                  <SvgReceived />
                </div>
                <div>已收到的消息</div>
              </>
            )}
            {filter?.type === 'sent' && (
              <>
                <div className="msg-type-icon sent">
                  <SvgSent />
                </div>
                <div>已发送的消息</div>
              </>
            )}
            {filter?.type === 'all' && <div>全部消息</div>}
            <SvgDown />
          </div>
        </Dropdown>
        {isShowText ? (
          <Button onClick={handleClearMessage} size="small" type="text" icon={<SvgClear />}>
            清除消息
          </Button>
        ) : (
          <Button
            style={{ padding: '0 6px' }}
            onClick={handleClearMessage}
            size="small"
            type="text"
            icon={<SvgClear />}
          />
        )}
      </div>
      <div className="right">
        <div className={cn('conn-satatus', socketStatus)}>
          <div className="icon"></div>
          <div className="title">{renderStatus()}</div>
        </div>
      </div>
    </ResponseHeader>
  );
};

export default Header;

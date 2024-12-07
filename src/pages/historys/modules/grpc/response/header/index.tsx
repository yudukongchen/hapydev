import { Button, Dropdown, Input, theme } from 'antd';
import { ResponseHeader, messageTypeWrapper } from './style';
import { MESASAGE_STATUS } from '../constants';
import SvgClear from '@assets/icons/clear.svg?react';
import SvgDown from '@assets/icons/angle-down.svg?react';
import SvgReceived from '../icons/received.svg?react';
import { useSafeState } from 'ahooks';
import cn from 'classnames';

const Header = () => {
  const { token } = theme.useToken();

  const [open, setOpen] = useSafeState(false);

  const handleTypeChange = ({ key }) => {
    setOpen(false);
  };

  return (
    <ResponseHeader token={token}>
      <div className="left">
        <div className="case-title">消息列表</div>
        <Input size="small" placeholder="搜索消息" spellCheck={false} />
        <Dropdown
          open={open}
          onOpenChange={setOpen}
          overlayClassName={messageTypeWrapper}
          menu={{
            onClick: handleTypeChange,
            items: MESASAGE_STATUS,
          }}
        >
          <div className={cn(messageTypeWrapper, 'message-types')}>
            <div className="msg-type-icon receive">
              <SvgReceived />
            </div>
            <div>已发送的消息</div>
            <SvgDown />
          </div>
        </Dropdown>
        <Button size="small" type="text" icon={<SvgClear />}>
          清除消息
        </Button>
      </div>
      <div className="right">
        <div className="conn-satatus connected">
          <div className="icon"></div>
          <div className="title">连接成功</div>
        </div>
      </div>
    </ResponseHeader>
  );
};

export default Header;

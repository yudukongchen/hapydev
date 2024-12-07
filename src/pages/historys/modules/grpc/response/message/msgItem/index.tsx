import SvgDown from '@assets/icons/angle-down.svg?react';
import SvgUp from '@assets/icons/angle-up.svg?react';
import React from 'react';
import { MessageType } from '../types';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { MsgItemWrapper } from './style';
import { theme } from 'antd';
import Editor from './editor';
import { MESSAGE_ICONS } from '../constants';
import { isObject } from 'lodash';
import cn from 'classnames';
import ObjectView from '@components/bus/ObjectViewer';

type Props = {
  type: MessageType;
  title: string;
  time: string;
  data: any;
};

const MsgItem: React.FC<Props> = (props) => {
  const { type, title, time, data } = props;
  const { token } = theme.useToken();
  const [open, setOpen] = useSafeState(false);
  const handleToggleOpen = useMemoizedFn(() => {
    setOpen(!open);
  });

  const renderDetails = () => {
    if (type === 'sent' || type === 'received') {
      return <Editor content_type={data?.content_type} text={data?.text} />;
    }
    if (type === 'connected' || type === 'disconnect') {
      return <ObjectView data={data} />;
    }
    return null;
  };

  const MessageIcon = isObject(MESSAGE_ICONS?.[type]) ? MESSAGE_ICONS?.[type] : null;

  return (
    <MsgItemWrapper token={token}>
      <div className="item-header" onClick={handleToggleOpen}>
        {MessageIcon && <MessageIcon className={cn('item-icon', type)} />}
        <div className="item-title">{title}</div>
        <div className="item-info">
          <span>{time}</span>
          {open ? <SvgUp /> : <SvgDown />}
        </div>
      </div>
      {open && <div className="item-content">{renderDetails()}</div>}
    </MsgItemWrapper>
  );
};

export default MsgItem;

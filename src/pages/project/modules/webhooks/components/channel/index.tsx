import { theme } from 'antd';
import { ChannelWrapper } from './style';
import { CHANNEL_TYPES } from './constants';
import cn from 'classnames';

type Props = {
  value: string;
  onChange: (newVal: string) => void;
};
const Channel = (props) => {
  const { token } = theme.useToken();

  const { value, onChange } = props;

  return (
    <ChannelWrapper token={token}>
      {CHANNEL_TYPES.map((item) => (
        <div
          key={item.type}
          className={cn('channel-item', {
            selected: value === item.type,
          })}
          onClick={() => {
            onChange(item.type);
          }}
        >
          <div className="icon">{<item.icon />}</div>
          <div className="text">{item.title}</div>
        </div>
      ))}
    </ChannelWrapper>
  );
};

export default Channel;

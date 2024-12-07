import React from 'react';
import DataList from './list';
import { eventsWrapper } from './style';
import { SocketIOEvent } from '#types/collection/socketIO';

type Props = {
  value: SocketIOEvent[];
  onChange: (newVal: SocketIOEvent[]) => void;
};

const EventsPanel: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  return (
    <div className={eventsWrapper}>
      <DataList value={value} onChange={onChange} />
    </div>
  );
};

export default EventsPanel;

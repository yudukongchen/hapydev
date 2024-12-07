import React from 'react';
import StatusItem from './statusItem';
import { isPlainObject } from 'lodash';

type StatusItem = {
  id: string;
  title: string;
  color: string;
};

type Props = {
  statusList: StatusItem[];
  enabledApiStatus: any;
  onChange: (id: string, status: boolean) => void;
  row: number;
};
const StatusRow: React.FC<Props> = (props) => {
  const { statusList, enabledApiStatus, onChange, row } = props;

  const computedList = statusList.filter(
    (item, index) => index >= row * 3 && index < (row + 1) * 3
  );

  return (
    <tr>
      {[0, 1, 2].map((index) => (
        <React.Fragment key={index}>
          {isPlainObject(computedList?.[index]) ? (
            <StatusItem
              id={computedList?.[index].id}
              title={computedList?.[index].title}
              color={computedList?.[index].color}
              onChange={onChange}
              enabledApiStatus={enabledApiStatus}
            />
          ) : (
            <td></td>
          )}
        </React.Fragment>
      ))}
    </tr>
  );
};
export default StatusRow;

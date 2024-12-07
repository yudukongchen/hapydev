import React from 'react';
import cn from 'classnames';
import { Team } from '#types/team';

type Props = {
  icon: any;
  cateName: string;
  list: Team[];
  activeId: string;
  onActiveChange: (newId: string) => void;
  isOffline: 1 | -1;
};

const TeamCates: React.FC<Props> = (props) => {
  const { cateName, list, activeId, onActiveChange, isOffline } = props;

  return (
    <>
      <div className="cate-item">
        <props.icon className="cate-icon" />
        <div className="cate-title">
          <span className="text">{cateName}</span>
          {isOffline === 1 ? <></> : <span className="length">({list.length})</span>}
        </div>
      </div>
      {list.length === 0 && <div className="empty-item">暂无数据</div>}
      <>
        {list.map((cItem) => (
          <div
            key={cItem.team_id}
            className={cn('sec-item', {
              active: activeId === cItem.team_id,
            })}
            onClick={onActiveChange.bind(null, cItem.team_id)}
          >
            {cItem.team_name}
          </div>
        ))}
      </>
    </>
  );
};

export default TeamCates;

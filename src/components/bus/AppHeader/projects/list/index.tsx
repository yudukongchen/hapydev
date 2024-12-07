import { Button, Collapse, Input, message, theme } from 'antd';
import { ListWrapper } from './style';
import SvgSearch from '@assets/icons/search.svg?react';
import SvgRight from '@assets/icons/angle-right.svg?react';
import SvgTeam from '@assets/icons/team2.svg?react';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { isEmpty } from 'lodash';
import { getAssertsPath } from '@utils/utils';
import { emitGlobal } from '@subjects/global';
import { useSelector } from 'react-redux';
import { exitProject } from '@bll/projects';
import { Project } from '#types/project';

type Props = {
  teamList: any[];
  onClose: () => void;
  onAddProject: () => void;
  onDelete: (project_id: string) => void;
};

const List: React.FC<Props> = (props) => {
  const { teamList, onClose, onAddProject, onDelete } = props;
  const { token } = theme.useToken();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const current_team_id = useSelector(
    (store: any) => store?.projects?.datas?.base_datas?.[current_project_id]?.team_id
  );
  const project_id_list = useSelector((store: any) => store?.projects?.datas?.id_list);

  const [name, setName] = useSafeState('');

  const handleSelect = (data) => {
    onClose();
    emitGlobal('PROJECTS/switchProject', data.project_id);
  };

  const handleExit = useMemoizedFn((data: Project, event) => {
    event.stopPropagation();
    event.preventDefault();
    exitProject(data).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        message.success('退出成功');
        //如果当前项目被删除了，切换到第一个项目去
        if (data.project_id === current_project_id) {
          const newProject_id = project_id_list?.find((item) => item !== current_project_id);
          emitGlobal('PROJECTS/switchProject', newProject_id);
        }
        emitGlobal('PROJECTS/loadMyProjects', { showloading: false });
      },
    });
  });

  const renderButton = useMemoizedFn((cItem) => {
    if (cItem?.is_offline === 1) {
      return (
        <div className="btn" onClick={onDelete.bind(null, cItem?.project_id)}>
          删除项目
        </div>
      );
    }
    if (cItem?.owner !== 1) {
      return (
        <div className="btn" onClick={handleExit.bind(null, cItem)}>
          退出项目
        </div>
      );
    }
    return null;
  });

  const colItems = useMemo(() => {
    const result = [];
    teamList.forEach((item) => {
      const childItems = item.projects
        .filter(
          (item) => isEmpty(name) || item?.name?.toLowerCase()?.indexOf(name?.toLowerCase()) !== -1
        )
        .map((cItem) => (
          <div
            className={cn('c-item', { active: current_project_id === cItem.project_id })}
            key={cItem.project_id}
            onClick={handleSelect.bind(null, {
              project_id: cItem.project_id,
              team_id: item.team_id,
            })}
          >
            <div className="item-left">
              <img src={getAssertsPath(cItem?.logo)} />
              <div className="p-title">{cItem.name}</div>
            </div>
            {renderButton(cItem)}
          </div>
        ));
      const data = {
        key: item.team_id,
        label: (
          <>
            <div className="t-name">
              <SvgTeam />
              <div className="t-title">{item.name}</div>
            </div>
            <span className="p-count">{childItems?.length}</span>
          </>
        ),
        children: <div className="child-list">{childItems}</div>,
      };
      if (childItems?.length > 0) {
        result.push(data);
      }
    });
    return result;
  }, [teamList, name, current_project_id]);

  return (
    <ListWrapper token={token}>
      <div className="header">
        <span>团队/项目</span>
        <Button
          type="text"
          size="small"
          onClick={() => {
            onAddProject();
            onClose();
          }}
        >
          新建项目
        </Button>
      </div>
      <Input
        className="search-box"
        prefix={<SvgSearch />}
        placeholder="搜索项目"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <div className="list-panel beautify-scrollbar">
        <Collapse
          bordered={false}
          accordion
          defaultActiveKey={[current_team_id]}
          expandIcon={({ isActive }) => (
            <SvgRight className={cn('expand-icon', { active: isActive })} />
          )}
          expandIconPosition="end"
          items={colItems}
        />
      </div>
    </ListWrapper>
  );
};

export default List;

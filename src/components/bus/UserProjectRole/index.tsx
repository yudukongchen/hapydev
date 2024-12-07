import { Table, theme } from 'antd';
import { useMemoizedFn, useSafeState } from 'ahooks';
import React, { Key } from 'react';
import produce from 'immer';
import { ListWrapper } from './style';
import useColumns from './useColumns';
import TableHeader from './table-header';
import { Project } from '#types/project';

type RolesData = { [key: string]: 0 | 2 | 6 };

type Props = {
  projectsList: Project[];
  roleDatas: RolesData;
  onRolesChange: (roles: RolesData) => void;
};
const ProjectList: React.FC<Props> = (props) => {
  const { projectsList, roleDatas, onRolesChange } = props;
  const { token } = theme.useToken();
  const [keys, setKeys] = useSafeState<Key[]>([]);

  const handleChangeRole = useMemoizedFn((id, newVal) => {
    const result = produce(roleDatas, (draft) => {
      draft[id] = newVal;
    });
    onRolesChange(result);
  });

  const { columns } = useColumns({ onRoleChange: handleChangeRole, roleDatas: roleDatas });

  return (
    <ListWrapper token={token}>
      <Table
        title={() => (
          <TableHeader
            projectsList={projectsList}
            roleDatas={roleDatas}
            onRolesChange={onRolesChange}
            checkedKeys={keys}
            setCheckedKeys={setKeys}
          />
        )}
        bordered
        dataSource={projectsList}
        rowKey={'project_id'}
        columns={columns}
        rowSelection={{ type: 'checkbox', selectedRowKeys: keys, onChange: setKeys }}
        size="small"
        pagination={false}
        scroll={{ x: 'auto', y: 200 }}
      />
    </ListWrapper>
  );
};

export default ProjectList;

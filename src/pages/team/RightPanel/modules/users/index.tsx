import { Button, Input, Table, theme } from 'antd';
import { UsersWrapper } from './style';
import SvgSearch from '@assets/icons/search.svg?react';
import Svginvite from '@assets/icons/invite.svg?react';
import { isEmpty } from 'lodash';
import { useSafeState } from 'ahooks';
import React, { useMemo } from 'react';
import RenamePanel from './modals/rename';
import RolePanel from './modals/user-role';
import useColumns from './hooks/useColumns';
import InviteTeam from './modals/invite-team';
import useTeamUsers from '@hooks/useTeamUsers';
import RemoveUser from './modals/remove-user';

type Props = {
  team_id: string;
};
const UsersPanel: React.FC<Props> = (props) => {
  const { team_id } = props;
  const { token } = theme.useToken();

  const [filter, setFilter] = useSafeState('');
  const [modal, setModal] = useSafeState(null);
  const [editItem, setEditItem] = useSafeState(null);
  const { userList } = useTeamUsers({ team_id });

  const computedList = useMemo(() => {
    const result = userList.filter((item) => {
      if (isEmpty(filter)) {
        return true;
      }
      const nickName = item?.nick_name ?? item?.user?.nick_name ?? '';
      if (nickName?.indexOf(filter) !== -1 || item?.user?.email?.indexOf(filter) !== -1) {
        return true;
      }
      return false;
    });
    return result;
  }, [filter, userList]);

  const handleAction = (rowData, { key }) => {
    setEditItem(rowData);
    setModal(key);
  };

  const columns = useColumns({ handleAction });

  return (
    <>
      <RenamePanel
        value={editItem}
        open={modal === 'RE_NAME'}
        onClose={setModal.bind(null, null)}
      />
      <RolePanel value={editItem} open={modal === 'ROLE'} onClose={setModal.bind(null, null)} />
      <InviteTeam
        team_id={team_id}
        open={modal === 'invite-team'}
        onClose={setModal.bind(null, null)}
      />
      <RemoveUser value={editItem} open={modal === 'DELETE'} onClose={setModal.bind(null, null)} />
      <UsersWrapper token={token}>
        <div className="list-headers">
          <Input
            className="txt-user"
            prefix={<SvgSearch />}
            placeholder="搜索"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
          <Button icon={<Svginvite />} type="primary" onClick={setModal.bind(null, 'invite-team')}>
            邀请成员
          </Button>
        </div>
        <Table
          dataSource={computedList}
          className="list-panel"
          columns={columns}
          size="small"
          rowKey={(rowData) => {
            return rowData?.uid;
          }}
          pagination={{
            position: ['bottomCenter'],
            size: 'small',
            showSizeChanger: true,
          }}
        />
      </UsersWrapper>
    </>
  );
};

export default UsersPanel;

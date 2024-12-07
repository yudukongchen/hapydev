import { Avatar, Button, Dropdown, TableProps } from 'antd';
import { isEmpty } from 'lodash';
import defaultAvator from '@assets/images/default-avatar.png';
import cn from 'classnames';
import dayjs from 'dayjs';
import SvgMore from '@assets/icons/more.svg?react';
import { TEAM_ROLE_IDS, TEAM_ROLES } from '../../../constants';
import { MENU_OPTIONS } from '../constants';
import { getAssertsPath } from '@utils/utils';

const useColumns = (props) => {
  const { handleAction } = props;
  const columns: TableProps['columns'] = [
    {
      title: '昵称',
      dataIndex: 'nick_name',
      key: 'nick_name',
      width: '20%',
      render(text, rowData) {
        const nickName = rowData?.nick_name ?? rowData?.user?.nick_name ?? '-';
        return (
          <div className="nick-name">
            <div className="avatar">
              <Avatar
                shape="square"
                src={
                  isEmpty(rowData?.user?.avatar)
                    ? defaultAvator
                    : getAssertsPath(rowData?.user?.avatar)
                }
              />
            </div>
            <div className="name">{nickName}</div>
          </div>
        );
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      render(text, rowData) {
        return <>{rowData?.user?.email}</>;
      },
    },
    {
      title: '团队权限',
      dataIndex: 'role',
      key: 'role',
      render(role) {
        return (
          <span className={cn('team-role', TEAM_ROLE_IDS?.[role])}>
            {TEAM_ROLES?.[TEAM_ROLE_IDS?.[role]] ?? ''}
          </span>
        );
      },
    },
    {
      title: '最后登录',
      dataIndex: 'last_login',
      render(text, rowData) {
        return <span>{dayjs(rowData?.user?.last_login_time).format('YYYY-MM-DD HH:mm:ss')}</span>;
      },
    },
    {
      title: '操作',
      dataIndex: 'uid',
      key: 'uid',
      width: '60px',
      align: 'center',
      render(text, rowData) {
        return (
          <>
            <Dropdown
              menu={{
                items: MENU_OPTIONS,
                onClick: handleAction.bind(null, rowData),
              }}
            >
              <Button icon={<SvgMore />} type="text" size="small" />
            </Dropdown>
          </>
        );
      },
    },
  ];

  return columns;
};

export default useColumns;

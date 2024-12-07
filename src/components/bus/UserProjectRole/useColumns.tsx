import { getAssertsPath } from '@utils/utils';
import { Avatar, Select, TableProps } from 'antd';
import { PROJECT_ROLES } from './constants';
type Props = {
  onRoleChange: (project_id, role) => void;
  roleDatas: { [key: string]: number };
};
const useColumns = (props: Props) => {
  const { onRoleChange, roleDatas } = props;

  const computedTeamRoleOptions = PROJECT_ROLES.map((item) => ({
    value: item.role,
    label: item.title,
  }));
  const columns: TableProps['columns'] = [
    {
      title: '项目',
      dataIndex: 'name',
      width: '80%',
      key: 'name',
      render(text, rowData) {
        return (
          <div className="name-item">
            <div className="logo">
              <Avatar shape="square" src={getAssertsPath(rowData?.logo)} />
            </div>
            <div className="p-title">{rowData?.name}</div>
          </div>
        );
      },
    },
    {
      title: <span style={{ paddingLeft: 8 }}>权限</span>,
      dataIndex: 'role',
      key: 'role',
      render(text, rowData) {
        return (
          <Select
            size="small"
            variant="borderless"
            value={roleDatas?.[rowData?.project_id] ?? 0}
            onChange={onRoleChange.bind(null, rowData?.project_id)}
            options={computedTeamRoleOptions}
          />
        );
      },
    },
  ];
  return {
    columns,
  };
};

export default useColumns;

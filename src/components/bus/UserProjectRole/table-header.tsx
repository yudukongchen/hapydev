import { useMemoizedFn } from 'ahooks';
import { Button, Select } from 'antd';
import produce from 'immer';
import { PROJECT_ROLES } from './constants';

type Props = {
  projectsList: any[];
  checkedKeys: any[];
  setCheckedKeys: (keys: string[]) => void;
  roleDatas: { [key: string]: number };
  onRolesChange: (val: { [key: string]: number }) => void;
};
const TableHeader = (props: Props) => {
  const { projectsList, checkedKeys, setCheckedKeys, roleDatas, onRolesChange } = props;

  const computedTeamRoleOptions = PROJECT_ROLES.map((item) => ({
    value: item.role,
    label: item.title,
  }));

  const handleMultiChange = useMemoizedFn((newVal) => {
    const result = produce(roleDatas, (draft) => {
      for (const checkedKey of checkedKeys) {
        draft[checkedKey] = newVal;
      }
    });
    onRolesChange(result);
  });

  return (
    <div className="title-panel">
      <div>
        <span>
          已选{checkedKeys.length}/{projectsList.length} 项
        </span>
        {checkedKeys.length > 0 && (
          <Button type="link" size="small" onClick={setCheckedKeys.bind(null, [])}>
            取消选择
          </Button>
        )}
      </div>
      <Select
        style={{ width: 100 }}
        size="small"
        variant="borderless"
        value="批量编辑"
        onChange={handleMultiChange}
        options={computedTeamRoleOptions}
      />
    </div>
  );
};

export default TableHeader;

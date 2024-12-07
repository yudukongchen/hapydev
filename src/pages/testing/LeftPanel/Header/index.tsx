import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { headerWrapper } from './style';
import { Button, Dropdown, Flex, Input } from 'antd';
import React from 'react';
import produce from 'immer';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { CREATION_OPTIONS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { addOpensItem } from '@reducers/testing/opens';
import { addTabsItem } from '@reducers/testing/tabs';
import { cloneDeep } from 'lodash';
import { DEFAULT_TEST_CASE } from '@constants/testing/test_case';
import { v4 as uuidV4 } from 'uuid';
import AddFolder from './add-folder';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
};
const Header: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const [open, setOpen] = useSafeState(false);

  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const dispatch = useDispatch();

  const handleChange = useMemoizedFn((key, newVal) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  });

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange('name', e.target.value);
  };

  const handleCreateNewCase = useMemoizedFn(() => {
    const newOpens = cloneDeep(DEFAULT_TEST_CASE);
    newOpens.test_id = uuidV4();
    newOpens.project_id = current_project_id;
    dispatch(addOpensItem(newOpens));
    dispatch(addTabsItem({ id: newOpens?.test_id }));
  });

  const handleCreateTesting = ({ key }) => {
    if (key === 'test-case') {
      handleCreateNewCase();
      return;
    }
    if (key === 'folder') {
      setOpen(true);
    }
  };

  return (
    <>
      <AddFolder open={open} onClose={setOpen.bind(null, false)} />
      <Flex gap={4} className={headerWrapper}>
        <Input
          placeholder="搜索用例名称"
          spellCheck={false}
          value={value?.name ?? ''}
          onChange={handleChangeName}
          style={{ flex: 1 }}
          prefix={<SearchOutlined />}
        />
        <Dropdown
          menu={{
            onClick: handleCreateTesting,
            items: CREATION_OPTIONS,
          }}
        >
          <Button type="primary" icon={<PlusOutlined width={22} height={22} />} />
        </Dropdown>
      </Flex>
    </>
  );
};

export default Header;

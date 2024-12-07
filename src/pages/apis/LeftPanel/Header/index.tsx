import { SearchOutlined, FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { headerWrapper } from './style';
import { Button, Dropdown, Flex, Input, Tooltip } from 'antd';
import React from 'react';
import produce from 'immer';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { CREATION_OPTIONS } from './constants';
import { emitGlobal } from '@subjects/global';
import CurlImport from './curl-import';
import SvgExpand from '@assets/icons/expand-all2.svg?react';
import SvgFold from '@assets/icons/fold-all2.svg?react';

type Props = {
  value: any;
  onChange: (newVal: any) => void;
  showAll: boolean;
  onToggleExpandAll: () => void;
};
const Header: React.FC<Props> = (props) => {
  const { value, onChange, showAll, onToggleExpandAll } = props;
  const [modal, setModal] = useSafeState(null);

  const handleChange = useMemoizedFn((key, newVal) => {
    const newData = produce(value, (draft) => {
      draft[key] = newVal;
    });
    onChange(newData);
  });

  const handleChangeName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange('name', e.target.value);
  };

  const handleCreateApi = ({ key }) => {
    if (key === 'project') {
      return;
    }
    if (key === 'curl') {
      setModal('curl');
      return;
    }
    if (key === 'data-model') {
      emitGlobal('models/createNewItem', {
        type: 'CREATE_MODEL',
      });
      return;
    }

    emitGlobal('apis/createNewItem', {
      type: key,
    });
  };

  return (
    <>
      <CurlImport open={modal === 'curl'} onClose={setModal.bind(null, null)} />
      <Flex gap={4} className={headerWrapper}>
        <Input
          placeholder="搜索接口/目录/请求地址"
          spellCheck={false}
          value={value?.name ?? ''}
          onChange={handleChangeName}
          style={{ flex: 1 }}
          prefix={<SearchOutlined />}
        />
        <Tooltip title={showAll ? '全部展开' : '全部折叠'}>
          <Button
            className="expand-icon"
            onClick={onToggleExpandAll}
            type="default"
            icon={showAll ? <SvgExpand /> : <SvgFold />}
          />
        </Tooltip>
        <Dropdown
          menu={{
            onClick: handleCreateApi,
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

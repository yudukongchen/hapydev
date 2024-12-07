import { Input, Switch, Table, theme } from 'antd';
import { BuiltInWrapper } from './style';
import { TABLE_COLUMNS } from './constants';
import { BUILTIN_PARAMS } from '@constants/params';
import SvgSearch from '@assets/icons/search.svg?react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBuiltin } from '@reducers/projects/params';
import cn from 'classnames';

const Builtin = () => {
  const { token } = theme.useToken();
  const is_use_builtin = useSelector((store: any) => store?.projects?.params?.is_use_builtin);
  const dispatch = useDispatch();

  const [search, setSearch] = useSafeState('');

  const list = useMemo(() => {
    if (search.length === 0) {
      return BUILTIN_PARAMS;
    }
    const result = BUILTIN_PARAMS.filter(
      (item) => item?.name?.indexOf(search) !== -1 || item?.description?.indexOf(search) !== -1
    );
    return result;
  }, [BUILTIN_PARAMS, search]);

  const handleChangeUse = useMemoizedFn((is_used) => {
    dispatch(updateBuiltin(is_used ? 1 : -1));
  });

  return (
    <>
      <div className="case-title">
        <span className="title">
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            prefix={<SvgSearch />}
            placeholder="搜索"
            spellCheck={false}
          />
        </span>
        <div className="slot-item">
          开启内置参数描述
          <Switch checked={is_use_builtin === 1} onChange={handleChangeUse} size="small"></Switch>
        </div>
      </div>
      <BuiltInWrapper
        className={cn({
          disabled: is_use_builtin !== 1,
        })}
        token={token}
      >
        <Table
          bordered
          columns={TABLE_COLUMNS}
          dataSource={list}
          pagination={{
            position: ['bottomCenter'],
            size: 'small',
            showSizeChanger: true,
          }}
          rowKey={(rowData, index) => {
            return index;
          }}
        />
      </BuiltInWrapper>
    </>
  );
};

export default Builtin;

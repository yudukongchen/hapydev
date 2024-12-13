import Table from '@components/base/Table';
import React, { useMemo } from 'react';
import { DEFAULT_DATA_ITEM, TABLE_COLUMNS } from './constants';
import { VariableItem } from '#types/variables';
import { EnvVarsWrapper } from './style';
import { theme } from 'antd';
import { isArray, isEmpty } from 'lodash';
import produce from 'immer';
import { useMemoizedFn } from 'ahooks';

type Props = {
  value: VariableItem[];
  onChange: (newVal: VariableItem[]) => void;
};

const EnvVars: React.FC<Props> = (props) => {
  const { value, onChange } = props;
  const { token } = theme.useToken();

  const computedDataList = useMemo(() => {
    if (!isArray(value)) {
      return [{ ...DEFAULT_DATA_ITEM }];
    }
    const hasEmpetyRow = value?.some((item) => item?.is_empty_row === true);
    if (!hasEmpetyRow) {
      return [...value, DEFAULT_DATA_ITEM];
    }
    return value;
  }, [value]);

  const handleDeleteRow = useMemoizedFn((delIndex) => {
    const result = produce(value, (draft) => {
      draft.splice(delIndex, 1);
    });
    onChange(result);
  });

  const handleChangeData = useMemoizedFn((rowData: any, rowIndex: number) => {
    const result = produce(value, (draft) => {
      draft[rowIndex] = rowData;
      if (!isEmpty(rowData?.name)) {
        delete draft[rowIndex].is_empty_row;
      }
    });
    onChange(result);
  });

  return (
    <EnvVarsWrapper token={token}>
      <Table
        onDeleteRow={handleDeleteRow}
        onFiledChange={handleChangeData}
        showBorder
        data={computedDataList}
        columns={TABLE_COLUMNS}
      />
    </EnvVarsWrapper>
  );
};
export default EnvVars;

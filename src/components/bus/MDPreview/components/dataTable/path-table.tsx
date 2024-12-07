import Table from '@components/base/Table';
import { PATH_PARAM_COLUMNS } from './constants';
import React from 'react';

type Props = {
  value: any[];
};

const TableData: React.FC<Props> = (props) => {
  const { value } = props;

  return <Table className="preview-table" columns={PATH_PARAM_COLUMNS} data={value} />;
};

export default TableData;

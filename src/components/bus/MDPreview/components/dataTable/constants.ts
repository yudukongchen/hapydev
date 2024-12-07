export const HTTP_PARAM_COLUMNS = [
  {
    title: '参数名',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '示例值',
    dataIndex: 'value',
    align: 'left',
    render(text) {
      return text || '-';
    },
  },
  {
    title: '是否必填',
    dataIndex: 'is_required',
    align: 'left',
    render(val: number) {
      return val === 1 ? '是' : '否';
    },
  },
  {
    title: '参数类型',
    dataIndex: 'data_type',
    align: 'left',
    render(text) {
      return text || '-';
    },
  },
  {
    title: '描述说明',
    align: 'left',
    dataIndex: 'description',
    render(text) {
      return text || '-';
    },
  },
];

export const PATH_PARAM_COLUMNS = [
  {
    title: '参数名',
    dataIndex: 'name',
    align: 'left',
  },
  {
    title: '示例值',
    dataIndex: 'value',
    align: 'left',
    render(text) {
      return text || '-';
    },
  },
  {
    title: '是否必填',
    dataIndex: 'is_required',
    align: 'left',
    render(val: number) {
      return '-';
    },
  },
  {
    title: '参数类型',
    dataIndex: 'data_type',
    align: 'left',
    render(text) {
      return '-';
    },
  },
  {
    title: '描述说明',
    align: 'left',
    dataIndex: 'description',
    render(text) {
      return text || '-';
    },
  },
];

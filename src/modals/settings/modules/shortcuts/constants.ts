type ShortCut = {
  title: string;
  key_vars?: string;
  key_values?: Array<string[] | string>;
};

type ShortCuts = {
  group: string;
  group_title: string;
  items: ShortCut[];
};

export const SHORT_CUTS: ShortCuts[] = [
  {
    group: 'api',
    group_title: '接口管理',
    items: [
      {
        title: '新建接口',
        key_vars: 'API_CREATE_NEW',
      },
      {
        title: '保存',
        key_vars: 'API_SAVE',
      },
      {
        title: '复制',
        key_vars: 'API_COPY',
      },
      {
        title: '删除',
        key_vars: 'API_DELETE',
      },
      {
        title: '发送请求',
        key_vars: 'API_SEND_REQUEST',
      },
      {
        title: '导入数据',
        key_vars: 'API_IMPORT_DATA',
      },
      {
        title: '导入抓包数据 (cURL)',
        key_vars: 'API_IMPORT_CURL_DATA',
      },
      {
        title: '查找接口',
        key_vars: 'API_SEARCH',
      },
    ],
  },
  {
    group: 'tabs',
    group_title: '标签页',
    items: [
      {
        title: '关闭标签',
        key_vars: 'TABS_CLOSE',
      },
      {
        title: '强制关闭标签',
        key_vars: 'TABS_FORCE_CLOSE',
      },
      {
        title: '切换到下一个标签',
        key_vars: 'TABS_TO_NEXT',
      },
      {
        title: '切换到上一个标签',
        key_vars: 'TABS_TO_PREVIOUS',
      },
      {
        title: '切换到特定标签',
        key_values: [['Cmd', '1'], '到', ['Cmd', '9']],
      },
      {
        title: '切换到最后一个标签',
        key_vars: 'TABS_TO_LAST',
      },
    ],
  },
  {
    group: 'code',
    group_title: '代码编辑器',
    items: [
      {
        title: '查找',
        key_values: [['Cmd', 'F']],
      },
      {
        title: '替换',
        key_values: [['Opt', 'Cmd', 'F']],
      },
    ],
  },
];

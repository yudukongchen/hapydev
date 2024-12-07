import SvgShareManage from '@assets/icons/share-manage.svg?react';
import SvgHistory from '@assets/icons/history.svg?react';
import SvgApiManage from '@assets/icons/api.svg?react';
import SvgAutoTest from '@assets/icons/auto-test2.svg?react';
import SvgPacketCapture from '@assets/icons/packet-capture.svg?react';
import SvgUITest from '@assets/icons/ui-test.svg?react';
import SvgProject from '@assets/icons/project.svg?react';
import SvgTeam from '@assets/icons/team2.svg?react';
import SvgNotes from '@assets/icons/notes.svg?react';
import { historys, apis, testing, notes, project, share, team, planning } from './routes';

export const LEFT_TAB_MENUS = [
  {
    key: 'apis',
    title: '接口管理',
    element: apis,
    icon: SvgApiManage,
  },
  {
    key: 'historys',
    title: '请求历史',
    element: historys,
    icon: SvgHistory,
  },
  {
    key: 'testing',
    title: '自动化测试',
    element: testing,
    icon: SvgAutoTest,
  },
  // {
  //   key: 'packet-capture',
  //   title: '抓包测试',
  //   element: planning,
  //   icon: SvgPacketCapture,
  // },
  // {
  //   key: 'ui-test',
  //   title: 'UI测试',
  //   element: planning,
  //   icon: SvgUITest,
  // },
  {
    key: 'share',
    title: '分享管理',
    element: share,
    icon: SvgShareManage,
  },
  {
    key: 'project',
    title: '项目管理',
    element: project,
    icon: SvgProject,
  },
  {
    key: 'team',
    title: '团队管理',
    element: team,
    icon: SvgTeam,
  },
  // {
  //   key: 'notebook',
  //   title: '色板',
  //   element: notes,
  //   icon: SvgNotes,
  // },
];

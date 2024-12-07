import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import mermaid from '@bytemd/plugin-mermaid';
import gemoji from '@bytemd/plugin-gemoji';
import zh_Hans from './locale/zh_Hans';

export const PLUGINS = [
  gfm({ locale: zh_Hans }),
  highlight(),
  mermaid({
    locale: {
      class: '类图',
      er: '流程图',
      flowchart: '流程图',
      gantt: '甘特图',
      mermaid: ' 插入Mermain图表',
      mindmap: '思维导图',
      pie: '饼图',
      sequence: '时序图',
      state: '状态图',
      timeline: '时间轴',
      uj: '旅程图',
    },
  }),
  gemoji(),
];

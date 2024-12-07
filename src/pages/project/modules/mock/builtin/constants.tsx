import { Tooltip } from 'antd';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';

const MATCH_TYPES = {
  wildcard: '通配符',
  exact: '完全匹配',
};

export const TABLE_COLUMNS = [
  {
    title: '数据类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '匹配方式',
    dataIndex: 'match_type',
    key: 'match_type',
    render(match_type) {
      return MATCH_TYPES?.[match_type];
    },
  },
  {
    title: (
      <div className="svg-wrapper">
        <span>匹配规则</span>
        <Tooltip title="通配符字符串，或正则表达式（开头和结尾不需要斜杠），用来匹配字段名">
          <span>
            <SvgQuesstion className="svg-quesstion" />
          </span>
        </Tooltip>
      </div>
    ),
    dataIndex: 'match_rule',
    key: 'match_rule',
    width: '20%',
  },
  {
    title: '匹配大小写',
    dataIndex: 'match_case',
    key: 'match_case',
    render(match_case) {
      return match_case === 1 ? <span>是</span> : <span>否</span>;
    },
  },
  {
    title: (
      <div>
        <span>Mock规则</span>
      </div>
    ),
    dataIndex: 'mock',
    key: 'mock',
    width: '20%',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: '20%',
  },
];

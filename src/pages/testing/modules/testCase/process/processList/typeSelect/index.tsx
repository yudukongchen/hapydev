import { Tooltip, theme } from 'antd';
import { TypeSelectWrapper } from './style';
import React from 'react';
import SvgApi from '@assets/icons/api1.svg?react';
import SvgIf from '@assets/icons/if.svg?react';
import SvgLoop from '@assets/icons/loop.svg?react';
import SvgWait from '@assets/icons/wait.svg?react';
import SvgGroup from '@assets/icons/group.svg?react';
import SvgDatabase from '@assets/icons/database.svg?react';
import SvgScript from '@assets/icons/script.svg?react';

type Props = {
  onCheck: (type: string) => void;
};
const TypeSelect: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { onCheck } = props;
  return (
    <TypeSelectWrapper token={token}>
      <div className="cate-name">请求接口</div>
      <div className="case-item" onClick={onCheck.bind(null, 'api')}>
        <SvgApi className="http" />
        <span className="title">从接口导入</span>
      </div>
      <div className="cate-name mtop10">其他</div>
      <div className="column-wapper">
        <div className="case-item" onClick={onCheck.bind(null, 'if')}>
          <SvgIf className="if" />
          <span className="title">条件</span>
        </div>
        <div className="case-item" onClick={onCheck.bind(null, 'wait')}>
          <SvgWait className="wait" />
          <span className="title">等待</span>
        </div>
      </div>
      <div className="column-wapper">
        <div className="case-item" onClick={onCheck.bind(null, 'group')}>
          <SvgGroup className="group" />
          <span className="title">分组</span>
        </div>
        <div className="case-item" onClick={onCheck.bind(null, 'loop')}>
          <SvgLoop className="loop" />
          <span className="title">循环</span>
        </div>
      </div>
      <div className="column-wapper">
        <Tooltip title="开源版暂不支持">
          <div className="case-item disabled">
            <SvgDatabase className="database" />
            <span className="title">操作数据库</span>
          </div>
        </Tooltip>

        <Tooltip title="开源版暂不支持">
          <div className="case-item disabled">
            <SvgScript className="script" />
            <span className="title">公共脚本</span>
          </div>
        </Tooltip>
      </div>
    </TypeSelectWrapper>
  );
};

export default TypeSelect;

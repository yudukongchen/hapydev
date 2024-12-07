import { Button, message, theme } from 'antd';
import { BasePanelWrapper } from './style';
import LogoItem from './logo-item';
import { useMemoizedFn, useSafeState } from 'ahooks';
import React from 'react';
import useProjectInfo from '@hooks/useProjectInfo';
import { copyTextToClipboard } from '@utils/copy';
import ReName from '@modals/rename-project';
import MoveProject from '@modals/move-project';
import RemoveProject from '@modals/remove-project';
import ModalDescription from './description';
import { isString } from 'lodash';

type Props = {
  project_id: string;
};
const BasePanel: React.FC<Props> = (props) => {
  const { token } = theme.useToken();

  const projectInfo = useProjectInfo();
  const [modal, setModal] = useSafeState(null);

  const handleRemoveModalClose = useMemoizedFn((success) => {
    if (success === true) {
      message.success('删除成功！');
    }
    setModal(null);
  });

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <BasePanelWrapper token={token}>
      <MoveProject open={modal === 'move'} value={projectInfo} onClose={handleCloseModal} />
      <ReName open={modal === 're-name'} value={projectInfo} onClose={handleCloseModal} />
      <ModalDescription
        open={modal === 'description'}
        value={projectInfo}
        onClose={handleCloseModal}
      />
      <RemoveProject
        open={modal === 'remove'}
        value={projectInfo}
        onClose={handleRemoveModalClose}
      />
      <div className="panel-header">
        <div className="panel-header-left">基本设置</div>
      </div>
      <div className="panel-body">
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">项目名称</div>
            <div className="case-title">{projectInfo?.name ?? '-'}</div>
          </div>
          <div className="item-right">
            <Button onClick={setModal.bind(null, 're-name')}>编辑</Button>
          </div>
        </div>
        <LogoItem projectInfo={projectInfo} />
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">项目ID</div>
            <div className="case-title">{projectInfo?.project_id}</div>
          </div>
          <div className="item-right">
            <Button
              onClick={() => {
                copyTextToClipboard(projectInfo?.project_id);
              }}
            >
              复制
            </Button>
          </div>
        </div>
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">项目描述</div>
            <div className="case-desc">
              {isString(projectInfo?.description) ? projectInfo?.description : '-'}
            </div>
          </div>
          <div className="item-right">
            <Button onClick={setModal.bind(null, 'description')}>编辑</Button>
          </div>
        </div>

        <div className="item-case">
          <div className="item-left">
            <div className="case-name">克隆项目</div>
            <div className="case-desc">克隆项目到当前团队或其他团队</div>
          </div>
          <div className="item-right">
            <Button disabled>克隆</Button>
          </div>
        </div>
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">移动项目</div>
            <div className="case-desc">将项目移动到其他团队</div>
          </div>
          <div className="item-right">
            <Button onClick={setModal.bind(null, 'move')}>移动</Button>
          </div>
        </div>
        <div className="item-case">
          <div className="item-left">
            <div className="case-name">
              删除项目
              <span className="dander">(危险操作)</span>
            </div>
            <div className="case-desc">务必谨慎，删除后项目将无法恢复</div>
          </div>
          <div className="item-right">
            <Button onClick={setModal.bind(null, 'remove')} danger>
              删除
            </Button>
          </div>
        </div>
      </div>
    </BasePanelWrapper>
  );
};

export default BasePanel;

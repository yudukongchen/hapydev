import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Alert, Input, message, Modal, theme } from 'antd';
import React, { useEffect } from 'react';
import { ModalWrapper } from './style';
import { Project } from '#types/project';
import { deleteProject } from '@bll/projects';
import { useSelector } from 'react-redux';

type Props = {
  value: Project;
  open: boolean;
  onClose: (success: boolean) => void;
};
const DisbandTeam: React.FC<Props> = (props) => {
  const { value, open, onClose } = props;

  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);
  const project_id_list = useSelector((store: any) => store?.projects?.datas?.id_list);

  const { token } = theme.useToken();
  const [text, setText] = useSafeState<string>(null);

  useEffect(() => {
    setText('');
  }, [open]);

  const handleOk = useMemoizedFn(() => {
    if (text !== value?.name) {
      message.error('项目名称错误');
      return;
    }

    deleteProject(value).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp?.message);
          return;
        }
        emitGlobal('TEAMS/PROJECTS/getAlllProjects', value?.team_id);
        emitGlobal('PROJECTS/loadMyProjects');

        //如果当前项目被删除了，切换到第一个项目去
        if (value?.project_id === current_project_id) {
          const newProject_id = project_id_list?.find((item) => item !== current_project_id);
          emitGlobal('PROJECTS/switchProject', newProject_id);
        }
        onClose(true);
      },
      error(err) {
        message.error(err?.message);
      },
    });
  });

  return (
    <Modal
      destroyOnClose
      width={360}
      title="删除项目"
      open={open}
      onCancel={onClose.bind(null, false)}
      onOk={handleOk}
    >
      <ModalWrapper token={token}>
        <Alert
          banner
          showIcon={false}
          type="info"
          className="footer-text"
          message="项目删除后，该项目下的所有的数据都将被同步删除，且不可恢复！"
        />
        <div></div>
        <div className="case-title">
          请输入<span className="c-red">项目名称</span>确定操作：
        </div>
        <Input
          spellCheck={false}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </ModalWrapper>
    </Modal>
  );
};

export default DisbandTeam;

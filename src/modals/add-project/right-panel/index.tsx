import { Button, Checkbox, Input, theme } from 'antd';
import { RightPanelWrapper } from './style';
import { Project } from '#types/project';
import React from 'react';
import useTeams from '@hooks/useTeams';
import produce from 'immer';

type Props = {
  team_id: string;
  value: Partial<Project & { create_example_datas: 1 | -1 }>;
  onChange: (info: Project) => void;
  onSave: () => void;
};
const RightPanel: React.FC<Props> = (props) => {
  const { team_id, value, onChange, onSave } = props;

  const { token } = theme.useToken();
  const { team_datas } = useTeams();

  const handleChange = (key, newVal) => {
    const result = produce(value, (draft) => {
      draft[key] = newVal;
    }) as Project;
    onChange(result);
  };

  return (
    <RightPanelWrapper token={token} className="right-panel">
      <div className="big-title">新建项目</div>
      <div className="team-title">
        <span className="form-title">所属团队：</span>
        {team_datas?.[team_id]?.team_name ?? ''}
      </div>
      <div className="case-item">
        <Checkbox
          checked={value?.create_example_datas === 1}
          onChange={(e) => {
            handleChange('create_example_datas', e.target.checked ? 1 : -1);
          }}
        >
          生成示例数据
        </Checkbox>
      </div>
      <div className="txt-panel">
        <div className="form-title">项目名称：</div>
        <Input
          className="form-text"
          spellCheck={false}
          placeholder="项目名称"
          value={value?.name ?? ''}
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
        />
      </div>
      <div className="txt-panel">
        <div className="form-title">项目描述：</div>
        <Input.TextArea
          className="form-text description"
          spellCheck={false}
          placeholder="项目描述"
          value={value?.description ?? ''}
          onChange={(e) => {
            handleChange('description', e.target.value);
          }}
        />
      </div>
      <Button className="btn-save" size="large" type="primary" onClick={onSave}>
        新建
      </Button>
    </RightPanelWrapper>
  );
};

export default RightPanel;

import React, { useEffect, useMemo } from 'react';
import { Dropdown, Space, theme } from 'antd';
import SvgEnviroment from '@assets/icons/enviroment.svg?react';
import SvgDown from '@assets/icons/angle-down.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { isUndefined } from 'lodash';
import { EnvIconWrapper, droplistWrapper, envTitleContent, enviromentWrapper } from './style';
import { updateWorkspace } from '@reducers/workspace';
import { EnvironmentItem } from '#types/environment';
import { useSafeState } from 'ahooks';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
  className?: string;
};

export const Enviroment: React.FC<Props> = (props) => {
  const { value, onChange, className } = props;

  const dispatch = useDispatch();

  const { token } = theme.useToken();
  const env_datas = useSelector<any, { [key: string]: EnvironmentItem }>(
    (store) => store?.envs?.env_datas
  );
  const [open, setOpen] = useSafeState(false);

  const envList = useMemo(() => {
    const envDataList = Object.values(env_datas).sort((a: any, b: any) => a?.sort - b?.sort);
    const list: any[] = envDataList.map((item) => ({
      key: item.env_id,
      label: item.name,
      icon: (
        <EnvIconWrapper
          token={token}
          style={{
            color: `${item?.icon?.color}`,
          }}
        >
          {item.icon?.text}
        </EnvIconWrapper>
      ),
    }));
    return list;
  }, [env_datas]);

  const activeEnvId = useMemo(() => {
    if (isUndefined(env_datas?.[value])) {
      return envList?.[0]?.key;
    }
    return value;
  }, [envList, env_datas, value]);

  const handleShowEnvPanel = () => {
    dispatch(
      updateWorkspace({
        current_model_name: 'environment',
        current_model_props: {
          env_id: activeEnvId,
        },
      })
    );
    setOpen(false);
  };

  const handleItemClick = ({ key }) => {
    onChange(key);
    setOpen(false);
  };

  useEffect(() => {
    if (isUndefined(env_datas?.[value])) {
      onChange(envList?.[0]?.key);
    }
  }, [envList, env_datas, value]);

  const dropdownRender = (items) => {
    return (
      <div className={droplistWrapper}>
        <div className="list-panel beautify-scrollbar">{items}</div>
        <div className="split-line"></div>
        <div className="btn-add-new" onClick={handleShowEnvPanel}>
          <SvgEnviroment style={{ width: 14, height: 14 }} />
          <span style={{ paddingLeft: 8 }}>环境管理</span>
        </div>
      </div>
    );
  };

  return (
    <Space.Compact className={className}>
      <Dropdown.Button
        open={open}
        onOpenChange={setOpen}
        icon={<SvgDown />}
        trigger={['click']}
        size="middle"
        menu={{
          className: enviromentWrapper,
          selectedKeys: [activeEnvId],
          onClick: handleItemClick,
          items: envList,
        }}
        dropdownRender={dropdownRender}
      >
        <div className={envTitleContent} onClick={handleShowEnvPanel}>
          <EnvIconWrapper
            token={token}
            style={{
              color: `${env_datas?.[activeEnvId]?.icon?.color}`,
            }}
          >
            {env_datas?.[activeEnvId]?.icon?.text}
          </EnvIconWrapper>
          <span className="span-text">{env_datas?.[activeEnvId]?.name}</span>
        </div>
      </Dropdown.Button>
    </Space.Compact>
  );
};

export default Enviroment;

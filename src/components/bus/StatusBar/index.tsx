import { Button, Popover, theme } from 'antd';
import { StatusBarWrapper } from './style';
import SvgDirectory from '@assets/icons/directory.svg?react';
import SvgVertical from '@assets/icons/vertical.svg?react';
import SvgHorizontal from '@assets/icons/horizontal.svg?react';
import SvgTerminal from '@assets/icons/terminal.svg?react';
import SvgKefu from '@assets/icons/kefu.svg?react';
import SvgSettings from '@assets/icons/settings.svg?react';
import SvgCookies from '@assets/icons/cookies.svg?react';
import { useMemoizedFn } from 'ahooks';
import { emitGlobal } from '@subjects/global';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkspace } from '@reducers/workspace';
import React from 'react';
import produce from 'immer';
import imgWechat from './wechat.jpeg';

type Props = {
  show_terminal?: boolean;
  show_viewmode?: boolean;
};

const StatusBar: React.FC<Props> = (props) => {
  const { show_terminal = true, show_viewmode = true } = props;

  const { token } = theme.useToken();
  const dispatch = useDispatch();
  const baseSettings = useSelector((store: any) => store?.user?.settings?.base);
  const panel_view_mode = useSelector((store: any) => store?.user?.settings?.base?.panel_view_mode);

  const handleSwitchLeftMenu = useMemoizedFn(() => {
    emitGlobal('USER_EVENT/toggleShowLeftPanel', null);
  });

  const handleChangeViewMoe = useMemoizedFn(() => {
    const result = produce(baseSettings, (draft) => {
      draft.panel_view_mode = panel_view_mode === 'vertical' ? 'horizontal' : 'vertical';
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'base',
      value: result,
    });
  });

  const handleShowGlobalModal = useMemoizedFn((model_name) => {
    dispatch(
      updateWorkspace({
        current_model_name: model_name,
      })
    );
  });

  const handleShowTerminal = () => {
    emitGlobal('TERMINAL/toggleShow');
  };

  return (
    <StatusBarWrapper token={token}>
      <div className="status-left">
        <Button
          type="text"
          size="small"
          onClick={handleSwitchLeftMenu}
          icon={<SvgDirectory className="status-icon" />}
        ></Button>
      </div>
      <div className="status-right">
        {show_terminal && (
          <Button
            onClick={handleShowTerminal}
            type="text"
            size="small"
            icon={<SvgTerminal className="status-icon" />}
          >
            控制台
          </Button>
        )}
        {show_viewmode && (
          <Button
            type="text"
            size="small"
            onClick={handleChangeViewMoe}
            icon={
              panel_view_mode === 'vertical' ? (
                <SvgVertical className="status-icon" />
              ) : (
                <SvgHorizontal className="status-icon" />
              )
            }
          >
            {panel_view_mode === 'vertical' ? '上下分屏' : '左右分屏'}
          </Button>
        )}

        <Button
          onClick={handleShowGlobalModal.bind(null, 'cookies')}
          type="text"
          size="small"
          icon={<SvgCookies className="status-icon" />}
        >
          Cookies
        </Button>
        <Popover
          title="扫下方微信二维码添加"
          content={
            <div>
              <img src={imgWechat} style={{ width: 160 }} />
            </div>
          }
        >
          <Button type="text" size="small" icon={<SvgKefu className="status-icon" />}>
            技术支持
          </Button>
        </Popover>

        <Button
          onClick={handleShowGlobalModal.bind(null, 'settings')}
          type="text"
          size="small"
          icon={<SvgSettings className="status-icon" />}
        >
          设置
        </Button>
      </div>
    </StatusBarWrapper>
  );
};

export default StatusBar;

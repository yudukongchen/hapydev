import { Button, theme } from 'antd';
import { TerminalWrapper } from './style';
import React, { useEffect } from 'react';
import { FitAddon } from '@xterm/addon-fit';
import { CanvasAddon } from '@xterm/addon-canvas';
import { useSelector } from 'react-redux';
import { isEmpty, isObject } from 'lodash';
import { getOptions } from './utils';
import SvgClose from '@assets/icons/close.svg?react';
import SvgTerminal from '@assets/icons/terminal.svg?react';
import SvgClear from '@assets/icons/clear.svg?react';
import ResizeObserver from 'rc-resize-observer';
import { useDebounceEffect, useMount, useSafeState, useUnmount } from 'ahooks';
import { emitGlobal } from '@subjects/global';
import { useGlobalSubject } from '@hooks/useSubject';
import { Terminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';

type Props = {
  onClose: () => void;
  className: string;
};

const TerminalPanel: React.FC<Props> = (props) => {
  const { className, onClose } = props;

  const [outerOffset, setOuterOffset] = useSafeState({
    width: null,
    height: null,
  });
  const config = useSelector((store: any) => store?.user?.settings?.base);

  const ref = React.useRef(null);
  const termRef = React.useRef<any>(null);
  const fitAddonRef = React.useRef(null);

  const { token } = theme.useToken();

  useMount(() => {
    if (!isEmpty(termRef.current)) {
      return;
    }
    const term = new Terminal(getOptions(token));
    term.open(ref.current);
    fitAddonRef.current = new FitAddon();
    term.loadAddon(fitAddonRef.current);
    term.loadAddon(new CanvasAddon());
    //term.writeln('Welcome to hapydev Terminal!');
    fitAddonRef.current.fit();
    termRef.current = term;
  });

  useUnmount(() => {
    if (!isEmpty(termRef.current)) {
      termRef.current?.dispose();
    }
  });

  useDebounceEffect(
    () => {
      fitAddonRef.current?.fit();
    },
    [outerOffset],
    {
      wait: 200,
    }
  );

  useDebounceEffect(
    () => {
      if (!isObject(termRef.current?.options?.theme)) {
        return;
      }
      const newTheme = {
        ...termRef.current.options?.theme,
        background: token.colorBgLayout,
        cursor: token.colorPrimary,
        foreground: token.colorText,
        selectionBackground: token.colorFill,
      };
      termRef.current.options.theme = newTheme;
    },
    [config],
    {
      wait: 200,
    }
  );

  const handleCloseTerminal = () => {
    emitGlobal('TERMINAL/close');
  };

  const handleConsoleLog = (text) => {
    termRef.current?.writeln(text);
  };

  const handleConsoleClear = () => {
    termRef.current?.clear();
  };

  useGlobalSubject('TERMINAL/consoleLog', handleConsoleLog, []);

  return (
    <TerminalWrapper className={className} token={token}>
      <div className="title">
        <div className="title-left">
          <SvgTerminal />
          <span>控制台</span>
        </div>
        <div className="title-right">
          <Button onClick={handleConsoleClear} icon={<SvgClear />} size="small" type="text">
            清空
          </Button>
          <Button onClick={handleCloseTerminal} icon={<SvgClose />} size="small" type="text" />
        </div>
      </div>
      <ResizeObserver onResize={setOuterOffset}>
        <div className="terminal-container" ref={ref}></div>
      </ResizeObserver>
    </TerminalWrapper>
  );
};

export default TerminalPanel;

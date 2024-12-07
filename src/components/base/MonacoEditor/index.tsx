import React, { useImperativeHandle, useMemo, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { theme } from 'antd';
import { isArray, isFunction, isNumber, isString, isUndefined } from 'lodash';
import { useMemoizedFn } from 'ahooks';
import { MonacoWrapper } from './style';
import './presets';
import { useSelector } from 'react-redux';
import { GLOBAL_THEMES } from '@constants/colors';

type EditorProps = {
  value: string | Object;
  onChange?: (newVal: string) => void;
  language?: string;
  height?: number | string;
  readOnly?: boolean;
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
  className?: string;
  onBlur?: (ev: any) => void;
  fontSize?: number;
};

const MonacoEditor = (props: EditorProps, refWrapper) => {
  const {
    value,
    onChange,
    language = 'text',
    height = '100%',
    readOnly = false,
    lineNumbers = 'on',
    className,
    onBlur,
    fontSize,
  } = props;

  const refEditor = useRef(null);
  const theme_name = useSelector((store: any) => store?.user?.settings?.base?.program_theme);

  const globalTheme = !isUndefined(GLOBAL_THEMES?.[theme_name])
    ? GLOBAL_THEMES[theme_name]
    : GLOBAL_THEMES.white;

  const { token } = theme.useToken();

  //编辑器主题
  const computedTheme = useMemo(() => {
    return globalTheme?.dark ? 'vs-dark' : 'vs';
  }, [globalTheme]);

  //编辑器字体大小
  const computedFontSize = useMemo(() => {
    if (isNumber(fontSize)) {
      return fontSize;
    }
    return token.fontSize;
  }, [fontSize, token.fontSize]);

  const formatCode = useMemoizedFn(async () => {
    if (language === 'json') {
      if (refEditor.current && isFunction(refEditor.current?.getAction)) {
        await refEditor.current?.getAction('editor.action.formatDocument').run();
        const newValue = refEditor.current.getValue();
        onChange?.(newValue);
      }
    }
  });

  useImperativeHandle(refWrapper, () => ({
    formatCode,
  }));

  const handleEditorDidMount = useMemoizedFn((editor) => {
    refEditor.current = editor;
    //editor.trigger('anyString', 'editor.action.formatDocument'); // 自动格式化代码
    editor.onDidBlurEditorText(function (e) {
      if (isFunction(onBlur)) {
        onBlur(e);
      }
    });
  });
  const editorValue = isString(value) ? value : value?.toString();

  const handleChange = useMemoizedFn((val, changeObj) => {
    if (
      !isArray(changeObj?.changes) ||
      changeObj.changes.length <= 0 ||
      !changeObj.changes[0]?.forceMoveMarkers
    ) {
      if (onChange) {
        onChange(val);
      }
    }
  });

  return (
    <MonacoWrapper
      token={token}
      className={className}
      ref={refWrapper}
      style={{ height, overflow: 'hidden' }}
    >
      <Editor
        height={height}
        language={language}
        value={editorValue}
        onMount={handleEditorDidMount}
        onChange={handleChange}
        theme={computedTheme}
        options={{
          scrollbar: {
            useShadows: false,
            alwaysConsumeMouseWheel: false,
            arrowSize: 0,
          },
          fontSize: computedFontSize,
          hover: {
            enabled: false,
          },
          lineNumbers,
          //onemptied: () => null,
          minimap: { enabled: false },
          readOnly,
          links: false,
          wordWrap: 'on',
          wrappingIndent: 'same',
          automaticLayout: true,
        }}
        className="dark"
      />
    </MonacoWrapper>
  );
};

export default React.memo(React.forwardRef(MonacoEditor));

import { isPlainObject, isString, isUndefined } from 'lodash';
import React, { useMemo } from 'react';
import ReactJson from 'react-json-view';
import { useSelector } from 'react-redux';
import TextViewer from './textView';
import { GLOBAL_THEMES } from '@constants/colors';
import { JsonViewWrapper } from './style';
import { theme } from 'antd';

type Props = {
  value: string;
};

const JsonViewer: React.FC<Props> = (props) => {
  const { value } = props;
  const { token } = theme.useToken();
  const theme_name = useSelector((store: any) => store?.user?.settings?.base?.program_theme);
  const globalTheme = !isUndefined(GLOBAL_THEMES?.[theme_name])
    ? GLOBAL_THEMES[theme_name]
    : GLOBAL_THEMES.white;

  const jsonView = useMemo(() => {
    let ret = {
      isJson: true,
      view: {},
    };

    if (isString(value) && value.length > 0) {
      try {
        const tempObj = JSON.parse(value);
        ret = isPlainObject(tempObj)
          ? {
              isJson: true,
              view: tempObj,
            }
          : { isJson: false, view: value };
      } catch (e) {
        ret = {
          isJson: false,
          view: value,
        };
      }
    }
    if (isPlainObject(value)) {
      ret = {
        isJson: true,
        view: value,
      };
    }
    return ret;
  }, [value]);

  return (
    <>
      {jsonView.isJson && (
        <JsonViewWrapper token={token}>
          <ReactJson
            src={jsonView.view}
            enableClipboard={false}
            name={null}
            theme={globalTheme?.dark ? 'summerfruit' : 'summerfruit:inverted'}
            indentWidth={2}
            style={{ fontSize: '12px', height: 'auto', overflow: 'auto' }}
            displayDataTypes={false}
            collapsed={1}
          />
        </JsonViewWrapper>
      )}
      {!jsonView.isJson && <TextViewer value={jsonView?.view} />}
    </>
  );
};

export default JsonViewer;

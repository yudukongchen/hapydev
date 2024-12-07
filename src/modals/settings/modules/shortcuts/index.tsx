import { Input, Space, Switch, theme } from 'antd';
import { ShortCutsWrapper } from './style';
import { useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { SHORT_CUTS } from './constants';
import { isArray, isString } from 'lodash';
import { SHORTCUTS } from '@constants/shortcuts';
import cn from 'classnames';
import React from 'react';
import produce from 'immer';
import { emitGlobal } from '@subjects/global';

const Shortcuts = () => {
  const { token } = theme.useToken();

  const universal = useSelector((store: any) => store?.user?.settings?.universal);
  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(universal, (draft) => {
      draft[key] = newVal;
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'universal',
      value: result,
    });
  });

  return (
    <ShortCutsWrapper token={token}>
      <div className="case-item">
        <div className="item-name">
          <div>键盘快捷键</div>
        </div>
        <div className="item-values">
          <Switch
            value={universal?.use_shortcuts_key === 1}
            onChange={(checked) => {
              handleChange('use_shortcuts_key', checked ? 1 : -1);
            }}
          />
        </div>
      </div>
      <div
        className={cn('group-items-panel', 'beautify-scrollbar', {
          disable: universal?.use_shortcuts_key !== 1,
        })}
      >
        {SHORT_CUTS.map((gItem, index) => (
          <div key={index} className="group-items">
            <div className="group-title">{gItem.group_title}</div>
            {gItem.items.map((cItem, gIndex) => (
              <div key={gIndex} className="group-item-child">
                <div className="item-title">{cItem.title}</div>
                <div className="item-values">
                  {isArray(cItem.key_values) && (
                    <Space direction="horizontal">
                      {cItem.key_values.map((valItem, vIndex) => (
                        <React.Fragment key={vIndex}>
                          {isArray(valItem) && (
                            <Input value={valItem.join('+')} spellCheck={false} />
                          )}
                          {isString(valItem) && <span>{valItem}</span>}
                        </React.Fragment>
                      ))}
                    </Space>
                  )}
                  {isString(cItem.key_vars) && (
                    <Input value={SHORTCUTS[cItem.key_vars]?.join('+')} spellCheck={false} />
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ShortCutsWrapper>
  );
};
export default Shortcuts;

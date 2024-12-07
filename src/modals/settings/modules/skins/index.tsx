import { SkinsWrapper } from './style';
import cn from 'classnames';
import SvgChecked from '@assets/icons/checked.svg?react';
import { InputNumber, Select, theme } from 'antd';
import { LANGUAGES } from './constants';
import { css } from '@emotion/css';
import { useSelector } from 'react-redux';
import { useMemoizedFn } from 'ahooks';
import { GLOBAL_COLORS, GLOBAL_THEMES } from '@constants/colors';
import { GLOBAL_THEME_ICONS } from './constants';
import { isUndefined } from 'lodash';
import { emitGlobal } from '@subjects/global';
import produce from 'immer';

const Skins = () => {
  const { token } = theme.useToken();

  const base = useSelector((store: any) => store?.user?.settings?.base);

  const handleChangeConfig = useMemoizedFn((key, newVal) => {
    const result = produce(base, (draft) => {
      draft[key] = newVal;
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'base',
      value: result,
    });
  });

  const getThemeSvg = (name) => {
    const Element = GLOBAL_THEME_ICONS?.[name];
    if (isUndefined(Element)) {
      return null;
    }
    return <Element className="svg-item" />;
  };

  return (
    <SkinsWrapper token={token}>
      <div className="case-item">
        <div className="item-name">背景</div>
        <div className="item-values">
          <div className="theme-panel">
            {Object.entries(GLOBAL_THEMES).map(([key, item]: [string, any]) => (
              <div
                key={key}
                className={cn('theme-item', {
                  active: key === base?.program_theme,
                })}
                onClick={handleChangeConfig.bind(null, 'program_theme', key)}
              >
                {getThemeSvg(key)}
                {/* <item.icon className="svg-item" /> */}
                {key === base?.program_theme && <SvgChecked className="svg-selected" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">主题颜色</div>
        <div className="item-values">
          <div className="colors-panel">
            {Object.entries(GLOBAL_COLORS).map(([name, color]) => (
              <div
                key={name}
                onClick={handleChangeConfig.bind(null, 'text_color', name)}
                className={cn('color-item', {
                  active: name === base?.text_color,
                })}
                style={{ backgroundColor: color }}
              >
                {name === base?.text_color && <SvgChecked className="svg-selected" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">缩放比例</div>
        <div className="item-values">
          <InputNumber
            value={base?.zoom_factor}
            style={{ width: 100 }}
            addonAfter="%"
            min={80}
            max={150}
            step={10}
            onChange={handleChangeConfig.bind(null, 'zoom_factor')}
          />
        </div>
      </div>
      <div className="case-item">
        <div className="item-name">软件语言</div>
        <div className="item-values">
          <Select
            options={LANGUAGES}
            value={base?.language}
            onChange={handleChangeConfig.bind(null, 'language')}
            placement="bottomRight"
            variant="borderless"
            popupClassName={css({
              width: '100px !important',
            })}
          ></Select>
        </div>
      </div>
    </SkinsWrapper>
  );
};
export default Skins;

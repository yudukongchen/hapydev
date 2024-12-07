import { GLOBAL_COLORS, GLOBAL_THEMES } from '@constants/colors';
import { ThemeConfig, theme } from 'antd';
import { isUndefined } from 'lodash';

export const getGlobalTheme = (text_color, theme_name = 'white') => {
  //默认蓝色主题
  const globalColor = !isUndefined(GLOBAL_COLORS?.[text_color])
    ? GLOBAL_COLORS[text_color]
    : GLOBAL_COLORS.blue;

  //默认白色主题
  const globalTheme = !isUndefined(GLOBAL_THEMES?.[theme_name])
    ? GLOBAL_THEMES[theme_name]
    : GLOBAL_THEMES.white;

  const colorText = globalTheme.dark ? '#ffffffa6' : '#000000a6';

  const result: ThemeConfig = {
    cssVar: true,
    inherit: false,
    hashed: false,
    token: {
      colorPrimary: globalColor,
      colorBgBase: globalTheme.color,
      // fontSize: 12,
      controlOutlineWidth: 0,
      colorText: colorText,
    },

    algorithm: globalTheme.dark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm],
    components: {
      Button: {
        colorLink: globalColor,
        colorLinkHover: globalColor,
      },
      Tabs: {
        paddingLG: 6,
      },
      Select: {
        optionSelectedBg: 'var(--ant-color-fill-secondary)',
      },
    },
  };

  return result;
};

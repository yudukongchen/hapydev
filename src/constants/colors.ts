import React from 'react';

export const GLOBAL_COLORS = {
  blue: '#0099ff',
  purple: '#9373ee',
  brown: '#9a7d56',
  lakeblue: '#00c3ee',
  green: '#039e74',
  orange: '#fa7600',
  pink: '#e86ca4',
  red: '#fd6874',
  lightbrown: '#8e8374',
};

export type ThemeItem = {
  dark: boolean;
  title: string;
  color: string;
  // icon: React.ReactElement;
};

export const GLOBAL_THEMES: { [key: string]: ThemeItem } = {
  white: {
    dark: false,
    title: '日间模式',
    color: '#ffffff',
  },
  lightyellow: {
    dark: false,
    title: '护眼模式',
    color: '#f9f4e7',
  },
  dark: {
    dark: true,
    title: '夜间模式',
    color: '#282828',
  },
  darkgray: {
    dark: true,
    title: '深灰模式',
    color: '#1e2029',
  },
  darkblue: {
    dark: true,
    title: '深蓝模式',
    color: '#1f2438',
  },
};

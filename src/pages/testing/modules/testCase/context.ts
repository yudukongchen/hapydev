import { createContext, useContextSelector } from '@fluentui/react-context-selector';

export const context = createContext(null);

export const selectContext = (selector) => useContextSelector(context, selector);

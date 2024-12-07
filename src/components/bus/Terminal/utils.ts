export const getOptions = (token) => {
  const result = {
    allowProposedApi: true,
    rendererType: 'canvas',
    disableStdin: true,
    cursorBlink: false,
    //cols: 60,
    fontSize: 12,
    fontFamily: "Menlo, Monaco, 'Courier New', monospace",
    FontWeight: 'normal',
    theme: {
      background: token.colorBgLayout,
      cursor: token.colorPrimary,
      foreground: token.colorText,
      selectionBackground: token.colorFill,
      // selectionForeground: '#000000',
    },
  };
  return result;
};

export const getConetntSize = (size) => {
  size = Number(size);
  let str = '';
  if (size < 1024) {
    str = `${size.toFixed(2)}kb`;
  } else if (size < 1024 * 1024) {
    str = `${(size / 1024).toFixed(2)}mb`;
  }
  return str;
};

export const getStatusTime = (time: any) => {
  time = Number(time);
  let str = '';
  if (time < 1000) {
    str = `${time.toFixed(2)}ms`;
  } else if (time < 1000 * 60) {
    str = `${(time / 1000).toFixed(2)}s`;
  } else if (time < 1000 * 60 * 60) {
    str = `${(time / (1000 * 60)).toFixed(2)}m`;
  } else if (time < 1000 * 60 * 60 * 24) {
    str = `${(time / (1000 * 60 * 60)).toFixed(2)}h`;
  }
  return str;
};

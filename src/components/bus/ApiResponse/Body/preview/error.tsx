import { errWrapper } from './style';
export const ErrorPanel = (props) => {
  const { message } = props;
  return <div className={errWrapper}>{message}</div>;
};

export default ErrorPanel;

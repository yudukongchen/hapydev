import { theme } from 'antd';
import { TextViewerWrapper } from './style';

const TextViewer = (props) => {
  const { value } = props;
  const { token } = theme.useToken();

  return (
    <TextViewerWrapper token={token}>
      <pre>{value}</pre>
    </TextViewerWrapper>
  );
};

export default TextViewer;

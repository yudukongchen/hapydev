import { theme } from 'antd';
import { RootNodeWrapper } from './style';
import { isUndefined } from 'lodash';

const RootNode = (props) => {
  const { nodeTitle, indent, actions, ...restProps } = props;
  const { token } = theme.useToken();
  return (
    <RootNodeWrapper token={token} {...restProps}>
      <div>{nodeTitle}</div>
      {indent}
      {!isUndefined(actions) && <div className="more-actions">{actions}</div>}
    </RootNodeWrapper>
  );
};

export default RootNode;

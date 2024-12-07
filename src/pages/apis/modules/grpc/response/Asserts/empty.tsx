import { Button } from 'antd';
import { EmptyWrapper } from './style';

const Empty = (props) => {
  const { token } = props;
  return (
    <EmptyWrapper token={token}>
      <div className="waring-text">没有针对该请求设置测试用例，编写一个测试脚本以自动调试。</div>
      <Button className="btn-go-write" type="text" size="small">
        点此了解更多
      </Button>
    </EmptyWrapper>
  );
};

export default Empty;

import { Flex, Progress, Typography, theme } from 'antd';
import { ChartsWrapper } from './style';

type Props = {
  succesApiPercent: number;
  failedApiPercent: number;
  successAssertPercent: number;
  failedAssertPercent: number;
};
const ChartPanel: React.FC<Props> = (props) => {
  const { succesApiPercent, failedApiPercent, successAssertPercent, failedAssertPercent } = props;

  const { token } = theme.useToken();

  return (
    <ChartsWrapper token={token}>
      <Flex align="center" gap={40}>
        <Progress
          size={100}
          format={() => <span className="char-title">接口</span>}
          strokeColor="#46d6a0"
          trailColor="#fa97af"
          type="circle"
          percent={succesApiPercent ?? 0}
        />
        <Flex vertical gap={12}>
          <Flex align="center" gap={32}>
            <Flex gap={12} align="center">
              <div className="dot"></div>
              <Typography.Text>接口通过率</Typography.Text>
            </Flex>
            <Typography.Text strong>{succesApiPercent.toFixed(2)}%</Typography.Text>
          </Flex>
          <Flex align="center" gap={32}>
            <Flex gap={12} align="center">
              <div className="dot error"></div>
              <Typography.Text>接口失败率</Typography.Text>
            </Flex>
            <Typography.Text strong>{failedApiPercent.toFixed(2)}%</Typography.Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex align="center" gap={40}>
        <Progress
          size={100}
          format={() => <span className="char-title">断言</span>}
          strokeColor="#46d6a0"
          trailColor="#fa97af"
          type="circle"
          percent={successAssertPercent}
        />
        <Flex vertical gap={12}>
          <Flex align="center" gap={32}>
            <Flex gap={12} align="center">
              <div className="dot"></div>
              <Typography.Text>断言通过率</Typography.Text>
            </Flex>
            <Typography.Text strong>{successAssertPercent?.toFixed(2)}%</Typography.Text>
          </Flex>
          <Flex align="center" gap={32}>
            <Flex gap={12} align="center">
              <div className="dot error"></div>
              <Typography.Text>断言失败率</Typography.Text>
            </Flex>
            <Typography.Text strong>{failedAssertPercent?.toFixed(2)}%</Typography.Text>
          </Flex>
        </Flex>
      </Flex>
    </ChartsWrapper>
  );
};

export default ChartPanel;

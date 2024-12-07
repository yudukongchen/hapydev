import { Alert, Form, Input } from 'antd';

const Qywx = () => {
  return (
    <>
      <Form.Item
        name={['config', 'url']}
        label="服务URL"
        rules={[{ required: true, message: '服务URL必填' }]}
      >
        <Input placeholder="在群机器人设置中获取 Webhook URL" spellCheck={false} />
      </Form.Item>
      <Alert
        type="info"
        showIcon={false}
        message="支持发送服务事件到企业微信群聊机器人，开启群聊机器人后配置 Webhook
        URL，即可推送通知到企业微信群"
        banner
      />
    </>
  );
};

export default Qywx;

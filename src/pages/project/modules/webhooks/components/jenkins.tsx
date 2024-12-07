import { Alert, Form, Input } from 'antd';

const Jenkins = () => {
  return (
    <>
      <Form.Item
        name={['config', 'url']}
        label="服务URL"
        rules={[{ required: true, message: '服务URL必填' }]}
      >
        <Input
          placeholder="在 Jenkins Generic Webhook Trigger 插件中获取 Webhook URL"
          spellCheck={false}
        />
      </Form.Item>
      <Form.Item name={['config', 'token']} label="签名令牌">
        <Input placeholder="发送时使用签名令牌和请求 Body 生成签名" spellCheck={false} />
      </Form.Item>
      <Alert
        type="info"
        showIcon={false}
        message="支持发送服务事件到 Jenkins 服务，配置 Webhook URL，即可推送通知到 Jenkins。"
        banner
      />
    </>
  );
};

export default Jenkins;

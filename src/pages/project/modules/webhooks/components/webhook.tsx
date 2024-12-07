import { Alert, Form, Input } from 'antd';

const Webhook = () => {
  return (
    <>
      <Form.Item
        name={['config', 'url']}
        label="服务URL"
        rules={[{ required: true, message: '服务 URL不能为空' }]}
      >
        <Input placeholder="请输入 HTTP Server 接收请求的 URL" spellCheck={false} />
      </Form.Item>
      <Form.Item name={['config', 'secret_key']} label="加签密钥">
        <Input spellCheck={false} />
      </Form.Item>
      <Alert
        type="info"
        showIcon={false}
        message="支持发送服务事件到 HTTP 服务器，配置指定 URL 地址接收 POST 请求，即可推送通知到 HTTP 服务器。"
        banner
      />
    </>
  );
};

export default Webhook;

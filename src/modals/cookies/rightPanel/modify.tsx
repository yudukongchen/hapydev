import { Cookie } from '#types/cookie';
import {
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Switch,
  message,
} from 'antd';
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { isEmpty, isObject, isString, isUndefined } from 'lodash';

type Props = {
  onCancel: () => void;
  onSave: (newData: Cookie) => void;
  defaultValue: Cookie;
};

const ModifyForm: React.FC<Props> = (props) => {
  const { defaultValue, onSave, onCancel } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (!isObject(defaultValue)) {
      return;
    }
    form.setFieldsValue({
      ...defaultValue,
      expires: isString(defaultValue?.expires)
        ? dayjs(defaultValue?.expires, 'YYYY-MM-DD HH:mm:ss')
        : null,
    });
  }, [defaultValue]);

  const handleSave = () => {
    const data = form.getFieldsValue();
    if (isEmpty(data?.domain)) {
      message.error('domain不能为空');
      return;
    }
    if (isEmpty(data?.name)) {
      message.error('cookie名称不能为空');
      return;
    }
    if (data?.expires?.isValid()) {
      data.expires = dayjs(data.expires).format('YYYY-MM-DD HH:mm:ss');
    } else {
      data.expires = null;
    }
    onSave(data);
  };

  return (
    <Modal destroyOnClose width={600} open title="修改Cookie" onCancel={onCancel} onOk={handleSave}>
      <Form layout="horizontal" form={form} labelCol={{ span: 8 }}>
        <Row>
          <Col span={12}>
            <Form.Item label="域名" name="domain">
              <Input spellCheck={false} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Cookie名称" name="name">
              <Input spellCheck={false} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Cookie值" name="value">
              <Input spellCheck={false} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Path" name="path">
              <Input spellCheck={false} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="Expires" name="expires">
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="MaxAge" name="maxAge">
              <InputNumber defaultValue={0} spellCheck={false} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="HttpOnly" name="httpOnly">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Secure" name="secure">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item labelCol={{ span: 4 }} label="SameSite" name="sameSite">
              <Radio.Group options={['Strict', 'Lax', 'None']} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
export default ModifyForm;

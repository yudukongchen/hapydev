import React from 'react';
import { openUrl } from '@utils/utils';
import { Button, theme } from 'antd';
import { SendErrorWrapper } from './style';
import SvgClose from '@assets/icons/close.svg?react';

interface ResponseErrorProps {
  errorMessage: string;
  onClose: () => void;
}

const ResponseError: React.FC<ResponseErrorProps> = (props) => {
  const { errorMessage, onClose } = props;

  const { token } = theme.useToken();

  // 代理错误
  const isProxyError = (message) => {
    return /connect ECONNREFUSED/.test(message);
  };

  return (
    <SendErrorWrapper token={token}>
      <Button
        type="text"
        size="small"
        icon={<SvgClose />}
        className="btn-close-error"
        onClick={onClose}
      />
      <div className="container">
        无法访问以下内容
        <p className="error_str">{errorMessage}</p>
        {isProxyError(errorMessage) && (
          <p className="error_str proxy-error">检测您的系统代理貌似开小差了，请检查代理设置。</p>
        )}
        <p className="err_desc_go_index">
          去&nbsp;
          <span onClick={() => openUrl('https://www.hapydev.com/')}>https://www.hapydev.com/</span>
          &nbsp;官网，了解更多信息或寻求帮助
        </p>
      </div>
    </SendErrorWrapper>
  );
};

export default ResponseError;

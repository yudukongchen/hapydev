import { isEmpty, isUndefined } from 'lodash';
import { useMemo } from 'react';
import { Buffer } from 'buffer/';
import cn from 'classnames';
import PdfView from '@components/bus/PdfViewer';
import { Empty } from 'antd';

const BodyPanel = (props) => {
  const { response } = props;

  const rawBody = useMemo(() => {
    if (isUndefined(response?.stream)) {
      return '';
    }
    const buffer = Buffer.from(response?.stream);
    return buffer.toString();
  }, [response]);

  const base64Body = useMemo(() => {
    if (isUndefined(response?.stream)) {
      return '';
    }
    const buffer = Buffer.from(response?.stream);
    return `data:${response?.mime?.mime};base64,` + buffer.toString('base64');
  }, [response]);

  const computedMode = useMemo(() => {
    if (['json', 'xml', 'html', 'text', 'plain'].includes(response?.mime?.ext)) {
      return 'html';
    }
    if (['png', 'gif', 'jpg', 'jpeg', 'bmp'].includes(response?.mime?.ext)) {
      return 'image';
    }
    if (['pdf'].includes(response?.mime?.ext)) {
      return 'pdf';
    }
    return 'unkonw';
  }, [response]);

  if (isEmpty(response)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ marginTop: 30 }} />;
  }

  if (response?.contentSize > 1024 * 20) {
    return <div>文件过大，暂不支持查看</div>;
  }

  return (
    <>
      {computedMode === 'html' && <div>{rawBody}</div>}
      {computedMode === 'image' && (
        <div>
          <img src={base64Body} style={{ maxWidth: '100%' }} />
        </div>
      )}
      {computedMode === 'pdf' && (
        <div className={cn('beautify-scrollbar')}>
          <PdfView file={base64Body} />
        </div>
      )}
      {computedMode === 'unkonw' && <div>非图片和文本格式,暂时不支持预览</div>}
    </>
  );
};

export default BodyPanel;

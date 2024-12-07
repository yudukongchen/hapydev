import React, { useMemo, useState } from 'react';
import cn from 'classnames';
import PdfView from '@components/bus/PdfViewer';
import { PreviewWrapper, pdfWrapper } from './style';
import ErrorPanel from './error';
import { isEmpty, isUndefined } from 'lodash';
import { Buffer } from 'buffer/';
import { Empty } from 'antd';

interface PreviewProps {
  response: any;
  rawBody: string;
}

const Preview: React.FC<PreviewProps> = (props) => {
  const { response, rawBody } = props;

  const base64Body = useMemo(() => {
    if (isUndefined(response?.stream)) {
      return '';
    }
    const buffer = Buffer.from(response?.stream);
    return `data:${response?.mime?.mime};base64,` + buffer.toString('base64');
  }, [response]);

  const getIframeContent = (bodyHtml: string) => {
    const bgcolor = 'white';
    let frame_style = `<style>
      body{
        background:${bgcolor};
      }
    </style>`;
    return `${frame_style}${bodyHtml}`;
  };

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
    return <ErrorPanel message="文件过大，请下载到本地进行查看" />;
  }
  return (
    <PreviewWrapper>
      {computedMode === 'html' && (
        <div
          style={{ width: '100%', height: '100%', position: 'relative' }}
          onFocus={() => 0}
          onBlur={() => 0}
        >
          <iframe
            sandbox=""
            srcDoc={getIframeContent(rawBody)}
            title=""
            width="100%"
            z-index="100"
            height="100%"
          ></iframe>
        </div>
      )}
      {computedMode === 'image' && (
        <div style={{ width: '100%' }}>
          <img src={base64Body} style={{ maxWidth: '100%' }} />
        </div>
      )}
      {computedMode === 'pdf' && (
        <div className={cn(pdfWrapper, 'beautify-scrollbar')}>
          <PdfView file={base64Body} />
        </div>
      )}
      {computedMode === 'unkonw' && <ErrorPanel message="非图片和文本格式,暂时不支持预览" />}
    </PreviewWrapper>
  );
};

export default Preview;

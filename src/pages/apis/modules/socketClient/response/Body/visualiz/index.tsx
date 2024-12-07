import React, { useEffect, useRef } from 'react';
import { isEmpty, isString } from 'lodash';
import { openUrl } from '@utils/utils';
import { VisualizWrapper } from './style';
import SvgQuesstion from '@assets/icons/question-circle.svg?react';
import SvgRight from '@assets/icons/angle-right.svg?react';
import { Button, theme } from 'antd';
import visualizText from './visualiz.css?inline';

//console.log(visualizText, '==visualizText');

type Props = {
  html: string;
};
const Visualiz: React.FC<Props> = (props) => {
  const visualizingRef = useRef(null);
  const { html } = props;

  const { token } = theme.useToken();

  useEffect(() => {
    if (isString(html)) {
      visualizingRef.current.contentDocument.body.innerHTML = `
      <style>${visualizText}</style>
      <div class="markdown-section">${html}</div>`;
    }
  }, [visualizingRef, html]);

  return (
    <VisualizWrapper token={token}>
      {isString(html) && !isEmpty(html) ? (
        <iframe
          title="可视化"
          ref={visualizingRef}
          width="100%"
          style={{ border: 0, height: '100%' }}
        />
      ) : (
        <div className="empty-content">
          <p>欢迎使用可视化功能，使用前请先阅读说明</p>
          <p>
            <Button
              className="btn-help"
              type="text"
              size="small"
              onClick={() => openUrl('https://doc.hapydev.com/visualiz')}
              icon={<SvgQuesstion />}
            >
              什么是可视化? <SvgRight />
            </Button>
          </p>
        </div>
      )}
    </VisualizWrapper>
  );
};
export default Visualiz;

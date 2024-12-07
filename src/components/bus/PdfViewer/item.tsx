import { useRef, useEffect } from 'react';

const MyPdfViewer = (props) => {
  const { pdfDocument, page } = props;
  const canvasRef = useRef(null);

  const drawPDF = (page2) => {
    const viewport = page2.getViewport({ scale: 1, rotation: 0 });
    const canvasEl = canvasRef.current;
    if (!canvasEl) {
      return;
    }
    const canvasContext = canvasEl.getContext('2d');
    if (!canvasContext) {
      return;
    }
    canvasEl.height = viewport.height * window.devicePixelRatio;
    canvasEl.width = viewport.width * window.devicePixelRatio;
    canvasContext.scale(window.devicePixelRatio, window.devicePixelRatio);
    page2.render({
      canvasContext,
      viewport,
    });
  };

  useEffect(() => {
    pdfDocument.getPage(page).then((loadedPdfPage) => {
      drawPDF(loadedPdfPage);
    });
  }, [page]);
  return <canvas ref={canvasRef} />;
};

export default MyPdfViewer;

import React, { Suspense, useEffect } from 'react';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.mjs';
import { useSafeState } from 'ahooks';
import { isNumber } from 'lodash';

import Lazyloading from '../LazyLoading';

const PdfItem = React.lazy(() => import('./item'));

const PdfView: React.FC<any> = (props) => {
  const { file } = props;
  const [pdfDocument, setPdfDocument] = useSafeState(null);
  const [loading, setLoading] = useSafeState(true);

  useEffect(() => {
    pdfjs
      .getDocument({ url: file, withCredentials: false })
      .promise.then((data) => {
        setPdfDocument(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [file]);

  if (loading) {
    return <Lazyloading />;
  }
  if (!isNumber(pdfDocument?.numPages)) {
    return <div>解析失败</div>;
  }
  return (
    <Suspense fallback={<Lazyloading />}>
      {new Array(pdfDocument?.numPages).fill('').map((data, index) => (
        <PdfItem key={index} pdfDocument={pdfDocument} page={index + 1} />
      ))}
    </Suspense>
  );
};

export default PdfView;

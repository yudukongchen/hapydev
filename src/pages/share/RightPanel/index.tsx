import { theme } from 'antd';
import { RightPanelWrapper } from './style';
import StatusBar from '@components/bus/StatusBar';
import { MODULES } from '../constants';
import React, { Suspense } from 'react';
import Lazyloading from '@components/bus/LazyLoading';
import { isUndefined } from 'lodash';

type Props = {
  module: string;
};
const RightPanel: React.FC<Props> = (props) => {
  const { token } = theme.useToken();
  const { module } = props;

  const renderElement = () => {
    const Element = MODULES?.[module];
    if (isUndefined(Element)) {
      return null;
    }
    return <Element />;
  };

  return (
    <RightPanelWrapper token={token}>
      <div className="right-container">
        <Suspense fallback={<Lazyloading />}>{renderElement()}</Suspense>
      </div>
      <StatusBar show_terminal={false} show_viewmode={false} />
    </RightPanelWrapper>
  );
};

export default RightPanel;

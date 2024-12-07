import { theme } from 'antd';
import { RightPanelWrapper } from './style';
import StatusBar from '@components/bus/StatusBar';
import { MODULES } from '../constants';
import React, { Suspense } from 'react';
import Lazyloading from '@components/bus/LazyLoading';
import { useSelector } from 'react-redux';
import { isUndefined } from 'lodash';

type Props = {
  page: string;
};
const RightPanel: React.FC<Props> = (props) => {
  const { page } = props;
  const { token } = theme.useToken();
  const current_project_id = useSelector((store: any) => store?.workspace?.current_project_id);

  const renderElement = () => {
    const Element = MODULES?.[page];
    if (isUndefined(Element)) {
      return null;
    }
    return <Element project_id={current_project_id} />;
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

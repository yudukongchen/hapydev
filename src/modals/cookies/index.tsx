import { Button, Switch, theme } from 'antd';
import { CookiesWrapper } from './style';
import { Panel, PanelGroup } from 'react-resizable-panels';
import { useMount, useSafeState } from 'ahooks';
import ResizeBar from '@components/bus/ResizeBar';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Cookie } from '#types/cookie';
import Domains from './domains';
import RightPanel from './rightPanel';
import { cloneDeep, isNull } from 'lodash';

const Cookies = () => {
  const { token } = theme.useToken();

  const cookiesList = useSelector<any, Cookie[]>((store) => store?.cookies?.list);
  const is_used = useSelector<any, 1 | -1>((store) => store?.cookies?.is_used);
  const [activeName, setActiveName] = useSafeState(null);

  const computedDomainList = useMemo(() => {
    const result = {};
    cookiesList.forEach((item: Cookie) => {
      result[item.domain] = true;
    });
    return Object.keys(result);
  }, [cookiesList]);

  const computedCookieList = useMemo(() => {
    const clonedCookieList = cloneDeep(cookiesList).map((item, index) => ({ ...item, index }));
    return clonedCookieList.filter((item) => item.domain === activeName);
  }, [cookiesList, activeName]);

  useEffect(() => {
    if (isNull(activeName) && computedDomainList?.length > 0) {
      setActiveName(computedDomainList[0]);
    }
  }, [computedDomainList, activeName]);

  return (
    <CookiesWrapper token={token}>
      <PanelGroup direction="horizontal">
        <Panel minSize={10} maxSize={50} collapsible defaultSize={20}>
          <Domains
            list={computedDomainList}
            activeName={activeName}
            onActiveChange={setActiveName}
          />
        </Panel>
        <ResizeBar direction="horizontal" />
        <Panel>
          <RightPanel
            onActiveChange={setActiveName}
            is_used={is_used}
            cookiesList={computedCookieList}
          />
        </Panel>
      </PanelGroup>
    </CookiesWrapper>
  );
};

export default Cookies;

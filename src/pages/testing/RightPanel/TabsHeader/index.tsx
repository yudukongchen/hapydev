import React from 'react';
import { TabsHeaderWrapper } from './style';
import { theme } from 'antd';
import ItemList from './itemList';
import AddItem from './addItem';

type Props = {
  tabsList: string[];
  activeId: string;
  isReadOnly: Boolean;
};

const TabsHeader: React.FC<Props> = (props) => {
  const { tabsList, activeId, isReadOnly } = props;
  const { token } = theme.useToken();

  return (
    <TabsHeaderWrapper token={token}>
      <ItemList tabsList={tabsList} activeId={activeId} />
      <AddItem tabsList={tabsList} activeId={activeId} />
    </TabsHeaderWrapper>
  );
};

export default TabsHeader;

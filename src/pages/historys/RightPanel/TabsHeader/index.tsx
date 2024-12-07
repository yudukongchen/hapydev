import React from 'react';
import { TabsHeaderWrapper } from './style';
import { theme } from 'antd';
import ItemList from './itemList';
import AddItem from './addItem';
import SlotItem from './slotItem';

type Props = {
  opensData: any;
  tabsList: string[];
  activeId: string;
  isReadOnly: boolean;
};

const TabsHeader: React.FC<Props> = (props) => {
  const { opensData, tabsList, activeId, isReadOnly } = props;
  const { token } = theme.useToken();

  return (
    <TabsHeaderWrapper token={token}>
      <ItemList tabsList={tabsList} opensData={opensData} activeId={activeId} />
      <AddItem />
      <SlotItem />
    </TabsHeaderWrapper>
  );
};

export default TabsHeader;

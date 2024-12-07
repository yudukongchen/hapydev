import ItemName from "./columns/itemName";
import ItemValue from "./columns/itemValue";
import ItemDescription from "./columns/itemDescription";

export const TABLE_COLUMNS = [
  {
    title: "参数名",
    dataIndex: "name",
    enableResize: true,
    width: 0.3,
    element: ItemName,
  },
  {
    title: "参数值",
    dataIndex: "value",
    enableResize: true,
    width: 0.3,
    element: ItemValue,
  },
  {
    title: "参数描述",
    align: "left",
    dataIndex: "description",
    element: ItemDescription,
  },
];

import ItemLabel from "./columns/label";
import ItemUsed from "./columns/itemUsed";

export const TABLE_COLUMNS = [
  {
    title: "",
    dataIndex: "is_used",
    width: 30,
    element: ItemUsed,
  },
  {
    title: "参数名",
    dataIndex: "name",
    enableResize: true,
    width: 0.3,
    element: ItemLabel,
  },
  {
    title: "参数值",
    dataIndex: "value",
    element: ItemLabel,
  },
];

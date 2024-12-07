export interface AuthProps {
  value: any; // 整个认证对象
  type: string;
  handleAttrChange: (authType: string, attr: string, attrValue: string) => void;
  onModal?: boolean;
}

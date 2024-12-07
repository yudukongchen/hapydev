import SvgResponseTemplate from '@assets/icons/response-template.svg?react';

const renderTemplateDefault = (value) => {
  return (
    <>
      <span className="item-icon">
        <SvgResponseTemplate />
      </span>
      默认响应模版
    </>
  );
};

export default renderTemplateDefault;

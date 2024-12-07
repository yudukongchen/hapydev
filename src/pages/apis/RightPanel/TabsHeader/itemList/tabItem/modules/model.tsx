import SvgModel from '@assets/icons/model.svg?react';

const renderModel = (value) => {
  return (
    <>
      <span className="item-icon">
        <SvgModel />
      </span>
      {value.name}
    </>
  );
};

export default renderModel;

import SvgProjectInfo from '@assets/icons/project-info.svg?react';

const renderProjectInfo = (value) => {
  return (
    <>
      <span className="item-icon">
        <SvgProjectInfo />
      </span>
      项目概览
    </>
  );
};

export default renderProjectInfo;

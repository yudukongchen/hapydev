import { PlanningWrapper } from './style';
import SvgPlanning from './planning.svg?react';

const Planning = () => {
  return (
    <PlanningWrapper>
      <SvgPlanning />
      <div className="description">正在规划中</div>
    </PlanningWrapper>
  );
};

export default Planning;

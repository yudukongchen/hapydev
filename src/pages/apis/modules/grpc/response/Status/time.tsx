import React from 'react';
import { timeWrapper } from './style';
import { isNumber, isString } from 'lodash';
import { getStatusTime } from './utils';
type Props = {
  response: any;
};

const Time: React.FC<Props> = (props) => {
  const { response } = props;

  console.log(response, '==response====');

  const timingPhases = response?.timingPhases;

  return (
    <div className={timeWrapper}>
      {isString(response?.responseAt) && (
        <div className="time-item">
          <span className="case-name">响应时间:</span>
          <span>{response?.responseAt}</span>
        </div>
      )}
      {isNumber(timingPhases?.wait) && (
        <div className="time-item">
          <span className="case-name">wait:</span>
          <span>{getStatusTime(timingPhases.wait)}</span>
        </div>
      )}
      {isNumber(timingPhases?.dns) && (
        <div className="time-item">
          <span className="case-name">dns:</span>
          <span>{getStatusTime(timingPhases.dns)}</span>
        </div>
      )}
      {isNumber(timingPhases?.tcp) && (
        <div className="time-item">
          <span className="case-name">tcp:</span>
          <span>{getStatusTime(timingPhases.tcp)}</span>
        </div>
      )}
      {isNumber(timingPhases?.firstByte) && (
        <div className="time-item">
          <span className="case-name">firstByte:</span>
          <span>{getStatusTime(timingPhases.firstByte)}</span>
        </div>
      )}
      {isNumber(timingPhases?.download) && (
        <div className="time-item">
          <span className="case-name">download:</span>
          <span>{getStatusTime(timingPhases.download)}</span>
        </div>
      )}
      {isNumber(timingPhases?.total) && (
        <div className="time-item">
          <span className="case-name">总耗时:</span>
          <span>{getStatusTime(timingPhases.total)}</span>
        </div>
      )}
    </div>
  );
};

export default Time;
/*

{
    "wait": 0.7660830020904541,
    "dns": 15.16554194688797,
    "tcp": 33.506666004657745,
    "firstByte": 74.55508399009705,
    "download": 39.8722910284996,
    "total": 163.86566597223282
}

*/

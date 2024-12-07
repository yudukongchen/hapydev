import { isArray } from 'lodash';
import { useMemo } from 'react';

const useTempInfo = (tempData) => {
  const apiList = useMemo(() => {
    const result = [];
    tempData?.results.forEach((item) => {
      if (item.type === 'api') {
        result.push({
          name: item?.result?.name,
          method: item?.result?.response?.request?.method ?? 'GET',
          data: item?.result,
        });
      }
    });
    return result;
  }, [tempData?.results]);

  const compiledDatas = useMemo(() => {
    const successApiList = [];
    const failedApiList = [];

    apiList.forEach((item) => {
      if (
        item?.data?.asserts?.every((item) => item.result === true) &&
        item?.data?.response?.statusCode >= 200 &&
        item?.data?.response?.statusCode < 300 &&
        item.data?.error === null
      ) {
        successApiList.push(item);
      } else {
        failedApiList.push(item);
      }
    });
    return {
      successApiList,
      failedApiList,
    };
  }, [apiList]);

  const assertsList = useMemo(() => {
    const result = [];
    tempData?.results.forEach((item) => {
      if (item.type === 'api' && isArray(item.result.asserts)) {
        item.result.asserts.forEach((item) => {
          result.push(item);
        });
      }
    });

    return result;
  }, [tempData?.results]);

  //总响应时间/平均响应时间
  const response_time = useMemo(() => {
    let total_time = 0;
    compiledDatas?.successApiList.forEach((item) => {
      total_time = total_time + item?.data?.response?.timingPhases?.total;
    });
    return {
      total_time,
      avg_time: total_time / compiledDatas?.successApiList.length,
    };
  }, [compiledDatas?.successApiList]);

  //总响应数据大小
  const total_size = useMemo(() => {
    let size = 0;
    compiledDatas?.successApiList.forEach((item) => {
      size = size + item?.data?.response?.contentSize;
    });
    return size;
  }, [compiledDatas?.successApiList]);

  const successAssertList = useMemo(() => {
    const result = [];
    assertsList.forEach((item) => {
      if (item.result === true) {
        result.push(item);
      }
    });
    return result;
  }, [assertsList]);

  const failedAssertList = useMemo(() => {
    const result = [];
    assertsList.forEach((item) => {
      if (item.result !== true) {
        result.push(item);
      }
    });
    return result;
  }, []);

  return {
    apiList,
    successApiList: compiledDatas?.successApiList,
    failedApiList: compiledDatas?.failedApiList,
    succesApiPercent:
      apiList.length > 0 ? (compiledDatas?.successApiList.length * 100) / apiList.length : 0,
    failedApiPercent:
      apiList.length > 0 ? (compiledDatas?.failedApiList.length * 100) / apiList.length : 0,
    assertsList,
    successAssertList,
    failedAssertList,
    successAssertPercent:
      assertsList.length > 0 ? (successAssertList.length * 100) / assertsList.length : 0,
    failedAssertPercent:
      assertsList.length > 0 ? (failedAssertList.length * 100) / assertsList.length : 0,
    response_time,
    total_size,
  };
};

export default useTempInfo;

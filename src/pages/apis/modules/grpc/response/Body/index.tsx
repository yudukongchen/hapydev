import Response from './response';
import Message from './message';
import React from 'react';
import { isEmpty, isPlainObject } from 'lodash';
import Initial from '../Initial';

type Props = {
  api_id: string;
  tempData: any;
};

const Body: React.FC<Props> = (props) => {
  const { api_id, tempData } = props;
  if (tempData?.mode === 'unaryCall') {
    const responseData = tempData?.messages?.[0]?.data;
    let responseText = responseData;
    let language = 'text';
    if (isPlainObject(responseData)) {
      language = 'json';
      responseText = JSON.stringify(responseData);
    }
    return <Response value={responseText ?? ''} language={language} />;
  }

  return <Message api_id={api_id} messages={tempData?.messages ?? []} />;
};

export default Body;

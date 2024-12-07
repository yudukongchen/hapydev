import { emitGlobal } from '@subjects/global';
import { hapydev2Har } from '@utils/tools/hapydev-har';
import { MouseEventHandler } from 'react';
import HTTPSnippet from 'httpsnippet';
import { copyTextToClipboard } from '@utils/copy';
import { message } from 'antd';
import { RequestOptions } from '@utils/tools/hapydev-request/types';
import HapydevRequest from '@utils/tools/hapydev-request';

export const handlePrevDefaultClick: MouseEventHandler<HTMLElement> = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

export const handleCreateItem = (type, item) => {
  emitGlobal('apis/createNewItem', {
    type: type,
    parent_id: item?.id,
  });
};

export const handleCopyCurl = async (item, options: RequestOptions) => {
  try {
    const hapydevRequest = new HapydevRequest(item, options).getRequest();
    const harData = hapydev2Har(hapydevRequest);
    const snippet = new HTTPSnippet(harData);
    const curlText = snippet.convert('shell', 'curl', {
      indent: '\t',
    });

    copyTextToClipboard(curlText);
  } catch (ex) {
    copyTextToClipboard('', false);
    message.error(ex.toString());
  }
};

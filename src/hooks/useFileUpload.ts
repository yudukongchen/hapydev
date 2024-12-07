import { uploadFileRequest } from '@services/files';
import { message } from 'antd';
import ShortUniqueId from 'short-unique-id';

type Props = {
  file_name: string;
  onOk: (url: string) => void;
};
const useFileUpload = (params: Props) => {
  const { file_name, onOk } = params;

  const customRequest = ({ file, action, onSuccess }: any) => {
    const formData = new FormData();
    formData.append('file', file);
    uploadFileRequest(file_name, formData).subscribe({
      next(resp) {
        if (resp?.code !== 10000) {
          message.error(resp.message);
          return;
        }
        const rdn_id = new ShortUniqueId({ length: 6 }).rnd();
        onOk(resp?.data?.file_name + '?' + rdn_id);
        onSuccess();
      },
    });
  };
  return {
    customRequest,
  };
};

export default useFileUpload;

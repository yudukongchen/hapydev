import { useMemoizedFn, useSafeState } from 'ahooks';
import { useSelector } from 'react-redux';
import CACert from './cacert';
import { CertificatesWrapper } from './style';
import ClientCertsList from './clientCerts/list';
import ClientCertModify from './clientCerts/modify';
import produce from 'immer';
import { isArray, isPlainObject } from 'lodash';
import { useMemo } from 'react';
import { theme } from 'antd';
import { emitGlobal } from '@subjects/global';

const Certificates = () => {
  const certificate = useSelector((store: any) => store?.user?.settings?.certificate);
  const { token } = theme.useToken();

  const [modifyIndex, setModifyIndex] = useSafeState(null);
  const [clientMode, setClientMode] = useSafeState<'list' | 'create' | 'modify'>('list');

  const handleChange = useMemoizedFn((key, newVal) => {
    const result = produce(certificate, (draft) => {
      draft[key] = newVal;
    });
    emitGlobal('USER/SETTINGS/updateSettings', {
      key: 'certificate',
      value: result,
    });
  });

  const handleClientCertCancel = () => {
    setModifyIndex(null);
    setClientMode('list');
  };

  const handleCreateClientCert = useMemoizedFn((newVal) => {
    const clientCertList = isArray(certificate?.client_certs) ? certificate.client_certs : [];
    const newList = produce(clientCertList, (draft) => {
      draft.push(newVal);
    });
    handleChange('client_certs', newList);
    setClientMode('list');
  });

  const DefaultModifyValue = useMemo(() => {
    if (isPlainObject(certificate?.client_certs?.[modifyIndex])) {
      return certificate?.client_certs?.[modifyIndex];
    }
    return null;
  }, [modifyIndex, certificate?.client_certs]);

  const handleDeleteClientCert = (index) => {
    const clientCertList = isArray(certificate?.client_certs) ? certificate.client_certs : [];
    const newList = produce(clientCertList, (draft) => {
      if (isPlainObject(draft?.[index])) {
        draft.splice(index, 1);
      }
    });
    handleChange('client_certs', newList);
  };

  const handleModifyClientCert = useMemoizedFn((newVal) => {
    const clientCertList = isArray(certificate?.client_certs) ? certificate.client_certs : [];
    const newList = produce(clientCertList, (draft) => {
      if (isPlainObject(draft?.[modifyIndex])) {
        draft[modifyIndex] = newVal;
      }
    });
    handleChange('client_certs', newList);
    setClientMode('list');
  });

  return (
    <CertificatesWrapper token={token}>
      {clientMode === 'list' && (
        <>
          <CACert value={certificate?.ca_cert} onChange={handleChange.bind(null, 'ca_cert')} />
          <ClientCertsList
            onCreate={() => {
              setClientMode('create');
            }}
            onModify={(mIndex) => {
              setModifyIndex(mIndex);
              setClientMode('modify');
            }}
            value={certificate?.client_certs}
            onDelete={handleDeleteClientCert}
          />
        </>
      )}
      {clientMode === 'create' && (
        <ClientCertModify
          mode="create"
          onSave={handleCreateClientCert}
          onCancel={handleClientCertCancel}
        />
      )}
      {clientMode === 'modify' && (
        <ClientCertModify
          mode="modify"
          defaultValue={DefaultModifyValue}
          onSave={handleModifyClientCert}
          onCancel={handleClientCertCancel}
        />
      )}
    </CertificatesWrapper>
  );
};
export default Certificates;

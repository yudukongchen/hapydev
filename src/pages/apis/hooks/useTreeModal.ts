import { useGlobalSubject } from '@hooks/useSubject';
import { emitGlobal } from '@subjects/global';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { v4 as uuidV4 } from 'uuid';

const useTreeModal = () => {
  const [modal, setModal] = useSafeState(null);
  const [modalValue, setModalValue] = useSafeState(null);

  const handleCloseModal = () => {
    setModal(null);
    setModalValue(null);
  };

  const handleCopyItem = (item) => {
    const newItem = { ...item, sort: -1, id: uuidV4(), name: item.name + ' Copy' };
    emitGlobal('APIS/saveApi', {
      data: newItem,
      callback: (data) => {
        emitGlobal('APIS/OPENS/addOpensItem', {
          ...newItem,
          node_type: 'interface',
        });
      },
    });
  };

  const handleUpdateModal = useMemoizedFn((params) => {
    setModal(params?.modal);
    setModalValue(params?.value);
  });

  useGlobalSubject('ApisTree/Copy', handleCopyItem, []);
  useGlobalSubject('ApisMenu/updateModal', handleUpdateModal, []);

  return {
    modal,
    modalValue,
    onCloseModal: handleCloseModal,
  };
};

export default useTreeModal;

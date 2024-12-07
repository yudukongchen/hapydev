import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBAL_MODALS } from './constants';
import { Suspense, useMemo } from 'react';
import Lazypage from './lazypage';
import { isObject, isUndefined } from 'lodash';
import { useMemoizedFn } from 'ahooks';
import { updateWorkspace } from '@reducers/workspace';
import { modalWrapper } from './style';

const Modals = () => {
  const current_model_name = useSelector((store: any) => store?.workspace?.current_model_name);
  const current_model_props = useSelector((store: any) => store?.workspace?.current_model_props);

  const dispatch = useDispatch();

  const currentModal = GLOBAL_MODALS?.[current_model_name];

  const elementProps = useMemo(() => {
    const result = {};
    if (isObject(current_model_props)) {
      Object.keys(current_model_props).forEach((key) => {
        result[key] = current_model_props[key];
      });
    }
    return result;
  }, [current_model_props]);

  const combinedProps = useMemo(() => {
    const result = {};
    if (isObject(currentModal?.props)) {
      Object.keys(currentModal.props).forEach((key) => {
        result[key] = currentModal.props[key];
      });
    }

    return { ...result, ...elementProps };
  }, [currentModal, elementProps]);

  const handleClose = useMemoizedFn(() => {
    dispatch(
      updateWorkspace({
        current_model_name: null,
        current_model_props: null,
      })
    );
  });

  return (
    <Modal
      className={modalWrapper}
      destroyOnClose
      onCancel={handleClose}
      open={!isUndefined(currentModal)}
      {...combinedProps}
    >
      <Suspense fallback={<Lazypage />}>
        {!isUndefined(currentModal?.element) && (
          <currentModal.element onCancel={handleClose} {...elementProps} />
        )}
      </Suspense>
    </Modal>
  );
};

export default Modals;

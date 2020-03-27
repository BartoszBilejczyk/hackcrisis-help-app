import ModalProvider from './Modal.provider';

export const providersNamespace = {
  Modal: 'Modal',
};

export default {
  [providersNamespace.Modal]: ModalProvider,
};

import { Modal as AntModal } from 'ant-design-vue';

const MODAL_TYPES = {
  CONFIRM: 'confirm',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export default {
  _contentCheck(data) {
    if (!data) {
      throw new Error('You have to provide config object to modal!')
    }
    if (!data.content) {
      throw new Error(`You're trying to create a modal without the content!`);
    }
  },

  _createModal(type, config, defaults) {
    if (!type) {
      throw new Error('You need to provide a modal type!');
    }

    this._contentCheck(config);
    return AntModal[type]({...defaults, ...config});
  },

  // confirm(config) {
  //   return this._createModal(
  //     MODAL_TYPES.CONFIRM,
  //     config,
  //     {
  //       title: i18n.t('modalDefaults.areYouSure'),
  //       okText: i18n.t('common.ok'),
  //       cancelText: i18n.t('common.cancel')
  //     }
  //   );
  // },

  info(config) {
    return this._createModal(
      MODAL_TYPES.INFO,
      config,
      {
        title: 'Informacja',
        okText: 'Ok',
        maskClosable: true
      }
    );
  },

  // success(config) {
  //   return this._createModal(
  //     MODAL_TYPES.SUCCESS,
  //     config,
  //     {
  //       title: i18n.t('modalDefaults.success'),
  //       okText: i18n.t('common.ok')
  //     }
  //   );
  // },
  //
  // error(config) {
  //   return this._createModal(
  //     MODAL_TYPES.ERROR,
  //     config,
  //     {
  //       title: i18n.t('modalDefaults.error'),
  //       okText: i18n.t('common.ok')
  //     }
  //   );
  // },
  //
  // warning(config) {
  //   return this._createModal(
  //     MODAL_TYPES.WARNING,
  //     config,
  //     {
  //       title: i18n.t('modalDefaults.warning'),
  //       okText: i18n.t('common.ok')
  //     }
  //   );
  // }
}

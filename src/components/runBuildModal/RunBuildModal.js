import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/modal/Modal';
import Title from 'components/title/Title';
import Button from 'components/button/Button';
import Input from 'components/input/Input';

import l10n from 'l10n/config';

import './style.css';

const RunBuildModal = ({ onClose, ...otherProps }) => {
  const [hash, setHash] = useState('');

  const onInputChange = ({ target }) => setHash(target.value);
  const onCloseModal = () => {
    setHash('');
    onClose();
  };

  return (
    <Modal className="run-build-modal" {...otherProps}>
      <Title level={2}>{l10n.modal_new_build_title}</Title>
      <p>{l10n.modal_new_build_description}</p>
      <Input
        value={hash}
        onChange={onInputChange}
        placeholder={l10n.modal_new_build_hash_placeholder}
      />
      <div className="run-build-modal__controls">
        <Button color="primary" disabled={!hash}>
          {l10n.modal_new_build_controls_run}
        </Button>
        <Button color="secondary" onClick={onCloseModal}>
          {l10n.modal_new_build_controls_cancel}
        </Button>
      </div>
    </Modal>
  );
};

RunBuildModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

RunBuildModal.defaultProps = {};

export default RunBuildModal;

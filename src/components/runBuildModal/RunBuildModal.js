import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal from 'components/modal/Modal';
import Title from 'components/title/Title';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import Label from 'components/label/Label';

import { addBuildToQueue } from 'store/buildSlice';
import { setPending, pendingSelector } from 'store/layoutSlice';

import l10n from 'l10n/config';
import { paths } from 'router';

import './RunBuildModal.css';

const RunBuildModal = ({ onClose, ...otherProps }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [hash, setHash] = useState('');
  const [reqError, setReqError] = useState(null);

  const pending = useSelector(pendingSelector);

  const onInputChange = ({ target }) => setHash(target.value);
  const onCloseModal = () => {
    if (!pending) {
      setHash('');
      onClose();
    }
  };
  const onRunBuild = useCallback(async () => {
    await dispatch(setPending(true));
    const { payload, error } = await dispatch(addBuildToQueue(hash));
    await dispatch(setPending(false));
    if (!error) {
      onCloseModal();
      history.push(paths.build.replace(/:buildId/g, payload.id));
    } else {
      setReqError(error);
    }
  }, [hash]);

  const resetError = () => setReqError(null);

  return (
    <Modal className="run-build-modal" onClose={onCloseModal} {...otherProps}>
      <Title level={2}>{l10n.modal_new_build_title}</Title>
      <p>{l10n.modal_new_build_description}</p>
      <div className="run-build-modal__hash">
        <Input
          id="modal-commit-hash"
          value={hash}
          onChange={onInputChange}
          placeholder={l10n.modal_new_build_hash_placeholder}
          error={reqError}
          onBlur={resetError}
          onFocus={resetError}
        />
        {reqError && (
          <Label htmlFor="modal-commit-hash" error={reqError}>
            {reqError.message}
          </Label>
        )}
      </div>
      <div className="run-build-modal__controls">
        <Button
          color="primary"
          disabled={!hash || pending}
          onClick={onRunBuild}
        >
          {l10n.modal_new_build_controls_run}
        </Button>
        <Button color="secondary" onClick={onCloseModal} disabled={pending}>
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

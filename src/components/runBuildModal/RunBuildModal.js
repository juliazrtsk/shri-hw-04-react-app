import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

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
  const location = useLocation();

  const [hash, setHash] = useState('');
  const [reqError, setReqError] = useState(null);

  const pending = useSelector(pendingSelector);

  const onInputChange = ({ target }) => setHash(target.value);
  const onCloseModal = () => {
    if (!pending.loading) {
      setHash('');
      onClose();
    }
  };
  const onRunBuild = useCallback(async () => {
    await dispatch(setPending({ loading: true, fullscreen: false }));
    const { payload, error } = await dispatch(addBuildToQueue(hash));
    await dispatch(setPending({ loading: false }));
    if (!error) {
      onCloseModal();
      history.push({
        pathname: paths.build.replace(/:buildId/g, payload.id),
        search: location.search,
      });
    } else {
      setReqError(payload);
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
          data-testid="modal-input-hash"
          value={hash}
          onChange={onInputChange}
          placeholder={l10n.modal_new_build_hash_placeholder}
          error={!!reqError}
          onBlur={resetError}
          onFocus={resetError}
        />
        {reqError && (
          <Label htmlFor="modal-commit-hash" error={!!reqError}>
            {reqError}
          </Label>
        )}
      </div>
      <div className="run-build-modal__controls">
        <Button
          color="primary"
          disabled={!hash || pending.loading}
          onClick={onRunBuild}
          data-testid="modal-build-button-run"
        >
          {l10n.modal_new_build_controls_run}
        </Button>
        <Button
          color="secondary"
          onClick={onCloseModal}
          disabled={pending.loading}
          data-testid="modal-build-button-cancel"
        >
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

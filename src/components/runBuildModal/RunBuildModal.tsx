import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Modal, { Props as ModalProps } from 'components/modal/Modal';
import Title from 'components/title/Title';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import Label from 'components/label/Label';

import {AppDispatch} from "store";
import { addBuildToQueue } from 'store/buildSlice';
import { setPending, pendingSelector } from 'store/layoutSlice';

import l10n from 'localization/config';
import { paths } from 'router';

import {ErrorMessage} from "model";

import './RunBuildModal.css';

interface Props extends ModalProps {
  onClose: () => void;
}

const RunBuildModal: React.FC<Props> = ({ onClose, ...otherProps }) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();

  const [hash, setHash] = useState<string>('');
  const [reqError, setReqError] = useState<ErrorMessage | null>(null);

  const pending = useSelector(pendingSelector);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setHash(e.target.value);
  }

  const onCloseModal = () => {
    if (!pending.loading) {
      setHash('');
      onClose();
    }
  };
  const onRunBuild = useCallback(async () => {
    await dispatch(setPending({ loading: true, fullscreen: false }));
    // @ts-ignore
    const { payload, error } = await dispatch(addBuildToQueue(hash));
    await dispatch(setPending({ loading: false }));
    if (!error && payload) {
      onCloseModal();
      // @ts-ignore
      history.push(paths.build.replace(/:buildId/g, payload.id));
    } else {
      // @ts-ignore
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
        >
          {l10n.modal_new_build_controls_run}
        </Button>
        <Button
          color="secondary"
          onClick={onCloseModal}
          disabled={pending.loading}
        >
          {l10n.modal_new_build_controls_cancel}
        </Button>
      </div>
    </Modal>
  );
};

export default RunBuildModal;

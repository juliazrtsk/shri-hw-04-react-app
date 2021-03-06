import React, { useReducer, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import Title from 'components/title/Title';
import Label from 'components/label/Label';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import PendingMessage from 'components/pendingMessage/PendingMessage';
import l10n from 'l10n/config';
import { paths } from 'router';

import { pendingSelector, setPending } from 'store/layoutSlice';
import { settingsSelector, updateSettings } from 'store/settingsSlice';

import './style.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'UPDATE_FULL_FORM':
      return {
        ...state,
        ...action.settings,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

const Settings = ({ loadData }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const pending = useSelector(pendingSelector);
  const settings = useSelector(settingsSelector);

  const [formState, dispatchFormUpdate] = useReducer(reducer, settings);

  useEffect(() => {
    loadData(dispatch);
  }, [dispatch, loadData]);

  useEffect(() => {
    if (Object.keys(settings).length) {
      dispatchFormUpdate({
        type: 'UPDATE_FULL_FORM',
        settings,
      });
    }
  }, [settings]);

  const onFieldChange = useCallback(({ target }) => {
    dispatchFormUpdate({
      type: 'UPDATE_FIELD',
      field: target.name,
      value: target.value,
    });
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { repoName, buildCommand, mainBranch, period } = formState;
      await dispatch(setPending({ loading: true, fullscreen: false }));
      const { error, payload } = await dispatch(
        updateSettings({
          repoName,
          buildCommand,
          mainBranch,
          period: Number.parseInt(period),
        })
      );

      if (!error) {
        history.push(paths.home);
      } else {
        dispatchFormUpdate({
          type: 'SET_ERROR',
          error: payload.message,
        });
      }
      await dispatch(setPending({ loading: false }));
    },
    [formState, updateSettings]
  );

  const resetError = useCallback(() => {
    dispatchFormUpdate({
      type: 'SET_ERROR',
      error: null,
    });
  }, []);

  const onCancel = useCallback(() => {
    history.push(paths.home);
  }, []);

  const formFields = [
    {
      name: 'repoName',
      id: 'settings-input-repo',
      value: formState.repoName,
      label: l10n.settings_form_repo_label,
      placeholder: l10n.settings_form_repo_placeholder,
      isRequired: true,
      onFocus: resetError,
      onBlur: resetError,
    },
    {
      name: 'buildCommand',
      id: 'settings-input-build',
      value: formState.buildCommand,
      label: l10n.settings_form_build_label,
      placeholder: l10n.settings_form_build_placeholder,
      isRequired: true,
      onFocus: resetError,
      onBlur: resetError,
    },
    {
      name: 'mainBranch',
      id: 'settings-input-branch',
      value: formState.mainBranch,
      label: l10n.settings_form_branch_label,
      placeholder: l10n.settings_form_branch_placeholder,
      isRequired: true,
      onFocus: resetError,
      onBlur: resetError,
    },
    {
      name: 'period',
      id: 'settings-input-period',
      value: formState.period,
      label: l10n.settings_form_period_label,
      labelAfterField: l10n.settings_form_period_label_after,
      placeholder: l10n.settings_form_period_placeholder,
      isRequired: false,
      onFocus: resetError,
      onBlur: resetError,
      mask: [/\d/, /\d/, /\d/],
      // eslint-disable-next-line react/display-name
      render: (field) => {
        const {
          id,
          isRequired,
          label,
          labelAfterField,
          render,
          ...otherProps
        } = field;
        return (
          <>
            <Label htmlFor={id} isRequired={isRequired}>
              {label}
            </Label>
            <Input id={id} onChange={onFieldChange} {...otherProps} />
            <Label htmlFor={id}>{labelAfterField}</Label>
          </>
        );
      },
    },
  ];

  const renderedFormFields = useMemo(
    () =>
      formFields.map((field) => {
        const { name, id, isRequired, label, render, ...otherProps } = field;
        return (
          <section
            className={`settings__field settings__field_type_${name}`}
            key={id}
          >
            {render ? (
              render(field)
            ) : (
              <>
                <Label htmlFor={id} isRequired={isRequired}>
                  {label}
                </Label>
                <Input
                  id={id}
                  name={name}
                  onChange={onFieldChange}
                  {...otherProps}
                />
              </>
            )}
          </section>
        );
      }),
    [formFields]
  );

  if (pending.loading && pending.fullscreen) {
    return <PendingMessage />;
  }

  return (
    <div className={cn('settings')}>
      <Title level={3}>{l10n.settings_title}</Title>
      <p className="settings__description">{l10n.settings_description}</p>
      <form className="settings__form" onSubmit={onSubmit}>
        {renderedFormFields}
        <section className="settings__controls">
          <Button type="submit" disabled={pending.loading}>
            {l10n.settings_controls_save}
          </Button>
          <Button
            color="secondary"
            onClick={onCancel}
            disabled={pending.loading}
          >
            {l10n.settings_controls_cancel}
          </Button>
        </section>
        {formState.error && <Label error>{formState.error}</Label>}
      </form>
    </div>
  );
};

Settings.propTypes = {
  loadData: PropTypes.func,
};

Settings.defaultProps = {
  loadData: () => {},
};

export default Settings;

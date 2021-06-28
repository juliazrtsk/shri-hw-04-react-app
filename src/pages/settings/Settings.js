import React, { useReducer, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import Title from 'components/title/Title';
import Label from 'components/label/Label';
import Input from 'components/input/Input';
import Button from 'components/button/Button';
import l10n from 'l10n/config';
import { paths } from 'router';

import './style.css';

const initialState = {
  repo: '',
  build: '',
  branch: '',
  interval: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const Settings = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const onFieldChange = useCallback(({ target }) => {
    dispatch({ type: 'UPDATE_FIELD', field: target.name, value: target.value });
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    history.push(paths.home);
  }, []);

  const onCancel = useCallback(() => {
    history.push(paths.home);
  }, []);

  const formFields = [
    {
      name: 'repo',
      id: 'settings-input-repo',
      value: state.repo,
      label: l10n.settings_form_repo_label,
      placeholder: l10n.settings_form_repo_placeholder,
      isRequired: true,
      clearable: true,
    },
    {
      name: 'build',
      id: 'settings-input-build',
      value: state.build,
      label: l10n.settings_form_build_label,
      placeholder: l10n.settings_form_build_placeholder,
      isRequired: true,
      clearable: true,
    },
    {
      name: 'branch',
      id: 'settings-input-branch',
      value: state.branch,
      label: l10n.settings_form_branch_label,
      placeholder: l10n.settings_form_branch_placeholder,
      isRequired: true,
      clearable: true,
    },
    {
      name: 'interval',
      id: 'settings-input-interval',
      value: state.interval,
      label: l10n.settings_form_interval_label,
      labelAfterField: l10n.settings_form_interval_label_after,
      placeholder: l10n.settings_form_interval_placeholder,
      isRequired: false,
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

  return (
    <div className={cn('settings')}>
      <Title level={3}>{l10n.settings_title}</Title>
      <p className="settings__description">{l10n.settings_description}</p>
      <form className="settings__form" onSubmit={onSubmit}>
        {renderedFormFields}
        <section className="settings__controls">
          <Button type="submit">{l10n.settings_controls_save}</Button>
          <Button color="secondary" onClick={onCancel}>
            {l10n.settings_controls_cancel}
          </Button>
        </section>
      </form>
    </div>
  );
};

Settings.propTypes = {};

Settings.defaultProps = {};

export default Settings;

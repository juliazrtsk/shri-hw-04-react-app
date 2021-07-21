import React, {useCallback} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

import Header from 'components/header/Header';
import Title from 'components/title/Title';
import ActionButton from 'components/actionButton/ActionButton';
import Footer from 'components/footer/Footer';
import NetworkErrorMessage
  from 'components/networkErrorMessage/NetworkErrorMessage';

import {AppDispatch} from "store";
import {addBuildToQueue, buildDetailsSelector} from 'store/buildSlice';
import {settingsSelector} from 'store/settingsSlice';
import {networkErrorSelector, toggleModal} from 'store/layoutSlice';

import l10n from 'localization/config';
import {matchLocationToPath, paths} from 'router';

import {IconType, Route} from "model";

import './Layout.css';

type ControlButton = {
  type: IconType,
  onClick?: () => void,
  text?: string,
  invisible?: boolean,
}

const Layout: React.FC<React.HTMLProps<HTMLElement>> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const build = useSelector(buildDetailsSelector);
  const settings = useSelector(settingsSelector);
  const networkError = useSelector(networkErrorSelector);

  const redirect = useCallback((path: Route['path']): void => {
    history.push(path);
  }, []);

  const rebuild = useCallback(async () => {
    if (build) {
      // @ts-ignore
      const { payload, error } = await dispatch(
        addBuildToQueue(build.commitHash)
      );
      if (!error && payload) {
        // @ts-ignore
        redirect(paths.build.replace(/:buildId/g, payload.id));
      }
    }
  }, [build]);

  const handleToggleModal = useCallback(() => {
    dispatch(toggleModal());
  }, [toggleModal]);

  const controls: Record<Route['path'], ControlButton[]> = {
    [paths.home]: [
      {
        type: IconType.play,
        text: l10n.layout_header_control_run,
        onClick: handleToggleModal,
        invisible: !(settings && settings.repoName),
      },
      {
        type: IconType.settings,
        onClick: () => redirect(paths.settings),
      },
    ],
    [paths.settings]: [],
    [paths.build]: [
      { type: IconType.restart, text: l10n.layout_header_control_rebuild, onClick: rebuild },
      { type: IconType.settings, onClick: () => redirect(paths.settings) },
    ],
  };

  const match = matchLocationToPath(location.pathname);
  const path = match ? match.path : paths.home;

  const renderControls = () =>
    controls[path].map(
      ({ type, text, onClick, invisible }) =>
        !invisible && (
          <ActionButton
            key={`layout_control_${type}`}
            iconType={type}
            onClick={onClick}
          >
            {text}
          </ActionButton>
        )
    );

  const content = networkError ? <NetworkErrorMessage /> : children;

  return (
    <div className="layout">
      <Header>
        <Title className="layout__title" level={1}>{l10n.layout_header_title}</Title>
        <div className="layout__controls">{renderControls()}</div>
      </Header>
      <main className="layout__content">{content}</main>
      <Footer />
    </div>
  );
};

export default Layout;

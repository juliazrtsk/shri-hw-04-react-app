import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import { builds } from 'api/buildsList';
import Build from 'components/build/Build';
import ActionButton from 'components/actionButton/ActionButton';
import { paths } from 'router';
import l10n from 'l10n/config';

import './style.css';

const BuildsList = ({ className }) => {
  const history = useHistory();

  const onBuildClick = useCallback((id) => {
    history.push(paths.build.replace(/:buildId/g, id));
  }, []);

  const renderedBuilds = useMemo(
    () =>
      builds.map((build) => (
        <Build
          className="builds-list__build"
          key={build.id}
          onClick={onBuildClick}
          {...build}
        />
      )),
    [builds]
  );

  return (
    <div className={cn('builds-list', className)}>
      {renderedBuilds}
      <ActionButton className="builds-list__more-button" color="secondary">
        {l10n.buildsList_controls_showMore}
      </ActionButton>
    </div>
  );
};

BuildsList.propTypes = {
  className: PropTypes.string,
};

BuildsList.defaultProps = {
  className: '',
};

export default BuildsList;

import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { paths } from 'router';
import Build from 'components/build/Build';

import './BuildsList.css';

const BuildsList = ({ className, builds }) => {
  const history = useHistory();

  const onBuildClick = useCallback((id) => {
    history.push(paths.build.replace(/:buildId/g, id));
  }, []);

  const buildsList = useMemo(
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
    <div className={cn('builds-list', className)} data-testid="builds-list">
      {buildsList}
    </div>
  );
};

BuildsList.propTypes = {
  className: PropTypes.string,
  builds: PropTypes.array.isRequired,
};

BuildsList.defaultProps = {
  className: '',
};

export default BuildsList;

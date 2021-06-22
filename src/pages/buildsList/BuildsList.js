import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';

import { builds } from 'api/buildsList';

import Build from 'components/build/Build';
import Button from 'components/button/Button';

import './style.css';

const BuildsList = ({ className }) => {
  const history = useHistory();

  const onBuildClick = useCallback((build) => {
    history.push(`/build/${build}`);
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
      <Button color="secondary">Show more</Button>
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
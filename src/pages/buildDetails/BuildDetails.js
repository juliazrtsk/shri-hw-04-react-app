import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Build from 'components/build/Build';
import BuildLog from 'components/buildLog/BuildLog';
import PendingMessage from 'components/pendingMessage/PendingMessage';

import { pendingSelector } from 'store/layoutSlice';
import { buildDetailsSelector, buildLogSelector } from 'store/buildSlice';

import './style.css';

const BuildDetails = ({ loadData }) => {
  const dispatch = useDispatch();

  const { buildId } = useParams();
  const pending = useSelector(pendingSelector);
  const build = useSelector(buildDetailsSelector);
  const log = useSelector(buildLogSelector);

  useEffect(() => {
    loadData(dispatch, buildId);
  }, [dispatch, loadData, buildId]);

  if (pending) {
    return <PendingMessage />;
  }

  return (
    <article className="build-details">
      {build && log && (
        <>
          <Build {...build} view="expanded" />
          <BuildLog className="build-details__log" log={log} />
        </>
      )}
    </article>
  );
};

BuildDetails.propTypes = {
  loadData: PropTypes.func,
};

BuildDetails.defaultProps = {
  loadData: () => {},
};

export default BuildDetails;

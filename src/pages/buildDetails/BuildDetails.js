import React from 'react';
import { useParams } from 'react-router-dom';

import Build from 'components/build/Build';
import BuildLog from 'components/buildLog/BuildLog';

/* mockdata */
import { log } from 'api/buildLog';
import { builds } from 'api/buildsList';

import './style.css';

const BuildDetails = () => {
  let { buildNumber } = useParams();
  buildNumber = Number.parseInt(buildNumber);

  const build = builds.filter(({ buildNumber: n }) => n === buildNumber)[0];
  return (
    <article className="build-details">
      <Build {...build} view="expanded" />
      <BuildLog log={log} />
    </article>
  );
};

export default BuildDetails;

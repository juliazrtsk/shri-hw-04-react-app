import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Build from 'components/build/Build';
import BuildLog from 'components/buildLog/BuildLog';
import PendingMessage from 'components/pendingMessage/PendingMessage';

import {AppDispatch} from "store";
import { pendingSelector } from 'store/layoutSlice';
import { buildDetailsSelector, buildLogSelector } from 'store/buildSlice';

import {Page, UrlParameters} from "model";

import './style.css';

const BuildDetails: React.FC<Page> = ({ loadData }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { buildId } = useParams<UrlParameters>();
  const pending = useSelector(pendingSelector);
  const build = useSelector(buildDetailsSelector);
  const log = useSelector(buildLogSelector);

  useEffect(() => {
    loadData(dispatch, buildId);
  }, [dispatch, loadData, buildId]);

  if (pending.loading) {
    return <PendingMessage />;
  }

  return (
    <article className="build-details" data-testid="page-build-details">
      {build && <Build {...build} view="expanded" />}
      {log && <BuildLog className="build-details__log" log={log} />}
    </article>
  );
};

export default BuildDetails;

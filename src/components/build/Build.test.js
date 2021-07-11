import React from 'react';
import Build from 'components/build/Build';
import { render } from '@testing-library/react';

describe('Build details card', () => {
  let baseBuild;
  beforeAll(() => {
    baseBuild = {
      id: '1',
      buildNumber: 1,
      commitMessage: 'Message',
      branchName: 'master',
      authorName: 'Author',
      commitHash: '1q2w3e4r',
    };
  });

  it('contains all necessary fields for Waiting status', () => {
    const buildData = { ...baseBuild, status: 'Waiting' };
    const build = <Build {...buildData} />;
    const { getByTestId } = render(build);

    expect(getByTestId('build-card_number')).toBeInTheDocument();
    expect(getByTestId('build-card_branch')).toBeInTheDocument();
    expect(getByTestId('build-card_hash')).toBeInTheDocument();
    expect(getByTestId('build-card_author')).toBeInTheDocument();
  });

  it('contains start date field for Canceled status', () => {
    const buildData = {
      ...baseBuild,
      status: 'Canceled',
      start: '2021-06-14T20:47:01.076',
    };
    const build = <Build {...buildData} />;
    const { getByTestId } = render(build);

    expect(getByTestId('build-card_date')).toBeInTheDocument();
  });

  it('contains start date and duration fields for Success status', () => {
    const buildData = {
      ...baseBuild,
      status: 'Canceled',
      start: '2021-06-14T20:47:01.076',
      duration: 1000,
    };
    const build = <Build {...buildData} />;
    const { getByTestId } = render(build);

    expect(getByTestId('build-card_date')).toBeInTheDocument();
    expect(getByTestId('build-card_duration')).toBeInTheDocument();
  });
});

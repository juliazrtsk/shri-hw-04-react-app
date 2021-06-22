import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import dayjs from 'utils/dayjs';
import MetaInfo from 'components/metaInfo/MetaInfo';
import Icon from 'components/icon/Icon';
import CommitHash from 'components/commitHash/CommitHash';

import './style.css';

const buildStatusMap = {
  Success: 'correct',
  Waiting: 'pending',
  Canceled: 'error',
};

const Build = (props) => {
  const {
    className,
    id,
    status,
    buildNumber,
    commitMessage,
    branchName,
    authorName,
    commitHash,
    onClick,
    start,
    duration,
    view,
  } = props;

  const handleClick = (build) => {
    if (onClick) {
      onClick(build);
    }
  };

  return (
    <section
      className={cn(
        'build',
        `build_status_${buildStatusMap[status]}`,
        `build_view_${view}`,
        className
      )}
      key={id}
      onClick={() => handleClick(buildNumber)}
    >
      <Icon className="build__status-icon" type={buildStatusMap[status]} />
      <div className="build__status">
        <span className="build__number">#{buildNumber}</span> {commitMessage}
      </div>

      {(start || duration) && (
        <div className="build__date-time-meta">
          {start && (
            <MetaInfo className="build__date">
              <Icon type="calendar" color="secondary" />{' '}
              {dayjs(start).format('DD MMM, hh:mm')}
            </MetaInfo>
          )}
          {duration && (
            <MetaInfo className="build__duration">
              <Icon type="stopwatch" color="secondary" /> {duration}
            </MetaInfo>
          )}
        </div>
      )}

      <div className="build__commit-meta">
        <MetaInfo>
          <Icon type="commit" color="secondary" /> {branchName}
        </MetaInfo>
        <CommitHash hash={commitHash} />
        <MetaInfo>
          <Icon type="user" color="secondary" /> {authorName}
        </MetaInfo>
      </div>
    </section>
  );
};

Build.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Success', 'Waiting', 'Canceled']).isRequired,
  buildNumber: PropTypes.number.isRequired,
  commitMessage: PropTypes.string.isRequired,
  branchName: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  commitHash: PropTypes.string.isRequired,
  start: PropTypes.string,
  duration: PropTypes.number,
  onClick: PropTypes.func,
  view: PropTypes.oneOf(['default', 'expanded']),
};

Build.defaultProps = {
  className: '',
  onClick: () => {},
  view: 'default',
  start: '',
  duration: null,
};

export default Build;
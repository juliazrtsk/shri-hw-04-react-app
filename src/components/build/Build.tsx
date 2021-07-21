import React from 'react';
import cn from 'classnames';

import dayjs from 'utils/dayjs';
import MetaInfo from 'components/metaInfo/MetaInfo';
import Icon from 'components/icon/Icon';
import CommitHash from 'components/commitHash/CommitHash';

import {Build as BuildType, BuildStatus, IconType} from "model";

import './Build.css';

interface Props extends BuildType {
  className?: string;
  onClick?: (id: string) => void;
  view?: 'default' | 'expanded';
}

type BuildStatusPostfix = Record<BuildStatus, IconType.correct | IconType.pending | IconType.error>;

const buildStatusIconType: BuildStatusPostfix = {
  Success: IconType.correct,
  Waiting: IconType.pending,
  Canceled: IconType.error,
  InProgress: IconType.pending,
  Fail: IconType.error,
};

const Build: React.FC<Props> = (props) => {
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
    view = 'default',
  } = props;

  const handleClick = (id: string) => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <section
      className={cn(
        'build',
        `build_status_${buildStatusIconType[status]}`,
        `build_view_${view}`,
        className
      )}
      key={id}
      onClick={() => handleClick(id)}
    >
      <Icon className="build__status-icon" type={buildStatusIconType[status]} />
      <div className="build__status" title={status}>
        <span className="build__number" data-testid="build-card_number">
          #{buildNumber}
        </span>{' '}
        {commitMessage}
      </div>

      {(start || duration) && (
        <div className="build__date-time-meta">
          {start && (
            <MetaInfo className="build__date">
              <Icon type={IconType.calendar} color="secondary" />{' '}
              {dayjs(start).format('DD MMM, hh:mm')}
            </MetaInfo>
          )}
          {duration && (
            <MetaInfo className="build__duration">
              <Icon type={IconType.stopwatch} color="secondary" /> {duration}
            </MetaInfo>
          )}
        </div>
      )}

      <div className="build__commit-meta">
        <MetaInfo>
          <Icon type={IconType.commit} color="secondary" /> {branchName}
        </MetaInfo>
        <CommitHash hash={commitHash} />
        <MetaInfo>
          <Icon type={IconType.user} color="secondary" /> {authorName}
        </MetaInfo>
      </div>
    </section>
  );
};

export default Build;

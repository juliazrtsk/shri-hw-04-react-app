export const enum BuildStatus {
  Waiting = 'Waiting',
  InProgress = 'InProgress',
  Success = 'Success',
  Fail = 'Fail',
  Canceled = 'Canceled',
}

export interface Build {
  id: string;
  buildNumber: number;
  status: BuildStatus;
  commitMessage: string;
  branchName: string;
  authorName: string;
  commitHash: string;
  start?: string;
  duration?: number;
}

export type BuildLog = string;

export type NewBuildResponse = Pick<Build, 'id' | 'status' | 'buildNumber'>;

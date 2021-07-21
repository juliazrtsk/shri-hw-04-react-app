export type Settings = {
  id?: string;
  repoName: string,
  buildCommand: string,
  mainBranch: string,
  period: number,
};

export type NewSettingsResponse = object;

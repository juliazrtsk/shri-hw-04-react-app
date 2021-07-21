import {ApiInstance, ApiResponse, Build, BuildLog, NewBuildResponse} from "model";

const API_BUILDS = '/builds';

export interface ApiBuildService {
  getBuildsList: () => Promise<ApiResponse<Build[]>>,
  getBuildDetails: (buildId: Build['id']) => Promise<ApiResponse<Build>>,
  getBuildLogs: (buildId: Build['id']) => Promise<ApiResponse<BuildLog>>,
  addBuildToQueue: (buildId: Build['commitHash']) => Promise<ApiResponse<NewBuildResponse>>,
}

export default class BuildsService implements ApiBuildService {
  private api: ApiInstance;

  constructor(api: ApiInstance) {
    this.api = api;
  }

  getBuildsList(): Promise<ApiResponse<Build[]>> {
    return this.api.get<Build[]>(API_BUILDS);
  }

  getBuildDetails(buildId: Build['id']): Promise<ApiResponse<Build>> {
    return this.api.get<Build>(`${API_BUILDS}/${buildId}`);
  }

  getBuildLogs(buildId: Build['id']): Promise<ApiResponse<BuildLog>> {
    return this.api.get<BuildLog>(`${API_BUILDS}/${buildId}/logs`);
  }

  addBuildToQueue(commitHash: Build['commitHash']): Promise<ApiResponse<NewBuildResponse>> {
    return this.api.post<NewBuildResponse>(`${API_BUILDS}/${commitHash}`);
  }
}

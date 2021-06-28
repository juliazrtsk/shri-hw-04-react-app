export default class BuildsService {
  constructor(api) {
    this.api = api;
  }

  getBuildsList() {
    return this.api.get('/builds');
  }

  getBuildDetails(buildId) {
    return this.api.get(`/builds/${buildId}`);
  }

  getBuildLogs(buildId) {
    return this.api.get(`/builds/${buildId}/logs`);
  }

  addBuildToQueue(commitHash) {
    return this.api.post(`/builds/${commitHash}`);
  }
}

export default class SettingsService {
  constructor(api) {
    this.api = api;
  }

  getSettings() {
    return this.api.get('/settings');
  }

  updateSettings(settings) {
    return this.api.post('/settings', settings);
  }
}

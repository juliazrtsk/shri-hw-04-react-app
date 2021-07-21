import Api from './Api';
import BuildsService from './BuildsService';
import SettingsService from './SettingsService';

const api = new Api();
export const buildsService = new BuildsService(api);
export const settingsService = new SettingsService(api);

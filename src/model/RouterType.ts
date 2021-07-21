import React from "react";
import {matchPath} from "react-router-dom";

import {Page} from "./PageType";
import {Build} from "./BuildType";

export type Route = {
  path: string;
  component: React.FC<Page>,
  loadData: Page['loadData'];
};

export const enum Path {
  home = 'home',
  settings = 'settings',
  build = 'build',
}

export type PathConfig = Record<Path, Route['path']>;

export type UrlParameters = {
  buildId?: Build['id'];
};

export type LocationMatch = ReturnType<typeof matchPath>;

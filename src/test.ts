// This file is required by karma.conf.js and loads recursively all the .spec and framework files

// chartist's UMD bundle expects a CommonJS-style `global`, which the test
// bundler no longer shims.
(window as unknown as { global: unknown }).global = window;

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * Zone JS is required by Angular itself.
 */
import 'zone.js';  // Included with Angular CLI.

/***************************************************************************************************
 * APPLICATION IMPORTS
 */

/**
 * chartist 0.11 is a UMD bundle that dereferences the Node.js `global` object. The Angular CLI
 * stopped shimming Node.js globals for the browser, so it is aliased to `window` here.
 */
(window as unknown as { global: Window }).global = window;

/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 */
import 'zone.js';

/**
 * Chartist's UMD bundle references the Node `global` object, which modern
 * bundlers no longer shim for the browser.
 */
(window as any).global = window;

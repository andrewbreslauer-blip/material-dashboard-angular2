import $ from 'jquery';

// The dashboard components rely on globals that the browser build provides through
// the `scripts` array (jQuery) and on browser APIs that jsdom does not implement.
(globalThis as any).$ = $;
(globalThis as any).jQuery = $;

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })) as unknown as typeof window.matchMedia;
}

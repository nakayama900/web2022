import './style.css';
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import javascriptLogo from './javascript.svg';
// import { setupCounter } from './counter.js';
// import setup from './entry/entry-p5.js';
import 'bulma/css/bulma.min.css';
import { render } from 'solid-js/web';
import { App } from './entry/entry-code.jsx';
// import { chart } from './components/chart';
import TabEventHandler from './a11y/tab.js';
import './style/tab.css';
import EntryBeat from "./entry/entry-beat.jsx";
// import entryRepl from './entry/entry-repl.jsx';
// window.addEventListener('DOMContentLoaded', TabEventHandler);
// editorWorker();
/*
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p> <div id="example-recipe" />
  </div>
`;

setupCounter(document.querySelector('#counter'));
*/
 render(App, document.querySelector('#tabpanel3'));
/*
setup();
chart();
*/
  TabEventHandler();

//entryRepl();
render(EntryBeat, document.querySelector('#app'));

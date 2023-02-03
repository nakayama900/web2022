// import Editor from "./components/Editor";
// import Compare from '../experiment/compareReactive';
import Editor from '../components/Editor.jsx';
import { createSignal } from "solid-js";

export function App(props) {
  const [played, setPlayed] = createSignal(false);
  let data
  let data2


  return (<>
    <button>{}</button>
    <div style={{ width: 'full' }}>
      {
        // <a href="https://vitejs.dev" target="_blank">
        //   <img src="/vite.svg" class="logo" alt="Vite logo" />
        // </a>
        // <a
        //   href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
        //   target="_blank"
        // >
        //   <img
        //     src="${javascriptLogo}"
        //     class="logo vanilla"
        //     alt="JavaScript logo"
        //   />
        // </a>
        // <h1>Hello Vite!</h1>
        // <div class="card">
        //   <button id="counter" type="button"></button>
        // </div>
        // <p class="read-the-docs">Click on the Vite logo to learn more</p>{' '}
      }

      <textarea value={data} onInput={(e) => data = e.target.value} />
      <Editor data={data2}></Editor>
      {/* <Compare pattern={'effect'} />
            <Compare pattern={'mount'} /> */}
    </div></>
  );
}

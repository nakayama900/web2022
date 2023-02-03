// import Editor from "./components/Editor";
import Compare from '../experiment/compareReactive';
import Editor from '../components/Editor.jsx';

export function App() {
    return (
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
            <Editor></Editor>
            test
            <Compare pattern={'effect'} />
            <Compare pattern={'mount'} />
        </div>
    );
}

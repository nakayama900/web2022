// import {editor as mEditor} from 'monaco-editor';
import {createEffect, createSignal, onMount} from 'solid-js'
import loader from '@monaco-editor/loader';

self.MonacoEnvironment = {
    getWorker: function (workerId, label) {
        const getWorkerModule = (moduleUrl, label) => {
            return new Worker(self.MonacoEnvironment.getWorkerUrl(moduleUrl), {
                name: label,
                type: 'module'
            });
        };

        switch (label) {
            case 'json':
                return getWorkerModule('/monaco-editor/esm/vs/language/json/json.worker?worker', label);
            case 'css':
            case 'scss':
            case 'less':
                return getWorkerModule('/monaco-editor/esm/vs/language/css/css.worker?worker', label);
            case 'html':
            case 'handlebars':
            case 'razor':
                return getWorkerModule('/monaco-editor/esm/vs/language/html/html.worker?worker', label);
            case 'typescript':
            case 'javascript':
                return getWorkerModule('/monaco-editor/esm/vs/language/typescript/ts.worker?worker', label);
            default:
                return getWorkerModule('/monaco-editor/esm/vs/editor/editor.worker?worker', label);
        }
    }
};
// export class createMonaco {
//   static initial = loader.init();
//   constructor() {
//     return createMonaco.initial.then(a=>a);
//   }
// }
// loader.init().then(x => createMonaco.static = x);
createMonaco.static = await loader.init()

//
async function createMonaco() {
    console.log("create", await createMonaco.static)
    return createMonaco.static;
}

//
// console.log("global:",createMonaco())
export default function (props) {
    // const model = () => mEditor.getModel(Uri.parse(props.url));
    const [monaco, setMonaco] = createSignal(undefined);
    setMonaco(createMonaco())

    // <div style={`height: 50vh;
    // text-align: left`} onLoad={()=>console.log('change',event)}></div>
    // )
    let [editor, setEditor] = createSignal(null)
    // const track = createReaction(() => {
    // createEffect(()=>
    // batch(() => {
    // onCleanup(() =>
    // monaco().editor.create(editorRef, {
    //
    let elementRef = <div style={`height: 50vh;
    text-align: left;width: 100%`} onLoad={() => console.log('change')}></div>
onMount(()=>{
    monaco().then(x => {
        return (x.editor.create(elementRef, {
            value: "function hello() {\n\talert('Hello world!');\n}",
            language: 'javascript',
            automaticLayout: true
        }));
    }).then(x => setEditor(x))
    console.log("apply mo")})
    console.log()
    // createEffect()

// )
    // track(() => monaco())
    // createEffect(() => editorRef)
    // let editor;
    // let parent;
    // onMount(() => {
    //         editor = mEditor.create(parent, {
    //             value: "function hello() {\n\talert('Hello world!');\n}",
    //             language: 'javascript'

    // model: null,
    // automaticLayout: true,
    // readOnly: props.disabled,
    // fontSize: zoomState.fontSize,
    // lineDecorationsWidth: 5,
    // lineNumbersMinChars: 3,
    // padding: {top: 15},
    // minimap: {
    //     enabled: props.withMinimap,
    // },
    // });
    /*
                editor.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
                    if (editor) {
                        // auto-format
                        editor.getAction('editor.action.formatDocument')?.run();
                        // auto-fix problems
                        // props.displayErrors && editor.getAction('eslint.executeAutofix')?.run();
                        editor.focus();
                    }
                });
    */
    // editor.onDidChangeModelContent(() => {
    //     const code = editor.getValue();
    //     props.onDocChange?.(code);
    //     runLinter(code);
    // });
    // }
    // )
    // onCleanup(() => editor?.dispose());
    /*

    createEffect(() => {
        editor.setModel(model());
        // liftOff();
        (()=>{})()
    });
*/
    // createEffect(() => {
    //     mEditor.setTheme(props.isDark ? 'vs-dark-plus' : 'vs-light-plus');
    // });

    // createEffect(() => {
    //     const fontSize = zoomState.fontSize;
    //     editor.updateOptions({fontSize});
    // });

    // createEffect(() => {
    //     languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    //         noSemanticValidation: !props.displayErrors,
    //         noSyntaxValidation: !props.displayErrors,
    //     });
    // });

    // createEffect(() => {
    //     if (props.displayErrors) {
    //         run on mount and when displayLintMessages is turned on
    // runLinter(editor.getValue());
    // } else {
    //     reset eslint markers when displayLintMessages is turned off
    // const m = model();
    // m && mEditor.setModelMarkers(m, 'eslint', []);
    // }
    // });

    // onMount(() => {
    //     props.onEditorReady?.(editor, {Uri, editor: mEditor});
    // });

return elementRef
    // return (<div ref={elementRef} style={`height: 50vh;
    // text-align: left;width: full`} onLoad={() => console.log('change')}></div>);
}

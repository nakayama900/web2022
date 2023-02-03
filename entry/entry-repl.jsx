// import { remark } from "remark";
// import { run, compile } from '@mdx-js/mdx';
import { MDXProvider } from '@mdx-js/react';
import * as runtime from 'react/jsx-runtime';
import React from 'react';
// import {createRoot}from "react"
import * as ReactDOM from 'react-dom/client';
import Editor from '/Editor.jsx';

export default function() {
  let elem = document.getElementById('p2-tab2');
  /* const text = compile('# hi', {
    outputFormat: 'function-body' /* …otherOptions ,
  }).toString()`
<!-- nvdfklnklndlk-->
<!--  <Editor />-->
<div >aaaaaaaaaaa</div>
  `; */
  const text = `
# Hello World

This is an example of using an mdx string in a React component.
`;
  // const { default: Content } = run(text, runtime);
  // console.log('Content', Content);
  console.log(elem);
  console.log(text);
  // const root = ReactDOM.createRoot(elem);
  // root.render(MDXComponent);
  ReactDOM.render(<MDXComponent></MDXComponent>, elem);
  console.log(mdx(`aaaaaaaaaaaaaaaaaaaaaaaaaaaa`));
}
const MDXComponent = () => {
  return <MDXProvider>{`#test`}</MDXProvider>;
};

import { For } from "solid-js";

export default function(props) {
  return (
    <For each={props.list}>{(vlist, i) =>
      <For each={vlist}>{(v, i) =>
        <input type={"checkbox"} value={v}></input>
      }</For>
    }</For>
  );
}
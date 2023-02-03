// @type
import * as a from "../sdk/beat.js";
import { createEffect, createSignal, For } from "solid-js";
import { syncBeatPref } from "../sdk/beat.js";

let loglist = [];
export default function() {
  const [played, setPlayed] = createSignal(false);
  const [rythm, setRythm] = createSignal(0);
  const [bpm, setBPM] = createSignal(120);

  function togglePlay() {
    if ("togglePlay" in loglist) console.log("togglePlay", played());
    setPlayed(!played());
  }

  createEffect(() => {
    if ("effect1" in loglist) console.log("played", played());

    if (played()) {
      syncBeatPref(a.rhythmData[rythm()].kick, a.rhythmData[rythm()].snare, a.rhythmData[rythm()].hihat);
      a.play();
    } else {
      if ("effect1 stop" in loglist) console.log("stop");
      a.stop();
    }

  });
  // a.selectRythm();

  //@param {Event} e
  function changeRythm(i) {
    return function(e) {
      const beat = a.getBeatRhythm(i);
      a.getBeatRhythm(
        i);
      // a.rhythmData[i]);
      setRythm(i);
      setPlayed(true)
    };
  }

  createEffect(() => {
    if ("effect2" in loglist) console.log("effect 2\nrythm", rythm());
    let beat = a.getBeatRhythm(rythm());
    if (played) {
      a.cancel();
      a.play();
      a.syncBeatPref(beat.kick, beat.snare, beat.hihat);
    } else {
      Tone.Transport.cancel();
      a.syncBeatPref(beat.kick, beat.snare, beat.hihat);
    }
  });

  function syncBPM(e) {
    a.setBPM(e.target.value);
    setBPM(e.target.value);
  }


  return (
    <>
      <span>
        <button onClick={togglePlay}>
          {() => played() ? "▶" : "■"}</button>
      </span>
      <div>
        <section>
          <h2>BPM: <span>{bpm}</span></h2>
          <input type="range" name="range" min="30" max="240" value="120" onInput={syncBPM} />
        </section>
        <section >
          <h2>リズム: <span >{rythm}</span></h2>
          <div class={"grid grid-cols-4 "}>
            <For each={a.rhythmData}>
              {(v, i) => <label class={"block"}><input type="radio" name={'baetSelect'} value={v.value}
                                                       onInput={changeRythm(i())} />{v.value}</label>
              }</For></div>
        </section>
      </div>
    </>
  );
}

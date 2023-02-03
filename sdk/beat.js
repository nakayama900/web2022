import * as Tone from "tone";
// @typedef {typeof import('tone')} Tone
// @typedef {typeof import('tone').MembraneSynth} Tone.MembraneSynth
// @typedef {typeof import('tone').NoiseSynth} Tone.NoiseSynth
// @typedef {typeof import('tone').Transport} Tone.Transport
// @typedef {typeof import('tone').TransportTime} Tone.TransportTime
// @typedef {typeof import('tone').TransportTimeClass} Tone.TransportTimeClass

// definition of action
const kickSynth = () => {
  membraneKick.triggerAttackRelease("C0", "2n");
};
const snareSynth = () => {
  noiseSnare.triggerAttackRelease("8n");
};
const hiHatSynth = () => {
  noiseHiHat.triggerAttackRelease("32n");
};

//data start
let membraneKickOpts = {
  pitchDecay: 0.001,
  envelope: {
    attack: 0.001,
    decay: 0.75,
    sustain: 0.01,
    release: 0.01
  },
  volume: 25
};

let noiseSnareOpts = {
  envelope: {
    attack: 0.001,
    decay: 0.5,
    sustain: 0.01
  }
};

let noiseHiHatOpts = {
  type: "brown",
  envelope: {
    attack: 0.001,
    decay: 0.03,
    sustain: 0
  }
};
//constructor
const membraneKick = new Tone.MembraneSynth(membraneKickOpts).toDestination();
const noiseSnare = new Tone.NoiseSynth(noiseSnareOpts).toDestination();
const noiseHiHat = new Tone.NoiseSynth(noiseHiHatOpts).toDestination();
// membraneKick.volume.value = 5;
// noiseSnare.volume.value = 5;
// noiseHiHat.volume.value = 5;


export const rhythmData = [
  {
    value: "1",
    beatNumber: 1,
    kickRhythm: [0],
    snareRhythm: []

  },
  {
    value: "2",
    beatNumber: 2,
    kickRhythm: [0],
    snareRhythm: [1]
  },
  {
    value: "3",
    beatNumber: 3,
    kickRhythm: [0],
    snareRhythm: [1, 2]
  },
  {
    value: "4",
    beatNumber: 4,
    kickRhythm: [0, 2],
    snareRhythm: [1, 3]
  },
  {
    value: "5",
    beatNumber: 5,
    kickRhythm: [0],
    snareRhythm: [3]
  },
  {
    value: "6",
    beatNumber: 6,
    kickRhythm: [0],
    snareRhythm: [3]
  },
  {
    value: "7",
    beatNumber: 7,
    kickRhythm: [0, 4],
    snareRhythm: [2, 6]
  },
  {
    value: "8",
    beatNumber: 8,
    kickRhythm: [0, 4],
    snareRhythm: [2, 6]
  },
  {
    value: "12",
    beatNumber: 12,
    kickRhythm: [0, 6],
    snareRhythm: [3, 9]
  },
  {
    value: "シャッフル",
    beatNumber: 12,
    kickRhythm: [0, 6],
    snareRhythm: [3, 9],
    shuffle: true
  },
  {
    value: "16",
    beatNumber: 16,
    kickRhythm: [0, 8],
    snareRhythm: [4, 12]
  },
  {
    value: "24",
    beatNumber: 24,
    kickRhythm: [0, 12],
    snareRhythm: [6, 18]
  },
  {
    value: "Swing16",
    beatNumber: 24,
    kickRhythm: [0, 12],
    snareRhythm: [6, 18],
    shuffle: true
  },
  {
    value: "32",
    beatNumber: 32,
    kickRhythm: [0, 16],
    snareRhythm: [8, 24]
  }
];
//data end

// getter
let getRhythmData = (i) => {
  const source = rhythmData[i];
  let beatLen = 4 / source.beatNumber;
  return {
    data: source,
    beatVal: source.value,
    beatNum: source.beatNumber,
    beatLen: beatLen,
    kickRhythm: source.kickRhythm,
    snareRhythm: source.snareRhythm,
    shuffle: source.shuffle
  };
};

// gen Pref
const genRhythm = (beatNmb, beatLen, Array) => {
  let rhythm = [];
  for (let i = 0; i < Array.length; i++) {
    rhythm.push("0:" + beatLen * Array[i] + ":0");
  }
  return rhythm;
};
const genRhythm4HiHat = (beatNmb, beatLen, shuffle) => {
  let rhythm = [];
  for (let i = 0; i < beatNmb; i++) {
    if (!(shuffle && i % 3 === 1)) {
      rhythm.push("0:" + beatLen * i + ":0");
    }
  }
  return rhythm;
};

export const getBeatRhythm = (i) => {
  console.log(i);
  let data = getRhythmData(i);
  console.log(data);
  const {
      kickRhythm: kickRhythm,
      beatLen: beatLen,
      beatNum: beatNum,
      shuffle: shuffle,
      snareRhythm: snareRhythm
    } = data
  return {
    kick: genRhythm(beatNum, beatLen, kickRhythm),
    snare: genRhythm(beatNum, beatLen, snareRhythm),
    hiHat: genRhythm4HiHat(beatNum, beatLen, shuffle)
  };
};


//変更後に再生開始
export function syncBeatPref(kickRtm, snareRtm, hiHatRtm) {
  let kickPart = new Tone.Part(kickSynth, kickRtm).start();
  let snarePart = new Tone.Part(snareSynth, snareRtm).start();
  let hiHatPart = new Tone.Part(hiHatSynth, hiHatRtm).start();

  kickPart.loop = true;
  snarePart.loop = true;
  hiHatPart.loop = true;
}
const defRhythm = getBeatRhythm(7);
syncBeatPref(defRhythm.kick, defRhythm.snare, defRhythm.hiHat);


// someMinimal wrap for export
export const setBPM = (BPM) => {
  Tone.Transport.bpm.value = BPM;
};
export const play = () => {
  console.log("play");
  Tone.Transport.start();
};
export const stop = () => {
  console.log("stop");
  Tone.Transport.stop();
};
export const cancel = () => {
  Tone.Transport.cancel();
};
export const setVolume = (i) => {
  membraneKick.volume.value = i;
  noiseSnare.volume.value = i;
  noiseHiHat.volume.value = i;
};

// TODO: ToneJSに非依存の部分を分割
---
name: ashes-of-time
description: Emotional melodic dubstep. Massive supersaw chords, heavy halftime beats, crying leads, and deep sidechained basslines.
tempo: 0.583 cps (~140 BPM)
key: G minor
duration: ~3.2 minutes
---

# Track 1: Ashes of Time

```javascript
// ILLENIUM & SEVEN LIONS STYLE - ASHES OF TIME
// 112 Cycles of Emotional Melodic Dubstep in G Minor
setcpm(140/4)

// === 1. ATMOSPHERE & FX (Setting the mood) ===
let noise = s("white").lpf(350).gain(0.04).room(1)
let riser = s("white").lpf(sine.range(150, 4500).slow(16)).gain(0.08)
let impact = note("g1").s("gm_orchestra_hit").gain(0.7).room(0.8)

// === 2. VOCALS ===
let vocalIntro = n("0 ~ 3 ~ 7 ~ 5 ~").scale("G3:minor").s("gm_voice_oohs").gain(0.38).room(0.6)
let vocalChops = n("7 7 [7 5] ~ 5 5 [5 3] ~").scale("G3:minor").s("gm_choir_aahs").gain(0.35).room(0.6).delay(0.2)
let vocalBuild = n("7 7 7 7 10 10 10 10").scale("G3:minor").s("gm_choir_aahs").gain(0.38).clip(0.15).room(0.5)

// === 3. MELODIC KEYS & PADS ===
let piano = note("<[g3,bb3,d4] [eb3,g3,bb3] [bb2,d3,f3] [f3,a3,c4]>").s("gm_piano").gain(0.48).room(0.5)
let pad = note("<[g2,bb2,d3] [eb2,g2,bb2] [bb1,d2,f2] [f2,a2,c3]>").s("gm_pad_warm").gain(0.24).attack(1.2).release(2.5).room(0.8)

// === 4. CHORDS (SUPERSAWS) ===
// Intro/Verse: standard lowpass-filtered supersaw chords
let sawChords = note("<[g3,bb3,d4,g4] [eb3,g3,bb3,eb4] [bb2,d3,f3,bb3] [f3,a3,c4,f4]>").s("supersaw").gain(0.45).room(0.4).lpf(3000).duckorbit(1).duckdepth(0.6)
let sawChordsHigh = note("<[g4,bb4,d5,g5] [eb4,g4,bb4,eb5] [bb3,d4,f4,bb4] [f4,a4,c5,f5]>").s("supersaw").gain(0.32).room(0.5).lpf(5000).duckorbit(1).duckdepth(0.6)

// Drop: modulated supersaw chords (wobble/LFO)
let sawChordsDrop = note("<[g3,bb3,d4,g4] [eb3,g3,bb3,eb4] [bb2,d3,f3,bb3] [f3,a3,c4,f4]>").s("supersaw").gain(sine.range(0.1, 0.55).fast(2)).room(0.45).lpf(sine.range(800, 5000).fast(2)).duckorbit(1).duckdepth(0.7)
let sawChordsDropHigh = note("<[g4,bb4,d5,g5] [eb4,g4,bb4,eb5] [bb3,d4,f4,bb4] [f4,a4,c5,f5]>").s("supersaw").gain(sine.range(0.05, 0.38).fast(2)).room(0.55).lpf(sine.range(1200, 7000).fast(2)).duckorbit(1).duckdepth(0.7)

// === 5. LEAD & ARPEGGIOS ===
let lead = n("<[12 ~ 10 7] [~ 10 ~ 7] [8 ~ ~ 10] [~ 7 5 ~]>").scale("G4:minor").s("supersaw").gain(0.38).room(0.55).delay(0.25).vib(4).vibmod(0.15).duckorbit(1).duckdepth(0.4)
let arp = n("0 3 7 10 12 10 7 3").scale("G4:minor").s("triangle").gain(0.28).lpf(sine.range(1200, 4000).slow(8)).room(0.4).delay(0.2).duckorbit(1).duckdepth(0.3)
let arpDrop = n("0 3 7 10 12 14 12 10 7 3 0 3 7 10 12 14").scale("G5:minor").s("sine").gain(0.22).room(0.6).delay(0.15).duckorbit(1).duckdepth(0.3).fast(2)

// === 6. BASSES ===
let subBass = note("<g1 eb1 bb0 f1>").s("sine").gain(0.65).lpf(90).duckorbit(1).duckdepth(0.65)
let midBass = note("<g1 eb1 bb0 f1>").s("sawtooth").gain(0.42).lpf(300).lpq(4).distort(0.45).duckorbit(1).duckdepth(0.55)
let midBassDrop = note("<g1 eb1 bb0 f1>").s("sawtooth").gain(0.45).lpf(sine.range(150, 600).fast(2)).lpq(6).distort(0.5).duckorbit(1).duckdepth(0.6)

// === 7. DRUMS (Routing to Orbit 1 for Sidechain Triggering) ===
// Verse: simple garage vibe
let kickSimple = s("bd ~ ~ ~ ~ ~ ~ ~").gain(0.95).orbit(1)
let snareSimple = s("~ ~ ~ ~ sd ~ ~ ~").gain(0.9).orbit(1)
let hats = s("hh*8").gain("0.4 0.25 0.35 0.2").room(0.2)

// Drop: heavy halftime dubstep beats
let kickDrop = s("bd ~ ~ bd ~ ~ ~ bd").gain(1.0).orbit(1)
let snareDrop = s("~ ~ ~ ~ sd ~ ~ ~").gain(0.95).orbit(1)
let clapDrop = s("~ ~ ~ ~ cp ~ ~ ~").gain(0.75).room(0.4).orbit(1)
let hatsDrop = s("hh*16").gain("0.45 0.2 0.35 0.25 0.4 0.2 0.35 0.2").room(0.2)
let openHat = s("~ ~ ~ ~ ~ ~ oh ~").gain(0.4).room(0.3)
let shaker = s("shaker*16").gain(0.15)

// === THE ARRANGEMENT - 112 Cycles = 3m 12s ===
arrange(
  // INTRO - The memory fades in (0 - 16c)
  [4, stack(noise, pad.lpf(400), piano.gain(0.3))],
  [4, stack(noise, pad, piano, vocalIntro)],
  [4, stack(noise, pad, piano, vocalIntro, subBass.gain(0.4))],
  [4, stack(noise, pad, piano, vocalChops, subBass, hats.gain(0.2))],

  // VERSE - Walking in the rain (16c - 32c)
  [8, stack(kickSimple, hats, snareSimple.gain(0.6), piano, subBass, midBass.lpf(200), vocalChops)],
  [8, stack(kickSimple, hats, snareSimple, sawChords.lpf(1200), subBass, midBass, arp.lpf(1500), vocalChops)],

  // BUILD-UP - The tension rises (32c - 40c)
  [4, stack(kickSimple.fast(2), hats, sawChords.lpf(2000), arp, riser.gain(0.06), vocalBuild)],
  [4, stack(kickSimple.fast(4), sawChordsHigh.lpf(3500), arp, riser.gain(0.12), vocalBuild.fast(2))],

  // PRE-DROP - Take a breath (40c - 42c)
  [2, stack(vocalChops.slow(2).room(0.9), riser.gain(0.02))],

  // DROP 1 - EXPLOSION OF EMOTION (42c - 58c)
  [8, stack(impact, kickDrop, snareDrop, clapDrop, hatsDrop, subBass, midBassDrop, sawChordsDrop, sawChordsDropHigh, lead)],
  [8, stack(kickDrop, snareDrop, clapDrop, hatsDrop, openHat, shaker, subBass, midBassDrop, sawChordsDrop, sawChordsDropHigh, lead, arpDrop)],

  // BREAKDOWN - Sifting through the ashes (58c - 74c)
  [8, stack(noise, pad.room(0.9), piano, vocalIntro.slow(2))],
  [8, stack(noise, pad, piano, vocalChops, subBass.gain(0.4), arp.lpf(1200))],

  // BUILD-UP 2 - One last fight (74c - 82c)
  [4, stack(kickSimple.fast(2), hats, sawChords.lpf(2200), arp, riser.gain(0.06), vocalBuild)],
  [4, stack(kickSimple.fast(4), sawChordsHigh.lpf(4000), arp, riser.gain(0.12), vocalBuild.fast(2))],

  // PRE-DROP 2 - Brace yourself (82c - 84c)
  [2, stack(vocalChops.slow(2).room(0.9), riser.gain(0.02))],

  // DROP 2 - THE ULTIMATE PEAK (84c - 100c)
  [8, stack(impact, kickDrop, snareDrop, clapDrop, hatsDrop, subBass, midBassDrop, sawChordsDrop, sawChordsDropHigh, lead, arpDrop)],
  [8, stack(kickDrop, snareDrop, clapDrop, hatsDrop, openHat, shaker, subBass, midBassDrop.distort(0.6), sawChordsDrop, sawChordsDropHigh.gain(0.45), lead.trans(12), arpDrop.fast(2))],

  // OUTRO - Into the light (100c - 112c)
  [4, stack(kickSimple, hats, snareSimple.gain(0.6), piano, subBass, midBass.lpf(180), pad)],
  [4, stack(noise, pad, piano, vocalIntro)],
  [4, stack(noise, pad.room(1).gain(0.15), piano.gain(0.3))]
)
```

## Structure

| Section | Cycles | What's Happening |
|---------|--------|------------------|
| INTRO | 16 | 🌧️ Ambient rain & soft piano chords. Bass & vocal pads enter. |
| VERSE 1 | 16 | 🌑 Chill halftime garage groove with filtered saws and arps. |
| BUILD-UP | 8 | 🚨 Tension rises: snare speeds up, filter sweeps open, riser builds. |
| PRE-DROP | 2 | 😭 Silence, except for a lonely vocal chop. |
| DROP 1 | 16 | 💥 EXPLODE - Heavy dubstep beat with chord wobbles and sweeping lead. |
| BREAKDOWN | 16 | ✨ Relieving breakdown: soft piano and ooh vox. |
| BUILD-UP 2| 8 | 🚨 Second build. Snare speeds up again. |
| PRE-DROP 2| 2 | 😭 Short vocal fill before the ultimate peak. |
| DROP 2 | 16 | 🔥 PEAK - Lead transposed up +12, distorted mid-bass, double speed arps. |
| OUTRO | 12 | 🌅 Comedown groove fading back to piano and rain noise. |

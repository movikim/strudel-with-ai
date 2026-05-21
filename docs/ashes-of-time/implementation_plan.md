# Implementation Plan - Melodic Dubstep Composition (G Minor, 140 BPM)

Composing and playing a complete, studio-quality Melodic Dubstep track of ~3 minutes in length, featuring multi-layered supersaw chords, heavy halftime drums, sidechain compression, arpeggios, vocals, and a dynamic arrangement.

## User Review Required

> [!IMPORTANT]
> The track will be composed using **Strudel live-coding syntax** and sent to the local REPL on `http://localhost:3000` to be played in your browser automatically.
> 
> **Key Choices & Sound Design:**
> - **Tempo:** 140 BPM (`setcps(0.5833)` or `setcpm(140/4)`).
> - **Key:** G Minor, a classic, highly emotional signature key for melodic dubstep.
> - **Sidechain Compression:** We will route the Kick and Snare to **Orbit 1** and apply `.duckorbit(1).duckdepth(0.65)` to the chords, basses, and pads. This ensures the drums punch through the massive walls of sound.
> - **Supersaw Wobble:** We will use LFO modulation (`sine.range(800, 5000).fast(2)`) on the low-pass filter (LPF) and gain of the drop chords to create the characteristic pulsing wobble.

## Proposed Changes

### [Track Creation]

#### [NEW] [01-ashes-of-time.md](file:///Users/movi/GitRepo/strudel-claude/tracks/ILLENIUM/01-ashes-of-time.md)
We will create a new directory `tracks/ILLENIUM` and save the complete song code here. Saving files locally allows you to keep the track in your library.

The song will use the following structure:
- **Intro (16 cycles / ~30s):** Begins with rain noise, ambient pad, and emotional piano chords. Vocal pads and a sub-bass fade in gradually.
- **Verse (16 cycles / ~30s):** A soft halftime garage/chill beat enters, with low-pass filtered chords and sparkling arpeggios.
- **Build-up (8 cycles / ~15s):** The snare/kick speed up, the low-pass filters open, and a white noise riser builds tension.
- **Pre-drop (2 cycles / ~4s):** Silence, except for a reverberated vocal chop.
- **Drop 1 (16 cycles / ~30s):** Halftime beat drops with massive wobbling supersaw chords, deep sub-bass, grinding mid-bass, and a melodic lead synth.
- **Breakdown (16 cycles / ~30s):** Sudden silence, fading into soft piano, vocal oohs, and ambient pads to let the track breathe.
- **Build-up 2 (8 cycles / ~15s):** Snare roll and rising pitch sweep build up to the final peak.
- **Pre-drop 2 (2 cycles / ~4s):** Short vocal fill.
- **Drop 2 - Peak Drop (16 cycles / ~30s):** Absolute peak! The lead is transposed up an octave (`.trans(12)`), the mid-bass is distorted, and the arpeggio plays at double speed.
- **Outro (12 cycles / ~22s):** Comedown garage groove, fading back into the soft piano chords and ambient rain, dying out to silence.

**Total duration:** 112 cycles at 140 BPM = 3 minutes 12 seconds.

## Verification Plan

### Automated/System Verification
1. We will write the track code to `tracks/ILLENIUM/01-ashes-of-time.md`.
2. We will test sending a `POST` request to `http://localhost:3000/api/code` with the code payload.
3. We will send a `POST` request to `http://localhost:3000/api/play` to trigger playback.

### Manual Verification
- You can watch the `strudel-editor` in your open browser window at `http://localhost:3000` update the code live, start playing the arrangement, and visualize the waveforms on the scope.

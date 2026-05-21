# Skill: Strudel Music Composition & Documentation Workflow

This skill guides the agent in interactively planning, composing, and documenting Strudel music tracks in collaboration with the user. It ensures high aesthetic quality, creative depth, and standardized archiving.

---

## 📋 Workflow Phases

### Phase 1: Conceptualization & Interactive Interview
Before writing any code, the agent must align with the user on the song's identity. 

1. **Initiate the Interview:** Ask the user 3–5 targeted questions to establish the creative parameters. Recommended questions:
   - **Genre/Style:** (e.g., Cyberpunk Industrial, Ambient Drone, Synthwave, Doom Metal)
   - **Mood/Atmosphere:** (e.g., crushing & inevitable, nostalgic & dreamy, high-energy, haunting)
   - **Tempo (CPS/BPM):** (e.g., slow `0.28 cps` for Doom, fast `0.8 cps` for Synthwave)
   - **Core Instruments:** (e.g., heavy saw bass, distorted guitars, FM synth pads, retro drums)
   - **Structural Intent:** (e.g., rising intro -> heavy drop -> atmospheric breakdown -> outro)
2. **Refine the Concept:** Provide a brief summary of the proposed concept based on the user's answers and wait for approval/adjustments.

---

### Phase 2: Composing & Iterative Feedback Loops
Once the concept is approved, the agent generates the Strudel code.

1. **Write the Initial Draft:** Organize the code into logical sections using comments (Drums, Bass, Guitars, Synths, Leads, Atmosphere).
2. **Follow Strudel Best Practices:**
   - Use `setcps(...)` at the very top.
   - Use descriptive variable names.
   - Leverage mini-notation cleanly (e.g., `s("bd ~ sd ~")`, `<[a1,e2] ~>`).
   - Use sound effects carefully (e.g., `.gain()`, `.room()`, `.lpf()`, `.distort()`, `.delay()`) to keep the mix clean.
   - Set up the arrangements using `arrange(...)` for multi-part song structures.
3. **Iterate:** If the user requests edits (e.g., "make the snare tighter", "change the lead melody"), apply the edits, explain the change, and provide the updated code block.

---

### Phase 3: Standardized Documentation & Archive
When the composition is finalized, save the track in the `/tracks` directory using a standardized markdown format.

1. **File Path:** `tracks/<ARTIST>/<slug-name>.md` (e.g., `tracks/DOOM/02-funeral-for-the-damned.md`)
2. **Metadata YAML Frontmatter:**
   ```yaml
   ---
   name: <Track Name in lowercase-with-hyphens>
   description: <1-sentence description of the track's mood and style>
   tempo: <cps value> cps (~<BPM value> BPM)
   key: <Key Signature, e.g., A minor, G major>
   duration: <Estimated duration, e.g., ~7.5 minutes>
   ---
   ```
3. **Markdown File Template:**
   ```markdown
   ---
   name: ashes-of-time
   description: Nostalgic synthwave with soaring leads and analog-style basslines.
   tempo: 0.5 cps (~120 BPM)
   key: E minor
   duration: ~3.5 minutes
   ---

   # Track Name

   ```javascript
   // Write the full Strudel JS code block here
   ```

   ## Structure

   | Section | Cycles | Description |
   |---------|--------|-------------|
   | Intro | 8 | Description of what happens |
   | Verse 1 | 16 | Description of what happens |
   | Chorus | 16 | Description of what happens |
   | Outro | 8 | Description of what happens |

   **Total:** <Total Cycles> cycles = ~<Duration> minutes
   ```

---

## 🔗 Compression & Share Link Generation
To make the track easily shareable to the official `strudel.cc` REPL:
- Use `LZString.compressToEncodedURIComponent(jsCode)` (from the `lz-string` library) to compress the javascript code block.
- Construct the URL as: `https://strudel.cc/?code=<COMPRESSED_STRING>`.
- Provide this clickable link to the user so they can hear it instantly in the official REPL.

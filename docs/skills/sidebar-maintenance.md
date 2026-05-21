# Skill: Strudel local UI & Sidebar Maintenance Guide

This guide details the maintenance, extension, and styling conventions of the custom sidebar UI, backend API parser, and share system implemented for the local Strudel REPL.

---

## 📂 Architecture Overview

```mermaid
graph TD
    subgraph Client [Frontend UI]
        Editor[strudel-editor.tsx]
        Button[Library Toggle Button]
        Sidebar[Sliding Sidebar Panel]
        Share[Web Share Button]
    end
    subgraph Server [Backend Next.js API]
        API[/api/tracks]
        FileSync[/api/code]
    end
    subgraph Storage [Filesystem]
        TracksFolder[(/tracks/**/*.md)]
    end

    Button -->|Toggle State| Sidebar
    Sidebar -->|Fetch Tracks| API
    API -->|Scan & Parse| TracksFolder
    Sidebar -->|Select Track| FileSync
    Share -->|LZString Compress| External[strudel.cc/?code=...]
```

---

## 🛠️ Category 1: Backend Tracks API (`src/app/api/tracks/route.ts`)

The tracks API scans `/tracks` recursively, reads frontmatter headers, and extracts javascript code blocks.

### 1. Key Responsibilities
- Parses frontmatter keys: `name`, `description`, `tempo`, `key`, `duration`.
- Extracts the JavaScript block using the pattern: `/```javascript([\s\S]*?)```/`.
- Categorizes tracks based on the immediate parent folder name (which represents the `Artist`).

### 2. Maintenance & Extension Rules
- If adding new metadata fields (e.g. `genre` or `complexity`):
  1. Update the frontmatter parser regex/logic in `/api/tracks/route.ts`.
  2. Update the TypeScript `Track` type definition in `/src/components/strudel-editor.tsx`.
  3. Add matching badges in the sidebar rendering logic.

---

## 🎨 Category 2: Frontend UI & Cyberpunk Glassmorphism (`src/components/strudel-editor.tsx`)

The UI is built using React and Tailwind CSS, following a dark, futuristic cyberpunk aesthetic.

### 1. Sidebar Layout & Sliding Transitions
- **Positioning:** Fixed to the right side of the screen (`fixed top-0 right-0 h-screen w-80 z-40`).
- **Workspace Shifting:** The main workspace wrapper has `transition-all duration-300` and shifts dynamically:
  - Sidebar Open: `pr-80` (adds `320px` right padding so the editor shrinks and is not covered by the sidebar).
  - Sidebar Closed: `pr-0`.
- **Z-Index Hierarchy:**
  - `z-50`: Floating Library Toggle Button, Shared Toast Notification.
  - `z-40`: Sliding Sidebar Panel.
  - `z-30`: Bottom controls, Audio recording preview toast.
  - `z-10`: Underlying CodeMirror editor.

### 2. Styling Tokens (Cyberpunk Aesthetics)
- **Glassmorphism:** Use `backdrop-blur-xl bg-card/65 border-l border-border/40` for the sidebar background.
- **Accents:** Use `primary` CSS variables for the neon glow borders and badges (e.g. `bg-primary/10 border-primary/20 text-primary`).
- **Gutter Clearance:** Ensure the "Library" toggle button remains in the top-right corner to prevent overlapping with the line number gutter of the editor on the left.

---

## 🔄 Category 3: Interactive Event Synced Playback
When a track is loaded from the sidebar:
1. **Syncing Code with Server (`/api/code`):** Post the selected track's code to `/api/code` to broadcast the state. This is useful for synchronization with external hardware or active listeners.
2. **Instant Playback (`loadTrack(track, true)`):**
   - Sets the code in the editor (`editor.setCode(track.code)`).
   - Introduces a small delay (`setTimeout(..., 150)`) before executing `play()` to allow the CodeMirror component to update its internal document state fully.

---

## 🔗 Category 4: URL Sharing & Compression (`lz-string`)

Sharing compositions to the official `strudel.cc` REPL requires standard `lz-string` URL-safe compression.

### 1. Frontend Web Component & CLI Script Sync
Both the Web Share button and `scripts/share.js` must remain synchronized:
```javascript
const LZString = require('lz-string'); // in Node.js
import LZString from 'lz-string'; // in React React/Next.js

const compressedCode = LZString.compressToEncodedURIComponent(jsCode);
const strudelUrl = `https://strudel.cc/?code=${compressedCode}`;
```

### 2. Validation Rule
Any shared URL generated must start with `https://strudel.cc/?code=PTAEB...` for code snippets starting with comments (`//`). Never use raw `btoa()` base64 or raw URL encoding directly for the parameter, as `strudel.cc` will fail to decompress it.

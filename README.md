# LeadTracker · VantaCrew Builder 

A single-page sales prospect tracker built with **React 18 + Vite + Tailwind CSS v3**.

No CDN warnings. No build-time surprises. Production-ready.

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Bundler | **Vite 6** | Near-instant dev server, optimised production build |
| UI | **React 18** | Hooks-based, component tree, StrictMode |
| Styling | **Tailwind CSS v3** (PostCSS) | Utility-first, zero runtime, custom theme |
| Fonts | Syne + DM Mono (Google Fonts) | Distinctive display + mono pairing |
| Persistence | `localStorage` | Client-side, no backend required |

---

## Features

| Feature | Detail |
|---|---|
| Add / edit prospects | Shared modal form, `initial` prop switches mode |
| Delete with confirmation | Separate modal, prevents accidental removal |
| Filter by stage | Dropdown + clickable counter bar (click again to clear) |
| Live search | Name, company, email — real-time |
| Stage counters | Live count per stage at top, doubles as filter toggle |
| `localStorage` persistence | `useEffect` saves on every mutation |
| Keyboard shortcuts | `Esc` closes modals · `⌘K` focuses search · `⌘Enter` submits textarea |

---

## Project structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Root — all state, filter logic, layout
├── constants.js              # STAGES, STAGE_META, SEED_DATA
├── utils.js                  # uid, fmtDate, fmtVal, load/saveProspects
└── components/
    ├── Modal.jsx             # Overlay wrapper (Esc key, click-outside)
    ├── CounterCard.jsx       # Stage counter + filter toggle button
    ├── StageBadge.jsx        # Coloured pill per stage
    ├── ProspectModal.jsx     # Add / edit form
    └── DeleteModal.jsx       # Confirmation dialog
```

---

## Architectural decisions

### 1. All state in `<App>` — single source of truth

Every prospect lives in one `useState` array at the root. Mutations (`add`, `edit`, `delete`) produce a new array; a `useEffect` persists it to `localStorage` automatically. No context, no reducer — the data set is small and the tree is shallow. One place to look when something breaks.

```js
const [prospects, setProspects] = useState(loadProspects)
useEffect(() => { saveProspects(prospects) }, [prospects])
```

### 2. Shared `ProspectModal` for add and edit

`initial={null}` → add mode. `initial={prospect}` → edit mode. The save callback (`addProspect` / `updateProspect`) is injected from the parent — the modal stays intentionless. This halves the form surface to maintain and test.

### 3. Counter bar doubles as filter navigation

Clicking a stage counter sets `stageFilter`; clicking the active one clears it (toggle). The most common interaction — filter by stage — requires one click, not a dropdown round-trip.

---

## What I'd improve with 3 more hours

1. **Column sorting** — `sortKey` + `sortDir` state, sort `filtered` before render, `<th>` cycles `asc → desc → off`
2. **Kanban toggle** — card columns grouped by stage, HTML Drag & Drop API, same `updateProspect` on drop
3. **CSV export** — `Blob` URL download of `prospects` serialised to CSV; one button, no library

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173

npm run build     # production build → dist/
npm run preview   # preview the build locally
```

## Deploy

**Netlify** — drag `dist/` to [app.netlify.com/drop](https://app.netlify.com/drop)

**Vercel**
```bash
npx vercel --prod
```

**GitHub Pages**
```bash
# vite.config.js: set base: '/repo-name/'
npm run build
npx gh-pages -d dist
```

---

*Built by [Your Name] · VantaCrew Builder Test · May 2026*
#

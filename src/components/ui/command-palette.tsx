import {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useMemo,
   useRef,
   useState,
   type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
   Search,
   LayoutGrid,
   FileText,
   BarChart3,
   Layers,
   History,
   Settings as SettingsIcon,
   CornerDownLeft,
   SearchIcon,
   type LucideIcon,
} from "lucide-react";
import { cn, relativeTime } from "@/lib/utils";
import { listMockResumesShallow } from "@/mock/resume";

// ─── types ────────────────────────────────────────────────────────────────────

type ItemKind = "nav" | "resume";

interface PaletteItem {
   id: string;
   kind: ItemKind;
   label: string;
   hint?: string;
   to: string;
   icon: LucideIcon;
}

interface CommandPaletteContextType {
   isOpen: boolean;
   openPalette: () => void;
   closePalette: () => void;
   togglePalette: () => void;
}

// ─── context ────────────────────────────────────────────────────────────────

const CommandPaletteContext = createContext<CommandPaletteContextType | undefined>(undefined);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
   const location = useLocation();
   const [isOpen, setIsOpen] = useState(false);

   const openPalette = useCallback(() => setIsOpen(true), []);
   const closePalette = useCallback(() => setIsOpen(false), []);
   const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

   // 1. Global scroll-to-top handler on page change
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
   }, [location.pathname]);

   // 2. Global Hotkey (Cmd/Ctrl + K) toggle handler
   useEffect(() => {
      function onKey(e: KeyboardEvent) {
         const isK = e.key === "k" || e.key === "K";
         if (isK && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            setIsOpen((v) => !v);
         }
      }

      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
   }, []);

   // 3. Close the palette automatically on route change
   useEffect(() => {
      setIsOpen(false);
   }, [location.pathname]);

   return (
      <CommandPaletteContext.Provider value={{ isOpen, openPalette, closePalette, togglePalette }}>
         {children}
      </CommandPaletteContext.Provider>
   );
}

export function useCommandPalette() {
   const context = useContext(CommandPaletteContext);
   if (!context) {
      throw new Error("useCommandPalette must be used within a CommandPaletteProvider");
   }
   return context;
}

// ─── constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: PaletteItem[] = [
   {
      id: "nav:dashboard",
      kind: "nav",
      label: "Dashboard",
      hint: "Overview",
      to: "/dashboard",
      icon: LayoutGrid,
   },
   {
      id: "nav:resumes",
      kind: "nav",
      label: "Resumes",
      hint: "Browse & upload",
      to: "/resumes",
      icon: FileText,
   },
   {
      id: "nav:insights",
      kind: "nav",
      label: "Insights",
      hint: "Score trends",
      to: "/insights",
      icon: BarChart3,
   },
   {
      id: "nav:versions",
      kind: "nav",
      label: "Versions",
      hint: "Compare V1 / V2 / V3",
      to: "/versions",
      icon: Layers,
   },
   {
      id: "nav:history",
      kind: "nav",
      label: "History",
      hint: "Past analyses",
      to: "/history",
      icon: History,
   },
   {
      id: "nav:settings",
      kind: "nav",
      label: "Settings",
      hint: "Profile, appearance, password",
      to: "/settings",
      icon: SettingsIcon,
   },
];

const IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/i.test(navigator.platform);

// ─── helpers ──────────────────────────────────────────────────────────────────

function scoreMatch(query: string, text: string): number {
   if (!query) return 1;
   const q = query.toLowerCase();
   const t = text.toLowerCase();
   if (!t) return 0;
   if (t.startsWith(q)) return 3;
   if (t.includes(q)) return 2;
   let qi = 0;
   for (let i = 0; i < t.length && qi < q.length; i++) {
      if (t[i] === q[qi]) qi++;
   }
   return qi === q.length ? 1 : 0;
}

// ─── trigger button ───────────────────────────────────────────────────────────

interface TriggerProps {
   onClick: () => void;
}

export function CommandPaletteTrigger({ onClick }: TriggerProps) {
   return (
      <button
         type="button"
         onClick={onClick}
         className="shadow-card hover:shadow-card-hover bg-surface hidden h-11 w-90 items-center gap-3 rounded-full border px-3 text-left transition-shadow lg:flex"
      >
         <SearchIcon
            size={16}
            className="shrink-0"
         />
         <span className="text-forground-muted flex-1 truncate text-sm">
            Search resumes, keywords, rewrites...
         </span>
         <kbd className="text-forground-muted bg-surface-2 inline-flex h-7 items-center gap-0.5 rounded-full border px-2 text-[10px] font-semibold">
            {IS_MAC ? "⌘" : "Ctrl"} K
         </kbd>
      </button>
   );
}

// ─── palette ──────────────────────────────────────────────────────────────────

export function CommandPalette() {
   const { isOpen: open, closePalette: onClose } = useCommandPalette();
   const navigate = useNavigate();
   const inputRef = useRef<HTMLInputElement>(null);
   const listRef = useRef<HTMLDivElement>(null);

   const [query, setQuery] = useState("");
   const [activeIdx, setActiveIdx] = useState(0);

   const resumes = useMemo(() => listMockResumesShallow(), []); // stable — mock never changes

   // reset + focus on open
   useEffect(() => {
      if (!open) return;
      setQuery("");
      setActiveIdx(0);
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
   }, [open]);

   // reset active on query change
   useEffect(() => {
      setActiveIdx(0);
   }, [query]);

   // scroll active item into view
   useEffect(() => {
      listRef.current
         ?.querySelector<HTMLElement>(`[data-idx="${activeIdx}"]`)
         ?.scrollIntoView({ block: "nearest" });
   }, [activeIdx]);

   const items = useMemo<PaletteItem[]>(() => {
      const resumeItems: PaletteItem[] = resumes.map((r) => ({
         id: `resume:${r._id}`,
         kind: "resume" as const,
         label: r.title,
         hint: `Updated ${relativeTime(r.updatedAt)} · ${r.versionCount} version${r.versionCount > 1 ? "s" : ""}`,
         to: `/resume/${r._id}`,
         icon: FileText,
      }));

      const pool = [...NAV_ITEMS, ...resumeItems];
      const q = query.trim();

      if (!q) return pool;

      return pool
         .map((it) => ({ it, score: scoreMatch(q, `${it.label} ${it.hint ?? ""}`) }))
         .filter((x) => x.score > 0)
         .sort((a, b) => b.score - a.score)
         .map((x) => x.it);
   }, [resumes, query]);

   const navMatches = useMemo(() => items.filter((i) => i.kind === "nav"), [items]);
   const resumeMatches = useMemo(() => items.filter((i) => i.kind === "resume"), [items]);

   function go(item: PaletteItem) {
      navigate(item.to);
      onClose();
   }

   function handleKeyDown(e: React.KeyboardEvent) {
      if (e.key === "ArrowDown") {
         e.preventDefault();
         setActiveIdx((i) => Math.min(items.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
         e.preventDefault();
         setActiveIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
         e.preventDefault();
         const it = items[activeIdx];
         if (it) go(it);
      } else if (e.key === "Escape") {
         e.preventDefault();
         onClose();
      }
   }

   let renderIdx = -1;

   function renderItem(it: PaletteItem) {
      renderIdx += 1;
      const idx = renderIdx;
      const Icon = it.icon;
      const isActive = idx === activeIdx;

      return (
         <button
            key={it.id}
            data-idx={idx}
            onMouseEnter={() => setActiveIdx(idx)}
            onClick={() => go(it)}
            className={cn(
               "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
               isActive
                  ? "dark:bg-accent-strong bg-accent-soft dark:text-forground"
                  : "hover:bg-surface-2",
            )}
         >
            <div
               className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                  isActive ? "bg-surface-2 dark:bg-surface" : "bg-surface-2 text-forground-muted",
               )}
            >
               <Icon
                  size={16}
                  strokeWidth={2}
               />
            </div>
            <div className="min-w-0 flex-1">
               <div className="truncate text-sm font-medium">{it.label}</div>
               {it.hint && <div className="text-forground-muted truncate text-xs">{it.hint}</div>}
            </div>
            {isActive && (
               <span className="text-forground-muted flex shrink-0 items-center gap-1 text-xs">
                  <CornerDownLeft size={12} /> Enter
               </span>
            )}
         </button>
      );
   }

   return (
      <AnimatePresence>
         {open && (
            <>
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                     type: "spring",
                     duration: 0.3,
                     bounce: 0.3,
                  }}
                  className="bg-forground/30 fixed inset-0 z-40 size-full backdrop-blur-sm dark:bg-black/20"
                  onClick={onClose}
               />
               <motion.div
                  className="fixed top-1/2 left-1/2 z-50 flex w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 items-start justify-center px-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0.5 }}
               >
                  <motion.div
                     role="dialog"
                     aria-label="Command palette"
                     aria-modal="true"
                     initial={{ opacity: 0, y: -8, scale: 0.98 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: -4, scale: 0.98 }}
                     transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                     className="shadow-hover bg-surface relative w-full max-w-160 overflow-hidden rounded-3xl border"
                  >
                     {/* search input */}
                     <div className="flex h-14 items-center gap-3 border-b px-5">
                        <Search
                           size={16}
                           className="text-forground-muted shrink-0"
                        />
                        <input
                           ref={inputRef}
                           value={query}
                           onChange={(e) => setQuery(e.target.value)}
                           onKeyDown={handleKeyDown}
                           placeholder="Search resumes or jump to a page..."
                           className="text-forground placeholder:text-forground-muted flex-1 bg-transparent text-sm outline-none"
                        />
                        <kbd className="bg-surface-2 text-forground-muted hidden h-6 items-center gap-1 rounded-md border px-2 text-[10px] font-medium sm:inline-flex">
                           Esc
                        </kbd>
                     </div>

                     {/* results */}
                     <div
                        ref={listRef}
                        className="max-h-[52vh] overflow-y-auto p-2"
                     >
                        {items.length === 0 && (
                           <div className="text-forground-muted py-10 text-center text-sm">
                              No matches for &ldquo;{query}&rdquo;
                           </div>
                        )}

                        {navMatches.length > 0 && (
                           <div className="mb-1">
                              <GroupLabel>Navigate</GroupLabel>
                              <div className="flex flex-col gap-0.5">
                                 {navMatches.map(renderItem)}
                              </div>
                           </div>
                        )}

                        {resumeMatches.length > 0 && (
                           <div className="mt-1">
                              <GroupLabel>Resumes</GroupLabel>
                              <div className="flex flex-col gap-0.5">
                                 {resumeMatches.map(renderItem)}
                              </div>
                           </div>
                        )}
                     </div>

                     {/* footer */}
                     <div className="bg-surface-2/60 text-forground-muted flex h-10 items-center justify-between border-t px-5 text-[11px]">
                        <div className="flex items-center gap-3">
                           <span className="flex items-center gap-1">
                              <Kbd>↑</Kbd>
                              <Kbd>↓</Kbd> to navigate
                           </span>
                           <span className="flex items-center gap-1">
                              <Kbd>↵</Kbd> to select
                           </span>
                        </div>
                        <span>
                           {items.length} result{items.length === 1 ? "" : "s"}
                        </span>
                     </div>
                  </motion.div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}

// ─── tiny display components ──────────────────────────────────────────────────

function GroupLabel({ children }: { children: React.ReactNode }) {
   return (
      <div className="text-forground-muted px-3 pt-2 pb-1 text-[10px] font-semibold tracking-wider uppercase">
         {children}
      </div>
   );
}

function Kbd({ children }: { children: React.ReactNode }) {
   return (
      <kbd className="bg-surface border-border inline-flex h-5 items-center rounded border px-1.5">
         {children}
      </kbd>
   );
}

import { useSyncExternalStore } from "react";

/**
 * Tiny shared state between the search explorer and the links that open it (hero, dock,
 * showcase). The links are ordinary `#all-features` anchors, so scrolling works without
 * JavaScript; this store only carries the extra intent: which area to show and whether to
 * focus the search box.
 */
export type ExplorerRequest = {
  /** Area to filter by, "all" for everything, or null to leave the filter unchanged. */
  area: string | null;
  focusSearch: boolean;
  /** Increments on every request, so repeating the same request still triggers. */
  id: number;
};

let current: ExplorerRequest = { area: null, focusSearch: false, id: 0 };
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function requestExplorer(area: string | null, focusSearch: boolean) {
  current = { area, focusSearch, id: current.id + 1 };
  listeners.forEach((listener) => listener());
}

export function useExplorerRequest() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => current,
  );
}

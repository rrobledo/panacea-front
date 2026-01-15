import { useCallback, useEffect, useRef } from "react";

interface ListState {
  filters: Record<string, any>;
  scrollTop: number;
  timestamp: number;
  selectedRowId?: string | number;
}

const STATE_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Hook to persist and restore list state (filters and scroll position)
 * State is stored in sessionStorage and restored when returning to the list
 *
 * @param listKey - Unique key to identify the list (e.g., "facturas", "productos")
 * @returns Object with saveState, getState, clearState functions
 */
export function useListState(listKey: string) {
  const storageKey = `list_state_${listKey}`;
  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // Save current state to sessionStorage
  const saveState = useCallback((filters: Record<string, any>, scrollTop?: number, selectedRowId?: string | number) => {
    const state: ListState = {
      filters,
      scrollTop: scrollTop ?? window.scrollY,
      timestamp: Date.now(),
      selectedRowId,
    };
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save list state:", e);
    }
  }, [storageKey]);

  // Get saved state from sessionStorage
  const getState = useCallback((): ListState | null => {
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (!stored) return null;

      const state: ListState = JSON.parse(stored);

      // Check if state has expired
      if (Date.now() - state.timestamp > STATE_EXPIRY_MS) {
        sessionStorage.removeItem(storageKey);
        return null;
      }

      return state;
    } catch (e) {
      console.warn("Failed to get list state:", e);
      return null;
    }
  }, [storageKey]);

  // Clear saved state
  const clearState = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch (e) {
      console.warn("Failed to clear list state:", e);
    }
  }, [storageKey]);

  // Restore scroll position
  const restoreScrollPosition = useCallback((scrollTop: number, delay: number = 100) => {
    setTimeout(() => {
      window.scrollTo({ top: scrollTop, behavior: "auto" });
    }, delay);
  }, []);

  // Scroll to a specific row by its data-row-key attribute
  const scrollToRow = useCallback((rowId: string | number, delay: number = 100) => {
    setTimeout(() => {
      const rowElement = document.querySelector(`tr[data-row-key="${rowId}"]`);
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "auto", block: "center" });
        // Add a brief highlight effect
        rowElement.classList.add("ant-table-row-selected");
        setTimeout(() => {
          rowElement.classList.remove("ant-table-row-selected");
        }, 2000);
      }
    }, delay);
  }, []);

  return {
    saveState,
    getState,
    clearState,
    restoreScrollPosition,
    scrollToRow,
  };
}

export default useListState;

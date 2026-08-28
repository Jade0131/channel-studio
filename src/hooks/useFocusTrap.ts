import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export function useFocusTrap<T extends HTMLElement>(
  active: boolean,
  containerRef: RefObject<T>
): void {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    previouslyFocused.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    const focusable = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const currentFocus = document.activeElement as HTMLElement;
      if (!currentFocus || !container.contains(currentFocus)) {
        e.preventDefault();
        focusable[0]?.focus();
        return;
      }

      if (e.shiftKey) {
        if (currentFocus === focusable[0]) {
          e.preventDefault();
          focusable[focusable.length - 1]?.focus();
        }
      } else {
        if (currentFocus === focusable[focusable.length - 1]) {
          e.preventDefault();
          focusable[0]?.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleEscape, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keydown', handleEscape, true);
      previouslyFocused.current?.focus();
    };
  }, [active, containerRef]);
}

import React, { useEffect } from 'react';

export default function SecurityShield() {
  useEffect(() => {
    // 1. Prevent Right-Clicks (Context Menu) silently
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent Keyboard Inspect Shortcuts & PrintScreen & Save Key
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Disable PrintScreen (deterrent) silently
      if (e.key === 'PrintScreen' || e.key === 'PrtScn') {
        e.preventDefault();
        navigator.clipboard.writeText(''); // Clear clipboard immediately to block content capture
        return false;
      }

      // Disable Ctrl+Shift+I / Cmd+Opt+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }

      // Disable Ctrl+S (Save Page)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Repeated console cleaning to defeat developer logs
    const consoleInterval = setInterval(() => {
      console.clear();
    }, 1000);

    // Apply listeners
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(consoleInterval);
    };
  }, []);

  return null;
}


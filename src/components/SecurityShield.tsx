import React, { useEffect, useState } from 'react';

export default function SecurityShield() {
  const [isScreenProtected, setIsScreenProtected] = useState(false);

  useEffect(() => {
    // 1. Prevent Right-Clicks (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      alert('Security Protocol: Content is copy-protected.');
    };

    // 2. Prevent Keyboard Inspect Shortcuts & PrintScreen & Save Key
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Disable PrintScreen (deterrent)
      if (e.key === 'PrintScreen' || e.key === 'PrtScn') {
        e.preventDefault();
        setIsScreenProtected(true);
        setTimeout(() => setIsScreenProtected(false), 2000);
        navigator.clipboard.writeText(''); // Clear clipboard
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

    // 3. Screen protection overlay when window loses focus (Anti-Screenshot/Anti-Inspector)
    const handleWindowBlur = () => {
      setIsScreenProtected(true);
    };

    const handleWindowFocus = () => {
      setIsScreenProtected(false);
    };

    // 4. Repeated console cleaning to defeat developer logs
    const consoleInterval = setInterval(() => {
      console.clear();
    }, 1000);

    // Apply listeners
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      clearInterval(consoleInterval);
    };
  }, []);

  if (isScreenProtected) {
    return (
      <div 
        className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[999999] select-none pointer-events-auto transition-opacity"
        id="security-protection-overlay"
      >
        <div className="text-center p-6 max-w-sm">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Security Protection Active</h2>
          <p className="text-sm text-slate-400">
            For security reasons, content is hidden when focusing outside of this tab or attempting to capture the screen.
          </p>
        </div>
      </div>
    );
  }

  return null;
}

import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="mb-3 theme-switcher">
          <select
        className="form-select"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="theme-ocean">🌊 Ocean</option>
        <option value="theme-forest">🌲 Forest</option>
        <option value="theme-dark">🕸️ Dark</option>
        <option value="theme-sunset">🌇 Sunset</option>
        <option value="theme-purple">🔮 Mox Purple </option>
      </select>
    </div>
  );
}

export default ThemeSelector;
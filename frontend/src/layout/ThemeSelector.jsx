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
        <option value="theme-sunset">🌇 Sunset</option>
        <option value="theme-purple">💜 Purple Elegance</option>
      </select>
    </div>
  );
}

export default ThemeSelector;
// Compare this snippet from frontend/src/layout/ThemeSelector.jsx:
// import React, { useContext } from 'react';
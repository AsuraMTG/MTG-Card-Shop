import ThemeSelector from './ThemeSelector';

export default function Header() {
  return (
    <header className="p-3 header" style={{ backgroundColor: 'var(--header-bg)', color: 'var(--text-color)' }}>
      <h1 className="text-2xl">MTG Card Shop</h1>
      <ThemeSelector />
    </header>
  );
}
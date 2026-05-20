import ToggleSwitch from './ToggleSwitch'

function ThemeToggle({ isLight, onToggle }) {
  return (
    <ToggleSwitch
      checked={isLight}
      onChange={onToggle}
      id="theme-toggle"
      icon={isLight ? '☀️' : '🌙'}
      className="theme-toggle"
      ariaLabel="Toggle dark and light mode"
    />
  )
}

export default ThemeToggle

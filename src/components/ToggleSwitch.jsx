function ToggleSwitch({
  checked,
  onChange,
  label,
  id,
  icon,
  className = '',
  ariaLabel,
}) {
  return (
    <label className={`toggle-switch ${className}`} htmlFor={id}>
      {icon && <span className="toggle-icon" aria-hidden="true">{icon}</span>}
      {label && <span className="toggle-label">{label}</span>}
      <span className={`toggle-track${checked ? ' on' : ''}`}>
        <span className={`toggle-thumb${checked ? ' on' : ''}`} />
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="toggle-input"
        aria-label={ariaLabel ?? label}
      />
    </label>
  )
}

export default ToggleSwitch

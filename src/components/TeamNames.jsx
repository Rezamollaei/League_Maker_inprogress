import { useEffect, useState } from 'react'

const MAX_NAME_LENGTH = 20

const buildFallbackNames = (teamCount) =>
  Array.from({ length: teamCount }, (_, index) => `Team ${index + 1}`)

function TeamNames({ teamCount, initialNames, onSubmit, onBack }) {
  const [names, setNames] = useState(() =>
    Array.from(
      { length: teamCount },
      (_, index) => initialNames[index] ?? `Team ${index + 1}`,
    ),
  )

  useEffect(() => {
    setNames(
      Array.from(
        { length: teamCount },
        (_, index) => initialNames[index] ?? `Team ${index + 1}`,
      ),
    )
  }, [initialNames, teamCount])

  const handleNameChange = (index, value) => {
    setNames((prevNames) =>
      prevNames.map((item, idx) =>
        idx === index ? value.slice(0, MAX_NAME_LENGTH) : item,
      ),
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const defaults = buildFallbackNames(teamCount)
    const normalized = names.map((name, index) => {
      const trimmed = name.trim()
      return trimmed ? trimmed.slice(0, MAX_NAME_LENGTH) : defaults[index]
    })
    onSubmit(normalized)
  }

  return (
    <div className="team-names">
      <div className="panel-header">
        <h2>Name your teams</h2>
        <p>Set custom team names before the season starts.</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {Array.from({ length: teamCount }, (_, index) => (
            <label className="field" key={`team-name-${index + 1}`}>
              <span>Team {index + 1} name</span>
              <input
                type="text"
                value={names[index] ?? ''}
                onChange={(event) => handleNameChange(index, event.target.value)}
                maxLength={MAX_NAME_LENGTH}
              />
              <small>Up to {MAX_NAME_LENGTH} characters</small>
            </label>
          ))}
        </div>

        <div className="actions">
          <button type="button" className="ghost" onClick={onBack}>
            Back to setup
          </button>
          <button type="submit" className="primary">
            Start matchdays
          </button>
        </div>
      </form>
    </div>
  )
}

export default TeamNames

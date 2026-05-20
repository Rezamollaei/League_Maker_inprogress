import { useState } from 'react'

const TEAM_RANGE = { min: 2, max: 10 }
const DAY_RANGE = { min: 1, max: 20 }

const clamp = (value, range) =>
  Math.min(range.max, Math.max(range.min, value))

function Setup({ onStart }) {
  const [teams, setTeams] = useState(TEAM_RANGE.min)
  const [days, setDays] = useState(7)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const teamCount = clamp(Number(teams), TEAM_RANGE)
    const dayCount = clamp(Number(days), DAY_RANGE)

    if (Number.isNaN(teamCount) || Number.isNaN(dayCount)) {
      setError('Enter valid numbers to begin.')
      return
    }

    if (
      teamCount < TEAM_RANGE.min ||
      teamCount > TEAM_RANGE.max ||
      dayCount < DAY_RANGE.min ||
      dayCount > DAY_RANGE.max
    ) {
      setError(
        `Teams must be ${TEAM_RANGE.min}-${TEAM_RANGE.max} and days ${DAY_RANGE.min}-${DAY_RANGE.max}.`,
      )
      return
    }

    setError('')
    onStart({ teams: teamCount, days: dayCount })
  }

  return (
    <div className="setup">
      <div className="panel-header">
        <h2>Set up your league</h2>
        <p>Choose how many teams are playing and the number of matchdays.</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field">
            <span>Number of teams</span>
            <input
              type="number"
              min={TEAM_RANGE.min}
              max={TEAM_RANGE.max}
              value={teams}
              onChange={(event) => setTeams(event.target.value)}
              required
            />
            <small>
              Between {TEAM_RANGE.min} and {TEAM_RANGE.max}
            </small>
          </label>
          <label className="field">
            <span>Number of days</span>
            <input
              type="number"
              min={DAY_RANGE.min}
              max={DAY_RANGE.max}
              value={days}
              onChange={(event) => setDays(event.target.value)}
              required
            />
            <small>
              Between {DAY_RANGE.min} and {DAY_RANGE.max}
            </small>
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="actions">
          <button type="submit" className="primary">
            Start league
          </button>
        </div>
      </form>
    </div>
  )
}

export default Setup

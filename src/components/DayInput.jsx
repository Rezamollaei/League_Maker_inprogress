import { useEffect, useState } from 'react'
import Leaderboard from './Leaderboard'

const buildPoints = (teamCount) =>
  Array.from({ length: teamCount }, () => '0')

function DayInput({ day, totalDays, teamCount, teams, onSubmitDay, onRestart }) {
  const [points, setPoints] = useState(() => buildPoints(teamCount))
  const [error, setError] = useState('')

  useEffect(() => {
    setPoints(buildPoints(teamCount))
    setError('')
  }, [day, teamCount])

  const handleChange = (index, value) => {
    setPoints((prevPoints) =>
      prevPoints.map((item, idx) => (idx === index ? value : item)),
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalized = points.map((value) => Number(value))

    if (normalized.some((value) => Number.isNaN(value))) {
      setError('Please enter valid points for every team.')
      return
    }

    setError('')
    onSubmitDay(normalized)
  }

  return (
    <div className="day-input">
      <div className="panel-header">
        <h2>Matchday {day}</h2>
        <p>Enter today’s points and review the live standings.</p>
      </div>

      <div className="content-grid">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {Array.from({ length: teamCount }, (_, index) => (
              <label className="field" key={`team-${index + 1}`}>
                <span>Team {index + 1}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={points[index]}
                  onChange={(event) => handleChange(index, event.target.value)}
                  required
                />
              </label>
            ))}
          </div>

          {error && <p className="error">{error}</p>}

          <div className="actions">
            <button type="button" className="ghost" onClick={onRestart}>
              Restart
            </button>
            <button type="submit" className="primary">
              Save day {day}
            </button>
          </div>
        </form>

        <div>
          <Leaderboard teams={teams} />
          <div className="progress">
            Day {day} of {totalDays}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayInput

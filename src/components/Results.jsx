import Leaderboard from './Leaderboard'

function Results({ teams, onRestart }) {
  const maxScore = Math.max(...teams.map((team) => team.total))
  const winners = teams.filter((team) => team.total === maxScore)

  return (
    <div className="results">
      <div className="panel-header">
        <h2>Final results</h2>
        <p>The season is complete. Here is the overall winner.</p>
      </div>

      <div className="winner-card">
        <div>
          <p className="winner-label">Overall winner</p>
          <h3>
            {winners.length > 1
              ? winners.map((team) => team.name).join(', ')
              : winners[0]?.name}
          </h3>
        </div>
        <div className="winner-score">
          <span>{maxScore}</span>
          <small>points</small>
        </div>
      </div>

      <Leaderboard teams={teams} />

      <div className="actions">
        <button type="button" className="primary" onClick={onRestart}>
          Start a new league
        </button>
      </div>
    </div>
  )
}

export default Results

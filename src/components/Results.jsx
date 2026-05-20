import Leaderboard from './Leaderboard'

function Results({ teams, onRestart }) {
  const maxScore = Math.max(...teams.map((team) => team.total))
  const winners = teams.filter((team) => team.total === maxScore)

  return (
    <div className="results">
      <div className="results-effects" aria-hidden="true" />
      <div className="panel-header">
        <h2>Final whistle</h2>
        <p>The season is complete. Crown the champions and review the table.</p>
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
          <span className="score-ticker">{maxScore}</span>
          <small>PTS</small>
        </div>
      </div>

      <Leaderboard
        teams={teams}
        title="Full standings"
        subtitle="Final totals"
        variant="final"
      />

      <div className="actions">
        <button type="button" className="primary" onClick={onRestart}>
          Start a new league
        </button>
      </div>
    </div>
  )
}

export default Results

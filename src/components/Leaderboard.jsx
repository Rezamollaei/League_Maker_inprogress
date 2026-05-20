function Leaderboard({ teams }) {
  if (!teams.length) {
    return (
      <div className="leaderboard empty">
        <h3>Leaderboard</h3>
        <p>Scores will appear once the league begins.</p>
      </div>
    )
  }

  const sortedTeams = [...teams].sort((a, b) => b.total - a.total)
  const maxScore = sortedTeams[0]?.total ?? 0

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h3>Live leaderboard</h3>
        <span className="hint">Cumulative points</span>
      </div>
      <div className="leaderboard-list">
        {sortedTeams.map((team, index) => {
          const isLeader = team.total === maxScore
          return (
            <div
              className={`leader-row${isLeader ? ' leader' : ''}`}
              key={team.id}
            >
              <div className="leader-meta">
                <span className="rank">#{index + 1}</span>
                <div>
                  <p className="leader-name">{team.name}</p>
                  {isLeader && <span className="leader-badge">Leader 🏆</span>}
                </div>
              </div>
              <div className="leader-score">
                <span>{team.total}</span>
                <small>pts</small>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Leaderboard

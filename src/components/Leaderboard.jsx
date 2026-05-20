import { useEffect, useState } from 'react'

function Leaderboard({
  teams,
  title = 'Live leaderboard',
  subtitle = 'Cumulative points',
  variant = 'live',
}) {
  const totalsSignature = teams.map((team) => team.total).join('-')
  const [animationSeed, setAnimationSeed] = useState(0)

  useEffect(() => {
    if (!teams.length) {
      return
    }
    setAnimationSeed((prev) => prev + 1)
  }, [totalsSignature, teams.length])

  const rowAnimation = animationSeed % 2 === 0 ? 'rowEnter' : 'rowEnterAlt'
  const scoreAnimation = animationSeed % 2 === 0 ? 'scoreRoll' : 'scoreRollAlt'

  if (!teams.length) {
    return (
      <div className="leaderboard empty">
        <h3>{title}</h3>
        <p>Scores will appear once the league begins.</p>
      </div>
    )
  }

  const sortedTeams = [...teams].sort((a, b) => b.total - a.total)
  const maxScore = sortedTeams[0]?.total ?? 0

  return (
    <div className={`leaderboard ${variant}`}>
      <div className="leaderboard-header">
        <h3>{title}</h3>
        <span className="hint">{subtitle}</span>
      </div>
      <div className="leaderboard-list">
        {sortedTeams.map((team, index) => {
          const isLeader = team.total === maxScore
          return (
            <div
              className={`leader-row${isLeader ? ' leader' : ''}`}
              key={team.id}
              style={{
                '--row-delay': `${index * 0.08}s`,
                '--row-anim': rowAnimation,
                '--score-anim': scoreAnimation,
              }}
            >
              <div className="leader-meta">
                <span className="rank">#{index + 1}</span>
                <div>
                  <p className="leader-name">{team.name}</p>
                  {isLeader && <span className="leader-badge">Leader 🏆</span>}
                </div>
              </div>
              <div className="leader-score">
                <span className="score-ticker">{team.total}</span>
                <small>PTS</small>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Leaderboard

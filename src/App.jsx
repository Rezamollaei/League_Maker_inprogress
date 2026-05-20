import { useMemo, useState } from 'react'
import Setup from './components/Setup'
import DayInput from './components/DayInput'
import Results from './components/Results'
import './App.css'

const buildTeams = (teamCount, totals) =>
  Array.from({ length: teamCount }, (_, index) => ({
    id: index + 1,
    name: `Team ${index + 1}`,
    total: totals[index] ?? 0,
  }))

function App() {
  const [step, setStep] = useState('setup')
  const [teamCount, setTeamCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  const [currentDay, setCurrentDay] = useState(1)
  const [totals, setTotals] = useState([])

  const teams = useMemo(
    () => buildTeams(teamCount, totals),
    [teamCount, totals],
  )

  const handleStart = ({ teams: nextTeamCount, days: nextDayCount }) => {
    setTeamCount(nextTeamCount)
    setDayCount(nextDayCount)
    setTotals(Array.from({ length: nextTeamCount }, () => 0))
    setCurrentDay(1)
    setStep('day')
  }

  const handleDaySubmit = (points) => {
    setTotals((prevTotals) =>
      prevTotals.map((total, index) => total + points[index]),
    )

    if (currentDay >= dayCount) {
      setStep('results')
      return
    }

    setCurrentDay((prevDay) => prevDay + 1)
  }

  const handleRestart = () => {
    setStep('setup')
    setTeamCount(0)
    setDayCount(0)
    setTotals([])
    setCurrentDay(1)
  }

  return (
    <div className="app">
      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">League Maker</p>
            <h1>Daily Points Leaderboard</h1>
            <p className="tagline">
              Track cumulative scores and watch the standings shift each day.
            </p>
          </div>
          {step === 'day' && (
            <div className="progress-chip">
              Day {currentDay} of {dayCount}
            </div>
          )}
        </header>

        <main className="panel" key={`${step}-${currentDay}`}>
          {step === 'setup' && <Setup onStart={handleStart} />}
          {step === 'day' && (
            <DayInput
              day={currentDay}
              totalDays={dayCount}
              teamCount={teamCount}
              teams={teams}
              onSubmitDay={handleDaySubmit}
              onRestart={handleRestart}
            />
          )}
          {step === 'results' && (
            <Results teams={teams} onRestart={handleRestart} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App

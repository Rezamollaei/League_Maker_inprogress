import { useEffect, useMemo, useState } from 'react'
import Setup from './components/Setup'
import TeamNames from './components/TeamNames'
import ThemeToggle from './components/ThemeToggle'
import DayInput from './components/DayInput'
import Results from './components/Results'
import './App.css'

const THEME_STORAGE_KEY = 'league-maker-theme'

const buildDefaultTeamNames = (teamCount) =>
  Array.from({ length: teamCount }, (_, index) => `Team ${index + 1}`)

const buildTeams = (teamCount, totals, teamNames) =>
  Array.from({ length: teamCount }, (_, index) => ({
    id: index + 1,
    name: teamNames[index] ?? `Team ${index + 1}`,
    total: totals[index] ?? 0,
  }))

const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  return storedTheme === 'light' ? 'light' : 'dark'
}

function App() {
  const [step, setStep] = useState('setup')
  const [theme, setTheme] = useState(getInitialTheme)
  const [teamCount, setTeamCount] = useState(0)
  const [dayCount, setDayCount] = useState(0)
  const [currentDay, setCurrentDay] = useState(1)
  const [totals, setTotals] = useState([])
  const [teamNames, setTeamNames] = useState([])

  useEffect(() => {
    document.body.classList.toggle('light', theme === 'light')
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const teams = useMemo(
    () => buildTeams(teamCount, totals, teamNames),
    [teamCount, totals, teamNames],
  )

  const handleStart = ({ teams: nextTeamCount, days: nextDayCount, nameTeams }) => {
    const defaults = buildDefaultTeamNames(nextTeamCount)

    setTeamCount(nextTeamCount)
    setDayCount(nextDayCount)
    setTotals(Array.from({ length: nextTeamCount }, () => 0))
    setTeamNames(defaults)
    setCurrentDay(1)

    if (nameTeams) {
      setStep('team-names')
      return
    }

    setStep('day')
  }

  const handleTeamNamesSubmit = (nextTeamNames) => {
    setTeamNames(nextTeamNames)
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
    setTeamNames([])
    setCurrentDay(1)
  }

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={`app step-${step}`}>
      <div className="app-shell">
        <header className="app-header">
          <div className="app-title">
            <p className="eyebrow">League Maker</p>
            <h1>Championship Points Tracker</h1>
            <p className="tagline">
              Feed every matchday score and watch the leaderboard ignite.
            </p>
          </div>

          <div className="header-actions">
            <ThemeToggle isLight={theme === 'light'} onToggle={handleThemeToggle} />
            {step === 'day' && (
              <div className="progress-chip">
                Matchday {currentDay} / {dayCount}
              </div>
            )}
            {step === 'results' && (
              <div className="progress-chip">Season complete</div>
            )}
          </div>
        </header>

        <main className={`panel panel-${step}`} key={`${step}-${currentDay}`}>
          {step === 'setup' && <Setup onStart={handleStart} />}
          {step === 'team-names' && (
            <TeamNames
              teamCount={teamCount}
              initialNames={teamNames}
              onSubmit={handleTeamNamesSubmit}
              onBack={handleRestart}
            />
          )}
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

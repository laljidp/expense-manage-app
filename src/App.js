import './App.css'
import ExpensesLists from './components/ExpensesLists'
import { Button, ButtonGroup } from 'reactstrap'
import { useState } from 'react'
import ContributorsLists from './components/ContributorsLists'

const TABS = {
  contributors: 'Contributors',
  expenses: 'Expenses',
}

function App() {
  const [activeTab, setActiveTab] = useState(TABS.contributors)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="App">
      <ButtonGroup size="sm" className="mt-4">
        <Button
          color="primary"
          outline
          size="sm"
          active={activeTab === TABS.contributors}
          onClick={() => handleTabChange(TABS.contributors)}
        >
          {TABS.contributors}
        </Button>
        <Button
          color="primary"
          outline
          size="sm"
          active={activeTab === TABS.expenses}
          onClick={() => handleTabChange(TABS.expenses)}
        >
          {TABS.expenses}
        </Button>
      </ButtonGroup>
      <div className="mt-4">
        {activeTab === TABS.contributors ? (
          <ContributorsLists />
        ) : (
          <ExpensesLists />
        )}
      </div>
    </div>
  )
}

export default App

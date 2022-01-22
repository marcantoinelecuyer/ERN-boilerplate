import '../styles/pages/App.css'
import AppLogo from "../components/AppLogo"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppLogo/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App

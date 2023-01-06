function BoilingVerdict ({celsius}) {
  const isBoiling = celsius >= 100
  const className = isBoiling ? 'alert alert-success' : 'alert alert-info'

  return (
    <p className={className}>
      {celsius}°C {isBoiling ? `is boiling` : `is not boiling`}
    </p>
  )
}

class App extends React.Component {
  render () {
    return (
      <main className="container py-5">
        <h1 className="fw-bold mb-5">TP Celsius / Fahrenheit</h1>
        <BoilingVerdict celsius={50} />
        <BoilingVerdict celsius={110} />
      </main>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
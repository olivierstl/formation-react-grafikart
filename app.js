function BoilingVerdict ({className, celsius}) {
  if (isNaN(celsius)) {
    return (
      <p className={`${className} alert alert-warning`}>
        Please enter a correct number
      </p>
    )
  } else if (celsius) {
  const isBoiling = celsius >= 100
    const dynamicClass = isBoiling ? 'alert alert-success' : 'alert alert-info'

  return (
      <p className={`${className} ${dynamicClass}`}>
      {celsius}°C {isBoiling ? `is boiling` : `is not boiling`}
    </p>
  )
  }
  return null
}
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fieldtemp: ''
    }
  }

  render () {
    const { fieldtemp } = this.state
    return (
      <main className="container py-5">
        <h1 className="fw-bold mb-5">TP Celsius / Fahrenheit</h1>
        <BoilingVerdict
          celsius={+fieldtemp}
        />
        {/* <BoilingVerdict celsius={110} /> */}
      </main>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
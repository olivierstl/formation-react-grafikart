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

function TemperatureInput ({className, value, name, onChange, scale, children}) {
  return (
    <div className={`form-group ${className}`}>
      <label
        className="form-label"
        htmlFor={name}
      >
        {children}
      </label>
      <input
        id={name}
        className="form-control"
        name={name}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fieldtemp: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value

    this.setState({
      [fieldName]: fieldValue
    })
  }

  render () {
    const { fieldtemp } = this.state
    return (
      <main className="container py-5">
        <h1 className="fw-bold mb-5">TP Celsius / Fahrenheit</h1>
        <TemperatureInput
          className="mb-3"
          name="fieldtemp"
          value={fieldtemp}
          onChange={this.handleChange}
        >
          Enter temperature in {scaleNames['c']}
        </TemperatureInput>

        <BoilingVerdict
          celsius={+fieldtemp}
        />
        {/* <BoilingVerdict celsius={110} /> */}
      </main>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
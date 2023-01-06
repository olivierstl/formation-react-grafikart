const scaleNames = {
  c: 'Celsius',
  f: 'Farhenheit'
}

/** Convert fahrenheit to celsius */
function toCelsius (fahrenheit) {
  return (fahrenheit - 32) * 5/9
}

/** Convert celsius to fahrenheit */
function toFahrenheit (celsius) {
  return (celsius * 9/5) + 32
}

function BoilingVerdict ({className, celsius}) {
  /** IF `celsius` is not a number  */
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
        Water {isBoiling ? `is boiling` : `is not boiling`}
      </p>
    )
  }
  return null
}

function TemperatureInput ({className, value, name, onChange, children}) {
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
      scale: 'c',
      temperature: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    const newScale = fieldName === 'fahrenheit-input' ? 'f' : 'c'

    this.setState({
      scale: newScale,
      temperature: fieldValue
    })
  }

  render () {
    const { temperature, scale } = this.state
    const celsius = scale === 'c' ? temperature : toCelsius(temperature)
    const fahrenheit = scale === 'f' ? temperature : toFahrenheit(temperature)

    return (
      <main className="container py-5">
        <h1 className="fw-bold mb-5">TP Celsius / Fahrenheit</h1>

        {/* Field for celsius */}
        <TemperatureInput
          className="mb-3"
          name="celsius-input"
          value={celsius}
          onChange={this.handleChange}
        >
          Enter temperature in {scaleNames['c']}
        </TemperatureInput>

        {/* Field for fahrenheit */}
        <TemperatureInput
          className="mb-3"
          name="fahrenheit-input"
          value={fahrenheit}
          onChange={this.handleChange}
        >
          Enter temperature in {scaleNames['f']}
        </TemperatureInput>

        <BoilingVerdict
          celsius={+celsius}
        />
        {/* <BoilingVerdict celsius={110} /> */}
      </main>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector('#app'))
class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      /** Value linked to input text */
      firstname: 'Jean',
      /** Value linked to textarea */
      description: 'Small descr',
      /** Value linked to select */
      option: 'demo2',
      /** Value linked to select */
      optionmulti: ['demo2', 'demo1'],
      /** Value linked to checkbox */
      terms: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const fieldName = e.target.name
    const fieldType = e.target.type
    console.log(fieldType)
    let value = null

    /** Adapt data to set depending on field type */
    switch (fieldType) {
      /** Handle checkable changes */
      case 'checkbox':
      case 'radio':
        value = e.target.checked
        break

      /** Handle select multi */
      case 'select-multiple':
        value = Array.from(e.target.selectedOptions).map(o => o.value)
        break

      /** Handle common input changes */
      default:
        value = e.target.value
    }

    this.setState({
      [fieldName]: value
    })
  }

  render () {
    return <div>
      <div>
        <label htmlFor="firstname">First name</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={this.state.firstname}
          onChange={this.handleChange}
        />
        <p>Current value : {this.state.name}</p>
      </div>
      <div>
        {/* Subtilité: textarea prend aussi value */}
        <textarea
          id="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}>
        </textarea>
        <p>Current value : {this.state.description}</p>
      </div>
      <div>
        <label htmlFor="select">choose option</label>
        <select
          id="select"
          name="option"
          value={this.state.option}
          onChange={this.handleChange}>
          <option value="demo1">Demo 1</option>
          <option value="demo2">Demo 2</option>
          <option value="demo3">Demo 3</option>
        </select>
        <p>Current value : {this.state.option}</p>
      </div>
      <div>
        <label htmlFor="select">choose option</label>
        <select
          id="select-multi"
          name="optionmulti"
          multiple
          value={this.state.optionmulti}
          onChange={this.handleChange}>
          <option value="demo1">Demo 1</option>
          <option value="demo2">Demo 2</option>
          <option value="demo3">Demo 3</option>
        </select>
        <p>Current value : {JSON.stringify(this.state.optionmulti)}</p>
      </div>
      <div>
        <input
          type="checkbox"
          id="terms"
          name="terms"
          checked={this.state.terms}
          onChange={this.handleChange}
        />
        <label htmlFor="terms">Agree to boring terms</label>
        <p>Current value : {JSON.stringify(this.state.terms)}</p>
      </div>
      <p>{JSON.stringify(this.state)}</p>
    </div>
  }
}

/**
 * - Uncontrolled fields -
 * 
 * when value is not set, react does not control the field.
 * Sometimes better in term of performance when you want tu track the validation only
 * (works with `value={undefined}`)
 * If default value needed in uncontrolled field, use `defaultValue` attr:
 * <input type="text" defaultValue="hello" />
 */

ReactDOM.render(<Home/>, document.querySelector('#app'))
// class Field extends React.Component {
//   render () {
//     const {name, value, onChange, children} = this.props
//     return (
//       <div className="form-group">
//         <label
//           className="form-label"
//           htmlFor={name}
//         >
//           {children}
//         </label>
//         <input
//           className="form-control"
//           id={name}
//           name={name}
//           type="text"
//           value={value}
//           onChange={onChange}
//         />
//       </div>
//     )
//   }
// }

function Field ({name, value, onChange, children}){
  return (
    <div className="form-group">
      <label
        className="form-label"
        htmlFor={name}
      >
        {children}
      </label>
      <input
        className="form-control"
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

function Checkbox ({name, value, onChange, children}){
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        id={name}
        name={name}
        type="checkbox"
        checked={value}
        onChange={onChange}
      />
      <label
        className="form-check-label"
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  )
}

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      /** Value linked to input text */
      firstname: 'Jean',
      /** Value linked to Field component */
      lastname: 'Michel',
      /** Value linked to textarea */
      description: 'Small descr',
      /** Value linked to select */
      option: 'demo2',
      /** Value linked to select */
      optionmulti: ['demo2', 'demo1'],
      /** Value linked to checkbox */
      terms: false,
      /** Value linked to Checkbox component */
      newsletter: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit (e) {
    e.preventDefault()
    const data = JSON.stringify(this.state)
    console.log(data)
    /** Add some form logic in here */
  }

  render () {
    return (
      <form
        className="container"
        onSubmit={this.handleSubmit}
      >
        <div>
          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={this.state.firstname}
            onChange={this.handleChange}
          />
        </div>
        <Field
          name="lastname"
          value={this.state.lastname}
          onChange={this.handleChange}
        >
          Last name
        </Field>
        <div>
          {/* Textarea also takes value prop */}
          <label htmlFor="description">Write about you</label>
          <textarea
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}>
          </textarea>
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
        </div>
        <Checkbox
          name="newsletter"
          checked={this.state.newsletter}
          onChange={this.handleChange}
        >
          Susbscribe to newsletter
        </Checkbox>
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="submit">
            Send
          </button>
        </div>
        <p>{JSON.stringify(this.state)}</p>
      </form>
    )
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
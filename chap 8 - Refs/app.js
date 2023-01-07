class Home extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    /** Init vars to stock the refs */
    this.input = null
    this.input2 = React.createRef()
    this.input3 = React.createRef()
    this.input4 = React.createRef()
  }

  handleClick(e) {
    console.log(this.input)
    /** key current with createRef */
    console.log(this.input2.current)
    console.log(this.input3.current)
    console.log(this.input4.current)
  }

  render () {
    return (
      <div>
        {/* First way to create ref */}
        <input type="text" ref={(ref) => this.input = ref} />
        {/* Second way to create ref */}
        <input type="text" ref={this.input2} />
        {/* Pass ref to component */}
        <Field ref={this.input3}/>
        <FieldClassWithRef ref={this.input4}/>
        <button onClick={this.handleClick}>test</button>
      </div>
    )
  }
}

/** Pass ref to function component */
const Field = React.forwardRef(
  /** forwardRef add the ref as second parameter */
  function (props, ref) {
    return (
      <div className="form-group">
        <input type="text" className="form-control" ref={ref} />
      </div>
    )
  }
)

/** With class we need to create a second reference */
const FieldClassWithRef = React.forwardRef((props, ref) => {
  return <FieldClass forwardRef={ref} />
})

class FieldClass extends React.Component {
  render () {
    return (
      <div className="form-group">
        <input type="text" className="form-control" ref={this.props.forwardRef} />
      </div>
    )
  }
}




/**
 * When use ref ?
 * 
 * 1. When you have uncontrolled form fields
 * 2. Bind external librairies to react
 */

ReactDOM.render(
  <Home />,
  document.querySelector('#app')
)
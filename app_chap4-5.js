// function Welcome (props) {
function WelcomeFunc ({ name, children }) {
  console.log(children)
  return <div>
    <h1>Bonjour {name}</h1>
    <p>{children}</p>
  </div>
}

/** Composant welcome */
class Welcome extends React.Component {
  // In class component, props are a param of the constructor
  // constructor(props) {
  //   super(props)
  // }

  render () {
    return <div>
      <h1>Bonjour {this.props.name}</h1>
      <p>{this.props.children}</p>
    </div>
  }
}

class Clock extends React.Component {

  constructor(props) {
    super(props)
    this.state = {date: new Date()}
    this.timer = null
  }

  componentDidMount () {
    this.timer = window.setInterval(this.tick.bind(this), 1000)
  }

  componentWillUnmount() {
    window.clearInterval(this.timer)
  }

  tick () {
    this.setState({date: new Date()})
  }

  render () {
    return <div>
      Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
    </div>
  }
}

class Incrementer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.start,
      timer: null
    }
    this.toggle = this.toggle.bind(this)
    this.reset = this.reset.bind(this)
  }

  /** Component is mounted */
  componentDidMount () {
    this.play()
  }
  
  /** Component is gonna be unmounted */
  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  /** Increment the state value */
  increment () {
    // this.setState({ value: this.state.value + 1 })
    // Code above can create issues when setState is called in chain
    // /!\ If the setState depend on the state itself or a prop, put it in a function
    // this.setState(function(state, props) {
    //   return { value: this.state.value + 1 }
    // })
    this.setState((state, props) => ({ value: state.value + props.step }))
  }

  /** Initialise the setInterval */
  play () {
    window.clearInterval(this.state.timer)
    this.setState({
      timer: window.setInterval(this.increment.bind(this), 1500)
    })
  }

  /** Clear the interval */
  pause () {
    window.clearInterval(this.state.timer)
    this.setState({
      timer: null
    })
  }

  /** Return the function to bind to the button */
  toggle () {
    this.state.timer ? this.pause() : this.play()
  }

  /** Reset the value of the incrementer to initial start value */
  reset () {
    this.pause()
    this.play()
    this.setState((state, props) => ({value: props.start}))
  }

  render () {
    return <div>
      <p>
        {this.state.value}
        {this.state.timer ? '' : ' (paused)'}
      </p>
      <button onClick={this.toggle}>Pause / Resume</button>
      <button onClick={this.reset}>Reset</button>
    </div>
  }
}

Incrementer.defaultProps = {
  start: 0,
  step: 1
}

/** Exemple component with basic event use case */
// class ManualIncrementer extends React.Component {

//   constructor(props) {
//     super(props)
//     this.state = { n: 0 }
//   }

//   increment (e) {
//     /**
//      * React use synthetic events instead of native
//      * https://fr.reactjs.org/docs/events.html
//      */
//     console.log(e)
//     e.preventDefault()
//     this.setState((state, props) => ({n: state.n + 1}))
//   }

//   render () {
//     return <div>
//       valeur: {this.state.n}
//       <button onClick={this.increment.bind(this)}>Incrémenter</button>
//     </div>
//   }
// }

function Home () {
  return <div>
    <Welcome name="Jean"/>
    <Welcome name="Michel"/>
    <Clock/>
    <Incrementer start={10}/>
    {/* <Incrementer start={100} step={10}/> */}
    {/* <ManualIncrementer /> */}
  </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))
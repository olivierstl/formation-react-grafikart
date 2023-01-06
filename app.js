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
    this.state = { value: this.props.start }
    this.timer = null
  }

  componentDidMount () {
    // this.setState({ value: this.props.start })
    this.timer = window.setInterval(this.increment.bind(this), 1500)
  }

  componentWillUnmount () {
    window.clearInterval(this.timer)
  }

  increment () {
    // this.setState({ value: this.state.value + 1 })
    // Code above can create issues when setState is called in chain
    // /!\ If the setState depend on the state itself or a prop, put it in a function
    // this.setState(function(state, props) {
    //   return { value: this.state.value + 1 }
    // })
    this.setState((state, props) => ({ value: state.value + props.step}))
  }

  render () {
    return <div>{this.state.value}</div>
  }
}

Incrementer.defaultProps = {
  start: 0,
  step: 1
}

function Home () {
  return <div>
    <Welcome name="Jean"/>
    <Welcome name="Michel"/>
    <Clock/>
    <Incrementer start={10}/>
    <Incrementer start={100} step={10}/>
  </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))
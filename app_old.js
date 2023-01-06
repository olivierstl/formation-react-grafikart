let n = 0

function numberFormat(n) {
  return n.toString().padStart(2, '0')
}

function render() {
  /** Basic JS way */
  // const title = React.createElement('h1', {},
  // 'Bonjour tout le monde ',
  // React.createElement('span', {}, n)
  // )

  /**
   * JSX way
   * Only one root element
   * Can use react fragment (empty element) <></>
   */
  
  const items = [
    'Tache 1',
    'Tache 2',
    'Tache 3'
  ]

  const listItems = items.map((item, i) => <li key={i}>{item}</li>)

  const title = <React.Fragment>
    <h1 className="title" id={`title${n}`}>
      Bonjour les gens
      <span>{n % 2 ? numberFormat(n) : null}</span>
    </h1>
    <ul>
      {listItems}
    </ul>
  </React.Fragment>


  ReactDOM.render(title, document.querySelector('#app'))
}

render()

window.setInterval(() => {
  n++
  render()
}, 1000)
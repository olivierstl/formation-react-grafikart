const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

/** Table category row (th > td colspan 2) */
function PorductCategoryRow ({category}) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  )
}

/** Table row component  */
function ProductRow ({product}) {
  const name = product.stocked
    ? product.name
    : <span className="text-danger">{product.name} (out of stock)</span>

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

/** Creates the table shell */
function ProductTable({products}) {
  const rows = []
  let lastCategory = null

  /** Generate the table rows */
  products.forEach(product => {
    /** New category > add category row first */
    if (product.category !== lastCategory) {
      lastCategory = product.category
      rows.push(
        <PorductCategoryRow
          key={product.category}
          category={product.category}
        />
      )
    }

    /** Create new table row wtih product data */
    rows.push(
      <ProductRow
        key={product.name}
        product={product}
      />
    )
  })

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

class SearchBar extends React.Component {

  constructor(props) {
    super(props)

    /** Bind this reference */
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  /**
   * Handle change on input search
   * @param {Event} e 
   */
  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value)
  }

  /**
   * Handle change on stock checkbox
   * @param {Event} e 
   */
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked)
  }

  render () {
    const {filterText, inStockOnly} = this.props

    return (
      <div>
        {/* Search input field */}
        <div className="form-group">
          <label
            className="form-label"
            htmlFor="search"
          >
            Search product
          </label>
          <input
            id="search"
            className="form-control"
            type="text"
            name="search"
            value={filterText}
            onChange={this.handleFilterTextChange}
          />
        </div>

        {/* Checkbox field */}
        <div className="form-check mt-2">
          <input
            id="instock"
            className="form-check-input"
            type="checkbox"
            name="instock"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />
          <label
            className="form-check-label"
            htmlFor="instock"
          >
            Only show products in stock
          </label>
        </div>
      </div>
    )
  }
}

/** Main component (for now) */
class FilterableProductTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      filterText: 'foot',
      inStockOnly: false
    }

    /** Bind this reference */
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  /** Handle field controlled value */
  handleFilterTextChange (filterText) {
    this.setState({filterText})
  }

  /** Handle checkbox controlled value */
  handleInStockChange (inStockOnly) {
    this.setState({inStockOnly})
  }

  render () {
    const products = this.props.products

    return (
      <React.Fragment>
        <p>{JSON.stringify(this.state)}</p>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={products}
        />
      </React.Fragment>
    )
  }
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.querySelector('#app')
)
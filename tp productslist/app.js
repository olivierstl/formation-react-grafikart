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

  render () {

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
          />
        </div>

        {/* Checkbox field */}
        <div className="form-check mt-2">
          <input
            id="instock"
            className="form-check-input"
            type="checkbox"
            name="instock"
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

  render () {
    const products = this.props.products

    return (
      <React.Fragment>
        <p>{JSON.stringify(this.state)}</p>
        <SearchBar
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
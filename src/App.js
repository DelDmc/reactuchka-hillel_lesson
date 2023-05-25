import React, {useEffect, useState} from "react";
import ProductRow from './ProductRow'

const API_KEY_CURRENCY_EXCHANGER = "a2kAzAGIlnKqXmhT89oQa6rK4nAQqojC"
const API_URL_CURRENCY_EXCHANGER = "https://api.apilayer.com/currency_data/live?base=USD&symbols=EUR,UAH"

function App({ currency: globalCurrency }) {
  const [listOfProducts, setListOfTypeProducts] = useState([]);
  const [categoryValue, setCategoryValue] = useState("women's clothing");
  const [listOfCategories, setOfCategories] = useState([]);
  const [currency, setCurrency] = useState(globalCurrency);
  const [currencyChanger,setCurrencyChanger] = useState("")

  useEffect(() => {
    //fetch data for exchange rates
    fetch(API_URL_CURRENCY_EXCHANGER, {
      headers:{
        'apikey': API_KEY_CURRENCY_EXCHANGER
      }
    })
    .then(res => res.json())
    .then(json => {
      const currencyGetParameter = globalCurrency + currency
      setCurrencyChanger(
        currencyGetParameter === 'USDUSD'
        ?1
        :json.quotes[currencyGetParameter]
      );
    })
  }, [currency, globalCurrency])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(json => {
            setOfCategories(json)
        })
    fetch("https://fakestoreapi.com/products")
      .then(value => value.json())
      .then(value => setListOfTypeProducts(value))
  }, []);

  useEffect(() => {
      fetch('https://fakestoreapi.com/products/category/' + categoryValue)
        .then(res => res.json())
        .then(json => {
          // console.log(json)
          setListOfTypeProducts(json)
        })
  }, [categoryValue])
  // console.log(currency)

  return (
    <div className="App">
      <form>
        <select
            value={categoryValue}
            onChange={(event) => {setCategoryValue(event.target.value);}}>
          <option value="allProducts">Products</option>
          {listOfCategories.map((category) => (
            <option
              defaultValue={category === categoryValue}
              key={category}
              value={category}>
                {category}
            </option>
          ))}
        </select>
        <input type="text" placeholder="max price" />
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </form>
      <table className="fixed-width-table">
        <tbody>
          {listOfProducts.map(
            ({ title, category, price, id }) => {
              return (
                <ProductRow
                  title={title}
                  category={category}
                  price={price}
                  currencyChanger={currencyChanger}
                  id={id}
                  currency={currency}
                  key={id}
                />);
                })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

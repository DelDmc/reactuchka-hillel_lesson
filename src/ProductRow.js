import { Link } from "react-router-dom";
import PriceRow from "./PriceRow";
function ProductRow(props) {
  return (
    <tr key={props.id}>
      <td className="table-cell first-column">{props.title}</td>
      <td className="table-cell">{props.category}</td>
      <td className="table-cell"><PriceRow price={props.price} currency={props.currency} currencyChanger={props.currencyChanger}/></td>
      <td className="table-cell"><Link to={`details/${props.id}`}>Details</Link></td>
    </tr>
  );
}

export default ProductRow;
import currencyFormatter from 'currency-formatter';

function PriceRow(props) {
  return (
    <>
      {currencyFormatter.format(props.price * props.currencyChanger, { code: props.currency })}
    </>
  );
}
export default PriceRow;

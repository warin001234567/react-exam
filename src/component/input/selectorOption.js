const SelectorOption = (props) => {
  return props.map((item) => {
    item.label = (
      <div className="flex flex-row space-x-1">
        <img
          alt={item.alfa}
          src={`https://www.countryflags.io/${item.alfa}/flat/16.png`}
        />
        <span>{item.value}</span>
      </div>
    );
    return item;
  });
};
export default SelectorOption;

// export const updatedCountries = countries.map((item) => {
//   item.label = (
//     <div className="label">
//       <span>{item.label}</span>
//       <img src={item.flag} alt="flag" />
//     </div>
//   );
//   return item;
// });

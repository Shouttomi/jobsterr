const Formrowselect = ({ labeltext, name, value, handlechange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labeltext || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        className="form-select"
        onChange={handlechange}
      >
        {list.map((itemvalue, index) => {
          return (
            <option value={itemvalue} key={index}>
              {" "}
              {itemvalue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default Formrowselect;

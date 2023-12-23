const FormRow = ({type,name,value,handlechange,labeltext}) => {
  return (
    <div className="form-row">
    <label htmlFor={name} className="form-label">
      {labeltext || name}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={handlechange}
      className="form-input"
    />
  </div>
  )
}
export default FormRow
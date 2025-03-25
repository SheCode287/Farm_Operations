
import { InputType } from "../types"
const Input = ({type, name, value, onChange, placeholder, className}:InputType) => {
  return (
    <input className={`input ${className}`} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}/>
  )
}

export default Input

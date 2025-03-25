import { LabelType } from "../types"

const Label = ({children, className}:LabelType) => {
  return (
   <label className={`label ${className}`}>{children}</label>
  )
}

export default Label

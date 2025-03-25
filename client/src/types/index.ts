export interface FormValuesType  {
    name: string,
    variety: string
    status: string
    planting_date: string
    expected_date: string
}
export interface InputType {
    type: string | number | any,
    name:string,
    value:string | number,
    onChange: (x:any) =>void;
    placeholder?:string
    className?:string

}
export interface LabelType {
    children:string
    className?:string

}
export interface ModalProps {
    children: React.ReactNode
    open:boolean
    name:string
    closeModal:() => void
    className?:string
    style?:string
}
export interface CropType {
    createdAt: string;
    expected_date:string;
    planting_date:string;
    variety:string;
    updatedAt:string;
    name:string;
    _id:string;
    status?:string

}
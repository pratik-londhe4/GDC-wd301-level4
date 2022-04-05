export type FormData =  {
  id: number;
  title: string;
  formFields: Field[];
}


type textFieldTypes = "text" | "date" | "email";

type textField = {
  id : number,
  kind : "text",
  label : string
  type : textFieldTypes,
  value : string
}

type dropDownField = {

  id : number,
  kind : "dropdown",
  label : string
  options : string[]
  selected : string[]
  value : string

}

type radioButtonField = {
  id : number,
  kind : "radio"
  label : string , 
  options : string[],
  value : string
}
export type Field =  textField | dropDownField | radioButtonField


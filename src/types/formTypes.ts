export type Field =  {
    id: number;
    label: string;
    type: string;
    value: string;
  }

export type FormData =  {
    id: number;
    title: string;
    formFields: Field[];
  }
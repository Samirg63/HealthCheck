import type { ChangeEvent } from "react";
import type { IFormData } from "./IFormData";

export interface IUseForm<T extends string>{
    formData:IFormData<T>,
    changeHandler:(e:ChangeEvent<HTMLInputElement>)=>void
}
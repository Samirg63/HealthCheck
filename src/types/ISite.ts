import type { IAPIs } from "./IAPIs";

export interface ISite{
    name:string,
    frontend:{success:boolean},
    backend?:{success:boolean},
    database?:{success:boolean},
    apis?:IAPIs[],
    url:string,
    id?:string
}
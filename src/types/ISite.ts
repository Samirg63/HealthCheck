import type { IAPIs } from "./IAPIs";

export type ISite = Record<string,
{
    frontend:{success:boolean},
    backend?:{success:boolean},
    database?:{success:boolean},
    apis?:IAPIs[],
    url:string,
    id?:string
}>
    
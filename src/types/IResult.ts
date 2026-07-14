import type {IError} from './IError'

export interface IResult<T>{
    status:number,
    success:boolean,
    data?:T,
    errors:IError[]
}
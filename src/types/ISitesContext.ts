import type { ISite } from "./ISite";

export interface ISitesContext{
    loading:boolean,
    createSite:(siteData: {
        name: string;
        url: string;
    }) => Promise<void>,
    data:ISite,
    getHealth:(token?:string) => Promise<void>

}
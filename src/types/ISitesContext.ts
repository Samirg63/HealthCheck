import type { ISite } from "./ISite";

export interface ISitesContext{
    loading:boolean,
    createSite:(siteData: {
        name: string;
        url: string;
    }) => Promise<void>,
    data:{[index: string]:ISite},
    getHealth:() => Promise<void>

}
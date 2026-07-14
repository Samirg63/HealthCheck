import { render,screen } from "@testing-library/react";
import Table from "../components/Table"
import type { IAPIs } from "../types/IAPIs";
import '@testing-library/jest-dom';
import type { ISite } from "../types/ISite";
import {describe, expect,test, vi} from 'vitest'
import { SitesContext } from "../contexts/sitesContext";

describe("Table",()=>{

    const handleFormVisibilityMock = vi.fn();

    //TempAPIs
    const mockAPIs:IAPIs[] = [
        {apiOne:{success:true}},
        {apiTwo:{success:false}}
    ]
    

    const mockSites:ISite= {

        siteOne:{   
            frontend:{success:true},
            url:"www.teste.com"   
        },
        siteTwo:{
            frontend:{success:true},
            backend:{success:false},
            apis:mockAPIs,
            url:"www.teste.com"
        }
    }
    
    test("GetDot is rendering correctly",()=>{
        render(
            <SitesContext.Provider value={{
                loading:false,
                createSite:vi.fn(),
                data:mockSites,
                getHealth:vi.fn()
            }}>
                <Table handleFormVisibility={handleFormVisibilityMock} />
            </SitesContext.Provider>
    )

        expect(screen.getByText('siteOne')).toBeInTheDocument();
        expect(screen.getByText('siteTwo')).toBeInTheDocument();
        expect(screen.getAllByTestId('greenDot')).toHaveLength(2);
        expect(screen.getAllByTestId('redDot')).toHaveLength(1);
        expect(screen.getAllByTestId('yellowDot')).toHaveLength(4);
        expect(screen.getAllByTestId('apiDots')).toHaveLength(1);
    })
})
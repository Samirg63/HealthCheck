///<reference types="jest" />

import { render,screen } from "@testing-library/react";
import Table from "../components/Table"
import type { IAPIs } from "../types/IAPIs";
import '@testing-library/jest-dom';
import type { ISite } from "../types/ISite";

describe("Table",()=>{

    const handleFormVisibilityMock = jest.fn();

    //TempAPIs
    const mockAPIs:IAPIs[] = [
        {
            name:"API 1",
            status:true
        },
        {
            name:"API 2",
            status:true
        },
        {
            name:"API 3",
            status:false,
        }
    ]

    const mockSites:ISite[]= [
        {
            name:'Site 1',
            frontend:true,
            
            
        },
        {
            name:'Site 2',
            frontend:true,
            backend:false,
            apis:mockAPIs
        }
    ]
    test("GetDot is rendering correctly",()=>{
        render(<Table handleFormVisibility={handleFormVisibilityMock} sites={mockSites}/>)

        expect(screen.getByText('Site 1')).toBeInTheDocument();
        expect(screen.getByText('Site 2')).toBeInTheDocument();
        expect(screen.getAllByTestId('greenDot')).toHaveLength(2);
        expect(screen.getAllByTestId('redDot')).toHaveLength(1);
        expect(screen.getAllByTestId('yellowDot')).toHaveLength(4);
        expect(screen.getAllByTestId('apiDots')).toHaveLength(1);
    })
})
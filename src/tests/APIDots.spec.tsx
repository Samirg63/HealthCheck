///<reference types="jest" />

import { render, screen,within} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import APIDots from '../components/Dots/APIDots';
import '@testing-library/jest-dom';
import Table from '../components/Table';
import type { IAPIs } from '../types/IAPIs';
import type { ISite } from '../types/ISite';


describe('APIDots',()=>{

    const mockApis:IAPIs[] = [
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
            status:false
        }
    ]

    const mockHandleFormVisibility = jest.fn();

    afterEach(()=>{
        jest.clearAllMocks();
    })

    describe("Render tests",()=>{
        test("Is rendering all Apis",async ()=>{
            render(<APIDots APIs={mockApis}/>);

            //Showing Container
            const button = screen.getByTestId('ApiContainerBtn');
            await userEvent.click(button);   

            for(const api of mockApis){   
                let span = screen.getByText(api.name)
                let li = span.closest('li')!
                expect(span).toBeInTheDocument();

                if(api.status){
                    expect(
                        within(li).getByTestId('greenDot')
                    ).toBeInTheDocument();
                }else{
                    expect(
                        within(li).getByTestId('redDot')
                    ).toBeInTheDocument();
                }
            }
            
        })
    })

    describe("API Container Visibility tests",()=>{
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

        test('Container fica visivel ao clicar no botão',async ()=>{
            render(<APIDots APIs={mockApis} />);
            const button = screen.getByTestId('ApiContainerBtn');
            expect(screen.queryByTestId('apiContainer')).not.toBeInTheDocument();
            await userEvent.click(button);     
            expect(screen.queryByTestId('apiContainer')).toBeInTheDocument();
            
        })
        
        test("close APIs Container when Click away", async()=>{
            render(<Table sites={mockSites} handleFormVisibility={mockHandleFormVisibility}/>);
            const button = screen.getByTestId('ApiContainerBtn');
            await userEvent.click(button);  
            expect(screen.queryByTestId('apiContainer')).toBeInTheDocument();
            
            await userEvent.click(screen.getByRole('table'));
            expect(screen.queryByTestId('apiContainer')).not.toBeInTheDocument();
            
        })
    })
})
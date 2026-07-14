import { render, screen,within} from '@testing-library/react'
import {userEvent} from '@testing-library/user-event'
import APIDots from '../components/Dots/APIDots';
import '@testing-library/jest-dom';
import Table from '../components/Table';
import type { IAPIs } from '../types/IAPIs';
import type { ISite } from '../types/ISite';
import { describe,test, vi } from 'vitest';
import { SitesContext } from '../contexts/sitesContext';


describe('APIDots',()=>{

    const mockApis:IAPIs[] = [
        {"API 1":{success:true}},
        {"API 2":{success:true}},
        {"API 3":{success:false}}
    ]

    const mockHandleFormVisibility = vi.fn();

    describe("Render tests",()=>{
        test("Is rendering all Apis",async ()=>{
            render(<APIDots APIs={mockApis}/>);

            //Showing Container
            const button = screen.getByTestId('ApiContainerBtn');
            await userEvent.click(button);   


            for(const [index, api] of mockApis.entries()){   
                let span = screen.getByText(Object.keys(api)[0])
                let li = span.closest('li')!
                expect(span).toBeInTheDocument();
                console.log(mockApis[index][Object.keys(api)[0] as string])
                if(mockApis[index][Object.keys(api)[0] as string].success){
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
            const mockApis:IAPIs[] = [
                {"API 1":{success:true}},
                {"API 2":{success:true}},
                {"API 3":{success:false}}
            ]
        
            const mockSites:ISite= {
                "Site 1":{   
                    frontend:{success:true},
                    url:"www.teste.com"   
                },
                "Site 2":{
                    frontend:{success:true},
                    backend:{success:false},
                    apis:mockApis,
                    url:"www.teste.com"
                }
            }

        test('Container fica visivel ao clicar no botão',async ()=>{
            render(<APIDots APIs={mockApis} />);
            const button = screen.getByTestId('ApiContainerBtn');
            expect(screen.queryByTestId('apiContainer')).not.toBeInTheDocument();
            await userEvent.click(button);     
            expect(screen.queryByTestId('apiContainer')).toBeInTheDocument();
            
        })
        
        test("close APIs Container when Click away", async()=>{
            render(<SitesContext.Provider value={{
                        loading:false,
                        createSite:vi.fn(),
                        data:mockSites,
                        getHealth:vi.fn()
                    }}>
                        <Table handleFormVisibility={mockHandleFormVisibility} />
                    </SitesContext.Provider>
            );
            const button = screen.getByTestId('ApiContainerBtn');
            await userEvent.click(button);  
            expect(screen.queryByTestId('apiContainer')).toBeInTheDocument();
            
            await userEvent.click(screen.getByRole('table'));
            expect(screen.queryByTestId('apiContainer')).not.toBeInTheDocument();
            
        })
    })
})
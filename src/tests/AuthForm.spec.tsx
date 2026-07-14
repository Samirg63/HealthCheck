import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AuthForm from '../components/Forms/AuthForm';
import { describe,test } from 'vitest';

describe('AuthForm',()=>{
    test("Inputs are working",async ()=>{
        render(<AuthForm />)
        const emailInput = screen.getByTestId('input-email')
        const passwordInput = screen.getByTestId('input-password')
        
        await userEvent.type(emailInput, "email@.com")
        await userEvent.type(passwordInput, "123123")

        expect(emailInput).toHaveValue("email@.com")
        expect(passwordInput).toHaveValue("123123")
    })
})
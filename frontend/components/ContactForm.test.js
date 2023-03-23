import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';


test('renders without errors', () => {
 render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText('Contact Form');
    expect(header).toBeInTheDocument();
    expect(header).toBeInTheDocument(/contact form/i);

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const userInput = screen.getByLabelText(/first name*/i);
    userEvent.type(userInput, '123');

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitBottun = screen.getByRole('button');
    userEvent.click(submitBottun);
    await waitFor(() => {
        const errorMessage = screen.queryAllByTestId('error');
        expect(errorMessage).toHaveLength(3);
    });
    
   
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName  = screen.getByLabelText(/last name/i);
    
    userEvent.type(firstName, 'Alejandro');
    userEvent.type(lastName, 'hussein');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, "alejandro@gmail");

    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    // const lastName = screen.getByLabelText(/last name*/i);
    // userEvent.type(lastName, '');

    const button = screen.getByRole('button');
    userEvent.click(button);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'alejandro');

    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'hussein');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'alejandro@gmail.com');

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay =screen.queryByText('alejandro');
        const lastNameDisplay =screen.queryByText('hussein');
        const emailDisplay = screen.queryByText('alejandro@gmail.com');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
    });

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, 'alejandro');

    const lastName = screen.getByLabelText(/last name*/i);
    userEvent.type(lastName, 'hussein');

    const email = screen.getByLabelText(/email*/i);
    userEvent.type(email, 'alejandro@gmail.com');

    const message = screen.getByLabelText(/message/i);
    userEvent.type(message, 'alejandro hussein');

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const firstNameDisplay =screen.queryByText('alejandro');
        const lastNameDisplay =screen.queryByText('hussein');
        const emailDisplay = screen.queryByText('alejandro@gmail.com');
        const messageDisplay = screen.queryByText('alejandro hussein');

        expect(firstNameDisplay).toBeInTheDocument();
        expect(lastNameDisplay).toBeInTheDocument();
        expect(emailDisplay).toBeInTheDocument();
        expect(messageDisplay).toBeInTheDocument();
    });

});


import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';


test('it shows two inputs and a button', () => {
  // render the component
  // JSDOMがFake Environmentに作られる
  render(<UserForm />);

  // Manipulate the component or find an element in it
  // Aria Role　systemを取得
  const inputs = screen.getAllByRole('textbox');
  const button = screen.getByRole('button');

  // Assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test('it calls onUserAdd when the form is submitted', () => {
  const mock = jest.fn();
  
  // Try to render my component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });

  // Simulate typing in a name
  user.click(nameInput);
  user.keyboard('jane');

  // Simulate typing in an email
  user.click(emailInput);
  user.keyboard('jane@example.com');
  // Find a button
  const button = screen.getByRole('button');
  // Simulate clicking the button
  user.click(button);
  // Assertion to make sure
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({ name: 'jane', email: "jane@example.com" })
});

test('empties the two inputs when form is submitted', () => {
  render(<UserForm onUserAdd={() => { }} />);

  const nameInput = screen.getByRole('textbox', { name: /name/i });
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const button = screen.getByRole('button');

  user.click(nameInput);
  user.keyboard('jane');
  user.clear(emailInput);
  user.keyboard('jane@example.com');

  user.click(button);

  expect(nameInput).toHaveValue('');
  expect(emailInput).toHaveValue('');
})
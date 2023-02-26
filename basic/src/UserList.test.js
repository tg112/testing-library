import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

// testing libraryでは、beforeEach内でrenderを呼ぶことは推奨されていない
function renderComponent() {
  const users = [
    {name: 'jane', email: 'jane@example.com'},
    {name: 'sam', email: 'sam@example.com'}
  ]
  render(<UserList users={users} />);

  return users
}

// 基本的にRoleを優先的に使うのが原則だが、うまくいかないときにRoleにこだわる必要はない
test('render one row per user with test-dataid', () => {
  renderComponent();

  // Find all the row in the table
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // 下記はplaygroundを開くURLを表示し、適切なテストの書き方を補佐してくれる
  // screen.logTestingPlaygroundURL();

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
})

// 基本的にRoleを優先的に使うのが原則だが、うまくいかないときにRoleにこだわる必要はない
test('render one row per user with a container', () => {
  const users = [
    {name: 'jane', email: 'jane@example.com'},
    {name: 'sam', email: 'sam@example.com'}
  ]
  const { container } = render(<UserList users={users} />)

  // Find all the row in the table
  // eslint-disable-next-line
  const rows = container.querySelectorAll('tbody tr');

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
})

test('render the email and name of each user', () => {
  // eslint-disable-next-line testing-library/render-result-naming-convention
  const users  = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
})
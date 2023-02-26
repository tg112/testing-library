import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RepositoriesListItem from "./RepositoriesListItem";

// mock
// jest.mock('../tree/FileIcon.js', () => {
//   // Content of FileIcon.js
//   return () => {
//     return 'File Icon Component'
//   }
// })

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'A js library',
    owner: {
      login: 'facebook'
    },
    name: 'react',
    html_url: 'https://github.com/facebook/react'
  }
  render(
    // Error: Uncaught [Error: useHref() may be used only in the context of a <Router> component.]エラーをMemoryRouterで解決する
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  )

  return { repository };
}

test('shows a link to the github homepage for this repo', async () => {
  const { repository } = renderComponent();
  await screen.findByRole('img', { name: 'Javascript' });
  
  const link = screen.getByRole('link', { name: /github repository/});
  expect(link).toHaveAttribute('href', repository.html_url);
})

test('shows a fileicon with the appropriate icon', async () => {
  renderComponent();

  const jsIcon = await screen.findByRole('img', { name: 'Javascript' });
  expect(jsIcon).toHaveClass('js-icon')
})

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();
  await screen.findByRole('img', { name: 'Javascript' });
  const link = await screen.findByRole('link', { name: new RegExp(repository.owner.login) });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`)

})
import { render, screen } from "@testing-library/react";
import { setupServer } from 'msw/node';
import { rest } from "msw";
import { MemoryRouter } from "react-router";
import HomeRoute from "./HomeRoute";

const hanlders = [
  rest.get('/api/repositories', (req, res, ctx) => {
    const language = req.url.searchParams.get('q').split('language:')[1];
    console.log(language);

    return res(
      ctx.json({
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` }
        ]
      })
    )
  })
];

const server = setupServer(...hanlders);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test('renders two links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  )

  // Loop over each language
  const languages = [
    'javascript',
    'typescript',
    'rust',
    'go',
    'python',
    'java'
  ];
  for (let language of languages) {
  // for each language, make sure we see two links
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`)
    });
  // assert that the links have the appropriate full_name
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
  };
});

const pause = new Promise(resolve => {
  setTimeout(resolve, 100)
});
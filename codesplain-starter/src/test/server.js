import { rest } from "msw";
import { setupServer } from "msw/lib/node";

export function createServer(handlerConfig) {
  const hanlders = handlerConfig.map((config) => {
    return rest[config.method || 'get'](config.path, (req, res, ctx) => {
      return res(
        ctx.json(config.res(req, res, ctx))
      );
    });
  });

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
}
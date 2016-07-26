import { Router } from 'express';
import { match } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import createRoutes from '../../common/routes';
import createPage from './page';

const router = Router();

router.use((req, res) => {

  const history = createHistory();
  const routes = createRoutes(history);
  const location = history.createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {

    if (error) {
      res.status(500).send(error.message);
    }

    if (redirectLocation) {
      res.rediect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (renderProps) {
      res.status(200).end(createPage(renderProps));
    } else {
      res.staus(404).send('Not Found');
    }
  });

});

export default router;

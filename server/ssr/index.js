import { Router } from 'express';
import { match } from 'react-router';
import createHistory from 'history/lib/createMemoryHistory';
import createRoutes from '../../common/routes';
import createPage from './page';
import createStore from '../../common/store';

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
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }


    if (renderProps) {

      const store = createStore();

      renderProps.components
        .slice(-1)
        .map( component => {

          if (typeof component !== 'undefined' && component.fetchData ) {
            component.fetchData(store.dispatch, renderProps.params)
              .then(() => {
                res.status(200).end(createPage(store, renderProps));
              })
          } else {
            res.status(200).end(createPage(store, renderProps));
          }
        })

    } else {
      res.status(404).send('Not Found');
    }
  });

});

export default router;

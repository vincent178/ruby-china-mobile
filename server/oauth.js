import { Router } from 'express';

const router = Router();

router.options('/oauth/access_token', (req, res) => {
    res.status(204).end();
});

router.post('/oauth/access_token', (req, res) => {

});

export default router;
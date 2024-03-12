import express from 'express';
import userRoute from './user.route';
import productRoute from './product.route';
import upsellRoute from './upsell.route';
import transactionRoute from './transaction.route';

const router = express.Router();

const routes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/upsell',
    route: upsellRoute,
  },
  {
    path: '/transaction',
    route: transactionRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

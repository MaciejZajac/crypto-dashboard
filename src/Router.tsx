import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import CoinViewContainer from './containers/Home/CoinViewContainer';
import MarketsViewContainer from './containers/Home/MarketsViewContainer';
import ExchangesViewContainer from './containers/Exchanges/ExchangesViewContainer';
import CustomLayout from './containers/Layout/CustomLayout';
import ExchangeDetailsContainer from './containers/Exchanges/ExchangeDetailsContainer';

const Router: FC = () => (
  <CustomLayout>
    <Switch>
      <Route exact path='/' component={MarketsViewContainer} />
      <Route exact path='/coins/:coinId' component={CoinViewContainer} />
      <Route exact path='/exchanges' component={ExchangesViewContainer} />
      <Route
        exact
        path='/exchanges/:exchangeId'
        component={ExchangeDetailsContainer}
      />
      <Route render={() => <div>404 - Page not found</div>} />
    </Switch>
  </CustomLayout>
);
export default Router;

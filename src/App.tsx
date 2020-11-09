import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CoinViewContainer from './containers/Home/CoinViewContainer';
import TableViewContainer from './containers/Home/TableViewContainer';
import CustomLayout from './containers/Layout/CustomLayout';

import 'antd/dist/antd.less';

const App = () => {
  return (
    <BrowserRouter>
      <CustomLayout>
        <Switch>
          <Route exact path='/' component={TableViewContainer} />
          <Route exact path='/:coinId' component={CoinViewContainer} />
        </Switch>
      </CustomLayout>
    </BrowserRouter>
  );
};
export default App;

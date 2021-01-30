import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Coin from './Routes/Coin';
import Main from './Routes/Main';

const Router = () => {
  return <BrowserRouter basename="/coin-chart">
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path='/coin/:coin' component={Coin} />
    </Switch>
  </BrowserRouter>
}

export default Router;
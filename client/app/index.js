import React from 'react';
import {render} from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import App from './App';

import Home from './components/HomePage';
import CarPage from './components/CarPage'
import CarEditPage from './components/CarEditPage'
import NotFound from './components/NotFound';

render((
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path='/CarPage/:id' component={CarPage}/>
                <Route exact path='/CarPage/:id/edit' component={CarEditPage}/>
                <Route component={NotFound}/>
            </Switch>
        </App>
    </Router>
), document.getElementById('app'));

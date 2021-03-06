import React from 'react';
import ReactDOM from 'react-dom';
import 'common/f7';
import { Provider } from 'react-redux';
import { Router, hashHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from 'routes';
import configureStore from 'store/configureStore';
import DevTools from 'modules/DevTools';
import Login from 'modules/Login/containers';

const store = configureStore();

const myHistory = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

const history = syncHistoryWithStore(myHistory, store);

//查看store数据
store.subscribe(() => {
    //console.log(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <div className='entry-wrap'>
            <Login></Login>
            <Router
                history={history}
                routes={routes} />
            {
                process.env.NODE_ENV === 'production' ? null : <DevTools />
            }
        </div>
    </Provider>,
    document.getElementById('root')
);

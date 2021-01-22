import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createMemoryHistory, createBrowserHistory } from 'history';

//mount function to start up the app
const mount = (element, { onNavigate, defaultHistoy, initialPath }) => {
    const history = defaultHistory || 
        createMemoryHistory({
        initialEntries: [initialPath],
        });

    if (onNavigate) {
        history.listen(onNavigate);
    }
    

    ReactDOM.render(
        <App history={history} />,
        element
    );

    return {
        onParentNavigate({pathname: nextPathname}) {
            const { pathname } = history.location;

            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    }
};


//if we are in dev and isolation
// call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot) {
        mount(devRoot, { defaultHistoy: createBrowserHistory() });
    }
}

// We are runnig through container
// and we should export the mount function
export { mount };

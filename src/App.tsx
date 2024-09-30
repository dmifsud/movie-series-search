import './App.css';
import { Route, Router, Switch } from 'wouter';
import SearchPage from './pages/SearchPage';
import WatchListPage from './pages/WatchListPage';

let baseUrl = '';
if (import.meta.env.MODE === 'production') {
    baseUrl = '/movie-series-search';
}

function App() {
    return (
        <>
            <Router base={baseUrl}>
                <Switch>
                    <Route path="/" component={SearchPage} />
                    <Route path="/watchlist" component={WatchListPage} />
                </Switch>
            </Router>
        </>
    );
}

export default App;

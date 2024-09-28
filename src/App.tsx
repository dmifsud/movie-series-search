import './App.css';
import { Route, Router, Switch } from 'wouter';
import SearchPage from './pages/SearchPage';
import WatchListPage from './pages/WatchListPage';

let baseUrl = '';
if (import.meta.env.MODE === 'production') {
    baseUrl = '/movie-series-search';
}

function App() {
    // const { actions } = useSearchMoviesStore.getState();

    // useEffect(() => {
    //   // OmdbApi.getTitle('empire strikes back').then(result => {
    //   //   console.log(result);
    //   //   console.log(result.Ratings?.map(rating => rating.Value).join(', '));
    //   // });
    //   // setTimeout(() => {
    //   //   actions.searchMovieByTitle('fight club');

    //   // }, 1000);

    // }, [actions]);

    console.log('render app');

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

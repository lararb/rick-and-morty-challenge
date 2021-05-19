import React, { useEffect, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Warning from './components/Warning/Warning';

import ListView from './Views/ListView/ListView';
import DetailView from './Views/DetailView/DetailView';
import {
    getFilteredCharacters,
    getAllCharacters,
} from './services/requests';

import './App.scss';

const filters = {
    name: undefined,
    status: undefined,
    gender: undefined,
    species: undefined,
};
let filterTimeOutId;

function App() {
    const [characters, setCharacters] = useState([]);
    const [page, setPage] = useState(1);
    const [isSortByName, setIsSortByName] = useState(false);
    const [isApiError, setIsApiError] = useState(false);
    const [showFilters, setShowFilters] = useState(true);

    const getData = () => {
        getAllCharacters(setIsApiError)
            .then(data => {
                setCharacters(data.results);
                setIsApiError(false);
            })
            .catch(error => error)
    };

    useEffect(() => getData(), []);

    const loadMoreData = currentPage => {
        getFilteredCharacters(filters, setIsApiError, currentPage)
            .then(data => {
                setCharacters(data.results);
                setPage(currentPage);
                setIsApiError(false);
            })
            .catch(error => <Warning getData={ getData } />);
    }

    const onClickSortByName = event => {
        const { checked } = event.target;
        setIsSortByName(checked);
    };

    const onFilterByField = (field, value) => {
        filters[field] = value;
        getFilteredCharacters(filters, setIsApiError, page)
            .then(data => {
                setCharacters(data.results);
                setIsApiError(false);
            })
            .catch(error => <Warning getData={ getData } />);
    };

    const onChangeFilterByName = event => {
        const { value } = event.target;
        const finalValue = value !== '' ? value : undefined;
        clearTimeout(filterTimeOutId);
        filterTimeOutId = setTimeout(() => onFilterByField('name', finalValue), 1000);
    };

    const isDetailLocation = useLocation().pathname.includes('/detail');

    return (
        <div className={ 'App' }>
            <header className={ 'Header' }>
                <Header
                    onClick={ onClickSortByName }
                    onChange={ onChangeFilterByName }
                    filters={ filters }
                    onFilterByField={ onFilterByField }
                    showFilters={ showFilters }
                />
            </header>
                <main className={'Main'}>
                    {!isApiError ? (
                        <Switch>
                            <Route
                                exact path="/"
                                render={() => (
                                    <ListView
                                        characters={characters}
                                        onFilterByField={onFilterByField}
                                        isSortByName={isSortByName}
                                        setShowFilters={ setShowFilters }
                                    />
                                )}
                            />
                            <Route
                                path="/detail/:id"
                                render={renderProps => (
                                    <DetailView
                                        matchId={ renderProps.match.params.id }
                                        setShowFilters={ setShowFilters }
                                        setIsApiError={ setIsApiError }
                                        isApiError={ isApiError }
                                        getAllData={ getData }
                                    />
                                )}
                            />
                        </Switch>
                    )
                    : <Warning getData={ getData } />}
                </main>
                {!isApiError && !isDetailLocation && characters.length >= 20 && (
                    <footer className={'Footer'}>
                        <Footer
                            page={ page }
                            getNextPage={ () => loadMoreData(page + 1) }
                            getPreviousPage={ () => loadMoreData(page - 1) }
                            isApiError={ isApiError }
                        />
                    </footer>
                )}
        </div>
    );
}

export default App;

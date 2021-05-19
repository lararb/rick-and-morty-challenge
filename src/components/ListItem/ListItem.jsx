import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Link } from 'react-router-dom';
import { STATUS_ICONS } from '../../utils/icons';

import './ListItem.scss';

const ListItem = ({ item, onFilterByField, setShowFilters }) => {
    const statusIcons = item.status ? STATUS_ICONS[item.status.toLowerCase()] : '';

    return (

            <li className={ 'ItemContainer' } data-testid={'ListItem'}>
                <img className={ 'ItemImg' } alt={item.name} src={item.image} />
                <div className={ 'ItemInfo' }>
                    <h3 className={ 'ItemText Title' }>{item.name}</h3>
                    <p className={ 'ItemText Small Clickable' } onClick={ () => onFilterByField('status', item.status)}>
                        <img className={ 'ItemIcon' } alt={item.status} src={ statusIcons } />
                        {item.status}
                    </p>
                    <p className={ 'ItemText' }>
                        <span
                            className={ 'ItemText Clickable' }
                            data-testid={'ClickableListItem'}
                            onClick={ () => onFilterByField('species', item.species)}
                        >
                            {item.species}
                        </span>
                        -
                        <span
                            className={ 'ItemText Clickable' }
                            onClick={ () => onFilterByField('gender', item.gender)}
                        >
                            {item.gender}
                        </span>
                    </p>
                    <p className={ 'ItemText' }>
                        <span className={ 'ItemText Bold' }>First seen in:</span>
                        {item.origin && item.origin.name}
                    </p>
                </div>
                <HashRouter>
                <Link to={`/detail/${item.id}`}>
                    <button className={ 'ItemButton' } onClick={ () => setShowFilters(false)}>More info...</button>
                </Link>
                 </HashRouter>
            </li>

    );
};

ListItem.propTypes = {
    item: PropTypes.objectOf(PropTypes.any),
    onFilterByField: PropTypes.func,
    setShowFilters: PropTypes.func,
};

ListItem.defaultProps = {
    item: {},
    onFilterByField: () => {},
    setShowFilters: () => {},
};

export default ListItem;
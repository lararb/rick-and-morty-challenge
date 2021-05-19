import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Warning.scss';

const Warning = ({ getData }) => {
    return (
        <div className={ 'Warning' }>
            Oops! There seems to have been a problem...
            <Link to={ '/' }><button className={ 'WarningButton' } onClick={ () => getData() }>Try again!</button></Link>
        </div>
    );
};

Warning.propTypes = {
    getData: PropTypes.func,
};

Warning.defaultProps = {
    getData: () => {},
};

export default Warning;

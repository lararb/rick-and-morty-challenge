import React from 'react';
import PropTypes from 'prop-types';

import './Footer.scss';

const Footer = ({ page, getNextPage, getPreviousPage }) => {
    return (
        <div className={ 'FooterWrapper' }>
            <div className={ 'FooterContainer' }>
                <button className={ 'Button' } onClick={ getPreviousPage } disabled={ page === 1 }>PREV</button>
                <span>{page}</span>
                <button className={ 'Button' } onClick={ getNextPage }>NEXT</button>
            </div>
        </div>
    );
};

Footer.propTypes = {
    page: PropTypes.number,
    getNextPage: PropTypes.func,
    getPreviousPage: PropTypes.func,
};

Footer.defaultProps = {
    page: 1,
    getNextPage: () => {},
    getPreviousPage: () => {},
};

export default Footer;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Warning from '../../components/Warning/Warning';
import { getSingleCharacter, getEpisodes } from '../../services/requests';
import { STATUS_ICONS, GENDER_ICONS } from '../../utils/icons';

import './DetailView.scss';


const DetailView = ({ matchId, setShowFilters, setIsApiError, isApiError, getAllData }) => {
    const [character, setCharacter] = useState();
    const [episodes, setEpisodes] = useState();

    const getDataCharacter = () => {
        getSingleCharacter(matchId)
            .then(data => {
                setCharacter(data);
                setIsApiError(false);

                const episodesIds = data.episode && data.episode.map(ep => parseInt(ep.split('/')[5], 10));
                return getEpisodes(episodesIds);
            })
            .then(response => {
                if (!response.ok) throw Error(response.status);
                return response.json();
            })
            .then(data => {
                setEpisodes(data);
                setIsApiError(false);
            })
            .catch(error => setIsApiError(true));
    };

    useEffect(() => getDataCharacter(), [matchId]);

    const finalEpisodes = episodes && Array.isArray(episodes) ? episodes : [episodes];
    const genderIcons = character && character.gender ? GENDER_ICONS[character.gender.toLowerCase()] : '';
    const statusIcons = character && character.status ? STATUS_ICONS[character.status.toLowerCase()] : '';

    return (
        <div className={ 'DetailWrapper' }>
            { !isApiError && character && !character.error ? (
                <div className={ 'DetailContainer' }>
                    <img className={ 'DetailImg' } alt={character.name} src={character.image} />
                    <div className={ 'DetailTitleContainer' }>
                        <h3>{character.name}</h3>
                        <img
                            className={ 'DetailIcon' }
                            alt={`gender ${character.gender}`}
                            src={ genderIcons }
                        />
                        <img
                            className={ 'DetailIcon' }
                            alt={`status ${character.status}`}
                            src={ statusIcons }
                        />
                    </div>
                    <p className={ 'DetailText' }><span>Species:</span>{character.species}</p>
                    <p className={ 'DetailText' }><span>First seen in:</span>{character.origin.name}</p>
                    <p className={ 'DetailText' }><span>Last known location:</span>{character.location.name}</p>
                    <div className={ 'EpisodesContainer' }>
                        <h4 className={ 'EpisodesTitle' }>Episodes</h4>
                        <ul className={ 'EpisodeList' }>
                            {episodes && finalEpisodes.map((ep, index) => (
                                <li key={`episode-${index}`} className={ 'EpisodeItem' }>{ep.name}</li>
                            ))}
                        </ul>
                    </div>
                    <Link to={'/'}>
                        <button className={ 'Button' } onClick={() => setShowFilters(true)}>Go back</button>
                    </Link>
                </div>
            )
            : <Warning getData={ getAllData } />}
        </div>
    );
};

DetailView.propTypes = {
    matchId: PropTypes.string,
    setShowFilters: PropTypes.func,
    setIsApiError: PropTypes.func,
    isApiError: PropTypes.bool,
    getAllData: PropTypes.func,
};

DetailView.defaultProps = {
    matchId: '',
    setShowFilters: () => {},
    setIsApiError: () => {},
    isApiError: false,
    getAllData: () => {},
};

export default DetailView;

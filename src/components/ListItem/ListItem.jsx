import React from "react";
import PropTypes from "prop-types";
import { HashRouter, Link } from "react-router-dom";
import { STATUS_ICONS } from "../../utils/icons";

import "./ListItem.scss";

const ListItem = ({ item, onFilterByField, setShowFilters }) => {
  const { id, status, name, image, species, gender, origin } = item;

  const statusIcons = status ? STATUS_ICONS[status.toLowerCase()] : "";

  return (
    <li className={"ItemContainer"} data-testid={"ListItem"}>
      <img className={"ItemImg"} alt={name} src={image} />
      <div className={"ItemInfo"}>
        <h3 className={"ItemText Title"}>{name}</h3>
        <p
          className={"ItemText Small Clickable"}
          onClick={() => onFilterByField("status", status)}
        >
          <img className={"ItemIcon"} alt={status} src={statusIcons} />
          {status}
        </p>
        <p className={"ItemText"}>
          <span
            className={"ItemText Clickable"}
            data-testid={"ClickableListItem"}
            onClick={() => onFilterByField("species", species)}
          >
            {species}
          </span>
          -
          <span
            className={"ItemText Clickable"}
            onClick={() => onFilterByField("gender", gender)}
          >
            {gender}
          </span>
        </p>
        <p className={"ItemText"}>
          <span className={"ItemText Bold"}>First seen in:</span>
          {origin && origin.name}
        </p>
      </div>
      <HashRouter>
        <Link to={`/detail/${id}`}>
          <button
            className={"ItemButton"}
            onClick={() => setShowFilters(false)}
          >
            More info...
          </button>
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

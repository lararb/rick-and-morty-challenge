import React, { useRef } from "react";
import { HashRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";

import closeIcon from "../../assets/img/cross_icon.svg";

import "./Header.scss";

const Header = ({
  onClick,
  onChange,
  filters,
  onFilterByField,
  showFilters,
}) => {
  let searchInputRef = useRef(null);
  const removeTag = (filterField) => {
    onFilterByField(filterField, undefined);
    searchInputRef.current.value = "";
  };

  const filterTag = () =>
    Object.entries(filters).map((filter, index) => {
      if (filter[1] !== undefined)
        return (
          <div key={`tag-${index}`} className={"FilterTag"}>
            <span>{`${filter[0]}: ${filter[1]}`}</span>
            <img
              alt={`close ${filter[1]}`}
              src={closeIcon}
              data-testid={"FilterTagClose"}
              onClick={() => removeTag(filter[0])}
            />
          </div>
        );
      return null;
    });

  return (
    <div data-testid={"Header"} className={"HeaderContainer"}>
      <HashRouter>
        <Link to={"/"} className={"HeaderTitle"}>
          <h1>Rick & Morty characters</h1>
        </Link>
      </HashRouter>
      {showFilters && (
        <>
          <div className={"FiltersContainer"}>{filterTag()}</div>
          <div className={"InputsContainer"}>
            <div className={"CheckboxInput"}>
              <input
                id={"inputCheckbox"}
                type={"checkbox"}
                onClick={(event) => onClick(event)}
              />
              <label htmlFor={"inputCheckbox"}>Order A-Z</label>
            </div>
            <input
              ref={searchInputRef}
              className={"SearchInput"}
              type={"search"}
              placeholder={"Search by name"}
              onChange={(event) => onChange(event)}
            />
          </div>
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  filters: PropTypes.objectOf(PropTypes.string),
  onFilterByField: PropTypes.func,
};

Header.defaultProps = {
  onClick: () => {},
  onChange: () => {},
  filters: {},
  onFilterByField: () => {},
};

export default Header;

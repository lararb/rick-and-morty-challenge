import React, { useEffect } from "react";
import PropTypes from "prop-types";

import ListItem from "../../components/ListItem/ListItem";
import "./ListView.scss";

const ListView = ({
  isSortByName,
  characters,
  onFilterByField,
  setShowFilters,
}) => {
  useEffect(() => setShowFilters(true), []);

  const sortedCharacters =
    isSortByName && characters
      ? characters.sort((a, b) => a.name.localeCompare(b.name))
      : characters.sort((a, b) => a.id - b.id);

  return (
    <ul className={"List"} data-testid={"ListView"}>
      {sortedCharacters.map(
        (item) =>
          item !== undefined && (
            <ListItem
              key={item.id}
              item={item}
              onFilterByField={onFilterByField}
              setShowFilters={setShowFilters}
            />
          )
      )}
    </ul>
  );
};

ListView.propTypes = {
  isSortByName: PropTypes.bool,
  characters: PropTypes.arrayOf(PropTypes.object),
  onFilterByField: PropTypes.func,
  setShowFilters: PropTypes.func,
};

ListView.defaultProps = {
  isSortByName: false,
  characters: [],
  onFilterByField: () => {},
  setShowFilters: () => {},
};

export default ListView;

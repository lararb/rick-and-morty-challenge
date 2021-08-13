import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ListItem from "../components/ListItem/ListItem";

describe("Test ListItem component", () => {
  const mockItem = {
    id: 1,
    name: "Fake Name",
    image: "fake url image",
    status: "alive",
    species: "human",
    gender: "female",
    origin: { name: "Fake origin name" },
  };

  it("Render component and test properties", () => {
    const mockFilterFunc = jest.fn();
    const mockShowFiltersFunc = jest.fn();

    render(
      <ListItem
        item={mockItem}
        onFilterByField={mockFilterFunc}
        setShowFilters={mockShowFiltersFunc}
      />
    );

    fireEvent.click(screen.getByTestId("ClickableListItem"));
    expect(mockFilterFunc).toHaveBeenCalled();
    expect(mockFilterFunc).toBeCalledWith("species", mockItem.species);

    fireEvent.click(screen.getByRole("button"));
    expect(mockShowFiltersFunc).toHaveBeenCalled();
  });

  it("Render component without props", () => {
    render(<ListItem />);
  });
});

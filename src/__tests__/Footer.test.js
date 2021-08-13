import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../components/Footer/Footer";

describe("Test Footer component", () => {
  it("Render component first time", () => {
    const mockCallbackNext = jest.fn();
    const mockCallbackPrev = jest.fn();

    render(
      <Footer
        page={1}
        getNextPage={mockCallbackNext}
        getPreviousPage={mockCallbackPrev}
      />
    );

    const buttonPrev = screen.getAllByRole("button")[0];
    const buttonNext = screen.getAllByRole("button")[1];

    expect(buttonPrev).toBeDisabled();

    fireEvent.click(buttonNext);
    expect(mockCallbackNext).toHaveBeenCalled();
  });

  it("Render component second time", () => {
    const mockCallbackNext = jest.fn();
    const mockCallbackPrev = jest.fn();

    render(
      <Footer
        page={2}
        getNextPage={mockCallbackNext}
        getPreviousPage={mockCallbackPrev}
      />
    );

    const buttonPrev = screen.getAllByRole("button")[0];
    const buttonNext = screen.getAllByRole("button")[1];

    expect(buttonPrev).not.toBeDisabled();
    fireEvent.click(buttonPrev);
    expect(mockCallbackPrev).toHaveBeenCalled();

    fireEvent.click(buttonNext);
    expect(mockCallbackNext).toHaveBeenCalled();
  });

  it("Render component without props", () => {
    render(<Footer />);
  });
});

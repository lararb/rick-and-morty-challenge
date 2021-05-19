import React from 'react';
import {fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Header from '../components/Header/Header';

describe('Test Header component', () => {
    it('Render component and test inputs functions', () => {
        const mockClickCheckboxFunc = jest.fn();
        const mockChangeSearchFunc = jest.fn();

        render(
            <Header
                onClick={ mockClickCheckboxFunc }
                onChange={ mockChangeSearchFunc }
                showFilters={ true }
            />
        )

        fireEvent.click(screen.getByRole('checkbox'))
        expect(mockClickCheckboxFunc).toHaveBeenCalledTimes(1)
        expect(screen.getByRole('checkbox')).toBeChecked()

        fireEvent.click(screen.getByRole('checkbox'))
        expect(mockClickCheckboxFunc).toHaveBeenCalledTimes(2)
        expect(screen.getByRole('checkbox')).not.toBeChecked()

        expect(screen.getByRole('searchbox')).toHaveValue('')
        fireEvent.change(screen.getByRole('searchbox'))
        expect(mockChangeSearchFunc).toBeDefined()
    })

    it('Render component and test filter tags', () => {
        const mockFilters = {
            name: 'fake name',
            status: 'dead',
            gender: undefined,
            species: undefined,
        };
        const mockRemoveFilterFunc = jest.fn();

        render(<Header showFilters={ true } filters={mockFilters} onFilterByField={mockRemoveFilterFunc}/>)
        expect(screen.getByTestId('Header')).toContainElement(screen.getByRole('heading'))


        fireEvent.click(screen.getAllByTestId('FilterTagClose')[0])
        expect(mockRemoveFilterFunc).toHaveBeenCalled()
    })

    it('Render component without props', () => {
        render(<Header />)
    })
});

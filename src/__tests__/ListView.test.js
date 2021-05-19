import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import ListView from '../Views/ListView/ListView';

describe('Test ListView component', () => {
    const mockCharacters = [{
        id: 1,
        name: 'Fake Name',
        image: 'fake url image',
        status: 'alive',
        species: 'human',
        gender: 'female',
        origin: { name: 'Fake origin name' }
    }];

    it('Render component', () => {
        render(<ListView isSortByName={false} characters={mockCharacters}/>)
        expect(screen.getByTestId('ListView')).toContainElement(screen.getByTestId('ListItem'))
    })

    it('Render component without props', () => {
        render(<ListView />)
    })
})

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this for additional matchers
import CharacterNote from '@/components/character/CharacterNote';

describe('CharacterNote', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<CharacterNote characterId={1} />);
    expect(getByText('Notes:')).toBeInTheDocument();
  });

  it('adds a new note', () => {
    const { getByPlaceholderText, getByText } = render(<CharacterNote characterId={1} />);

    // Type a new note into the textarea
    fireEvent.change(getByPlaceholderText('Add a note...'), {
      target: { value: 'New Note' },
    });

    // Click the "Add Note" button
    fireEvent.click(getByText('Add Note'));

    // Assert that the new note is displayed
    expect(getByText('New Note')).toBeInTheDocument();
  });

  it('shows an error for empty note', () => {
    const { getByText } = render(<CharacterNote characterId={1} />);

    // Click the "Add Note" button without entering a note
    fireEvent.click(getByText('Add Note'));

    // Assert that the error message is displayed
    expect(getByText('Please enter a non-empty note.')).toBeInTheDocument();
  });
});

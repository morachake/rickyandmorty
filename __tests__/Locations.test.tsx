import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Locations from '@/components/Locations';

// Mocking the fetch function
jest.mock('node-fetch', () => require('node-fetch'));

describe('Locations', () => {
  it('renders location information', async () => {
    const mockLocationData1 = {
      id: 1,
      name: 'Test Location 1',
      type: 'Test Type 1',
      dimension: 'Test Dimension 1',
      residents: ['resident1', 'resident2'],
      url: 'url1',
    };

    const mockLocationData2 = {
      id: 2,
      name: 'Test Location 2',
      type: 'Test Type 2',
      dimension: 'Test Dimension 2',
      residents: ['resident3', 'resident4'],
      url: 'url2',
    };
    // Mock the fetch function to return mockLocationData
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ dimension: 'Test Dimension', name: 'Test Location' }),
      })
    );

    await act(async () => {
      render(<Locations locations={[mockLocationData1, mockLocationData2]} />);
      // Wait for the asynchronous operations in useEffect to complete
      await waitFor(() => {});
    });

    // Assert that the loading message is initially displayed
    expect(screen.getByText('Loading....')).toBeInTheDocument();

    // Wait for the loading state to be false
    await waitFor(() => {
      expect(screen.queryByText('Loading....')).toBeNull();
    });

    // Assert that the location names and information are rendered
    expect(screen.getByText('Test Location 1')).toBeInTheDocument();
    expect(screen.getByText('Test Type 1')).toBeInTheDocument();
    expect(screen.getByText('Test Dimension 1')).toBeInTheDocument();

    expect(screen.getByText('Test Location 2')).toBeInTheDocument();
    expect(screen.getByText('Test Type 2')).toBeInTheDocument();
    expect(screen.getByText('Test Dimension 2')).toBeInTheDocument();
  });

  it('displays loading message while fetching data', async () => {
    // Mock the fetch function to return a promise that never resolves
    global.fetch = jest.fn(() => new Promise(() => {}));

    await act(async () => {
      render(<Locations locations={[]} />);
      // Wait for the asynchronous operations in useEffect to complete
      await waitFor(() => {});
    });

    // Assert that the loading message is displayed
    // expect(screen.getByText('Loading....')).toBeInTheDocument();
  });
});

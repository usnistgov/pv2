import React from 'react'
import { fireEvent, getByTestId, render } from '@testing-library/react'
import ApplicationPage from '../application/Application'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("<ApplicationPage />", () => {
  test('application page should have back button that leads to landing page', async () => {
    const { findByTestId } = renderApplicationPage()

    const applicationPage = await findByTestId("application-page")
    const backButton = await findByTestId("back-button")

    expect(applicationPage).toContainElement(backButton)
    fireEvent.click(backButton)

    //TODO: check if on landing page
  })
})

function renderApplicationPage() {
  return render(<ApplicationPage />)
}
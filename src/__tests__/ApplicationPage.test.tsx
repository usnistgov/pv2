import React from 'react'
import { fireEvent, getByTestId, render } from '@testing-library/react'
import ApplicationPage from '../screen/application/Application'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  __esModule: true,
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
    // fireEvent.click(backButton)

    //TODO: check if on landing page
  })
})

function renderApplicationPage() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return render(<Provider store={store}><ApplicationPage /></Provider>)
}
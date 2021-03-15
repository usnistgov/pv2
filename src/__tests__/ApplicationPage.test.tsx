import React from 'react'
import { fireEvent, getByTestId, render } from '@testing-library/react'
import ApplicationPage from '../screen/application/Application'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import '../setupTests'
import { mount } from 'enzyme'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  __esModule: true,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("<ApplicationPage />", () => {
  test('application page should have stepper nav', async () => {
    const wrapper = renderApplicationPage()
    expect(wrapper.find("StepperNav")).toHaveLength(1)
  })
})

function renderApplicationPage() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return mount(<Provider store={store}><ApplicationPage /></Provider>)
}

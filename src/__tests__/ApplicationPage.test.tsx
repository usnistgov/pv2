import React from 'react'
import ApplicationPage from '../screen/application/Application'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import '../setupTests'
import { mount } from 'enzyme'
import StepperNav from '../screen/application/components/StepperNav/StepperNav'
import AddressForm from '../screen/application/pages/AddressForm/AddressForm'
import FormField from '../screen/application/components/FormField/FormField'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom') as any,
  __esModule: true,
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("<StepperNav />", () => {
  test('StepperNav containes same as snapshot', async () => {
    const wrapper = mount(<StepperNav><div/><div/></StepperNav>)
    expect(wrapper).toMatchSnapshot()
  })

  test('StepperNav containes two buttons', async () => {
    const wrapper = mount(<StepperNav><div/><div/></StepperNav>)
    expect(wrapper.find("button")).toHaveLength(2)
  })
})

describe("<ApplicationPage />", () => {
  test('application page same as snapshot', async () => {
    const wrapper = renderApplicationPage()
    expect(wrapper).toMatchSnapshot()
  })

  test('application page should have stepper nav', async () => {
    const wrapper = renderApplicationPage()
    expect(wrapper.find("StepperNav")).toHaveLength(1)
  })

  test('should be on address page', async () => {
    const wrapper = renderApplicationPage()
    expect(wrapper.find(AddressForm)).toHaveLength(1)
  })
})

describe("<AddressForm />", () => {
  test('Address Form same as snapshot', async () => {
    const wrapper = renderAddressForm()
    expect(wrapper).toMatchSnapshot()
  })

  test('Address Form has 4 inputs', async () => {
    const wrapper = renderAddressForm()
    const formFields = wrapper.find(FormField)
    expect(formFields).toHaveLength(4)
  })

  test('Address Form first input is Address', async () => {
    const wrapper = renderAddressForm()
    const field = wrapper.find(FormField).at(0)
    expect(field.prop('label')).toEqual('Address')
    expect(field.prop('required')).toEqual(true)
  })

  test('Address Form second input is City', async () => {
    const wrapper = renderAddressForm()
    const field = wrapper.find(FormField).at(1)
    expect(field.prop('label')).toEqual('City')
    expect(field.prop('required')).toEqual(true)
  })

  test('Address Form third input is State', async () => {
    const wrapper = renderAddressForm()
    const field = wrapper.find(FormField).at(2)
    expect(field.prop('label')).toEqual('State')
    expect(field.prop('required')).toEqual(true)
  })

  test('Address Form fourth input is Zipcode', async () => {
    const wrapper = renderAddressForm()
    const field = wrapper.find(FormField).at(3)
    expect(field.prop('label')).toEqual('Zipcode')
    expect(field.prop('required')).toEqual(true)
  })
})

function renderAddressForm() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return mount(<Provider store={store}><AddressForm /></Provider>)
}

function renderApplicationPage() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return mount(<Provider store={store}><ApplicationPage /></Provider>)
}

import React from 'react'
import ApplicationPage from '../screen/application/Application'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import '../setupTests'
import { mount } from 'enzyme'
import StepperNav from '../screen/application/components/StepperNav/StepperNav'
import AddressForm from '../screen/application/pages/AddressForm/AddressForm'
import FormField from '../screen/application/components/FormField/FormField'
import ElectricalRateForm from '../screen/application/pages/ElectricalRateForm/ElectricalRateForm'
import FormSelect from '../screen/application/components/FormSelect/FormSelect'
import AdvancedBox from '../screen/application/components/AdvancedBox/AdvancedBox'
import SolarSystemForm from '../screen/application/pages/SolarSystemForm/SolarSystemForm'

console.warn = jest.fn()
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

function renderApplicationPage() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return mount(<Provider store={store}><ApplicationPage /></Provider>)
}

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

describe("<ElectricalRateForm />", () => {
  test('Electrical Rate Form same as snapshot', async () => {
    const wrapper = renderElectricalRateInfo()
    expect(wrapper).toMatchSnapshot()
  })

  test('Electrical Rate Form has 6 inputs', async () => {
    const wrapper = renderElectricalRateInfo()
    const formFields = wrapper.find(FormField)
    expect(formFields).toHaveLength(6)
  })

  test('Electrical Rate first input is Electricity Utility Company', async () => {
    const wrapper = renderElectricalRateInfo()
    const field = wrapper.find(FormField).at(0)
    expect(field.prop('label')).toEqual('Electricity Utility Company')
  })

  test('Electrical Rate second input is Annual Consumption', async () => {
    const wrapper = renderElectricalRateInfo()
    const field = wrapper.find(FormField).at(1)
    expect(field.prop('label')).toEqual('Annual Consumption')
  })

  test('Electrical Rate third input is Monthly Flat Rate Charge', async () => {
    const wrapper = renderElectricalRateInfo()
    const field = wrapper.find(FormField).at(2)
    expect(field.prop('label')).toEqual('Monthly Flat Rate Charge')
  })

  test('Electrical Rate fourth input is Electricity Unit Price', async () => {
    const wrapper = renderElectricalRateInfo()
    const field = wrapper.find(FormField).at(3)
    expect(field.prop('label')).toEqual('Electricity Unit Price')
  })

  test('Electrical Rate fifth input is Excess Generation / FiT Unit Price', async () => {
    const wrapper = renderElectricalRateInfo()
    const field = wrapper.find(FormField).at(4)
    expect(field.prop('label')).toEqual('Excess Generation / FiT Unit Price')
  })

  test('Electrical Rate sixth input is PV Grid Connection Rate (Monthly)', async () => {
    const wrapper = renderElectricalRateInfo()
    const field = wrapper.find(FormField).at(5)
    expect(field.prop('label')).toEqual('PV Grid Connection Rate (Monthly)')
  })

  test('Electrical Rate Form has 3 selects', async () => {
    const wrapper = renderElectricalRateInfo()
    const selects = wrapper.find(FormSelect)
    expect(selects).toHaveLength(3)
  })

  test('Electrical Rate first select is Net Metering or Feed In Tariff (FiT)', async () => {
    const wrapper = renderElectricalRateInfo()
    const select = wrapper.find(FormSelect).at(0)
    expect(select.prop('label')).toEqual('Net Metering or Feed In Tariff (FiT)')
  })

  test('Electrical Rate second select is "Do you want to view/edit annual escalation rates?"', async () => {
    const wrapper = renderElectricalRateInfo()
    const select = wrapper.find(FormSelect).at(1)
    expect(select.prop('label')).toEqual('Do you want to view/edit annual escalation rates?')
  })

  test('Electrical Rate third select is "Are escalation rates the same for consumption and production?"', async () => {
    const wrapper = renderElectricalRateInfo()
    const select = wrapper.find(FormSelect).at(2)
    expect(select.prop('label')).toEqual('Are escalation rates the same for consumption and production?')
  })

  test('Electrical Rate has 1 advanced box', async () => {
    const wrapper = renderElectricalRateInfo()
    const box = wrapper.find(AdvancedBox)
    expect(box).toHaveLength(1)
  })
})

function renderElectricalRateInfo() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return mount(<Provider store={store}><ElectricalRateForm /></Provider>)
}

describe("<SolarSystemForm />", () => {
  test('Solar System Form same as snapshot', async () => {
    const wrapper = renderSolarSystemForm()
    expect(wrapper).toMatchSnapshot()
  })

  test('Solar System Form has 6 inputs', async () => {
    const wrapper = renderSolarSystemForm()
    const formFields = wrapper.find(FormField)
    expect(formFields).toHaveLength(6)
  })

  test('Solar System first input is System Panel Brand and Type', async () => {
    const wrapper = renderSolarSystemForm()
    const field = wrapper.find(FormField).at(0)
    expect(field.prop('label')).toEqual('System Panel Brand and Type')
  })

  test('Solar System second input is Total System Size', async () => {
    const wrapper = renderSolarSystemForm()
    const field = wrapper.find(FormField).at(1)
    expect(field.prop('label')).toEqual('Total System Size')
  })

  test('Solar System third input is Estimated Annual Production', async () => {
    const wrapper = renderSolarSystemForm()
    const field = wrapper.find(FormField).at(2)
    expect(field.prop('label')).toEqual('Estimated Annual Production')
  })

  test('Solar System fourth input is Panel Lifetime', async () => {
    const wrapper = renderSolarSystemForm()
    const field = wrapper.find(FormField).at(3)
    expect(field.prop('label')).toEqual('Panel Lifetime')
  })

  test('Solar System fifth input is Inverter Lifetime', async () => {
    const wrapper = renderSolarSystemForm()
    const field = wrapper.find(FormField).at(4)
    expect(field.prop('label')).toEqual('Inverter Lifetime')
  })

  test('Solar System sixth input is System Efficiency Degradation Rate (Year-Over-Year %)', async () => {
    const wrapper = renderSolarSystemForm()
    const field = wrapper.find(FormField).at(5)
    expect(field.prop('label')).toEqual('System Efficiency Degradation Rate (Year-Over-Year %)')
  })

  test('Solar System Form has 1 select', async () => {
    const wrapper = renderSolarSystemForm()
    const selects = wrapper.find(FormSelect)
    expect(selects).toHaveLength(1)
  })

  test('Solar System third select is Inverter Type', async () => {
    const wrapper = renderSolarSystemForm()
    const select = wrapper.find(FormSelect).at(0)
    expect(select.prop('label')).toEqual('Inverter Type')
  })

  test('Solar System has 1 advanced box', async () => {
    const wrapper = renderSolarSystemForm()
    const box = wrapper.find(AdvancedBox)
    expect(box).toHaveLength(1)
  })
})

function renderSolarSystemForm() {
  const mockStore = configureStore()
  const store: any = mockStore({ placeholder: 0 })
  store.injectReducer = () => { return undefined }
  return mount(<Provider store={store}><SolarSystemForm /></Provider>)
}

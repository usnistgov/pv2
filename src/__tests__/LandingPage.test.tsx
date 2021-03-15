import React from 'react'
import LandingPage from '../screen/LandingPage/LandingPage'
import { shallow } from 'enzyme'
import '../setupTests'
import Button from '../screen/LandingPage/components/Button/Button'

describe("<Button />", () => {
  test('button same as snapshot', async () => {
    const mockFn = jest.fn()
    const button = shallow(<Button text='Test Button' onClick={mockFn}/>)
    expect(button).toMatchSnapshot()
  })

  test('button click', async () => {
    const mockFn = jest.fn()
    const button = shallow(<Button text='Test Button' onClick={mockFn}/>)
    button.simulate('click')
    expect(mockFn).toHaveBeenCalled()
  })
})

describe("<LandingPage />", () => {
  test('landing page same as snapshot', async () => {
    const wrapper = shallow(<LandingPage />)
    expect(wrapper).toMatchSnapshot()
  })

  test('landing page should have 1 button', async () => {
    const wrapper = shallow(<LandingPage />)
    expect(wrapper.find('Button')).toHaveLength(1)
  })
  
  test('landing page should have 1 image', async () => {
    const wrapper = shallow(<LandingPage />)
    expect(wrapper.find("img")).toHaveLength(1)
  })
})

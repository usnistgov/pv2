import React from 'react'
import { render } from '@testing-library/react'
import LandingPage from '../screen/LandingPage/LandingPage'
import { shallow } from 'enzyme'
import '../setupTests'

describe("<LandingPage />", () => {
  test('landing page should have button', async () => {
    const wrapper = shallow(<LandingPage />)
    expect(wrapper.find("Button")).toHaveLength(1)
  })
  
  test('landing page should have image', async () => {
    const wrapper = shallow(<LandingPage />)
    expect(wrapper.find("img")).toHaveLength(1)
  })
})

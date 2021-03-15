import React from 'react'
import { render } from '@testing-library/react'
import LandingPage from '../screen/LandingPage/LandingPage'
import { shallow } from 'enzyme'
import '../setupTests'

describe("<LandingPage />", () => {
  test('landing page should have button', async () => {
    const wrapper = shallow(<LandingPage />)
    expect(wrapper.find("Button")).toHaveLength(1)

    // const { findByTestId } = renderLandingPage()

    // const landingPage = await findByTestId("landing-page")
    // const button = await findByTestId("button")

    // expect(landingPage).toContainElement(button)
  })
  
  test('landing page should have image', async () => {
    const { findByTestId } = renderLandingPage()

    const landingPage = await findByTestId("landing-page")
    const image = await findByTestId("landing-image")

    expect(landingPage).toContainElement(image)
  })
})

function renderLandingPage() {
  return render(<LandingPage />)
}
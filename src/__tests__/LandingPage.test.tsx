import React from 'react'
import { render } from '@testing-library/react'
import LandingPage from '../screen/LandingPage/LandingPage'
import '@testing-library/jest-dom'

describe("<LandingPage />", () => {
  test('landing page should have button', async () => {
    const { findByTestId } = renderLandingPage()

    const landingPage = await findByTestId("landing-page")
    const button = await findByTestId("button")

    expect(landingPage).toContainElement(button)
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
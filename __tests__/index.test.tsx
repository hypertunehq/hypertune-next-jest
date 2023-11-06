/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom"
import Home, { getServerSideProps } from '@/pages/index'

describe('Home', () => {
  it('renders a heading', async () => {
    const { props}  = await getServerSideProps();

    render(<Home {...props} />)

    const heading = screen.getByRole('heading', {
      name: /flag true/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
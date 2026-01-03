import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '../../src/components/home/Header'
import { SiteProvider } from '../../src/context/SiteContext'

describe('Header', () => {
  it('renders site name from context', () => {
    render(
      <SiteProvider>
        <Header />
      </SiteProvider>,
    )

    expect(screen.getByText(/PPIDK TIMTENGKA/)).toBeInTheDocument()
  })
})

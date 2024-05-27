import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { Header } from '@/components/layout/Header'
import dayjs from 'dayjs'

describe('Header suit test', () => {
  afterEach(() => {
    cleanup()
  })

  it("should render the header root", () => {
    //ajeitar
    render(
      <Header.Root>
        oi
      </Header.Root>
    )
    //atuar
    const header = screen.getByRole('banner')
    //afirmar
    expect(header).toBeVisible()
  })

  it("should render the header title", () => {
    //ajeitar
    render(
      <Header.Title text='Isso é um test' />
    )
    //atuar
    const headerTitle = screen.getByRole('heading')
    //afirmar
    expect(headerTitle).toBeVisible()
  })

  it("should render the header day", () => {
    //ajeitar
    render(
      <Header.HeaderDay />
    )
    //atuar
    const headerDaySVG = screen.getByTestId('calendar')
    const headerDayText = screen.getByText(dayjs().format("DD/MM/YY"))
    //afirmar
    expect(headerDaySVG).toBeVisible()
    expect(headerDayText).toBeVisible()
  })

  it("should render all together", () => {
    //ajeitar
    render(
      <Header.Root>
        <Header.Title text='Isso é um test' />
        <Header.HeaderDay />
      </Header.Root>
    )
    //atuar
    const header = screen.getByRole('banner')
    const headerTitle = screen.getByRole('heading')
    const headerDaySVG = screen.getByTestId('calendar')
    const headerDayText = screen.getByText(dayjs().format("DD/MM/YY"))
    //afirmar
    expect(headerTitle).toBeVisible()
    expect(headerDaySVG).toBeVisible()
    expect(headerDayText).toBeVisible()
    expect(header).toBeVisible()
  })
})
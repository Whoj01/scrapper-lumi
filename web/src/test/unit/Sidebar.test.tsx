import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { SideBar } from '@/components/layout/SideBar'


describe('SideBar suit test', () => {
  afterEach(() => {
    cleanup()
  })

  it("should render the sidebar root", () => {
    //ajeitar
    render(
      <SideBar.Root>
        oi
      </SideBar.Root>
    )
    //atuar
    const sidebar = screen.getByRole('complementary')
    //afirmar
    expect(sidebar).toBeVisible()
  })

  it("Should render the sidebar image", () => {
    //ajeitar
    render(
      <SideBar.Image src='/test' width={30} height={30} alt='teste' />
    )
    //atuar
    const sidebarImage = screen.getByRole('img')
    //afirmar
    expect(sidebarImage).toBeVisible()
  })

  it("Should render the sidebar divisor", () => {
    //ajeitar
    render(
      <SideBar.Divisor />
    )
    //atuar
    const sidebarDivisor = screen.getByTestId('divisor')
    //afirmar
    expect(sidebarDivisor).toBeVisible()
  })

  it("Should render the sidebar menu", () => {
    //ajeitar
    render(
      <SideBar.Menu>
        Ainda sem links
      </SideBar.Menu>
    )
    //atuar
    const sidebarMenu = screen.getByRole('list')
    //afirmar
    expect(sidebarMenu).toBeVisible()
  })

  it("Should render menu item", () => {
    //ajeitar
    render(
      <SideBar.MenuItem href='/'>
        Ainda sem links
      </SideBar.MenuItem>
    )
    //atuar
    const sidebarMenuItem = screen.getByRole('listitem')
    //afirmar
    expect(sidebarMenuItem).toBeVisible()
  })
})
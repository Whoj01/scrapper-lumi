import MockAdapter from 'axios-mock-adapter'
import { afterEach, describe, expect, it } from 'vitest'
import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Input } from '@/components/ui/input'
import '@testing-library/jest-dom/vitest'
import { api } from '@/lib/axios'

describe('useInput suit test', () => {
  const mockUser = {
    id: 'dsd',
    name: 'mock name',
    code: 'mock code',
  }

  const mockAxios = new MockAdapter(api)

  afterEach(() => {
    cleanup()
    mockAxios.reset()
  })

  it("should inital be a empty string", () => {
    //ajeitar
    render(<Input />)
    mockAxios.onGet(/\/users\/.*/).reply(200, {})

    //atuar
    const input = screen.getByRole('textbox') as HTMLInputElement
    const inputValue = input.value
    //afirmar

    expect(inputValue).toBe('')
  })

  it("should update value on change", () => {
    //ajeitar
    render(<Input />)

    const mockValue = 'new value'

    mockAxios.onGet(/\/users\/.*/).reply(200, {})

    //atuar
    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: mockValue } })

    const newValue = input.value
    //afirmar

    expect(newValue).toBe(mockValue)
  })

  it("should clear value on clear", () => {
    //ajeitar
    const mockValue = 'new value'
    render(<Input />)
    mockAxios.onGet(/\/users\/.*/).reply(200, {})

    //atuar
    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.change(input, { target: { value: mockValue } })

    const clearButton = screen.getByTestId('clear')
    fireEvent.click(clearButton)

    const newValue = input.value

    //afirmar

    expect(newValue).toBe('')
  })

  it("should focus input on click of search", () => {
    //ajeitar
    render(<Input />)

    //atuar
    const input = screen.getByRole('textbox') as HTMLInputElement
    const searchSvg = screen.getByTestId('search')

    fireEvent.click(searchSvg)

    const isFocused = input === document.activeElement
    //afirmar

    expect(isFocused).toBeTruthy()
  })

  it("should show users on input change", () => {
    const mockValue = 'new value'
    mockAxios.onGet(/\/users\/.*/).reply(200, [mockUser, mockUser])

    render(<Input />)

    //atuar
    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: mockValue } })

    const usersList = screen.getByRole('list')

    //afirmar

    expect(usersList).toBeVisible()
  })

  it("should show show empty message if users is empty", () => {
    const mockValue = 'new value'
    mockAxios.onGet(/\/users\/.*/).reply(200, [])

    render(<Input />)

    //atuar
    const input = screen.getByRole('textbox') as HTMLInputElement
    fireEvent.change(input, { target: { value: mockValue } })

    const userEmptyMessage = screen.getByText(/Nenhum usuário foi encontrado/i)

    //afirmar

    expect(userEmptyMessage).toBeVisible()
  })
})
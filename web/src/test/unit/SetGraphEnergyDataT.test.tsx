import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { SetGraphEnergyData } from '@/components/energyConsume/SetGraphEnergyData'

describe('SetGraphEneryData suit test', () => {
  const changeDataTypes = vi.fn((param) => param)

  const mockTypeConsume = {
    type: 'consume' as const
  }

  const mockTypeCompensed = {
    type: 'compensed' as const
  }

  afterEach(() => {
    cleanup()
  })

  it("should render the SetGraphEnergyData", () => {
    //ajeitar
    render(
      <SetGraphEnergyData changeDataType={changeDataTypes} chartType={mockTypeConsume} />
    )
    //atuar
    const SetGraphEnergyDataCard = screen.getByTestId('card')
    //afirmar
    expect(SetGraphEnergyDataCard).toBeVisible()
  })

  it("Should render the correct to the graph type consume", () => {
    //ajeitar
    render(
      <SetGraphEnergyData changeDataType={changeDataTypes} chartType={mockTypeConsume} />
    )
    //atuar
    const buttonChangeType = screen.getByTestId('consume')
    const buttonValue = buttonChangeType.textContent
    //afirmar
    expect(buttonValue).toBe('Selecionado')
  })

  it("Should render the correct to the graph type compensed", () => {
    //ajeitar
    render(
      <SetGraphEnergyData changeDataType={changeDataTypes} chartType={mockTypeCompensed} />
    )
    //atuar
    const buttonChangeType = screen.getByTestId('compensed')
    const buttonValue = buttonChangeType.textContent
    //afirmar
    expect(buttonValue).toBe('Selecionado')
  })

  it("Should on click compensed call the changeDataType function", () => {
    //ajeitar
    render(
      <SetGraphEnergyData changeDataType={changeDataTypes} chartType={mockTypeCompensed} />
    )
    //atuar
    const buttonChangeType = screen.getByTestId('consume')
    fireEvent.click(buttonChangeType)
    //afirmar
    expect(changeDataTypes).toHaveBeenCalledWith(mockTypeConsume)
  })

  it("Should on click consume call the changeDataType function", () => {
    //ajeitar
    render(
      <SetGraphEnergyData changeDataType={changeDataTypes} chartType={mockTypeConsume} />
    )
    //atuar
    const buttonChangeType = screen.getByTestId('compensed')
    fireEvent.click(buttonChangeType)
    //afirmar
    expect(changeDataTypes).toHaveBeenCalledWith(mockTypeCompensed)
  })
})

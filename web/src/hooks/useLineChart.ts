import type { Bill } from "@/types/Bill"
import type { User } from "@/types/User"
import type { TooltipItem } from 'chart.js'
import { useBill } from "./useBill"
import dayjs from "dayjs"
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

export const useLineChart = () => {
  const colors = [
    {
    backgroundColor: 'rgba(249,65,68,0.1)', 
    borderColor: '#F94144', 
  },
  {
    backgroundColor: 'rgba(249,199,79,0.2)',
    borderColor: '#F9C74F',
  },
  {
    backgroundColor: 'rgba(45,156,219,.2)',
    borderColor: '#2D9CDB',
  }
  ]

  const monthValues: { [key: string]: number } = {
    jan: 1,
    fev: 2,
    mar: 3,
    abr: 4,
    mai: 5,
    jun: 6,
    jul: 7,
    ago: 8,
    set: 9,
    out: 10,
    nov: 11,
    dez: 12
  };

  const renderEnergyConsumeGraph = (users: User[], bills: Bill[]) => {
    const { linkBillsAndUsers } = useBill()

    const billsWithUsers = linkBillsAndUsers(users, bills)
    
    const AllMonths = billsWithUsers.map((bill) => dayjs(bill.month).format("MMM/YY") ).filter((month, index, self) => self.indexOf(month) === index)
    const userNames = billsWithUsers.map((bill) => bill.user?.name).filter((name, index, self) => self.indexOf(name) === index)
    
    const sortedMonths = sortMonths(AllMonths)

    const data = {
      labels: sortedMonths,
      datasets: userNames.map((userName, index) => {
        return {
          label: userName,
          data: billsWithUsers
          .filter((billToCompare) => billToCompare.user?.name === userName)
          .map((bill) => bill.energyConsume),
          fill: true,
          backgroundColor: colors[index].backgroundColor, 
          borderColor: colors[index].borderColor, 
        }
      })   
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
       
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom' as const,
            align: 'start' as const,
          },
           tooltip: {
          enabled: true,
          callbacks: {
            label: (tooltipItem: TooltipItem<'line'>) => {
              return `Consumo: ${tooltipItem.formattedValue} kWh`;
            }
          }
        },
        },
      }
  
      return { data, options }
    }

  const renderCompensetedEnergyGraph = (users: User[], bills: Bill[]) => {
    const { linkBillsAndUsers } = useBill()

    const billsWithUsers = linkBillsAndUsers(users, bills)

    const AllMonths = billsWithUsers.map((bill) => dayjs(bill.month).format("MMM/YY") ).filter((month, index, self) => self.indexOf(month) === index)
    const userNames = billsWithUsers.map((bill) => bill.user?.name).filter((name, index, self) => self.indexOf(name) === index)

    const data = {
      labels: AllMonths,
      datasets: userNames.map((userName, index) => {
        return {
          label: userName,
          data: billsWithUsers
          .filter((billToCompare) => billToCompare.user?.name === userName)
          .map((bill) => bill.compensedEnergy),
          fill: true,
          backgroundColor: colors[index].backgroundColor, 
          borderColor: colors[index].borderColor, 
        }
      })   
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom' as const,
            align: 'start' as const,
          },
           tooltip: {
          enabled: true,
          callbacks: {
            label: (tooltipItem: TooltipItem<'line'>) => { 
              return `Energia Compensada: ${tooltipItem.formattedValue} kWh`;
            }
          }
        },
        },
      }
  
      return { data, options }
  }

  const renderValueWithoutGDGraph = (users: User[], bills: Bill[]) => {
    const { linkBillsAndUsers } = useBill()

    const usersWithBills = linkBillsAndUsers(users, bills)

    const AllMonths = usersWithBills.map((bill) => dayjs(bill.month).format("MMM/YY") ).filter((month, index, self) => self.indexOf(month) === index)
    const userNames = usersWithBills.map((bill) => bill.user?.name).filter((name, index, self) => self.indexOf(name) === index)

    const data = {
      labels: AllMonths,
      datasets: userNames.map((userName, index) => {
        return {
          label: userName,
          data: usersWithBills
          .filter((billToCompare) => billToCompare.user?.name === userName)
          .map((bill) => bill.totalValueWithoutGD),
          fill: true,
          backgroundColor: colors[index].backgroundColor, 
          borderColor: colors[index].borderColor, 
        }
      })   
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom' as const,
          align: 'start' as const,
        },
         tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem: TooltipItem<'line'>) => {
            return `Valor total sem GD: R$${tooltipItem.formattedValue}` 
          }
        }
      },
      },
    }

    return { data, options }
  }

  const renderEconomyGDGraph = (users: User[], bills: Bill[]) => {
    const { linkBillsAndUsers } = useBill()

    const usersWithBills = linkBillsAndUsers(users, bills)

    const AllMonths = usersWithBills.map((bill) => dayjs(bill.month).format("MMM/YY") ).filter((month, index, self) => self.indexOf(month) === index)
    const userNames = usersWithBills.map((bill) => bill.user?.name).filter((name, index, self) => self.indexOf(name) === index)

    const data = {
      labels: AllMonths,
      datasets: userNames.map((userName, index) => {
        return {
          label: userName,
          data: usersWithBills
          .filter((billToCompare) => billToCompare.user?.name === userName)
          .map((bill) => bill.economyGD),
          fill: true,
          backgroundColor: colors[index].backgroundColor, 
          borderColor: colors[index].borderColor, 
        }
      })   
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      },
      plugins: {
        legend: {
          position: 'bottom' as const,
          align: 'start' as const,
        },
         tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem: TooltipItem<'line'>) => {
            return `Economia com GD: R$${tooltipItem.formattedValue}`; 
          }
        }
      },
      },
    }

    return { data, options }
  }

  const sortMonths = (months: string[]) => {
    return months.sort((a, b) => {
      const [monthA, yearA] = a.split('/');
      const [monthB, yearB] = b.split('/');
      const valueA = +yearA * 12 + monthValues[monthA];
      const valueB = +yearB * 12 + monthValues[monthB];
      return valueA - valueB;
    });
  };

  return { renderEnergyConsumeGraph, renderCompensetedEnergyGraph, renderEconomyGDGraph, renderValueWithoutGDGraph }
}
import type { Bill } from "@/types/Bill"
import type { User } from "@/types/User"

export const useBill = () => {
  const linkBillsAndUsers = (users: User[], bills: Bill[]) => {
    return bills.map((bill) => {
      const user = users.find((user) => user.id === bill.userId)

      return {
        ...bill,
        user,
      }
    })
  }

  const getMostConsumerUser = (users: User[], bills: Bill[]) => {
    const billsWithUsers = linkBillsAndUsers(users, bills)

    const userEnergyConsumption: { [key: string]: number } = {};

    for (const bill of billsWithUsers) {
      if (!userEnergyConsumption[bill.userId]) {
        userEnergyConsumption[bill.userId] = 0;
      }
      userEnergyConsumption[bill.userId] += bill.compensedEnergy;
    }

    const mostConsumerUserId = Object.keys(userEnergyConsumption)?.reduce((a, b) => userEnergyConsumption[a] > userEnergyConsumption[b] ? a : b);
    const mostConsumerUser = users.find(user => user.id === mostConsumerUserId);

    const totalcompensedEnergy = Object.values(userEnergyConsumption)?.reduce((a, b) => a + b, 0);
    const otherUserscompensedEnergy = totalcompensedEnergy - userEnergyConsumption[mostConsumerUserId];

    const percentageMoreConsumed = (userEnergyConsumption[mostConsumerUserId] / otherUserscompensedEnergy) * 100;

    return {
      mostConsumerUser,
      percentageMoreConsumed
    };
  }

  const getMostCompensetedUser = (users: User[], bills: Bill[]) => {
    const billsWithUsers = linkBillsAndUsers(users, bills)

    const userEnergyCompensated: { [key: string]: number } = {};

    for (const bill of billsWithUsers) {
      if (!userEnergyCompensated[bill.userId]) {
        userEnergyCompensated[bill.userId] = 0;
      }
      userEnergyCompensated[bill.userId] += bill.energyConsume;
    }

    const mostCompensatedUserId = Object.keys(userEnergyCompensated)?.reduce((a, b) => userEnergyCompensated[a] > userEnergyCompensated[b] ? a : b);
    const mostCompensatedUser = users.find(user => user.id === mostCompensatedUserId);

    const totalEnergyCompensated = Object.values(userEnergyCompensated)?.reduce((a, b) => a + b, 0);
    const otherUsersEnergyCompensated = totalEnergyCompensated - userEnergyCompensated[mostCompensatedUserId];

    const percentageMoreCompensated = (userEnergyCompensated[mostCompensatedUserId] / otherUsersEnergyCompensated) * 100;

    return {
      mostCompensatedUser,
      totalEnergyCompensated,
      percentageMoreCompensated
    };
  }

  const getMostAverageConsumerUser = (users: User[], bills: Bill[]) => {
    const billsWithUsers = linkBillsAndUsers(users, bills)

    const userAverageEnergyConsume: { [key: string]: number[] } = {};

    for (const bill of billsWithUsers) {
      if (!userAverageEnergyConsume[bill.userId]) {
        userAverageEnergyConsume[bill.userId] = [];
      }
      userAverageEnergyConsume[bill.userId].push(bill.averageEnergyConsume);
    }

    const highestMonthsOfUsers: Array<{
      userId: string,
      maxAverage: number
    }> = []

    for (const [key, value] of Object.entries(userAverageEnergyConsume)) {
      const tempMax = Math.max(...value)

      highestMonthsOfUsers.push({
        userId: key,
        maxAverage: tempMax
      })
    }

    const highestAverageEnergyConsumed = {
      maxAverage: Math.max(...highestMonthsOfUsers.map(user => user.maxAverage)),
      userId: highestMonthsOfUsers.find(user => user.maxAverage === Math.max(...highestMonthsOfUsers.map(user => user.maxAverage)))?.userId
    }

    const otherUsersAverageEnergyConsumed = highestMonthsOfUsers.filter(user => user.userId !== highestAverageEnergyConsumed.userId).map(user => user.maxAverage)?.reduce((a, b) => a + b, 0)

    const percentageAverageEnergy = (highestAverageEnergyConsumed.maxAverage / otherUsersAverageEnergyConsumed) * 100;

    return {
      userWithHighestAverage: users.find(user => user.id === highestAverageEnergyConsumed.userId),
      percentageAverageEnergy,
      highestAverageEnergyConsumed: highestAverageEnergyConsumed.maxAverage
    }
  }

  const getMostEconomyGD = (users: User[], bills: Bill[]) => {
    const billsWithUsers = linkBillsAndUsers(users, bills)

    const userEconomyGD: { [key: string]: number[] } = {};

    for (const bill of billsWithUsers) {
      if (!userEconomyGD[bill.userId]) {
        userEconomyGD[bill.userId] = [];
      }

      userEconomyGD[bill.userId].push(bill.economyGD);
    }

    const highestEconomyGDOfUsers: Array<{
      userId: string,
      maxEconomyGD: number
    }> = []

    for (const [key, value] of Object.entries(userEconomyGD)) {
      const tempMax = Math.max(...value)

      highestEconomyGDOfUsers.push({
        userId: key,
        maxEconomyGD: tempMax
      })
    }

    const highestEconomyGD = {
      maxEconomyGD: Math.max(...highestEconomyGDOfUsers.map(user => user.maxEconomyGD)),
      userId: highestEconomyGDOfUsers.find(user => user.maxEconomyGD === Math.max(...highestEconomyGDOfUsers.map(user => user.maxEconomyGD)))?.userId
    }

    const otherUsersAverageEnergyConsumed = highestEconomyGDOfUsers.filter(user => user.userId !== highestEconomyGD.userId).map(user => user.maxEconomyGD)?.reduce((a, b) => a + b, 0)

    const percentageAverageEnergy = (highestEconomyGD.maxEconomyGD / otherUsersAverageEnergyConsumed) * 100;

    return {
      userWithHighestAverage: users.find(user => user.id === highestEconomyGD.userId),
      percentageAverageEnergy,
      highestAverageEnergyConsumed: highestEconomyGD.maxEconomyGD
    }
  }

  const getMostValueWithoutGD = (users: User[], bills: Bill[]) => {
    const billsWithUsers = linkBillsAndUsers(users, bills)

    const userTotalValueWithoutGD: { [key: string]: number[] } = {};

    for (const bill of billsWithUsers) {
      if (!userTotalValueWithoutGD[bill.userId]) {
        userTotalValueWithoutGD[bill.userId] = [];
      }

      userTotalValueWithoutGD[bill.userId].push(bill.totalValueWithoutGD);
    }

    const highestValueWithoutGD: Array<{
      userId: string,
      maxValueWithoutGD: number
    }> = []

    for (const [key, value] of Object.entries(userTotalValueWithoutGD)) {
      const tempMax = Math.max(...value)

      highestValueWithoutGD.push({
        userId: key,
        maxValueWithoutGD: tempMax
      })
    }

    const highestTotalValueWithoutGD = {
      maxValueWithoutGD: Math.max(...highestValueWithoutGD.map(user => user.maxValueWithoutGD)),
      userId: highestValueWithoutGD.find(user => user.maxValueWithoutGD === Math.max(...highestValueWithoutGD.map(user => user.maxValueWithoutGD)))?.userId
    }

    const otherUsersValueWithoutGD = highestValueWithoutGD.filter(user => user.userId !== highestTotalValueWithoutGD.userId).map(user => user.maxValueWithoutGD)?.reduce((a, b) => a + b, 0)

    const percentageValueWithoutGD = (highestTotalValueWithoutGD.maxValueWithoutGD / otherUsersValueWithoutGD) * 100;

    return {
      userWithHighestValueWithoutGD: users.find(user => user.id === highestTotalValueWithoutGD.userId),
      percentageValueWithoutGD,
      highestValueWithoutGD: highestTotalValueWithoutGD.maxValueWithoutGD
    }
  }

  return {
    linkBillsAndUsers,
    getMostConsumerUser,
    getMostCompensetedUser,
    getMostAverageConsumerUser,
    getMostEconomyGD,
    getMostValueWithoutGD
  }
}
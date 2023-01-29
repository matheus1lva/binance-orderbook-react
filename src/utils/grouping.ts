import { Operation } from "../hooks/useOrderBook";

export function groupByTicketSize(ticketSize: number, levels: Operation[]) {
  const result = [];

  for (let i = 0; i < levels.length; i++) {
    const prevLevel = levels[i - 1];
    const level1 = levels[i];
    const level2 = levels[i + 1];

    if (
      prevLevel &&
      level1 &&
      Number(level1[0]) - ticketSize === Number(prevLevel[0])
    )
      return;

    if (level2 && Number(level1[0]) - Number(level2[0]) < ticketSize) {
      const newLevel = [level2[0], level1[1] + level2[1]];
      result.push(newLevel);
    } else {
      result.push(level1);
    }
  }
  return result;
}

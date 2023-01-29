import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useOrderBookContext } from "../../Contexts/BidsContext";
import { Operation } from "../../hooks/useOrderBook";

export function formatNumber(
  number: number | bigint,
  options: {
    thousand: number;
    decimal: number;
  }
): string {
  const resultOptions = {};

  if (options.thousand !== 0) {
    // @ts-ignore
    resultOptions.maximumSignificantDigits = options.thousand;
  }
  if (options.decimal !== 0) {
    // @ts-ignore
    resultOptions.maximumFractionDigits = options.decimal;
  }

  return Intl.NumberFormat("en-US", { ...resultOptions }).format(
    Number(number)
  );
}

export interface OrderBookTableProps {
  data: Operation[];
  type: "bids" | "asks";
  symbol: string;
}

export function OrderBookTable({ data, type, symbol }: OrderBookTableProps) {
  const { precision } = useOrderBookContext();
  const [firstCurrency, secondCurrency] = symbol.split("/");
  return (
    <TableContainer color={type === "bids" ? "green" : "red"}>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>Price({firstCurrency.toLowerCase()})</Th>
            <Th>Amount({secondCurrency.toLowerCase()})</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum, index) => {
            // there was no better candidate for the key here ;(
            return (
              <Tr key={`${datum[0]}-${index}`}>
                <Td>{formatNumber(Number(datum[0]), precision)}</Td>
                <Td>{datum[1]}</Td>
                <Td isNumeric>{Number(datum[0]) * Number(datum[1])}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

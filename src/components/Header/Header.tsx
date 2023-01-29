import { SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { DigitsSelector } from "../DigitsSelector/DigitsSelector";

export function Header({
  setSymbolOrderBook,
  price,
}: {
  setSymbolOrderBook: Dispatch<SetStateAction<string>>;
  price?: string;
}) {
  const [symbol, setSymbol] = useState("");

  return (
    <>
      <Text>Symbol</Text>

      <Box display={"flex"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={3} alignItems={"center"}>
          <Input
            placeholder="Insert the symbol"
            value={symbol}
            onChange={(evt) => {
              setSymbol(evt.target.value ?? "");
            }}
            width="300px"
          />
          <Button
            type="button"
            onClick={() => {
              setSymbolOrderBook(symbol);
            }}
          >
            <SearchIcon />
          </Button>
          {price && <Text>Price: {price}</Text>}
        </Box>
        <DigitsSelector />
      </Box>
    </>
  );
}

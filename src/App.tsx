import React, { useState } from "react";
import { Text, Box, Input, Button } from "@chakra-ui/react";
import { useOrderBook } from "./hooks/useOrderBook";
import { OrderBookTable } from "./components/OrderBookTable/OrderBookTable";
import { SearchIcon } from "@chakra-ui/icons";
import { useOrderBookContext } from "./Contexts/BidsContext";
import { Header } from "./components/Header/Header";

function App() {
  const { price, setSymbol: setSymbolOrderBook, symbol } = useOrderBook();
  const { bids, asks } = useOrderBookContext();
  return (
    <Box
      bg={"#0D1117"}
      color="#636B76"
      height={"100vh"}
      width="100%"
      paddingX={"15px"}
    >
      <Header setSymbolOrderBook={setSymbolOrderBook} price={price} />
      {bids.length > 0 && (
        <Box height="500px" overflowY={"scroll"} mb="20px" mt="20px">
          <OrderBookTable symbol={symbol} data={bids} type="bids" />
        </Box>
      )}
      {asks.length > 0 && (
        <Box height="500px" overflowY={"scroll"}>
          <OrderBookTable symbol={symbol} data={asks} type="asks" />
        </Box>
      )}
    </Box>
  );
}
export default App;

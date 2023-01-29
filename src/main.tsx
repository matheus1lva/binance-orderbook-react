import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { OrderBookContextProvider } from "./Contexts/BidsContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <OrderBookContextProvider>
          <App />
        </OrderBookContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

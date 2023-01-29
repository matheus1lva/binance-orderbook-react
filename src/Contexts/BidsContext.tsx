import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import { Operation } from "../hooks/useOrderBook";

export interface OrderBookContextValue {
  setBids: Dispatch<SetStateAction<Operation[]>>;
  setAsks: Dispatch<SetStateAction<Operation[]>>;
  asks: Operation[];
  bids: Operation[];
}

export const OrderBookContext = createContext<OrderBookContextValue | null>(
  null
);

export const OrderBookContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [bids, setBids] = useState<Operation[]>([]);
  const [asks, setAsks] = useState<Operation[]>([]);
  const [precision, setPrecision] = useState<{
    label: string;
    decimal: number;
    thousand: number;
  }>({
    label: "0.01",
    decimal: 2,
    thousand: 0,
  });
  const value = useMemo(() => {
    return {
      asks,
      bids,
      setAsks,
      setBids,
      precision,
      setPrecision,
    };
  }, [bids, asks, setBids, setAsks, precision, setPrecision]);
  return (
    <OrderBookContext.Provider value={value}>
      {children}
    </OrderBookContext.Provider>
  );
};

export const useOrderBookContext = (): any => {
  const context = useContext(OrderBookContext);

  if (!context) {
    throw new Error(
      "useClippingContext must be used within a ClippingContextProvider"
    );
  }

  return context;
};

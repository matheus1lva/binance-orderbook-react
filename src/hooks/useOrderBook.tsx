import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useOrderBookContext } from "../Contexts/BidsContext";

// 1st one is the price paid, second the amount on the order for the item
export type Operation = [string, string];

export function useOrderBook() {
  const [symbol, setSymbol] = useState("");
  const { setAsks, setBids } = useOrderBookContext();
  const [price, setPrice] = useState();

  const transformSymbol = symbol.toLowerCase().replace("/", "");
  const { data, status } = useQuery(
    ["orderBok", symbol],
    async () => {
      const { data } = await axios.get(
        `https://api.binance.com/api/v3/depth?symbol=${transformSymbol.toUpperCase()}&limit=100`
      );
      return data;
    },
    {
      enabled: symbol !== "",
    }
  );

  const ws = useMemo(() => {
    if (status === "success") {
      return new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol
          .replace("/", "")
          .toLowerCase()}@depth`
      );
    }
  }, [symbol, status]);

  const wsPrice = useMemo(() => {
    if (status === "success") {
      return new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol
          .replace("/", "")
          .toLowerCase()}@trade`
      );
    }
  }, [symbol, status]);

  useEffect(() => {
    if (status === "success") {
      setAsks(data?.asks || []);
      setBids(data?.bids || []);
      ws?.addEventListener("message", (event) => {
        const depth = JSON.parse(event.data);
        const bids = depth.b;
        const asks = depth.a;
        setBids((prev: any) => {
          return [...prev, ...bids];
        });
        setAsks((prev: any) => {
          return [...prev, ...asks];
        });
      });

      wsPrice?.addEventListener("message", (event) => {
        const trade = JSON.parse(event.data);
        setPrice(trade.p);
      });
    }
    return () => {
      ws?.close();
      wsPrice?.close();
    };
  }, [data, status, ws, wsPrice, price]);

  return {
    setSymbol,
    price,
    symbol,
  };
}

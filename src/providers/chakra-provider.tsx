"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";

type ChakraAppProviderProps = {
  children: React.ReactNode;
};

export function ChakraAppProvider({ children }: ChakraAppProviderProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}

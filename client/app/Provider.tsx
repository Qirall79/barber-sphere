"use client";
import { apolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";

function Provider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>

  </NextUIProvider>;
}

export default Provider;

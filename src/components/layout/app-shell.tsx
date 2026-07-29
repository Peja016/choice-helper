"use client";
import { Center, Flex } from "@chakra-ui/react";
import { SiteFooter } from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: Readonly<AppShellProps>) {
  return (
    <Flex minH="100dvh" direction="column">
      <SiteHeader />
      <Center
        as="main"
        flex="1"
        pb="1em"
        pt="calc(var(--chakra-sizes-header) + 1em)"
      >
        {children}
      </Center>
      <SiteFooter />
    </Flex>
  );
}

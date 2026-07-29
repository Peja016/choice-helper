"use client";

import { Flex } from "@chakra-ui/react";
import { Heading } from "@/components/ui";

interface HeaderProps {
  siteTitle?: string;
}

const SiteHeader = ({ siteTitle = "Choice Helper", ...props }: HeaderProps) => {
  return (
    <Flex
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      alignItems="center"
      zIndex="docked"
      height="header"
      bg={`brand.500`}
      {...props}
    >
      <Heading px="1em" color="white" flex={1}>
        {siteTitle}
      </Heading>
    </Flex>
  );
};

export default SiteHeader;

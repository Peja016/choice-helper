"use client";

import { Container, Divider, HStack, Stack } from "@chakra-ui/react";
import { Link, Text } from "@/components/ui";
import { profileLinks } from "@/config/profile";

export function SiteFooter() {
  return (
    <Container maxW="full" as="footer" bg="brand.500" pb={8} pt={2}>
      <Divider borderColor="blackAlpha.100" mb={6} />

      <Stack
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        spacing={4}
      >
        <Text variant="muted" color="white" mb="0">
          Built with Next.js, Chakra UI, and theme-first component variants.
        </Text>

        <HStack spacing={5} wrap="wrap">
          <Link
            href={profileLinks.github.href}
            target="_blank"
            rel="noreferrer"
            variant="subtle"
          >
            {profileLinks.github.label}
          </Link>
          <Link
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
            variant="subtle"
          >
            Next.js Docs
          </Link>
          <Link
            href="https://chakra-ui.com/docs"
            target="_blank"
            rel="noreferrer"
            variant="subtle"
          >
            Chakra Docs
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
}

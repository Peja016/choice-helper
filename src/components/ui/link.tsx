"use client";

import {
  Link as ChakraLink,
  forwardRef,
  type LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

export interface LinkProps extends ChakraLinkProps {
  variant?: string;
  size?: string;
}

export const Link = forwardRef<LinkProps, "a">(function Link(props, ref) {
  const { variant, size, ...rest } = props;

  return <ChakraLink ref={ref} variant={variant} size={size} {...rest} />;
});

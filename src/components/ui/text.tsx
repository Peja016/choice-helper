"use client";

import {
  Text as ChakraText,
  forwardRef,
  type TextProps as ChakraTextProps,
} from "@chakra-ui/react";

export interface TextProps extends ChakraTextProps {
  variant?: string;
  size?: string;
}

export const Text = forwardRef<TextProps, "p">(function Text(props, ref) {
  const { variant, size, ...rest } = props;

  return <ChakraText ref={ref} variant={variant} size={size} {...rest} />;
});

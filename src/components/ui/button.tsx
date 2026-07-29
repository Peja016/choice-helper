"use client";

import {
  Button as ChakraButton,
  forwardRef,
  type ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

export type ButtonProps = ChakraButtonProps;

export const Button = forwardRef<ButtonProps, "button">(function Button(props, ref) {
  return <ChakraButton ref={ref} {...props} />;
});
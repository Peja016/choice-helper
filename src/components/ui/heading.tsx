"use client";

import {
  Heading as ChakraHeading,
  forwardRef,
  type HeadingProps as ChakraHeadingProps,
} from "@chakra-ui/react";

export interface HeadingProps extends ChakraHeadingProps {
  variant?: string;
  size?: string;
}

export const Heading = forwardRef<HeadingProps, "h2">(
  function Heading(props, ref) {
    const { variant, size, ...rest } = props;
    const resolvedSize = size ?? "none";

    return (
      <ChakraHeading
        ref={ref}
        size={resolvedSize}
        variant={variant}
        {...rest}
      />
    );
  },
);

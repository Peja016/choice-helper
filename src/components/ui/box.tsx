"use client";

import {
  Box as ChakraBox,
  forwardRef,
  useStyleConfig,
  type BoxProps as ChakraBoxProps,
} from "@chakra-ui/react";

export interface BoxProps extends ChakraBoxProps {
  variant?: string;
  size?: string;
}

export const Box = forwardRef<BoxProps, "div">(function Box(props, ref) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("Box", { variant, size });

  return <ChakraBox ref={ref} __css={styles} {...rest} />;
});
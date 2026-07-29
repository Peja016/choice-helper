import {
  extendTheme,
  type StyleFunctionProps,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const HEADER_HEIGHT = "4em";

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#eefbf3",
      100: "#d5f2df",
      200: "#addfbe",
      300: "#82cc9d",
      400: "#58b97d",
      500: "#3f9f63",
      600: "#307c4d",
      700: "#225a37",
      800: "#143821",
      900: "#07170d",
    },
    ink: {
      50: "#f6f7f8",
      100: "#e6e8eb",
      200: "#c6cad1",
      300: "#9fa6b2",
      400: "#6e7889",
      500: "#4d5665",
      600: "#353c48",
      700: "#242932",
      800: "#171b21",
      900: "#0b0d11",
    },
  },
  sizes: {
    header: HEADER_HEIGHT,
  },
  space: {
    header: HEADER_HEIGHT,
  },
  fonts: {
    heading: "var(--font-geist-sans)",
    body: "var(--font-geist-sans)",
  },
  styles: {
    global: {
      "html, body": {
        bg: "#f4f1ea",
        color: "ink.800",
      },
      body: {
        minH: "100vh",
      },
      "::selection": {
        bg: "brand.200",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "full",
        fontWeight: "700",
        letterSpacing: "-0.01em",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          _hover: {
            bg: "brand.600",
          },
          _active: {
            bg: "brand.700",
          },
        },
        outline: {
          borderColor: "ink.200",
          color: "ink.800",
          bg: "white",
          _hover: {
            bg: "ink.50",
          },
        },
        subtle: {
          bg: "transparent",
          color: "ink.700",
          _hover: {
            bg: "blackAlpha.50",
          },
        },
      },
      defaultProps: {
        variant: "solid",
        colorScheme: "brand",
      },
    },
    Box: {
      baseStyle: {
        borderRadius: "2xl",
      },
      variants: {
        surface: {
          bg: "rgba(255, 255, 255, 0.72)",
          borderWidth: "1px",
          borderColor: "whiteAlpha.700",
          boxShadow: "0 18px 50px rgba(17, 24, 39, 0.08)",
          backdropFilter: "blur(18px)",
        },
        outline: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "ink.200",
        },
        accent: {
          bgGradient: "linear(to-br, brand.500, brand.700)",
          color: "white",
          boxShadow: "0 18px 50px rgba(63, 159, 99, 0.28)",
        },
      },
      defaultProps: {
        variant: "surface",
      },
    },
    Text: {
      baseStyle: {
        color: "ink.700",
      },
      variants: {
        body: {
          fontSize: "md",
          lineHeight: "1.8",
        },
        muted: {
          fontSize: "sm",
          color: "ink.500",
          lineHeight: "1.7",
        },
        eyebrow: {
          fontSize: "xs",
          textTransform: "uppercase",
          letterSpacing: "0.24em",
          fontWeight: "700",
          color: "brand.700",
        },
      },
      defaultProps: {
        variant: "body",
      },
    },
    Heading: {
      baseStyle: {
        color: "ink.900",
        fontWeight: "800",
        letterSpacing: "-0.04em",
      },
      variants: {
        h1: {
          fontSize: { base: "4xl", md: "6xl" },
          lineHeight: { base: "1.05", md: "0.98" },
        },
        h2: {
          fontSize: { base: "2xl", md: "3xl" },
          lineHeight: "1.1",
        },
        h3: {
          fontSize: "xl",
          lineHeight: "1.2",
        },
        h4: {
          fontSize: "lg",
          lineHeight: "1.3",
        },
        h5: {
          fontSize: "md",
          lineHeight: "1.4",
        },
        h6: {
          fontSize: "sm",
          lineHeight: "1.5",
          letterSpacing: "-0.02em",
        },
      },
      defaultProps: {
        variant: "h2",
      },
    },
    Link: {
      baseStyle: {
        fontWeight: "700",
        textUnderlineOffset: "0.22em",
      },
      variants: {
        inline: {
          color: "brand.700",
          textDecoration: "underline",
          _hover: {
            color: "brand.800",
          },
        },
        nav: {
          color: "ink.700",
          textDecoration: "none",
          _hover: {
            color: "ink.900",
          },
        },
        subtle: {
          color: "white",
          textDecoration: "none",
          _hover: {
            color: "white",
          },
        },
      },
      defaultProps: {
        variant: "inline",
      },
    },
  },
});

export type AppThemeComponentProps = StyleFunctionProps;

export default theme;

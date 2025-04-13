"use client";
import { createSystem } from "@chakra-ui/react";
import { defineConfig } from "@chakra-ui/react";
import { defaultConfig } from "@chakra-ui/react";

const interConfig = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "Inter Variable" },
        body: { value: "Inter Variable" },
      },
    },
  },
});

export const interSystem = createSystem(defaultConfig, interConfig);

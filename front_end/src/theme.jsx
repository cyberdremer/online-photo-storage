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
      colors: {
        dark: {
          primary: { value: "#1A202C" },
          secondary: { value: "#2D3748" },
          accent: { value: "#3182CE" },
          primarytext: { value: "#E5E5E5" },
          secondarytext: { value: "" },
          buttontext: { value: "#000000" },
          buttonbackground: { value: "#FFFFFF" },
          borders: { value: "#4A5568" },
          inputfields: { value: "#2D3748" },
        },
        light: {
          primary: { value: "#F7FAFC" },
          secondary: { value: "#E2E8F0" },
          accent: { value: "#3182CE" },
          text: { value: "#2D3748" },
          secondarytext: { value: "#4A5568" },
          buttontext: { value: "#FFFFFF" },
          buttonbackground: { value: "#FFFFFF" },
          borders: { value: "#CBD5E0" },
          inputfields: { value: "#FFFFFF" },
        },
      },
    },
  },
});

export const interSystem = createSystem(defaultConfig, interConfig);

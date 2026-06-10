import { defineConfig } from "vite";
import pkg from "@lovable.dev/vite-tanstack-config";

const { lovableViteConfig } = pkg;

export default defineConfig(lovableViteConfig({ nitro: true }));

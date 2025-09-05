import type { Metadata } from "next";
import { canonical } from "./site";

export function pageMeta(title: string, path?: string): Metadata {
  return {
    title,
    ...(path ? { alternates: { canonical: canonical(path) } } : {}),
  };
}


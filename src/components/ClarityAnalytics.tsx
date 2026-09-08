"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export function ClarityAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    Clarity.init("yf68sfpnk2");
  }, []);

  return null;
}

"use client";

import React, { useEffect, useState } from "react";
import useLocalStorage from "@/lib/useLocalStorage";

const MyComponent = () => {
  let foo = useLocalStorage("100rColors", "");

  return (
    <div>
      <p className="text-[var(--f\_high)]">Local Storage Data: {foo.background}</p>
    </div>
  );
};

export default MyComponent;

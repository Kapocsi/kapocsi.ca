"use client";

import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function get_xml_content(file: File): Promise<Document> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (!event.target?.result) {
        reject("Failed to read file content");
        return;
      }

      let fileContent = event.target.result;

      if (fileContent instanceof ArrayBuffer) {
        const decoder = new TextDecoder("utf-8");
        fileContent = decoder.decode(fileContent);
      }

      const parser = new DOMParser();
      const xml_svg_content = parser.parseFromString(fileContent, "text/xml");

      resolve(xml_svg_content);
    };

    reader.onerror = (error) => {
      reject("Error reading file: " + error);
    };

    reader.readAsText(file);
  });
}

type Colors = {
  [key: string]: any;
  background: null | string;
  f_high: null | string;
  f_med: null | string;
  f_low: null | string;
  f_inv: null | string;
  b_high: null | string;
  b_med: null | string;
  b_low: null | string;
  b_inv: null | string;
};

const HundredRabitsDrop = ({ children }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    get_xml_content(acceptedFiles[0]).then((file) => {
      let colors: Colors = {
        background: null,
        f_high: null,
        f_med: null,
        f_low: null,
        f_inv: null,
        b_high: null,
        b_med: null,
        b_low: null,
        b_inv: null,
      };

      for (let key in colors) {
        let element = file.querySelector(`#${key}`);
        if (!element) continue;
        const color = element.getAttribute("fill");
        document.documentElement.style.setProperty(`--${key}`, color);

        colors[key] = color;
      }

      console.log(colors);
    });
  };

  const { getRootProps } = useDropzone({
    onDrop,
    noKeyboard: true,
    noClick: true,
  });

  return <div {...getRootProps()}>{children}</div>;
};

export default HundredRabitsDrop;

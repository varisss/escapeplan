import React from "react";

export const Grid = ({ gridArray, theme }) => {
  return (
    <div
      className={
        theme === "default"
          ? "grid default"
          : theme === "jungle"
          ? "grid jungle"
          : "grid snow"
      }
    >
      {gridArray.map((row) => {
        return row.map((col) => {
          switch (col) {
            case 0:
              return (
                <div
                  className={`block free${
                    theme === "default"
                      ? ""
                      : theme === "jungle"
                      ? "-jungle"
                      : "-snow"
                  }`}
                />
              );
            case 1:
              return (
                <div
                  className={`block obs${
                    theme === "default"
                      ? ""
                      : theme === "jungle"
                      ? "-jungle"
                      : "-snow"
                  }`}
                />
              );
            case 2:
              return (
                <div
                  className={`block tunnel${
                    theme === "default"
                      ? ""
                      : theme === "jungle"
                      ? "-jungle"
                      : "-snow"
                  }`}
                />
              );
            case 3:
              return (
                <div
                  className={`block warder${
                    theme === "default"
                      ? ""
                      : theme === "jungle"
                      ? "-jungle"
                      : "-snow"
                  }`}
                />
              );
            case 4:
              return (
                <div
                  className={`block prisoner${
                    theme === "default"
                      ? ""
                      : theme === "jungle"
                      ? "-jungle"
                      : "-snow"
                  }`}
                />
              );
          }
        });
      })}
    </div>
  );
};

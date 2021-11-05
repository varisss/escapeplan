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
      {gridArray.map((row, i) => {
        return row.map((col, i2) => {
          switch (col) {
            case 0:
              return (
                <div
                  key={`${i}${i2}`}
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
                  key={`${i}${i2}`}
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
                  key={`${i}${i2}`}
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
                  key={`${i}${i2}`}
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
                  key={`${i}${i2}`}
                  className={`block prisoner${
                    theme === "default"
                      ? ""
                      : theme === "jungle"
                      ? "-jungle"
                      : "-snow"
                  }`}
                />
              );
            default:
              return <></>;
          }
        });
      })}
    </div>
  );
};

import React from "react";

const FormatDate = (dateStr) => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  return `${months[date.getMonth()]},${String(date.getDate()).padStart(
    2,
    "0"
  )} ${date.getFullYear()}`;
};

export default FormatDate;

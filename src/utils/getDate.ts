import { DATE_OPTIONS } from "utils/constant";

interface DateFormat {
  day: string;
  date: string;
  time: string;
}

export const getDate = (): DateFormat => {
  const now = new Date();
  const kst = new Intl.DateTimeFormat("en-US", DATE_OPTIONS).format(now).split(",");

  const day = kst[0];
  const date = `${kst[1]}, ${kst[2]}`;
  const time = kst[3];

  return {
    day,
    date,
    time,
  };
};

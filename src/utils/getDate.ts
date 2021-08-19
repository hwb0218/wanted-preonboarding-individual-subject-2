import { DATE_OPTIONS } from "utils/constant";

interface DateFormat {
  dayString: string;
  dateString: string;
}

export const getDate = (): DateFormat => {
  const now = new Date();
  const kst = new Intl.DateTimeFormat("en-US", DATE_OPTIONS).format(now).split(",");

  const dayString = kst[0];
  const dateString = `${kst[1]}, ${kst[2]}`;

  return {
    dayString,
    dateString,
  };
};

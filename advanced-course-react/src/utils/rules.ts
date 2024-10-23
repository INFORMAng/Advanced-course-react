import dayjs, { Dayjs } from "dayjs";

export const rules = {
  required: (message: string = "Обязательное слово") => ({
    required: true,
    message,
  }),
  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Dayjs ) {
      if (dayjs().isBefore(value, 'day')) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    }
  })
}
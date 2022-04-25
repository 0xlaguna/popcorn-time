import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

export const FormatDate = (date: Date) => {
  return dayjs(date).format('llll');
};

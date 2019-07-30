import { format, parseISO } from 'date-fns';
import locale from 'date-fns/locale/pt';

export default date => {
  return format(parseISO(date), "d 'de' MMMM', às' H'h'", {
    locale,
  });
};

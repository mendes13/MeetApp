import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default date => {
  return format(parseISO(date), "dd 'de' MMMM', às' HH'h'", {
    locale: pt,
  });
};

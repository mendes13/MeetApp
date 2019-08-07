import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

export default date => {
  return format(date, "d 'de' MMMM", {
    locale: pt,
  });
};

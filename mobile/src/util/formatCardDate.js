import { format, parseISO, addHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

// Important note - I'm using addHours because i couldn't find any better solution to this problem: For some reason, date-fns is returning the wrong time in format and formatRelative. It always returns the result - 1h (at least in the UTC-3, locale: "pt").

export default date => {
  return format(addHours(parseISO(date), 1), "dd 'de' MMMM', às' HH'h'", {
    locale: pt,
  });
};

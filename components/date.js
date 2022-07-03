import { parseISO, format } from 'date-fns';

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return <time className="font-light" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
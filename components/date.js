import { parseISO, format } from 'date-fns';

export default function Date ({ dateString }) {
  const date = parseISO(dateString);
  return <time className="text-sm pt-2" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}
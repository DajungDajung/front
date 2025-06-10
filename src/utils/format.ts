export function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) {
    return 'Invalid date';
  }

  const isoDateStr = dateStr.replace(' ', 'T');
  const date = new Date(isoDateStr);

  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }

  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yy}/${mm}/${dd} ${hh}:${min}`;
}

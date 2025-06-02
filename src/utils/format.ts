export function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  const yy = String(date.getFullYear()).slice(2); // '25'
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // '05'
  const dd = String(date.getDate()).padStart(2, '0'); // '28'
  const hh = String(date.getHours()).padStart(2, '0'); // '19'
  const min = String(date.getMinutes()).padStart(2, '0'); // '33'

  return `${yy}/${mm}/${dd} ${hh}:${min}`;
}

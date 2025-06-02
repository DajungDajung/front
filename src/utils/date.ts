export function getDaysAgo(dateTime: string): string {
  const isoFormatted = dateTime.replace(' ', 'T');
  const postDate = new Date(isoFormatted);
  const now = new Date();

  const diff = now.getTime() - postDate.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) {
    return '방금 전';
  }
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  if (days === 1) {
    return '어제';
  }
  return `${days}일 전`;
}

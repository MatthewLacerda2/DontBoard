export const isValidYoutubeLink = (link: string): boolean => {
  // Regular expression for a basic YouTube video URL
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
  return youtubeRegex.test(link);
};
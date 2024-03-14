export const isValidYoutubeLink = (link: string): boolean => {
  //It checks whether it is a youtube video link or not
  //If its invalid, the component will give a classic youtube error and the user will just have to delete it
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
  return youtubeRegex.test(link);
  //Checking link validity requires an API key and i dont care enough for that
};

export const isValidImageUrl = (url: string): boolean => {
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const lowerCaseUrl = url.toLowerCase();
  return supportedExtensions.some(ext => lowerCaseUrl.endsWith(ext));
};
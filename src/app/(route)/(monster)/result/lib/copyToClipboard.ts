/* eslint-disable no-console */
const copyToClipboard = async (url?: string) => {
  if (typeof window === 'undefined') return false;

  try {
    // Available only in secure contexts (HTTPS)
    if (navigator.share) {
      await navigator
        .share({
          title: document.title,
          url: url ?? window.location.origin,
        })
        .catch(console.error);
      return true;
    }

    // Fallback
    if (navigator.clipboard) {
      await navigator.clipboard
        .writeText(url ?? window.location.origin)
        .catch(console.error);
      return true;
    }
  } catch (err) {
    console.error(err);
  }

  return false;
};

export default copyToClipboard;

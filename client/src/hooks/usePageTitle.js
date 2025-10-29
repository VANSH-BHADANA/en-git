import { useEffect } from "react";

/**
 * Custom hook to set the page title dynamically
 * @param {string} title - The page title
 * @param {string} suffix - Optional suffix (defaults to "en-git")
 */
export const usePageTitle = (title, suffix = "en-git") => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title ? `${title} | ${suffix}` : suffix;

    return () => {
      document.title = previousTitle;
    };
  }, [title, suffix]);
};

export default usePageTitle;

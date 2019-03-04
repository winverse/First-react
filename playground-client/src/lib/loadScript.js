export const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = function () {
      resolve();
    };
    script.src = url;
    document.head.appendChild(script);
  });
};
export default function loadScriptMap(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script'); 
    const body = document.getElementsByTagName('body')[0];
    
    if(url.match(/onload=initYandexMap/)) {
      window.initYandexMap = (ymaps) => resolve(ymaps);
    } else {
      reject(new Error('require onload func'));
    }

    script.src = url;
    script.onerror = reject;
    body.appendChild(script);
  });
}

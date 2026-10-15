import { useEffect, useState } from 'react';

export function navigateSite(href:string) {
  const url=new URL(href,location.href);
  history.pushState({},'',url.pathname+url.search+url.hash);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function useSiteRoute() {
  const [route, setRoute] = useState(() => location.pathname + location.search);
  useEffect(() => {
    const sync = () => setRoute(location.pathname + location.search);
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || /\.(png|jpg|webp|svg|pdf)$/i.test(url.pathname)) return;
      if (url.pathname === location.pathname && url.search === location.search && url.hash && document.getElementById(url.hash.slice(1))) return;
      // Existing section links stay useful from content pages too.
      if (url.pathname === location.pathname && url.hash && !document.getElementById(url.hash.slice(1))) {url.pathname = '/';url.search='';}
      if (url.pathname !== '/' && !url.pathname.endsWith('.html')) return;
      event.preventDefault();
      navigateSite(url.href);
    };
    window.addEventListener('popstate', sync);
    document.addEventListener('click', click);
    return () => { window.removeEventListener('popstate', sync); document.removeEventListener('click', click); };
  }, []);
  useEffect(() => {
    const frame=requestAnimationFrame(()=>{
      if(location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      else {window.scrollTo({top:0,behavior:'instant'});document.querySelector<HTMLElement>('main')?.focus({preventScroll:true});}
    });
    return ()=>cancelAnimationFrame(frame);
  }, [route]);
  return { path: route.split('?')[0] === '/index.html' ? '/' : route.split('?')[0], search: new URLSearchParams(route.split('?')[1] || '') };
}

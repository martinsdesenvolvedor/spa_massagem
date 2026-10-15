const fs=require('fs'); const path=require('path'); const {chromium}=require('playwright');
const out=path.resolve(__dirname,'../visual/scroll-refinement');fs.mkdirSync(out,{recursive:true});
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const routes=['/','/about.html','/appoinment.html','/faq.html','/team.html','/team-details.html?therapist=felipe','/pricing.html','/services.html','/services-details.html?service=aroma-lavanda','/portfolio.html','/blog.html','/blog-details.html?article=primeira-visita','/contact.html'];
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH});const report={pages:[],errors:[],photos:[]};try{
const context=await browser.newContext();const p=await context.newPage();p.on('pageerror',e=>report.errors.push(e.message));
for(const width of [1366,390]){await p.setViewportSize({width,height:width===390?844:768});for(const route of routes){await p.goto('http://127.0.0.1:4182'+route);await p.addStyleTag({content:'html {scroll-behavior:auto!important}'});await p.evaluate(()=>document.fonts.ready);
const targets=await p.locator('[data-reveal]').count();assert(targets>0,'No scroll entrance targets '+route);
if(route==='/'){
 assert(await p.locator('.spa-desktop-nav').innerText().then(t=>!/(Home|Pages|Service|Contact|Portfolio)/.test(t)),'English navigation remains');
 await p.locator('#services [data-reveal]').first().scrollIntoViewIfNeeded();await p.waitForTimeout(120);
 const moving=await p.evaluate(()=>[...document.querySelectorAll('[data-reveal]')].filter(e=>e.dataset.revealState==='animating').map(e=>({kind:e.dataset.reveal,opacity:getComputedStyle(e).opacity,transform:getComputedStyle(e).transform,mask:getComputedStyle(e).clipPath})));
 assert(moving.some(e=>Number(e.opacity)<1&&Number(e.opacity)>0),'No visible scroll animation in progress');report.pages.push({width,route,moving});
 await p.waitForTimeout(1400);await p.screenshot({path:path.join(out,'home-services-'+width+'.png')});
}
if(route!=='/'){
 const photo=p.locator('.spa-page-hero-photo');const source=await photo.evaluate(e=>getComputedStyle(e).backgroundImage);
 if(width===1366){const ok=await p.evaluate(async()=>{const el=document.querySelector('.spa-page-hero-photo');const url=getComputedStyle(el).backgroundImage.slice(5,-2);const img=new Image();img.src=url;return await Promise.race([img.decode().then(()=>true,()=>false),new Promise(r=>setTimeout(()=>r(false),18000))]);});assert(ok,'Page hero image missing '+route);report.photos.push({route,source});}
 await p.waitForTimeout(1400);const before=await photo.evaluate(e=>getComputedStyle(e).transform);await p.evaluate(()=>scrollTo(0,190));await p.waitForTimeout(180);const after=await photo.evaluate(e=>getComputedStyle(e).transform);assert(before!==after,'Parallax not moving '+route);
 if(['/about.html','/team.html','/contact.html'].includes(route)){await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(150);await p.screenshot({path:path.join(out,route.slice(1,-5)+'-hero-'+width+'.png')});}
}
await p.evaluate(()=>scrollTo(0,0));let maximum=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<maximum;y+=width===390?600:550){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(95);const overflow=await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth);assert(overflow===0,'Animated horizontal overflow '+route+' '+width+' at '+y);}
await p.waitForTimeout(1450);const incomplete=await p.locator('[data-reveal-state="pending"]').count();assert(incomplete===0,'Unrevealed content after scrolling '+route+' '+width+': '+incomplete);
const total=await p.locator('[data-reveal-state="visible"]').count();report.pages.push({route,width,revealed:total});console.log('Scroll passed',width,route,total);
}}
assert(new Set(report.photos.map(p=>p.source)).size>=11,'Insufficient variety in internal hero photographs');assert(!report.errors.length,'Browser runtime errors');
await p.emulateMedia({reducedMotion:'reduce'});await p.goto('http://127.0.0.1:4182/about.html');await p.waitForTimeout(200);assert(await p.locator('[data-reveal-state="pending"]').count()===0,'Reduced motion concealed content');const a=await p.locator('.spa-page-hero-photo').evaluate(e=>getComputedStyle(e).transform);await p.evaluate(()=>scrollTo(0,170));await p.waitForTimeout(100);const b=await p.locator('.spa-page-hero-photo').evaluate(e=>getComputedStyle(e).transform);assert(a===b,'Reduced motion still has parallax');report.reducedMotion='All content visible; no parallax';
console.log('All scroll, photo and translated-navigation checks passed');
}finally{fs.writeFileSync(path.join(out,'validation.json'),JSON.stringify(report,null,2));await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});

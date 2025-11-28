import { serve } from "https://deno.land/std@0.189.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.189.0/hash/mod.ts";

function statsFromText(text: string) {
  const words = Array.from(text.toLowerCase().matchAll(/\b[0-9a-zа-яё']+\b/giu)).map(m=>m[0]);
  const counts = new Map<string, number>();
  for (const w of words) counts.set(w, (counts.get(w)||0)+1);
  const top = Array.from(counts.entries()).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([word,count])=>({word,count}));
  const h = createHash("sha256"); h.update(text);
  return { words: words.length, top, sha256: h.toString() };
}

serve(async req => {
  const url = new URL(req.url);
  if (url.pathname === "/health") return new Response(JSON.stringify({status:"ok"}), {headers:{"content-type":"application/json"}});
  if (url.pathname === "/fib") {
    const n = Number(url.searchParams.get("n") || 10);
    const fib = (n:number):number => n<2? n: fib(n-1)+fib(n-2);
    return new Response(JSON.stringify({n, value: fib(n)}), {headers:{"content-type":"application/json"}});
  }
  if (url.pathname === "/stats" && req.method==="POST") {
    const body = await req.json();
    return new Response(JSON.stringify(statsFromText(body.text || "")), {headers:{"content-type":"application/json"}});
  }
  return new Response("Not found", {status:404});
});

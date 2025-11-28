// minimal express server
const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

function statsFromText(text) {
  const words = text
    .toLowerCase()
    .match(/\b[0-9a-zа-яё']+\b/giu) || [];
  const counts = {};
  for (const w of words) counts[w] = (counts[w] || 0) + 1;
  const top = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));
  return { words: words.length, top, sha256: crypto.createHash('sha256').update(text).digest('hex') };
}

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/fib', (req, res) => {
  const n = parseInt(req.query.n || '10', 10);
  function fib(n){ return n<2? n: fib(n-1)+fib(n-2); }
  res.json({ n, value: fib(n) });
});

app.post('/stats', (req, res) => {
  const text = (req.body && req.body.text) || '';
  res.json(statsFromText(text));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`JS server listening ${port}`));

using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.RegularExpressions;
var app = WebApplication.CreateBuilder(args).Build();

app.MapGet("/health", () => Results.Json(new { status = "ok" }));

int Fib(int n) => (n < 2) ? n : Fib(n-1) + Fib(n-2);
app.MapGet("/fib", (int n) => Results.Json(new { n, value = Fib(n) }));

app.MapPost("/stats", async (HttpRequest req) =>
{
    using var sr = new StreamReader(req.Body);
    var body = await sr.ReadToEndAsync();
    var obj = System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(body);
    var text = obj != null && obj.ContainsKey("text") ? obj["text"] : "";
    var matches = Regex.Matches(text.ToLowerInvariant(), @"\b[0-9a-zа-яё']+\b", RegexOptions.IgnoreCase);
    var counts = new Dictionary<string,int>();
    foreach (Match m in matches) counts[m.Value] = counts.GetValueOrDefault(m.Value, 0) + 1;
    var top = counts.OrderByDescending(kv=>kv.Value).Take(5).Select(kv=> new { word = kv.Key, count = kv.Value });
    using var sha = SHA256.Create();
    var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(text));
    string hex = BitConverter.ToString(hash).Replace("-","").ToLowerInvariant();
    return Results.Json(new { words = matches.Count, top, sha256 = hex });
});

app.Run();

package main

import (
  "crypto/sha256"
  "encoding/hex"
  "encoding/json"
  "fmt"
  "log"
  "net/http"
  "regexp"
  "sort"
  "strconv"
)

type StatsResp struct {
  Words int `json:"words"`
  Top []map[string]interface{} `json:"top"`
  Sha256 string `json:"sha256"`
}

func statsFromText(text string) StatsResp {
  re := regexp.MustCompile(`\b[0-9A-Za-z\u0400-\u04FF']+\b`)
  words := re.FindAllString(text, -1)
  counts := map[string]int{}
  for _, w := range words {
    counts[w]++
  }
  type kv struct {k string; v int}
  arr := make([]kv, 0, len(counts))
  for k,v := range counts { arr = append(arr, kv{k,v}) }
  sort.Slice(arr, func(i,j int) bool { return arr[i].v > arr[j].v })
  top := []map[string]interface{}{}
  for i:=0;i<len(arr) && i<5;i++ { top = append(top, map[string]interface{}{"word":arr[i].k, "count":arr[i].v})}
  h:=sha256.Sum256([]byte(text))
  return StatsResp{ Words: len(words), Top: top, Sha256: hex.EncodeToString(h[:]) }
}

func main() {
  http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request){ w.Header().Set("Content-Type","application/json"); json.NewEncoder(w).Encode(map[string]string{"status":"ok"}) })
  http.HandleFunc("/fib", func(w http.ResponseWriter, r *http.Request){
    n := 10
    if r.URL.Query().Get("n") != "" { if v, err := strconv.Atoi(r.URL.Query().Get("n")); err==nil { n=v } }
    var fib func(int) int
    fib = func(n int) int { if n<2 { return n }; return fib(n-1)+fib(n-2) }
    json.NewEncoder(w).Encode(map[string]int{"n": n, "value": fib(n)})
  })
  http.HandleFunc("/stats", func(w http.ResponseWriter, r *http.Request){
    var body struct{ Text string `json:"text"` }
    json.NewDecoder(r.Body).Decode(&body)
    resp := statsFromText(body.Text)
    w.Header().Set("Content-Type","application/json")
    json.NewEncoder(w).Encode(resp)
  })
  fmt.Println("Go server listening :8080")
  log.Fatal(http.ListenAndServe(":8080", nil))
}

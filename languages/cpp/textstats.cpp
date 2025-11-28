#include <iostream>
#include <map>
#include <sstream>
#include <algorithm>
#include <openssl/sha.h>
int main(int argc, char** argv) {
  if (argc < 2) { std::cout<<"Usage: "<<argv[0]<<" \"text\"\\n"; return 1; }
  std::string s = argv[1];
  std::istringstream iss(s);
  std::map<std::string,int> m;
  std::string w;
  int words=0;
  while (iss>>w) { words++; std::transform(w.begin(), w.end(), w.begin(), ::tolower); m[w]++; }
  unsigned char hash[SHA256_DIGEST_LENGTH];
  SHA256((unsigned char*)s.c_str(), s.size(), hash);
  std::cout << "{\"words\":"<<words<<",\"top\":[";
  bool first=true;
  for (auto it = m.rbegin(); it!=m.rend() && std::distance(m.rbegin(), it) < 5; ++it) {
    if (!first) std::cout<<","; first=false;
    std::cout << "{\"word\":\""<<it->first<<"\",\"count\":"<<it->second<<"}";
  }
  std::cout << "],\"sha256\":\"";
  for (int i=0;i<SHA256_DIGEST_LENGTH;i++) printf("%02x", hash[i]);
  std::cout<<"\"}"<<std::endl;
  return 0;
}

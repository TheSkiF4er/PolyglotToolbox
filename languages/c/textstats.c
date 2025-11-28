// compile: gcc textstats.c -o textstats
#include <stdio.h>
#include <string.h>
#include <openssl/sha.h>
int main(int argc, char** argv) {
    if (argc<2) { printf("Usage: %s 'some text'\\n", argv[0]); return 1; }
    char *text = argv[1];
    // simple word count (space separated)
    int words=0;
    char *p = text;
    int inw=0;
    while (*p) { if (!isspace(*p) && !inw) { inw=1; words++; } else if (isspace(*p)) inw=0; p++; }
    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256((unsigned char*)text, strlen(text), hash);
    printf("{\"words\":%d,\"sha256\":\"", words);
    for (int i=0;i<SHA256_DIGEST_LENGTH;i++) printf("%02x", hash[i]);
    printf("\"}\\n");
    return 0;
}

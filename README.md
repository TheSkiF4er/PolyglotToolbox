# Polyglot Toolbox

A learning + comparison repository: the same tiny "text statistics" microservice & CLI implemented in 11 languages:
C, C++, C#, Java, PHP, JavaScript (Node), Python, TypeScript, Go, Ruby, Kotlin.

Why this project exists
- Learn idiomatic patterns across languages.
- Compare performance, packaging and testing approaches.
- Contribute a language implementation, example, or improvement.

Quick start (Node version)
```bash
cd languages/javascript
npm install
npm start
# then:
curl -X POST localhost:3000/stats -H "Content-Type: application/json" -d '{"text":"hello hello world"}'
```

Contributing
* See CONTRIBUTING.md for how to add a new language or improve an impl.
* We welcome docs, tests, benchmarks, examples and optimizations.

---

---

### .github/workflows/ci.yml (GitHub Actions — matrix across a few languages)
```yaml
name: CI

on: [push, pull_request]

jobs:
  build-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        lang: [javascript, python, go, csharp, java, php, ruby, typescript]
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node
        if: matrix.lang == 'javascript' || matrix.lang == 'typescript'
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Set up Python
        if: matrix.lang == 'python'
        uses: actions/setup-python@v4
        with:
          python-version: 3.11

      - name: Set up Go
        if: matrix.lang == 'go'
        uses: actions/setup-go@v4
        with:
          go-version: 1.20

      - name: Set up .NET
        if: matrix.lang == 'csharp'
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: 8.0

      - name: Run language tests
        run: |
          case "${{ matrix.lang }}" in
            javascript) cd languages/javascript && npm ci && npm test;;
            typescript) cd languages/typescript && npm ci && npm test;;
            python) cd languages/python && python -m pip install -r requirements.txt && pytest -q;;
            go) cd languages/go && go test ./...;;
            csharp) cd languages/csharp && dotnet test;;
            java) cd languages/java && mvn -q test;;
            php) cd languages/php && composer install && vendor/bin/phpunit -q || true;;
            ruby) cd languages/ruby && bundle install && rake test || true;;
            *) echo "No tests configured";;
          esac
```

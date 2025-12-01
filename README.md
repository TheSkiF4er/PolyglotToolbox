# Polyglot Toolbox

**Polyglot Toolbox** is an open-source project demonstrating multi-language implementations and interoperability examples across various programming languages.

[![Languages](https://img.shields.io/badge/languages-C%2B%2B%2C%20C%2C%20C%23%2C%20Java%2C%20Kotlin%2C%20Go%2C%20PHP%2C%20JavaScript%2C%20TypeScript%2C%20Python%2C%20Ruby-blue)](https://github.com/)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)
[![Contributors](https://img.shields.io/github/contributors/TheSkiF4er/PolyglotToolbox)](https://github.com/TheSkiF4er/PolyglotToolbox/graphs/contributors)

---

## 🚀 Features

- Multi-language implementations for CLI, web, and API examples
- Interoperability examples between languages
- Simple benchmarks for performance comparison
- Quick-start examples via Docker and cURL
- CI workflow for automated testing

## 🛠 Supported Languages

- C, C++, C#, Java, Kotlin, Go, PHP, JavaScript, TypeScript, Python, Ruby

## 📦 Project Structure

```
polyglot-toolbox/
├─ .github/
│  ├─ workflows/ci.yml
│  ├─ ISSUE_TEMPLATE.md
│  └─ PULL_REQUEST_TEMPLATE.md
├─ LICENSE
├─ README.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ examples/
│  ├─ curl_examples.md
│  └─ docker-compose.yml
├─ benchmarks/
│  └─ run_benchmarks.sh
├─ templates/
│  └─ module_template.md
├─ languages/
│  ├─ c/
│  │  ├─ README.md
│  │  └─ textstats.c
│  ├─ cpp/
│  │  ├─ README.md
│  │  └─ textstats.cpp
│  ├─ csharp/
│  │  ├─ README.md
│  │  ├─ PolyServe.csproj
│  │  └─ Program.cs
│  ├─ java/
│  │  ├─ README.md
│  │  ├─ pom.xml
│  │  └─ src/...
│  ├─ php/
│  │  ├─ README.md
│  │  └─ public/index.php
│  ├─ javascript/
│  │  ├─ README.md
│  │  └─ src/index.js
│  ├─ python/
│  │  ├─ README.md
│  │  └─ app.py
│  ├─ typescript/
│  │  ├─ README.md
│  │  └─ src/index.ts
│  ├─ go/
│  │  ├─ README.md
│  │  └─ main.go
│  ├─ ruby/
│  │  ├─ README.md
│  │  └─ app.rb
│  └─ kotlin/
│     ├─ README.md
│     └─ build.gradle.kts
└─ .gitignore
```

## ⚡ Quick Start

### Run via Docker Compose
```bash
docker-compose -f examples/docker-compose.yml up --build
```

### Run Benchmark
```bash
bash benchmarks/run_benchmarks.sh
```

### Run Example Plugin via cURL
```bash
curl -X POST http://localhost:8080/run-plugin \
  -H "Content-Type: application/json" \
  -d '{"plugin":"python","input":{"message":"Hello World"}}'
```

## 📄 Contributing

- Use `templates/module_template.md` for creating new modules
- Follow `.github/PULL_REQUEST_TEMPLATE.md` for PR submissions
- Use `.github/ISSUE_TEMPLATE.md` when reporting issues

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for exploring **Polyglot Toolbox**! Your contributions and feedback are welcome.

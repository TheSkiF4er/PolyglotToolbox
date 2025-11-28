# 📌 Polyglot Toolbox — cURL Examples

This file contains example commands for interacting with the Polyglot Toolbox core API using `curl`. These examples assume the core server is running locally at `http://localhost:8080`.

---

## 1. Run JavaScript Plugin
```bash
curl -s -X POST http://localhost:8080/run-plugin \
  -H "Content-Type: application/json" \
  -d '{"plugin":"javascript","input":{"message":"Hello JS"}}'
```

## 2. Run Python Plugin
```bash
curl -s -X POST http://localhost:8080/run-plugin \
  -H "Content-Type: application/json" \
  -d '{"plugin":"python","input":{"message":"Hello Python"}}'
```

## 3. Run PHP Plugin
```bash
curl -s -X POST http://localhost:8080/run-plugin \
  -H "Content-Type: application/json" \
  -d '{"plugin":"php","input":{"message":"Hello PHP"}}'
```

## 4. Run Go Plugin
```bash
curl -s -X POST http://localhost:8080/run-plugin \
  -H "Content-Type: application/json" \
  -d '{"plugin":"go","input":{"message":"Hello Go"}}'
```

---

### Notes
- Replace `localhost:8080` with the appropriate server address if running remotely.
- `plugin` field corresponds to the plugin folder name inside `/plugins`.
- `input` field can be any JSON object supported by the plugin.

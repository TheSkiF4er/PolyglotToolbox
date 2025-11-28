#!/bin/bash
# run_benchmarks.sh
# Benchmark script for Polyglot Toolbox plugins

set -e

echo "Starting Polyglot Toolbox benchmarks..."

default_input='{"test":123}'

languages=("javascript" "python" "php" "go")

for lang in "${languages[@]}"; do
    echo "\n=== Benchmarking $lang plugin ==="
    start=$(date +%s%3N)
    case $lang in
        javascript)
            node plugins/javascript/example.js <<< "$default_input" > /dev/null
            ;;
        python)
            python3 plugins/python/example.py <<< "$default_input" > /dev/null
            ;;
        php)
            php plugins/php/example.php <<< "$default_input" > /dev/null
            ;;
        go)
            # Assuming Go plugin is a compiled CLI in plugins/go
            echo '{"input":123}' | ./plugins/go/example || echo "Go plugin not compiled"
            ;;
    esac
    end=$(date +%s%3N)
    duration=$((end-start))
    echo "$lang plugin execution time: ${duration}ms"
done

echo "\nAll benchmarks completed."

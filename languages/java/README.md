# Java Language Plugin — Polyglot Toolbox

This folder contains the Java language implementation for the Polyglot Toolbox project.

## Overview
The Java plugin is a command-line tool that demonstrates basic text processing and interoperability with other Polyglot Toolbox modules.

## Files

- `pom.xml`: Maven project file for dependencies and build configuration.
- `src/`: Source directory containing Java code.

## Build Instructions

Ensure you have Java and Maven installed.

```bash
# Build the project using Maven
mvn clean package
```

## Usage

```bash
# Run the compiled JAR
java -jar target/polyglot-java-plugin.jar < input.txt
```

## Notes
- Compatible with Java 11+
- Can be extended for additional text processing or interoperability features.

## Author / Maintainer
[SkiF4er](https://github.com/TheSkiF4er)

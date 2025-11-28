package com.polyglot.toolbox;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Simple command-line text statistics tool for Polyglot Toolbox.
 */
public class TextStats {

    public static void main(String[] args) {
        int chars = 0;
        int words = 0;
        int lines = 0;

        System.out.println("Enter text (Ctrl+D to end on Unix, Ctrl+Z on Windows):");

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(System.in))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lines++;
                chars += line.length() + 1; // including newline
                String[] tokens = line.trim().split("\\s+");
                if (!line.trim().isEmpty()) {
                    words += tokens.length;
                }
            }
        } catch (IOException e) {
            System.err.println("Error reading input: " + e.getMessage());
        }

        System.out.println("\n--- Text Statistics ---");
        System.out.println("Characters: " + chars);
        System.out.println("Words: " + words);
        System.out.println("Lines: " + lines);
    }
}

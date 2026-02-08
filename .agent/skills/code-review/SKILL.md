---
name: code-review
description: Analyze code for bugs, security issues, style violations, and maintainability. Use this skill when the user asks to review code, check for bugs, validate code, or perform a security audit.
---

# Code Review

## Overview

This skill enables comprehensive code reviews, focusing on logic correctness, security vulnerabilities, performance optimization, and adherence to project-specific coding standards (SOLID, DRY). It helps identify potential issues before they become bugs and ensures the codebase remains clean and maintainable.

## Core Capabilities

### 1. Logic & Functionality Analysis
- Verify that the code correctly implements the intended logic.
- Identify edge cases and potential logic errors.
- Check for off-by-one errors, null pointer dereferences, and infinite loops.

### 2. Security Audit
- Scan for common security vulnerabilities (e.g., SQL injection, XSS, insecure deserialization).
- Ensure proper input validation and sanitization.
- Check for hardcoded secrets or sensitive data exposure.

### 3. Code Style & Standards
- Enforce consistent coding style (indentation, naming conventions).
- Check for compliance with project-specific rules (e.g., max file length, language constraints).
- Recommend refactoring for better readability and maintainability.

### 4. Performance Optimization
- Identify potential performance bottlenecks (e.g., inefficient algorithms, redundant database queries).
- Suggest optimizations for memory usage and execution speed.
- Recommend caching strategies where applicable.

## Workflow

1.  **Analyze Context**: Understand the purpose of the code and the surrounding context.
2.  **Identify Issues**: Scan the code for logic errors, security flaws, and style violations.
3.  **Prioritize Feedback**: Group issues by severity (Critical, Major, Minor).
4.  **Provide Constructive Feedback**: Offer specific, actionable suggestions for improvement.
5.  **Verify Fixes**: (If applicable) Review the changes made based on the feedback.

## User Rules Integration

This skill automatically integrates with the user's project rules (e.g., `project-rules.md`). It will explicitly check for:
-   **SOLID & DRY Principles**: Ensure code is modular and reusable.
-   **File Size Limits**: Flag files exceeding 200-250 lines.
-   **Language**: Ensure comments are in English, but conversations in Russian (as per user preference).

## Examples

### Reviewing a Python Script
User: "Review this python script for potential bugs."
Assistant: Analyzes the script, identifies a potential `IndexError`, suggests adding a try-except block, and points out a variable naming inconsistency.

### Security Check on a React Component
User: "Check this component for XSS vulnerabilities."
Assistant: Scans the JSX for unsanitized user input, recommends using specific libraries or escaping methods, and validates prop types.

## Resources

### scripts/
-   (Placeholder) `analyze_complexity.py`: Script to calculate cyclomatic complexity.

### references/
-   (Placeholder) `security_checklist.md`: A checklist of common security vulnerabilities to look for.

### assets/
-   (Placeholder) `review_template.md`: A template for structuring code review reports.

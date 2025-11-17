# Security Policy

## Supported Versions

Currently, only the latest version of Luno is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue in Luno, please follow these steps:

### 1. Do Not Open a Public Issue

Please **do not** create a public GitHub issue for security vulnerabilities. This helps prevent malicious actors from exploiting the issue before a fix is available.

### 2. Contact Us Privately

Send an email to: **security@lunoapp.dev**

Include the following information:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (optional)
- Your contact information

### 3. Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity (see below)

### 4. Severity Levels

| Severity | Description | Fix Timeline |
|----------|-------------|--------------|
| **Critical** | Remote code execution, data breach, privilege escalation | 24-48 hours |
| **High** | Significant security impact, user data at risk | 7 days |
| **Medium** | Moderate security impact, limited scope | 14 days |
| **Low** | Minor security issue, theoretical or hard to exploit | 30 days |

### 5. Disclosure Policy

We follow a **coordinated disclosure** approach:
- We will work with you to understand and fix the issue
- Once fixed, we will release a patch
- We will credit you in the release notes (if desired)
- After patch release, we may publish a security advisory

### 6. Scope

Security issues we care about:
- Cross-site scripting (XSS)
- Code injection
- Privilege escalation
- Data leakage
- Authentication/authorization bypass
- Malicious code execution
- Dependency vulnerabilities

Out of scope:
- Issues in dependencies with no fix available (we'll monitor)
- Theoretical vulnerabilities with no proof of concept
- Social engineering attacks
- Denial of service (extension context)

## Security Features

### Current Protections

1. **Content Security Policy (CSP)**
   - Strict CSP in manifest.json
   - No inline scripts or styles
   - No eval() or new Function()

2. **Input Sanitization**
   - All user inputs validated
   - API responses parsed safely
   - No innerHTML usage

3. **Permissions**
   - Minimal permissions requested
   - Only `contextMenus`, `storage`, `activeTab`
   - No host permissions or broad access

4. **API Security**
   - HTTPS-only API calls
   - Timeout protections (10s max)
   - Error handling for all requests

5. **Data Privacy**
   - No analytics or tracking
   - No data sent to third parties (except Dictionary API)
   - All data stored locally in Chrome storage
   - No user identification

6. **Dependencies**
   - Regular dependency updates
   - npm audit checks
   - Minimal dependency footprint

## Best Practices for Users

1. **Download from Official Sources**
   - Chrome Web Store (when published)
   - Official GitHub repository

2. **Verify Permissions**
   - Check requested permissions before installing
   - Be cautious of suspicious permission requests

3. **Keep Updated**
   - Enable auto-updates in Chrome
   - Check for updates regularly

4. **Report Issues**
   - Report any suspicious behavior immediately
   - Email security@lunoapp.dev

## Security Changelog

### Version 1.0.0
- Initial security implementation
- CSP enabled
- Input validation implemented
- Minimal permissions model

---

## Acknowledgments

We appreciate security researchers who help keep Luno safe. Contributors who responsibly disclose vulnerabilities will be acknowledged in our security advisories (with their permission).

---

**Last Updated:** 2024-11-17

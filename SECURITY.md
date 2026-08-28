# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

- **Do not** open a public GitHub issue describing the vulnerability
- Email the maintainer directly with details of the issue
- Include steps to reproduce if possible

You will receive a response within 48 hours. Please do not disclose the vulnerability publicly until it has been addressed.

## Security Measures

This project uses Supabase for data persistence with row-level security (RLS) enabled on every table. Environment variables for database credentials are stored in `.env` and should never be committed to the repository.

## Best Practices for Contributors

- Never commit `.env` files or hardcoded credentials
- Never expose API keys in client-side code
- Validate all user input at system boundaries
- Report any security concerns immediately

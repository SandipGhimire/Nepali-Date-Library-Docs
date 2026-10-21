# Agent Authentication & Access Specification

## Overview
Nepali Date Library provides zero-friction, public, and open access for all autonomous AI agents, LLM assistants, search crawlers, and automated workflows.

## Authentication Model
- **Auth Type**: None (Public Open Access)
- **API Keys**: Not required
- **Bearer Tokens**: Not required
- **OAuth Credentials**: Not required
- **Rate Limits**: 60 requests/minute per IP (sufficient for real-time agent queries)
- **License**: MIT Open Source

## Machine-Readable Endpoints
- Search Index: `https://nepali-pkg.date/api/search`
- LLM Knowledge Base: `https://nepali-pkg.date/llms.txt`
- Full AI Documentation: `https://nepali-pkg.date/llms-full.txt`
- MCP Server Card: `https://nepali-pkg.date/.well-known/mcp/server-card.json`
- Agent Skills Index: `https://nepali-pkg.date/.well-known/skills/index.json`
- A2A Agent Card: `https://nepali-pkg.date/.well-known/agent-card.json`
- API Catalog: `https://nepali-pkg.date/.well-known/api-catalog`

# Agent Instructions - Aquila's Website

> This project inherits from the master agent template at `..\.agent-template\AGENTS.md`

## Brand-Specific Configuration

This is the agent configuration for **Aquila's Website**.

### Inherited Architecture

- 3-Layer Architecture (Directive → Orchestration → Execution)
- Shared Skills (brand-extractor, brand-guidelines, frontend-design, skill-creator)
- Self-annealing error recovery

### Brand-Specific Customizations

Add brand-specific directives in `directives/` folder:

- Design preferences
- Color schemes
- Content requirements
- Deployment targets

### Directory Structure

```
Aquila's Website/
├── AGENTS.md              # This file
├── .agent/workflows/      # Inherited skills + brand-specific
├── directives/            # Brand-specific SOPs
├── execution/             # Brand-specific scripts
├── .tmp/                  # Temporary files
└── .env                   # API keys (copy from .env.example)
```

---

*See master template at `..\.agent-template\AGENTS.md` for full architecture documentation.*

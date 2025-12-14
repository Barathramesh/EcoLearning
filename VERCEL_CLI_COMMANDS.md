# 🛠️ Vercel CLI Commands Reference

## Installation

```bash
# Install Vercel CLI globally
npm install -g vercel

# Or use without installing
npx vercel
```

## Initial Setup

```bash
# Login to Vercel
vercel login

# Check current user
vercel whoami
```

## Deployment Commands

### Deploy Backend

```bash
# Navigate to server folder
cd server

# Deploy to production
vercel --prod

# Deploy for preview/testing
vercel

# Deploy with environment variables
vercel --prod -e MONGODB_URI="your-uri" -e JWT_SECRET="your-secret"
```

### Deploy Frontend

```bash
# Navigate to client folder
cd client

# Deploy to production
vercel --prod

# Deploy for preview/testing
vercel
```

## Managing Projects

```bash
# List all projects
vercel ls

# Link local project to Vercel project
vercel link

# Remove link
vercel unlink
```

## Environment Variables

```bash
# Add environment variable
vercel env add VARIABLE_NAME

# Pull environment variables to local .env file
vercel env pull

# List environment variables
vercel env ls

# Remove environment variable
vercel env rm VARIABLE_NAME
```

## Logs & Debugging

```bash
# View deployment logs
vercel logs [deployment-url]

# View real-time logs
vercel logs [deployment-url] --follow

# View latest production logs
vercel logs --prod
```

## Project Information

```bash
# Get project information
vercel inspect [deployment-url]

# List deployments
vercel ls

# Get domain information
vercel domains ls
```

## Domains

```bash
# Add a custom domain
vercel domains add your-domain.com

# Remove a domain
vercel domains rm your-domain.com

# List all domains
vercel domains ls
```

## Aliases

```bash
# Set an alias for a deployment
vercel alias [deployment-url] your-custom-domain.com

# List aliases
vercel alias ls
```

## Secrets (for sensitive data)

```bash
# Add a secret
vercel secrets add secret-name secret-value

# List secrets
vercel secrets ls

# Remove a secret
vercel secrets rm secret-name

# Use in vercel.json
# "env": {
#   "API_KEY": "@secret-name"
# }
```

## Removing/Deleting

```bash
# Remove a deployment
vercel rm [deployment-url]

# Remove a project (careful!)
vercel remove [project-name]
```

## Help Commands

```bash
# General help
vercel help

# Help for specific command
vercel help deploy
vercel help env
vercel help logs
```

## Useful Flags

```bash
--prod              # Deploy to production
--yes               # Skip confirmation prompts
--force             # Force deployment
--public            # Make deployment public
--regions           # Specify regions
--confirm           # Confirm action
--debug             # Show debug output
--no-clipboard      # Don't copy URL to clipboard
```

## Common Workflows

### Quick Production Deployment

```bash
# Backend
cd server && vercel --prod --yes

# Frontend
cd ../client && vercel --prod --yes
```

### Pull Production Config Locally

```bash
vercel env pull .env.production
```

### Check Deployment Status

```bash
# List recent deployments
vercel ls

# View specific deployment
vercel inspect [deployment-url]

# View logs
vercel logs [deployment-url]
```

### Rollback to Previous Deployment

```bash
# List deployments
vercel ls

# Set previous deployment as active
vercel alias [old-deployment-url] your-domain.com
```

### Development Preview

```bash
# Deploy without affecting production
vercel

# This creates a preview URL you can share for testing
```

## Project Configuration

### View Current Configuration

```bash
vercel project ls
```

### Inspect Deployment

```bash
vercel inspect [deployment-url]
```

## Team Management (if using teams)

```bash
# Switch team
vercel switch

# List teams
vercel teams ls

# Create team
vercel teams create

# Invite to team
vercel teams invite [email]
```

## Advanced

### Deploy with Build Command Override

```bash
vercel --build-env NODE_ENV=production
```

### Deploy to Specific Region

```bash
vercel --regions sfo1,iad1
```

### Deploy with Custom Build

```bash
vercel --prod --build-env NPM_TOKEN=@npm-token
```

## Troubleshooting Commands

### Check CLI Version

```bash
vercel --version
```

### Update CLI

```bash
npm update -g vercel
```

### Clear Cache

```bash
# Remove .vercel folder
rm -rf .vercel

# Re-link project
vercel link
```

### Debug Deployment

```bash
vercel --debug
```

## Quick Reference Card

```bash
# Login & Setup
vercel login                    # Login to account
vercel link                     # Link to project

# Deploy
vercel                          # Deploy preview
vercel --prod                   # Deploy production
vercel --prod --yes             # Deploy without prompts

# Environment
vercel env add NAME             # Add env variable
vercel env pull                 # Pull to local
vercel env ls                   # List variables

# Monitor
vercel logs --prod              # View logs
vercel ls                       # List deployments
vercel domains ls               # List domains

# Manage
vercel rm [url]                 # Remove deployment
vercel help                     # Get help
```

## Integration with package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "deploy": "vercel --prod",
    "deploy:preview": "vercel",
    "logs": "vercel logs --prod",
    "env:pull": "vercel env pull"
  }
}
```

Then use:

```bash
npm run deploy          # Deploy to production
npm run deploy:preview  # Deploy preview
npm run logs           # View logs
npm run env:pull       # Pull env variables
```

---

## 🔗 Resources

- Vercel CLI Docs: https://vercel.com/docs/cli
- Vercel CLI Reference: https://vercel.com/docs/cli/global-options
- GitHub: https://github.com/vercel/vercel

---

**Tip:** Add `vercel` to your PATH and use autocomplete for faster workflow!

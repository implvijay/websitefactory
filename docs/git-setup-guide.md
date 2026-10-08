# Git Setup Guide

This guide will help you set up Git for the Website Factory project.

## Initial Setup

### 1. Install Git

If you haven't installed Git yet:

**Windows:**
- Download from https://git-scm.com/download/win
- Run the installer with default settings

**macOS:**
```bash
# Using Homebrew
brew install git

# Or using Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git

# Fedora
sudo dnf install git
```

### 2. Configure Git

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Set default editor (optional)
git config --global core.editor "code --wait"

# Verify configuration
git config --list
```

### 3. Initialize Repository

```bash
# Navigate to project directory
cd website-factory

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "feat: initial commit - Website Factory v1.0"

# Rename branch to main (if needed)
git branch -M main
```

### 4. Connect to Remote Repository

**Create a new repository on GitHub/GitLab/Bitbucket**, then:

```bash
# Add remote origin
git remote add origin https://github.com/yourusername/website-factory.git

# Push to remote
git push -u origin main
```

## Daily Workflow

### Making Changes

```bash
# Check status
git status

# View changes
git diff

# Stage specific files
git add src/components/PageCanvas.tsx

# Or stage all changes
git add .

# Commit with message
git commit -m "feat: add drag-and-drop to page canvas"

# Push to remote
git push
```

### Branching Strategy

```bash
# Create feature branch
git checkout -b feature/animation-support

# Make changes and commit
git add .
git commit -m "feat: add animation support to sections"

# Push feature branch
git push -u origin feature/animation-support

# Create pull request on GitHub

# After merge, switch back to main
git checkout main
git pull origin main

# Delete feature branch (optional)
git branch -d feature/animation-support
```

### Syncing with Remote

```bash
# Fetch latest changes
git fetch origin

# Pull changes
git pull origin main

# Or pull with rebase
git pull --rebase origin main
```

## Commit Message Convention

Use conventional commits for clear history:

```
<type>: <description>

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
# Simple commit
git commit -m "feat: add theme customization"

# Commit with body
git commit -m "fix: resolve menu drag-and-drop issue

Fixed bug where menu items would not reorder correctly
when dragged to the end of the list.

Closes #123"

# Commit with breaking change
git commit -m "feat!: change theme structure

BREAKING CHANGE: Theme objects now require 'variants' array.
Update all theme definitions to include variants."
```

## Advanced Git Commands

### Undo Changes

```bash
# Unstage file
git reset HEAD <file>

# Discard changes in working directory
git checkout -- <file>

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

### Stashing

```bash
# Stash changes
git stash

# Stash with message
git stash save "work in progress"

# List stashes
git stash list

# Apply stash
git stash apply

# Apply and remove stash
git stash pop

# Drop specific stash
git stash drop stash@{0}
```

### Viewing History

```bash
# View commit history
git log

# View compact history
git log --oneline

# View graph
git log --graph --oneline --all

# View specific file history
git log -p <file>

# Search commits
git log --grep="search term"
```

### Tags

```bash
# Create tag
git tag v1.0.0

# Create annotated tag
git tag -a v1.0.0 -m "Version 1.0.0 release"

# List tags
git tag

# Push tag
git push origin v1.0.0

# Push all tags
git push origin --tags

# Delete tag
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

## Git Hooks

### Install Husky

```bash
# Install husky
npm install -D husky

# Initialize husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "npm run typecheck"

# Add commit message hook
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

### Pre-commit Hook Example

Create `.husky/pre-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run tests
npm run test
```

### Commitlint Configuration

Install commitlint:

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

Create `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

## Collaboration

### Pull Requests

1. Create feature branch
2. Make changes and commit
3. Push to remote
4. Create pull request on GitHub
5. Request review
6. Address feedback
7. Merge after approval

### Code Review Best Practices

- Keep PRs small and focused
- Write clear descriptions
- Add screenshots for UI changes
- Reference related issues
- Request specific reviewers
- Respond to feedback promptly

### Resolving Merge Conflicts

```bash
# Pull latest changes
git pull origin main

# If conflicts occur:
# 1. Open conflicted files
# 2. Resolve conflicts manually
# 3. Stage resolved files
git add <file>

# 4. Complete merge
git commit

# Or abort merge
git merge --abort
```

## Backup and Recovery

### Create Backup

```bash
# Create archive
git archive --format=zip --output=backup.zip main

# Or with prefix
git archive --format=tar --prefix=website-factory/ main | gzip > backup.tar.gz
```

### Recover Lost Commits

```bash
# View reflog
git reflog

# Recover commit
git checkout -b recovery-branch <commit-hash>

# Or cherry-pick
git cherry-pick <commit-hash>
```

## Best Practices

### Do's

✅ Commit often with clear messages  
✅ Use feature branches for new work  
✅ Pull regularly to stay updated  
✅ Review code before committing  
✅ Write descriptive commit messages  
✅ Keep commits atomic and focused  
✅ Use .gitignore properly  
✅ Tag releases  

### Don'ts

❌ Commit sensitive data (API keys, passwords)  
❌ Commit node_modules or build files  
❌ Force push to shared branches  
❌ Make huge commits with unrelated changes  
❌ Ignore merge conflicts  
❌ Delete git history  
❌ Commit directly to main branch  

## Troubleshooting

### Common Issues

**Problem: "fatal: not a git repository"**
```bash
# Solution: Initialize git
git init
```

**Problem: "Permission denied (publickey)"**
```bash
# Solution: Add SSH key to GitHub
ssh-keygen -t ed25519 -C "your.email@example.com"
cat ~/.ssh/id_ed25519.pub
# Add to GitHub Settings > SSH and GPG keys
```

**Problem: "Updates were rejected because the remote contains work"**
```bash
# Solution: Pull changes first
git pull origin main
# Or force push (careful!)
git push -f origin main
```

**Problem: Detached HEAD state**
```bash
# Solution: Create branch from current commit
git checkout -b new-branch-name
```

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Pro Git Book](https://git-scm.com/book/en/v2)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Happy Coding! 🚀**

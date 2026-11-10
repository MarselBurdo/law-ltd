# AGENTS.md

## 1. Branch and Worktree Selection

- Before making any file changes, ALWAYS ask the user where to work:
  1. **Current branch**: make changes in the existing working directory and current branch.
  2. **Codex Worktree**: create or use an isolated worktree.
- NEVER assume which option the user prefers.
- NEVER modify files until the user explicitly selects one of these options.
- If the user selects a Codex Worktree, do not modify the original local working copy.
- Do not perform a handoff from a Worktree to the local working copy unless the user explicitly requests it.

## 2. Codex Project Directory

- Maintain a `.codex/` directory at the project root, similar to `.claude/`.
- Store project-specific Codex configuration, instructions, and reusable resources in `.codex/`.
- Keep `AGENTS.md` at the project root as the main instruction file.
- Do not automatically copy `.claude/` contents into `.codex/` without user approval.

## 3. Before Making Changes

- Briefly describe the planned changes before modifying any files.
- Wait for branch or worktree selection before proceeding.

## 4. Validation

- After completing changes, run the relevant validation or test commands.
- Report the commands executed and their results.
- Clearly mention any tests that could not be run.

## Pull Request Preparation

Please confirm the following before submitting:

- [ ] Changes are made on a separate branch prefixed with `fix/`
- [ ] Only one commit, or commits are properly squashed
- [ ] Descriptive commit message provided
- [ ] All tests pass locally (`npm run test`)
- [ ] Pull request targets the `staging` branch
- [ ] Pull request is not a duplicate of an open one

---

## Summary
Describe the backend bug, how it was discovered, and the fix applied. Indicate affected module, endpoint, or logic.

## Related Issue
Closes #____ or relates to #____

---

## Checklist
- [ ] Bug was reproduced before applying fix
- [ ] Fix applied and manually verified
- [ ] Tests updated or added to cover the case
- [ ] Swagger updated if behavior changed
- [ ] All tests pass (`npm run test`)

---

## How to Test
1. Reproduce the original issue with expected inputs
2. Call the fixed endpoint and confirm behavior
3. Validate logs, database output, or external effects

---

## Additional Context (optional)
Attach logs, DB queries, payloads, or notes.
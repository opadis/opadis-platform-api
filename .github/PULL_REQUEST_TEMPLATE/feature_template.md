## Pull Request Preparation

Please confirm the following before submitting:

- [ ] Changes are made on a separate branch prefixed with `feature/`
- [ ] Only one commit, or commits are properly squashed
- [ ] Descriptive commit message provided
- [ ] All tests pass locally (`npm run test`)
- [ ] Pull request targets the `staging` branch
- [ ] Pull request is not a duplicate of an open one

---

## Summary
Briefly describe the new backend feature. Mention affected roles or modules (e.g., admin validation, user registration, course creation).

## Related Issue
Closes #____ or relates to #____

---

## Checklist
- [ ] Code follows NestJS conventions (controller, service, DTO)
- [ ] Proper input validation and access control implemented
- [ ] Unit or integration tests added or updated
- [ ] Swagger updated (if endpoint is public)
- [ ] All tests pass (`npm run test`)

---

## How to Test
1. Run: `npm install && npm run start:dev`
2. Use Postman, Swagger, or curl to call the affected endpoint(s)
3. Verify expected response and system behavior
4. Check database or logs if applicable

---

## Additional Context (optional)
Include request/response examples, DB changes, or design notes.
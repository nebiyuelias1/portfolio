---
title: Setting Up CI/CD for Flutter Projects
date: 2024-11-20
description: A practical guide to automating your Flutter project's build and deployment pipeline using GitHub Actions.
tags:
  - flutter
  - ci-cd
  - devops
---

# Setting Up CI/CD for Flutter Projects

When I was leading the development team at Bete Semay Creative Media, one of the biggest improvements we made was automating our CI/CD pipeline. In this post, I'll share the approach we took and what I learned.

## Why CI/CD Matters

Before we had CI/CD in place, our deployment process looked like this:

1. Developer finishes a feature
2. Developer manually builds the APK/IPA
3. Developer uploads to the Play Store / App Store
4. Hope nothing breaks

This was slow, error-prone, and honestly a bit stressful. With CI/CD, every push to the main branch triggers an automated pipeline that:

- Runs all tests
- Builds the app for both platforms
- Deploys to the respective stores

## The Stack

For our setup, we used:

- **GitHub Actions** as our CI/CD platform
- **Fastlane** for automating builds and deployments
- **Firebase App Distribution** for beta testing

## Basic GitHub Actions Workflow

Here's a simplified version of our workflow file:

```yaml
name: Flutter CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
      - run: flutter pub get
      - run: flutter test

  build-android:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
      - run: flutter build apk --release
```

## Lessons Learned

After implementing CI/CD across multiple projects, here are my key takeaways:

### 1. Start Simple

Don't try to automate everything at once. Start with automated testing, then add build automation, and finally deployment.

### 2. Secure Your Secrets

Never hardcode API keys, signing certificates, or passwords in your workflow files. Use GitHub Secrets or a similar mechanism.

### 3. Cache Dependencies

Flutter projects can take a while to build. Caching the pub cache and Gradle dependencies can significantly speed things up.

### 4. Monitor Your Pipelines

Set up notifications (Slack, email, etc.) for pipeline failures. The whole point of CI/CD is to catch problems early.

## Conclusion

Implementing CI/CD transformed our development workflow. What used to take hours of manual work now happens automatically with every push. If you're working on a Flutter project without CI/CD, I strongly recommend setting it up — your future self will thank you.

---

*For a more detailed walkthrough, check out my [full article on Hashnode](https://hamsalabs.hashnode.dev/how-to-set-up-a-cicd-pipeline-for-a-flutter-project-on-github).*

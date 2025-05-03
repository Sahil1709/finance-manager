## [1.5.2-rc.1](https://github.com/Sahil1709/finance-manager/compare/v1.5.1...v1.5.2-rc.1) (2025-05-03)


### Bug Fixes

* Change main branch to release in semantic release configuration ([6b25d65](https://github.com/Sahil1709/finance-manager/commit/6b25d65f8d244988845a3ba1773d426ea39a618d))

## [1.5.1](https://github.com/Sahil1709/finance-manager/compare/v1.5.0...v1.5.1) (2025-05-03)


### Bug Fixes

* Correct prerelease branch configuration in semantic release settings ([bbbbfca](https://github.com/Sahil1709/finance-manager/commit/bbbbfcaf01071dbadc314b472df693668624bb99))

# [1.5.0](https://github.com/Sahil1709/finance-manager/compare/v1.4.0...v1.5.0) (2025-05-03)


### Bug Fixes

* Force npm install to resolve dependency issues ([18c42a3](https://github.com/Sahil1709/finance-manager/commit/18c42a3b8e5254d41f19b76124ce96d7d27f4cd6))
* Remove unnecessary schema inclusion for insights endpoint ([f60ae27](https://github.com/Sahil1709/finance-manager/commit/f60ae2791f451f7b4d0eb86ba4ad109d601c68d8))
* update authorization header to use PAT_TOKEN for RC deploy workflow ([f002bd0](https://github.com/Sahil1709/finance-manager/commit/f002bd058425a4e464f281e9d8cbac526302295b))
* Update Node.js version to 20 and add dependency on semantic release job for RC deploy ([94dae18](https://github.com/Sahil1709/finance-manager/commit/94dae18e3aab3606ad98eacc0adf2cb5891efb31))
* update payload format for rc_deploy event in RC deploy workflow ([0d53c3e](https://github.com/Sahil1709/finance-manager/commit/0d53c3e56ca634647e5d9a9d2a5fbf86b41138b6))


### Features

* Add analytics service with FastAPI and integrate Groq for insights ([c8abdbc](https://github.com/Sahil1709/finance-manager/commit/c8abdbcdcfae78436c836ffa21e68d347b644cba))
* Add FRONTEND_GREEN_URL environment variable to Dockerfiles and update CORS origins ([f74a0ec](https://github.com/Sahil1709/finance-manager/commit/f74a0ec1affeb19716157a21572f1521b5fe05ed))
* Add FRONTEND_RC_URL environment variable to analytics service ([8e519a3](https://github.com/Sahil1709/finance-manager/commit/8e519a32a17f01c44c2bdd8498fdf6ccc806009e))
* Add NEXT_PUBLIC_ANALYTICS_URL to frontend environment variables ([26a5a61](https://github.com/Sahil1709/finance-manager/commit/26a5a6161ebc0dbc2d0f949beb6a2e886f4ec788))
* Add NEXT_PUBLIC_VERSION environment variable and display version in AppSidebar ([0edaeea](https://github.com/Sahil1709/finance-manager/commit/0edaeeac4282cd317ea2ef8d324a15de1c3d5072))
* add testing line to README.md ([96f84f7](https://github.com/Sahil1709/finance-manager/commit/96f84f76743cdfeedc92cda1d035fbde9ec8529f))
* Enable CI for semantic release and add semantic release steps to GitHub Actions workflow ([56c62a8](https://github.com/Sahil1709/finance-manager/commit/56c62a8f41bd2627eb11edbff4a50c3aee68e2a5))
* remove Utilities category from analytics data ([8bf66d7](https://github.com/Sahil1709/finance-manager/commit/8bf66d7aefc1eb9a80fa1d0c75dea5f52e70ff1b))
* Set root path for FastAPI applications in analytics and backend services ([4b69dd3](https://github.com/Sahil1709/finance-manager/commit/4b69dd3ed4db2f798d070e9822262d909e20a734))
* Update FastAPI and frontend components for improved routing and authentication ([07b02ef](https://github.com/Sahil1709/finance-manager/commit/07b02ef950f0956ff5ba94f2aae33afcc714070d))


### Performance Improvements

* add FRONTEND_RC_URL environment variable to backend configuration ([19bb5af](https://github.com/Sahil1709/finance-manager/commit/19bb5af56efabfdc19991a53bd1451fdb537572c))

# [1.5.0-rc.2](https://github.com/Sahil1709/finance-manager/compare/v1.5.0-rc.1...v1.5.0-rc.2) (2025-03-16)


### Features

* remove Utilities category from analytics data ([8bf66d7](https://github.com/Sahil1709/finance-manager/commit/8bf66d7aefc1eb9a80fa1d0c75dea5f52e70ff1b))

# [1.5.0-rc.1](https://github.com/Sahil1709/finance-manager/compare/v1.4.0...v1.5.0-rc.1) (2025-03-16)


### Bug Fixes

* update authorization header to use PAT_TOKEN for RC deploy workflow ([f002bd0](https://github.com/Sahil1709/finance-manager/commit/f002bd058425a4e464f281e9d8cbac526302295b))
* update payload format for rc_deploy event in RC deploy workflow ([0d53c3e](https://github.com/Sahil1709/finance-manager/commit/0d53c3e56ca634647e5d9a9d2a5fbf86b41138b6))


### Features

* add testing line to README.md ([96f84f7](https://github.com/Sahil1709/finance-manager/commit/96f84f76743cdfeedc92cda1d035fbde9ec8529f))


### Performance Improvements

* add FRONTEND_RC_URL environment variable to backend configuration ([19bb5af](https://github.com/Sahil1709/finance-manager/commit/19bb5af56efabfdc19991a53bd1451fdb537572c))

# [1.3.0-rc.2](https://github.com/Sahil1709/finance-manager/compare/v1.3.0-rc.1...v1.3.0-rc.2) (2025-03-16)


### Performance Improvements

* add FRONTEND_RC_URL environment variable to backend configuration ([19bb5af](https://github.com/Sahil1709/finance-manager/commit/19bb5af56efabfdc19991a53bd1451fdb537572c))

# [1.3.0-rc.1](https://github.com/Sahil1709/finance-manager/compare/v1.2.0...v1.3.0-rc.1) (2025-03-16)


### Features

* add GitHub Actions workflow to trigger RC deploy on tag push ([b980bea](https://github.com/Sahil1709/finance-manager/commit/b980bea3244fbd50676a51bbdbe719d4e3e877c5))
* test rc branch semantic release ([a1644a7](https://github.com/Sahil1709/finance-manager/commit/a1644a7fdc3a4fc6accf61d76e4976937a8c75a4))
* test rc2 ([2074aac](https://github.com/Sahil1709/finance-manager/commit/2074aac44d8198a5af5375663f1ad305276f0b5d))
* update README to reflect changes in test workflow ([24dcdb8](https://github.com/Sahil1709/finance-manager/commit/24dcdb8c06202e4542e44e96c2e74671195ad71d))

# [1.4.0](https://github.com/Sahil1709/finance-manager/compare/v1.3.0...v1.4.0) (2025-03-16)


### Features

* update RC deploy workflow to trigger on release publish events ([51b2454](https://github.com/Sahil1709/finance-manager/commit/51b2454066dd87dda7e556997a95fa72a44e7b3e))

# [1.3.0](https://github.com/Sahil1709/finance-manager/compare/v1.2.0...v1.3.0) (2025-03-16)


### Features

* add GitHub Actions workflow to trigger RC deploy on tag push ([b980bea](https://github.com/Sahil1709/finance-manager/commit/b980bea3244fbd50676a51bbdbe719d4e3e877c5))
* add workflow_dispatch trigger to RC deploy workflow ([37bfd61](https://github.com/Sahil1709/finance-manager/commit/37bfd61d8c2da56aad7186c4e33b9771b2d1e453))
* test rc branch semantic release ([a1644a7](https://github.com/Sahil1709/finance-manager/commit/a1644a7fdc3a4fc6accf61d76e4976937a8c75a4))
* test rc2 ([2074aac](https://github.com/Sahil1709/finance-manager/commit/2074aac44d8198a5af5375663f1ad305276f0b5d))
* update README to reflect changes in test workflow ([24dcdb8](https://github.com/Sahil1709/finance-manager/commit/24dcdb8c06202e4542e44e96c2e74671195ad71d))

# [1.2.0](https://github.com/Sahil1709/finance-manager/compare/v1.1.1...v1.2.0) (2025-03-16)


### Features

* add GitHub Actions workflow to trigger RC deploy on release ([162fe04](https://github.com/Sahil1709/finance-manager/commit/162fe0473aaeb8cdcc9c0ff406e3b8de181b0d21))

## [1.1.1](https://github.com/Sahil1709/finance-manager/compare/v1.1.0...v1.1.1) (2025-03-16)


### Performance Improvements

* **docs:** add README.md with project overview and setup instructions ([58e51ff](https://github.com/Sahil1709/finance-manager/commit/58e51ff7386f3d3ce92f89d04f2e4487b2981565))

# [1.1.0](https://github.com/Sahil1709/finance-manager/compare/v1.0.0...v1.1.0) (2025-03-16)


### Features

* add new rc release feature ([aac872f](https://github.com/Sahil1709/finance-manager/commit/aac872fa1f05eaae46f232e9c1e5235a2fdb0290))

# 1.0.0 (2025-03-16)


### Bug Fixes

* add trailing slashes to API endpoint URLs for consistency ([287d197](https://github.com/Sahil1709/finance-manager/commit/287d19791c3cbb6bee084067d515549a6628fba8))
* add trailing slashes to endpoint paths for consistency ([1f8e359](https://github.com/Sahil1709/finance-manager/commit/1f8e3595527b6fdadb8eaf04f8b7bf8a73f298f2))
* correct Dockerfile syntax and remove unnecessary build stages ([abe722e](https://github.com/Sahil1709/finance-manager/commit/abe722e70714b6dda55af46ea9c585dd977ce14a))
* correct Dockerfile syntax by replacing UNFROM with FROM ([49438c6](https://github.com/Sahil1709/finance-manager/commit/49438c60c6a1c98481092f87b29c52968886336c))
* remove trailing slashes from API endpoint URLs for consistency ([2412458](https://github.com/Sahil1709/finance-manager/commit/2412458235e9ad0a117aa4cebec6bcdebcc1d273))
* remove unused color theme "Slate" from settings ([fcd4dce](https://github.com/Sahil1709/finance-manager/commit/fcd4dcecb4f0e000506b76830567b3588aa1f500))
* update backend Dockerfile to use uvicorn for running the application ([7835c5f](https://github.com/Sahil1709/finance-manager/commit/7835c5f8fdeae241dd9a4879e90348032263a4e8))

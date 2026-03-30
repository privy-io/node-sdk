# Changelog

## 0.12.0 (2026-03-30)

Full Changelog: [v0.11.0...v0.12.0](https://github.com/privy-io/node-sdk/compare/v0.11.0...v0.12.0)

### Features

* add support for the x-ratelimit-reset header on 429s ([#106](https://github.com/privy-io/node-sdk/issues/106)) ([e32eee0](https://github.com/privy-io/node-sdk/commit/e32eee081442ae78bc00bd4f72777ccaed419471))
* **api:** api update ([fa58830](https://github.com/privy-io/node-sdk/commit/fa588301e161703bce6f3074396ba735e044a5fd))
* **api:** api update ([c552e29](https://github.com/privy-io/node-sdk/commit/c552e29ed748abf74c6d41dabea11f645943497d))
* **api:** api update ([00fbb6b](https://github.com/privy-io/node-sdk/commit/00fbb6bbcbe5af21558e7fe3342eb7405d2260f5))
* **api:** api update ([2167cb6](https://github.com/privy-io/node-sdk/commit/2167cb6a5888003bc3f23c461a6d46a3036d2ce5))
* **api:** api update ([665f220](https://github.com/privy-io/node-sdk/commit/665f220454080918540178d4a0bc3b799fe33497))
* **api:** api update ([60719f5](https://github.com/privy-io/node-sdk/commit/60719f56afed1b796d58817deb19d6e695139f9e))
* **api:** api update ([505640f](https://github.com/privy-io/node-sdk/commit/505640fa82c658a2561cc008eb56217a7336d17d))
* **api:** api update ([8ce26f2](https://github.com/privy-io/node-sdk/commit/8ce26f25fae4cb29f92f24426212152cb9d2b181))
* **api:** api update ([b55c76c](https://github.com/privy-io/node-sdk/commit/b55c76c254d3f8f92e7d566f820e564f4b6fffe5))
* **api:** api update ([e29ce25](https://github.com/privy-io/node-sdk/commit/e29ce25ae8725c93a33753beb6efa3b28d96a66f))
* **api:** api update ([cbc1bba](https://github.com/privy-io/node-sdk/commit/cbc1bbab94f7d17845b147c69d675c989eca584a))
* **api:** api update ([87ac417](https://github.com/privy-io/node-sdk/commit/87ac41761bd3784cb955673371ad58598127a177))
* **api:** api update ([021b850](https://github.com/privy-io/node-sdk/commit/021b850c9bb78196aa2d601ce4efbee0c5f6ae51))
* **api:** api update ([656ea0b](https://github.com/privy-io/node-sdk/commit/656ea0b950561eab68f0cecc71ae1f378a3e985f))
* **api:** api update ([887d557](https://github.com/privy-io/node-sdk/commit/887d557bbe14b5ed68a62856a56bc460fcd33a14))
* extract authorizeRequest helper for wallet RPC authorization ([#110](https://github.com/privy-io/node-sdk/issues/110)) ([b540675](https://github.com/privy-io/node-sdk/commit/b54067530e36ad1c229cfd0eccf7d53f4a86f2e2))
* include expiry header in rpc signature generation ([#109](https://github.com/privy-io/node-sdk/issues/109)) ([1554c32](https://github.com/privy-io/node-sdk/commit/1554c32f44b9842a39c06fb46810c428e609193c))


### Bug Fixes

* defaultRequestExpiryMs is now typed as a number ([#114](https://github.com/privy-io/node-sdk/issues/114)) ([d057791](https://github.com/privy-io/node-sdk/commit/d0577912dfbfb9e4043b1f2e229b4a96110e9d16))
* reference the new wallet rpc types ([#113](https://github.com/privy-io/node-sdk/issues/113)) ([7158ba3](https://github.com/privy-io/node-sdk/commit/7158ba3804932ab9fcdafa1e9b7ccfeb8a5324c6))
* use SuccessResponse for delete operations in key-quorums and policies ([#115](https://github.com/privy-io/node-sdk/issues/115)) ([2b2a5ba](https://github.com/privy-io/node-sdk/commit/2b2a5ba5e61c9d626aa7f81753001ccd7b8b2d74))
* validate id parameters are not empty strings in get methods ([#108](https://github.com/privy-io/node-sdk/issues/108)) ([8f0014d](https://github.com/privy-io/node-sdk/commit/8f0014d47da1e6be9bf384369e027c827f5ea710))


### Chores

* **ci:** skip lint on metadata-only changes ([eee4ba0](https://github.com/privy-io/node-sdk/commit/eee4ba0c5601be01ad84cc708f277c4cc21d2534))
* **internal:** tweak CI branches ([e3ddd2d](https://github.com/privy-io/node-sdk/commit/e3ddd2d346bf1ddef8773b4002e4171dc27b5578))
* **internal:** update gitignore ([ddbafa2](https://github.com/privy-io/node-sdk/commit/ddbafa22b9f2312caa9b381289a2d65b4c35accd))

## 0.11.0 (2026-03-13)

Full Changelog: [v0.10.1...v0.11.0](https://github.com/privy-io/node-sdk/compare/v0.10.1...v0.11.0)

### ⚠ BREAKING CHANGES

* `PrivywalletsService.create()` no longer accepts `'privy-idempotency-key'` as a parameter. Use `idempotency_key` instead.
* `PrivyPoliciesService.create()` no longer accepts `'privy-idempotency-key'` as a parameter. Use `idempotency_key` instead.

### Features

* adds a helper to create policies with an idempotency key ([#94](https://github.com/privy-io/node-sdk/issues/94)) ([373bb44](https://github.com/privy-io/node-sdk/commit/373bb44678bc6628966a549ea7bbaf8753309a31))
* adds a helper to create wallets with an idempotency key ([#93](https://github.com/privy-io/node-sdk/issues/93)) ([5550257](https://github.com/privy-io/node-sdk/commit/5550257c7a24b52ad551b8452da92f22a25bbb32))
* **api:** api update ([a7f2ab9](https://github.com/privy-io/node-sdk/commit/a7f2ab933785329fa0cfa96ee6e6030790d7ac9b))
* **api:** api update ([d3145ad](https://github.com/privy-io/node-sdk/commit/d3145adf6ce775fc492c0907be2b841b2e5db454))
* **api:** api update ([378ac4c](https://github.com/privy-io/node-sdk/commit/378ac4c8069500044f1dd640b4012aa17e696928))
* **api:** api update ([2c43544](https://github.com/privy-io/node-sdk/commit/2c435446b8d65e221481ca8cd9a37cf084ebf07d))
* **api:** api update ([6365b99](https://github.com/privy-io/node-sdk/commit/6365b99662ab5dc829e6eefdb8eb4ca353b0cd27))
* **api:** api update ([1d52329](https://github.com/privy-io/node-sdk/commit/1d5232939cd270ec774b0c4cb0d09b587661c232))
* **api:** api update ([94ff459](https://github.com/privy-io/node-sdk/commit/94ff4596a62585565777f368d95ac17e0a805340))
* **api:** api update ([304e9e0](https://github.com/privy-io/node-sdk/commit/304e9e0aea9e1239f7c4f7992c64f6cbc5953a1d))
* **api:** api update ([56a5aba](https://github.com/privy-io/node-sdk/commit/56a5aba3d0aeb07250609ca29b4fa04cbad0a97b))
* **api:** api update ([f6f95b7](https://github.com/privy-io/node-sdk/commit/f6f95b76ca747be2015df59098fbff539812b151))
* **api:** enables apps resource endpoints ([de1a564](https://github.com/privy-io/node-sdk/commit/de1a564476dea465485ae381a7319bf9656504a1))
* **api:** manual updates ([5cf6ac0](https://github.com/privy-io/node-sdk/commit/5cf6ac0dce823ce8f5c34144e15b025cb908879c))
* **api:** manual updates ([454c431](https://github.com/privy-io/node-sdk/commit/454c431283fa89e84644170a1cbc7fae0e1b2526))
* implements apps.getTestAccessToken ([#101](https://github.com/privy-io/node-sdk/issues/101)) ([a3c4cb7](https://github.com/privy-io/node-sdk/commit/a3c4cb7af5de1ebded37b92019b4a47f61b774ce))
* implements the apps service ([#100](https://github.com/privy-io/node-sdk/issues/100)) ([96504b8](https://github.com/privy-io/node-sdk/commit/96504b82b569a3a786d184d7128a04e63d7d3420))


### Bug Fixes

* adapts to the latest breaking changes on type rename ([#98](https://github.com/privy-io/node-sdk/issues/98)) ([a2badea](https://github.com/privy-io/node-sdk/commit/a2badeab73b556c87267a566d9063f82f91b15b3))
* **client:** preserve URL params already embedded in path ([13d416d](https://github.com/privy-io/node-sdk/commit/13d416df7f455d04cb31ce3a97ff1c6d9f0177b7))
* WalletRpcResponse renamed again ([#104](https://github.com/privy-io/node-sdk/issues/104)) ([f468592](https://github.com/privy-io/node-sdk/commit/f468592dfaa9165849c212e14d539e59a5dfaaf4))


### Chores

* **ci:** skip uploading artifacts on stainless-internal branches ([0f699de](https://github.com/privy-io/node-sdk/commit/0f699de52e3509ea81d9d3151b4c5f9bebc458f8))
* configure new SDK language ([90f586b](https://github.com/privy-io/node-sdk/commit/90f586b6a8315e5ef899c27bcb0de13b3aec7bdd))
* **internal:** codegen related update ([5ccb5d8](https://github.com/privy-io/node-sdk/commit/5ccb5d826141ae640a83d66c1cab51f95aa371a3))
* **internal:** codegen related update ([0415a9d](https://github.com/privy-io/node-sdk/commit/0415a9df5abf48465c81715dfcb7591dafdc9628))
* **internal:** update dependencies to address dependabot vulnerabilities ([a7616f8](https://github.com/privy-io/node-sdk/commit/a7616f81d406eef3ce41163d59eef974fe2bfcd7))


### Documentation

* updates the contributing docs ([#96](https://github.com/privy-io/node-sdk/issues/96)) ([9472029](https://github.com/privy-io/node-sdk/commit/9472029ae7db587375114a67d98bfd9e6725ba47))

## 0.10.1 (2026-02-27)

Full Changelog: [v0.10.0...v0.10.1](https://github.com/privy-io/node-sdk/compare/v0.10.0...v0.10.1)

### Features

* **api:** api update ([cfb2771](https://github.com/privy-io/node-sdk/commit/cfb2771a406cab7c66ebc610e1971a3e9df77e3d))
* **typescript:** set up npm oidc publishing ([cf13bf7](https://github.com/privy-io/node-sdk/commit/cf13bf7627811c4b24bf3164f21c3e3ef27cd835))


### Chores

* **internal:** move stringifyQuery implementation to internal function ([14381a9](https://github.com/privy-io/node-sdk/commit/14381a99a7e2d66722b84bf7746c78bef592c539))

## 0.10.0 (2026-02-27)

Full Changelog: [v0.9.0...v0.10.0](https://github.com/privy-io/node-sdk/compare/v0.9.0...v0.10.0)

### Features

* **api:** api update ([14a8c62](https://github.com/privy-io/node-sdk/commit/14a8c629acf2892c5653a98dfab2239623c67c39))
* **api:** api update ([15ed42f](https://github.com/privy-io/node-sdk/commit/15ed42fe45e581496013f4d6d87f388aefac93c1))
* **api:** api update ([8fb4475](https://github.com/privy-io/node-sdk/commit/8fb4475b14fcdc5e9ee14af2f159299851f5c28d))
* **api:** api update ([378bea7](https://github.com/privy-io/node-sdk/commit/378bea7f7ffb654f12043083a36d6be819161cb6))
* **api:** api update ([afd7b4c](https://github.com/privy-io/node-sdk/commit/afd7b4c69ec0a629b83d4785fab098b80c44d006))
* **api:** api update ([61b5def](https://github.com/privy-io/node-sdk/commit/61b5defaeebc6f9805571e2d2d938855d259dcb1))
* **api:** api update ([3a5a2f6](https://github.com/privy-io/node-sdk/commit/3a5a2f6bc4d6fd111447b080bef63a450eeda44d))
* **api:** api update ([fb516d6](https://github.com/privy-io/node-sdk/commit/fb516d695a40f40486a004291f4a4fe24fa89eec))
* ethereum signUserOperation util ([#89](https://github.com/privy-io/node-sdk/issues/89)) ([8d32aa7](https://github.com/privy-io/node-sdk/commit/8d32aa7c1ad6df4e7b8dcf2012924cf705eacbd3))
* expose LinkedAccount type ([#90](https://github.com/privy-io/node-sdk/issues/90)) ([db6e8d9](https://github.com/privy-io/node-sdk/commit/db6e8d918f4e9d013442cc7a2e26863cf4312522))
* returns a typed payload after webhook verification ([#87](https://github.com/privy-io/node-sdk/issues/87)) ([82ce0a7](https://github.com/privy-io/node-sdk/commit/82ce0a71e17bd0e5c20a8777e6bcfd1d7b61701f))


### Bug Fixes

* **docs/contributing:** correct pnpm link command ([1ea6518](https://github.com/privy-io/node-sdk/commit/1ea65188e454c60f9ced06cb98b3c1178d85790d))


### Chores

* **internal/client:** fix form-urlencoded requests ([b0b505a](https://github.com/privy-io/node-sdk/commit/b0b505af4f630b1fbf05d4bf8c398d8714a46ebe))
* **internal:** remove mock server code ([ea82bbe](https://github.com/privy-io/node-sdk/commit/ea82bbea3a78276efefdc0cb000ce22d83351fad))
* update mock server docs ([05644d1](https://github.com/privy-io/node-sdk/commit/05644d18cec42a270ef9b586616951f556db20ac))

## 0.9.0 (2026-02-13)

Full Changelog: [v0.8.0...v0.9.0](https://github.com/privy-io/node-sdk/compare/v0.8.0...v0.9.0)

### Features

* **api:** api update ([b6e1c84](https://github.com/privy-io/node-sdk/commit/b6e1c84038d94ae5182c765b0407186dc5f54ecd))
* **api:** api update ([bac71ca](https://github.com/privy-io/node-sdk/commit/bac71ca2bc3fa5c1f34cf752f64401e17cfad979))
* **api:** api update ([6b67757](https://github.com/privy-io/node-sdk/commit/6b67757ba7e952b1a89d17df3236362156bf3699))
* **api:** api update ([0e3ddf0](https://github.com/privy-io/node-sdk/commit/0e3ddf096c5876f6e428aa0b1aabb2eb7d69e450))
* **api:** api update ([5653da0](https://github.com/privy-io/node-sdk/commit/5653da0049a506c4bb7bca7eb577faad58727503))
* **api:** api update ([627ee1b](https://github.com/privy-io/node-sdk/commit/627ee1b3d8d1d5e045815c384a6c4cdc0bba5076))
* **api:** api update ([7032cd7](https://github.com/privy-io/node-sdk/commit/7032cd78d6ce80ae33145b2dd6227744d8dc3514))
* **api:** api update ([226d667](https://github.com/privy-io/node-sdk/commit/226d667d41d392e06cef293aaf896e6070639415))
* **api:** api update ([d66b38f](https://github.com/privy-io/node-sdk/commit/d66b38fc893c8419718a518b88df340f7a5e51ec))
* **api:** api update ([bb9b136](https://github.com/privy-io/node-sdk/commit/bb9b136b3b97ff8296ba6da22d80cdfb2b22a419))
* **api:** api update ([623e0d6](https://github.com/privy-io/node-sdk/commit/623e0d643f72ed059b89b312699dfa09d40692a2))
* **api:** api update ([a5d7543](https://github.com/privy-io/node-sdk/commit/a5d75432911d69123044131d3cd47ab6374e6d8e))
* **api:** api update ([0c2ba6d](https://github.com/privy-io/node-sdk/commit/0c2ba6d234f020d14b8697d68403409c3f3016dc))
* **api:** api update ([92f4f4f](https://github.com/privy-io/node-sdk/commit/92f4f4faafb46821423062673a53a200a6be128c))
* **api:** api update ([85040d2](https://github.com/privy-io/node-sdk/commit/85040d209d9536125f97cc1d86fb6e1a12d5bccd))
* **api:** manual updates ([744cf64](https://github.com/privy-io/node-sdk/commit/744cf64d3ccb39e375826196bca602494449e687))
* **api:** manual updates ([4d13f7d](https://github.com/privy-io/node-sdk/commit/4d13f7db2b7f2f35448015dfb7b0666f58f125ae))
* **api:** manual updates ([88ac05f](https://github.com/privy-io/node-sdk/commit/88ac05ff422c5f45a9eaef6031c0eaf3482ca34a))
* **x402:** add x402 methods ([#84](https://github.com/privy-io/node-sdk/issues/84)) ([8fc581e](https://github.com/privy-io/node-sdk/commit/8fc581ed1af72580b174653c57b202ee94e809b3))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([964edcf](https://github.com/privy-io/node-sdk/commit/964edcfd0486c7fbd2bd867c72c0907ea006af63))
* **client:** avoid removing abort listener too early ([3a0187a](https://github.com/privy-io/node-sdk/commit/3a0187ae339cf74d786336d878f8bdc331245a20))
* fixes incorrect name generation ([#86](https://github.com/privy-io/node-sdk/issues/86)) ([7cb3e9e](https://github.com/privy-io/node-sdk/commit/7cb3e9e489b1d2f31faa34ed266fd0ea383293d4))
* oauth provider id template strings ([#85](https://github.com/privy-io/node-sdk/issues/85)) ([b17d1ba](https://github.com/privy-io/node-sdk/commit/b17d1ba8fefe81878c71ad4892787a7bbade560a))


### Chores

* **ci:** upgrade `actions/github-script` ([9b2f7d1](https://github.com/privy-io/node-sdk/commit/9b2f7d19e1654691f121a99482e7e807ba5c8b50))
* **client:** do not parse responses with empty content-length ([66b9eef](https://github.com/privy-io/node-sdk/commit/66b9eef69db180bf953516105610d7545846483e))
* **client:** restructure abort controller binding ([0002005](https://github.com/privy-io/node-sdk/commit/00020051e4246594bd26bc4766f7fc74026d1837))
* **internal:** avoid type checking errors with ts-reset ([5962e41](https://github.com/privy-io/node-sdk/commit/5962e414da6816248af0ced983c0cdaac85ac0bd))
* **internal:** fix pagination internals not accepting option promises ([c4ba7d9](https://github.com/privy-io/node-sdk/commit/c4ba7d9118dfba3e654d9df8e94f1af692a791f6))

## 0.8.0 (2026-01-17)

Full Changelog: [v0.7.0...v0.8.0](https://github.com/privy-io/node-sdk/compare/v0.7.0...v0.8.0)

### Features

* **api:** api update ([16c49a9](https://github.com/privy-io/node-sdk/commit/16c49a936ae0e18891d7531c81385a5f887346dc))
* **api:** api update ([25453fe](https://github.com/privy-io/node-sdk/commit/25453fee4719c7b209e8867143603d954ca8952c))
* **api:** api update ([c3bb702](https://github.com/privy-io/node-sdk/commit/c3bb702c5c9dd87856f2a5baf87a049430db0f88))
* **api:** api update ([7630b72](https://github.com/privy-io/node-sdk/commit/7630b72bfd4ced575f709ce5319d7e7f091e9749))
* **api:** api update ([69af40d](https://github.com/privy-io/node-sdk/commit/69af40d84540b2d75974253b7278515e6cb3d657))
* **api:** api update ([5c3d2ce](https://github.com/privy-io/node-sdk/commit/5c3d2ce401b35d14007d5533b109979f61fe310c))
* **api:** api update ([e02b2d6](https://github.com/privy-io/node-sdk/commit/e02b2d646f5e5d7376100f2419c5a4058e1a1418))
* **api:** api update ([5214679](https://github.com/privy-io/node-sdk/commit/5214679fca5913e3937a30d3caa011f2df24e1ef))


### Chores

* break long lines in snippets into multiline ([b2e8e04](https://github.com/privy-io/node-sdk/commit/b2e8e04400c4e7b7b153db09215b896c15e46b1b))
* fix typo in descriptions ([9ce7c49](https://github.com/privy-io/node-sdk/commit/9ce7c49dfa9049d7cef7a7a217d3dd08ffde10a5))
* **internal:** update `actions/checkout` version ([21fd65f](https://github.com/privy-io/node-sdk/commit/21fd65f518b6ff678e7945565a207dbce44c8c8d))
* **internal:** upgrade babel, qs, js-yaml ([52a6f89](https://github.com/privy-io/node-sdk/commit/52a6f89adb91a832e6803a2dcbb0d7b008f65c74))


### Documentation

* add more examples ([201c705](https://github.com/privy-io/node-sdk/commit/201c705e6f9618ff059c8cbda0de89ddd2344d0f))

## 0.7.0 (2026-01-02)

Full Changelog: [v0.6.2...v0.7.0](https://github.com/privy-io/node-sdk/compare/v0.6.2...v0.7.0)

### Features

* **api:** api update ([40bc785](https://github.com/privy-io/node-sdk/commit/40bc785965bc0cf8f153cb3d93ed6ebb4b951ace))
* **api:** api update ([fd87e16](https://github.com/privy-io/node-sdk/commit/fd87e165572783e58b70938c0b8cacd6cd6537fd))
* **api:** api update ([d50dbce](https://github.com/privy-io/node-sdk/commit/d50dbcea4659ac4570300e8bbe474cb2d9e0dd05))
* **api:** api update ([74c694a](https://github.com/privy-io/node-sdk/commit/74c694a43f3a450de67f53063c9fc7f81592fa8f))
* **api:** api update ([4be36e7](https://github.com/privy-io/node-sdk/commit/4be36e7c6945d28c29ca5b00ef808807533b755a))
* introduces the @solana/kit signer ([#78](https://github.com/privy-io/node-sdk/issues/78)) ([c31fdaa](https://github.com/privy-io/node-sdk/commit/c31fdaaa89a0d393bffd35712251274f9fcecc90))
* introduces the generateP256KeyPair util ([#76](https://github.com/privy-io/node-sdk/issues/76)) ([fbef7e5](https://github.com/privy-io/node-sdk/commit/fbef7e5c8d7b6e2b35ebb2c5189035095eab782f))
* renames verifyAuthToken to verifyAccessToken ([#75](https://github.com/privy-io/node-sdk/issues/75)) ([169c506](https://github.com/privy-io/node-sdk/commit/169c5064c59211eab4483f04be926623618c9c79))


### Bug Fixes

* LinkedAccount is no longer a namespace ([#74](https://github.com/privy-io/node-sdk/issues/74)) ([b621174](https://github.com/privy-io/node-sdk/commit/b621174b645797dff0cc5e06524277b4d522c012))
* **mcp:** correct code tool API endpoint ([6d22848](https://github.com/privy-io/node-sdk/commit/6d22848550eb84667d2698e1ae9fab0651c53eb8))
* **mcp:** return correct lines on typescript errors ([cf74799](https://github.com/privy-io/node-sdk/commit/cf74799c28682958a71158e5d9abf60454f6b86b))


### Chores

* **client:** fix logger property type ([c074af3](https://github.com/privy-io/node-sdk/commit/c074af3b965fa258500f0994a2ad296e58eaa991))
* **internal:** codegen related update ([9547b80](https://github.com/privy-io/node-sdk/commit/9547b8017bf0bf2b9a3c98b31146fe7254b006ad))
* **internal:** codegen related update ([9673054](https://github.com/privy-io/node-sdk/commit/967305425ebda098278c285a328506148af2fd43))
* **internal:** upgrade eslint ([b4b1323](https://github.com/privy-io/node-sdk/commit/b4b132372fd6c725db152e26b9c1f4e8b971f0ab))
* moves to @solana/kit ([#77](https://github.com/privy-io/node-sdk/issues/77)) ([d5363f8](https://github.com/privy-io/node-sdk/commit/d5363f84797f0c979534d19a0c810cf2cbbb00b2))

## 0.6.2 (2025-12-01)

Full Changelog: [v0.6.1...v0.6.2](https://github.com/privy-io/node-sdk/compare/v0.6.1...v0.6.2)

### Features

* **api:** api update ([e7960bc](https://github.com/privy-io/node-sdk/commit/e7960bc92b6ed466d7948b39861f8013b3dcd6dd))


### Chores

* bumps hpke/core in our yarn lock ([8ca2a38](https://github.com/privy-io/node-sdk/commit/8ca2a38b612e961838c9c5fff670ffa18a01cb9e))
* bumps hpke/core in our yarn lock ([#71](https://github.com/privy-io/node-sdk/issues/71)) ([b6cbc6d](https://github.com/privy-io/node-sdk/commit/b6cbc6db97e0a6ec36e48dbf6c34c73bb51814df))

## 0.6.1 (2025-11-25)

Full Changelog: [v0.6.0...v0.6.1](https://github.com/privy-io/node-sdk/compare/v0.6.0...v0.6.1)

### Features

* **api:** api update ([ac4206c](https://github.com/privy-io/node-sdk/commit/ac4206c8b86d4271bacbd24145968b6ce0b3997d))
* **api:** api update ([c450335](https://github.com/privy-io/node-sdk/commit/c45033522a6596e09774f1a4886b70130efc3979))
* **api:** api update ([66dbeef](https://github.com/privy-io/node-sdk/commit/66dbeefea02cf9ea2d753b24309ce36ce0854c7b))
* **api:** api update ([309172e](https://github.com/privy-io/node-sdk/commit/309172e83be9c46467fe7d566f6270ece403edbf))
* **api:** api update ([0cad0d7](https://github.com/privy-io/node-sdk/commit/0cad0d7acc234806a2069a8f371fc69f48d5f6c2))
* **api:** api update ([ed58b48](https://github.com/privy-io/node-sdk/commit/ed58b4816c79050cf582ac390df791ab14bcc0f6))

## 0.6.0 (2025-11-17)

Full Changelog: [v0.5.0...v0.6.0](https://github.com/privy-io/node-sdk/compare/v0.5.0...v0.6.0)

### Features

* **api:** api update ([678df22](https://github.com/privy-io/node-sdk/commit/678df229e04b0415c7d1300b64bde709980718e2))
* **api:** api update ([4f69a8d](https://github.com/privy-io/node-sdk/commit/4f69a8d326e59a6479e244f85103ec183d7e03f3))
* **api:** api update ([978dcb0](https://github.com/privy-io/node-sdk/commit/978dcb008e45ef20900aa1657f8e1c49c80a7de4))
* **api:** api update ([70d8fd2](https://github.com/privy-io/node-sdk/commit/70d8fd2de4a3bcb2a7080061cdb38bbfd02f826d))
* **api:** api update ([0bb6d99](https://github.com/privy-io/node-sdk/commit/0bb6d995abd18814b689561b5ebdb9d9a00440d0))

## 0.5.0 (2025-11-13)

Full Changelog: [v0.4.1...v0.5.0](https://github.com/privy-io/node-sdk/compare/v0.4.1...v0.5.0)

### Features

* **api:** api update ([8b7d00f](https://github.com/privy-io/node-sdk/commit/8b7d00f2ea382b1bbed85d8eecacbea6251271fd))
* **api:** api update ([be7c495](https://github.com/privy-io/node-sdk/commit/be7c495fbd36476c297a8d3fd0cde091e065df1a))


### Bug Fixes

* passkey accounts not showing up from identity token parser ([#66](https://github.com/privy-io/node-sdk/issues/66)) ([16ffb82](https://github.com/privy-io/node-sdk/commit/16ffb82af662f2e0a0085d1e89307ea60adf9c08))
* WalletRpcResponse types are no longer nested ([#65](https://github.com/privy-io/node-sdk/issues/65)) ([132d462](https://github.com/privy-io/node-sdk/commit/132d46237541d15def2d5a6aad4080a028626e29))

## 0.4.1 (2025-11-10)

Full Changelog: [v0.4.0...v0.4.1](https://github.com/privy-io/node-sdk/compare/v0.4.0...v0.4.1)

### Features

* **api:** api update ([6ecd42c](https://github.com/privy-io/node-sdk/commit/6ecd42cc31f99e8f7013325c59dc1fc2abdc4fa3))
* **api:** api update ([88f69c6](https://github.com/privy-io/node-sdk/commit/88f69c6f13e08b3c3888b4ce6aead85b4e25ccec))
* **api:** api update ([b2f947a](https://github.com/privy-io/node-sdk/commit/b2f947a3af8fdbb90742490abe3a87470a494f10))
* **api:** api update ([ec643d3](https://github.com/privy-io/node-sdk/commit/ec643d358407d68b68c1eadf6773b8b1f8c3b325))
* **api:** api update ([26c2111](https://github.com/privy-io/node-sdk/commit/26c2111f428e1a7dc1704cc6cca29f477d9636fd))
* **api:** api update ([e75a349](https://github.com/privy-io/node-sdk/commit/e75a34952634e3230cc158085c341139c48214ec))


### Chores

* update changelog link in readme ([bc5654f](https://github.com/privy-io/node-sdk/commit/bc5654ff886b3b214a46314dd610a8c55db4e0f9))

## 0.4.0 (2025-10-31)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/privy-io/node-sdk/compare/v0.3.0...v0.4.0)

### Features

* **api:** api update ([28eb8cc](https://github.com/privy-io/node-sdk/commit/28eb8cc2f92bf0ef5ff76d8d6f95c6bcf1d75c6c))
* **api:** api update ([794eb37](https://github.com/privy-io/node-sdk/commit/794eb37aa0fdb1d46db990b24a9a7e6af083b006))
* **api:** api update ([019435d](https://github.com/privy-io/node-sdk/commit/019435dfb6768969a1d0cb6c62a251f6fa101913))
* **api:** api update ([14e8ece](https://github.com/privy-io/node-sdk/commit/14e8ece32ffb2b3be34ba7ebc75facdd8cf47b23))
* **api:** api update ([f544b69](https://github.com/privy-io/node-sdk/commit/f544b696dd8d657242aa610886929a582605091e))
* **api:** manual updates ([e176edd](https://github.com/privy-io/node-sdk/commit/e176edd851e00b3735139d60501e1577b377d5bc))
* **api:** manual updates ([4ab751b](https://github.com/privy-io/node-sdk/commit/4ab751b070e3ecc7cffab440ea27f22525f1a3e4))
* introduce proper LinkedAccountEmbeddedWallet and LinkedAccountSmartWallet types ([#60](https://github.com/privy-io/node-sdk/issues/60)) ([00b8180](https://github.com/privy-io/node-sdk/commit/00b81807f8064ffffbdc4af6e0da7e68a3a433e9))


### Bug Fixes

* fixes the types for ID token parsing ([#59](https://github.com/privy-io/node-sdk/issues/59)) ([247140c](https://github.com/privy-io/node-sdk/commit/247140c5e11d08ebb7c18f00cdaa8b91d052f60d))
* template literals for CustomOAuthProviderID and PrivyOAuthProviderID ([#61](https://github.com/privy-io/node-sdk/issues/61)) ([be1134b](https://github.com/privy-io/node-sdk/commit/be1134bb61bfe1caeb7f4283a5f3d5b223df4bf6))


### Chores

* update SDK settings ([26851c2](https://github.com/privy-io/node-sdk/commit/26851c24cd5ab32a5aad7590cf19cf8615aacf72))

## 0.3.0 (2025-10-16)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/privy-io/node-sdk/compare/v0.2.0...v0.3.0)

### Features

* **api:** api update ([f002c78](https://github.com/privy-io/node-sdk/commit/f002c78e8a1249dc1c6a69495e02a0efbfcdc905))
* **api:** api update ([34caf43](https://github.com/privy-io/node-sdk/commit/34caf439505182b862b774e4b771dcaaa14d776f))
* **api:** api update ([5d63231](https://github.com/privy-io/node-sdk/commit/5d632315153f3f648bd3f453f5348ca35f25401e))
* **api:** api update ([284162a](https://github.com/privy-io/node-sdk/commit/284162a91efb679a5dcf030bc2e6a68a5fdb3693))
* **api:** api update ([a7b5ec5](https://github.com/privy-io/node-sdk/commit/a7b5ec5f0f10ce1c44a40f70524268c6aea33886))
* **api:** api update ([4055914](https://github.com/privy-io/node-sdk/commit/40559144da70a5afc0b9b997823cf05165e51bca))
* **api:** api update ([b6f4d6e](https://github.com/privy-io/node-sdk/commit/b6f4d6eebd43c468be00579f7f8f870320daf314))
* webhooks.verify util ([#56](https://github.com/privy-io/node-sdk/issues/56)) ([0f23e53](https://github.com/privy-io/node-sdk/commit/0f23e5366faca133b3655e965628791cad8b5305))


### Performance Improvements

* faster formatting ([b866fe0](https://github.com/privy-io/node-sdk/commit/b866fe05ec73a5485dcb332f8b2e815cc422b788))


### Chores

* **internal:** codegen related update ([35154ff](https://github.com/privy-io/node-sdk/commit/35154ffa8c784ae104047cfeab8221f6cb8c4155))
* **internal:** fix incremental formatting in some cases ([b611502](https://github.com/privy-io/node-sdk/commit/b611502b9fad07ce41aa3eaf15a141b0bcbc353f))
* **internal:** ignore .eslintcache ([6909614](https://github.com/privy-io/node-sdk/commit/6909614915d431bff125c77e111ca835e986459d))
* **internal:** remove .eslintcache ([be2bf39](https://github.com/privy-io/node-sdk/commit/be2bf399ee42f898e975297895ccb40a55fa0137))
* **internal:** remove deprecated `compilerOptions.baseUrl` from tsconfig.json ([5757b21](https://github.com/privy-io/node-sdk/commit/5757b21bfba758c87f3e1f9ee36e563600900fdf))
* **internal:** use npm pack for build uploads ([828cc5f](https://github.com/privy-io/node-sdk/commit/828cc5fbad880e4f6a313f4040f9dc81176152eb))
* **jsdoc:** fix [@link](https://github.com/link) annotations to refer only to parts of the package‘s public interface ([bb24639](https://github.com/privy-io/node-sdk/commit/bb246393ecae0eb043149ddb4cb07f25d4833e52))

## 0.2.0 (2025-09-23)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/privy-io/node-sdk/compare/v0.1.0...v0.2.0)

### Features

* **api:** api update ([be1cfa2](https://github.com/privy-io/node-sdk/commit/be1cfa236a62f31efba227ff395b3865fb37aac6))


### Bug Fixes

* removes the prefix for private keys during import ([#54](https://github.com/privy-io/node-sdk/issues/54)) ([782093c](https://github.com/privy-io/node-sdk/commit/782093c421650ac0f15ddc0bfe31c9790563b52d))


### Chores

* do not install brew dependencies in ./scripts/bootstrap by default ([fd5a84e](https://github.com/privy-io/node-sdk/commit/fd5a84ea8d0fcea2e7eccd5cba74444ead73c17f))

## 0.1.0 (2025-09-19)

Full Changelog: [v0.1.0-alpha.3...v0.1.0](https://github.com/privy-io/node-sdk/compare/v0.1.0-alpha.3...v0.1.0)

### Features

* adds an isEmbeddedWalletLinkedAccount type predicate for better filters ([#48](https://github.com/privy-io/node-sdk/issues/48)) ([c435034](https://github.com/privy-io/node-sdk/commit/c4350342bec1543aa55126b592d19e0025dab088))
* adds get({ idToken }) to the users() interface ([#50](https://github.com/privy-io/node-sdk/issues/50)) ([21cbd64](https://github.com/privy-io/node-sdk/commit/21cbd64013729a77bb08bcdc035ad80e350e0699))
* **api:** api update ([99814e1](https://github.com/privy-io/node-sdk/commit/99814e1bf7d78099cb1f68f3ea2c169505d4b53d))
* **api:** api update ([db6c469](https://github.com/privy-io/node-sdk/commit/db6c469b5e1a601b4066951e738684e3cbdd9c5e))
* **api:** api update ([5160799](https://github.com/privy-io/node-sdk/commit/51607995a8ec849fe3115ee4b5cf44dbb25519e9))
* **api:** api update ([b95b36f](https://github.com/privy-io/node-sdk/commit/b95b36f4e6cc954e3d68c94e79910d659199b9e8))
* **api:** hides GET /v1/users/:id in Node/TS ([b61a468](https://github.com/privy-io/node-sdk/commit/b61a468c58cb01deba21fed338e3d84e32713b3c))


### Bug Fixes

* **api:** rpc responses no longer have an error case ([#51](https://github.com/privy-io/node-sdk/issues/51)) ([b81ddfa](https://github.com/privy-io/node-sdk/commit/b81ddfa27adb130490f9f0c4c24b4ebe99a19ba4))
* **api:** updates the 'staging' environment url ([6e5d833](https://github.com/privy-io/node-sdk/commit/6e5d833162de5da6416803c79be0702262562d61))

## 0.1.0-alpha.3 (2025-09-10)

Full Changelog: [v0.1.0-alpha.2...v0.1.0-alpha.3](https://github.com/privy-io/node-sdk/compare/v0.1.0-alpha.2...v0.1.0-alpha.3)

### Features

* adds support for creating a viem account ([#47](https://github.com/privy-io/node-sdk/issues/47)) ([30d3d40](https://github.com/privy-io/node-sdk/commit/30d3d402995f6e28fd06d3e02a51d62ba63bdaf8))
* adds support for verifying an auth token ([#46](https://github.com/privy-io/node-sdk/issues/46)) ([2c67e09](https://github.com/privy-io/node-sdk/commit/2c67e09d908492c21f6ac35b7bce47add1893052))


### Bug Fixes

* adds the missing @scure/base dependency ([#43](https://github.com/privy-io/node-sdk/issues/43)) ([190695e](https://github.com/privy-io/node-sdk/commit/190695e7790c9d4555c9cf8803d40f3fbcfd4aea))
* coerce nullable values to undefined ([cae9323](https://github.com/privy-io/node-sdk/commit/cae9323ea0c0bfd47bb4d8a91e9e2d37d1630e35))


### Chores

* ci build action ([d598ef0](https://github.com/privy-io/node-sdk/commit/d598ef0cd8da1f214667121163aba086e0355ce5))

## 0.1.0-alpha.2 (2025-09-05)

Full Changelog: [v0.1.0-alpha.1...v0.1.0-alpha.2](https://github.com/privy-io/node-sdk/compare/v0.1.0-alpha.1...v0.1.0-alpha.2)

### Features

* adds an internal LRU cache to JwtExchangeService ([#26](https://github.com/privy-io/node-sdk/issues/26)) ([8722dd4](https://github.com/privy-io/node-sdk/commit/8722dd44ca94fd031278077cda1cc328014c00e3))
* **api:** add missing endpoints for parity with server-auth ([378e8bd](https://github.com/privy-io/node-sdk/commit/378e8bd63581e829c860ded5167bbe0d3f394a37))
* **api:** adds wallet export endpoint ([56d12d6](https://github.com/privy-io/node-sdk/commit/56d12d646dd9fba6a815fa3b6b6b2b5b6d0eb743))
* **api:** api update ([84917fc](https://github.com/privy-io/node-sdk/commit/84917fcba8e8c0e949f3dd3bf3277503abc472aa))
* **api:** api update ([a8bb366](https://github.com/privy-io/node-sdk/commit/a8bb36639a699921f738014ff7975774eddcc192))
* **api:** api update ([25401b4](https://github.com/privy-io/node-sdk/commit/25401b414c559c2edc2037e345888c611f5d6a72))
* **api:** api update ([286d925](https://github.com/privy-io/node-sdk/commit/286d925604920573001084a906a66fa11ff4d464))
* **api:** api update ([ff5f1e0](https://github.com/privy-io/node-sdk/commit/ff5f1e010ec7f02a1267d428d852abbdd3f50393))
* **api:** api update ([5e9126b](https://github.com/privy-io/node-sdk/commit/5e9126b8c787d1e9bd207a183b74e4cec4406f70))
* **api:** api update ([a8da4d1](https://github.com/privy-io/node-sdk/commit/a8da4d16b8802f8a9214db86b259461f7b1d3146))
* **api:** rules under policy methods not subresources ([eace8bb](https://github.com/privy-io/node-sdk/commit/eace8bb3ea062539f630a9c51ac888ae97f97e2b))
* **api:** underscore methods that we overload ([939d9e1](https://github.com/privy-io/node-sdk/commit/939d9e1e47361c271cb1cb400a0e98fef956dafe))
* **api:** underscore methods that we overload ([9f24bd8](https://github.com/privy-io/node-sdk/commit/9f24bd873156ce214b5cf3043861376ebbd61f40))
* **api:** update endpoint allowlist ([ca3d190](https://github.com/privy-io/node-sdk/commit/ca3d1907bf926fef83085cbf8d1a7da0665fb224))
* **api:** update the TS package name ([56bea1a](https://github.com/privy-io/node-sdk/commit/56bea1abeecd81084fd5a84ec1ba6b6f46b2fe1e))
* AuthorizationContext signatures ([#41](https://github.com/privy-io/node-sdk/issues/41)) ([84814bc](https://github.com/privy-io/node-sdk/commit/84814bc2ae3ac35e1d87b6e6aafe926fc1d133d4))
* AuthorizationContext signers ([#42](https://github.com/privy-io/node-sdk/issues/42)) ([2ade897](https://github.com/privy-io/node-sdk/commit/2ade89735a487abd0bc0af1ff427a49e80d659bb))
* combine body and header as named params in service methods ([#20](https://github.com/privy-io/node-sdk/issues/20)) ([91da6e9](https://github.com/privy-io/node-sdk/commit/91da6e926f82208fbaa5db85e38e53a5791175c0))
* ethereum secp256k1 sign ([#11](https://github.com/privy-io/node-sdk/issues/11)) ([cd9a1d4](https://github.com/privy-io/node-sdk/commit/cd9a1d467018923525ac7e33118a574cad5a77c1))
* ethereum send transaction ([#16](https://github.com/privy-io/node-sdk/issues/16)) ([76cce1f](https://github.com/privy-io/node-sdk/commit/76cce1fdfbe2de69326c49a6789a6ca4df02f20c))
* ethereum sign typed data ([#15](https://github.com/privy-io/node-sdk/issues/15)) ([3520a0d](https://github.com/privy-io/node-sdk/commit/3520a0d102f08705289c3c3d3776c4435b59ee80))
* ethereum sign7702Authorization ([#12](https://github.com/privy-io/node-sdk/issues/12)) ([b571d88](https://github.com/privy-io/node-sdk/commit/b571d88f07aad16ae57da6bd2ae0eaa86f11851b))
* ethereum signMessage ([#6](https://github.com/privy-io/node-sdk/issues/6)) ([07c4868](https://github.com/privy-io/node-sdk/commit/07c4868622c3b4902d0aef2e8841c3a3a4fa8bfa))
* ethereum signTransaction ([#13](https://github.com/privy-io/node-sdk/issues/13)) ([89039d1](https://github.com/privy-io/node-sdk/commit/89039d1186d41cb1975ec851700116e9e79175b4))
* expands to include all ClientOptions ([#37](https://github.com/privy-io/node-sdk/issues/37)) ([bcb61d5](https://github.com/privy-io/node-sdk/commit/bcb61d507ba240e836fe3cc516f4dc0db8714744))
* expose the PrivyUtils class ([#24](https://github.com/privy-io/node-sdk/issues/24)) ([91d15ec](https://github.com/privy-io/node-sdk/commit/91d15ec2f2bbc9edddd409c9826026d8556e5797))
* exposes the Privy*Service wrappers ([#21](https://github.com/privy-io/node-sdk/issues/21)) ([8411756](https://github.com/privy-io/node-sdk/commit/841175671b4dff311f7769fc1101a099c55c3fc8))
* jwt based authorization signatures ([#25](https://github.com/privy-io/node-sdk/issues/25)) ([adfaa27](https://github.com/privy-io/node-sdk/commit/adfaa2753deed1856011d206d28944587134a734))
* key quorums delete utility ([#32](https://github.com/privy-io/node-sdk/issues/32)) ([7741a35](https://github.com/privy-io/node-sdk/commit/7741a35a52d9eb8560d59fcc156547d8a30098f6))
* key quorums update utility ([#28](https://github.com/privy-io/node-sdk/issues/28)) ([e1a0f89](https://github.com/privy-io/node-sdk/commit/e1a0f89a7dc1a63d41b19920bb0ec5e79c9d399e))
* limits the package exports to the index file only ([#40](https://github.com/privy-io/node-sdk/issues/40)) ([b01196f](https://github.com/privy-io/node-sdk/commit/b01196f405149a11ae55ed78632938157d9d7fb9))
* limts the exports from the index file ([#39](https://github.com/privy-io/node-sdk/issues/39)) ([b390068](https://github.com/privy-io/node-sdk/commit/b3900681c9672f67cd7fba2483e7d0a656493164))
* p256 authorization context ([#7](https://github.com/privy-io/node-sdk/issues/7)) ([3a664c4](https://github.com/privy-io/node-sdk/commit/3a664c43c9b9330946b943c7fb31d6d02fabc41b))
* policies delete utility ([#33](https://github.com/privy-io/node-sdk/issues/33)) ([b4fd185](https://github.com/privy-io/node-sdk/commit/b4fd185ef5af90057f185c8ce3247d3b225dfb96))
* policy rules crud methods ([#36](https://github.com/privy-io/node-sdk/issues/36)) ([701aec7](https://github.com/privy-io/node-sdk/commit/701aec786f7ca0ee10729377575c6ef189f9ccc0))
* policy update utility ([#27](https://github.com/privy-io/node-sdk/issues/27)) ([55bb4cf](https://github.com/privy-io/node-sdk/commit/55bb4cf86d7f475238d481c0fd64d6c162936dde))
* PrivyWalletsService update with AuthorizationContext ([#23](https://github.com/privy-io/node-sdk/issues/23)) ([c279d6a](https://github.com/privy-io/node-sdk/commit/c279d6afd63205febe8a7e11c1ef74faf055c007))
* raw sign ([#8](https://github.com/privy-io/node-sdk/issues/8)) ([ffdceb7](https://github.com/privy-io/node-sdk/commit/ffdceb7d1b548d1ff62fdb8a86414f78519a797a))
* sets the privy-client header ([#29](https://github.com/privy-io/node-sdk/issues/29)) ([4010041](https://github.com/privy-io/node-sdk/commit/401004118e3cf9129e70cbb0a74e496259f1eb40))
* should be able to create a new wallet ([#4](https://github.com/privy-io/node-sdk/issues/4)) ([460e638](https://github.com/privy-io/node-sdk/commit/460e6380374c29788e7f7f79c06ffacccc93b047))
* solana signAndSendTransaction ([#19](https://github.com/privy-io/node-sdk/issues/19)) ([96b0ebc](https://github.com/privy-io/node-sdk/commit/96b0ebc099f91981e054d453792a354482df03ec))
* solana signMessage ([#17](https://github.com/privy-io/node-sdk/issues/17)) ([dabec59](https://github.com/privy-io/node-sdk/commit/dabec591db908c8084df9bc7a9b0a998f5a33cf0))
* solana signTransaction ([#18](https://github.com/privy-io/node-sdk/issues/18)) ([825c9a7](https://github.com/privy-io/node-sdk/commit/825c9a78d0021ee1f538edda33f3b191589df3b7))
* supports privy-idempotency-key ([#10](https://github.com/privy-io/node-sdk/issues/10)) ([701a031](https://github.com/privy-io/node-sdk/commit/701a0318e5a5e5bc9151109088cb6896229768b7))
* wallets export ([#34](https://github.com/privy-io/node-sdk/issues/34)) ([64bd79e](https://github.com/privy-io/node-sdk/commit/64bd79e54549f4e0f55bf03017837e2f7abd8fe0))
* wallets import ([#35](https://github.com/privy-io/node-sdk/issues/35)) ([72b3f19](https://github.com/privy-io/node-sdk/commit/72b3f198cc621f0a6550d5b820b428332e148c51))


### Chores

* add package to package.json ([9158f2f](https://github.com/privy-io/node-sdk/commit/9158f2f808b8f566de30f191aa78d7af9e62a632))
* **client:** qualify global Blob ([0a947da](https://github.com/privy-io/node-sdk/commit/0a947da3b05c5534be2d11f6fa90afc392c74990))
* **internal:** update global Error reference ([385fa40](https://github.com/privy-io/node-sdk/commit/385fa40b545b7cc42c572442266a4733850a1c58))
* update CI script ([75b7927](https://github.com/privy-io/node-sdk/commit/75b79277c1df400ca66da620fe7b80ee1ae08ffb))
* update SDK settings ([f7c973c](https://github.com/privy-io/node-sdk/commit/f7c973c7ef6c8cb68760c344c25c5dc153c1c812))


### Documentation

* updates the README ([#38](https://github.com/privy-io/node-sdk/issues/38)) ([4833130](https://github.com/privy-io/node-sdk/commit/4833130e82164aab6ce35ad5969d1402c79edf86))

## 0.1.0-alpha.1 (2025-08-21)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/privy-io/node-sdk/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** adds wallets raw_sign endpoint ([b2f3182](https://github.com/privy-io/node-sdk/commit/b2f318282b5a9263069c0dea17e50b07ebb5ecdd))
* **api:** api update ([d7f74fc](https://github.com/privy-io/node-sdk/commit/d7f74fc55236bc45b7b6bad50ab6ff10f46a0099))
* **api:** api update ([38df284](https://github.com/privy-io/node-sdk/commit/38df28444530dea3cb47e8462d0fd432e8be40b5))
* **api:** api update ([bbb3d4a](https://github.com/privy-io/node-sdk/commit/bbb3d4ac2bab9f5586fb17e5715eb1988e825db3))
* **api:** api update ([7218c48](https://github.com/privy-io/node-sdk/commit/7218c4876e4679173698f08ae8b966f20c9b7f9d))
* **api:** api update ([c59c9bc](https://github.com/privy-io/node-sdk/commit/c59c9bc8264d96e177772c3247d1d85122765c98))
* **api:** api update ([214c492](https://github.com/privy-io/node-sdk/commit/214c49281a8713510f25f05202e9c9cfa205ff46))
* **api:** api update ([446ea4f](https://github.com/privy-io/node-sdk/commit/446ea4ff4debbfaa449b61d125dfaf26c746498e))
* **api:** api update ([ade76eb](https://github.com/privy-io/node-sdk/commit/ade76eb8640c790704a3cba1703062cfe7b4a611))
* **api:** api update ([e3b40ae](https://github.com/privy-io/node-sdk/commit/e3b40ae2a680b9e5419d682f9707a760b755404a))
* **api:** api update ([1bab64d](https://github.com/privy-io/node-sdk/commit/1bab64daad39f70ab79d7397900ce57d503a0543))
* **api:** api update ([b0984d7](https://github.com/privy-io/node-sdk/commit/b0984d7fc6157f20b57c1c2963a40331c64775be))
* **api:** api update ([6414777](https://github.com/privy-io/node-sdk/commit/6414777170937cd0e5401257d79033bcd574e69a))
* **api:** api update ([87c1a78](https://github.com/privy-io/node-sdk/commit/87c1a78eae1ec6113c5f9b869b98ddd3f2b57292))
* **api:** api update ([c4e5fed](https://github.com/privy-io/node-sdk/commit/c4e5fed24c76c8f46d44d370339b48483bcbbcd4))
* **api:** api update ([8c3cd0a](https://github.com/privy-io/node-sdk/commit/8c3cd0af66e1fe7d132204e4d56ab9b46e612277))
* **api:** api update ([4aa2fcb](https://github.com/privy-io/node-sdk/commit/4aa2fcb7ab832b772cacd6821ade1b4d91db8f5c))
* **api:** api update ([751d0ef](https://github.com/privy-io/node-sdk/commit/751d0ef9c336127b4ab5a8c2a5f760df7aefb29e))
* **api:** api update ([aed0deb](https://github.com/privy-io/node-sdk/commit/aed0deb8bc0b0f7f336a174348b381e6a5380a57))
* **api:** api update ([93d4b49](https://github.com/privy-io/node-sdk/commit/93d4b490e96586e1c010a4e2057941af265e8fdc))
* **api:** api update ([8b42f95](https://github.com/privy-io/node-sdk/commit/8b42f951d00422c3cedee82528e2697e1d10d973))
* **api:** api update ([55aaed8](https://github.com/privy-io/node-sdk/commit/55aaed84fd963f39bf6b7f043752f83f98dc1d49))
* **api:** api update ([edc8e79](https://github.com/privy-io/node-sdk/commit/edc8e79507324d6426ae1468e858a84bbf4b9de7))
* **api:** api update ([cc34d61](https://github.com/privy-io/node-sdk/commit/cc34d613693eecf94197ba1a86a6f9f719462713))
* **api:** api update ([ac09e4f](https://github.com/privy-io/node-sdk/commit/ac09e4f58b4b1ab5dd883bed5a028486d6888e3d))
* **api:** api update ([d98f16d](https://github.com/privy-io/node-sdk/commit/d98f16d5d8edfccc2c56f276bb40913d502509f5))
* **api:** api update ([1960e7a](https://github.com/privy-io/node-sdk/commit/1960e7abbb55a624d214731969d68278f7c21271))
* **api:** api update ([497c537](https://github.com/privy-io/node-sdk/commit/497c5371ec4006db2ae021aa9f588e3f5a0dc3b3))
* **api:** api update ([6df0d05](https://github.com/privy-io/node-sdk/commit/6df0d05033729ac0a2fd020605384884f4765694))
* **api:** disables browser in the typescript sdk ([51e0d2f](https://github.com/privy-io/node-sdk/commit/51e0d2f3088a0d3aef175a6c06df63322ca4b03f))
* **client:** add withOptions helper ([0934735](https://github.com/privy-io/node-sdk/commit/09347354b336aba28b6173f4bde32a564b981996))
* **mcp:** add code execution tool ([1c57902](https://github.com/privy-io/node-sdk/commit/1c57902571cefcedaf5e4aaf3c9f4cef4faf7d59))


### Bug Fixes

* **client:** explicitly copy fetch in withOptions ([9d6c8de](https://github.com/privy-io/node-sdk/commit/9d6c8deac297396ef5105ee22793ec52190bd434))
* **client:** get fetchOptions type more reliably ([90d2b03](https://github.com/privy-io/node-sdk/commit/90d2b033c4039925eca8cc78c43364fdc7a68432))


### Chores

* add docs to RequestOptions type ([75db0f8](https://github.com/privy-io/node-sdk/commit/75db0f80c657f5c5604e8ebe81c9e0d1db0d05f3))
* change publish docs url ([1cd62cd](https://github.com/privy-io/node-sdk/commit/1cd62cda42ac403010763f1fb653ffb2b9744d76))
* **ci:** only run for pushes and fork pull requests ([d751cc9](https://github.com/privy-io/node-sdk/commit/d751cc9df6938e15210d6cabbcf642c31bd08ecc))
* **client:** drop support for EOL node versions ([2d327c6](https://github.com/privy-io/node-sdk/commit/2d327c633a0e222db389bd83cbd90ce076036721))
* **client:** improve path param validation ([6fcb0a5](https://github.com/privy-io/node-sdk/commit/6fcb0a5e56ebd4293ade4b36db32dbaee018a2ec))
* configure new SDK language ([9e25329](https://github.com/privy-io/node-sdk/commit/9e25329b09f104dab7d966d471f40226ebc9ac31))
* configure new SDK language ([30f726e](https://github.com/privy-io/node-sdk/commit/30f726e6adf55de156cb83e540305201ad534c0a))
* **deps:** update dependency @types/node to v20.17.58 ([a61ed4e](https://github.com/privy-io/node-sdk/commit/a61ed4efeb2f8ed7209e91af3a669ad58e1f42e7))
* **internal:** codegen related update ([ba1f857](https://github.com/privy-io/node-sdk/commit/ba1f857ff1d1caa21e27ced1dd6de143f27dd1ad))
* **internal:** codegen related update ([1b08662](https://github.com/privy-io/node-sdk/commit/1b08662cc73fc28a0e7133749b7bec87d5a172f6))
* **internal:** formatting change ([e0cc14f](https://github.com/privy-io/node-sdk/commit/e0cc14f2dd8980db5b7c5b2b160140cb673364d7))
* **internal:** move publish config ([b4a0cfd](https://github.com/privy-io/node-sdk/commit/b4a0cfdb6d8f99b22278362f68446a250193d02d))
* **internal:** remove redundant imports config ([a8541fe](https://github.com/privy-io/node-sdk/commit/a8541fefa8b40e64306fe0338028d246db30606b))
* **internal:** update comment in script ([6c54591](https://github.com/privy-io/node-sdk/commit/6c545916aca7c19ee6645263ca1cf76c34fda203))
* make some internal functions async ([002f570](https://github.com/privy-io/node-sdk/commit/002f570187e0a36fedf94fd18984f24c10e7d788))
* **readme:** use better example snippet for undocumented params ([e19e561](https://github.com/privy-io/node-sdk/commit/e19e5615e4e89cab1ccf844e1282f519e6c7af54))
* **ts:** reorder package.json imports ([546d70d](https://github.com/privy-io/node-sdk/commit/546d70d88d7505a0f627a9b5d7a1f3afd8740b6d))
* update @stainless-api/prism-cli to v5.15.0 ([3c46b5d](https://github.com/privy-io/node-sdk/commit/3c46b5dccb7dde03024c41a90e07a584c3a2319e))
* update SDK settings ([1fca7e1](https://github.com/privy-io/node-sdk/commit/1fca7e15d6f970364a570dc9b0deb7de32f78229))


### Documentation

* add examples to tsdocs ([777c294](https://github.com/privy-io/node-sdk/commit/777c294e024855dba934653e1db1fd5ad2c0209e))


### Refactors

* **types:** replace Record with mapped types ([24be2ea](https://github.com/privy-io/node-sdk/commit/24be2ea0e199e6a6bf32d9e8afed6deefe83f1b0))

# Changelog

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

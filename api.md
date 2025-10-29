# Wallets

Types:

- <code><a href="./src/resources/wallets/wallets.ts">CurveSigningChainType</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">FirstClassChainType</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">Wallet</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletChainType</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletExportResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletInitImportResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletRawSignResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletRpcResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletAuthenticateWithJwtResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletCreateWalletsWithRecoveryResponse</a></code>

Methods:

- <code title="post /v1/wallets">client.wallets.<a href="./src/resources/wallets/wallets.ts">create</a>({ ...params }) -> Wallet</code>
- <code title="get /v1/wallets">client.wallets.<a href="./src/resources/wallets/wallets.ts">list</a>({ ...params }) -> WalletsCursor</code>
- <code title="post /v1/wallets/{wallet_id}/export">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_export</a>(walletID, { ...params }) -> WalletExportResponse</code>
- <code title="post /v1/wallets/import/init">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_initImport</a>({ ...params }) -> WalletInitImportResponse</code>
- <code title="post /v1/wallets/{wallet_id}/raw_sign">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_rawSign</a>(walletID, { ...params }) -> WalletRawSignResponse</code>
- <code title="post /v1/wallets/{wallet_id}/rpc">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_rpc</a>(walletID, { ...params }) -> WalletRpcResponse</code>
- <code title="post /v1/wallets/import/submit">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_submitImport</a>({ ...params }) -> Wallet</code>
- <code title="patch /v1/wallets/{wallet_id}">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_update</a>(walletID, { ...params }) -> Wallet</code>
- <code title="post /v1/wallets/authenticate">client.wallets.<a href="./src/resources/wallets/wallets.ts">authenticateWithJwt</a>({ ...params }) -> WalletAuthenticateWithJwtResponse</code>
- <code title="post /v1/wallets_with_recovery">client.wallets.<a href="./src/resources/wallets/wallets.ts">createWalletsWithRecovery</a>({ ...params }) -> WalletCreateWalletsWithRecoveryResponse</code>
- <code title="get /v1/wallets/{wallet_id}">client.wallets.<a href="./src/resources/wallets/wallets.ts">get</a>(walletID) -> Wallet</code>

## Transactions

Types:

- <code><a href="./src/resources/wallets/transactions.ts">TransactionGetResponse</a></code>

Methods:

- <code title="get /v1/wallets/{wallet_id}/transactions">client.wallets.transactions.<a href="./src/resources/wallets/transactions.ts">get</a>(walletID, { ...params }) -> TransactionGetResponse</code>

## Balance

Types:

- <code><a href="./src/resources/wallets/balance.ts">BalanceGetResponse</a></code>

Methods:

- <code title="get /v1/wallets/{wallet_id}/balance">client.wallets.balance.<a href="./src/resources/wallets/balance.ts">get</a>(walletID, { ...params }) -> BalanceGetResponse</code>

# Users

Types:

- <code><a href="./src/resources/users.ts">AuthenticatedUser</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccount</a></code>
- <code><a href="./src/resources/users.ts">User</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountEthereumEmbeddedWallet</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountSolanaEmbeddedWallet</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountBitcoinSegwitEmbeddedWallet</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountBitcoinTaprootEmbeddedWallet</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountCurveSigningEmbeddedWallet</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountEmbeddedWallet</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountEmbeddedWalletWithID</a></code>
- <code><a href="./src/resources/users.ts">SmartWalletType</a></code>
- <code><a href="./src/resources/users.ts">LinkedAccountSmartWallet</a></code>

Methods:

- <code title="post /v1/users">client.users.<a href="./src/resources/users.ts">create</a>({ ...params }) -> User</code>
- <code title="get /v1/users">client.users.<a href="./src/resources/users.ts">list</a>({ ...params }) -> UsersCursor</code>
- <code title="delete /v1/users/{user_id}">client.users.<a href="./src/resources/users.ts">delete</a>(userID) -> void</code>
- <code title="get /v1/users/{user_id}">client.users.<a href="./src/resources/users.ts">\_get</a>(userID) -> User</code>
- <code title="post /v1/users/custom_auth/id">client.users.<a href="./src/resources/users.ts">getByCustomAuthID</a>({ ...params }) -> User</code>
- <code title="post /v1/users/discord/username">client.users.<a href="./src/resources/users.ts">getByDiscordUsername</a>({ ...params }) -> User</code>
- <code title="post /v1/users/email/address">client.users.<a href="./src/resources/users.ts">getByEmailAddress</a>({ ...params }) -> User</code>
- <code title="post /v1/users/farcaster/fid">client.users.<a href="./src/resources/users.ts">getByFarcasterID</a>({ ...params }) -> User</code>
- <code title="post /v1/users/github/username">client.users.<a href="./src/resources/users.ts">getByGitHubUsername</a>({ ...params }) -> User</code>
- <code title="post /v1/users/phone/number">client.users.<a href="./src/resources/users.ts">getByPhoneNumber</a>({ ...params }) -> User</code>
- <code title="post /v1/users/smart_wallet/address">client.users.<a href="./src/resources/users.ts">getBySmartWalletAddress</a>({ ...params }) -> User</code>
- <code title="post /v1/users/telegram/telegram_user_id">client.users.<a href="./src/resources/users.ts">getByTelegramUserID</a>({ ...params }) -> User</code>
- <code title="post /v1/users/telegram/username">client.users.<a href="./src/resources/users.ts">getByTelegramUsername</a>({ ...params }) -> User</code>
- <code title="post /v1/users/twitter/subject">client.users.<a href="./src/resources/users.ts">getByTwitterSubject</a>({ ...params }) -> User</code>
- <code title="post /v1/users/twitter/username">client.users.<a href="./src/resources/users.ts">getByTwitterUsername</a>({ ...params }) -> User</code>
- <code title="post /v1/users/wallet/address">client.users.<a href="./src/resources/users.ts">getByWalletAddress</a>({ ...params }) -> User</code>
- <code title="post /v1/users/{user_id}/wallets">client.users.<a href="./src/resources/users.ts">pregenerateWallets</a>(userID, { ...params }) -> User</code>
- <code title="post /v1/users/search">client.users.<a href="./src/resources/users.ts">search</a>({ ...params }) -> User</code>
- <code title="post /v1/users/{user_id}/custom_metadata">client.users.<a href="./src/resources/users.ts">setCustomMetadata</a>(userID, { ...params }) -> User</code>
- <code title="post /v1/users/{user_id}/accounts/unlink">client.users.<a href="./src/resources/users.ts">unlinkLinkedAccount</a>(userID, { ...params }) -> User</code>

# Policies

Types:

- <code><a href="./src/resources/policies.ts">Policy</a></code>
- <code><a href="./src/resources/policies.ts">PolicyCreateRuleResponse</a></code>
- <code><a href="./src/resources/policies.ts">PolicyDeleteResponse</a></code>
- <code><a href="./src/resources/policies.ts">PolicyDeleteRuleResponse</a></code>
- <code><a href="./src/resources/policies.ts">PolicyUpdateRuleResponse</a></code>
- <code><a href="./src/resources/policies.ts">PolicyGetRuleResponse</a></code>

Methods:

- <code title="post /v1/policies">client.policies.<a href="./src/resources/policies.ts">create</a>({ ...params }) -> Policy</code>
- <code title="post /v1/policies/{policy_id}/rules">client.policies.<a href="./src/resources/policies.ts">\_createRule</a>(policyID, { ...params }) -> PolicyCreateRuleResponse</code>
- <code title="delete /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">\_delete</a>(policyID, { ...params }) -> PolicyDeleteResponse</code>
- <code title="delete /v1/policies/{policy_id}/rules/{rule_id}">client.policies.<a href="./src/resources/policies.ts">\_deleteRule</a>(ruleID, { ...params }) -> PolicyDeleteRuleResponse</code>
- <code title="patch /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">\_update</a>(policyID, { ...params }) -> Policy</code>
- <code title="patch /v1/policies/{policy_id}/rules/{rule_id}">client.policies.<a href="./src/resources/policies.ts">\_updateRule</a>(ruleID, { ...params }) -> PolicyUpdateRuleResponse</code>
- <code title="get /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">get</a>(policyID) -> Policy</code>
- <code title="get /v1/policies/{policy_id}/rules/{rule_id}">client.policies.<a href="./src/resources/policies.ts">getRule</a>(ruleID, { ...params }) -> PolicyGetRuleResponse</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions.ts">TransactionGetResponse</a></code>

Methods:

- <code title="get /v1/transactions/{transaction_id}">client.transactions.<a href="./src/resources/transactions.ts">get</a>(transactionID) -> TransactionGetResponse</code>

# KeyQuorums

Types:

- <code><a href="./src/resources/key-quorums.ts">KeyQuorum</a></code>
- <code><a href="./src/resources/key-quorums.ts">KeyQuorumDeleteResponse</a></code>

Methods:

- <code title="post /v1/key_quorums">client.keyQuorums.<a href="./src/resources/key-quorums.ts">create</a>({ ...params }) -> KeyQuorum</code>
- <code title="delete /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">\_delete</a>(keyQuorumID, { ...params }) -> KeyQuorumDeleteResponse</code>
- <code title="patch /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">\_update</a>(keyQuorumID, { ...params }) -> KeyQuorum</code>
- <code title="get /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">get</a>(keyQuorumID) -> KeyQuorum</code>

# ClientAuth

Types:

- <code><a href="./src/resources/client-auth.ts">ExternalOAuthProviderID</a></code>
- <code><a href="./src/resources/client-auth.ts">PrivyOAuthProviderID</a></code>
- <code><a href="./src/resources/client-auth.ts">CustomOAuthProviderID</a></code>
- <code><a href="./src/resources/client-auth.ts">OAuthProviderID</a></code>

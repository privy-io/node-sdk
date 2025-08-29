# Wallets

Types:

- <code><a href="./src/resources/wallets/wallets.ts">Wallet</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletRawSignResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletRpcResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletAuthenticateWithJwtResponse</a></code>
- <code><a href="./src/resources/wallets/wallets.ts">WalletCreateWalletsWithRecoveryResponse</a></code>

Methods:

- <code title="post /v1/wallets">client.wallets.<a href="./src/resources/wallets/wallets.ts">create</a>({ ...params }) -> Wallet</code>
- <code title="get /v1/wallets">client.wallets.<a href="./src/resources/wallets/wallets.ts">list</a>({ ...params }) -> WalletsCursor</code>
- <code title="post /v1/wallets/{wallet_id}/raw_sign">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_rawSign</a>(walletID, { ...params }) -> WalletRawSignResponse</code>
- <code title="post /v1/wallets/{wallet_id}/rpc">client.wallets.<a href="./src/resources/wallets/wallets.ts">\_rpc</a>(walletID, { ...params }) -> WalletRpcResponse</code>
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

- <code><a href="./src/resources/users.ts">User</a></code>

Methods:

- <code title="post /v1/users">client.users.<a href="./src/resources/users.ts">create</a>({ ...params }) -> User</code>
- <code title="get /v1/users">client.users.<a href="./src/resources/users.ts">list</a>({ ...params }) -> UsersCursor</code>
- <code title="delete /v1/users/{user_id}">client.users.<a href="./src/resources/users.ts">delete</a>(userID) -> void</code>
- <code title="post /v1/users/{user_id}/custom_metadata">client.users.<a href="./src/resources/users.ts">createCustomMetadata</a>(userID, { ...params }) -> User</code>
- <code title="get /v1/users/{user_id}">client.users.<a href="./src/resources/users.ts">get</a>(userID) -> User</code>
- <code title="post /v1/users/email/address">client.users.<a href="./src/resources/users.ts">getByEmailAddress</a>({ ...params }) -> User</code>
- <code title="post /v1/users/custom_auth/id">client.users.<a href="./src/resources/users.ts">getByJwtSubjectID</a>({ ...params }) -> User</code>
- <code title="post /v1/users/wallet/address">client.users.<a href="./src/resources/users.ts">getByWalletAddress</a>({ ...params }) -> User</code>
- <code title="post /v1/users/{user_id}/accounts/unlink">client.users.<a href="./src/resources/users.ts">unlinkLinkedAccount</a>(userID, { ...params }) -> User</code>
- <code title="post /v1/users/{user_id}/accounts">client.users.<a href="./src/resources/users.ts">updateLinkedAccount</a>(userID, { ...params }) -> User</code>

# Policies

Types:

- <code><a href="./src/resources/policies.ts">Policy</a></code>
- <code><a href="./src/resources/policies.ts">PolicyDeleteResponse</a></code>

Methods:

- <code title="post /v1/policies">client.policies.<a href="./src/resources/policies.ts">create</a>({ ...params }) -> Policy</code>
- <code title="delete /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">\_delete</a>(policyID, { ...params }) -> PolicyDeleteResponse</code>
- <code title="patch /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">\_update</a>(policyID, { ...params }) -> Policy</code>
- <code title="get /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">get</a>(policyID) -> Policy</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions.ts">TransactionGetResponse</a></code>

Methods:

- <code title="get /v1/transactions/{transaction_id}">client.transactions.<a href="./src/resources/transactions.ts">get</a>(transactionID) -> TransactionGetResponse</code>

# KeyQuorums

Types:

- <code><a href="./src/resources/key-quorums.ts">KeyQuorum</a></code>

Methods:

- <code title="post /v1/key_quorums">client.keyQuorums.<a href="./src/resources/key-quorums.ts">create</a>({ ...params }) -> KeyQuorum</code>
- <code title="delete /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">\_delete</a>(keyQuorumID, { ...params }) -> KeyQuorum</code>
- <code title="patch /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">\_update</a>(keyQuorumID, { ...params }) -> KeyQuorum</code>
- <code title="get /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">get</a>(keyQuorumID) -> KeyQuorum</code>

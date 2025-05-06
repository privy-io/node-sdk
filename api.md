# Wallets

Types:

- <code><a href="./src/resources/wallets.ts">Wallet</a></code>
- <code><a href="./src/resources/wallets.ts">WalletAuthenticateWithJwtResponse</a></code>
- <code><a href="./src/resources/wallets.ts">WalletCreateWalletsWithRecoveryResponse</a></code>
- <code><a href="./src/resources/wallets.ts">WalletRpcResponse</a></code>

Methods:

- <code title="post /v1/wallets">client.wallets.<a href="./src/resources/wallets.ts">create</a>({ ...params }) -> Wallet</code>
- <code title="get /v1/wallets/{wallet_id}">client.wallets.<a href="./src/resources/wallets.ts">retrieve</a>(walletID) -> Wallet</code>
- <code title="patch /v1/wallets/{wallet_id}">client.wallets.<a href="./src/resources/wallets.ts">update</a>(walletID, { ...params }) -> Wallet</code>
- <code title="get /v1/wallets">client.wallets.<a href="./src/resources/wallets.ts">list</a>({ ...params }) -> WalletsCursor</code>
- <code title="post /v1/user_signers/authenticate">client.wallets.<a href="./src/resources/wallets.ts">authenticateWithJwt</a>({ ...params }) -> WalletAuthenticateWithJwtResponse</code>
- <code title="post /v1/wallets_with_recovery">client.wallets.<a href="./src/resources/wallets.ts">createWalletsWithRecovery</a>({ ...params }) -> WalletCreateWalletsWithRecoveryResponse</code>
- <code title="post /v1/wallets/{wallet_id}/rpc">client.wallets.<a href="./src/resources/wallets.ts">rpc</a>(walletID, { ...params }) -> WalletRpcResponse</code>

# Users

Types:

- <code><a href="./src/resources/users.ts">User</a></code>
- <code><a href="./src/resources/users.ts">UserDeleteResponse</a></code>
- <code><a href="./src/resources/users.ts">UserCreateCustomMetadataResponse</a></code>

Methods:

- <code title="post /v1/users">client.users.<a href="./src/resources/users.ts">create</a>({ ...params }) -> User</code>
- <code title="get /v1/users/{user_id}">client.users.<a href="./src/resources/users.ts">retrieve</a>(userID) -> User</code>
- <code title="get /v1/users">client.users.<a href="./src/resources/users.ts">list</a>({ ...params }) -> UsersCursor</code>
- <code title="delete /v1/users/{user_id}">client.users.<a href="./src/resources/users.ts">delete</a>(userID) -> UserDeleteResponse</code>
- <code title="post /v1/users/{user_id}/custom_metadata">client.users.<a href="./src/resources/users.ts">createCustomMetadata</a>(userID) -> UserCreateCustomMetadataResponse</code>

# Policies

Types:

- <code><a href="./src/resources/policies.ts">Policy</a></code>

Methods:

- <code title="post /v1/policies">client.policies.<a href="./src/resources/policies.ts">create</a>({ ...params }) -> Policy</code>
- <code title="get /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">retrieve</a>(policyID) -> Policy</code>
- <code title="patch /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">update</a>(policyID, { ...params }) -> Policy</code>
- <code title="delete /v1/policies/{policy_id}">client.policies.<a href="./src/resources/policies.ts">delete</a>(policyID, { ...params }) -> Policy</code>

# Transactions

Types:

- <code><a href="./src/resources/transactions.ts">TransactionRetrieveResponse</a></code>

Methods:

- <code title="get /v1/transactions/{transaction_id}">client.transactions.<a href="./src/resources/transactions.ts">retrieve</a>(transactionID) -> TransactionRetrieveResponse</code>

# KeyQuorums

Types:

- <code><a href="./src/resources/key-quorums.ts">KeyQuorum</a></code>

Methods:

- <code title="post /v1/key_quorums">client.keyQuorums.<a href="./src/resources/key-quorums.ts">create</a>({ ...params }) -> KeyQuorum</code>
- <code title="get /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">retrieve</a>(keyQuorumID) -> KeyQuorum</code>
- <code title="patch /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">update</a>(keyQuorumID, { ...params }) -> KeyQuorum</code>
- <code title="delete /v1/key_quorums/{key_quorum_id}">client.keyQuorums.<a href="./src/resources/key-quorums.ts">delete</a>(keyQuorumID, { ...params }) -> KeyQuorum</code>

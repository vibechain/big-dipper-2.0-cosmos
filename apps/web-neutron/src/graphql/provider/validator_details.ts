export const LastHundredBlocksDocument = /* GraphQL */ `
  subscription LastHundredBlocks($address: String) {
    block(offset: 1, order_by: {height: desc}, limit: 100) {
        height
        ccv_validator {
        validator {
            validatorInfo: validator_info {
            operatorAddress: operator_address
            }
        }
        }
        transactions {
        hash
        }
        precommits: pre_commits(where: {validator_address: {_eq: $address}}) {
        validatorAddress: validator_address
        }
    }
}
`;

export const ValidatorLastSeenListenerDocument = /* GraphQL */ `
    subscription ValidatorLastSeenListener($address: String) {
        preCommit: pre_commit(limit: 1, where: {validator_address: {_eq: $address}}, order_by: {height: desc}) {
            height
            timestamp
        }
}
`;

export const ValidatorDetailsDocument = /* GraphQL */ `
    query ValidatorDetails($address: String) {
    bdjuno_provider{
        stakingPool: staking_pool(order_by: {height: desc}, limit: 1, offset: 0) {
        height
        bonded: bonded_tokens
        }
        validator(where: {validator_info: {operator_address: {_eq: $address}}}) {
        validatorDescriptions: validator_descriptions(order_by: {height: desc}, limit: 1) {
            details
            website
        }
        validatorStatuses: validator_statuses(order_by: {height: desc}, limit: 1) {
            status
            jailed
            height
        }
        validatorSigningInfos: validator_signing_infos(order_by: {height: desc}, limit: 1) {
            missedBlocksCounter: missed_blocks_counter
            tombstoned
        }
        validatorInfo: validator_info {
            operatorAddress: operator_address
            selfDelegateAddress: self_delegate_address
            maxRate: max_rate
        }
        validatorCommissions: validator_commissions(order_by: {height: desc}, limit: 1) {
            commission
        }
        validatorVotingPowers: validator_voting_powers(offset: 0, limit: 1, order_by: {height: desc}) {
            height
            votingPower: voting_power
        }
        }
        slashingParams: slashing_params(order_by: {height: desc}, limit: 1) {
        params
        }
    }
}

`;

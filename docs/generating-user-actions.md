# User Suggested Actions Construction

The `fetchUserSuggestedActions` function is designed to generate personalized actions for users based on their token balances and available reward opportunities. Here's a breakdown of how it constructs `linkedActions` and `suggestedActions`:

## Overview

- The available rewards and user's token balances are passed in as arguments.
- The function starts by initializing empty arrays for `suggestedActions` and `linkedActions`.
- It identifies the USDS -> SKY reward opportunity in the list of available rewards to be used to construct reward suggestions. Additional reward suggestions could be added here as they become available.
- It iterates over each relevant token (DAI, USDC, USDT, USDS), constructs actions based on whether or not a balance exists, and then pushes the action to its respective array.

## DAI Token Actions

If the user has a balance of DAI tokens:

- **Linked Actions**:
  - **Upgrade and Save**: Suggests upgrading DAI to USDS and then saving USDS to get rewards.
  - **Upgrade and Get Rewards**: Suggests upgrading DAI to USDS and then supplying USDS to earn SKY tokens.
  - These actions are added to `linkedActions` with specific details like button text, steps, URLs, and intents.

## USDC Token Actions

If the user has a balance of USDC tokens:

- **Linked Actions**:
  - **Trade and Save**: Suggests trading USDC for USDS and then saving USDS to get rewards.
  - **Trade and Get Rewards**: Suggests trading USDC for USDS and then supplying USDS to earn SKY tokens.
  - These actions are added to `linkedActions` similarly to the DAI actions.

## USDT Token Actions

If the user has a balance of USDT tokens:

- **Linked Actions**:
  - **Trade and Save**: Suggests trading USDT for USDS and then saving USDS to get rewards.
  - **Trade and Get Rewards**: Suggests trading USDT for USDS and then supplying USDS to earn SKY tokens.
  - These actions are added to `linkedActions` similarly to the USDC actions.

## USDS Token Actions

If the user has a balance of USDS tokens:

- **Suggested Actions**:
  - **Start Saving**: Suggests saving USDS to get a higher reward.
  - **Start getting rewards**: Suggests supplying USDS to earn SKY tokens.
  - These actions are added to `suggestedActions` with specific details like button text, titles, URLs, and intents.

## Restricted Build Check

If the application is in a restricted build mode (determined by an environment variable):

- The function filters out any actions related to rewards and saving from both `suggestedActions` and `linkedActions`.

## Return Actions

Finally, the function returns the constructed `suggestedActions` and `linkedActions`.

## Weight Property

The `weight` property in the `fetchUserSuggestedActions` function is used to assign a priority level to each action. This property is an arbitrary number that helps to sort and display the most relevant actions to the user. Here's how the `weight` property is assigned and can be used:

### Assignment of Weights

- Each action is given a specific weight value when it is created. For example:
  - **DAI Actions**:
    - "Upgrade and Save" is assigned a weight of 9.
    - "Upgrade and Get Rewards" is assigned a weight of 10.
  - **USDC Actions**:
    - "Trade and Save" is assigned a weight of 6.
    - "Trade and get rewards" is assigned a weight of 7.
  - **USDT Actions**:
    - "Trade and Save" is assigned a weight of 6.
    - "Trade and get rewards" is assigned a weight of 6.
  - **USDS Actions**:
    - "Start Saving" is assigned a weight of 6.
    - "Start getting rewards" is assigned a weight of 7.

### Purpose of Weights

- The weights are used to prioritize actions based on their importance or relevance. Higher weights indicate higher priority.
- For instance, "Upgrade and Get Rewards" for DAI has a higher weight (10) compared to "Upgrade and Save" (9), suggesting that getting rewards might be considered more beneficial or relevant for the user in this context.

### Usage of Weights

- When displaying actions to the user, the application can sort the actions by their weight in descending order. This ensures that the most important or relevant actions appear first.

### Example of Sorting

If the user has balances in DAI, USDC, and USDS, the actions might be sorted and displayed as follows:

1. "Upgrade and Get Rewards" (DAI) - Weight: 10
2. "Upgrade and Save" (DAI) - Weight: 9
3. "Start getting rewards" (USDS) - Weight: 7
4. "Trade and Get Rewards" (USDC) - Weight: 7
5. "Start Saving" (USDS) - Weight: 6
6. "Trade and Save" (USDC) - Weight: 6
7. "Trade and Save" (USDT) - Weight: 6
8. "Trade and Get Rewards" (USDT) - Weight: 6

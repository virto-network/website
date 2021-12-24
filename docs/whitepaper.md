--- 
title: Local Incentives Protocol 
layout: docs.liquid 
---

# Local Incentives Protocol 

### Decentralized Marketplace Infrastructure 

## 1. Introduction

Fiat money gives central banks huge control over the economy, an alerting
thought since it is extensively used in all human trading activities. Risks
have been observed in a number of countries as hyperinflation resulted from
huge increases in the supply of paper money, e.g. currency instability in
Venezuela that began in 2016. Since the launch of Bitcoin in 2009,
cryptocurrencies are not yet considered as mainstream currency in payment
systems in exchange for common goods or services, e.g. a pizza, a painting, a
house and so on. To fulfill this demand, Virto Network creates the Local
Incentives Protocol(LIP) which defines a secure payment system and means to
trade off-chain assets with cryptocurrency by connecting decentralized markets
and users, LIP facilitates a better local welfare redistribution through local
tax collection from economic activities.

Why? We live in a modern 21st century yet inequality still persists, whether in
income, wealth, opportunities or other dimensions. Some of the most effective
mechanisms governments have for reducing economic inequalities are taxes, cash
and in-kind transfers. However these fiscal policies that help shape more
equitable societies play a small role in low-income countries. 

 ![UNDP https://unstats.un.org/sdgs/report/2021/goal-10/](goal_undp.jpg)

Through historical perspective, we observe the limitations of the current
government taxing system to resolve economic inequality 

- Fairness: Tributed local resources are managed by people with different
  interests 
- Efficiency:Redundant intermediaries and bureaucratic bodies cost time and
  money
- Transparency: If people can’t track and feel the benefit of the spending
  process it lowers the trust in the system 

Therefore we believe that LIP enables connected decentralized marketplaces to
empower autonomous local communities by letting people and local communities be
in control to collect and spend local tax in a fair, efficient and transparent
way. Built around the protocol, Virto Network provides Marketplace builders
developer friendly API’s to help them build secure & highly scalable
decentralized dApps so they can focus on solving the real problems.

## 2. Local Incentives Protocol

Local Incentives Protocol enables people to create stronger communities with
aligned interests, to transact securely for goods and services in all kinds of
decentralized marketplaces and to receive incentives through local tax
collection to solve community problems in a fair, efficient and transparent
way. All are enforced by blockchain technology. 

### 2.1 Key actors

- Buyers/Customers: Anyone effortlessly joining the network in a trustless way
  that wants to buy goods or services from any other user.
- Sellers/Merchants: More experienced users trading their real world assets and
  services in exchange for cryptocurrency.
- Community: People sharing a physical space who are incentivized to create
  communities and unlock existing and future resources which are collected from
  every trade with a **local tax**. Communities as DAOs decide to spend
  resources based on their needs to create powerful autonomous micro-economies
- Marketplace: People with a common interest in an economic activity create
  marketplaces that act like *token curated registries* where merchants post
  their products and services. They issue their own token used to pay for the
  **market fee** on every trade.
- Union: Communities and Marketplaces can together form unions, as a higher
  level DAOs to make decision to tackle global level topics.

### 2.2 Process

The world is divided into Geo land cells. Each cell represents around 5
km<sup>2</sup>. When an individual creates an account, they register themselves
to in the cell of their choosing.

Individuals have two means of trading, through P2P or marketplace.  

- In p2p trading mode, individuals could freely trade as buyer and seller 
- When trading in marketplace, individuals could either connect through markets
  as selected qualified sellers to sell or as buyers to buy

Therefore, individuals can freely trade with each other or in a regulated
marketplace through a secure payment system embedded in the protocol, which
enables cryptocurrencies as payment method for service and off-chain assets.
For the trade in the marketplace, the marketplace receives market fees in their
native token format as the cost of their service, which encourages new
marketplaces to join the system by creating applications to serve the demands
of the market.

For every trade within the system, a minimal **system fee** is charged to
secure the network and prevent abusive usage. Besides, a certain percent of the
price is collected as local tax, which is directly locked in the Geo land cells
as potential assets for future community. To form a community, individuals need
to union together to pass threshold for both the total staking capitals and the
total amounts of individuals. The system allows native token Kusama staking and
earning not only Kusama token staking reward but also land tokens. Land tokens
could be freely traded and collected for further governance. Due to the
accumulated local tax, people are incentivized to create communities with their
peers, bonding assets to unlock existing and future resources that are
collected in the cells from trading activity. Besides, the system fee collected
also belongs to local communities. These communities will become DAOs and
decide to spend resources based on their needs to create powerful autonomous
micro-economies. Communities could decide about their own governance system to
better facilitate their economy in a dynamic way.

Communities or marketplaces could form a union with either communities or
marketplaces to join forces to solve global problems, e.g. climate change. They
could establish a decision model by voting and allocate certain resources on
the focus.

### 2.3 Applications

Marketplaces often create their own decentralized applications that connect to
LIP for users directly to interact with their listings. All sorts of economic
activities can take place in the marketplaces. The following are reference
applications developed by the core team as a showcase. More applications are
expected to be developed by other builder teams.

- Swap.cash: Decentralized on & off ramps, which enables an easy exchange
  between fiat money and cryptocurrencies 
- Flea.market: P2P trade of local goods 
- Go.delivery: Deliveries without intermediaries

## 3. Infrastructure

Local communities and Marketplaces are the main key entities in charge of
providing infrastructure to the network, although anyone can run the necessary
software to to participate, it becomes a **requirement** for them as they have
the economic incentives to do so.

LIP distinct feature is to combine three different kinds of decentralized
technology, a **Substrate based parachain** to be deployed in the [Kusama
network](https://kusama.network), **Matrix**, the network for secure
decentralization communications and **Valor**, Virto's lightweight runtime.

### 3.1 Parachain

A minimalistic blockchain runtime is used only for consensus critical
functionality. 

- **Payments**: The core functionality of the system, enables secure payments
  of off-chain assets with a highly configurable escrow-like system that
  protects users funds until the different parties have come to an agreement. 
- **Communities & Marketplaces**: DAO management tools that allow participants
  take part in on-chain governance, treasury management, etc.
- **Network assets**: The parachain makes strong usage of inter-chain
  communication to allow merchants transact with all kinds of assets that might
  exist elsewhere. 

### 3.2 Matrix

LIP uses the communications protocol in different ways,

- In the payment system it provides users with encrypted communication channels
  to exchange and store sensitive personal information.
- For key management and improved user experience, users can use their matrix
  account and familiar login facilities to interact with the blockchain.
- Marketplaces use specialized Matrix rooms and custom signed messages for
  merchant's listings.
- As general purpose **message storage** for non-consensus-critical data and as
  layer-two-like scaling platform, Matrix syncs data across a decentralized
  network of *homeservers* using rooms where only the involved parties need to
  store data.

### 3.3 Valor

A lightweight runtime that allows composing plugins to create *decentralizable
APIs*, that is, HTTP based APIs that Web 2 developers are familiar with and
have extensive support across all kinds of platforms. Due to the portability of
the runtime and keeping applications' state in decentralized storages (i.e.
blockchain, Matrix homeservers, IPFS), said APIs can be run unchanged in the
user devices, including web browsers, making it an excellent Web 3 development
environment.

## 4. Governance 

In its early days, LIP is governed mainly by the founding team which aims to
function as a benevolent dictatorship to set up the initial system and maximize
overall welfare and efficiency. 

When more and more marketplaces and communities are formed, each of them will
form their own governance structure and achieve autonomy with a democratic and
self-sufficient political economic system. Each marketplace has its own token
while communities use the LIP land tokens for their governance. The overall LIP
system is governed by marketplaces, communities and founding the team forming
together a joint governance body. The founding team’s governance power however
is expected to get smaller until the point where only marketplaces and
communities decide the future fate of entire system.

 ![governance](governance.png)

## 5. Economics 

Different tokens are used across the system.

1. **Native Token**: The parachain doesn't issue its own token, instead it uses
   Kusama's KSM as native token, which follows Kusama Network governance and
   distribution. We allow KSM staking via communities for participants to get
   rewards. 
2. **Land Token**: Land token is the NFT within LIP representing the land. On
   each community level, the total Geo land cells that represents a single
   community is around 5 km<sup>2</sup>, derived from level 7 of H3([Hexagonal
   hierarchical geospatial indexing system](https://h3geo.org/))
   [Resolution](https://h3geo.org/docs/core-library/restable/). The higher
   level it goes, the land size is divided by 7 until level 13 which represents
   around 43.9m<sup>2</sup>. These minimal land units represent 1 unit of the
   land token. Therefore each community holds around 117.6K land tokens within
   the 5 km<sup>2</sup> geo cell.
3. **Marketplace Token**: Each marketplace that connects to LIP can mint its
   own token for its functioning. They also establish their own governance
   system and token economics. For every trade in the marketplace, the
   marketplace token is charged as fee which is split in a *market fee* for the
   marketplace itself and a *local tax* that gets locked within the land cell
   for local communities to use.

### 5.1 Land Token 

#### 5.1.1 Key Functions
- Network Utility Token: Land token is a tradable NFT token, and also utilized
  in reward for staking and other network activities.  
- Community Governance Token: As a governance token, land tokens provide their
  holders voting rights in community level and chain level governance.

#### 5.1.2 Minting and Distribution 

The total 117.6K( =7<sup>6</sup>) land
tokens of each community is minted starting from time 0. The speed of token
minting is rather slow in the beginning and getting faster and then slows down
shown below.  In each period, the total staking capital decides the chance for
the individual to get the land token, usually higher staking capitals, higher
chance until reaches a certain threshold, the winning chance no longer
increases. The mechanism tried to increase fairness by preventing early birds
and whales’ absolute advantage and monopoly governance. 

 ![econ_1](token_econ_1.png)
 
 ![econ_2](token_econ_2.png)

### 5.2 Marketplace Token 

#### 5.2.1 Key Functions

- Network Utility Token: Marketplace token is a native fee token for each
  marketplace and is also utilized in network activities, e.g. crowdloan
  rewards.
- Community Governance Token: As a governance token, marketplace tokens provide
  their holders voting rights within the marketplace and chain level
  governance.

#### 5.2.2 Minting and Distribution

Marketplaces are free to design their own token economics with two conditions
of the token allocations:

- Virto Network: >= 5% of total tokens supply 
- Parachain Crowdloan: >=10% total tokens supply . Below is the example 

For the team's reference applications, e.g. Swap.cash, the total supply of
marketplace tokens will be minted at the launch of the marketplace project and
stored to be distributed for:

- Parachain Crowdloan: 30% to raise KSM needed for a crowdloan to bid in the
  Kusama parachain auction for an initial 48-week year parachain slot. Upon
  launch of the Virto parachain, these tokens will be distributed immediately
  to the crowdloan contributors
- Community and Parachain Slot: 30% to secure future Kusama parachain slot
  leases and other community initiatives
- Project Development and Sustainability: 25% to support projects, ecosystem
  development, maintenance and other network needs.
- Founding team: 5% to reward founders and core development team
- Virto Network: 5% to secure and sustain Virto Network 
- Token Sale: 5% to pre-sell to early backers and contributors

![marketplace token distribution](marketplace_token_distribution.png)

### 5.3 Parachain Auction

We plan to launch our mainnet on a Parachain slot within the Kusama network. To
increase the chance of winning, marketplaces distribute a required predefined
crowdloan share of tokens to reward supporters who locked their KSM for the
duration of the lease. We might distribute land tokens as rewards as well to
KSM holders who participate in the first auction successfully to compensate for
their opportunity costs of having their KSM locked for 12 months.j

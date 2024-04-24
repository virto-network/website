---
title: "1KSM = 1DAO: How to create your Community at Kreivo"
description: |
  Creating a DAO is usually a not so straightforward process, until now.
  In this article, you'll learn how to create a community in Kreivo.
published_date: 2024-04-23 23:29:53 -0500
permalink: /blog/1ksm-1dao-create-community-kreivo
data:
  route: blog
  author: Pablo Dorado
is_draft: false
---

## Introduction

Creating a DAO is usually a not so straightforward process. It usually involves deciding how do you want it to work, the goal, the methods for deciding how to onboard the members of it, and how to govern it.

Additionally, the deployment of a DAO doesn't get much easier: setup a multisig, find a network where to deploy the Smart Contract for your DAO, issue a token among your members, then start receiving funds on the account dedicated for the DAO. Aside from the technical challenge this means, being able to decide managing your community out of the ordinary way (via tokenized governance) implies modifying code you probably have to thoroughly check and audit.

Between the cost of deciding, and the technical expense of deploying, the process of thinking in establishing a DAO hasn't been an easy task.

Until now.

## Introducing Communities at Kreivo

At Virto Network, we believe that lowering the technical expense empowers people express their creativity.

With this in mind, we just finished a tough process to ensure you can create a DAO as simple as possible without sacrificing the robustness of the security provided by a blockchain in Kusama, and the flexibility to decide how you want to manage your organization.

In this guide, you'll learn how to setup your DAO the way you want, how to onboard members on your community, vote on referenda, and more!

## What is a Community?

![kreivo-community](https://hackmd.io/_uploads/r1YX0CB-0.png)

In Kreivo, we define a Community as an abstraction of a DAO, represented by an account, governed by a plurality using a referenda track, with a decision method. Alternatively, the DAO can be directly administered by an origin.

The first things you'll need to know before you create your Community (leaving the name and website domain aside 😉) are:

* The initial community administrator.
* The decision method.
* How many members your community will have.

### The Admin Origin

First things first: a Community in Kreivo is represented by an Account. The account can receive funds (either KSM or assets from Asset Hub).

Let's get a bit technical here (promise not to be too technical in this explanation): in order to administer the community, or use the _community account_, you'll need to dispatch a call from the `communities` pallet in Kreivo.

To dispatch those calls correctly, you have to call them either as a Community Origin (which is the result of successfully passing a poll in the community governance with the requested instructions), or via an Admin Origin.

This Admin Origin can be any caller in Kreivo (like a Community Origin, or a Signed Origin —i.e. you signing an extrinsic—).

Usually, the first Admin Origin on a Community is a Signed where the signing account belongs to the founder of the community. This is because to vote in a community, you need to be a member of it, and communities are created without members. We'll talk about [adding members](#initial-members) later.

Once your community has enough members, you can set the admin origin to be the Community itself, reaching to the point where your Community is a fully decentalized DAO.

A bit tradeoff of this is that, to manage a community or to take decisions with your community's funds, you'll have to submit a poll, and vote to take decisions.

Take this into consideration, so you'll decide what's better for your community in the long run.

### Initial members

Members are the main pillar of a Community. They have ownership of the Community, and therefore are the ones enabled to vote in a community poll. This might seem a bit odd, but this was designed to be able to tell apart one the different affiliations on a community an Account might have.

For example: Alice can be a member of the **DAO** and the **AOD** Communities. But each community provides them with a different membership. This means Alice can vote for decisions in the **DAO** community using their first membership, and vote in the **AOD** community using the second membership.

Memberships are represented via NFTs, which means it's easier to swap accounts over time. Also, it's possible to keep them as collectibles.

Also, in the future, we plan that accounts which own memberships have certain perks, like executing feeless transactions in Kreivo, or be configured for recurring payments (like salaries).

One of the considerations you'll need to have is the initial amount of memberships, so you can acquire as much memberships you need intiially for your community.

### The Decision Method

We talked about how you need to submit a poll to administer and take actions on behalf of your community's account. Let's talk about which mechanisms you can use to decide.

Different communities decide by different methods. Traditionally, DAOs tend to decide by using the token issued by the community. You can do that with Communities in Kreivo.

But there are other ways to let your community decide a poll:

* **Membership-based voting**: One membership, one vote. All votes are equal in weight. This is ideal for horizontally governed communities.
* **Ranked-based membership voting**: Each membership is assigned a rank. The rank will give you a weighed vote that's proportional to your membership's rank. This is ideal to give more representation to the more prominent and commited members in your community.
* **Community Asset-based voting**: We talked about this briefly above. The weight of a vote is decided by an amount of tokens the member locks to vote. The more assets you have, the more powerful your voice can be. Used traditionally in DAOs everywhere, and ideal for organizations that have a stocks-based participation.
* **Native Asset-based voting**: Some communities are bound to voting using the native token of the network (this is, `KSM`). Ideal for communities with goals and governance bounded to the network (ecosystem builders, ambassadors, etc.).

Once you decide which method fits better for your community, you'll be ready to get started with creating a community.

## Getting Started

### 1. Top-up your account in Kreivo

Kreivo uses the same native token and account format as Kusama. This means, your Account Id in Kreivo will be the same in kusama, so you won't need to create another key to manage your presence in Kreivo.

Since Kreivo is not a _Kusama System Chain_, you'll need to transfer `KSM` as an asset, not teleport it.

To do so, you'll need to call `XcmPallet::limited_reserve_transfer_assets` with the following arguments:

* `dest`: The location of the destination context. Needs to be the representation of `./Parachain(2281)` in XCM.
* `beneficiary`: The location of the receiver of the assets in the destination. Your account in Kreivo, represented as `./AccountId32(YourAccountIdInHex)` in XCM. To convert your Account Id to its Hex format, you can use this [format transform][tool:format_transform] tool.
* `assets`: both the Asset Id (in XCM location), and amount to send. The location is relative to the origin (in this case `./Here` in XCM location), and the amount must represent the asset amount with decimals as an integer (so, `1000000000000` means `1` KSM).

Here you have [an example](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Frpc.ibp.network%2Fkusama#/extrinsics/decode/0x630803000100a5230300010100d8dba69752ffb04fa563b126a31b037c8bebeb73e3c66cacd7c8efab46bd3423030400000000070010a5d4e80000000000) with the parameters to send 1KSM to an Account. Use it to guide yourself into sending funds to your account in Kreivo.

![Screenshot 2024-04-23 at 10.22.54 PM](https://hackmd.io/_uploads/B1yQsg8-R.png)

### 2. Create the Community

> 💵 Note: When creating a community, you'll be charged `0.5` KSM as a deposit for covering the expenses of creating the community. This is to prevent spamming.
>
> For now, a community is not destroyable, so the deposit is not refundable, and funds are sent directly to the Kreivo Treasury. If you need a chargeback, and to destroy the community, you'll have to submit a referenda to the Kreivo Governance to ask for this.

> :warning: Note: It's really important you remember the Community Id you entered when registering the community. This will be the main identification of your community in Kreivo, and (as you will see below), will be used anywhere.

Enter the details we already discussed about earlier in the form to call `CommunitiesManager::register`. Once the process is finished, you'll have access to the community account, a track in the community referenda to submit proposals to execute on behalf of your community, and a collection for storing the memberships issued to the members of your community.

![Screenshot 2024-04-23 at 10.25.58 PM](https://hackmd.io/_uploads/SJSAseU-C.png)

> Here you have [an example](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkreivo.io%2F#/extrinsics/decode/0x4b000903484d79204c75636b7920436f6d6d756e697479010001d8dba69752ffb04fa563b126a31b037c8bebeb73e3c66cacd7c8efab46bd3423010300) with some parameters you can use to create a Kreivo community administered by the signature of the founder (that is, you), for which its members vote using a _rank-based membership voting_ method.

### 3. Acquire memberships and add members

> 💵 Note: acquiring memberships means you have to pay for them. This is to prevent spamming.
>
> We know it's a big commitment for our first communitise. So, for a limited time, communities will be able to acquire memberships that don't expire and will enable their members to make free transactions.

In order to acquire the memberships for your community members to use them, there are two ways of doing it:

1. Acquiring the memberships from `CommunitiesMemberships`, then transferring them to your Community Account.
1. Topping up some funds to your Community Account (hint: you can use the `Index` option in `account` to address to your community's account with your Community Id), then calling `Communities::dispatch_as_account` to make your Community Account directly.

#### 3.1. Acquire the memberships yourself and transfer them to your Community Account

Make a call to `CommunityMemberships::buy_item`. Specify which Membership you want to acquire. You'll get them from the collection 0 (the Membership Management collection) and the price of it will be transferred to the Treasury.

![Screenshot 2024-04-23 at 11.01.21 PM](https://hackmd.io/_uploads/B1AzNb8-R.png)

> Here's an [example](https://polkadot.js.org/apps/?rpc=wss://kreivo.io/#/extrinsics/decode/0x4a2000001500000000e87648170000000000000000000000) of this call.

Once you've acquired the membership, you can transfer it to your community's account, to be able to add a member using that membership. Repeat this process as many times you as you need for your members.

![Screenshot 2024-04-23 at 11.09.15 PM](https://hackmd.io/_uploads/Hy3lUW8-C.png)

#### 3.2. Acquire the memberships using your Community Account

First, transfer some funds to your Community Account, so the account can pay for the assets. There are two ways of finding out your Community's Account. First one is crafting the community account. This is more technical, but basically you'll replace the bytes in the hex-encoded address noted below between the `<<<<>>>>` signs with the hexadecimal representation of your community account.

```
0x6d6f646c6b762f636d747973<<<<0309>>>>000000000000000000000000000000000000
```

Then, remove those signs. Finally, use the [format transform][tool:format_transform] tool to get the SS58 representation of your AccountId. Get the prefix 2 (Kusama) account.

![Screenshot 2024-04-23 at 10.57.39 PM](https://hackmd.io/_uploads/S1GrQZLb0.png)

> Here's an [example](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkreivo.io%2F#/extrinsics/decode/0x0a03006d6f646c6b762f636d7479730309000000000000000000000000000000000000070088526a74) of this call using your community AccountId.

The second one (the easiest) is using `Index` on the `dest` parameter, and entering the Community Id of your community as the index. This will be internally converted as the Community Account for your community.

![Screenshot 2024-04-23 at 10.45.52 PM](https://hackmd.io/_uploads/SJ0_lWU-A.png)

> Here's an [example](https://polkadot.js.org/apps/?rpc=wss://kreivo.io/#/extrinsics/decode/0x0a0301250c070088526a74) of this call using the Index representation.

Then, you can call `Communities::dispatch_as_account` to call `CommunityMemberships::buy_item`, with the parameters we've seen above.

![Screenshot 2024-04-23 at 11.17.48 PM](https://hackmd.io/_uploads/ryYx_-UWR.png)

> Here's an [example](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkreivo.io%2F#/extrinsics/decode/0x470b4a2000001500000000e87648170000000000000000000000) of this call.

That's it. Let's add some members!

#### 3.4. Add some members

As your community has some memberships available for its members it's time to call `Communities::add_member`. Just indicate which is the Account you want to add as a member, and that's it!

![Screenshot 2024-04-23 at 11.19.40 PM](https://hackmd.io/_uploads/rJKv_bUbA.png)

> Here's an [example](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkreivo.io%2F#/extrinsics/decode/0x47030038f07692f25fe5e61efc04bd0435bced9966990887cd7e3c548f2515e6dce76b) of this call.

### 4. Going Beyond! :rocket:

Your community account can receive funds in KSM and assets from Assets Hub, as well as using our `Payments` module. In further articles, we'll explain how you can use these features, and setup a Soverign Account that represents your Community in the Kusama Relay Chain, all of that, using XCM.

[tool:format_transform]: https://kusama.subscan.io/tools/format_transform

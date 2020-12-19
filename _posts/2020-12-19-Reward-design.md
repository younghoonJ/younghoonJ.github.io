---
layout: post
author: younghoon
title: Reward design
tags: [Reinforcement Learning]
category: Reinforcement Learning
description: Explains reward design in Reinforcement Learning.
hasmath: true
---


# Agent에게 Reward로 Goal을 설명하기 

<!--more-->

## Reward hypothesis (R.Sutton)
Reward hypothesis는 reward를 이용해서 agent에게 training의 목적을 설명한다. 이 방식은 agent가 받는 보상의 누적 합의 기대값을 최대화 하는 방식이다.
누적 보상은
$$G_t := R_t + R_{t+1} + R_{t+2} + \cdots + R_{T}$$
로 나타낼 수 있는데, $R_t$는 현 시간 $t$에서의 즉각적인 보상, $R_{T}$는 episode의 마지막에 받는 보상이다.

이 설계에는 몇가지 문제점이 있다.
1. **시간의 문제**: return이 $0$ 또는 $1$인 경우 에피소드가 무한히 계속되면 agent의 행동이 optimal인지 여부에 상관없이 항상 누석 보상이 무한대이다.
1. **Positive feedback loop**: 오랜 기간 행동 후 $100$ / 순간의 행동에 대해서 $1$로 return이 주어지는 경우 agent는 $1$을 얻는 행동만 계속 반복해서 유한한 에피소드 내에서 보상을 최대화 할 수 있다.

시간의 문제에 대해서는 **Reward discounting**으로 대응할 수 있다. 합이 infinite으로 발산하는 것은 discounting factor $0 <\gamma <1$을 geometric하게 곱해서 수렴하도록 만들 수 있다. 즉, 누적 보상은 다음과 같다:
$$G_t= R_t + \gamma R_{t+1} +\gamma^2 R_{t+2} + \cdots = \sum_{k=0}^{\infty}\gamma^k R_{t+k}.$$
만약 reward가 모든 시간 $t$에 대해서 bounded라면, 즉, $|R_t|\leq M$ 이라면
$$|G_t|\leq M\frac{1}{1-\gamma}$$
이다.


## Reward design
그렇다면 reward는 어떻게 설계해야 할까? 
- **Do not reward for action**: agent의 action 자체에 대해서 reward 주게 되면 agent는 goal을 달성하기 보다는 단순히 reward를 얻는 action만 반복하도록 발전한다. 한 유명 축구 선수의 어떤 말이 떠오르지 않는가?

    - *We enjoyed the bulk of the possession against Bayern, they couldn't control the game. To look only at the result doesn't really tell the whole story.*

- **Do not shift rewards**: rewards를 normalize하기 위해서 mean으로 shift하는 경우 optimal policy가 변할 수 있다.

- **Reward scaling**: nonzero constant로 나누는 것은 괜찮다.

- **Reward Shaping**: MDP의 모든 rewards $$R(s,a,s')$$에 optimal policy를 변화시키지 않고 **potential-based shaping function** $F(s,a,s')$을 더할 수 있다. 여기서,
$$F(s,a,s') = \gamma \Psi(s') - \Psi(s)$$
이다.  ([Policy invariance under reward transformations: Theory and application to reward shaping](https://people.eecs.berkeley.edu/~pabbeel/cs287-fa09/readings/NgHaradaRussell-shaping-ICML1999.pdf))
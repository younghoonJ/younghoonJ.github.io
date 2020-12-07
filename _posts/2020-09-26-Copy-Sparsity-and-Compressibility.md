---
layout: post
author: younghoon
title: Copy Sparsity and Compressibility
tags: [compressive sensing, sparsity, compressibility]
description: What is compressive sensing?
hasmath: true
---

Vector의 `sparsity`와 `compressibility`는 어떻게 이야기해야 할까요? 

<!--more-->
# Notations
지금부터는 다음의 표현을 사용합니다.

$$[N] = \{1,2,...,N\}$$

$$card(S) = \textrm{the cardinality of a set } S$$

# Sparsity and Compressibility

먼저 벡터 $$x\in\mathbb{C}^N$$의 support는 $$x$$의 nonzero entries의 index set으로 정의합니다:

$$supp(x) := \{j\in[N] | x_j \neq 0\}.$$

그리고 벡터 $$x\in\mathbb{C}^N$$가 아래의 조건을 만족하면 `s-sparse` 하다라고 정의합니다.

$$\| x \|_0 := card(supp(x)) \leq s.$$

즉, $$x$$의 support의 크기가 s 이하면 $$x$$는 s-sparse 합니다.

**Remark** $$\|\cdot\|_0$$은 편의상 $$l_0$$-norm이라고 불리는데 norm이나 quasinorm이 아닙니다. 그리고 다음과 같은 limiting property를 가집니다.

$$\|x\|_p^p = \sum_{j=1}^N |x_j|^p \rightarrow \sum_{j=1}^{N}\chi_{\{x_j\neq 0\}} = card(\{j\in[N]:x_j\neq 0\}) ~~\textrm{as}~~ p\rightarrow 0.$$

Sparsity는 너무 강한 조건이고 해석학적으로 다루기 힘들기 때문에 relaxation으로써 더 약한 조건인 Compressibility 개념이 필요합니다.

## $$s$$-term approximation
먼저 벡터 $$x$$의 compression을 최대 s개를 제외한 나머지 성분을 0으로 만드는 것으로 생각할 수 있습니다. 이렇게 얻어진 벡터를 s-term approximation of $$x$$ ($$s \ll N$$)라고 부릅니다. 이 경우 벡터가 얼마나 잘 근사되었는 지를 다음과 같이 정의되는 `error of best s-term approximation`으로 측정할 수 있습니다.

For $$p>0$$, the $$l_p$$-error of best s-term approximation to a vector $$x\in\mathbb{C}^N$$ is

$$\sigma_s(x)_p := \inf\{ \|x-z\|_p,~z\in\mathbb{C}^N~\textrm{is s-sparse} \}.$$

**Remark** 위의 infimum은 $$x$$ component 중에서 절대값이 가장 큰 s 개의 entries를 가지는 s-sparse 벡터 $$z$$에 의해서 달성됩니다. 예를들어 $$x=(2,1,1,1)$$일 때 2-sparse vector $$(2,1,0,0)$$와 $$(2,0,1,0)$$는 infimum을 만족합니다. 즉, infimum은 $$p$$값에 상관없이 달성 가능하지만 이를 만족하는 벡터가 유일하지는 않습니다.

방금 정의한 $$\sigma_s(x)_p$$를 이용하면 $$s$$가 증가할 때 best s-term approximation이 빨리 감소하면 $$x\in\mathbb{C}^N$$는 compressible 하다고 생각할 수 있습니다. 이 관점에서는 어떤 조건에서 best s-term approximation error가 빨리 감소하는지 생각해야 합니다. 증명은 생략하고 다음의 Theorem을 살펴봅시다.

**Theorem** For any $$q>p>0$$ and any $$x\in\mathbb{C}^N$$ the inequality

$$\sigma_s(x)_q \leq \frac{c_{p,q}}{s^{1/p - 1/q}}  \|x\|_p$$

holds with

$$c_{p,q}:=\left[ \left(\frac{p}{q}\right)^{p/q}\left(1-\frac{p}{q}\right)^{1-p/q} \right]^{1/p} \leq 1.$$

위 Theorem에 따르면 $$p>0$$이면 error를 컨트롤 할 수 있고, p가 0에 가까울수록 error가 빠르게 줄어듭니다. 예를 들어 $$(p, q) = (1,2)$$라면 아래와 같아집니다.

$$\sigma_s(x)_2  \leq \frac{1}{2\sqrt{s}}\|x\|_1.$$


## $$s$$-significant components
compressibility를 이야기 하는 다른 방법으로 significant components의 수를 기준으로 삼을 수 있습니다. 즉, 다음의 값이 작으면 compressible 하다고 이야기합니다.

$$card\{j\in[N]~ |~ |x_j|\geq t\}$$

이 조건을 만족하는 벡터를 다루기 위해서 weak $$l_p$$-spaces를 도입합니다.

**Definition** For $$p>0$$, the weak $$l_p$$ space $$w_p^N$$ is the space $$\mathbb{C}^N$$ equipped with the quasinorm

$$\tag{1} \| x \|_{p,\infty} := \inf \bigg\{ M\geq 0 ~|~ card\{j\in[N]~ |~ |x_j|\geq t\}\leq \frac{M^p}{t^p}~~\textrm{for all}~~t>0  \bigg\}.$$

여기서 (1)이 quasinorm이기 위해서 Non-negativity와 Absolute homogeneity는 쉽게 확인 가능하고 나머지 마지막 부등호 조건은 다음의 부등식으로 주어집니다.

$$p>0$$ 이면

$$\| x^1 + \cdots + x^k \|_{p,\infty} \leq k^{\max \{1,1/p\} }(\|x^1\|_{p,\infty}+\cdots+\|x^k\|_{p,\infty})$$

where $$x^1,...,x^k\in\mathbb{C}^N $$.

(1)의 weak $$l_p$$-quasinorm을 좀 더 사용하기 쉬운 형태로 다시 표현할 수 있습니다.

$$p>0$$ 이면

$$\|x\|_{p,\infty} = \max_{k\in[N]} k^{1/p}x_k^*$$

where $$x^*\in\mathbb{R}_+^N$$ denote the nonincreasing rearrangement of $$x\in\mathbb{C}^N$$.

새로운 표현을 이용하면 $$l_p$$-norm과 직접 비교 가능하고

$$\|x\|_{p,\infty}\leq\|x\|_p,$$

다음과 같이 error of best s-term approximation도 bound 할 수 있습니다.

**Proposition** For any $$q>p>0$$ and $$x\in\mathbb{C}^N$$, the inequality 

$$\sigma_s(x)_q \leq \frac{d_{p,q}}{s^{1/p-1/q}}\|x\|_{p,\infty}$$

holds with

$$d_{p,q}:=\left(\frac{p}{q-p}\right)^{1/q}.$$
---
layout: post
author: Younghoon, Jung
title: Sparsity and Compressibility
tags: [compressive sensing, sparsity, compressibility]
description: What is compressive sensing?
hasmath: true
---

Vector의 `sparsity`와 `Compressibility`는 어떻게 이야기해야 할까요? 

<!--more-->
# Notations
지금부터는 다음의 표현을 사용합니다.

$$[N] = \{1,2,...,N\}$$

$$card(S) = \textrm{the cardinality of a set } S$$

# Sparsity and Compressibility

먼저 벡터 $$x$$의 support는 $$x$$의 nonzero entries의 index set으로 정의합니다. 그리고 `s-sparse`의 개념을 정의합니다.

The support of a vector $$x\in\mathbb{C}^N$$ is defined by

$$supp(x) := \{j\in[N] | x_j \neq 0\}.$$

The vector $$x\in\mathbb{C}^N$$ is called s-sparse if

$$\| x \|_0 := card(supp(x)) \leq s.$$

**Remark** $$\|\cdot\|_0$$은 편의상 $$l_0$$-norm이라고 불리는데 norm이나 quasinorm이 아닙니다. 그래서 norm처럼 쉽게 다룰 수 없습니다. 그리고 다음과 같은 limiting property를 가집니다.

$$\|x\|_p^p = \sum_{j=1}^N |x_j|^p \rightarrow \sum_{j=1}^{N}\chi_{\{x_j\neq 0\}} = card(\{j\in[N]:x_j\neq 0\}) ~~\textrm{as}~~ p\rightarrow 0.$$

Sparsity는 너무 강한 조건이고 해석학적으로 다루기 힘들기 때문에 relaxation으로써 더 약한 조건인 Compressibility 개념이 필요합니다. 우선 vector가 근사적으로 s-sparse 하다는 것을 `error of best s-term approximation`으로 측정할 수 있습니다.

For $$p>0$$, the $$l_p$$-error of best s-term approximation to a vector $$x\in\mathbb{C}^N$$ is

$$\sigma_s(x)_p := \inf\{ \|x-z\|_p,~z\in\mathbb{C}^N~\textrm{is s-sparse} \}.$$

**Remark** $$l_p$$-norm을 사용했기 때문에 $$x$$ component 중에서 절대값이 가장 큰 s 개의 entries를 가지는 s-sparse 벡터 $$z$$에 의해서 infimum이 만족됩니다. 예를들어 $$x=(2,1,1,1)$$일 때 2-sparse vector $$(2,1,0,0)$$와 $$(2,0,1,0)$$는 infimum을 만족합니다. 즉, infimum은 $$p$$값에 상관없이 달성 가능하지만 이를 만족하는 벡터가 유일하지는 않습니다.

s의 값에 따른 오차를 정의했으므로 $$s$$가 증가할 때 best s-term approximation이 빨리 감소하면 $$x\in\mathbb{C}^N$$를 compressible 하다고 생각할 수 있습니다.

이제 어떤 조건에서 best s-term approximation error가 빨리 감소하는지 그래서 결국 벡터가 compressible할지 생각해야 합니다. 증명은 생략하고 다음의 proposition을 살펴봅시다.

**Proposition** For any $$q>p>0$$ and any $$x\in\mathbb{C}^N$$,

$$\sigma_s(x)_q\leq\frac{1}{s^{1/p - 1/q}}\|x\|_p.$$

위 proposition에 따르면 p가 1보다 작으면 error가 `빠르게` 감소합니다. (빠르다는 기준이 조금 애매모호한데 p가 0에 가까울수록 빠르게 decay합니다.)

좀 더 refine된 버전도 존재합니다.

**Theorem** For any $$q>p>0$$ and any $$x\in\mathbb{C}^N$$ the inequality

$$\sigma_s(x)_q \leq \frac{c_{p,q}}{s^{1/p - 1/q}}  \|x\|_p$$

holds with

$$c_{p,q}:=\left[ \left(\frac{p}{q}\right)^{p/q}\left(1-\frac{p}{q}\right)^{1-p/q} \right]^{1/p} \leq 1.$$


지금까지와는 다른 방식으로 significant components의 수가 적으면 compressible 하다고 이야기할 수도 있습니다. 즉, 다음의 값이 작으면 compressible 하다고 이야기합니다.

$$card\{j\in[N]~ |~ |x_j|\geq t\}$$ 
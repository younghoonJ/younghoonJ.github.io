---
layout: post
author: Younghoon, Jung
title: Compressive sensing - intro
tags: [compressive sensing, compressed sensing, sparse recovery, sparse solution, approximate solution, machine learning, LASSO]
description: What is compressive sensing?
hasmath: true
---

우리가 문제를 풀기 위해서는 문제를 푸는데 필요한 충분한 양의 정보를 가지고 있어야 합니다. 하지만 정보가 부족하다면 어떻게 해야 할까요?

<!--more-->

# What is Compressive Sensing?

수학, 과학 그리고 공학 문제에서 우리는 측정한 데이터로부터 관심 있는 signal을 복원하는 문제를 풉니다. 만약 우리가 다루는 시스템이 linear model이라면 유한차원으로의 근사 후에 다음의 방정식을 풀어야 합니다. 

$$\tag{1} Ax = y$$

여기서 $$y\in\mathbb{C}^m$$는 관찰한 데이터, $$x\in\mathbb{C}^N$$는 복원하려는 signal, 그리고 $$A\in\mathbb{C}^{m \times N}$$는 측정 과정을 나타내는 행렬입니다. 

선형대수학 개론 수업에서 배우는 전통적인 관점에서는 측정한 데이터의 양 $$m$$이 복원하고자 하는 signal의 길이 $$N$$이상이어야 $$x$$를 복원하는 것이 가능합니다. 사실 우리가 신호를 복원하려면(또는 문제를 풀기 위해서) 충분한 양의 정보를 가지고 있어야 한다는 것은 꽤 자명하고, 이 원리는 Shannon sampling theorem에서도 이야기합니다. 만약 $$m < N$$이라면 (1)은 정보가 부족하기 때문에 underdetermined이며 해가 하나라도 존재하면 무수히 많은 해가 존재합니다. 즉, 추가적인 정보 없이는 (1)을 정확히 푸는 것은 불가능합니다. 

그런데 조금 생각해 보면 우리가 대수적인 문제를 푸는 것이 아니라면 딱히 정확한 답이 필요하지 않고, 솔직히 이야기하면 대부분의 경우 정확한 해를 구하는 것이 근본적으로 불가능합니다. 해석학적인 답은 어차피 closed form을 얻기 힘들기 때문에 근사를 통해서 구하고, 공학이나 과학의 문제라면 noise의 존재로 인해 항상 오차를 염두하고 문제를 풉니다.

이번에는 유일한 해를 구할 필요가 있는지 생각해 봅시다. 만약 우리가 문제를 풀어 얻은 답 $$x$$보다는 관련된 양 $$F(x)$$에 관심이 있는 경우는 어떨까요? 이때, $$x$$대신 다른 $$x'$$을 사용한 $$F(x')$$의 효과가 $$F(x)$$와 비슷하다면 그냥 비슷한 효과를 주는 $$x'$$를 아무렇게나 선택해서 사용해도 괜찮습니다.

결국 측정한 정보의 양 $$m$$이 작아서 (1)이 무수히 많은 해를 가지더라도 우리가 좋은 기준에 따라 해를 선택하고 이를 통해서 우리의 목표를 달성한다면 충분합니다. 결국 남은 문제는 `어떤 기준이 좋은 기준인가?` 입니다.

이 방면으로 발전된 분야가 `compressive sensing`, `compressed sensing`, `sparse sensing`, `sparse recovery` 등 여러 이름으로 불리는 분야입니다. 이름에서 알 수 있듯이 해를 선택하는 기준이 되는 것이 바로 signal $$x$$의 `sparsity` 가정입니다. 

사실 sparsity 조건은 별것 아닙니다. 그냥 signal의 성분 중 많은 부분이 $$0$$ 이면 signal을 sparse 하다고 부릅니다. 예를 들어 음악 같은 sound signal을 Fourier transform을 통해 frequency 별로 분해해서 저장할 수 있습니다. 이때 인간이 들을 수 없는 초음파 영역에 해당하는 coefficient를 전부 0으로 만들어도 별문제가 없습니다. 또 그림 파일을 discrete cosine basis로 나타낸 다음 가장 큰 coefficients만 저장하는 경우도 sparsity를 이용하는 방법입니다.

자 이제 signal이 sparse 하다고 가정했을 때 이를 잘 이용하는 방법을 찾아야 합니다. 즉, signal이 sparse 하다는 추가적인 정보를 얻었기 때문에 전통적인 방법보다 훨씬 적은 횟수의 측정으로 signal을 복원하는 방법이 필요합니다. 그런데 조금만 생각해 봐도 이게 굉장히 어렵습니다. 우리는 signal이 sparse 하다는 것은 알지만 어떤 형태로 sparse 한지 알지 못합니다. 즉, signal의 어떤 성분이 0인지 모릅니다. 만약 signal을 복원하기 전에 0인 성분이 어떤 것인지 안다면 (1)의 행렬에서 해당하는 columns를 지워버리면 다 끝나는 문제입니다. 그런데 한편으로 음악이나 이미지 파일이 압축되는 것을 보면 분명히 sparsity 가정이 작동하는 real world system이 존재하고 sparsity 조건으로 잘 풀리는 문제들이 분명히 있습니다. 그래서 다음의 질문을 해야 합니다.

- 어떤 행렬 $$A\in \mathbb{C}^{m\times N}$$의 경우에 sparsity가정으로 문제를 풀어도 괜찮을까? 어떻게 행렬 $$A$$를 선택해야 할까?

좀 극단적으로 (1)에서 행렬 $$A$$가
$$A = \begin{bmatrix}
1 & 0 & 0\\
0 & 1 & 0
\end{bmatrix}$$
인 경우 $$x$$의 세번째 성분은 무슨 방법을 써도 복원할 수 없습니다. 그래서 sparsity 가정으로 문제를 풀기 위해서는 measurement matrix $$A$$가 적절하게 선택되도록 시스템을 설계해야 합니다.

이제 적절한 시스템 디자인을 통해 행렬 $$A$$를 얻었다면 그 다음은 어떻게 풀지의 문제가 남습니다. 알고리듬이 느리면 이론이 아무리 아름다워도 가치가 없습니다. 그래서 다음의 질문도 중요합니다.

- sparse recovery 를 수행하는 효율적인 알고리듬이 무엇일까?

sparsity의 의미에 따라 생각해 보면 당연히 $$l_0$$ optimization을 해야 합니다. 즉, 다음의 최적화 문제를 풀어야 합니다.

$$ min \| x \|_0~~\textrm{subject to}~~Ax=y$$

안타깝게도 위 문제는 일반적으로 `NP-hard` 라서 이런걸 풀려고 시도하면 은퇴할 때까지도 컴퓨터가 결과를 리턴하지 않을 수 있습니다. 그래서 convex-relaxation, greedy-type method를, threshoding method등 다른 방법을 이용해야 합니다. 어떤 알고리듬을 선택하더라도 사용하는 인간이 열심히 하면 잘 풀릴 거에요 아마.


# Sparse Approximation

Compressive sensing은 많은 signal이 sparse 하게 근사할 수 있다는 관찰로부터 시작되었다고 할 수 있습니다. 이런 관점에서 Compressive sensing은 `Sparse Approximation`의 하위 주제라고 생각할 수 있습니다. 하지만 Compressive sensing이 완전히 Sparse Approximation인 것은 아니며 이 둘은 보는 관점에는 차이가 있습니다.

우선 Sparse Approximation에서 무엇을 하는지 살펴보겠습니다. 어떤 signal $$y\in\mathbb{C}^m$$을 정해진 벡터 $$a_1,...a_N\in\mathbb{C}^m$$, $$span{a_1,...a_N} = \mathbb{C}^m$$의 linear combination으로 나타낼 수 있다고 가정합시다. 이 벡터의 dictionary는 linear dependent해도 됩니다. 이제 $$a_1,...a_N$$를 columns로 가지는 $$A\in\mathbb{C}^{m \times N}$$ 생각하고 $$y$$의 sparsest representation을 찾는 다음의 문제를 생각해 봅시다.

$$\min\| x \|_0~~\textrm{subject to}~~Ax = y.$$

이 문제는 이미 위에서 보았습니다. 즉, sparse approximation에서 수학적으로 compressive sensing과 같은 문제를 다루고 있습니다.

그런데 이 둘의 관점에는 분명한 차이가 있습니다. Sparse approximation에서는 행렬 $$A$$가 문제의 맥락에서 정해지는 반면 compressive sensing에서는 $$A$$를 design 할 여지가 있습니다. 특히 compressive sensing에서는 sparse approximation과 달리 randomness를 활용하기도 합니다. 

또 다른 차이는 어떤 오차에 관심이 있는가입니다. $$x^{sp}$$가 $$x$$의 sparse recovery일 때, Compressive sensing에서는 $$\|x - x^{sp}\|$$라는 signal의 오차 자체에 관심을 두는 반면 sparse approximation에서는 $$\|y - \sum x_j^{sp}a_j\|$$라는 representation error에 관심이 있습니다.


# Machine Learning

기계학습은 input data로부터 outcome을 예측하는 것이 목표입니다. 예를들어 다음의 모델이 있습니다.

$$y = f(x) + e$$

여기서 $$e$$는 error term입니다. 기계학습의 목표는 주어진 training data $$(t_j, y_j)$$를 이용해서 $$f$$를 학습하는 것입니다. 아무런 가정이 없다면 이 문제는 풀 수 없습니다. 따라서 $$f$$가 basis funstions $$\phi_1,...\phi_N$$에 대해서 sparse representaion을 가진다고 가정을 한 후 linear problem으로 변환합니다.

$$f(x) = \sum x_s \phi_s(x) $$

이제 측정한 데이터를 이용해서 아래와 같이 measurement matrix $$
A\in\mathbb{R}^{m\times N}$$를 만들 수 있습니다.

$$A_{j,k} = \phi_k(x_j)$$

최종적인 모델은 

$$y = Ax +e$$

이고 $$x$$는 sparse 하다는 가정이 합니다. 이때 우리는 x의 어떤 성분이 중요한지 알지 못합니다. 기계학습에서는 학습에 중요한 인자를 결정하는 과정을  `feature selection`이라고 부릅니다. 여기에서는 문제를 풀면서 이 과정이 자연스럽게 수행되며, 문제를 푸는데 주로 사용되는 테크닉은 LASSO(least absolute shrinkage and selection operator)라 불리는 $$l_1$$-regularized least square problem가 있습니다.

$$min \| Ax-y \|_2^2~~\textrm{subject to}~~\| x \|_1\leq t$$


# Low-Rank Matrix Recovery and Matrix Completion

우리가 Signal에 대한 sparsity 가정을 Matrix의 low rank 가정으로 바꾸면 불완전한 정보로부터 $$X\in\mathbb{C}^{n_1\times n_2}$$를 복원하는 Low rank matrix recovery problem을 생각할 수 있습니다. 이 문제는 matrix completion problem에서 많이 이용되고 micro targeting이나 recommender system에서 많이 사용됩니다. 

이제 Linear map $$\mathcal{A}: \mathbb{C}^{n_1 \times n_2}$$ with $$m < n_1n_2$$에 대해 아래의 measurement vector를 가지고 있다고 하고 $$y$$에서 $$X$$를 복원하는 문제를 고려해 봅시다.

$$y = \mathcal{A}(X) \in \mathbb{C}^{m}.$$

문제를 풀기 위해서 $$X$$의 rank $$r$$에 대해 $$r < min\{n_1, n_2\}$$라고 가정합니다. 그럼 다음의 최적화 문제를 생각할 수 있습니다.

$$min~rank(X)~~\textrm{subject to}~~\mathcal{A}(X) = y.$$

이제 singular value decomposition을 이용해서 $$X$$는 다음과 같이 쓸 수 있습니다.

$$\tag{2} X = \sum_{s=1}^n\sigma_s u_s v_s^*$$

여기에서 $$n=min \{n_1, n_2\}$$이고, $$\sigma_1 \geq \sigma_2 \geq \cdots \geq \sigma_n \geq 0$$은 singular value입니다. 이때 $$X$$의 rank가 $$r$$인 것과 $$\sigma(X)$$(vector of singular values of $$X$$)가 $$r$$-sparse인 것은 동치입니다. 따라서 (2)는 다음과 같이 재구성할 수 있습니다.

$$min \| X \|_* ~~\textrm{subject to}~~ \mathcal{A}(Z) = y.$$

여기서 $$\| X \|_*$$는 nuclear norm으로 singular values의 $$l_1$$-norm으로 정의됩니다.

$$\| X \|_*=\| \sigma(X) \|_1.$$

이 문제는 vector signal과 비슷한 알고리듬으로 해결 가능합니다.

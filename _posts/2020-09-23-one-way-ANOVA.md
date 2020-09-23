---
layout: post
author: Younghoon, Jung
title: One-way ANOVA
tags: [ANOVA, one-way ANOVA, hypothesis testing, statistics]
description: Integrating KaTex with Jekyll blog.
hasmath: true
---


두 개의 그룹 A, B가 존재할 때 이들이 mean이 같은지 테스트 하려면 t-test로 사용하면 된다. 그런데 만약 셋 이상의 그룹이 주어지면 어떻게 해야 할까? 이런 경우에는 `One-way ANOVA`를 이용할 수 있다.

<!--more-->

Analysis of variance (ANOVA)는 `the law of total variance`를 이용해서 그룹 간에 통계적 차이가 존재하는지 추정하는 기법이다. 그 중에서도 간단한 형태인 onw-way ANOVA는 여러 집단이 존재할 때 이들의 평균 $$\mu_0, \mu_1,...\mu_n$$이 같은지 테스트한다. 

예를 들어 Group A, B, C가 있을 때 귀무가설(null hypothesis, $$H_0$$)와 대립가설(alternative hypothesis,  $$H_1$$)는 다음과 같다.

$$H_0: \mu_1 =  \mu_2 = \mu_3$$

$$H_1: \mu_i \neq \mu_j \textrm{ for some } 1 \leq i \neq j \leq 3$$

`the law of total variance`에 의하면 variance의 총합은 다음과 같이 나눌 수 있다.

$$\textrm{The total variation of all the scores} = \textrm{the variance within each group}\\ + \textrm{the variation between the groups}$$

예를 들어 아래의 상황에서는 각 그룹의 variance는 크고 서로 다른 그룹 사이의 variance는 작은 편이다. 이런 경우에는 $$H_0$$를 reject 하지 않는다.

| A  | B  | C  |
|:--:|:--:|:--:|
| 10 | 11 | 11 |
| 13 | 13 | 12 |
| 17 | 18 | 17 |
| 23 | 24 | 24 |
| 36 | 37 | 36 |


이번에는 아래의 상황을 가정하자. 이 경우에는 각 그룹의 variance는 작고 서로 다른 그룹 사이의 variance는 작은 편이다. 이 경우에는 $$H_0$$를 reject 한다.

| A  | B  | C  |
|:--:|:--:|:--:|
| 30 | 17 | 11 |
| 30 | 18 | 12 |
| 30 | 19 | 12 |
| 31 | 20 | 12 |
| 31 | 20 | 12 |

앞선 두 상황은 특별히 통계적 검정을 하지 않아도 두 그룹의 mean이 서로 같은지 다른지 판단을 하는 데 크게 무리가 없다. 일반적으로는 다음의 test statistic을 이용해서 판단한다.

$$F = \frac{\textrm{between group variance}}{\textrm{within group variance}}$$

이때 test statistic이 클수록 귀무가설 $$H_0$$를 reject 할 가능성이 크다. 여기에서 test statistic은 F-distribution을 따른다. $$F(d, w)$$라고 표현했을 때 $$d$$는 degree of freedom for variance between groups이며 $$w$$는 degree of freedom for variance within groups이다. 각각의 값은

$$d = \textrm{the number of groups - 1}$$


$$w = \textrm{the number of observations} - \textrm{the number of groups}$$

로 구할 수 있다.

예를 들어 다음 데이터에서 test statistic을 계산해 보자.

| A  | B  | C  |
|:--:|:--:|:--:|
| 31 | 22 | 10 |
| 29 | 20 | 14 |
| 30 | 21 | 12 |
| 30 | 21 | 12 |
| 30 | 21 | 12 |

Mean within each group:

$$\overline{A} = 30, ~ \overline{B} = 21, ~ \overline{C} = 12$$

Overall mean:

$$\overline{X} = 21$$

Between group variance:

$$s_b = (5(30 - 21)^2 + 5(21 - 21)^2 + 5(12-21)^2) / (3-1) = 405$$

Within group variance:

$$s_w = \sum_{x}(x-\overline{X})^2 / (15 - 3) = 62 / 3$$

F-statistic:

$$F \approx 19.6$$

따라서 $$F(2,5)$$에서 level of significance $$\alpha$$ 기준으로 F-statistic이 충분히 크다면 $$H_0$$를 reject 한다.







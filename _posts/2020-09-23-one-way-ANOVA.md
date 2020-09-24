---
layout: post
author: Younghoon, Jung
title: One-way ANOVA
tags: [ANOVA, one-way ANOVA, hypothesis testing, statistics]
description: Integrating KaTex with Jekyll blog.
hasmath: true
---


우리는 t-test로 두 그룹 A, B의 mean이 유의미한 차이가 있는지 확인할 수 있습니다. 그런데 만약 그룹이 셋 이상이라면 어떻게 해야 할까요? 이런 경우에는 `One-way ANOVA`를 이용할 수 있습니다.

<!--more-->

Analysis of variance (ANOVA)는 `the law of total variance`를 이용해서 그룹 간에 통계적 차이가 존재하는지 추정하는 방법입니다. 그중에서도 간단한 형태인 onw-way ANOVA는 여러 집단이 존재할 때 이들의 평균 $$\mu_0, \mu_1,...\mu_n$$에 유의미한 차이가 있는지 판단하는 방법입니다.

예를 들어 Group A, B, C가 있을 때 null hypothesis와 alternative hypothesis는 다음과 같습니다.

$$H_0: \mu_1 =  \mu_2 = \mu_3$$

$$H_1: \mu_i \neq \mu_j \textrm{ for some } 1 \leq i \neq j \leq 3$$

이제 가설을 검증하기 위해서 variance를 이용합니다. `the law of total variance`에 따르면 variance의 총합은 다음과 같이 나눌 수 있습니다.

$$\textrm{The total variation of all the scores} = \textrm{the variance within each group}\\ + \textrm{the variation between the groups}$$

예를 들어 아래의 상황에서는 각 그룹의 variance는 크고 서로 다른 그룹 사이의 variance는 작은 편입니다. 대충 보면 측정된 데이터의 분포도 비슷하니 mean도 거의 같을 것이므로 $$H_0$$를 reject 하지 않습니다.

| A  | B  | C  |
|:--:|:--:|:--:|
| 10 | 11 | 11 |
| 13 | 13 | 12 |
| 17 | 18 | 17 |
| 23 | 24 | 24 |
| 36 | 37 | 36 |


다음 상황에서는 각 그룹의 variance는 작고 서로 다른 그룹 사이의 variance는 큽니다. 평균은 눈으로 보아도 차이가 보입니다. 이 경우에는 $$H_0$$를 reject 합니다.

| A  | B  | C  |
|:--:|:--:|:--:|
| 30 | 17 | 11 |
| 30 | 18 | 12 |
| 30 | 19 | 12 |
| 31 | 20 | 12 |
| 31 | 20 | 12 |

사실 앞선 두 상황은 특별히 통계적 검정을 하지 않아도 두 그룹의 mean이 유의미한 차이가 있는지 판단을 하기 쉬웠습니다. 하지만 항상 문제가 쉽지는 않기 때문에 일반적으로 다음의 test statistic을 이용해서 판단합니다.

$$F = \frac{\textrm{between group variance}}{\textrm{within group variance}}$$

이때 test statistic이 클수록 $$H_0$$를 reject 할 가능성이 큽니다. 여기에서 test statistic은 F-distribution을 따릅니다. $$F(d, w)$$라고 표현했을 때 $$d$$는 degree of freedom for variance between groups이며 $$w$$는 degree of freedom for variance within groups입니다. 각각의 값은 다음과 같이 구할 수 있습니다.

$$d = \textrm{the number of groups - 1}$$

$$w = \textrm{the number of observations} - \textrm{the number of groups}$$


예를 들어 다음 데이터에서 test statistic을 계산해 봅시다.

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

따라서 $$F(2,5)$$에서 level of significance $$\alpha$$ 기준으로 F-statistic이 충분히 크다면 $$H_0$$를 reject 합니다.







---
layout: post
author: Younghoon, Jung
---

공부와 같은 특별한 목적이 아니라면, 그리고 라이선스 문제가 없다면 코드를 재사용하는 편이 좋다. 그렇다면 어떻게 코드를 재사용하면 좋을까? 그냥 코드를 복사해 붙일까?

<!--more-->

우선 객체 지향 프로그래밍(object-oriented programming)에서 코드를 재사용하고 싶을 때 가장 먼저 떠오르는 방법은 상속(Inheritance)이다. 그런데 다음과 같은 상황에서는 상속이 비효율적이다.

- 클래스 A가 잘 작성된 100개의 메서드(method)를 가지고 있는데, 이 중 2개의 메서드를 클래스 B에서 사용하고 싶다.

만약 클래스 A를 상속해서 클래스 B를 정의하면 B는 전혀 사용하지 않을 98개의 메서드를 가지게 되며 A를 수정하면 B도 변한다. 이 상황은 클래스 A의 객체를 클래스 B의 멤버로 선언하고 그 멤버를 통해 A의 메서드를 호출하면 쉽게 해결할 수 있다. 이렇게 객체를 래핑(wrapping)해서 메서드를 재사용하는 방식을 컴퍼지션(Composition)이라고 부른다. 그리고 여기에서는 클래스 B가 래핑 된 A의 메서드에 역할을 `위임(delegate)`한다.

앞선 상황에서는 상속의 비효율성을 피하기 위해서 메서드의 역학을 위임하는 방식을 취했다.이번에는 이미 작성된 메서드의 기능을 향상하는 관점에서 생각해 보자. 역시 그냥 복사해 붙이고 수정할까? 그런데 코드 자체를 그냥 사용하기가 현실적으로 어려울 때도 있다.

- 상용코드가 공개되어 있지 않거나, 라이선스 문제가 있다.
- 중요하게 사용되는 코드 또는 Legacy코드라 수정하기 부담스럽다.

이런 경우에는 공개된 인터페이스(interface)를 이용해서 `위임 패턴(delegation pattern)`을 구현하면 코드를 재사용할 수 있다. 위임 패턴의 핵심 아이디어는 결국 이미 존재하는 객체를 래핑해서 새로운 객체를 만들고, 새로운 객체의 책임을 래핑 된 객체에 위임하는 것이다.

이제 함수형 언어(Functional Programming Language)인 Julia에서 위임 패턴을 어떻게 구현하는지 살펴보자.

우선 Pro라는 mutable data structure를 정의한다.

```julia
mutable struct Pro
    number::Float64
end
```

그리고 field accessor와 함수들을 정의하자. 단순히 .number를 통해 직접 field에 접근할 수 있지만, Pro가 어떻게 구현되어 있는지 내부 사정을
모른다고 가정하고 accessor를 구현하자.

```julia
# Accessors
number(pro::Pro) = pro.number

# Functions
function increase!(pro::Pro, by::Real)
    pro.number += by
    return pro.number
end

function reduce!(pro::Pro, by::Real)
    pro.number -= by
    return pro.number
end
```

이제 컴포지션(Composition)을 통해 앞서 정의한 Pro을 활용해서 ProExt을 정의하고, Delegation(Method Forwarding)을 통해 ProExt의 Pro 객체를 이용해 보자.

```julia
mutable struct ProExt
    pro::Pro
    rate::Float64
    ProExt(number, rate) = new(Pro(number), rate)
end
```

앞서 정의한 Pro과 같은 메서드를 제공해서 일관성을 유지하려면 어떻게 해야 할까? Julia는 Multiple dispatch를 지원하므로 그냥 함수를
재사용하면 된다.

```julia
# forwarding
number(proExt::ProExt) = number(proExt.number)

increase!(proExt::ProExt, by::Real) = increase!(proExt.pro, by)
reduce!(proExt::ProExt, by::Real) = reduce!(proExt.pro, by)
```

마지막으로 ProExt에는 rate이라는 새로운 field가 추가되었으니, 일관성을 유지하도록 accessor와 behavior를 추가하자.

```julia
rate(proExt::ProExt) = proExt.rate

function rate_number!(proExt::ProExt)
    m = number(proExt.pro) \* rate(proExt.rate)
    increase!(proExt.pro, m)
    reduce!(proExt.pro, m)
end
```

지금까지 한 과정은 Pro를 상속받아 ProExt를 정의한 것과 비슷해 보이지만 여기에서 Pro의 객체는 ProExt의 멤버로 선언되었다. 사실 상속은 메서드 자동 포워딩을 생성한다고 생각할 수 있다.

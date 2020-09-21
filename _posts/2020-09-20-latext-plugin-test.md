---
layout: post
author: Younghoon, Jung
title: Add LaTeX support to Jekyll blog
tags: [latex, katex, math, equation, github pages, Jekyll]
description: Integrating KaTex with Jekyll blog.
hasmath: true
hascode: true
---

Jekyll Blog에서 LaTex으로 표현된 수식을 렌더링 하기 위해서 Kahn Academy에서 시작된 프로젝트인 [KaTex (katex.org)](https://katex.org/)를 사용할 것이다.

<!--more-->

Katex를 사용하면 Jekyll 빌드 시에 js까지 빌드해서 LaTex markup을 html로 변경해 주고, client side에서 font와 css로 이쁘게 포장해서 보여준다.

우선 [링크](https://github.com/kramdown/math-katex)에서 필요한 종속성을 확인해 보면 다음과 같다.

- Ruby gem kramdown-math-katex
- Ruby gem katex,
- Ruby gem execjs,
- A Javascript engine supported by ExecJS, e.g. via one of
  - Ruby gem therubyracer,
  - Ruby gem therubyrhino,
  - Ruby gem duktape,
  - Node.js

우선 js가 필요한데 고민하지 말고 [Node.js (https://nodejs.org)](https://nodejs.org)를 설치하자.
그리고 `gen install`을 한다. `kramdown-math-katex`만 설치해도 나머지 gem도 같이 설치된다.

```powershell
PS D:\> gem install kramdown-math-katex
PS D:\> gem install katex
PS D:\> gem install execjs
```

설치가 완료되었다면 이제 Jekyll 프로젝트에 katex를 추가하고 필요한 코드를 작성하면 된다.
우선 Gemfile을 열고 플러그인을 추가한다.

```ruby
group :jekyll_plugins do
...
  gem 'kramdown-math-katex'
end
```

그리고 kramdown의 기본 파서가 MathJax라는 것 같으니 먼저 \_config.yml에서 katex로 설정을 변경하자.

```yml
markdown: kramdown
kramdown:
  math_engine: katex
```

이제 css와 font를 가지고 와야 하는데 [링크](https://katex.org/docs/autorender.html)에 있는 CDN을 사용하거나 [링크](https://github.com/KaTeX/KaTeX/releases)에서 다운받아 직접 프로젝트에 포함하면 된다. 나는 `/assets/katex` 라는 디렉터리를 만들고 그곳에 `/fonts`와 katex.min.css를 복사했다.

그리고 Latex 렌더렝이 필요한 페이지의 `<head>`부분에 css를 추가하면 된다.
```html
<head>
    ...
  <link rel="stylesheet" href="/assets/katex/katex.min.css">
</head>
```
좀 더 섬세하게 page의 `frontmatter`에 hasmath flag를 설정하고 `if-else` 방식으로 추가해도 괜찮다.

시험삼아 아래의 Euler formula를 작성해 보면
```latex
$$e^{i\theta} = \cos{\theta} + i\sin{\theta}$$
```
제대로 표현된다.


$$e^{i\theta} = \cos{\theta} + i\sin{\theta}$$


---
layout: post
author: younghoon
title: Add LaTeX support to Jekyll site
tags: [latex, katex, math, equation, github pages, Jekyll]
description: Integrating KaTex with Jekyll site.
category: Programming
latex: true
hascode: true
---

Jekyll Blog에서 LaTex으로 표현된 수식을 렌더링 하기 위해서 Kahn Academy에서 시작된 프로젝트인 [KaTex (katex.org)](https://katex.org/)를 사용한다.

<!--more-->

Katex를 사용하면 Jekyll 빌드 시에 js까지 빌드해서 LaTex markup을 html로 변경해 주고, client side에서 font와 css로 예쁘게 포장해서 보여준다.

우선 [여기](https://github.com/kramdown/math-katex)에서 필요한 종속성을 확인해 보면 다음과 같다.

- Ruby gem kramdown-math-katex
- Ruby gem katex,
- Ruby gem execjs,
- A Javascript engine supported by ExecJS, e.g. via one of
  - Ruby gem therubyracer,
  - Ruby gem therubyrhino,
  - Ruby gem duktape,
  - Node.js

우선 js가 필요한데 고민하지 말고 [Node.js (https://nodejs.org)](https://nodejs.org)를 설치하자. 그리고 **gem install**을 하자. 해보면 **kramdown-math-katex**만 설치해도 나머지 gem도 같이 설치된다.

```powershell
PS D:\> gem install kramdown-math-katex
PS D:\> gem install katex
PS D:\> gem install execjs
```

설치가 완료되었다면 이제 Jekyll 프로젝트에 katex를 추가하고 필요한 코드를 작성하면 된다. 먼저 Gemfile을 열고 플러그인을 추가하자.

```ruby
group :jekyll_plugins do
...
  gem 'kramdown-math-katex'
end
```

그리고 kramdown의 기본 파서가 MathJax이니 \_config.yml에서 katex로 설정을 변경한다.

```yml
markdown: kramdown
kramdown:
  math_engine: katex
```

이제 css와 font를 가지고 와야 하는데 [여기](https://katex.org/docs/autorender.html)에 있는 CDN을 사용하거나 [여기](https://github.com/KaTeX/KaTeX/releases)에서 다운받아 직접 프로젝트에 포함하면 된다. 나는 **/assets/katex** 라는 디렉터리를 만들고 그곳에 **/fonts**와 **katex.min.css**를 복사했다.

마지막으로 Latex 렌더링이 필요한 페이지의 **<head>**부분에 css와 js를 추가하자. 페이지 로딩 속도를 위해 js는 body 끝에 포함시켜도 된다.
```html
<head>
  <link rel="stylesheet" href="/assets/katex/katex.min.css">
  <script src="/assets/katex.min.js"></script>
  <script src="/contrib/auto-render.min.js"></script>
  <script type="text/javascript">
        renderMathInElement(document.body, {
            delimiters: [
                { left: "$$", right: "$$", display: true },
                { left: "\\[", right: "\\]", display: true },
                { left: "$", right: "$", display: false },
                { left: "\\(", right: "\\)", display: false }]
        });
    </script>
</head>
```

좀 더 섬세하게 page의 **frontmatter**에 hasmath flag를 설정하고 **if-else** 방식으로 추가해서 page 별로 css를 추가할지 말지 결정할 수 있다.

시험삼아 아래의 Euler formula를 작성해 보면
```latex
$$e^{i\theta} = \cos{\theta} + i\sin{\theta}$$
```
이렇게 출력된다.

$$e^{i\theta} = \cos{\theta} + i\sin{\theta}$$

그런데 mobile화면에서는 수식이 수평으로 화면을 벗어나기 때문에 따로 css로 처리를 해 주어야 한다. 이때 **overflow-x**를 사용하면 브라우저의 기본 세팅 때문에 수직 스크롤이 같이 생기는 경우가 있다. 이런 경우는 padding을 적당히 추가해서 수직 스크롤을 제거하자.


```css
.katex-display {
  overflow-x: auto !important;
  padding-top: 0.6rem !important;
  padding-bottom: 0.6rem !important;
}
```

아래의 수식이 수직 스크롤 없이 표현되어야 하고 모바일처럼 폭이 좁은 경우 수평 스크롤과 함께 나타나야 한다.


$$E = \frac{1}{2} + \textrm{this is a long latex expression. } + \textrm{this is a long latex expression. }$$

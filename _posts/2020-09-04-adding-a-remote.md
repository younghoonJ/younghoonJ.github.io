---
layout: post
author: Younghoon, Jung
title: Adding a remote
tags: [git, github, remote]
description: Explains git remote command.
hascode: true
---

git에 github 같은 원격 저장소를 추가하려면 `git remote` 명령어를 사용하면 된다. `git remote add` 옵션 이용해 새로운 remote를 추가할 수 있고 add 명령은 Remote name과 Remote URL이라는 두 인자를 가진다.

<!--more-->

예를 들어 Remote name이 origin이고 Remote URL이 https://github.com/younghoonJ/Liquid.git 라면 powershell에서 실행하면 아래와 같다.

```powershell
PS D:\Liquid\Liquid> git remote add origin https://github.com/younghoonJ/Liquid.git
PS D:\Liquid\Liquid> git remote -v
origin https://github.com/younghoonJ/Liquid.git(fetch)
origin https://github.com/younghoonJ/Liquid.git (push)
```

만약 remote name이 이미 존재한다면 다음과 같은 에러가 발생하고

```powershell
PS D:\Liquid\Liquid> git remote add origin https://github.com/younghoonJ/Liquid.git
fatal: remote origin already exists
```
이런 경우

- 새로운 이름을 사용하거나
- 존재하는 remote의 이름을 변경하거나
- 존재하는 remote의 이름을 지우면 된다.

추가적인 옵션은 `git remote -help`를 통해 확인 가능하다.

```powershell
PS D:\Liquid\Liquid> git remote -help
usage: git remote [-v | --verbose]
   or: git remote add [-t <branch>] [-m <master>] [-f] [--tags | --no-tags] [--mirror=<fetch|push>] <name> <url>
   or: git remote rename <old> <new>
   or: git remote remove <name>
   or: git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
   or: git remote [-v | --verbose] show [-n] <name>
   or: git remote prune [-n | --dry-run] <name>
   or: git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)...]
   or: git remote set-branches [--add] <name> <branch>...
   or: git remote get-url [--push] [--all] <name>
   or: git remote set-url [--push] <name> <newurl> [<oldurl>]
   or: git remote set-url --add <name> <newurl>
   or: git remote set-url --delete <name> <url>

      -v, --verbose         be verbose; must be placed before a subcommand
```

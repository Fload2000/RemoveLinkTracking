[![Build Status](https://travis-ci.com/Fload2000/RemoveLinkTracking.svg?branch=master)](https://travis-ci.com/Fload2000/RemoveLinkTracking)
# ![logo](https://github.com/Fload2000/RemoveLinkTracking/raw/master/src/img/icon32.png) RemoveLinkTracking - Overview

## What is link tracking?
Link tracking is a special kind of tracking, where users were tracked by clicking on links.
This helps sites e.g. to identify where users came from. With this information they can improve their behavior, 
so that they could get more views on their site.  
*How it works:*
A link is not only the domain and a file alone. There are often a lot of extra parameters. Some paramters track, some 
other paramters are just for the dynamic site itself (e.g. you search for something, etc.). The most popular parameters
for tracking are the so called UTMs. Which are basically parameters starting with `utm_`. 

## What does this Add-On do?

This Add-On basically catches every link the browser requests. If a tracking parameter is included in the link, the Add-on will remove it and hand the link over to the browser.  
  
If a parameter includes one of the following strings it will be removed:
```
AffiliateID
_trk
algo_
amp
awc
btsid
campaign
campid
cid
clickin
eqrecqid
ext
fb
fbclid
gclid
hmb_
igshid
key-sofort_
mcID
partner
pf_rd
pgtype
refID
sclid
spm
src
tt_
utm_
wc_mc
ws_ab_
wt_
yclid
zanpid
```

## How to install?

- [Install on Firefox](https://addons.mozilla.org/de/firefox/addon/remove-link-tracking/)


# Getting started

```shell
$ yarn
$ yarn lint
$ yarn start
```

# Running the tests

Depending on the task, you can run `yarn test`, `yarn debug`, `yarn test:watch` or `yarn test:debug`

# Found another tracking parameter which is not considered by the addon?

Feel free to open an issue or make a pull request.

# Next goals
- [ ] Appropriate tests for parameter
- [ ] GitHub CI integration
- [ ] Release for chromium based browsers ([#22](https://github.com/Fload2000/RemoveLinkTracking/issues/22))
- [ ] Option to set domain specific parameter ([#13](https://github.com/Fload2000/RemoveLinkTracking/issues/13))

# License

```
MIT License

Copyright (c) 2020 Fload

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

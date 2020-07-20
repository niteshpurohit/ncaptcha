---

[![Coverage Status](https://coveralls.io/repos/github/Code-Vedas/ncaptcha/badge.svg?branch=master)](https://coveralls.io/github/Code-Vedas/ncaptcha?branch=master)
[![npm version](https://badge.fury.io/js/ncaptcha-api.svg)](https://badge.fury.io/js/ncaptcha-api)

[![NPM](https://nodei.co/npm/ncaptcha-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ncaptcha-api/)

# ncaptcha

Module to integrate captcha for API only apps in nodejs

# Dependencies

1. canvas
2. crypto

# Usage

```
const NCaptcha = require('ncaptcha');

//remove {text:'123456'} to get random key and text image.
var ncaptcha = new NCaptcha({text:'123456'});

// send this key and image data to client, client will send key and user inputted test from the image
var data = ncaptcha.generate()

//should return true.
ncaptcha.check(data.key,'123456')
```

data will have key and image encoded in base64.

# Expiry Logic

By default key expires in 10 minutes. You can set 'expireInMinute' in params

```
// for 20 minutes
new NCaptcha({text:'123456',expireInMinute:20});
```

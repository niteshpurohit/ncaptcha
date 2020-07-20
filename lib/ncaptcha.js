'use strict'

const Canvas = require('canvas')
const crypto = require('crypto')

class NCaptcha {
  constructor(params) {
    if (!params) {
      params = {};
    }
    params.color = params.color || 'rgb(0,100,100)'
    params.background = params.background || 'rgb(255,200,150)'
    params.lineWidth = params.lineWidth || 8
    params.fontSize = params.fontSize || 80
    params.codeLength = params.codeLength || 6
    params.canvasWidth = params.canvasWidth || 400
    params.canvasHeight = params.canvasHeight || 150
    params.expireInMinute = params.expireInMinute || 10

    this.params = params
  }

  generate() {
    if (!this.params.text) {
      this.params.text = Math.random().toString(36).substr(2, 6);
    }
    var key = crypto.createHash('sha256').update(this.params.text).digest('hex');
    const canvas = new Canvas(this.params.canvasWidth, this.params.canvasHeight)
    const ctx = canvas.getContext('2d')

    ctx.antialias = 'gray'
    ctx.fillStyle = this.params.background
    ctx.fillRect(0, 0, this.params.canvasWidth, this.params.canvasHeight)
    ctx.fillStyle = this.params.color
    ctx.lineWidth = this.params.lineWidth
    ctx.strokeStyle = this.params.color
    ctx.font = `${this.params.fontSize}px sans`

    // draw two curve lines:
    for (var i = 0; i < (this.params.numberOfLines || 0); i++) {
      ctx.moveTo(Math.floor(0.08 * this.params.canvasWidth), Math.random() * this.params.canvasHeight)
      ctx.bezierCurveTo(Math.floor(0.32 * this.params.canvasWidth), Math.random() * this.params.canvasHeight, Math.floor(1.07 * this.params.canvasHeight), Math.random() * this.params.canvasHeight, Math.floor(0.92 * this.params.canvasWidth), Math.random() * this.params.canvasHeight)
      ctx.stroke()
    }

    // draw text:
    this.params.text.split('').forEach((char, i) => {
      ctx.setTransform(
        Math.random() * 0.2 + 1,
        Math.random() * 0.1,
        Math.random() * 0.1,
        Math.random() * 0.2 + 1, //v scale
        Math.floor(0.75 * this.params.fontSize) * i + Math.floor(0.25 * this.params.fontSize),
        Math.floor(((Math.random() * 0.2) + 1) * (this.params.fontSize)) //v move
      )
      ctx.fillText(char, 0, 0)
    })
    return {
      image: 'data:image/png;base64,' + canvas.toBuffer().toString('base64'),
      key: key + '-' + new Date().getTime() / 2
    };
  }

  check(keyToCheck, text) {
    var toCheckTime = new Date(parseInt(keyToCheck.split('-')[1]) * 2);
    var nowTime = new Date();

    var difference = (nowTime - toCheckTime) / (1000 * 60);
    return keyToCheck.split('-')[0] == crypto.createHash('sha256').update(text).digest('hex') && difference < this.params.expireInMinute;
  }
}
module.exports = NCaptcha;
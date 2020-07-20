var assert = require('assert');
var chai = require('chai');
var sleep = require('sleep');
var expect = chai.expect;
var NCaptcha = require('../lib/ncaptcha');
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
describe('Functionlity', function () {
  it('has key and image in return of image() method', function () {
    var ncaptcha = new NCaptcha();
    data = ncaptcha.generate();
    expect(data).to.have.a.property('image');
    expect(data).to.have.a.property('key');
    expect(data.image).to.be.a('string');
    expect(data.key).to.be.a('string');
  });
  it('check() method returns true', function () {
    var ncaptcha = new NCaptcha({ text: '123456' });
    data = ncaptcha.generate();
    assert.ok(ncaptcha.check(data.key, '123456'));
  });
  it('check() method returns true, should not expire in 9 seconds', function () {
    var ncaptcha = new NCaptcha({ text: '123456', expireInMinute: 0.167 });
    data = ncaptcha.generate();
    this.timeout(1000 * 20);
    sleep.sleep(9);
    assert.ok(ncaptcha.check(data.key, '123456'));
  });
  it('check() method returns false, should expire in 15 seconds', function () {
    var ncaptcha = new NCaptcha({ text: '123456', expireInMinute: 0.167 });
    data = ncaptcha.generate();
    this.timeout(1000 * 20);
    sleep.sleep(15);
    assert.ok(!ncaptcha.check(data.key, '123456'));
  });
  it('check() method returns false', function () {
    var ncaptcha = new NCaptcha({ text: '123456' });
    data = ncaptcha.generate();
    assert.ok(!ncaptcha.check(data.key, '1234565'));
  });
});

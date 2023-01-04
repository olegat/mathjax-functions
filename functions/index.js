// -*- Mode: js; js-indent-level: 2 -*-
//**
// Based on github.com/mathjax/MathJax-demos-node/blob/master/direct/tex2svg
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const functions = require("firebase-functions");

const {mathjax}             = require('mathjax-full/js/mathjax.js');
const {TeX}                 = require('mathjax-full/js/input/tex.js');
const {SVG}                 = require('mathjax-full/js/output/svg.js');
const {liteAdaptor}         = require('mathjax-full/js/adaptors/liteAdaptor.js');
const {RegisterHTMLHandler} = require('mathjax-full/js/handlers/html.js');

function convert(math, InOut) {
  const adaptor = liteAdaptor();
  RegisterHTMLHandler(adaptor);
  const html = mathjax.document('', InOut);
  const output = html.convert(math);
  console.log(output.text);
  return adaptor.outerHTML(output);
}

exports.tex2svg = functions.https.onRequest((request, response) => {
  const math = request._parsedUrl.query;
  return response.send(convert(math, {
    InputJax: new TeX(),
    OutputJax: new SVG()
  }));
});
//*/

/**
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const functions = require("firebase-functions");
var   mathjax   = require("mathjax-node-sre");

async function convert(math) {
  mathjax.config({MathJax: {SVG: {font: "TeX"}}});
  mathjax.start();
  let input = {
    math: math,
    format: "TeX",
    svg: true,
  };
  return await mathjax.typeset(input)
      .then((data) => { return data.svg; })
      .catch((err) => { return err; });
  // mathjax.typeset({
  //   math: math,
  //   format: "TeX",
  //   svg: true,
  //   speakText: true,
  //   ex: 6,
  //   width: 100,
  //   linebreaks: true
  // }, function (data) {
  //   return {console.log(data.svg)}
  // });
}

exports.tex2svg = functions.https.onRequest((request, response) => {
  const math = request._parsedUrl.query;
  convert(math).then((output) => {
    response.send(output);
  });
});
//*/

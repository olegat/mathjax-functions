// -*- Mode: js; js-indent-level: 2 -*-
// Based on github.com/mathjax/MathJax-demos-node/blob/master/direct/tex2svg
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const functions = require("firebase-functions");

const {mathjax}             = require("mathjax-full/js/mathjax.js");
const {TeX}                 = require("mathjax-full/js/input/tex.js");
const {SVG}                 = require("mathjax-full/js/output/svg.js");
const {liteAdaptor}         = require("mathjax-full/js/adaptors/liteAdaptor.js");
const {RegisterHTMLHandler} = require("mathjax-full/js/handlers/html.js");

function convert(math, InOut) {
  const adaptor = liteAdaptor();
  RegisterHTMLHandler(adaptor);
  const html    = mathjax.document("", InOut);
  const output  = html.convert(math);
  const content = adaptor.outerHTML(output.children[0]);
  return content;
}

exports.tex2svg = functions.https.onRequest((request, response) => {
  const math = decodeURIComponent(request._parsedUrl.query);
  response.set("Content-Type", "image/svg+xml");
  return response.send(convert(math, {
    InputJax: new TeX(),
    OutputJax: new SVG()
  }));
});

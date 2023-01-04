# Mathjax Cloud Functions

Current there is only one cloud function (`tex2svg`), but more may be
added in the future. The current project uses Firebase functions, but
may be switched to a different provider at some point.

## tex2svg

This function converts takes a TeX math expression as a URL parameter
and reponds with an SVG image render of that mathematical expression.

**Example:**

Opening this URL in the browser (with the Firebase emulator running
using `firebase emulators:start`):

```
http://127.0.0.1:5001/mathjax-functions/us-central1/tex2svg?\sqrt{1-\frac{a_n^3}{2}}
```

This image will be rendered:

![](docs/sqrt-1-minus-half-acubed.svg)

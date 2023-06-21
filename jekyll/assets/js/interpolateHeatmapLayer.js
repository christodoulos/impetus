!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.interpolateHeatmapLayer = e())
    : (t.interpolateHeatmapLayer = e());
})(this, () =>
  (() => {
    var t = {
        187: (t) => {
          "use strict";
          function e(t, e, r) {
            r = r || 2;
            var n,
              h,
              a,
              o,
              l,
              g,
              m,
              c = e && e.length,
              p = c ? e[0] * r : t.length,
              v = i(t, 0, p, r, !0),
              d = [];
            if (!v || v.next === v.prev) return d;
            if (
              (c &&
                (v = (function (t, e, r, s) {
                  var n,
                    h,
                    a,
                    o = [];
                  for (n = 0, h = e.length; n < h; n++)
                    (a = i(
                      t,
                      e[n] * s,
                      n < h - 1 ? e[n + 1] * s : t.length,
                      s,
                      !1
                    )) === a.next && (a.steiner = !0),
                      o.push(x(a));
                  for (o.sort(u), n = 0; n < o.length; n++) r = f(o[n], r);
                  return r;
                })(t, e, v, r)),
              t.length > 80 * r)
            ) {
              (n = a = t[0]), (h = o = t[1]);
              for (var T = r; T < p; T += r)
                (l = t[T]) < n && (n = l),
                  (g = t[T + 1]) < h && (h = g),
                  l > a && (a = l),
                  g > o && (o = g);
              m = 0 !== (m = Math.max(a - n, o - h)) ? 32767 / m : 0;
            }
            return s(v, d, r, n, h, m, 0), d;
          }
          function i(t, e, i, r, s) {
            var n, h;
            if (s === y(t, e, i, r) > 0)
              for (n = e; n < i; n += r) h = R(n, t[n], t[n + 1], h);
            else for (n = i - r; n >= e; n -= r) h = R(n, t[n], t[n + 1], h);
            return h && v(h, h.next) && (A(h), (h = h.next)), h;
          }
          function r(t, e) {
            if (!t) return t;
            e || (e = t);
            var i,
              r = t;
            do {
              if (
                ((i = !1),
                r.steiner || (!v(r, r.next) && 0 !== p(r.prev, r, r.next)))
              )
                r = r.next;
              else {
                if ((A(r), (r = e = r.prev) === r.next)) break;
                i = !0;
              }
            } while (i || r !== e);
            return e;
          }
          function s(t, e, i, u, f, l, x) {
            if (t) {
              !x &&
                l &&
                (function (t, e, i, r) {
                  var s = t;
                  do {
                    0 === s.z && (s.z = g(s.x, s.y, e, i, r)),
                      (s.prevZ = s.prev),
                      (s.nextZ = s.next),
                      (s = s.next);
                  } while (s !== t);
                  (s.prevZ.nextZ = null),
                    (s.prevZ = null),
                    (function (t) {
                      var e,
                        i,
                        r,
                        s,
                        n,
                        h,
                        a,
                        o,
                        u = 1;
                      do {
                        for (i = t, t = null, n = null, h = 0; i; ) {
                          for (
                            h++, r = i, a = 0, e = 0;
                            e < u && (a++, (r = r.nextZ));
                            e++
                          );
                          for (o = u; a > 0 || (o > 0 && r); )
                            0 !== a && (0 === o || !r || i.z <= r.z)
                              ? ((s = i), (i = i.nextZ), a--)
                              : ((s = r), (r = r.nextZ), o--),
                              n ? (n.nextZ = s) : (t = s),
                              (s.prevZ = n),
                              (n = s);
                          i = r;
                        }
                        (n.nextZ = null), (u *= 2);
                      } while (h > 1);
                    })(s);
                })(t, u, f, l);
              for (var m, c, p = t; t.prev !== t.next; )
                if (((m = t.prev), (c = t.next), l ? h(t, u, f, l) : n(t)))
                  e.push((m.i / i) | 0),
                    e.push((t.i / i) | 0),
                    e.push((c.i / i) | 0),
                    A(t),
                    (t = c.next),
                    (p = c.next);
                else if ((t = c) === p) {
                  x
                    ? 1 === x
                      ? s((t = a(r(t), e, i)), e, i, u, f, l, 2)
                      : 2 === x && o(t, e, i, u, f, l)
                    : s(r(t), e, i, u, f, l, 1);
                  break;
                }
            }
          }
          function n(t) {
            var e = t.prev,
              i = t,
              r = t.next;
            if (p(e, i, r) >= 0) return !1;
            for (
              var s = e.x,
                n = i.x,
                h = r.x,
                a = e.y,
                o = i.y,
                u = r.y,
                f = s < n ? (s < h ? s : h) : n < h ? n : h,
                l = a < o ? (a < u ? a : u) : o < u ? o : u,
                g = s > n ? (s > h ? s : h) : n > h ? n : h,
                x = a > o ? (a > u ? a : u) : o > u ? o : u,
                c = r.next;
              c !== e;

            ) {
              if (
                c.x >= f &&
                c.x <= g &&
                c.y >= l &&
                c.y <= x &&
                m(s, a, n, o, h, u, c.x, c.y) &&
                p(c.prev, c, c.next) >= 0
              )
                return !1;
              c = c.next;
            }
            return !0;
          }
          function h(t, e, i, r) {
            var s = t.prev,
              n = t,
              h = t.next;
            if (p(s, n, h) >= 0) return !1;
            for (
              var a = s.x,
                o = n.x,
                u = h.x,
                f = s.y,
                l = n.y,
                x = h.y,
                c = a < o ? (a < u ? a : u) : o < u ? o : u,
                v = f < l ? (f < x ? f : x) : l < x ? l : x,
                d = a > o ? (a > u ? a : u) : o > u ? o : u,
                T = f > l ? (f > x ? f : x) : l > x ? l : x,
                _ = g(c, v, e, i, r),
                E = g(d, T, e, i, r),
                b = t.prevZ,
                R = t.nextZ;
              b && b.z >= _ && R && R.z <= E;

            ) {
              if (
                b.x >= c &&
                b.x <= d &&
                b.y >= v &&
                b.y <= T &&
                b !== s &&
                b !== h &&
                m(a, f, o, l, u, x, b.x, b.y) &&
                p(b.prev, b, b.next) >= 0
              )
                return !1;
              if (
                ((b = b.prevZ),
                R.x >= c &&
                  R.x <= d &&
                  R.y >= v &&
                  R.y <= T &&
                  R !== s &&
                  R !== h &&
                  m(a, f, o, l, u, x, R.x, R.y) &&
                  p(R.prev, R, R.next) >= 0)
              )
                return !1;
              R = R.nextZ;
            }
            for (; b && b.z >= _; ) {
              if (
                b.x >= c &&
                b.x <= d &&
                b.y >= v &&
                b.y <= T &&
                b !== s &&
                b !== h &&
                m(a, f, o, l, u, x, b.x, b.y) &&
                p(b.prev, b, b.next) >= 0
              )
                return !1;
              b = b.prevZ;
            }
            for (; R && R.z <= E; ) {
              if (
                R.x >= c &&
                R.x <= d &&
                R.y >= v &&
                R.y <= T &&
                R !== s &&
                R !== h &&
                m(a, f, o, l, u, x, R.x, R.y) &&
                p(R.prev, R, R.next) >= 0
              )
                return !1;
              R = R.nextZ;
            }
            return !0;
          }
          function a(t, e, i) {
            var s = t;
            do {
              var n = s.prev,
                h = s.next.next;
              !v(n, h) &&
                d(n, s, s.next, h) &&
                E(n, h) &&
                E(h, n) &&
                (e.push((n.i / i) | 0),
                e.push((s.i / i) | 0),
                e.push((h.i / i) | 0),
                A(s),
                A(s.next),
                (s = t = h)),
                (s = s.next);
            } while (s !== t);
            return r(s);
          }
          function o(t, e, i, n, h, a) {
            var o = t;
            do {
              for (var u = o.next.next; u !== o.prev; ) {
                if (o.i !== u.i && c(o, u)) {
                  var f = b(o, u);
                  return (
                    (o = r(o, o.next)),
                    (f = r(f, f.next)),
                    s(o, e, i, n, h, a, 0),
                    void s(f, e, i, n, h, a, 0)
                  );
                }
                u = u.next;
              }
              o = o.next;
            } while (o !== t);
          }
          function u(t, e) {
            return t.x - e.x;
          }
          function f(t, e) {
            var i = (function (t, e) {
              var i,
                r = e,
                s = t.x,
                n = t.y,
                h = -1 / 0;
              do {
                if (n <= r.y && n >= r.next.y && r.next.y !== r.y) {
                  var a =
                    r.x + ((n - r.y) * (r.next.x - r.x)) / (r.next.y - r.y);
                  if (
                    a <= s &&
                    a > h &&
                    ((h = a), (i = r.x < r.next.x ? r : r.next), a === s)
                  )
                    return i;
                }
                r = r.next;
              } while (r !== e);
              if (!i) return null;
              var o,
                u = i,
                f = i.x,
                g = i.y,
                x = 1 / 0;
              r = i;
              do {
                s >= r.x &&
                  r.x >= f &&
                  s !== r.x &&
                  m(n < g ? s : h, n, f, g, n < g ? h : s, n, r.x, r.y) &&
                  ((o = Math.abs(n - r.y) / (s - r.x)),
                  E(r, t) &&
                    (o < x ||
                      (o === x && (r.x > i.x || (r.x === i.x && l(i, r))))) &&
                    ((i = r), (x = o))),
                  (r = r.next);
              } while (r !== u);
              return i;
            })(t, e);
            if (!i) return e;
            var s = b(i, t);
            return r(s, s.next), r(i, i.next);
          }
          function l(t, e) {
            return p(t.prev, t, e.prev) < 0 && p(e.next, t, t.next) < 0;
          }
          function g(t, e, i, r, s) {
            return (
              (t =
                1431655765 &
                ((t =
                  858993459 &
                  ((t =
                    252645135 &
                    ((t = 16711935 & ((t = ((t - i) * s) | 0) | (t << 8))) |
                      (t << 4))) |
                    (t << 2))) |
                  (t << 1))) |
              ((e =
                1431655765 &
                ((e =
                  858993459 &
                  ((e =
                    252645135 &
                    ((e = 16711935 & ((e = ((e - r) * s) | 0) | (e << 8))) |
                      (e << 4))) |
                    (e << 2))) |
                  (e << 1))) <<
                1)
            );
          }
          function x(t) {
            var e = t,
              i = t;
            do {
              (e.x < i.x || (e.x === i.x && e.y < i.y)) && (i = e),
                (e = e.next);
            } while (e !== t);
            return i;
          }
          function m(t, e, i, r, s, n, h, a) {
            return (
              (s - h) * (e - a) >= (t - h) * (n - a) &&
              (t - h) * (r - a) >= (i - h) * (e - a) &&
              (i - h) * (n - a) >= (s - h) * (r - a)
            );
          }
          function c(t, e) {
            return (
              t.next.i !== e.i &&
              t.prev.i !== e.i &&
              !(function (t, e) {
                var i = t;
                do {
                  if (
                    i.i !== t.i &&
                    i.next.i !== t.i &&
                    i.i !== e.i &&
                    i.next.i !== e.i &&
                    d(i, i.next, t, e)
                  )
                    return !0;
                  i = i.next;
                } while (i !== t);
                return !1;
              })(t, e) &&
              ((E(t, e) &&
                E(e, t) &&
                (function (t, e) {
                  var i = t,
                    r = !1,
                    s = (t.x + e.x) / 2,
                    n = (t.y + e.y) / 2;
                  do {
                    i.y > n != i.next.y > n &&
                      i.next.y !== i.y &&
                      s <
                        ((i.next.x - i.x) * (n - i.y)) / (i.next.y - i.y) +
                          i.x &&
                      (r = !r),
                      (i = i.next);
                  } while (i !== t);
                  return r;
                })(t, e) &&
                (p(t.prev, t, e.prev) || p(t, e.prev, e))) ||
                (v(t, e) &&
                  p(t.prev, t, t.next) > 0 &&
                  p(e.prev, e, e.next) > 0))
            );
          }
          function p(t, e, i) {
            return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y);
          }
          function v(t, e) {
            return t.x === e.x && t.y === e.y;
          }
          function d(t, e, i, r) {
            var s = _(p(t, e, i)),
              n = _(p(t, e, r)),
              h = _(p(i, r, t)),
              a = _(p(i, r, e));
            return (
              (s !== n && h !== a) ||
              !(0 !== s || !T(t, i, e)) ||
              !(0 !== n || !T(t, r, e)) ||
              !(0 !== h || !T(i, t, r)) ||
              !(0 !== a || !T(i, e, r))
            );
          }
          function T(t, e, i) {
            return (
              e.x <= Math.max(t.x, i.x) &&
              e.x >= Math.min(t.x, i.x) &&
              e.y <= Math.max(t.y, i.y) &&
              e.y >= Math.min(t.y, i.y)
            );
          }
          function _(t) {
            return t > 0 ? 1 : t < 0 ? -1 : 0;
          }
          function E(t, e) {
            return p(t.prev, t, t.next) < 0
              ? p(t, e, t.next) >= 0 && p(t, t.prev, e) >= 0
              : p(t, e, t.prev) < 0 || p(t, t.next, e) < 0;
          }
          function b(t, e) {
            var i = new F(t.i, t.x, t.y),
              r = new F(e.i, e.x, e.y),
              s = t.next,
              n = e.prev;
            return (
              (t.next = e),
              (e.prev = t),
              (i.next = s),
              (s.prev = i),
              (r.next = i),
              (i.prev = r),
              (n.next = r),
              (r.prev = n),
              r
            );
          }
          function R(t, e, i, r) {
            var s = new F(t, e, i);
            return (
              r
                ? ((s.next = r.next),
                  (s.prev = r),
                  (r.next.prev = s),
                  (r.next = s))
                : ((s.prev = s), (s.next = s)),
              s
            );
          }
          function A(t) {
            (t.next.prev = t.prev),
              (t.prev.next = t.next),
              t.prevZ && (t.prevZ.nextZ = t.nextZ),
              t.nextZ && (t.nextZ.prevZ = t.prevZ);
          }
          function F(t, e, i) {
            (this.i = t),
              (this.x = e),
              (this.y = i),
              (this.prev = null),
              (this.next = null),
              (this.z = 0),
              (this.prevZ = null),
              (this.nextZ = null),
              (this.steiner = !1);
          }
          function y(t, e, i, r) {
            for (var s = 0, n = e, h = i - r; n < i; n += r)
              (s += (t[h] - t[n]) * (t[n + 1] + t[h + 1])), (h = n);
            return s;
          }
          (t.exports = e),
            (t.exports.default = e),
            (e.deviation = function (t, e, i, r) {
              var s = e && e.length,
                n = s ? e[0] * i : t.length,
                h = Math.abs(y(t, 0, n, i));
              if (s)
                for (var a = 0, o = e.length; a < o; a++) {
                  var u = e[a] * i,
                    f = a < o - 1 ? e[a + 1] * i : t.length;
                  h -= Math.abs(y(t, u, f, i));
                }
              var l = 0;
              for (a = 0; a < r.length; a += 3) {
                var g = r[a] * i,
                  x = r[a + 1] * i,
                  m = r[a + 2] * i;
                l += Math.abs(
                  (t[g] - t[m]) * (t[x + 1] - t[g + 1]) -
                    (t[g] - t[x]) * (t[m + 1] - t[g + 1])
                );
              }
              return 0 === h && 0 === l ? 0 : Math.abs((l - h) / h);
            }),
            (e.flatten = function (t) {
              for (
                var e = t[0][0].length,
                  i = { vertices: [], holes: [], dimensions: e },
                  r = 0,
                  s = 0;
                s < t.length;
                s++
              ) {
                for (var n = 0; n < t[s].length; n++)
                  for (var h = 0; h < e; h++) i.vertices.push(t[s][n][h]);
                s > 0 && ((r += t[s - 1].length), i.holes.push(r));
              }
              return i;
            });
        },
        825: (t) => {
          t.exports =
            "precision highp float;\n\nuniform sampler2D u_ROITexture;\nuniform vec2 u_ScreenSize;\n\nvoid main(void) {\n    gl_FragColor = texture2D(u_ROITexture, vec2(gl_FragCoord.x/u_ScreenSize.x, gl_FragCoord.y/u_ScreenSize.y));\n}";
        },
        928: (t) => {
          t.exports =
            "attribute vec4 a_Position;\nuniform mat4 u_MvpMatrix;\n\nvoid main() {\n    gl_Position = u_MvpMatrix * a_Position;\n}";
        },
        499: (t) => {
          t.exports =
            "precision highp float;\n\nuniform float ui;\nuniform vec2 xi;\nuniform float p;\nuniform vec2 u_FramebufferSize;\nuniform mat4 u_MvpMatrixInverse;\nuniform float u_PointRadius;\nuniform vec2 u_XiImageSpace;\nuniform int u_FasterPointRadius;\n\nvoid main() {\n    vec2 x = vec2(2. * gl_FragCoord.x/u_FramebufferSize.x - 1., 2. * gl_FragCoord.y/u_FramebufferSize.y - 1.);\n    float wi = 1.0/pow(distance(x, u_XiImageSpace), p);\n\n    float outsideRange = 1.;\n    if (u_FasterPointRadius > 0) {\n        vec4 xWorldSpace = u_MvpMatrixInverse * vec4(x, 1, 1);\n        xWorldSpace /= xWorldSpace.w;\n        \n        if (distance(vec2(xWorldSpace), xi) > u_PointRadius) {\n            outsideRange = 0.;\n        }\n    }\n\n    gl_FragColor = vec4(ui*wi, wi, outsideRange, 1.0);\n}";
        },
        854: (t) => {
          t.exports =
            "attribute vec2 a_Position;\nuniform mat4 u_MvpMatrix;\n\nvoid main() {\n    gl_Position = u_MvpMatrix * vec4(a_Position, 0.0, 1.0);\n}";
        },
        106: (t) => {
          t.exports =
            "precision highp float;\n\nVALUE_TO_COLOR\nVALUE_TO_COLOR_4\n\nuniform sampler2D u_IDWTexture;\nuniform vec2 u_FramebufferSize;\nuniform float u_Opacity;\nuniform float u_AverageThreshold;\nuniform float u_Average;\n\nvoid main(void) {\n    vec4 data = texture2D(u_IDWTexture, vec2(gl_FragCoord.x/u_FramebufferSize.x, gl_FragCoord.y/u_FramebufferSize.y));\n    float u = data.x/data.y;\n    bool outsideRange = data.z == 0.;\n\n    float opacity = u_Opacity;\n    if (abs(u - u_Average) < u_AverageThreshold || outsideRange) {\n        opacity = 0.;\n    }\n\n    gl_FragColor = valueToColor4(u, opacity);\n}";
        },
        15: (t) => {
          t.exports =
            "attribute vec2 a_Position;\nuniform mat4 u_MvpMatrix;\nuniform mat4 modelMatrix;\n\nvoid main() {\n    gl_Position = u_MvpMatrix * modelMatrix * vec4(a_Position, 0.0, 1.0);\n}";
        },
      },
      e = {};
    function i(r) {
      var s = e[r];
      if (void 0 !== s) return s.exports;
      var n = (e[r] = { exports: {} });
      return t[r](n, n.exports, i), n.exports;
    }
    (i.n = (t) => {
      var e = t && t.__esModule ? () => t.default : () => t;
      return i.d(e, { a: e }), e;
    }),
      (i.d = (t, e) => {
        for (var r in e)
          i.o(e, r) &&
            !i.o(t, r) &&
            Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
      }),
      (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
      (i.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      });
    var r = {};
    return (
      (() => {
        "use strict";
        i.r(r), i.d(r, { create: () => x });
        class t {
          constructor() {
            this.elements = new Float32Array([
              1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
            ]);
          }
          translate(t, e, i) {
            return (
              (this.elements[12] +=
                this.elements[0] * t +
                this.elements[4] * e +
                this.elements[8] * i),
              (this.elements[13] +=
                this.elements[1] * t +
                this.elements[5] * e +
                this.elements[9] * i),
              (this.elements[14] +=
                this.elements[2] * t +
                this.elements[6] * e +
                this.elements[10] * i),
              (this.elements[15] +=
                this.elements[3] * t +
                this.elements[7] * e +
                this.elements[11] * i),
              this
            );
          }
          scale(t, e, i) {
            return (
              (this.elements[0] *= t),
              (this.elements[4] *= e),
              (this.elements[8] *= i),
              (this.elements[1] *= t),
              (this.elements[5] *= e),
              (this.elements[9] *= i),
              (this.elements[2] *= t),
              (this.elements[6] *= e),
              (this.elements[10] *= i),
              (this.elements[3] *= t),
              (this.elements[7] *= e),
              (this.elements[11] *= i),
              this
            );
          }
          static dot(t, e) {
            const i = new Float32Array(4);
            for (let r = 0; r < 4; r++)
              i[r] =
                t[r + 0] * e[0] +
                t[r + 4] * e[1] +
                t[r + 8] * e[2] +
                t[r + 12] * e[3];
            return i;
          }
          static inverse(t) {
            const e = new Float32Array(16);
            (e[0] =
              t[5] * t[10] * t[15] -
              t[5] * t[11] * t[14] -
              t[9] * t[6] * t[15] +
              t[9] * t[7] * t[14] +
              t[13] * t[6] * t[11] -
              t[13] * t[7] * t[10]),
              (e[4] =
                -t[4] * t[10] * t[15] +
                t[4] * t[11] * t[14] +
                t[8] * t[6] * t[15] -
                t[8] * t[7] * t[14] -
                t[12] * t[6] * t[11] +
                t[12] * t[7] * t[10]),
              (e[8] =
                t[4] * t[9] * t[15] -
                t[4] * t[11] * t[13] -
                t[8] * t[5] * t[15] +
                t[8] * t[7] * t[13] +
                t[12] * t[5] * t[11] -
                t[12] * t[7] * t[9]),
              (e[12] =
                -t[4] * t[9] * t[14] +
                t[4] * t[10] * t[13] +
                t[8] * t[5] * t[14] -
                t[8] * t[6] * t[13] -
                t[12] * t[5] * t[10] +
                t[12] * t[6] * t[9]),
              (e[1] =
                -t[1] * t[10] * t[15] +
                t[1] * t[11] * t[14] +
                t[9] * t[2] * t[15] -
                t[9] * t[3] * t[14] -
                t[13] * t[2] * t[11] +
                t[13] * t[3] * t[10]),
              (e[5] =
                t[0] * t[10] * t[15] -
                t[0] * t[11] * t[14] -
                t[8] * t[2] * t[15] +
                t[8] * t[3] * t[14] +
                t[12] * t[2] * t[11] -
                t[12] * t[3] * t[10]),
              (e[9] =
                -t[0] * t[9] * t[15] +
                t[0] * t[11] * t[13] +
                t[8] * t[1] * t[15] -
                t[8] * t[3] * t[13] -
                t[12] * t[1] * t[11] +
                t[12] * t[3] * t[9]),
              (e[13] =
                t[0] * t[9] * t[14] -
                t[0] * t[10] * t[13] -
                t[8] * t[1] * t[14] +
                t[8] * t[2] * t[13] +
                t[12] * t[1] * t[10] -
                t[12] * t[2] * t[9]),
              (e[2] =
                t[1] * t[6] * t[15] -
                t[1] * t[7] * t[14] -
                t[5] * t[2] * t[15] +
                t[5] * t[3] * t[14] +
                t[13] * t[2] * t[7] -
                t[13] * t[3] * t[6]),
              (e[6] =
                -t[0] * t[6] * t[15] +
                t[0] * t[7] * t[14] +
                t[4] * t[2] * t[15] -
                t[4] * t[3] * t[14] -
                t[12] * t[2] * t[7] +
                t[12] * t[3] * t[6]),
              (e[10] =
                t[0] * t[5] * t[15] -
                t[0] * t[7] * t[13] -
                t[4] * t[1] * t[15] +
                t[4] * t[3] * t[13] +
                t[12] * t[1] * t[7] -
                t[12] * t[3] * t[5]),
              (e[14] =
                -t[0] * t[5] * t[14] +
                t[0] * t[6] * t[13] +
                t[4] * t[1] * t[14] -
                t[4] * t[2] * t[13] -
                t[12] * t[1] * t[6] +
                t[12] * t[2] * t[5]),
              (e[3] =
                -t[1] * t[6] * t[11] +
                t[1] * t[7] * t[10] +
                t[5] * t[2] * t[11] -
                t[5] * t[3] * t[10] -
                t[9] * t[2] * t[7] +
                t[9] * t[3] * t[6]),
              (e[7] =
                t[0] * t[6] * t[11] -
                t[0] * t[7] * t[10] -
                t[4] * t[2] * t[11] +
                t[4] * t[3] * t[10] +
                t[8] * t[2] * t[7] -
                t[8] * t[3] * t[6]),
              (e[11] =
                -t[0] * t[5] * t[11] +
                t[0] * t[7] * t[9] +
                t[4] * t[1] * t[11] -
                t[4] * t[3] * t[9] -
                t[8] * t[1] * t[7] +
                t[8] * t[3] * t[5]),
              (e[15] =
                t[0] * t[5] * t[10] -
                t[0] * t[6] * t[9] -
                t[4] * t[1] * t[10] +
                t[4] * t[2] * t[9] +
                t[8] * t[1] * t[6] -
                t[8] * t[2] * t[5]);
            let i = t[0] * e[0] + t[1] * e[4] + t[2] * e[8] + t[3] * e[12];
            if (0 != i) {
              i = 1 / i;
              for (let t = 0; t < 16; t++) e[t] = e[t] * i;
              return e;
            }
          }
        }
        function e(t, e) {
          const i = t.createShader(t.VERTEX_SHADER);
          return h(t, i, e);
        }
        function s(t, e) {
          const i = t.createShader(t.FRAGMENT_SHADER);
          return h(t, i, e);
        }
        function n(t, e, i) {
          const r = t.createProgram();
          if (
            (t.attachShader(r, e),
            t.attachShader(r, i),
            t.linkProgram(r),
            !t.getProgramParameter(r, t.LINK_STATUS))
          )
            throw t.getProgramInfoLog(r);
          return r;
        }
        function h(t, e, i) {
          if (
            (t.shaderSource(e, i),
            t.compileShader(e),
            !t.getShaderParameter(e, t.COMPILE_STATUS))
          )
            throw t.getShaderInfoLog(e);
          return e;
        }
        class a {
          constructor(t, e, i, r, s, n) {
            (this.gl = t),
              (this.framebufferWidth = e),
              (this.framebufferHeight = i),
              (this.points = r),
              (this.pointsDistance = s),
              (this.options = n),
              this.#t(),
              this.#e(),
              this.#i(),
              this.#r(),
              this.#s();
          }
          setFrameBufferSize(t, e) {
            (this.framebufferWidth = t),
              (this.framebufferHeight = e),
              this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture),
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.framebufferWidth,
                this.framebufferHeight,
                0,
                this.gl.RGBA,
                this.gl.FLOAT,
                null
              );
          }
          delete() {
            this.gl.deleteTexture(this.texture),
              this.gl.deleteBuffer(this.verticesBuffer),
              this.gl.deleteFramebuffer(this.framebuffer);
          }
          draw(e) {
            this.gl.enable(this.gl.BLEND),
              this.gl.blendFunc(this.gl.ONE, this.gl.ONE),
              this.gl.useProgram(this.program),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer),
              this.gl.viewport(
                0,
                0,
                this.framebufferWidth,
                this.framebufferHeight
              ),
              this.gl.clear(
                this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT
              ),
              this.gl.uniformMatrix4fv(this.uMvpMatrix, !1, e),
              this.gl.uniform1f(this.uP, this.options.p),
              this.gl.uniform2f(
                this.uFramebufferSize,
                this.framebufferWidth,
                this.framebufferHeight
              ),
              this.options.pointRadius > 0 &&
                this.options.fasterPointRadius &&
                (this.gl.uniform1i(this.u_FasterPointRadius, 1),
                this.gl.uniformMatrix4fv(
                  this.uMvpMatrixInverse,
                  !1,
                  t.inverse(e)
                ));
            for (let i = 0; i < this.points.length; i++) {
              const r = this.points[i],
                s = t.dot(e, [r[0], r[1], 0, 1]);
              this.gl.uniform2f(this.uXiImageSpace, s[0] / s[3], s[1] / s[3]),
                this.gl.uniform1f(this.uUi, r[2]),
                this.gl.uniform2f(this.uXi, r[0], r[1]),
                this.gl.uniform1f(this.uPointRadius, this.pointsDistance[i]),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer),
                this.gl.enableVertexAttribArray(this.aPosition),
                this.gl.vertexAttribPointer(
                  this.aPosition,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0
                ),
                this.gl.drawArrays(
                  this.gl.TRIANGLE_STRIP,
                  0,
                  this.verticesNumber
                );
            }
          }
          updatePointsAndDistances(t, e) {
            (this.points = t), (this.pointsDistance = e);
          }
          #t() {
            const t = i(854),
              r = i(499),
              h = e(this.gl, t),
              a = s(this.gl, r);
            this.program = n(this.gl, h, a);
          }
          #e() {
            (this.aPosition = this.gl.getAttribLocation(
              this.program,
              "a_Position"
            )),
              (this.uMvpMatrix = this.gl.getUniformLocation(
                this.program,
                "u_MvpMatrix"
              )),
              (this.uUi = this.gl.getUniformLocation(this.program, "ui")),
              (this.uXi = this.gl.getUniformLocation(this.program, "xi")),
              (this.uP = this.gl.getUniformLocation(this.program, "p")),
              (this.uFramebufferSize = this.gl.getUniformLocation(
                this.program,
                "u_FramebufferSize"
              )),
              (this.uMvpMatrixInverse = this.gl.getUniformLocation(
                this.program,
                "u_MvpMatrixInverse"
              )),
              (this.uPointRadius = this.gl.getUniformLocation(
                this.program,
                "u_PointRadius"
              )),
              (this.uXiImageSpace = this.gl.getUniformLocation(
                this.program,
                "u_XiImageSpace"
              )),
              (this.u_FasterPointRadius = this.gl.getUniformLocation(
                this.program,
                "u_FasterPointRadius"
              ));
          }
          #i() {
            (this.verticesBuffer = this.gl.createBuffer()),
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer),
              this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]),
                this.gl.STATIC_DRAW
              ),
              (this.verticesNumber = 4);
          }
          #r() {
            (this.texture = this.gl.createTexture()),
              this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                this.gl.CLAMP_TO_EDGE
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                this.gl.CLAMP_TO_EDGE
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MAG_FILTER,
                this.gl.NEAREST
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MIN_FILTER,
                this.gl.NEAREST
              ),
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.framebufferWidth,
                this.framebufferHeight,
                0,
                this.gl.RGBA,
                this.gl.FLOAT,
                null
              ),
              this.gl.bindTexture(this.gl.TEXTURE_2D, null);
          }
          #s() {
            (this.framebuffer = this.gl.createFramebuffer()),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer),
              this.gl.framebufferTexture2D(
                this.gl.FRAMEBUFFER,
                this.gl.COLOR_ATTACHMENT0,
                this.gl.TEXTURE_2D,
                this.texture,
                0
              ),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
          }
        }
        var o = i(187),
          u = i.n(o);
        class f {
          constructor(t, e, i, r, s, n, h) {
            (this.gl = t),
              (this.framebufferWidth = e),
              (this.framebufferHeight = i),
              (this.points = r),
              (this.pointsDistance = s),
              (this.average = n),
              (this.options = h),
              this.#t(),
              this.#e(),
              this.#i(),
              this.#r(),
              this.#s();
          }
          setFrameBufferSize(t, e) {
            (this.framebufferWidth = t),
              (this.framebufferHeight = e),
              this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture),
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.framebufferWidth,
                this.framebufferHeight,
                0,
                this.gl.RGBA,
                this.gl.FLOAT,
                null
              );
          }
          delete() {
            this.gl.deleteTexture(this.texture),
              this.gl.deleteBuffer(this.verticesBuffer),
              this.gl.deleteBuffer(this.indicesBuffer),
              this.gl.deleteFramebuffer(this.framebuffer);
          }
          draw(e, i, r) {
            const s =
                this.options.roi.length > 0 && 0 == this.options.pointRadius,
              n = s ? r.width : this.framebufferWidth,
              h = s ? r.height : this.framebufferHeight;
            if (
              (this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture),
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                n,
                h,
                0,
                this.gl.RGBA,
                this.gl.FLOAT,
                null
              ),
              this.gl.disable(this.gl.BLEND),
              this.gl.disable(this.gl.DEPTH_TEST),
              this.gl.useProgram(this.program),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer),
              this.gl.viewport(0, 0, n, h),
              this.gl.clear(this.gl.COLOR_BUFFER_BIT),
              this.gl.uniformMatrix4fv(this.uMvpMatrix, !1, e),
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer),
              this.gl.enableVertexAttribArray(this.aPosition),
              this.gl.vertexAttribPointer(
                this.aPosition,
                2,
                this.gl.FLOAT,
                !1,
                0,
                0
              ),
              this.gl.activeTexture(this.gl.TEXTURE0),
              this.gl.bindTexture(this.gl.TEXTURE_2D, i),
              this.gl.uniform1i(this.uIDWTexture, 0),
              this.gl.uniform2f(this.uFramebufferSize, n, h),
              this.gl.uniform1f(this.uOpacity, this.options.opacity),
              this.gl.uniform1f(
                this.uAverageThreshold,
                this.options.averageThreshold
              ),
              this.gl.uniform1f(this.uAverage, this.average),
              this.gl.bindBuffer(
                this.gl.ELEMENT_ARRAY_BUFFER,
                this.indicesBuffer
              ),
              this.options.pointRadius > 0 && !this.options.fasterPointRadius)
            )
              this.points.forEach((e, i) => {
                const r = new t();
                r.translate(e[0], e[1], 0),
                  r.scale(this.pointsDistance[i], this.pointsDistance[i], 0),
                  this.gl.uniformMatrix4fv(this.modelMatrix, !1, r.elements),
                  this.gl.drawElements(
                    this.gl.TRIANGLES,
                    this.indicesNumber,
                    this.gl.UNSIGNED_BYTE,
                    0
                  );
              });
            else {
              const e = new t();
              this.gl.uniformMatrix4fv(this.modelMatrix, !1, e.elements),
                this.gl.drawElements(
                  this.gl.TRIANGLES,
                  this.indicesNumber,
                  this.gl.UNSIGNED_BYTE,
                  0
                );
            }
          }
          updatePointsAndDistances(t, e) {
            (this.points = t), (this.pointsDistance = e);
          }
          #t() {
            const t = i(15),
              r = i(106)
                .replace("VALUE_TO_COLOR", this.options.valueToColor)
                .replace("VALUE_TO_COLOR_4", this.options.valueToColor4),
              h = e(this.gl, t),
              a = s(this.gl, r);
            this.program = n(this.gl, h, a);
          }
          #e() {
            (this.aPosition = this.gl.getAttribLocation(
              this.program,
              "a_Position"
            )),
              (this.uMvpMatrix = this.gl.getUniformLocation(
                this.program,
                "u_MvpMatrix"
              )),
              (this.uIDWTexture = this.gl.getUniformLocation(
                this.program,
                "u_IDWTexture"
              )),
              (this.uFramebufferSize = this.gl.getUniformLocation(
                this.program,
                "u_FramebufferSize"
              )),
              (this.uOpacity = this.gl.getUniformLocation(
                this.program,
                "u_Opacity"
              )),
              (this.uAverageThreshold = this.gl.getUniformLocation(
                this.program,
                "u_AverageThreshold"
              )),
              (this.uAverage = this.gl.getUniformLocation(
                this.program,
                "u_Average"
              )),
              (this.modelMatrix = this.gl.getUniformLocation(
                this.program,
                "modelMatrix"
              ));
          }
          #i() {
            const t = [];
            let e = [];
            if (
              this.options.pointRadius > 0 &&
              !this.options.fasterPointRadius
            ) {
              const i = 50,
                r = (2 * Math.PI) / i;
              t.push(0, 0);
              for (let s = 0; s < i + 1; s++) {
                const n = s * r,
                  h = Math.cos(n),
                  a = Math.sin(n);
                t.push(h, a), s < i && e.push(0, s + 1, s + 2);
              }
            } else
              0 == this.options.roi.length
                ? t.push(-1, -1, -1, 1, 1, 1, 1, -1)
                : this.options.roi.forEach((e) => {
                    const i = mapboxgl.MercatorCoordinate.fromLngLat(e);
                    t.push(i.x, i.y);
                  }),
                (e = u()(t));
            (this.verticesBuffer = this.gl.createBuffer()),
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer),
              this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array(t),
                this.gl.STATIC_DRAW
              ),
              (this.indicesBuffer = this.gl.createBuffer()),
              this.gl.bindBuffer(
                this.gl.ELEMENT_ARRAY_BUFFER,
                this.indicesBuffer
              ),
              this.gl.bufferData(
                this.gl.ELEMENT_ARRAY_BUFFER,
                new Uint8Array(e),
                this.gl.STATIC_DRAW
              ),
              (this.indicesNumber = e.length);
          }
          #r() {
            (this.texture = this.gl.createTexture()),
              this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                this.gl.CLAMP_TO_EDGE
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                this.gl.CLAMP_TO_EDGE
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MAG_FILTER,
                this.gl.NEAREST
              ),
              this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MIN_FILTER,
                this.gl.NEAREST
              ),
              this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.framebufferWidth,
                this.framebufferHeight,
                0,
                this.gl.RGBA,
                this.gl.FLOAT,
                null
              ),
              this.gl.bindTexture(this.gl.TEXTURE_2D, null);
          }
          #s() {
            (this.framebuffer = this.gl.createFramebuffer()),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer),
              this.gl.framebufferTexture2D(
                this.gl.FRAMEBUFFER,
                this.gl.COLOR_ATTACHMENT0,
                this.gl.TEXTURE_2D,
                this.texture,
                0
              ),
              this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
          }
        }
        class l {
          constructor(t) {
            (this.gl = t), this.#t(), this.#e(), this.#i();
          }
          delete() {
            this.gl.deleteBuffer(this.verticesBuffer);
          }
          draw(t, e, i) {
            this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null),
              this.gl.viewport(0, 0, e.width, e.height),
              this.gl.enable(this.gl.DEPTH_TEST),
              this.gl.enable(this.gl.BLEND),
              this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA),
              this.gl.useProgram(this.program),
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer),
              this.gl.enableVertexAttribArray(this.aPosition),
              this.gl.vertexAttribPointer(
                this.aPosition,
                2,
                this.gl.FLOAT,
                !1,
                0,
                0
              ),
              this.gl.activeTexture(this.gl.TEXTURE0),
              this.gl.bindTexture(this.gl.TEXTURE_2D, i),
              this.gl.uniform1i(this.uROITexture, 0),
              this.gl.uniform2f(this.uScreenSize, e.width, e.height),
              this.gl.uniformMatrix4fv(this.uMvpMatrix, !1, t),
              this.gl.drawArrays(
                this.gl.TRIANGLE_STRIP,
                0,
                this.verticesNumber
              );
          }
          #t() {
            const t = i(928),
              r = i(825),
              h = e(this.gl, t),
              a = s(this.gl, r);
            this.program = n(this.gl, h, a);
          }
          #e() {
            (this.aPosition = this.gl.getAttribLocation(
              this.program,
              "a_Position"
            )),
              (this.uMvpMatrix = this.gl.getUniformLocation(
                this.program,
                "u_MvpMatrix"
              )),
              (this.uROITexture = this.gl.getUniformLocation(
                this.program,
                "u_ROITexture"
              )),
              (this.uScreenSize = this.gl.getUniformLocation(
                this.program,
                "u_ScreenSize"
              ));
          }
          #i() {
            (this.verticesBuffer = this.gl.createBuffer()),
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.verticesBuffer),
              this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]),
                this.gl.STATIC_DRAW
              ),
              (this.verticesNumber = 4);
          }
        }
        class g {
          constructor(t) {
            this.options = t;
          }
          init(t, e) {
            if (
              ((this.canvas = e),
              !t.getExtension("OES_texture_float") ||
                !t.getExtension("WEBGL_color_buffer_float") ||
                !t.getExtension("EXT_float_blend"))
            )
              throw "WebGL extension not supported";
            this.#n(),
              this.#h(),
              (this.idw = new a(
                t,
                this.framebufferWidth,
                this.framebufferHeight,
                this.points,
                this.pointsDistance,
                this.options
              )),
              (this.roi = new f(
                t,
                this.framebufferWidth,
                this.framebufferHeight,
                this.points,
                this.pointsDistance,
                this.average,
                this.options
              )),
              (this.draw = new l(t));
          }
          resizeFramebuffer() {
            this.#h(),
              this.idw.setFrameBufferSize(
                this.framebufferWidth,
                this.framebufferHeight
              ),
              this.roi.setFrameBufferSize(
                this.framebufferWidth,
                this.framebufferHeight
              );
          }
          delete() {
            this.idw.delete(), this.roi.delete(), this.draw.delete();
          }
          preRender(t) {
            this.idw.draw(t), this.roi.draw(t, this.idw.texture, this.canvas);
          }
          render(t) {
            this.draw.draw(t, this.canvas, this.roi.texture);
          }
          updatePoints(t) {
            (this.options.points = t),
              this.#n(),
              this.idw.updatePointsAndDistances(
                this.points,
                this.pointsDistance
              ),
              this.roi.updatePointsAndDistances(
                this.points,
                this.pointsDistance
              );
          }
          #n() {
            (this.points = []), (this.pointsDistance = []);
            let t = 1 / 0,
              e = -1 / 0;
            this.options.points.forEach((i) => {
              const r = mapboxgl.MercatorCoordinate.fromLngLat(i);
              this.points.push([r.x, r.y, i.val]),
                this.pointsDistance.push(
                  r.meterInMercatorCoordinateUnits() * this.options.pointRadius
                ),
                i.val < t && (t = i.val),
                i.val > e && (e = i.val);
            }),
              (t = t < this.options.minValue ? t : this.options.minValue),
              (e = e > this.options.maxValue ? e : this.options.maxValue),
              (this.average = 0),
              this.points.forEach((i) => {
                (i[2] = (i[2] - t) / (e - t)), (this.average += i[2]);
              }),
              (this.average /= this.points.length);
          }
          #h() {
            (this.framebufferWidth = Math.ceil(
              this.canvas.width * this.options.framebufferFactor
            )),
              (this.framebufferHeight = Math.ceil(
                this.canvas.height * this.options.framebufferFactor
              ));
          }
        }
        function x(t) {
          const e = {
            layerId: "",
            opacity: 0.5,
            minValue: 1 / 0,
            maxValue: -1 / 0,
            p: 3,
            framebufferFactor: 0.3,
            points: [],
            roi: [],
            averageThreshold: 0,
            valueToColor:
              "\n            vec3 valueToColor(float value) {\n                return vec3(max((value-0.5)*2.0, 0.0), 1.0 - 2.0*abs(value - 0.5), max((0.5-value)*2.0, 0.0));\n            }\n        ",
            valueToColor4:
              "\n            vec4 valueToColor4(float value, float defaultOpacity) {\n                return vec4(valueToColor(value), defaultOpacity);\n            }\n        ",
            pointRadius: 0,
            fasterPointRadius: !1,
          };
          if ("object" == typeof t) for (let i in t) e[i] = t[i];
          const i = new g(e);
          return {
            id: e.layerId,
            type: "custom",
            onAdd: function (t, e) {
              i.init(e, t._canvas),
                (this.resizeFramebuffer = () => {
                  i.resizeFramebuffer();
                }),
                t.on("resize", this.resizeFramebuffer);
            },
            onRemove: function (t, e) {
              i.delete(), t.off("resize", this.resizeFramebuffer);
            },
            prerender: function (t, e) {
              i.preRender(e);
            },
            render: function (t, e) {
              i.render(e);
            },
            updatePoints: function (t) {
              i.updatePoints(t);
            },
          };
        }
      })(),
      r
    );
  })()
);

(() => {
    "use strict";
    /*! License details at fancyapps.com/license */
    const isPlainObject_t = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t);
    /*! License details at fancyapps.com/license */
    const isString_t = t => "string" == typeof t;
    /*! License details at fancyapps.com/license */
    const isNode_n = n => n && null !== n && n instanceof Element && "nodeType" in n;
    /*! License details at fancyapps.com/license */
    const strToHtml_e = function(e) {
        var t = (new DOMParser).parseFromString(e, "text/html").body;
        if (t.childElementCount > 1) {
            for (var n = document.createElement("div"); t.firstChild; ) n.appendChild(t.firstChild);
            return n;
        }
        let r = t.firstChild;
        return !r || r instanceof HTMLElement ? r : ((n = document.createElement("div")).appendChild(r), 
        n);
    };
    /*! License details at fancyapps.com/license */
    const e = function(e) {
        if (!(e && e instanceof Element && e.offsetParent)) return !1;
        let n = !1, i = !1;
        if (e.scrollWidth > e.clientWidth) {
            const i = window.getComputedStyle(e).overflowX, t = -1 !== i.indexOf("hidden"), o = -1 !== i.indexOf("clip"), d = -1 !== i.indexOf("visible");
            n = !t && !o && !d;
        }
        if (e.scrollHeight > e.clientHeight) {
            const n = window.getComputedStyle(e).overflowY, t = -1 !== n.indexOf("hidden"), o = -1 !== n.indexOf("clip"), d = -1 !== n.indexOf("visible");
            i = !t && !o && !d;
        }
        return n || i;
    }, getScrollableParent_n = function(i, t = void 0) {
        return !i || i === document.body || t && i === t ? null : e(i) ? i : getScrollableParent_n(i.parentElement, t);
    };
    /*! License details at fancyapps.com/license */
    const scrollLock_t = (t = !0, e = "--f-scrollbar-compensate", s = "--f-body-margin", o = "hide-scrollbar") => {
        const n = document, r = n.body, l = n.documentElement;
        if (t) {
            if (r.classList.contains(o)) return;
            let t = window.innerWidth - l.getBoundingClientRect().width;
            t < 0 && (t = 0), l.style.setProperty(e, `${t}px`);
            const n = parseFloat(window.getComputedStyle(r).marginRight);
            n && r.style.setProperty(s, `${n}px`), r.classList.add(o);
        } else r.classList.remove(o), r.style.setProperty(s, ""), n.documentElement.style.setProperty(e, "");
    };
    /*! License details at fancyapps.com/license */
    const extend_r = (t, ...e) => {
        const n = e.length;
        for (let c = 0; c < n; c++) {
            const n = e[c] || {};
            Object.entries(n).forEach(([e, n]) => {
                const c = Array.isArray(n) ? [] : {};
                t[e] || Object.assign(t, {
                    [e]: c
                }), isPlainObject_t(n) ? Object.assign(t[e], extend_r(t[e], n)) : Array.isArray(n) ? Object.assign(t, {
                    [e]: [ ...n ]
                }) : Object.assign(t, {
                    [e]: n
                });
            });
        }
        return t;
    };
    /*! License details at fancyapps.com/license */
    function canUseDOM_e() {
        return !("undefined" == typeof window || !window.document || !window.document.createElement);
    }
    /*! License details at fancyapps.com/license */
    const clamp_t = function(t = 0, n = 0, a = 0) {
        return Math.max(Math.min(n, a), t);
    };
    /*! License details at fancyapps.com/license */
    const map_t = function(t = 0, n = 0, r = 0, c = 0, m = 0, p = !1) {
        const s = (t - n) / (r - n) * (m - c) + c;
        return p ? c < m ? clamp_t(c, s, m) : clamp_t(m, s, c) : s;
    };
    /*! License details at fancyapps.com/license */
    const addClass_s = (s, t = "") => {
        s && s.classList && t.split(" ").forEach(t => {
            t && s.classList.add(t);
        });
    };
    /*! License details at fancyapps.com/license */
    const removeClass_s = (s, t = "") => {
        s && s.classList && t.split(" ").forEach(t => {
            t && s.classList.remove(t);
        });
    };
    /*! License details at fancyapps.com/license */
    const toggleClass_s = (s, t = "", c) => {
        s && s.classList && t.split(" ").forEach(t => {
            t && s.classList.toggle(t, c || !1);
        });
    };
    /*! License details at fancyapps.com/license */
    function isEqual_e(e) {
        return isPlainObject_t(e) || Array.isArray(e);
    }
    function isEqual_n(t, r) {
        const o = Object.keys(t), c = Object.keys(r);
        return o.length === c.length && o.every(o => {
            const c = t[o], i = r[o];
            return "function" == typeof c ? `${c}` == `${i}` : isEqual_e(c) && isEqual_e(i) ? isEqual_n(c, i) : c === i;
        });
    }
    /*! License details at fancyapps.com/license */
    const tween_e = function(n) {
        for (const t of s) t.getState() === i.Running && t.tick(a ? n - a : 0);
        a = n, u = window.requestAnimationFrame(tween_e);
    };
    var i, o, r;
    !function(n) {
        n[n.Initializing = 0] = "Initializing", n[n.Running = 1] = "Running", n[n.Paused = 2] = "Paused", 
        n[n.Completed = 3] = "Completed", n[n.Destroyed = 4] = "Destroyed";
    }(i || (i = {})), function(n) {
        n[n.Spring = 0] = "Spring", n[n.Ease = 1] = "Ease";
    }(o || (o = {})), function(n) {
        n[n.Loop = 0] = "Loop", n[n.Reverse = 1] = "Reverse";
    }(r || (r = {}));
    const s = new Set;
    let u = null, a = 0;
    function tween_c() {
        let a = i.Initializing, f = o.Ease, l = 0, g = 0, p = tween_c.Easings.Linear, m = 500, d = 0, b = 0, S = 0, h = 0, y = 1 / 0, E = .01, R = .01, M = !1, j = {}, w = null, v = {}, O = {}, C = {}, L = 0, I = 0, D = r.Loop, z = tween_c.Easings.Linear;
        const N = new Map;
        function V(n, ...t) {
            for (const e of N.get(n) || []) e(...t);
        }
        function q(n) {
            return g = 0, n ? w = setTimeout(() => {
                x();
            }, n) : x(), F;
        }
        function x() {
            a = i.Running, V("start", v, O);
        }
        function A() {
            if (a = i.Completed, C = {}, V("end", v), a === i.Completed) if (l < L) {
                if (l++, D === r.Reverse) {
                    const n = Object.assign({}, j);
                    j = Object.assign({}, O), O = n;
                }
                q(I);
            } else l = 0;
            return F;
        }
        const F = {
            getState: function() {
                return a;
            },
            easing: function(n) {
                return p = n, f = o.Ease, C = {}, F;
            },
            duration: function(n) {
                return m = n, F;
            },
            spring: function(n = {}) {
                f = o.Spring;
                const t = {
                    velocity: 0,
                    mass: 1,
                    tension: 170,
                    friction: 26,
                    restDelta: .1,
                    restSpeed: .1,
                    maxSpeed: 1 / 0,
                    clamp: !0
                }, {velocity: e, mass: i, tension: r, friction: s, restDelta: u, restSpeed: a, maxSpeed: c, clamp: l} = Object.assign(Object.assign({}, t), n);
                return d = e, b = i, S = r, h = s, R = u, E = a, y = c, M = l, C = {}, F;
            },
            isRunning: function() {
                return a === i.Running;
            },
            isSpring: function() {
                return f === o.Spring;
            },
            from: function(n) {
                return v = Object.assign({}, n), F;
            },
            to: function(n) {
                return O = n, F;
            },
            repeat: function(n, t = 0, e = r.Loop, i) {
                return L = n, I = t, D = e, z = i || p, F;
            },
            on: function(n, t) {
                var e, i;
                return e = n, i = t, N.set(e, [ ...N.get(e) || [], i ]), F;
            },
            off: function(n, t) {
                var e, i;
                return e = n, i = t, N.has(e) && N.set(e, N.get(e).filter(n => n !== i)), F;
            },
            start: function(n) {
                return isEqual_n(v, O) || (a = i.Initializing, j = Object.assign({}, v), s.add(this), 
                u || (u = window.requestAnimationFrame(tween_e)), q(n)), F;
            },
            pause: function() {
                return w && (clearTimeout(w), w = null), a === i.Running && (a = i.Paused, V("pause", v)), 
                F;
            },
            end: A,
            tick: function(e) {
                e > 50 && (e = 50), g += e;
                let s = 0, u = !1;
                if (a !== i.Running) return F;
                if (f === o.Ease) {
                    s = clamp_t(0, g / m, 1), u = 1 === s;
                    const t = D === r.Reverse ? z : p;
                    for (const n in v) v[n] = j[n] + (O[n] - j[n]) * t(s);
                }
                if (f === o.Spring) {
                    const t = .001 * e;
                    let i = 0;
                    for (const e in v) {
                        const o = O[e];
                        let r = v[e];
                        if ("number" != typeof o || isNaN(o) || "number" != typeof r || isNaN(r)) continue;
                        if (Math.abs(o - r) <= R) {
                            v[e] = o, C[e] = 0;
                            continue;
                        }
                        C[e] || ("object" == typeof d && "number" == typeof d[e] ? C[e] = d[e] : C[e] = "number" == typeof d ? d : 0);
                        let s = C[e];
                        s = clamp_t(-1 * Math.abs(y), s, Math.abs(y));
                        const u = s * b * h;
                        s += ((r > o ? -1 : 1) * (Math.abs(o - r) * S) - u) / b * t, r += s * t;
                        const a = v[e] > o ? r < o : r > o;
                        let c = Math.abs(s) < E && Math.abs(o - r) <= R;
                        M && a && (c = !0), c ? (r = o, s = 0) : i++, v[e] = r, C[e] = s;
                    }
                    u = !i;
                }
                const c = Object.assign({}, O);
                return V("step", v, j, O, s), u && a === i.Running && isEqual_n(O, c) && (a = i.Completed, 
                A()), F;
            },
            getStartValues: function() {
                return j;
            },
            getCurrentValues: function() {
                return v;
            },
            getCurrentVelocities: function() {
                return C;
            },
            getEndValues: function() {
                return O;
            },
            destroy: function() {
                a = i.Destroyed, w && (clearTimeout(w), w = null), j = v = O = {}, s.delete(this);
            }
        };
        return F;
    }
    tween_c.destroy = () => {
        for (const n of s) n.destroy();
        u && (cancelAnimationFrame(u), u = null);
    }, tween_c.Easings = {
        Linear: function(n) {
            return n;
        },
        EaseIn: function(n) {
            return 0 === n ? 0 : Math.pow(2, 10 * n - 10);
        },
        EaseOut: function(n) {
            return 1 === n ? 1 : 1 - Math.pow(2, -10 * n);
        },
        EaseInOut: function(n) {
            return 0 === n ? 0 : 1 === n ? 1 : n < .5 ? Math.pow(2, 20 * n - 10) / 2 : (2 - Math.pow(2, -20 * n + 10)) / 2;
        }
    };
    /*! License details at fancyapps.com/license */
    function gestures_e(e) {
        return "undefined" != typeof TouchEvent && e instanceof TouchEvent;
    }
    function t(t, n) {
        const o = [], s = gestures_e(t) ? t[n] : t instanceof MouseEvent && ("changedTouches" === n || "mouseup" !== t.type) ? [ t ] : [];
        for (const e of s) o.push({
            x: e.clientX,
            y: e.clientY,
            ts: Date.now()
        });
        return o;
    }
    function n(e) {
        return t(e, "touches");
    }
    function gestures_o(e) {
        return t(e, "targetTouches");
    }
    function gestures_s(e) {
        return t(e, "changedTouches");
    }
    function gestures_i(e) {
        const t = e[0], n = e[1] || t;
        return {
            x: (t.x + n.x) / 2,
            y: (t.y + n.y) / 2,
            ts: n.ts
        };
    }
    function gestures_r(e) {
        const t = e[0], n = e[1] || e[0];
        return t && n ? -1 * Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y)) : 0;
    }
    const c = e => {
        e.cancelable && e.preventDefault();
    }, gestures_a = {
        passive: !1
    }, gestures_u = {
        panThreshold: 5,
        swipeThreshold: 3,
        ignore: [ "textarea", "input", "select", "[contenteditable]", "[data-selectable]", "[data-draggable]" ]
    };
    let l = !1, d = !0;
    const f = (e, t) => {
        let f, h, v, g = Object.assign(Object.assign({}, gestures_u), t), p = [], m = [], E = [], w = !1, y = !1, T = !1, b = !1, M = 0, x = 0, L = 0, P = 0, D = 0, X = 0, Y = 0, j = 0, k = 0, R = [], z = 0, A = 0;
        const O = new Map;
        function S(e) {
            const t = gestures_r(m), n = gestures_r(E), o = t && n ? t / n : 0, s = Math.abs(Y) > Math.abs(j) ? Y : j, i = {
                srcEvent: f,
                isPanRecognized: w,
                isSwipeRecognized: y,
                firstTouch: p,
                previousTouch: E,
                currentTouch: m,
                deltaX: L,
                deltaY: P,
                offsetX: D,
                offsetY: X,
                velocityX: Y,
                velocityY: j,
                velocity: s,
                angle: k,
                axis: v,
                scale: o,
                center: h
            };
            for (const t of O.get(e) || []) t(i);
        }
        function q(e) {
            const t = e.target, n = e.composedPath()[0], o = g.ignore.join(","), s = e => e && (e.matches(o) || e.closest(o));
            if (s(t) || s(n)) return !1;
        }
        function C(e) {
            const t = Date.now();
            if (R = R.filter(e => !e.ts || e.ts > t - 100), e && R.push(e), Y = 0, j = 0, R.length > 3) {
                const e = R[0], t = R[R.length - 1];
                if (e && t) {
                    const n = t.x - e.x, o = t.y - e.y, s = e.ts && t.ts ? t.ts - e.ts : 0;
                    s > 0 && (Y = Math.abs(n) > 3 ? n / (s / 30) : 0, j = Math.abs(o) > 3 ? o / (s / 30) : 0);
                }
            }
        }
        function I(e) {
            if (!1 === q(e)) return;
            if ("undefined" != typeof MouseEvent && e instanceof MouseEvent) {
                if (l) return;
            } else l = !0;
            if ("undefined" != typeof MouseEvent && e instanceof MouseEvent) {
                if (!e.buttons || 0 !== e.button) return;
                c(e);
            }
            e instanceof MouseEvent && (window.addEventListener("mousemove", B), window.addEventListener("mouseup", F)), 
            window.addEventListener("blur", G), f = e, m = gestures_o(e), p = [ ...m ], E = [], 
            x = m.length, h = gestures_i(m), 1 === x && (w = !1, y = !1, T = !1), x && C(gestures_i(m));
            const t = Date.now(), n = t - (M || t);
            b = n > 0 && n <= 250 && 1 === x, M = t, clearTimeout(z), S("start");
        }
        function B(e) {
            var t;
            if (!p.length) return;
            if (e.defaultPrevented) return;
            if (!1 === q(e)) return;
            f = e, E = [ ...m ], m = n(e);
            const o = gestures_i(E), s = gestures_i(n(e));
            if (C(s), x = m.length, h = s, E.length === m.length ? (L = s.x - o.x, P = s.y - o.y) : (L = 0, 
            P = 0), p.length) {
                const e = gestures_i(p);
                D = s.x - e.x, X = s.y - e.y;
            }
            if (m.length > 1) {
                const e = gestures_r(m), t = gestures_r(E);
                Math.abs(e - t) >= .1 && (T = !0, S("pinch"));
            }
            w || (w = Math.abs(D) > g.panThreshold || Math.abs(X) > g.panThreshold, w && (d = !1, 
            clearTimeout(A), A = 0, k = Math.abs(180 * Math.atan2(X, D) / Math.PI), v = k > 45 && k < 135 ? "y" : "x", 
            p = [ ...m ], E = [ ...m ], D = 0, X = 0, L = 0, P = 0, null === (t = window.getSelection()) || void 0 === t || t.removeAllRanges(), 
            S("panstart"))), w && (L || P) && S("pan"), S("move");
        }
        function F(e) {
            if (f = e, !p.length) return;
            const t = gestures_o(e), n = gestures_s(e);
            if (x = t.length, h = gestures_i(n), n.length && C(gestures_i(n)), E = [ ...m ], 
            m = [ ...t ], p = [ ...t ], x > 0) S("end"), w = !1, y = !1, R = []; else {
                const e = g.swipeThreshold;
                (Math.abs(Y) > e || Math.abs(j) > e) && (y = !0), w && S("panend"), y && S("swipe"), 
                w || y || T || (S("tap"), b ? S("doubleTap") : z = setTimeout(function() {
                    S("singleTap");
                }, 250)), S("end"), H();
            }
        }
        function G() {
            clearTimeout(z), H(), w && S("panend"), S("end");
        }
        function H() {
            l = !1, w = !1, y = !1, b = !1, x = 0, R = [], m = [], E = [], p = [], L = 0, P = 0, 
            D = 0, X = 0, Y = 0, j = 0, k = 0, v = void 0, window.removeEventListener("mousemove", B), 
            window.removeEventListener("mouseup", F), window.removeEventListener("blur", G), 
            d || A || (A = setTimeout(() => {
                d = !0, A = 0;
            }, 100));
        }
        function J(e) {
            const t = e.target;
            l = !1, t && !e.defaultPrevented && (d || (c(e), e.stopPropagation()));
        }
        const K = {
            init: function() {
                return e && (e.addEventListener("click", J, gestures_a), e.addEventListener("mousedown", I, gestures_a), 
                e.addEventListener("touchstart", I, gestures_a), e.addEventListener("touchmove", B, gestures_a), 
                e.addEventListener("touchend", F), e.addEventListener("touchcancel", F)), K;
            },
            on: function(e, t) {
                return function(e, t) {
                    O.set(e, [ ...O.get(e) || [], t ]);
                }(e, t), K;
            },
            off: function(e, t) {
                return O.has(e) && O.set(e, O.get(e).filter(e => e !== t)), K;
            },
            isPointerDown: () => x > 0,
            destroy: function() {
                clearTimeout(z), clearTimeout(A), A = 0, e && (e.removeEventListener("click", J, gestures_a), 
                e.removeEventListener("mousedown", I, gestures_a), e.removeEventListener("touchstart", I, gestures_a), 
                e.removeEventListener("touchmove", B, gestures_a), e.removeEventListener("touchend", F), 
                e.removeEventListener("touchcancel", F)), e = null, H();
            }
        };
        return K;
    };
    f.isClickAllowed = () => d;
    /*! License details at fancyapps.com/license */
    const en_EN_e = {
        IMAGE_ERROR: "This image couldn't be loaded. <br /> Please try again later.",
        MOVE_UP: "Move up",
        MOVE_DOWN: "Move down",
        MOVE_LEFT: "Move left",
        MOVE_RIGHT: "Move right",
        ZOOM_IN: "Zoom in",
        ZOOM_OUT: "Zoom out",
        TOGGLE_FULL: "Toggle zoom level",
        TOGGLE_1TO1: "Toggle zoom level",
        ITERATE_ZOOM: "Toggle zoom level",
        ROTATE_CCW: "Rotate counterclockwise",
        ROTATE_CW: "Rotate clockwise",
        FLIP_X: "Flip horizontally",
        FLIP_Y: "Flip vertically",
        RESET: "Reset",
        TOGGLE_FS: "Toggle fullscreen"
    };
    /*! License details at fancyapps.com/license */
    const h = e => {
        e.cancelable && e.preventDefault();
    }, m = (e, t = 1e4) => (e = parseFloat(e + "") || 0, Math.round((e + Number.EPSILON) * t) / t), p = e => e instanceof HTMLImageElement;
    var v, b;
    !function(e) {
        e.Reset = "reset", e.Zoom = "zoom", e.ZoomIn = "zoomIn", e.ZoomOut = "zoomOut", 
        e.ZoomTo = "zoomTo", e.ToggleCover = "toggleCover", e.ToggleFull = "toggleFull", 
        e.ToggleMax = "toggleMax", e.IterateZoom = "iterateZoom", e.Pan = "pan", e.Swipe = "swipe", 
        e.Move = "move", e.MoveLeft = "moveLeft", e.MoveRight = "moveRight", e.MoveUp = "moveUp", 
        e.MoveDown = "moveDown", e.RotateCCW = "rotateCCW", e.RotateCW = "rotateCW", e.FlipX = "flipX", 
        e.FlipY = "flipY", e.ToggleFS = "toggleFS";
    }(v || (v = {})), function(e) {
        e.Cover = "cover", e.Full = "full", e.Max = "max";
    }(b || (b = {}));
    const y = {
        x: 0,
        y: 0,
        scale: 1,
        angle: 0,
        flipX: 1,
        flipY: 1
    }, x = {
        bounds: !0,
        classes: {
            container: "f-panzoom",
            wrapper: "f-panzoom__wrapper",
            content: "f-panzoom__content",
            viewport: "f-panzoom__viewport"
        },
        clickAction: v.ToggleFull,
        dblClickAction: !1,
        gestures: {},
        height: "auto",
        l10n: en_EN_e,
        maxScale: 4,
        minScale: 1,
        mouseMoveFactor: 1,
        panMode: "drag",
        protected: !1,
        singleClickAction: !1,
        spinnerTpl: '<div class="f-spinner"></div>',
        wheelAction: v.Zoom,
        width: "auto"
    };
    let w, M = 0, k = 0, j = 0;
    const E = (c, b = {}, E = {}) => {
        let S, O, A, C, T, F, Z, L, P = 0, X = Object.assign(Object.assign({}, x), b), Y = {}, R = Object.assign({}, y), z = Object.assign({}, y);
        const D = [];
        function I(e) {
            let t = X[e];
            return t && "function" == typeof t ? t(je) : t;
        }
        function W() {
            return c && c.parentElement && S && 3 === P;
        }
        const q = new Map;
        function H(e, ...t) {
            const n = [ ...q.get(e) || [] ];
            X.on && n.push(X.on[e]);
            for (const e of n) e && e instanceof Function && e(je, ...t);
            "*" !== e && H("*", e, ...t);
        }
        function $(e) {
            if (!W()) return;
            const t = e.target;
            if (getScrollableParent_n(t)) return;
            const o = Date.now(), a = [ -e.deltaX || 0, -e.deltaY || 0, -e.detail || 0 ].reduce(function(e, t) {
                return Math.abs(t) > Math.abs(e) ? t : e;
            }), s = clamp_t(-1, a, 1);
            H("wheel", e, s);
            const r = I("wheelAction");
            if (!r) return;
            if (e.defaultPrevented) return;
            const l = z.scale;
            let c = l * (s > 0 ? 1.5 : .5);
            if (r === v.Zoom) {
                const t = Math.abs(e.deltaY) < 100 && Math.abs(e.deltaX) < 100;
                if (o - k < (t ? 200 : 45)) return void h(e);
                k = o;
                const n = ne(), a = se();
                if (m(c) < m(n) && m(l) <= m(n) ? (j += Math.abs(s), c = n) : m(c) > m(a) && m(l) >= m(a) ? (j += Math.abs(s), 
                c = a) : (j = 0, c = clamp_t(n, c, a)), j > 7) return;
            }
            switch (h(e), r) {
              case v.Pan:
                ue(r, {
                    srcEvent: e,
                    deltaX: 2 * -e.deltaX,
                    deltaY: 2 * -e.deltaY
                });
                break;

              case v.Zoom:
                ue(v.ZoomTo, {
                    srcEvent: e,
                    scale: c,
                    center: {
                        x: e.clientX,
                        y: e.clientY
                    }
                });
                break;

              default:
                ue(r, {
                    srcEvent: e
                });
            }
        }
        function _(e) {
            var n, o;
            const i = e.composedPath()[0];
            if (!f.isClickAllowed()) return;
            if (!isNode_n(i) || e.defaultPrevented) return;
            if (!(null == c ? void 0 : c.contains(i))) return;
            if (i.hasAttribute("disabled") || i.hasAttribute("aria-disabled") || i.hasAttribute("data-carousel-go-prev") || i.hasAttribute("data-carousel-go-next")) return;
            const a = i.closest("[data-panzoom-action]"), s = null === (n = null == a ? void 0 : a.dataset) || void 0 === n ? void 0 : n.panzoomAction, r = (null === (o = null == a ? void 0 : a.dataset) || void 0 === o ? void 0 : o.panzoomValue) || "";
            if (s) {
                switch (h(e), s) {
                  case v.ZoomTo:
                  case v.ZoomIn:
                  case v.ZoomOut:
                    ue(s, {
                        scale: parseFloat(r || "") || void 0
                    });
                    break;

                  case v.MoveLeft:
                  case v.MoveRight:
                    ue(s, {
                        deltaX: parseFloat(r || "") || void 0
                    });
                    break;

                  case v.MoveUp:
                  case v.MoveDown:
                    ue(s, {
                        deltaY: parseFloat(r || "") || void 0
                    });
                    break;

                  case v.ToggleFS:
                    Me();
                    break;

                  default:
                    ue(s);
                }
                return;
            }
            if (!(null == S ? void 0 : S.contains(i))) return;
            const u = {
                srcEvent: e
            };
            if (ue(I("clickAction"), u), I("dblClickAction")) {
                const e = Date.now(), t = e - (M || e);
                M = e, t > 0 && t <= 250 ? (w && (clearTimeout(w), w = void 0), ue(I("dblClickAction"), u)) : w = setTimeout(() => {
                    ue(I("singleClickAction"), u);
                }, 250);
            }
        }
        function B(e) {
            if (L = e, !W() || !Q()) return;
            if (R.scale <= 1 || z.scale <= 1) return;
            if (((null == S ? void 0 : S.dataset.animationName) || "").indexOf("zoom") > -1) return;
            const t = ee(z.scale);
            if (!t) return;
            const {x: n, y: o} = t;
            ue(v.Pan, {
                deltaX: n - z.x,
                deltaY: o - z.y
            });
        }
        function N() {
            var e;
            c && (removeClass_s(c, "is-loading"), null === (e = c.querySelector(".f-spinner")) || void 0 === e || e.remove());
        }
        function V() {
            if (!c || !O) return;
            if (N(), p(O) && (!O.complete || !O.naturalWidth)) return P = 2, null == S || S.classList.add("has-error"), 
            void H("error");
            H("loaded");
            const {width: e, height: t} = J();
            p(O) && (O.setAttribute("width", e + ""), O.setAttribute("height", t + "")), S && (removeClass_s(S, "has-error"), 
            p(O) && (S.setAttribute("width", e + ""), S.setAttribute("height", t + ""), S.style.aspectRatio = `${e / t || ""}`)), 
            F = tween_c().on("start", (e, t) => {
                void 0 !== t.angle && (t.angle = 90 * Math.round(t.angle / 90)), void 0 !== t.flipX && (t.flipX = t.flipX > 0 ? 1 : -1), 
                void 0 !== t.flipY && (t.flipY = t.flipY > 0 ? 1 : -1), z = Object.assign(Object.assign({}, y), t), 
                ce(), H("animationStart");
            }).on("pause", e => {
                z = Object.assign(Object.assign({}, y), e);
            }).on("step", e => {
                if (!W()) return void (null == F || F.end());
                if (R = Object.assign(Object.assign({}, y), e), Q() || !I("bounds") || ye() || z.scale > R.scale || z.scale < oe()) return void de();
                const t = re(z.scale);
                let n = !1, o = !1, a = !1, s = !1;
                R.x < t.x[0] && (n = !0), R.x > t.x[1] && (o = !0), R.y < t.y[0] && (s = !0), R.y > t.y[1] && (a = !0);
                let r = !1, l = !1, c = !1, u = !1;
                z.x < t.x[0] && (r = !0), z.x > t.x[1] && (l = !0), z.y < t.y[0] && (u = !0), z.y > t.y[1] && (c = !0);
                let d = !1;
                (o && l || n && r) && (z.x = clamp_t(t.x[0], z.x, t.x[1]), d = !0), (a && c || s && u) && (z.y = clamp_t(t.y[0], z.y, t.y[1]), 
                d = !0), d && F && F.spring({
                    tension: 94,
                    friction: 17,
                    maxSpeed: 555 * z.scale,
                    restDelta: .1,
                    restSpeed: .1,
                    velocity: F.getCurrentVelocities()
                }).from(R).to(z).start(), de();
            }).on("end", () => {
                (null == T ? void 0 : T.isPointerDown()) || le(), (null == F ? void 0 : F.isRunning()) || (ce(), 
                H("animationEnd"));
            }), function() {
                const e = I("gestures");
                if (!e) return;
                if (!C || !O) return;
                let t = !1;
                T = f(C, e).on("start", e => {
                    if (!I("gestures")) return;
                    if (!F) return;
                    if (!W() || Q()) return;
                    const n = e.srcEvent;
                    (R.scale > 1 || e.currentTouch.length > 1) && (null == n || n.stopPropagation(), 
                    F.pause(), t = !0), 1 === e.currentTouch.length && H("touchStart");
                }).on("move", e => {
                    var n;
                    t && (1 !== z.scale || e.currentTouch.length > 1) && (h(e.srcEvent), null === (n = e.srcEvent) || void 0 === n || n.stopPropagation());
                }).on("pan", e => {
                    if (!t) return;
                    const n = e.srcEvent;
                    (1 !== z.scale || e.currentTouch.length > 1) && (h(n), ue(v.Pan, e));
                }).on("swipe", e => {
                    t && z.scale > 1 && ue(v.Swipe, e);
                }).on("tap", e => {
                    H("click", e);
                }).on("singleTap", e => {
                    H("singleClick", e);
                }).on("doubleTap", e => {
                    H("dblClick", e);
                }).on("pinch", e => {
                    t && (e.scale > oe() ? ue(v.ZoomIn, e) : e.scale < oe() ? ue(v.ZoomOut, e) : ue(v.Pan, e));
                }).on("end", e => {
                    t && (e.currentTouch.length ? (e.srcEvent.stopPropagation(), h(e.srcEvent), null == F || F.end()) : (t = !1, 
                    ce(), le(), H("touchEnd")));
                }).init();
            }(), C && (C.addEventListener("wheel", $, {
                passive: !1
            }), D.push(() => {
                null == C || C.removeEventListener("wheel", $, {
                    passive: !1
                });
            })), null == c || c.addEventListener("click", _), null === document || void 0 === document || document.addEventListener("mousemove", B), 
            D.push(() => {
                null == c || c.removeEventListener("click", _), null === document || void 0 === document || document.removeEventListener("mousemove", B);
            });
            const n = U();
            R = Object.assign({}, n), z = Object.assign({}, n), P = 3, de(), ce(), H("ready"), 
            requestAnimationFrame(() => {
                N(), C && (C.style.visibility = "");
            });
        }
        function U() {
            const e = Object.assign({}, I("startPos") || {});
            let t = e.scale, n = 1;
            n = "string" == typeof t ? te(t) : "number" == typeof t ? t : oe();
            const o = Object.assign(Object.assign(Object.assign({}, y), e), {
                scale: n
            }), i = Q() ? ee(n) : void 0;
            if (i) {
                const {x: e, y: t} = i;
                o.x = e, o.y = t;
            }
            return o;
        }
        function G() {
            const e = {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            };
            if (S) {
                const t = S.getBoundingClientRect();
                z.angle % 180 == 90 ? (e.top = t.top + .5 * t.height - .5 * t.width, e.left = t.left + .5 * t.width - .5 * t.height, 
                e.width = t.height, e.height = t.width) : (e.top = t.top, e.left = t.left, e.width = t.width, 
                e.height = t.height);
            }
            return e;
        }
        function J() {
            let t = I("width"), n = I("height");
            if (O && "auto" === t) {
                const e = O.getAttribute("width");
                t = e ? parseFloat(e + "") : void 0 !== O.dataset.width ? parseFloat(O.dataset.width + "") : p(C) ? C.naturalWidth : p(O) ? O.naturalWidth : (null == S ? void 0 : S.getBoundingClientRect().width) || 0;
            } else t = isString_t(t) ? parseFloat(t) : t;
            if (O && "auto" === n) {
                const e = O.getAttribute("height");
                n = e ? parseFloat(e + "") : void 0 !== O.dataset.height ? parseFloat(O.dataset.height + "") : p(C) ? C.naturalHeight : p(O) ? O.naturalHeight : (null == S ? void 0 : S.getBoundingClientRect().height) || 0;
            } else n = isString_t(n) ? parseFloat(n) : n;
            return {
                width: t,
                height: n
            };
        }
        function K() {
            const e = G();
            return {
                width: e.width,
                height: e.height
            };
        }
        function Q() {
            return "mousemove" === I("panMode") && matchMedia("(hover: hover)").matches;
        }
        function ee(e) {
            const t = L || I("event"), n = null == S ? void 0 : S.getBoundingClientRect();
            if (!t || !n || e <= 1) return {
                x: 0,
                y: 0
            };
            const o = (t.clientX || 0) - n.left, a = (t.clientY || 0) - n.top, {width: s, height: r} = K(), l = re(e);
            if (e > 1) {
                const t = I("mouseMoveFactor");
                t > 1 && (e *= t);
            }
            let c = s * e, u = r * e, d = .5 * (c - s) - o / s * 100 / 100 * (c - s), f = .5 * (u - r) - a / r * 100 / 100 * (u - r);
            return d = clamp_t(l.x[0], d, l.x[1]), f = clamp_t(l.y[0], f, l.y[1]), {
                x: d,
                y: f
            };
        }
        function te(e = "base") {
            if (!c) return 1;
            const t = c.getBoundingClientRect(), n = G(), {width: o, height: a} = J(), s = e => {
                if ("number" == typeof e) return e;
                switch (e) {
                  case "min":
                  case "base":
                    return 1;

                  case "cover":
                    return Math.max(t.height / n.height, t.width / n.width) || 1;

                  case "full":
                  case "max":
                    {
                        const e = z.angle % 180 == 90 ? a : o;
                        return e && n.width ? e / n.width : 1;
                    }
                }
            }, r = I("minScale"), l = I("maxScale"), u = Math.min(s("full"), s(r)), d = "number" == typeof l ? s("full") * l : Math.min(s("full"), s(l));
            switch (e) {
              case "min":
                return u;

              case "base":
                return clamp_t(u, 1, d);

              case "cover":
                return s("cover");

              case "full":
                return Math.min(d, s("full"));

              case "max":
                return d;
            }
        }
        function ne() {
            return te("min");
        }
        function oe() {
            return te("base");
        }
        function ie() {
            return te("cover");
        }
        function ae() {
            return te("full");
        }
        function se() {
            return te("max");
        }
        function re(e) {
            const t = {
                x: [ 0, 0 ],
                y: [ 0, 0 ]
            }, n = null == c ? void 0 : c.getBoundingClientRect();
            if (!n) return t;
            const o = G(), i = n.width, a = n.height;
            let s = o.width, r = o.height, l = e = void 0 === e ? z.scale : e, u = e;
            if (Q() && e > 1) {
                const t = I("mouseMoveFactor");
                t > 1 && (s * e > i + .01 && (l *= t), r * e > a + .01 && (u *= t));
            }
            return s *= l, r *= u, e > 1 && (s > i && (t.x[0] = .5 * (i - s), t.x[1] = .5 * (s - i)), 
            t.x[0] -= .5 * (o.left - n.left), t.x[1] -= .5 * (o.left - n.left), t.x[0] -= .5 * (o.left + o.width - n.right), 
            t.x[1] -= .5 * (o.left + o.width - n.right), r > a && (t.y[0] = .5 * (a - r), t.y[1] = .5 * (r - a)), 
            t.y[0] -= .5 * (o.top - n.top), t.y[1] -= .5 * (o.top - n.top), t.y[0] -= .5 * (o.top + o.height - n.bottom), 
            t.y[1] -= .5 * (o.top + o.height - n.bottom)), t;
        }
        function le() {
            if (!W()) return;
            if (!I("bounds")) return;
            if (!F) return;
            const e = ne(), t = se(), n = clamp_t(e, z.scale, t);
            if (z.scale < e - .01 || z.scale > t + .01) return void ue(v.ZoomTo, {
                scale: n
            });
            if (F.isRunning()) return;
            if (ye()) return;
            const o = re(n);
            z.x < o.x[0] || z.x > o.x[1] || z.y < o.y[0] || z.y > o.y[1] ? (z.x = clamp_t(o.x[0], z.x, o.x[1]), 
            z.y = clamp_t(o.y[0], z.y, o.y[1]), F.spring({
                tension: 170,
                friction: 17,
                restDelta: .001,
                restSpeed: .001,
                maxSpeed: 1 / 0,
                velocity: F.getCurrentVelocities()
            }), F.from(R).to(z).start()) : de();
        }
        function ce(e) {
            var t;
            if (!W()) return;
            const n = be(), o = ye(), i = xe(), a = we(), s = ge(), r = he();
            toggleClass_s(S, "is-fullsize", a), toggleClass_s(S, "is-expanded", i), toggleClass_s(S, "is-dragging", o), 
            toggleClass_s(S, "can-drag", n), toggleClass_s(S, "will-zoom-in", s), toggleClass_s(S, "will-zoom-out", r);
            const l = pe(), u = ve(), d = me(), g = !W();
            for (const n of (null === (t = e || c) || void 0 === t ? void 0 : t.querySelectorAll("[data-panzoom-action]")) || []) {
                const e = n.dataset.panzoomAction;
                let t = !1;
                if (g) t = !0; else switch (e) {
                  case v.ZoomIn:
                    l || (t = !0);
                    break;

                  case v.ZoomOut:
                    d || (t = !0);
                    break;

                  case v.ToggleFull:
                    {
                        u || d || (t = !0);
                        const e = n.querySelector("g");
                        e && (e.style.display = a && !t ? "none" : "");
                        break;
                    }

                  case v.IterateZoom:
                    {
                        l || d || (t = !0);
                        const e = n.querySelector("g");
                        e && (e.style.display = l || t ? "" : "none");
                        break;
                    }

                  case v.ToggleCover:
                  case v.ToggleMax:
                    l || d || (t = !0);
                }
                t ? (n.setAttribute("aria-disabled", ""), n.setAttribute("tabindex", "-1")) : (n.removeAttribute("aria-disabled"), 
                n.removeAttribute("tabindex"));
            }
        }
        function ue(e, t) {
            var n;
            if (!(e && c && O && F && W())) return;
            if (e === v.Swipe && Math.abs(F.getCurrentVelocities().scale) > .01) return;
            const o = Object.assign({}, z);
            let a = Object.assign({}, z), l = re(Q() ? o.scale : R.scale);
            const u = F.getCurrentVelocities(), d = G(), f = ((null === (n = (t = t || {}).currentTouch) || void 0 === n ? void 0 : n.length) || 0) > 1, h = t.velocityX || 0, m = t.velocityY || 0;
            let p = t.center;
            t.srcEvent && (p = gestures_i(gestures_s(t.srcEvent)));
            let b = t.deltaX || 0, x = t.deltaY || 0;
            switch (e) {
              case v.MoveRight:
                b = t.deltaX || 100;
                break;

              case v.MoveLeft:
                b = t.deltaX || -100;
                break;

              case v.MoveUp:
                x = t.deltaY || -100;
                break;

              case v.MoveDown:
                x = t.deltaY || 100;
            }
            let w = [];
            switch (e) {
              case v.Reset:
                a = Object.assign({}, y), a.scale = oe();
                break;

              case v.Pan:
              case v.Move:
              case v.MoveLeft:
              case v.MoveRight:
              case v.MoveUp:
              case v.MoveDown:
                if (ye()) {
                    let e = 1, t = 1;
                    a.x <= l.x[0] && h <= 0 && (e = Math.max(.01, 1 - Math.abs(1 / d.width * Math.abs(a.x - l.x[0]))), 
                    e *= .2), a.x >= l.x[1] && h >= 0 && (e = Math.max(.01, 1 - Math.abs(1 / d.width * Math.abs(a.x - l.x[1]))), 
                    e *= .2), a.y <= l.y[0] && m <= 0 && (t = Math.max(.01, 1 - Math.abs(1 / d.height * Math.abs(a.y - l.y[0]))), 
                    t *= .2), a.y >= l.y[1] && m >= 0 && (t = Math.max(.01, 1 - Math.abs(1 / d.height * Math.abs(a.y - l.y[1]))), 
                    t *= .2), a.x += b * e, a.y += x * t;
                } else a.x = clamp_t(l.x[0], a.x + b, l.x[1]), a.y = clamp_t(l.y[0], a.y + x, l.y[1]);
                break;

              case v.Swipe:
                const e = (e = 0) => Math.sign(e) * Math.pow(Math.abs(e), 1.5);
                a.x += clamp_t(-1e3, e(h), 1e3), a.y += clamp_t(-1e3, e(m), 1e3), m && !h && (a.x = clamp_t(l.x[0], a.x, l.x[1])), 
                !m && h && (a.y = clamp_t(l.y[0], a.y, l.y[1])), u.x = h, u.y = m;
                break;

              case v.ZoomTo:
                a.scale = t.scale || 1;
                break;

              case v.ZoomIn:
                a.scale = a.scale * (t.scale || 2), f || (a.scale = Math.min(a.scale, se()));
                break;

              case v.ZoomOut:
                a.scale = a.scale * (t.scale || .5), f || (a.scale = Math.max(a.scale, ne()));
                break;

              case v.ToggleCover:
                w = [ oe(), ie() ];
                break;

              case v.ToggleFull:
                w = [ oe(), ae() ];
                break;

              case v.ToggleMax:
                w = [ oe(), se() ];
                break;

              case v.IterateZoom:
                w = [ oe(), ae(), se() ];
                break;

              case v.Zoom:
                const n = ae();
                a.scale >= n - .05 ? a.scale = oe() : a.scale = Math.min(n, a.scale * (t.scale || 2));
                break;

              case v.RotateCW:
                a.angle += 90;
                break;

              case v.RotateCCW:
                a.angle -= 90;
                break;

              case v.FlipX:
                a.flipX *= -1;
                break;

              case v.FlipY:
                a.flipY *= -1;
            }
            if (void 0 !== R.angle && Math.abs(R.angle) >= 360 && (a.angle -= 360 * Math.floor(R.angle / 360), 
            R.angle -= 360 * Math.floor(R.angle / 360)), w.length) {
                const e = w.findIndex(e => e > a.scale + 1e-4);
                a.scale = w[e] || w[0];
            }
            if (f && (a.scale = clamp_t(ne() * (f ? .8 : 1), a.scale, se() * (f ? 1.6 : 1))), 
            Q()) {
                const e = ee(a.scale);
                if (e) {
                    const {x: t, y: n} = e;
                    a.x = t, a.y = n;
                }
            } else if (Math.abs(a.scale - o.scale) > 1e-4) {
                let e = 0, t = 0;
                if (p) e = p.x, t = p.y; else {
                    const n = c.getBoundingClientRect();
                    e = n.x + .5 * n.width, t = n.y + .5 * n.height;
                }
                let n = e - d.left, s = t - d.top;
                n -= .5 * d.width, s -= .5 * d.height;
                const r = (n - o.x) / o.scale, u = (s - o.y) / o.scale;
                a.x = n - r * a.scale, a.y = s - u * a.scale, !f && I("bounds") && (l = re(a.scale), 
                a.x = clamp_t(l.x[0], a.x, l.x[1]), a.y = clamp_t(l.y[0], a.y, l.y[1]));
            }
            if (e === v.Swipe) {
                let e = 94, t = 17, n = 500 * a.scale, o = u;
                F.spring({
                    tension: e,
                    friction: t,
                    maxSpeed: n,
                    restDelta: .1,
                    restSpeed: .1,
                    velocity: o
                });
            } else e === v.Pan || f ? F.spring({
                tension: 900,
                friction: 17,
                restDelta: .01,
                restSpeed: .01,
                maxSpeed: 1
            }) : F.spring({
                tension: 170,
                friction: 17,
                restDelta: .001,
                restSpeed: .001,
                maxSpeed: 1 / 0,
                velocity: u
            });
            if (0 === t.velocity || isEqual_n(R, a)) R = Object.assign({}, a), z = Object.assign({}, a), 
            F.end(), de(), ce(); else {
                if (isEqual_n(z, a)) return;
                F.from(R).to(a).start();
            }
            H("action", e);
        }
        function de() {
            if (!O || !S || !C) return;
            const {width: e, height: t} = J();
            Object.assign(S.style, {
                maxWidth: `min(${e}px, 100%)`,
                maxHeight: `min(${t}px, 100%)`
            });
            const n = function() {
                const {width: e, height: t} = J(), {width: n, height: o} = K();
                if (!c) return {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                    scale: 0,
                    flipX: 0,
                    flipY: 0,
                    angle: 0,
                    fitWidth: n,
                    fitHeight: o,
                    fullWidth: e,
                    fullHeight: t
                };
                let {x: i, y: a, scale: s, angle: r, flipX: l, flipY: u} = R, d = 1 / ae(), f = e, g = t, h = R.scale * d, m = z.scale * d;
                const p = Math.max(n, o), v = Math.min(n, o);
                e > t ? (f = p, g = v) : (f = v, g = p);
                h = e > t ? p * s / e || 1 : p * s / t || 1;
                let b = f ? e * m : 0, y = g ? t * m : 0, x = f && g ? e * h / b : 0;
                return i = i + .5 * f - .5 * b, a = a + .5 * g - .5 * y, {
                    x: i,
                    y: a,
                    width: b,
                    height: y,
                    scale: x,
                    flipX: l,
                    flipY: u,
                    angle: r,
                    fitWidth: n,
                    fitHeight: o,
                    fullWidth: e,
                    fullHeight: t
                };
            }(), {x: o, y: i, width: a, height: s, scale: r, angle: l, flipX: u, flipY: d} = n;
            let f = `translate(${m(o)}px, ${m(i)}px)`;
            f += 1 !== u || 1 !== d ? ` scaleX(${m(r * u)}) scaleY(${m(r * d)})` : ` scale(${m(r)})`, 
            0 !== l && (f += ` rotate(${l}deg)`), C.style.width = `${m(a)}px`, C.style.height = `${m(s)}px`, 
            C.style.transform = `${f}`, H("render");
        }
        function fe() {
            let e = z.scale;
            const t = I("clickAction");
            let n = oe();
            if (t) {
                let o = [];
                switch (t) {
                  case v.ZoomIn:
                    n = 2 * e;
                    break;

                  case v.ZoomOut:
                    n = .5 * e;
                    break;

                  case v.ToggleCover:
                    o = [ oe(), ie() ];
                    break;

                  case v.ToggleFull:
                    o = [ oe(), ae() ];
                    break;

                  case v.ToggleMax:
                    o = [ oe(), se() ];
                    break;

                  case v.IterateZoom:
                    o = [ oe(), ae(), se() ];
                    break;

                  case v.Zoom:
                    const t = ae();
                    n = e >= t - .05 ? oe() : Math.min(t, 2 * e);
                }
                if (o.length) {
                    const t = o.findIndex(t => t > e + 1e-4);
                    n = o[t] || oe();
                }
            }
            return n = clamp_t(ne(), n, se()), n;
        }
        function ge() {
            return !!(W() && fe() > z.scale);
        }
        function he() {
            return !!(W() && fe() < z.scale);
        }
        function me() {
            return !!(W() && z.scale > ne());
        }
        function pe() {
            return !!(W() && z.scale < se());
        }
        function ve() {
            return !!(W() && z.scale < ae());
        }
        function be() {
            return !(!(W() && xe() && T) || Q());
        }
        function ye() {
            return !(!W() || !(null == T ? void 0 : T.isPointerDown()) || Q());
        }
        function xe() {
            return !!(W() && z.scale > oe());
        }
        function we() {
            return !!(W() && z.scale >= ae());
        }
        function Me() {
            const e = "in-fullscreen", t = "with-panzoom-in-fullscreen";
            null == c || c.classList.toggle(e);
            const n = null == c ? void 0 : c.classList.contains(e);
            n ? (document.documentElement.classList.add(t), document.addEventListener("keydown", ke, !0)) : (document.documentElement.classList.remove(t), 
            document.removeEventListener("keydown", ke, !0)), de(), H(n ? "enterFS" : "exitFS");
        }
        function ke(e) {
            "Escape" !== e.key || e.defaultPrevented || Me();
        }
        const je = {
            canDrag: be,
            canZoomIn: pe,
            canZoomOut: me,
            canZoomToFull: ve,
            destroy: function() {
                H("destroy");
                for (const e of Object.values(Y)) null == e || e.destroy(je);
                for (const e of D) e();
                return S && (S.style.aspectRatio = "", S.style.maxWidth = "", S.style.maxHeight = ""), 
                C && (C.style.width = "", C.style.height = "", C.style.transform = ""), S = void 0, 
                O = void 0, C = void 0, R = Object.assign({}, y), z = Object.assign({}, y), null == F || F.destroy(), 
                F = void 0, null == T || T.destroy(), T = void 0, P = 4, je;
            },
            emit: H,
            execute: ue,
            getBoundaries: re,
            getContainer: function() {
                return c;
            },
            getContent: function() {
                return O;
            },
            getFullDim: J,
            getGestures: function() {
                return T;
            },
            getMousemovePos: ee,
            getOptions: function() {
                return X;
            },
            getPlugins: function() {
                return Y;
            },
            getScale: te,
            getStartPosition: U,
            getState: function() {
                return P;
            },
            getTransform: function(e) {
                return !0 === e ? z : R;
            },
            getTween: function() {
                return F;
            },
            getViewport: function() {
                return C;
            },
            getWrapper: function() {
                return S;
            },
            init: function() {
                return P = 0, H("init"), function() {
                    for (const [e, t] of Object.entries(Object.assign(Object.assign({}, E), X.plugins || {}))) if (e && !Y[e] && t instanceof Function) {
                        const n = t();
                        n.init(je), Y[e] = n;
                    }
                    H("initPlugins");
                }(), function() {
                    const e = Object.assign(Object.assign({}, x.classes), I("classes"));
                    if (!c) return;
                    if (addClass_s(c, e.container), O = c.querySelector("." + e.content), !O) return;
                    O.setAttribute("draggable", "false"), S = c.querySelector("." + e.wrapper), S || (S = document.createElement("div"), 
                    addClass_s(S, e.wrapper), O.insertAdjacentElement("beforebegin", S), S.insertAdjacentElement("afterbegin", O));
                    C = c.querySelector("." + e.viewport), C || (C = document.createElement("div"), 
                    addClass_s(C, e.viewport), C.insertAdjacentElement("afterbegin", O), S.insertAdjacentElement("beforeend", C));
                    A = O.cloneNode(!0), A.removeAttribute("id"), S.insertAdjacentElement("afterbegin", A), 
                    O instanceof HTMLPictureElement && (O = O.querySelector("img"));
                    A instanceof HTMLPictureElement && (A = A.querySelector("img"));
                    C instanceof HTMLPictureElement && (C = C.querySelector("img"));
                    if (C && (C.style.visibility = "hidden", I("protected"))) {
                        C.addEventListener("contextmenu", e => {
                            h(e);
                        });
                        const e = document.createElement("div");
                        addClass_s(e, "f-panzoom__protected"), C.appendChild(e);
                    }
                    H("initLayout");
                }(), function() {
                    if (c && S && !Z) {
                        let e = null;
                        Z = new ResizeObserver(() => {
                            W() && (e = e || requestAnimationFrame(() => {
                                W() && (ce(), le(), H("refresh")), e = null;
                            }));
                        }), Z.observe(S), D.push(() => {
                            null == Z || Z.disconnect(), Z = void 0, e && (cancelAnimationFrame(e), e = null);
                        });
                    }
                }(), function() {
                    if (!c || !O) return;
                    if (!p(O) || !p(A)) return void V();
                    const e = () => {
                        O && p(O) && O.decode().then(() => {
                            V();
                        }).catch(() => {
                            V();
                        });
                    };
                    if (P = 1, c.classList.add("is-loading"), H("loading"), A.src && A.complete) return void e();
                    (function() {
                        if (!c) return;
                        if (null == c ? void 0 : c.querySelector(".f-spinner")) return;
                        const e = I("spinnerTpl"), t = strToHtml_e(e);
                        t && (t.classList.add("f-spinner"), c.classList.add("is-loading"), null == S || S.insertAdjacentElement("afterbegin", t));
                    })(), A.addEventListener("load", e, !1), A.addEventListener("error", e, !1), D.push(() => {
                        null == A || A.removeEventListener("load", e, !1), null == A || A.removeEventListener("error", e, !1);
                    });
                }(), je;
            },
            isDragging: ye,
            isExpanded: xe,
            isFullsize: we,
            isMousemoveMode: Q,
            localize: function(e, t = []) {
                const n = I("l10n") || {};
                e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
                for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
                return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
            },
            off: function(e, t) {
                for (const n of e instanceof Array ? e : [ e ]) q.has(n) && q.set(n, q.get(n).filter(e => e !== t));
                return je;
            },
            on: function(e, t) {
                for (const n of e instanceof Array ? e : [ e ]) q.set(n, [ ...q.get(n) || [], t ]);
                return je;
            },
            toggleFS: Me,
            updateControls: ce,
            version: "6.1.6",
            willZoomIn: ge,
            willZoomOut: he
        };
        return je;
    };
    E.l10n = {
        en_EN: en_EN_e
    }, E.getDefaults = () => x;
    /*! License details at fancyapps.com/license */
    const getDirectChildren_e = (e, o) => {
        let t = [];
        return e.childNodes.forEach(e => {
            e.nodeType !== Node.ELEMENT_NODE || o && !e.matches(o) || t.push(e);
        }), t;
    };
    /*! License details at fancyapps.com/license */
    const en_EN_o = Object.assign(Object.assign({}, en_EN_e), {
        ERROR: "Something went wrong. <br /> Please try again later.",
        NEXT: "Next page",
        PREV: "Previous page",
        GOTO: "Go to page #%d",
        DOWNLOAD: "Download",
        TOGGLE_FULLSCREEN: "Toggle full-screen mode",
        TOGGLE_EXPAND: "Toggle full-size mode",
        TOGGLE_THUMBS: "Toggle thumbnails",
        TOGGLE_AUTOPLAY: "Toggle slideshow"
    });
    /*! License details at fancyapps.com/license */
    const carousel_m = t => {
        t.cancelable && t.preventDefault();
    }, carousel_h = {
        adaptiveHeight: !1,
        center: !0,
        classes: {
            container: "f-carousel",
            isEnabled: "is-enabled",
            isLTR: "is-ltr",
            isRTL: "is-rtl",
            isHorizontal: "is-horizontal",
            isVertical: "is-vertical",
            hasAdaptiveHeight: "has-adaptive-height",
            viewport: "f-carousel__viewport",
            slide: "f-carousel__slide",
            isSelected: "is-selected"
        },
        dragFree: !1,
        enabled: !0,
        errorTpl: '<div class="f-html">{{ERROR}}</div>',
        fill: !1,
        infinite: !0,
        initialPage: 0,
        l10n: en_EN_o,
        rtl: !1,
        slides: [],
        slidesPerPage: "auto",
        spinnerTpl: '<div class="f-spinner"></div>',
        transition: "fade",
        tween: {
            clamp: !0,
            mass: 1,
            tension: 160,
            friction: 25,
            restDelta: 1,
            restSpeed: 1,
            velocity: 0
        },
        vertical: !1
    };
    let carousel_b, carousel_y = 0;
    const carousel_E = (g, x = {}, M = {}) => {
        carousel_y++;
        let w, S, j, A, L, P = 0, T = Object.assign({}, carousel_h), O = Object.assign({}, carousel_h), R = {}, H = null, V = null, C = 0, D = 0, $ = 0, q = !1, I = !1, F = !1, z = "height", k = 0, N = !0, B = 0, _ = 0, G = 0, X = 0, Y = "*", W = [], J = [];
        const K = new Set;
        let Q = [], U = [], Z = 0, tt = 0, et = 0;
        function nt(t, ...e) {
            let n = O[t];
            return n && n instanceof Function ? n(It, ...e) : n;
        }
        function it(t, e = []) {
            const n = nt("l10n") || {};
            t = String(t).replace(/\{\{(\w+)\}\}/g, (t, e) => n[e] || t);
            for (let n = 0; n < e.length; n++) t = t.split(e[n][0]).join(e[n][1]);
            return t = t.replace(/\{\{(.*?)\}\}/g, (t, e) => e);
        }
        const ot = new Map;
        function st(t, ...e) {
            const n = [ ...ot.get(t) || [] ];
            O.on && n.push(O.on[t]);
            for (const t of n) t && t instanceof Function && t(It, ...e);
            "*" !== t && st("*", t, ...e);
        }
        function rt() {
            var e, n;
            const i = extend_r({}, carousel_h, T);
            extend_r(i, carousel_h, T);
            let r = "";
            const l = T.breakpoints || {};
            if (l) for (const [t, e] of Object.entries(l)) window.matchMedia(t).matches && (r += t, 
            extend_r(i, e));
            if (void 0 === L || r !== L) {
                if (L = r, 0 !== P) {
                    let t = null === (n = null === (e = U[B]) || void 0 === e ? void 0 : e.slides[0]) || void 0 === n ? void 0 : n.index;
                    void 0 === t && (t = O.initialSlide), i.initialSlide = t, i.slides = [];
                    for (const t of W) t.isVirtual && i.slides.push(t);
                }
                Dt(), O = i, !1 !== nt("enabled") && (P = 0, st("init"), function() {
                    for (const [t, e] of Object.entries(Object.assign(Object.assign({}, M), O.plugins || {}))) if (t && !R[t] && e instanceof Function) {
                        const n = e();
                        n.init(It, carousel_E), R[t] = n;
                    }
                    st("initPlugins");
                }(), function() {
                    if (!H) return;
                    const e = nt("classes") || {};
                    addClass_s(H, e.container);
                    const n = nt("style");
                    if (n && isPlainObject_t(n)) for (const [t, e] of Object.entries(n)) H.style.setProperty(t, e);
                    V = H.querySelector(`.${e.viewport}`), V || (V = document.createElement("div"), 
                    addClass_s(V, e.viewport), V.append(...getDirectChildren_e(H, `.${e.slide}`)), H.insertAdjacentElement("afterbegin", V)), 
                    H.carousel = It, st("initLayout");
                }(), function() {
                    if (!V) return;
                    const t = nt("classes") || {};
                    W = [], [ ...getDirectChildren_e(V, `.${t.slide}`) ].forEach(t => {
                        if (t.parentElement) {
                            const e = yt(Object.assign({
                                el: t,
                                isVirtual: !1
                            }, t.dataset || {}));
                            st("createSlide", e), W.push(e);
                        }
                    }), wt();
                    for (const t of W) st("addSlide", t);
                    bt(nt("slides"));
                    for (const t of W) {
                        const e = t.el;
                        (null == e ? void 0 : e.parentElement) === V && (addClass_s(e, O.classes.slide), 
                        addClass_s(e, t.class), Rt(t), st("attachSlideEl", t));
                    }
                    st("initSlides");
                }(), St(), P = 1, addClass_s(H, (nt("classes") || {}).isEnabled || ""), Ct(), ut(), 
                S = tween_c().on("start", () => {
                    w && w.isPointerDown() || (dt(), Ct());
                }).on("step", t => {
                    const e = k;
                    k = t.pos, k !== e && (N = !1, Ct());
                }).on("end", t => {
                    (null == w ? void 0 : w.isPointerDown()) || (k = t.pos, S && !q && (k < G || k > X) ? S.spring({
                        clamp: !0,
                        mass: 1,
                        tension: 200,
                        friction: 25,
                        velocity: 0,
                        restDelta: 1,
                        restSpeed: 1
                    }).from({
                        pos: k
                    }).to({
                        pos: clamp_t(G, k, X)
                    }).start() : N || (N = !0, st("settle")));
                }), at(), function() {
                    if (!H || !V) return;
                    H.addEventListener("click", Pt), document.addEventListener("mousemove", lt);
                    const t = V.getBoundingClientRect();
                    if (Z = t.height, tt = t.width, !j) {
                        let t = null;
                        j = new ResizeObserver(() => {
                            t || (t = requestAnimationFrame(() => {
                                !function() {
                                    if (1 !== P || !V) return;
                                    const t = U.length, e = V.getBoundingClientRect(), n = e.height, i = e.width;
                                    t > 1 && (F && Math.abs(n - Z) < .5 || !F && Math.abs(i - tt) < .5) || (St(), at(), 
                                    Z = n, tt = i, F && !Z || !F && !tt || H && V && (t === U.length && (null == w ? void 0 : w.isPointerDown()) || (nt("dragFree") && (q || k > G && k < X) ? (dt(), 
                                    Ct()) : Ht(B, {
                                        transition: !1
                                    }))));
                                }(), t = null;
                            }));
                        }), j.observe(V);
                    }
                }(), st("ready"));
            }
        }
        function lt(t) {
            carousel_b = t;
        }
        function at() {
            !1 === nt("gestures") ? w && (w.destroy(), w = void 0) : w || function() {
                const t = nt("gestures");
                !w && !1 !== t && V && (w = f(V, t).on("start", t => {
                    var e, n;
                    if (!S) return;
                    if (!1 === nt("gestures", t)) return;
                    const {srcEvent: o} = t;
                    F && gestures_e(o) && !getScrollableParent_n(o.target) && carousel_m(o), S.pause(), 
                    S.getCurrentVelocities().pos = 0;
                    const s = null === (e = U[B]) || void 0 === e ? void 0 : e.slides[0], r = null == s ? void 0 : s.el;
                    s && K.has(s.index) && r && (k = s.offset || 0, k += (function(t) {
                        const e = window.getComputedStyle(t), n = new DOMMatrixReadOnly(e.transform);
                        return {
                            width: n.m41 || 0,
                            height: n.m42 || 0
                        };
                    }(r)[z] || 0) * (I && !F ? 1 : -1)), At(), q || (k < G || k > X) && S.spring({
                        clamp: !0,
                        mass: 1,
                        tension: 500,
                        friction: 25,
                        velocity: (null === (n = S.getCurrentVelocities()) || void 0 === n ? void 0 : n.pos) || 0,
                        restDelta: 1,
                        restSpeed: 1
                    }).from({
                        pos: k
                    }).to({
                        pos: clamp_t(G, k, X)
                    }).start();
                }).on("move", t => {
                    var e, n;
                    if (!1 === nt("gestures", t)) return;
                    const {srcEvent: o, axis: s, deltaX: r, deltaY: l} = t;
                    if (gestures_e(o) && (null === (e = o.touches) || void 0 === e ? void 0 : e.length) > 1) return;
                    const a = o.target, c = getScrollableParent_n(a), d = c ? c.scrollHeight > c.clientHeight ? "y" : "x" : void 0;
                    if (c && c !== V && (!s || s === d)) return;
                    if (!s) return carousel_m(o), o.stopPropagation(), void o.stopImmediatePropagation();
                    if ("y" === s && !F || "x" === s && F) return;
                    if (carousel_m(o), o.stopPropagation(), !S) return;
                    const u = I && !F ? 1 : -1, f = F ? l : r;
                    let v = (null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : k, g = 1;
                    q || (v <= G && f * u < 0 ? (g = Math.max(.01, 1 - (Math.abs(1 / gt() * Math.abs(v - G)) || 0)), 
                    g *= .2) : v >= X && f * u > 0 && (g = Math.max(.01, 1 - (Math.abs(1 / gt() * Math.abs(v - X)) || 0)), 
                    g *= .2)), v += f * g * u, S.spring({
                        clamp: !0,
                        mass: 1,
                        tension: 700,
                        friction: 25,
                        velocity: (null === (n = S.getCurrentVelocities()) || void 0 === n ? void 0 : n.pos) || 0,
                        restDelta: 1,
                        restSpeed: 1
                    }).from({
                        pos: k
                    }).to({
                        pos: v
                    }).start();
                }).on("panstart", t => {
                    !1 !== nt("gestures", t) && (null == t ? void 0 : t.axis) === (F ? "y" : "x") && addClass_s(V, "is-dragging");
                }).on("panend", t => {
                    !1 !== nt("gestures", t) && removeClass_s(V, "is-dragging");
                }).on("end", t => {
                    var e, n;
                    if (!1 === nt("gestures", t)) return;
                    const {srcEvent: o, axis: s, velocityX: r, velocityY: l, currentTouch: c} = t;
                    if (c.length > 0 || !S) return;
                    const d = o.target, u = getScrollableParent_n(d), f = u ? u.scrollHeight > u.clientHeight ? "y" : "x" : void 0, v = u && (!s || s === f);
                    F && gestures_e(o) && !t.axis && Pt(o);
                    const g = U.length, m = nt("dragFree");
                    if (!g) return;
                    const h = v ? 0 : nt("vertical") ? l : r;
                    let b = (null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : k;
                    const y = I && !F ? 1 : -1;
                    if (v || (b += h * (m ? 5 : 1) * y), !q && (h * y <= 0 && b < G || h * y >= 0 && b > X)) {
                        let t = 0;
                        return Math.abs(h) > 0 && (t = 2 * Math.abs(h), t = Math.min(.3 * gt(), t)), b = clamp_t(G + -1 * t, b, X + t), 
                        void S.spring({
                            clamp: !0,
                            mass: 1,
                            tension: 380,
                            friction: 25,
                            velocity: -1 * h,
                            restDelta: 1,
                            restSpeed: 1
                        }).from({
                            pos: k
                        }).to({
                            pos: b
                        }).start();
                    }
                    if (m || (null === (e = R.Autoscroll) || void 0 === e ? void 0 : e.isEnabled())) return void (Math.abs(h) > 10 ? S.spring({
                        clamp: !0,
                        mass: 1,
                        tension: 150,
                        friction: 25,
                        velocity: -1 * h,
                        restDelta: 1,
                        restSpeed: 1
                    }).from({
                        pos: k
                    }).to({
                        pos: b
                    }).start() : S.isRunning() || N || (N = !0, st("settle")));
                    if (!m && !(null === (n = R.Autoscroll) || void 0 === n ? void 0 : n.isEnabled()) && (!t.offsetX && !t.offsetY || "y" === s && !F || "x" === s && F)) return void Ht(B, {
                        transition: "tween"
                    });
                    let E = vt(b);
                    Math.abs(h) > 10 && E === B && (E += h > 0 ? I && !F ? 1 : -1 : I && !F ? -1 : 1), 
                    Ht(E, {
                        transition: "tween",
                        tween: {
                            velocity: -1 * h
                        }
                    });
                }).init());
            }(), toggleClass_s(V, "is-draggable", !!w && U.length > 0);
        }
        function ct(t = "*") {
            var e;
            const n = [];
            for (const i of W) ("*" === t || i.class && i.class.includes(t) || i.el && (null === (e = i.el) || void 0 === e ? void 0 : e.classList.contains(t))) && n.push(i);
            A = void 0, Y = t, J = [ ...n ];
        }
        function dt() {
            if (!S) return;
            const t = vt((null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : k);
            t !== B && (A = B, B = t, Rt(), ut(), ft(), st("change", B, A));
        }
        function ut() {
            var t, e;
            if (!H) return;
            for (const t of H.querySelectorAll("[data-carousel-index]")) t.innerHTML = B + "";
            for (const t of H.querySelectorAll("[data-carousel-page]")) t.innerHTML = B + 1 + "";
            for (const t of H.querySelectorAll("[data-carousel-pages]")) t.innerHTML = U.length + "";
            for (const e of H.querySelectorAll("[data-carousel-go-to]")) parseInt((null === (t = e.dataset) || void 0 === t ? void 0 : t.carouselGoTo) || "-1", 10) === B ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
            for (const t of H.querySelectorAll("[data-carousel-go-prev]")) t.toggleAttribute("aria-disabled", !$t()), 
            $t() ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", "-1");
            for (const t of H.querySelectorAll("[data-carousel-go-next]")) t.toggleAttribute("aria-disabled", !qt()), 
            qt() ? t.removeAttribute("tabindex") : t.setAttribute("tabindex", "-1");
            let n = !1;
            const i = null === (e = U[B]) || void 0 === e ? void 0 : e.slides[0];
            i && (i.downloadSrc || "image" === i.type && i.src) && (n = !0);
            for (const t of H.querySelectorAll("[data-carousel-download]")) t.toggleAttribute("aria-disabled", !n);
        }
        function ft(t) {
            var e;
            t || (t = null === (e = U[B]) || void 0 === e ? void 0 : e.slides[0]);
            const n = null == t ? void 0 : t.el;
            if (n) for (const e of n.querySelectorAll("[data-slide-index]")) e.innerHTML = t.index + 1 + "";
        }
        function vt(t) {
            var e, n, i;
            if (!U.length) return 0;
            const o = mt();
            let s = t;
            q ? s -= Math.floor((t - (null === (e = U[0]) || void 0 === e ? void 0 : e.pos)) / o) * o || 0 : s = clamp_t(null === (n = U[0]) || void 0 === n ? void 0 : n.pos, t, null === (i = U[U.length - 1]) || void 0 === i ? void 0 : i.pos);
            const r = new Map;
            let l = 0;
            for (const t of U) {
                const e = Math.abs(t.pos - s), n = Math.abs(t.pos - s - o), i = Math.abs(t.pos - s + o), a = Math.min(e, n, i);
                r.set(l, a), l++;
            }
            const c = r.size > 0 ? [ ...r.entries() ].reduce((t, e) => e[1] < t[1] ? e : t) : [ B, 0 ];
            return parseInt(c[0]);
        }
        function pt() {
            return et;
        }
        function gt() {
            return C;
        }
        function mt(t = !0) {
            return J.length ? J.reduce((t, e) => t + e.dim, 0) + (J.length - (q && t ? 0 : 1)) * et : 0;
        }
        function ht(t) {
            const e = mt(), n = gt();
            if (!e || !V || !n) return [];
            const i = [];
            t = void 0 === t ? k : t, q && (t -= Math.floor(t / e) * e || 0);
            let o = 0;
            for (let s of J) {
                const r = (e = 0) => {
                    i.indexOf(s) > -1 || (s.pos = o - t + e || 0, s.offset + e > t - s.dim - D + .51 && s.offset + e < t + n + $ - .51 && i.push(s));
                };
                s.offset = o, q && (r(e), r(-1 * e)), r(), o += s.dim + et;
            }
            return i;
        }
        function bt(t, e) {
            const n = [];
            for (const e of Array.isArray(t) ? t : [ t ]) {
                const t = yt(Object.assign(Object.assign({}, e), {
                    isVirtual: !0
                }));
                t.el || (t.el = document.createElement("div")), st("createSlide", t), n.push(t);
            }
            W.splice(void 0 === e ? W.length : e, 0, ...n), wt();
            for (const t of n) st("addSlide", t), Et(t);
            return ct(Y), n;
        }
        function yt(t) {
            return (isString_t(t) || t instanceof HTMLElement) && (t = {
                html: t
            }), Object.assign({
                index: -1,
                el: void 0,
                class: "",
                isVirtual: !0,
                dim: 0,
                pos: 0,
                offset: 0,
                html: "",
                src: ""
            }, t);
        }
        function Et(t) {
            let e = t.el;
            if (!t || !e) return;
            const n = t.html ? t.html instanceof HTMLElement ? t.html : strToHtml_e(t.html) : void 0;
            n && (addClass_s(n, "f-html"), t.htmlEl = n, addClass_s(e, "has-html"), e.append(n), 
            st("contentReady", t));
        }
        function xt(t) {
            if (!V || !t) return;
            let e = t.el;
            if (e) {
                if (e.setAttribute("index", t.index + ""), e.parentElement !== V) {
                    let n;
                    addClass_s(e, O.classes.slide), addClass_s(e, t.class), Rt(t);
                    for (const e of W) if (e.index > t.index) {
                        n = e.el;
                        break;
                    }
                    V.insertBefore(e, n && V.contains(n) ? n : null), st("attachSlideEl", t);
                }
                return ft(t), e;
            }
        }
        function Mt(t) {
            const e = null == t ? void 0 : t.el;
            e && (e.remove(), jt(e), st("detachSlideEl", t));
        }
        function wt() {
            for (let t = 0; t < W.length; t++) {
                const e = W[t], n = e.el;
                n && (e.index !== t && jt(n), n.setAttribute("index", `${t}`)), e.index = t;
            }
        }
        function St() {
            var t, n, i, o, s;
            if (!H || !V) return;
            I = nt("rtl"), F = nt("vertical"), z = F ? "height" : "width";
            const r = nt("classes");
            if (toggleClass_s(H, r.isLTR, !I), toggleClass_s(H, r.isRTL, I), toggleClass_s(H, r.isHorizontal, !F), 
            toggleClass_s(H, r.isVertical, F), toggleClass_s(H, r.hasAdaptiveHeight, nt("adaptiveHeight")), 
            C = 0, D = 0, $ = 0, et = 0, V) {
                V.childElementCount || (V.style.display = "grid");
                const t = V.getBoundingClientRect();
                C = V.getBoundingClientRect()[z] || 0;
                const e = window.getComputedStyle(V);
                et = parseFloat(e.getPropertyValue("--f-carousel-gap")) || 0;
                "visible" === e.getPropertyValue("overflow-" + (F ? "y" : "x")) && (D = Math.abs(t[F ? "top" : "left"]), 
                $ = Math.abs(window[F ? "innerHeight" : "innerWidth"] - t[F ? "bottom" : "right"])), 
                V.style.display = "";
            }
            if (!C) return;
            const l = function() {
                let t = 0;
                if (V) {
                    let e = document.createElement("div");
                    e.style.display = "block", addClass_s(e, O.classes.slide), V.appendChild(e), t = e.getBoundingClientRect()[z], 
                    e.remove(), e = void 0;
                }
                return t;
            }();
            for (const n of J) {
                const i = n.el;
                let o = 0;
                if (!n.isVirtual && i && isNode_n(i)) {
                    let e = !1;
                    i.parentElement && i.parentElement === V || (V.appendChild(i), e = !0), o = i.getBoundingClientRect()[z], 
                    e && (null === (t = i.parentElement) || void 0 === t || t.removeChild(i));
                } else o = l;
                n.dim = o;
            }
            if (q = !1, nt("infinite")) {
                q = !0;
                const t = mt();
                let e = C + D + $;
                for (let i = 0; i < J.length; i++) {
                    const o = (null === (n = J[i]) || void 0 === n ? void 0 : n.dim) + et;
                    if (t - o < e && t - o - e < o) {
                        q = !1;
                        break;
                    }
                }
            }
            !function() {
                var t;
                if (!H) return;
                const e = gt(), n = mt(!1);
                let i = nt("slidesPerPage");
                i = "auto" === i ? 1 / 0 : parseFloat(i + ""), U = [];
                let o = 0, s = 0;
                for (const n of J) (!U.length || o + n.dim - e > .05 || s >= i) && (U.push({
                    index: U.length,
                    slides: [],
                    dim: 0,
                    offset: 0,
                    pos: 0
                }), o = 0, s = 0), null === (t = U[U.length - 1]) || void 0 === t || t.slides.push(n), 
                o += n.dim + et, s++;
                const r = nt("center"), l = nt("fill");
                let c = 0;
                for (const t of U) {
                    t.dim = (t.slides.length - 1) * et;
                    for (const e of t.slides) t.dim += e.dim;
                    t.offset = c, t.pos = c, !1 !== r && (t.pos -= .5 * (e - t.dim)), l && !q && n > e && (t.pos = clamp_t(0, t.pos, n - e)), 
                    c += t.dim + et;
                }
                const d = [];
                let u;
                for (const t of U) {
                    const e = Object.assign({}, t);
                    u && Math.abs(e.pos - u.pos) < .1 ? (u.dim += e.dim, u.slides = [ ...u.slides, ...e.slides ]) : (u = e, 
                    e.index = d.length, d.push(e));
                }
                U = d, B = clamp_t(0, B, U.length - 1);
            }(), G = (null === (i = U[0]) || void 0 === i ? void 0 : i.pos) || 0, X = (null === (o = U[U.length - 1]) || void 0 === o ? void 0 : o.pos) || 0, 
            0 === P ? function() {
                var t;
                A = void 0, B = nt("initialPage");
                const e = nt("initialSlide") || void 0;
                void 0 !== e && (B = It.getPageIndex(e) || 0), B = clamp_t(0, B, U.length - 1), 
                k = (null === (t = U[B]) || void 0 === t ? void 0 : t.pos) || 0, _ = k;
            }() : _ = (null === (s = U[B || 0]) || void 0 === s ? void 0 : s.pos) || 0, st("refresh"), 
            ut();
        }
        function jt(t) {
            if (!t || !isNode_n(t)) return;
            const n = parseInt(t.getAttribute("index") || "-1");
            let i = "";
            for (const e of Array.from(t.classList)) {
                const t = e.match(/^f-(\w+)(Out|In)$/);
                t && t[1] && (i = t[1] + "");
            }
            if (!t || !i) return;
            const o = [ `f-${i}Out`, `f-${i}In`, "to-prev", "to-next", "from-prev", "from-next" ];
            t.removeEventListener("animationend", Lt), removeClass_s(t, o.join(" ")), K.delete(n);
        }
        function At() {
            if (!V) return;
            const t = K.size > 0;
            for (const t of J) jt(t.el);
            K.clear(), t && Ct();
        }
        function Lt(t) {
            var e;
            "f-" === (null === (e = t.animationName) || void 0 === e ? void 0 : e.substring(0, 2)) && (jt(t.target), 
            K.size || (removeClass_s(H, "in-transition"), !N && Math.abs(It.getPosition(!0) - _) < .5 && (N = !0, 
            st("settle"))), Ct());
        }
        function Pt(t) {
            var e;
            if (t.defaultPrevented) return;
            const n = t.composedPath()[0];
            if (n.closest("[data-carousel-go-prev]")) return carousel_m(t), void It.prev();
            if (n.closest("[data-carousel-go-next]")) return carousel_m(t), void It.next();
            const i = n.closest("[data-carousel-go-to]");
            if (i) return carousel_m(t), void It.goTo(parseFloat(i.dataset.carouselGoTo || "") || 0);
            if (n.closest("[data-carousel-download]")) {
                carousel_m(t);
                const n = null === (e = U[B]) || void 0 === e ? void 0 : e.slides[0];
                if (n && (n.downloadSrc || "image" === n.type && n.src)) {
                    const t = n.downloadFilename, e = document.createElement("a"), i = n.downloadSrc || n.src || "";
                    e.href = i, e.target = "_blank", e.download = t || i, e.click();
                }
            } else st("click", t);
        }
        function Tt(t) {
            var e;
            const n = t.el;
            n && (null === (e = n.querySelector(".f-spinner")) || void 0 === e || e.remove());
        }
        function Ot(t) {
            var e;
            const n = t.el;
            n && (null === (e = n.querySelector(".f-html.is-error")) || void 0 === e || e.remove(), 
            removeClass_s(n, "has-error"));
        }
        function Rt(t) {
            var e;
            t || (t = null === (e = U[B]) || void 0 === e ? void 0 : e.slides[0]);
            const i = null == t ? void 0 : t.el;
            if (!i) return;
            let o = nt("formatCaption", t);
            void 0 === o && (o = t.caption), o = o || "";
            const s = nt("captionEl");
            if (s && s instanceof HTMLElement) {
                if (t.index !== B) return;
                if (isString_t(o) && (s.innerHTML = it(o + "")), o instanceof HTMLElement) {
                    if (o.parentElement === s) return;
                    s.innerHTML = "", o.parentElement && (o = o.cloneNode(!0)), s.append(o);
                }
                return;
            }
            if (!o) return;
            let r = t.captionEl || i.querySelector(".f-caption");
            !r && o instanceof HTMLElement && o.classList.contains("f-caption") && (r = o), 
            r || (r = document.createElement("div"), addClass_s(r, "f-caption"), isString_t(o) ? r.innerHTML = it(o + "") : o instanceof HTMLElement && (o.parentElement && (o = o.cloneNode(!0)), 
            r.append(o)));
            const l = `f-caption-${carousel_y}_${t.index}`;
            r.setAttribute("id", l), r.dataset.selectable = "true", addClass_s(i, "has-caption"), 
            i.setAttribute("aria-labelledby", l), t.captionEl = r, i.insertAdjacentElement("beforeend", r);
        }
        function Ht(e, i = {}) {
            var o, r;
            let {transition: l, tween: u} = Object.assign({
                transition: O.transition,
                tween: O.tween
            }, i || {});
            if (!H || !S) return;
            const f = U.length;
            if (!f) return;
            if (function(t, e) {
                var i, o, s;
                if (!(H && C && S && e && isString_t(e) && "tween" !== e)) return !1;
                for (const t of Q) if (C - t.dim > .5) return !1;
                if (D > .5 || $ > .5) return;
                const r = U.length;
                let l = t > B ? 1 : -1;
                t = q ? (t % r + r) % r : clamp_t(0, t, r - 1), I && (l *= -1);
                const u = null === (i = U[B]) || void 0 === i ? void 0 : i.slides[0], f = null == u ? void 0 : u.index, v = null === (o = U[t]) || void 0 === o ? void 0 : o.slides[0], p = null == v ? void 0 : v.index, g = null === (s = U[t]) || void 0 === s ? void 0 : s.pos;
                if (void 0 === p || void 0 === f || f === p || k === g || Math.abs(C - ((null == v ? void 0 : v.dim) || 0)) > 1) return !1;
                N = !1, S.pause(), At(), addClass_s(H, "in-transition"), k = _ = g;
                const m = xt(u), h = xt(v);
                return dt(), m && (K.add(f), m.style.transform = "", m.addEventListener("animationend", Lt), 
                removeClass_s(m, O.classes.isSelected), m.inert = !1, addClass_s(m, `f-${e}Out to-${l > 0 ? "next" : "prev"}`)), 
                h && (K.add(p), h.style.transform = "", h.addEventListener("animationend", Lt), 
                addClass_s(h, O.classes.isSelected), h.inert = !1, addClass_s(h, `f-${e}In from-${l > 0 ? "prev" : "next"}`)), 
                Ct(), !0;
            }(e, l)) return;
            e = q ? (e % f + f) % f : clamp_t(0, e, f - 1);
            const v = (null === (o = U[e || 0]) || void 0 === o ? void 0 : o.pos) || 0;
            _ = v;
            const p = S.isRunning() ? S.getEndValues().pos : k;
            if (Math.abs(_ - p) < 1) return k = _, B !== e && (Rt(), A = B, B = e, ut(), ft(), 
            st("change", B, A)), Ct(), void (N || (N = !0, st("settle")));
            if (S.pause(), At(), q) {
                const t = mt(), e = Math.floor((p - (null === (r = U[0]) || void 0 === r ? void 0 : r.pos)) / t) || 0, n = _ + e * t;
                _ = [ n + t, n, n - t ].reduce(function(t, e) {
                    return Math.abs(e - p) < Math.abs(t - p) ? e : t;
                });
            }
            !1 !== l && isPlainObject_t(u) ? S.spring(extend_r({}, O.tween, u)).from({
                pos: k
            }).to({
                pos: _
            }).start() : (k = _, dt(), Ct(), N || (N = !0, st("settle")));
        }
        function Vt(t) {
            var e;
            let n = k;
            if (q && !0 !== t) {
                const t = mt();
                n -= (Math.floor((k - (null === (e = U[0]) || void 0 === e ? void 0 : e.pos) || 0) / t) || 0) * t;
            }
            return n;
        }
        function Ct() {
            var t;
            if (!H || !V) return;
            Q = ht();
            const e = new Set, n = [], i = U[B], s = O.setTransform;
            let l;
            for (const o of J) {
                const s = K.has(o.index), r = Q.indexOf(o) > -1, a = (null === (t = null == i ? void 0 : i.slides) || void 0 === t ? void 0 : t.indexOf(o)) > -1;
                if (o.isVirtual && !s && !r) continue;
                let c = xt(o);
                if (c && (n.push(o), a && e.add(c), nt("adaptiveHeight") && a)) {
                    const t = (c.firstElementChild || c).getBoundingClientRect().height;
                    l = null == l ? t : Math.max(l, t);
                }
            }
            V && l && (V.style.height = `${l}px`), [ ...getDirectChildren_e(V, `.${O.classes.slide}`) ].forEach(t => {
                toggleClass_s(t, O.classes.isSelected, e.has(t));
                const n = W[parseInt(t.getAttribute("index") || "-1")];
                if (!n) return t.remove(), void jt(t);
                const i = K.has(n.index), o = Q.indexOf(n) > -1;
                if (n.isVirtual && !i && !o) return void Mt(n);
                if (t.inert = !o, !1 === s) return;
                let l = n.pos ? Math.round(1e4 * n.pos) / 1e4 : 0, a = 0, c = 0, d = 0, f = 0;
                i || (a = F ? 0 : I ? -1 * l : l, c = F ? l : 0, d = map_t(a, 0, n.dim, 0, 100), 
                f = map_t(c, 0, n.dim, 0, 100)), s instanceof Function && !i ? s(It, n, {
                    x: a,
                    y: c,
                    xPercent: d,
                    yPercent: f
                }) : t.style.transform = a || c ? `translate3d(${d}%, ${f}%,0)` : "";
            }), st("render", n);
        }
        function Dt() {
            null == H || H.removeEventListener("click", Pt), document.removeEventListener("mousemove", lt), 
            K.clear(), null == j || j.disconnect(), j = void 0;
            for (const t of W) {
                let n = t.el;
                n && isNode_n(n) && (t.state = void 0, Tt(t), Ot(t), t.isVirtual ? (Mt(t), t.el = void 0) : (jt(n), 
                n.style.transform = "", V && !V.contains(n) && V.appendChild(n)));
            }
            for (const t of Object.values(R)) null == t || t.destroy();
            R = {}, null == w || w.destroy(), w = void 0, null == S || S.destroy(), S = void 0;
            for (const [t, e] of Object.entries(O.classes || {})) "container" !== t && removeClass_s(H, e);
            removeClass_s(V, "is-draggable");
        }
        function $t() {
            return q || B > 0;
        }
        function qt() {
            return q || B < U.length - 1;
        }
        const It = {
            add: function(t, e) {
                var n;
                let i = k;
                const o = B, s = mt(), r = (null == S ? void 0 : S.isRunning()) ? S.getEndValues().pos : k, l = s && Math.floor((r - ((null === (n = U[0]) || void 0 === n ? void 0 : n.pos) || 0)) / s) || 0;
                return bt(t, e), ct(Y), St(), S && s && (o === B && (i -= l * s), i === _ ? k = _ : S.spring({
                    clamp: !0,
                    mass: 1,
                    tension: 300,
                    friction: 25,
                    restDelta: 1,
                    restSpeed: 1
                }).from({
                    pos: i
                }).to({
                    pos: _
                }).start()), Ct(), It;
            },
            canGoPrev: $t,
            canGoNext: qt,
            destroy: function() {
                return st("destroy"), window.removeEventListener("resize", rt), Dt(), ot.clear(), 
                H = null, U = [], W = [], O = Object.assign({}, carousel_h), R = {}, J = [], L = void 0, 
                Y = "*", P = 2, It;
            },
            emit: st,
            filter: function(t = "*") {
                return ct(t), St(), k = clamp_t(G, k, X), Ct(), st("filter", t), It;
            },
            getContainer: function() {
                return H;
            },
            getGapDim: pt,
            getGestures: function() {
                return w;
            },
            getLastMouseMove: function() {
                return carousel_b;
            },
            getOption: function(t) {
                return nt(t);
            },
            getOptions: function() {
                return O;
            },
            getPage: function() {
                return U[B];
            },
            getPageIndex: function(t) {
                if (void 0 !== t) {
                    for (const e of U || []) for (const n of e.slides) if (n.index === t) return e.index;
                    return -1;
                }
                return B;
            },
            getPageIndexFromPosition: vt,
            getPageProgress: function(t, e) {
                var n;
                void 0 === t && (t = B);
                const i = U[t];
                if (!i) return t > B ? -1 : 1;
                const o = mt(), s = pt();
                let r = i.pos, l = Vt();
                if (q && !0 !== e) {
                    const t = Math.floor((l - (null === (n = U[0]) || void 0 === n ? void 0 : n.pos)) / o) || 0;
                    l -= t * o, r = [ r + o, r, r - o ].reduce(function(t, e) {
                        return Math.abs(e - l) < Math.abs(t - l) ? e : t;
                    });
                }
                return (l - r) / (i.dim + s) || 0;
            },
            getPageVisibility: function(t) {
                var e;
                void 0 === t && (t = B);
                const n = U[t];
                if (!n) return t > B ? -1 : 1;
                const i = Vt(), o = gt();
                let s = n.pos;
                if (q) {
                    const t = mt(), n = s + (Math.floor((i - (null === (e = U[0]) || void 0 === e ? void 0 : e.pos)) / t) || 0) * t;
                    s = [ n + t, n, n - t ].reduce(function(t, e) {
                        return Math.abs(e - i) < Math.abs(t - i) ? e : t;
                    });
                }
                return s > i && s + n.dim < i + o ? 1 : s < i ? (s + n.dim - i) / n.dim || 0 : s + n.dim > i + o && (i + o - s) / n.dim || 0;
            },
            getPages: function() {
                return U;
            },
            getPlugins: function() {
                return R;
            },
            getPosition: Vt,
            getSlides: function() {
                return W;
            },
            getState: function() {
                return P;
            },
            getTotalSlideDim: mt,
            getTween: function() {
                return S;
            },
            getViewport: function() {
                return V;
            },
            getViewportDim: gt,
            getVisibleSlides: function(t) {
                return void 0 === t ? Q : ht(t);
            },
            goTo: Ht,
            hasNavigated: function() {
                return void 0 !== A;
            },
            hideError: Ot,
            hideLoading: Tt,
            init: function() {
                if (!g || !isNode_n(g)) throw new Error("No Element found");
                return 0 !== P && (Dt(), P = 0), H = g, T = x, window.removeEventListener("resize", rt), 
                T.breakpoints && window.addEventListener("resize", rt), rt(), It;
            },
            isInfinite: function() {
                return q;
            },
            isInTransition: function() {
                return K.size > 0;
            },
            isRTL: function() {
                return I;
            },
            isSettled: function() {
                return N;
            },
            isVertical: function() {
                return F;
            },
            localize: function(t, e = []) {
                return it(t, e);
            },
            next: function(t = {}) {
                return Ht(B + 1, t), It;
            },
            off: function(t, e) {
                for (const n of t instanceof Array ? t : [ t ]) ot.has(n) && ot.set(n, ot.get(n).filter(t => t !== e));
                return It;
            },
            on: function(t, e) {
                for (const n of t instanceof Array ? t : [ t ]) ot.set(n, [ ...ot.get(n) || [], e ]);
                return It;
            },
            prev: function(t = {}) {
                return Ht(B - 1, t), It;
            },
            reInit: function(e = {}, n) {
                return Dt(), P = 0, L = void 0, Y = "*", x = e, T = e, isPlainObject_t(n) && (M = n), 
                rt(), It;
            },
            remove: function(t) {
                void 0 === t && (t = W.length - 1);
                const e = W[t];
                return e && (st("removeSlide", e), e.el && (jt(e.el), e.el.remove(), e.el = void 0), 
                W.splice(t, 1), ct(Y), St(), k = clamp_t(G, k, X), Ct()), It;
            },
            setPosition: function(t) {
                k = t, dt(), Ct();
            },
            showError: function(t, e) {
                Tt(t), Ot(t);
                const n = t.el;
                if (n) {
                    const i = document.createElement("div");
                    addClass_s(i, "f-html"), addClass_s(i, "is-error"), i.innerHTML = it(e || "<p>{{ERROR}}</p>"), 
                    t.htmlEl = i, addClass_s(n, "has-html"), addClass_s(n, "has-error"), n.insertAdjacentElement("afterbegin", i), 
                    st("contentReady", t);
                }
                return It;
            },
            showLoading: function(t) {
                const e = t.el, n = null == e ? void 0 : e.querySelector(".f-spinner");
                if (!e || n) return It;
                const i = nt("spinnerTpl"), o = strToHtml_e(i);
                return o && (addClass_s(o, "f-spinner"), e.insertAdjacentElement("beforeend", o)), 
                It;
            },
            version: "6.1.6"
        };
        return It;
    };
    carousel_E.l10n = {
        en_EN: en_EN_o
    }, carousel_E.getDefaults = () => carousel_h;
    /*! License details at fancyapps.com/license */
    const replaceAll_n = function(n = "", t = "", o = "") {
        return n.split(t).join(o);
    };
    /*! License details at fancyapps.com/license */
    const carousel_zoomable_a = {
        tpl: t => `<img class="f-panzoom__content" \n    ${t.srcset ? 'data-lazy-srcset="{{srcset}}"' : ""} \n    ${t.sizes ? 'data-lazy-sizes="{{sizes}}"' : ""} \n    data-lazy-src="{{src}}" alt="{{alt}}" />`
    }, carousel_zoomable_s = () => {
        let s;
        function l(e, o) {
            const n = null == s ? void 0 : s.getOptions().Zoomable;
            let i = (isPlainObject_t(n) ? Object.assign(Object.assign({}, carousel_zoomable_a), n) : carousel_zoomable_a)[e];
            return i && "function" == typeof i && o ? i(o) : i;
        }
        function c() {
            s && !1 !== s.getOptions().Zoomable && (s.on("addSlide", f), s.on("removeSlide", u), 
            s.on("attachSlideEl", g), s.on("click", d), s.on("change", r), s.on("ready", r));
        }
        function r() {
            m();
            const t = (null == s ? void 0 : s.getVisibleSlides()) || [];
            if (t.length > 1 || "slide" === (null == s ? void 0 : s.getOption("transition"))) for (const e of t) {
                const t = e.panzoomRef;
                t && ((null == s ? void 0 : s.getPage().slides) || []).indexOf(e) < 0 && t.execute(v.ZoomTo, Object.assign({}, t.getStartPosition()));
            }
        }
        function d(t, e) {
            const o = e.target;
            o && !e.defaultPrevented && o.dataset.panzoomAction && p(o.dataset.panzoomAction);
        }
        function f(t, i) {
            const a = i.el;
            if (!s || !a || i.panzoomRef) return;
            const c = i.src || i.lazySrc || "", r = i.alt || i.caption || `Image #${i.index}`, d = i.srcset || i.lazySrcset || "", f = i.sizes || i.lazySizes || "";
            if (c && isString_t(c) && !i.html && (!i.type || "image" === i.type)) {
                i.type = "image", i.thumbSrc = i.thumbSrc || c;
                let t = l("tpl", i);
                t = replaceAll_n(t, "{{src}}", c + ""), t = replaceAll_n(t, "{{srcset}}", d + ""), 
                t = replaceAll_n(t, "{{sizes}}", f + ""), a.insertAdjacentHTML("afterbegin", t);
            }
            const u = a.querySelector(".f-panzoom__content");
            if (!u) return;
            u.setAttribute("alt", r + "");
            const g = i.width && "auto" !== i.width ? parseFloat(i.width + "") : "auto", p = i.height && "auto" !== i.height ? parseFloat(i.height + "") : "auto", z = E(a, Object.assign({
                width: g,
                height: p,
                classes: {
                    container: "f-zoomable"
                },
                event: () => null == s ? void 0 : s.getLastMouseMove(),
                spinnerTpl: () => (null == s ? void 0 : s.getOption("spinnerTpl")) || ""
            }, l("Panzoom")));
            z.on("*", (t, e, ...o) => {
                s && ("loading" === e && (i.state = 0), "loaded" === e && (i.state = 1), "error" === e && (i.state = 2, 
                null == s || s.showError(i, "{{IMAGE_ERROR}}")), s.emit(`panzoom:${e}`, i, ...o), 
                "ready" === e && s.emit("contentReady", i), i.index === (null == s ? void 0 : s.getPageIndex()) && m());
            }), i.panzoomRef = z;
        }
        function u(t, e) {
            e.panzoomRef && (e.panzoomRef.destroy(), e.panzoomRef = void 0);
        }
        function g(t, e) {
            const o = e.panzoomRef;
            if (o) switch (o.getState()) {
              case 0:
                o.init();
                break;

              case 3:
                o.execute(v.ZoomTo, Object.assign(Object.assign({}, o.getStartPosition()), {
                    velocity: 0
                }));
            }
        }
        function m() {
            var t, e;
            const o = (null == s ? void 0 : s.getContainer()) || void 0, n = null === (e = null === (t = null == s ? void 0 : s.getPage()) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.panzoomRef;
            if (o) if (n) n.updateControls(o); else for (const t of o.querySelectorAll("[data-panzoom-action]") || []) t.setAttribute("aria-disabled", ""), 
            t.setAttribute("tabindex", "-1");
        }
        function p(t, ...e) {
            var o;
            null === (o = null == s ? void 0 : s.getPage().slides[0].panzoomRef) || void 0 === o || o.execute(t, ...e);
        }
        return {
            init: function(t) {
                s = t, s.on("initPlugins", c);
            },
            destroy: function() {
                if (s) {
                    s.off("initPlugins", c), s.off("addSlide", f), s.off("removeSlide", u), s.off("attachSlideEl", g), 
                    s.off("click", d), s.off("change", r), s.off("ready", r);
                    for (const t of s.getSlides()) u(0, t);
                }
                s = void 0;
            },
            execute: p
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_sync_e = {
        syncOnChange: !1,
        syncOnClick: !0,
        syncOnHover: !1
    }, carousel_sync_i = () => {
        let i, t;
        function o() {
            const t = null == i ? void 0 : i.getOptions().Sync;
            return isPlainObject_t(t) ? Object.assign(Object.assign({}, carousel_sync_e), t) : carousel_sync_e;
        }
        function s(n) {
            var e, s, l;
            i && n && (t = n, i.getOptions().classes = Object.assign(Object.assign({}, i.getOptions().classes), {
                isSelected: ""
            }), i.getOptions().initialSlide = (null === (s = null === (e = t.getPage()) || void 0 === e ? void 0 : e.slides[0]) || void 0 === s ? void 0 : s.index) || 0, 
            o().syncOnChange && i.on("change", c), o().syncOnClick && i.on("click", g), o().syncOnHover && (null === (l = i.getViewport()) || void 0 === l || l.addEventListener("mouseover", u)), 
            function() {
                if (!i || !t) return;
                i.on("ready", d), i.on("refresh", a), t.on("change", r), t.on("filter", f);
            }());
        }
        function l() {
            const n = o().target;
            i && n && s(n);
        }
        function d() {
            v();
        }
        function c() {
            var n;
            if (i && t) {
                const e = (null === (n = i.getPage()) || void 0 === n ? void 0 : n.slides) || [], o = t.getPageIndex(e[0].index || 0);
                o > -1 && t.goTo(o, i.hasNavigated() ? void 0 : {
                    tween: !1,
                    transition: !1
                }), v();
            }
        }
        function r() {
            var n;
            if (i && t) {
                const e = i.getPageIndex((null === (n = t.getPage()) || void 0 === n ? void 0 : n.slides[0].index) || 0);
                e > -1 && i.goTo(e, t.hasNavigated() ? void 0 : {
                    tween: !1,
                    transition: !1
                }), v();
            }
        }
        function g(n, e) {
            var o;
            if (!i || !t) return;
            if (null === (o = i.getTween()) || void 0 === o ? void 0 : o.isRunning()) return;
            const s = null == i ? void 0 : i.getOptions().classes.slide;
            if (!s) return;
            const l = s ? e.target.closest(`.${s}`) : null;
            if (l) {
                const n = parseInt(l.getAttribute("index") || "") || 0, e = t.getPageIndex(n);
                t.goTo(e);
            }
        }
        function u(n) {
            i && g(0, n);
        }
        function a() {
            var n;
            if (i && t) {
                const e = i.getPageIndex((null === (n = t.getPage()) || void 0 === n ? void 0 : n.slides[0].index) || 0);
                e > -1 && i.goTo(e, {
                    tween: !1,
                    transition: !1
                }), v();
            }
        }
        function f(n, e) {
            i && t && (i.filter(e), r());
        }
        function v() {
            var n, e, o;
            if (!t) return;
            const s = (null === (e = null === (n = t.getPage()) || void 0 === n ? void 0 : n.slides[0]) || void 0 === e ? void 0 : e.index) || 0;
            for (const n of (null == i ? void 0 : i.getSlides()) || []) null === (o = n.el) || void 0 === o || o.classList.toggle("is-selected", n.index === s);
        }
        return {
            init: function(n) {
                i = n, i.on("initSlides", l);
            },
            destroy: function() {
                var n;
                null == i || i.off("ready", d), null == i || i.off("refresh", a), null == i || i.off("change", c), 
                null == i || i.off("click", g), null === (n = null == i ? void 0 : i.getViewport()) || void 0 === n || n.removeEventListener("mouseover", u), 
                null == t || t.off("change", r), null == t || t.off("filter", f), t = void 0, null == i || i.off("initSlides", l), 
                i = void 0;
            },
            getTarget: function() {
                return t;
            }
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_lazyload_s = {
        showLoading: !0,
        preload: 1
    }, carousel_lazyload_n = "is-lazyloading", carousel_lazyload_o = "is-lazyloaded", carousel_lazyload_l = "has-lazyerror", carousel_lazyload_i = () => {
        let i;
        function d() {
            const e = null == i ? void 0 : i.getOptions().Lazyload;
            return isPlainObject_t(e) ? Object.assign(Object.assign({}, carousel_lazyload_s), e) : carousel_lazyload_s;
        }
        function r(t) {
            var s;
            const r = t.el;
            if (!r) return;
            const c = "[data-lazy-src],[data-lazy-srcset],[data-lazy-bg]", u = Array.from(r.querySelectorAll(c));
            r.matches(c) && u.push(r);
            for (const r of u) {
                const c = r.dataset.lazySrc, u = r.dataset.lazySrcset, f = r.dataset.lazySizes, m = r.dataset.lazyBg, y = (r instanceof HTMLImageElement || r instanceof HTMLSourceElement) && (c || u), z = r instanceof HTMLElement && m;
                if (!y && !z) continue;
                const g = c || u || m;
                if (g) {
                    if (y && g) {
                        const m = null === (s = r.parentElement) || void 0 === s ? void 0 : s.classList.contains("f-panzoom__wrapper");
                        d().showLoading && (null == i || i.showLoading(t)), r.addEventListener("load", () => {
                            null == i || i.hideLoading(t), removeClass_s(r, carousel_lazyload_l), r instanceof HTMLImageElement ? r.decode().then(() => {
                                removeClass_s(r, carousel_lazyload_n), addClass_s(r, carousel_lazyload_o);
                            }) : (removeClass_s(r, carousel_lazyload_n), addClass_s(r, carousel_lazyload_o)), 
                            m || null == i || i.emit("lazyLoad:loaded", t, r, g);
                        }), r.addEventListener("error", () => {
                            null == i || i.hideLoading(t), removeClass_s(r, carousel_lazyload_n), addClass_s(r, carousel_lazyload_l), 
                            m || null == i || i.emit("lazyLoad:error", t, r, g);
                        }), r.classList.add("f-lazyload"), r.classList.add(carousel_lazyload_n), m || null == i || i.emit("lazyLoad:load", t, r, g), 
                        c && (r.src = c), u && (r.srcset = u), f && (r.sizes = f);
                    } else if (z) {
                        if (!document.body.contains(r)) document.createElement("img").src = m;
                        r.style.backgroundImage = `url('${m}')`;
                    }
                    delete r.dataset.lazySrc, delete r.dataset.lazySrcset, delete r.dataset.lazySizes, 
                    delete r.dataset.lazyBg;
                }
            }
        }
        function c() {
            if (!i) return;
            const e = [ ...i.getVisibleSlides() ], t = d().preload;
            if (t > 0) {
                const a = i.getPosition(), s = i.getViewportDim();
                e.push(...i.getVisibleSlides(a + s * t), ...i.getVisibleSlides(a - s * t));
            }
            for (const t of e) r(t);
        }
        return {
            init: function(e) {
                i = e, i.on("render", c);
            },
            destroy: function() {
                null == i || i.off("render", c), i = void 0;
            }
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_arrows_r = '<svg width="24" height="24" viewBox="0 0 24 24" tabindex="-1">', carousel_arrows_i = "</svg>", carousel_arrows_s = {
        prevTpl: carousel_arrows_r + '<path d="M15 3l-9 9 9 9"></path>' + carousel_arrows_i,
        nextTpl: carousel_arrows_r + '<path d="M9 3l9 9-9 9"></path>' + carousel_arrows_i
    }, carousel_arrows_l = () => {
        let r, i, l;
        function a() {
            const t = null == r ? void 0 : r.getOptions().Arrows;
            return isPlainObject_t(t) ? Object.assign(Object.assign({}, carousel_arrows_s), t) : carousel_arrows_s;
        }
        function u(e) {
            if (!r) return;
            const o = `<button data-carousel-go-${e} tabindex="0" class="f-button is-arrow is-${e}" title="{{${e.toUpperCase()}}}">` + a()[`${e}Tpl`] + "</button", i = strToHtml_e(r.localize(o)) || void 0;
            return i && addClass_s(i, a()[`${e}Class`]), i;
        }
        function c() {
            var t;
            null == i || i.remove(), i = void 0, null == l || l.remove(), l = void 0, null === (t = null == r ? void 0 : r.getContainer()) || void 0 === t || t.classList.remove("has-arrows");
        }
        function d() {
            r && !1 !== r.getOptions().Arrows && r.getPages().length > 1 ? (!function() {
                if (!r) return;
                const t = r.getViewport();
                t && (i || (i = u("prev"), i && t.insertAdjacentElement("beforebegin", i)), l || (l = u("next"), 
                l && t.insertAdjacentElement("afterend", l)), toggleClass_s(r.getContainer(), "has-arrows", !(!i && !l)));
            }(), r && (null == i || i.toggleAttribute("aria-disabled", !r.canGoPrev()), null == l || l.toggleAttribute("aria-disabled", !r.canGoNext()))) : c();
        }
        return {
            init: function(t) {
                r = t.on([ "change", "refresh" ], d);
            },
            destroy: function() {
                c(), null == r || r.off([ "change", "refresh" ], d), r = void 0;
            }
        };
    };
    /*! License details at fancyapps.com/license */
    const buttons_t = '<circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/>', buttons_M = '<g><line x1="11" y1="8" x2="11" y2="14"></line></g>' + buttons_t, buttons_o = {
        moveLeft: [ "moveLeft", "MOVE_LEFT", '<path d="M5 12h14M5 12l6 6M5 12l6-6"/>' ],
        moveRight: [ "moveRight", "MOVE_RIGHT", '<path d="M5 12h14M13 18l6-6M13 6l6 6"/>' ],
        moveUp: [ "moveUp", "MOVE_UP", '<path d="M12 5v14M18 11l-6-6M6 11l6-6"/>' ],
        moveDown: [ "moveDown", "MOVE_DOWN", '<path d="M12 5v14M18 13l-6 6M6 13l6 6"/>' ],
        zoomOut: [ "zoomOut", "ZOOM_OUT", buttons_t ],
        zoomIn: [ "zoomIn", "ZOOM_IN", buttons_M ],
        toggleFull: [ "toggleFull", "TOGGLE_FULL", buttons_M ],
        iterateZoom: [ "iterateZoom", "ITERATE_ZOOM", buttons_M ],
        toggle1to1: [ "toggleFull", "TOGGLE_FULL", '<path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/>' ],
        rotateCCW: [ "rotateCCW", "ROTATE_CCW", '<path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/>' ],
        rotateCW: [ "rotateCW", "ROTATE_CW", '<path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/>' ],
        flipX: [ "flipX", "FLIP_X", '<path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/>' ],
        flipY: [ "flipY", "FLIP_Y", '<path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/>' ],
        reset: [ "reset", "RESET", '<path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>' ],
        toggleFS: [ "toggleFS", "TOGGLE_FS", '<g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g>' ]
    }, buttons_v = {};
    for (const [t, M] of Object.entries(buttons_o)) buttons_v[t] = {
        tpl: `<button data-panzoom-action="${M[0]}" class="f-button" title="{{${M[1]}}}"><svg>${M[2]}</svg></button>`
    };
    /*! License details at fancyapps.com/license */
    var carousel_toolbar_l;
    !function(t) {
        t.Left = "left", t.middle = "middle", t.right = "right";
    }(carousel_toolbar_l || (carousel_toolbar_l = {}));
    const carousel_toolbar_s = Object.assign({
        counter: {
            tpl: '<div class="f-counter"><span data-carousel-page></span>/<span data-carousel-pages></span></div>'
        },
        download: {
            tpl: '<button data-carousel-download class="f-button" title="{{DOWNLOAD}}"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></button>'
        },
        autoplay: {
            tpl: '<button data-autoplay-action="toggle" class="f-button" title="{{TOGGLE_AUTOPLAY}}"><svg><g><path d="M5 3.5 19 12 5 20.5Z"/></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
        },
        thumbs: {
            tpl: '<button data-thumbs-action="toggle" class="f-button" title="{{TOGGLE_THUMBS}}"><svg><rect width="18" height="14" x="3" y="3" rx="2"/><path d="M4 21h1M9 21h1M14 21h1M19 21h1"/></svg></button>'
        }
    }, buttons_v), carousel_toolbar_a = {
        absolute: !1,
        display: {
            left: [],
            middle: [ "zoomIn", "zoomOut", "toggle1to1", "rotateCCW", "rotateCW", "flipX", "flipY", "reset" ],
            right: []
        },
        enabled: "auto",
        items: {}
    }, carousel_toolbar_r = () => {
        let l, r;
        function u(e) {
            const o = null == l ? void 0 : l.getOptions().Toolbar;
            let n = (isPlainObject_t(o) ? Object.assign(Object.assign({}, carousel_toolbar_a), o) : carousel_toolbar_a)[e];
            return n && "function" == typeof n && l ? n(l) : n;
        }
        function c() {
            var a, c;
            if (!(null == l ? void 0 : l.getOptions().Toolbar)) return;
            if (!l || r) return;
            const d = l.getContainer();
            if (!d) return;
            let f = u("enabled");
            if (!f) return;
            const g = u("absolute"), p = l.getSlides().length > 1;
            let b = !1, m = !1;
            for (const t of l.getSlides()) t.panzoomRef && (b = !0), (t.downloadSrc || "image" === t.type && t.src) && (m = !0);
            const v = (null === (a = l.getPlugins().Thumbs) || void 0 === a ? void 0 : a.isEnabled()) || !1, h = p && l.getPlugins().Autoplay || !1, E = l.getPlugins().Fullscreen && (document.fullscreenEnabled || document.webkitFullscreenEnabled);
            if ("auto" === f && (f = b), !f) return;
            r = d.querySelector(".f-carousel__toolbar") || void 0, r || (r = document.createElement("div"), 
            r.classList.add("f-carousel__toolbar"));
            const y = u("display"), j = extend_r({}, carousel_toolbar_s, u("items"));
            for (const i of [ "left", "middle", "right" ]) {
                const s = y[i] || [], a = document.createElement("div");
                a.classList.add("f-carousel__toolbar__column"), a.classList.add(`is-${i}`);
                for (const i of s) {
                    let s;
                    if (isString_t(i)) {
                        if ("counter" === i && !p) continue;
                        if ("autoplay" === i && !h) continue;
                        if (buttons_v[i] && !b) continue;
                        if ("fullscreen" === i && !E) continue;
                        if ("thumbs" === i && !v) continue;
                        if ("download" === i && !m) continue;
                        s = j[i];
                    }
                    if (isPlainObject_t(i) && (s = i), s && s.tpl) {
                        let t = l.localize(s.tpl);
                        t = t.split("<svg>").join('<svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24">');
                        const e = strToHtml_e(t);
                        e && ("function" == typeof s.click && l && e.addEventListener("click", t => {
                            t.preventDefault(), t.stopPropagation(), "function" == typeof s.click && l && s.click(l, t);
                        }), a.append(e));
                    }
                }
                r.append(a);
            }
            if (r.childElementCount) {
                if (g && r.classList.add("is-absolute"), !r.parentElement) {
                    const t = u("parentEl");
                    t ? t.insertAdjacentElement("afterbegin", r) : null === (c = l.getViewport()) || void 0 === c || c.insertAdjacentElement("beforebegin", r);
                }
                d.contains(r) && d.classList.add("has-toolbar");
            }
        }
        return {
            init: function(t) {
                l = t, null == l || l.on("initSlides", c);
            },
            destroy: function() {
                var t;
                null == l || l.off("initSlides", c), null === (t = null == l ? void 0 : l.getContainer()) || void 0 === t || t.classList.remove("has-toolbar"), 
                null == r || r.remove(), r = void 0;
            },
            add: function(t, e) {
                carousel_toolbar_s[t] = e;
            },
            isEnabled: function() {
                return !!r;
            }
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_autoplay_n = {
        autoStart: !0,
        pauseOnHover: !0,
        showProgressbar: !0,
        timeout: 2e3
    }, carousel_autoplay_o = () => {
        let o, i, a = !1, s = !1, l = !1, r = null;
        function u(e) {
            const i = null == o ? void 0 : o.getOptions().Autoplay;
            let a = (isPlainObject_t(i) ? Object.assign(Object.assign({}, carousel_autoplay_n), i) : carousel_autoplay_n)[e];
            return a && "function" == typeof a && o ? a(o) : a;
        }
        function f() {
            clearTimeout(i), i = void 0;
        }
        function g() {
            if (!o || !a || l || s || i || !o.isSettled() || function() {
                var t;
                const e = (null === (t = null == o ? void 0 : o.getPage()) || void 0 === t ? void 0 : t.slides) || [];
                for (const t of e) if (0 === t.state) return !0;
                return !1;
            }()) return;
            !function() {
                var t, n, i, a;
                if (!o) return;
                if (v(), !u("showProgressbar")) return;
                let s = u("progressbarParentEl");
                !s && (null === (t = o.getPlugins().Toolbar) || void 0 === t ? void 0 : t.isEnabled()) && (s = o.getContainer());
                if (!s && !0 !== (null === (n = o.getPlugins().Toolbar) || void 0 === n ? void 0 : n.isEnabled())) {
                    const t = (null === (i = o.getPages()[0]) || void 0 === i ? void 0 : i.slides) || [], e = (null === (a = o.getPage()) || void 0 === a ? void 0 : a.slides) || [];
                    1 === t.length && 1 === e.length && (s = e[0].el);
                }
                s || (s = o.getViewport());
                if (!s) return;
                r = document.createElement("div"), addClass_s(r, "f-progressbar"), s.prepend(r);
                const l = u("timeout") || 1e3;
                r.style.animationDuration = `${l}ms`;
            }();
            const t = u("timeout");
            i = setTimeout(() => {
                o && a && !s && (o.isInfinite() || o.getPageIndex() !== o.getPages().length - 1 ? o.next() : o.goTo(0));
            }, t);
        }
        function c() {
            var t;
            if (!o || o.getPages().length < 2 || !1 === o.getOptions().Autoplay) return;
            if (a) return;
            a = !0, o.emit("autoplay:start", u("timeout")), addClass_s(o.getContainer(), "has-autoplay"), 
            null === (t = o.getTween()) || void 0 === t || t.on("start", b);
            const n = null == o ? void 0 : o.getContainer();
            n && u("pauseOnHover") && matchMedia("(hover: hover)").matches && (n.addEventListener("mouseenter", E, !1), 
            n.addEventListener("mouseleave", w, !1)), o.on("change", P), o.on("settle", y), 
            o.on("contentReady", p), o.on("panzoom:touchStart", d), o.on("panzoom:wheel", d), 
            o.isSettled() && g();
        }
        function d() {
            var t;
            if (f(), v(), o) {
                if (a) {
                    o.emit("autoplay:end"), null === (t = o.getTween()) || void 0 === t || t.off("start", b);
                    const e = o.getContainer();
                    e && (e.classList.remove("has-autoplay"), e.removeEventListener("mouseenter", E, !1), 
                    e.removeEventListener("mouseleave", w, !1));
                }
                o.off("change", P), o.off("settle", y), o.off("contentReady", p), o.off("panzoom:touchStart", d), 
                o.off("panzoom:wheel", d);
            }
            a = !1, s = !1;
        }
        function v() {
            r && (r.remove(), r = null);
        }
        function m() {
            o && o.getPages().length > 1 && u("autoStart") && c();
        }
        function p() {
            g();
        }
        function h(t, e) {
            const n = e.target;
            n && !e.defaultPrevented && "toggle" === n.dataset.autoplayAction && O.toggle();
        }
        function P() {
            !o || !(null == o ? void 0 : o.isInfinite()) && o.getPageIndex() === o.getPages().length - 1 ? d() : (v(), 
            f());
        }
        function y() {
            g();
        }
        function b() {
            f(), v();
        }
        function E() {
            l = !0, a && (v(), f());
        }
        function w() {
            l = !1, a && !s && (null == o ? void 0 : o.isSettled()) && g();
        }
        const O = {
            init: function(t) {
                o = t, o.on("ready", m), o.on("click", h);
            },
            destroy: function() {
                d(), null == o || o.off("ready", m), null == o || o.off("click", h), o = void 0;
            },
            isEnabled: () => a,
            pause: function() {
                s = !0, f();
            },
            resume: function() {
                s = !1, a && !l && g();
            },
            start() {
                c();
            },
            stop() {
                d();
            },
            toggle() {
                a ? d() : c();
            }
        };
        return O;
    };
    /*! License details at fancyapps.com/license */
    const carousel_thumbs_u = {
        Carousel: {
            Lazyload: {
                showLoading: !1
            }
        },
        minCount: 2,
        showOnStart: !0,
        thumbTpl: '<button aria-label="Slide to #{{page}}"><img draggable="false" alt="{{alt}}" data-lazy-src="{{src}}" /></button>',
        type: "modern"
    };
    let carousel_thumbs_a;
    const carousel_thumbs_c = () => {
        let c, d, f, m, g, h = 0, v = 0, p = !0;
        function b(e) {
            const n = null == c ? void 0 : c.getOptions().Thumbs;
            let o = (isPlainObject_t(n) ? Object.assign(Object.assign({}, carousel_thumbs_u), n) : carousel_thumbs_u)[e];
            return o && "function" == typeof o && c ? o(c) : o;
        }
        function y() {
            if (!c) return !1;
            if (!1 === (null == c ? void 0 : c.getOptions().Thumbs)) return !1;
            let t = 0;
            for (const e of c.getSlides()) e.thumbSrc && t++;
            return t >= b("minCount");
        }
        function x() {
            return "modern" === b("type");
        }
        function S() {
            return "scrollable" === b("type");
        }
        function C() {
            const t = [], e = (null == c ? void 0 : c.getSlides()) || [];
            for (const n of e) t.push({
                index: n.index,
                class: n.thumbClass,
                html: T(n)
            });
            return t;
        }
        function T(t) {
            const e = t.thumb ? t.thumb instanceof HTMLImageElement ? t.thumb.src : t.thumb : t.thumbSrc || void 0, o = void 0 === t.thumbAlt ? `Thumbnail #${t.index}` : t.thumbAlt + "";
            let i = b("thumbTpl");
            return i = replaceAll_n(i, "{{alt}}", o), i = replaceAll_n(i, "{{src}}", e + ""), 
            i = replaceAll_n(i, "{{index}}", `${t.index}`), i = replaceAll_n(i, "{{page}}", `${t.index || 1}`), 
            i;
        }
        function L(t) {
            return `<div index="${t.index || 0}" class="f-thumbs__slide ${t.class || ""}">${t.html || ""}</div>`;
        }
        function E(t = !1) {
            var e;
            const n = null == c ? void 0 : c.getContainer();
            if (!c || !n || f) return;
            if (!y()) return;
            const o = (null === (e = b("Carousel")) || void 0 === e ? void 0 : e.classes) || {};
            if (o.container = o.container || "f-thumbs", !f) {
                const t = n.nextElementSibling;
                (null == t ? void 0 : t.classList.contains(o.container)) && (f = t);
            }
            if (!f) {
                f = document.createElement("div");
                const t = b("parentEl");
                t ? t.insertAdjacentElement("beforeend", f) : n.insertAdjacentElement("afterend", f);
            }
            addClass_s(f, o.container), addClass_s(f, "f-thumbs"), addClass_s(f, `is-${b("type")}`), 
            t && addClass_s(f, "is-hidden");
        }
        function P() {
            if (!f || !S()) return;
            m = document.createElement("div"), addClass_s(m, "f-thumbs__viewport");
            let t = "";
            for (const e of C()) "string" == typeof (e.html || "") && (t += L(e));
            m.innerHTML = t, f.append(m), f.addEventListener("click", t => {
                t.preventDefault();
                const e = t.target.closest("[index]"), n = parseInt((null == e ? void 0 : e.getAttribute("index")) || "-1");
                c && n > -1 && c.goTo(n);
            }), g = new IntersectionObserver(t => {
                t.forEach(t => {
                    t.isIntersecting && t.target instanceof HTMLImageElement && (t.target.src = t.target.getAttribute("data-lazy-src") + "", 
                    t.target.removeAttribute("data-lazy-src"), null == g || g.unobserve(t.target));
                });
            }, {
                root: m,
                rootMargin: "100px"
            }), f.querySelectorAll("[data-lazy-src]").forEach(t => {
                null == g || g.observe(t);
            }), null == c || c.emit("thumbs:ready");
        }
        function w() {
            var t;
            if (!carousel_thumbs_a || !c || !f || S() || d) return;
            const n = C();
            if (!n.length) return;
            const o = extend_r({}, {
                Sync: {
                    target: c
                },
                Lazyload: {
                    preload: 1
                },
                slides: n,
                classes: {
                    container: "f-thumbs",
                    viewport: "f-thumbs__viewport",
                    slide: "f-thumbs__slide"
                },
                center: !0,
                fill: !x(),
                infinite: !1,
                dragFree: !0,
                rtl: c.getOptions().rtl || !1,
                slidesPerPage: t => {
                    let e = 0;
                    return x() && (!function() {
                        if (!x()) return;
                        if (!f) return;
                        const t = t => f && parseFloat(getComputedStyle(f).getPropertyValue("--f-thumb-" + t)) || 0;
                        h = t("width"), v = t("clip-width");
                    }(), e = 4 * (h - v)), t && t.getTotalSlideDim() <= t.getViewportDim() - e ? 1 / 0 : 1;
                }
            }, carousel_thumbs_u.Carousel || {}, b("Carousel") || {});
            d = carousel_thumbs_a(f, o, {
                Sync: carousel_sync_i,
                Lazyload: carousel_lazyload_i
            }), d.on("ready", () => {
                addClass_s(f, "is-syncing"), null == c || c.emit("thumbs:ready"), x() && (null == c || c.on("render", $));
            }), d.on("destroy", () => {
                null == c || c.emit("thumbs:destroy");
            }), d.init(), null === (t = d.getGestures()) || void 0 === t || t.on("start", () => {
                p = !1;
            }), d.on("click", (t, e) => {
                const n = e.target;
                if (n) {
                    const t = n.matches("button") ? n : n.firstElementChild;
                    t && t.matches("button") && (e.preventDefault(), t.focus({
                        preventScroll: !0
                    }));
                }
            }), addClass_s(c.getContainer(), "has-thumbs"), R();
        }
        function j() {
            y() && b("showOnStart") && (E(), P());
        }
        function A() {
            var t;
            y() && (w(), null == c || c.on("addSlide", z), null == c || c.on("removeSlide", _), 
            null == c || c.on("click", I), null == c || c.on("refresh", q), null === (t = null == c ? void 0 : c.getGestures()) || void 0 === t || t.on("start", M), 
            D(!0));
        }
        function M() {
            var t, e;
            p = !0;
            (null === (t = document.activeElement) || void 0 === t ? void 0 : t.closest(".f-thumbs")) && (null === (e = document.activeElement) || void 0 === e || e.blur());
        }
        function $() {
            var t, e;
            null == f || f.classList.toggle("is-syncing", !1 === (null == c ? void 0 : c.hasNavigated()) || (null === (t = null == c ? void 0 : c.getTween()) || void 0 === t ? void 0 : t.isRunning())), 
            R(), (null === (e = null == c ? void 0 : c.getGestures()) || void 0 === e ? void 0 : e.isPointerDown()) && function() {
                if (!x()) return;
                if (!c || !d) return;
                if (!p) return;
                const t = d.getTween(), e = d.getPages(), n = c.getPageIndex() || 0, i = c.getPageProgress() || 0;
                if (!(c && e && e[n] && t)) return;
                const l = t.isRunning() ? t.getCurrentValues().pos : d.getPosition();
                if (void 0 === l) return;
                let r = e[n].pos + i * (h - v);
                r = clamp_t(e[0].pos, r, e[e.length - 1].pos), t.from({
                    pos: l
                }).to({
                    pos: r
                }).start();
            }();
        }
        function O() {
            p = !0, D();
        }
        function z(t, e) {
            const n = {
                html: T(e)
            };
            if (d) d.add(n, e.index); else if (m) {
                const t = strToHtml_e(L(n));
                if (t) {
                    m.append(t);
                    const e = t.querySelector("img");
                    e && (null == g || g.observe(e));
                }
            }
        }
        function _(t, e) {
            var n;
            d ? d.remove(e.index) : m && (null === (n = m.querySelector(`[index="${e.index}"]`)) || void 0 === n || n.remove());
        }
        function I(t, e) {
            var n;
            const o = e.target;
            e.defaultPrevented || "toggle" !== (null === (n = null == o ? void 0 : o.dataset) || void 0 === n ? void 0 : n.thumbsAction) || (f || (E(!0), 
            P(), w()), f && f.classList.toggle("is-hidden"));
        }
        function q() {
            D();
        }
        function D(t = !1) {
            if (!c || !m || !S()) return;
            const e = c.getPageIndex();
            m.querySelectorAll(".is-selected").forEach(t => {
                t.classList.remove("is-selected");
            });
            const n = m.querySelector(`[index="${e}"]`);
            if (n) {
                n.classList.add("is-selected");
                const e = m.getBoundingClientRect(), o = n.getBoundingClientRect(), i = n.offsetTop - m.offsetTop - .5 * e.height + .5 * o.height, l = n.scrollLeft - m.scrollLeft - .5 * e.width + .5 * o.width;
                m.scrollTo({
                    top: i,
                    left: l,
                    behavior: t ? "instant" : "smooth"
                });
            }
        }
        function R() {
            if (!x()) return;
            if (!c || !d) return;
            const t = (null == d ? void 0 : d.getSlides()) || [];
            let e = -.5 * h;
            for (const n of t) {
                const t = n.el;
                if (!t) continue;
                let o = c.getPageProgress(n.index) || 0;
                o = Math.max(-1, Math.min(1, o)), o > -1 && o < 1 && (e += .5 * h * (1 - Math.abs(o))), 
                o = Math.round(1e4 * o) / 1e4, e = Math.round(1e4 * e) / 1e4, t.style.setProperty("--progress", `${Math.abs(o)}`), 
                t.style.setProperty("--shift", `${(null == c ? void 0 : c.isRTL()) ? -1 * e : e}px`), 
                o > -1 && o < 1 && (e += .5 * h * (1 - Math.abs(o)));
            }
        }
        return {
            init: function(t, e) {
                carousel_thumbs_a = e, c = t, c.on("ready", A), c.on("initSlides", j), c.on("change", O);
            },
            destroy: function() {
                var t, e;
                S() && (null == c || c.emit("thumbs:destroy")), null == c || c.off("ready", A), 
                null == c || c.off("initSlides", j), null == c || c.off("change", O), null == c || c.off("render", $), 
                null == c || c.off("addSlide", z), null == c || c.off("click", I), null == c || c.off("refresh", q), 
                null === (t = null == c ? void 0 : c.getGestures()) || void 0 === t || t.off("start", M), 
                null === (e = null == c ? void 0 : c.getContainer()) || void 0 === e || e.classList.remove("has-thumbs"), 
                c = void 0, null == d || d.destroy(), d = void 0, null == f || f.remove(), f = void 0;
            },
            getCarousel: function() {
                return d;
            },
            getContainer: function() {
                return f;
            },
            getType: function() {
                return b("type");
            },
            isEnabled: y
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_html_a = {
        iframeAttr: {
            allow: "autoplay; fullscreen",
            scrolling: "auto"
        }
    }, carousel_html_i = () => {
        let i;
        function l(t, a) {
            let i = a.src;
            if (!isString_t(i)) return;
            let l = a.type;
            if (!l) {
                if (l || ("#" === i.charAt(0) ? l = "inline" : i.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.((a)?png|avif|gif|jp(g|eg)|pjp(eg)?|jfif|svg|webp|bmp|ico|tif(f)?)((\?|#).*)?$)/i) ? l = "image" : i.match(/\.(pdf)((\?|#).*)?$/i) ? l = "pdf" : i.match(/\.(html|php)((\?|#).*)?$/i) && (l = "iframe")), 
                !l) {
                    const t = i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i);
                    t && (i = `https://maps.google.${t[1]}/?ll=${(t[2] ? t[2] + "&z=" + Math.floor(parseFloat(t[3])) + (t[4] ? t[4].replace(/^\//, "&") : "") : t[4] + "").replace(/\?/, "&")}&output=${t[4] && t[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, 
                    l = "gmap");
                }
                if (!l) {
                    const t = i.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i);
                    t && (i = `https://maps.google.${t[1]}/maps?q=${t[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, 
                    l = "gmap");
                }
                a.src = i, a.type = l;
            }
        }
        function o(e, l) {
            "iframe" !== l.type && "pdf" !== l.type && "gmap" !== l.type || function(e) {
                if (!i || !e.el || !e.src) return;
                const l = document.createElement("iframe");
                l.classList.add("f-iframe");
                for (const [e, o] of Object.entries(function() {
                    const e = null == i ? void 0 : i.getOptions().Html;
                    return isPlainObject_t(e) ? Object.assign(Object.assign({}, carousel_html_a), e) : carousel_html_a;
                }().iframeAttr || {})) l.setAttribute(e, o);
                l.onerror = () => {
                    i && 1 === i.getState() && i.showError(e, "{{IFRAME_ERROR}}");
                }, l.src = e.src;
                const o = document.createElement("div");
                if (o.classList.add("f-html"), o.append(l), e.width) {
                    let t = `${e.width}`;
                    t.match(/^\d+$/) && (t += "px"), o.style.maxWidth = `${t}`;
                }
                if (e.height) {
                    let t = `${e.height}`;
                    t.match(/^\d+$/) && (t += "px"), o.style.maxHeight = `${t}`;
                }
                if (e.aspectRatio) {
                    const t = e.el.getBoundingClientRect();
                    o.style.aspectRatio = `${e.aspectRatio}`, o.style[t.width > t.height ? "width" : "height"] = "auto", 
                    o.style[t.width > t.height ? "maxWidth" : "maxHeight"] = "none";
                }
                e.contentEl = l, e.htmlEl = o, e.el.classList.add("has-html"), e.el.classList.add("has-iframe"), 
                e.el.classList.add(`has-${e.type}`), e.el.prepend(o), i.emit("contentReady", e);
            }(l);
        }
        function n(t, e) {
            var a, l;
            "iframe" !== e.type && "pdf" !== e.type && "gmap" !== e.type || (null == i || i.hideError(e), 
            null === (a = e.contentEl) || void 0 === a || a.remove(), e.contentEl = void 0, 
            null === (l = e.htmlEl) || void 0 === l || l.remove(), e.htmlEl = void 0);
        }
        return {
            init: function(t) {
                i = t, i.on("addSlide", l), i.on("attachSlideEl", o), i.on("detachSlideEl", n);
            },
            destroy: function() {
                null == i || i.off("addSlide", l), null == i || i.off("attachSlideEl", o), null == i || i.off("detachSlideEl", n), 
                i = void 0;
            }
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_video_n = (t, e = {}) => {
        const o = new URL(t), n = new URLSearchParams(o.search), i = new URLSearchParams;
        for (const [t, o] of [ ...n, ...Object.entries(e) ]) {
            let e = o + "";
            if ("t" === t) {
                let t = e.match(/((\d*)m)?(\d*)s?/);
                t && i.set("start", 60 * parseInt(t[2] || "0") + parseInt(t[3] || "0") + "");
            } else i.set(t, e);
        }
        let l = i + "", s = t.match(/#t=((.*)?\d+s)/);
        return s && (l += `#t=${s[1]}`), l;
    }, carousel_video_i = {
        autoplay: !1,
        html5videoTpl: '<video class="f-html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n    <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
        iframeAttr: {
            allow: "autoplay; fullscreen",
            scrolling: "auto",
            credentialless: ""
        },
        vimeo: {
            byline: 1,
            color: "00adef",
            controls: 1,
            dnt: 1,
            muted: 0
        },
        youtube: {
            controls: 1,
            enablejsapi: 1,
            nocookie: 1,
            rel: 0,
            fs: 1
        }
    }, carousel_video_l = () => {
        let l, s = !1;
        function a() {
            const e = null == l ? void 0 : l.getOptions().Video;
            return isPlainObject_t(e) ? Object.assign(Object.assign({}, carousel_video_i), e) : carousel_video_i;
        }
        function r() {
            var t;
            return null === (t = null == l ? void 0 : l.getPage()) || void 0 === t ? void 0 : t.slides[0];
        }
        const c = t => {
            var e;
            try {
                let o = JSON.parse(t.data);
                if ("https://player.vimeo.com" === t.origin) {
                    if ("ready" === o.event) for (let o of Array.from((null === (e = null == l ? void 0 : l.getContainer()) || void 0 === e ? void 0 : e.getElementsByClassName("f-iframe")) || [])) o instanceof HTMLIFrameElement && o.contentWindow === t.source && (o.dataset.ready = "true");
                } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === o.event) {
                    const t = document.getElementById(o.id);
                    t && (t.dataset.ready = "true");
                }
            } catch (t) {}
        };
        function d(t, o) {
            const i = o.src;
            if (!isString_t(i)) return;
            let l = o.type;
            if (!l || "html5video" === l) {
                const t = i.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i);
                t && (l = "html5video", o.html5videoFormat = o.html5videoFormat || "video/" + ("ogv" === t[1] ? "ogg" : t[1]));
            }
            if (!l || "youtube" === l) {
                const t = i.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i);
                if (t) {
                    const e = Object.assign(Object.assign({}, a().youtube), o.youtube || {}), s = `www.youtube${e.nocookie ? "-nocookie" : ""}.com`, r = carousel_video_n(i, e), c = encodeURIComponent(t[2]);
                    o.videoId = c, o.src = `https://${s}/embed/${c}?${r}`, o.thumb = o.thumb || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, 
                    l = "youtube";
                }
            }
            if (!l || "vimeo" === l) {
                const t = i.match(/^.+vimeo.com\/(?:\/)?(video\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/);
                if (t) {
                    const e = Object.assign(Object.assign({}, a().vimeo), o.vimeo || {}), s = carousel_video_n(i, e), r = encodeURIComponent(t[2]), c = t[5] || "";
                    o.videoId = r, o.src = `https://player.vimeo.com/video/${r}?${c ? `h=${c}${s ? "&" : ""}` : ""}${s}`, 
                    l = "vimeo";
                }
            }
            o.type = l;
        }
        function u(t, n) {
            "html5video" === n.type && function(t) {
                if (!l || !t.el || !t.src) return;
                const {el: n, src: i} = t;
                if (!n || !i) return;
                const s = t.html5videoTpl || a().html5videoTpl, r = t.html5videoFormat || a().html5videoFormat;
                if (!s) return;
                const c = t.poster || (t.thumb && isString_t(t.thumb) ? t.thumb : ""), d = strToHtml_e(s.replace(/\{\{src\}\}/gi, i + "").replace(/\{\{format\}\}/gi, r || "").replace(/\{\{poster\}\}/gi, c + ""));
                if (!d) return;
                const u = document.createElement("div");
                u.classList.add("f-html"), u.append(d), t.contentEl = d, t.htmlEl = u, n.classList.add(`has-${t.type}`), 
                n.prepend(u), h(t), l.emit("contentReady", t);
            }(n), "youtube" !== n.type && "vimeo" !== n.type || function(t) {
                if (!l || !t.el || !t.src) return;
                const e = document.createElement("iframe");
                e.classList.add("f-iframe"), e.setAttribute("id", `f-iframe_${t.videoId}`);
                for (const [t, o] of Object.entries(a().iframeAttr || {})) e.setAttribute(t, o);
                e.onload = () => {
                    var o;
                    l && 1 === l.getState() && "youtube" === t.type && (null === (o = e.contentWindow) || void 0 === o || o.postMessage(JSON.stringify({
                        event: "listening",
                        id: e.getAttribute("id")
                    }), "*"));
                }, e.onerror = () => {
                    l && 1 === l.getState() && (null == l || l.showError(t, "{{IFRAME_ERROR}}"));
                }, e.src = t.src;
                const o = document.createElement("div");
                o.classList.add("f-html"), o.append(e), t.contentEl = e, t.htmlEl = o, t.el.classList.add("has-html"), 
                t.el.classList.add("has-iframe"), t.el.classList.add(`has-${t.type}`), t.el.prepend(o), 
                h(t), l.emit("contentReady", t);
            }(n);
        }
        function m(t, e) {
            var o, n;
            "html5video" !== e.type && "youtube" !== e.type && "vimeo" !== e.type || (null === (o = e.contentEl) || void 0 === o || o.remove(), 
            e.contentEl = void 0, null === (n = e.htmlEl) || void 0 === n || n.remove(), e.htmlEl = void 0), 
            e.poller && clearTimeout(e.poller);
        }
        function f() {
            s = !1;
        }
        function p() {
            if (s) return;
            s = !0;
            const t = r();
            (t && void 0 !== t.autoplay ? t.autoplay : a().autoplay) && (function() {
                var t;
                const e = r(), o = null == e ? void 0 : e.el;
                if (o && "html5video" === (null == e ? void 0 : e.type)) try {
                    const t = o.querySelector("video");
                    if (t) {
                        const e = t.play();
                        void 0 !== e && e.then(() => {}).catch(e => {
                            t.muted = !0, t.play();
                        });
                    }
                } catch (t) {}
                const n = null == e ? void 0 : e.htmlEl;
                n instanceof HTMLIFrameElement && (null === (t = n.contentWindow) || void 0 === t || t.postMessage('{"event":"command","func":"stopVideo","args":""}', "*"));
            }(), function() {
                const t = r(), e = null == t ? void 0 : t.type;
                if (!(null == t ? void 0 : t.el) || "youtube" !== e && "vimeo" !== e) return;
                const o = () => {
                    if (t.contentEl && t.contentEl instanceof HTMLIFrameElement && t.contentEl.contentWindow) {
                        let e;
                        if ("true" === t.contentEl.dataset.ready) return e = "youtube" === t.type ? {
                            event: "command",
                            func: "playVideo"
                        } : {
                            method: "play",
                            value: "true"
                        }, e && t.contentEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
                        "youtube" === t.type && (e = {
                            event: "listening",
                            id: t.contentEl.getAttribute("id")
                        }, t.contentEl.contentWindow.postMessage(JSON.stringify(e), "*"));
                    }
                    t.poller = setTimeout(o, 250);
                };
                o();
            }());
        }
        function h(t) {
            const e = null == t ? void 0 : t.htmlEl;
            if (t && e && ("html5video" === t.type || "youtube" === t.type || "vimeo" === t.type)) {
                if (e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.style.maxWidth = "", 
                e.style.maxHeight = "", t.width) {
                    let o = `${t.width}`;
                    o.match(/^\d+$/) && (o += "px"), e.style.maxWidth = `${o}`;
                }
                if (t.height) {
                    let o = `${t.height}`;
                    o.match(/^\d+$/) && (o += "px"), e.style.maxHeight = `${o}`;
                }
                if (t.aspectRatio) {
                    const o = t.aspectRatio.split("/"), n = parseFloat(o[0].trim()), i = o[1] ? parseFloat(o[1].trim()) : 0, l = n && i ? n / i : n;
                    e.offsetHeight;
                    const s = e.getBoundingClientRect(), a = l < (s.width || 1) / (s.height || 1);
                    e.style.aspectRatio = `${t.aspectRatio}`, e.style.width = a ? "auto" : "", e.style.height = a ? "" : "auto";
                }
            }
        }
        function v() {
            h(r());
        }
        return {
            init: function(t) {
                l = t, l.on("addSlide", d), l.on("attachSlideEl", u), l.on("detachSlideEl", m), 
                l.on("ready", p), l.on("change", f), l.on("settle", p), l.on("refresh", v), window.addEventListener("message", c);
            },
            destroy: function() {
                null == l || l.off("addSlide", d), null == l || l.off("attachSlideEl", u), null == l || l.off("detachSlideEl", m), 
                null == l || l.off("ready", p), null == l || l.off("change", f), null == l || l.off("settle", p), 
                null == l || l.off("refresh", v), window.removeEventListener("message", c), l = void 0;
            }
        };
    };
    /*! License details at fancyapps.com/license */
    const carousel_fullscreen_n = {
        autoStart: !1,
        btnTpl: '<button data-fullscreen-action="toggle" class="f-button" title="{{TOGGLE_FULLSCREEN}}"><svg><g><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
    }, carousel_fullscreen_t = "in-fullscreen-mode", carousel_fullscreen_l = () => {
        let l;
        function u(t) {
            const u = null == l ? void 0 : l.getOptions().Fullscreen;
            let o = (isPlainObject_t(u) ? Object.assign(Object.assign({}, carousel_fullscreen_n), u) : carousel_fullscreen_n)[t];
            return o && "function" == typeof o && l ? o(l) : o;
        }
        function o() {
            var e;
            null === (e = null == l ? void 0 : l.getPlugins().Toolbar) || void 0 === e || e.add("fullscreen", {
                tpl: u("btnTpl")
            });
        }
        function c() {
            if (u("autoStart")) {
                const e = s();
                e && a(e);
            }
        }
        function i(e, n) {
            const t = n.target;
            t && !n.defaultPrevented && "toggle" === t.dataset.fullscreenAction && d();
        }
        function s() {
            return u("el") || (null == l ? void 0 : l.getContainer()) || void 0;
        }
        function r() {
            const e = document;
            return e.fullscreenEnabled ? !!e.fullscreenElement : !!e.webkitFullscreenEnabled && !!e.webkitFullscreenElement;
        }
        function a(e) {
            const n = document;
            let l;
            return e || (e = n.documentElement), n.fullscreenEnabled ? l = e.requestFullscreen() : n.webkitFullscreenEnabled && (l = e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)), 
            l && l.then(() => {
                e.classList.add(carousel_fullscreen_t);
            }), l;
        }
        function f() {
            const e = document;
            let n;
            return e.fullscreenEnabled ? n = e.fullscreenElement && e.exitFullscreen() : e.webkitFullscreenEnabled && (n = e.webkitFullscreenElement && e.webkitExitFullscreen()), 
            n && n.then(() => {
                var e;
                null === (e = s()) || void 0 === e || e.classList.remove(carousel_fullscreen_t);
            }), n;
        }
        function d() {
            if (r()) f(); else {
                const e = s();
                e && a(e);
            }
        }
        return {
            init: function(e) {
                l = e, l.on("initPlugins", o), l.on("ready", c), l.on("click", i);
            },
            destroy: function() {
                null == l || l.off("initPlugins", o), null == l || l.off("ready", c), null == l || l.off("click", i);
            },
            exit: f,
            inFullscreen: r,
            request: a,
            toggle: d
        };
    };
    /*! License details at fancyapps.com/license */
    let fancybox_hash_e, fancybox_hash_n, fancybox_hash_o = !1, fancybox_hash_r = !1, fancybox_hash_i = !1, fancybox_hash_l = !1;
    const fancybox_hash_s = () => {
        const t = new URL(document.URL).hash, e = t.slice(1).split("-"), n = e[e.length - 1], o = n && /^\+?\d+$/.test(n) && parseInt(e.pop() || "1", 10) || 1;
        return {
            urlHash: t,
            urlSlug: e.join("-"),
            urlIndex: o
        };
    }, fancybox_hash_a = () => {
        const t = null == fancybox_hash_e ? void 0 : fancybox_hash_e.getInstance();
        return !(!t || 1 != t.getState());
    }, fancybox_hash_u = () => {
        if (!fancybox_hash_e) return;
        if (fancybox_hash_a()) return;
        const {urlSlug: t, urlIndex: n} = fancybox_hash_s();
        if (!t) return;
        let o = document.querySelector(`[data-slug="${t}"]`);
        o && fancybox_hash_e.fromTriggerEl(o), fancybox_hash_a() || (o = document.querySelectorAll(`[data-fancybox="${t}"]`)[n - 1], 
        o && fancybox_hash_e.fromTriggerEl(o, {
            startIndex: n - 1
        })), fancybox_hash_a() && o && !o.closest("[inert]") && o.scrollIntoView({
            behavior: "instant",
            block: "center",
            inline: "center"
        });
    }, fancybox_hash_c = () => {
        if (!fancybox_hash_e) return;
        if (fancybox_hash_i) return;
        const t = null == fancybox_hash_e ? void 0 : fancybox_hash_e.getInstance(), n = null == t ? void 0 : t.getCarousel();
        if (!1 === (null == t ? void 0 : t.getOptions().Hash)) return;
        const {urlSlug: o, urlIndex: a} = fancybox_hash_s();
        if (t && n) {
            const e = n.getSlides();
            for (const t of e || []) if (o === t.slug || o === t.fancybox && t.index === a - 1) return fancybox_hash_r = !1, 
            void n.goTo(t.index);
            fancybox_hash_l = !0, t.close(), fancybox_hash_l = !1;
        }
        fancybox_hash_u();
    }, fancybox_hash_d = () => {
        fancybox_hash_e && (fancybox_hash_n = setTimeout(() => {
            fancybox_hash_o = !0, fancybox_hash_u(), fancybox_hash_o = !1;
        }, 300), window.addEventListener("hashchange", fancybox_hash_c, !1));
    }, fancybox_hash_f = () => {
        let t, e = "auto", a = "";
        function u() {
            var n, i, l;
            if (!t || !t.isTopMost()) return;
            if (!1 === t.getOptions().Hash) return;
            if (fancybox_hash_o) {
                const e = t.getOptions().sync;
                e && e.goTo((null === (n = null == t ? void 0 : t.getCarousel()) || void 0 === n ? void 0 : n.getPageIndex()) || 0, {
                    transition: !1,
                    tween: !1
                });
            }
            const u = t.getCarousel();
            if (!u) return;
            const {urlHash: d, urlSlug: f} = fancybox_hash_s(), g = t.getSlide();
            if (!g) return;
            let h = g.slug || g.fancybox || "", w = parseInt(g.index + "", 10) + 1;
            if (!h) return;
            let p = g.slug ? `#${g.slug}` : `#${h}-${w}`;
            ((null === (l = null === (i = t.getCarousel()) || void 0 === i ? void 0 : i.getPages()) || void 0 === l ? void 0 : l.length) || 0) < 2 && (p = `#${h}`), 
            d !== p && (a = d), history.scrollRestoration && (e = history.scrollRestoration, 
            history.scrollRestoration = "manual"), u.on("change", c);
            const y = h !== f;
            try {
                window.history[y ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + p), 
                y && (fancybox_hash_r = !0);
            } catch (t) {}
        }
        function c() {
            if (!t || !t.isTopMost()) return;
            if (!1 === t.getOptions().Hash) return;
            const e = t.getSlide();
            if (!e) return;
            let n = e.slug || e.fancybox || "", o = e.index + 1, r = e.slug ? `#${e.slug}` : `#${n}-${o}`;
            fancybox_hash_i = !0;
            try {
                window.history.replaceState({}, document.title, window.location.pathname + window.location.search + r);
            } catch (t) {}
            fancybox_hash_i = !1;
        }
        function d() {
            if (fancybox_hash_l) return;
            if (!t || !t.isTopMost()) return;
            if (!1 === t.getOptions().Hash) return;
            const e = t.getSlide();
            if (!e) return;
            if (e.fancybox || "") {
                fancybox_hash_i = !0;
                try {
                    fancybox_hash_r && !function() {
                        if (window.parent === window) return !1;
                        try {
                            var t = window.frameElement;
                        } catch (e) {
                            t = null;
                        }
                        return null === t ? "data:" === location.protocol : t.hasAttribute("sandbox");
                    }() ? window.history.back() : window.history.replaceState({}, document.title, window.location.pathname + window.location.search + a);
                } catch (t) {}
                fancybox_hash_i = !1;
            }
        }
        return {
            init: function(e) {
                clearTimeout(fancybox_hash_n), t = e, t.on("ready", u), t.on("close", d);
            },
            destroy: function() {
                null == t || t.off("ready", u), null == t || t.off("close", d);
                const n = null == t ? void 0 : t.getCarousel();
                n && n.off("change", c), t = void 0, history.scrollRestoration && e && (history.scrollRestoration = e);
            }
        };
    };
    fancybox_hash_f.startFromUrl = fancybox_hash_u, fancybox_hash_f.setup = function(n) {
        fancybox_hash_e || (fancybox_hash_e = n, canUseDOM_e() && (/complete|interactive|loaded/.test(document.readyState) ? fancybox_hash_d() : document.addEventListener("DOMContentLoaded", fancybox_hash_d)));
    };
    /*! License details at fancyapps.com/license */
    const l10n_en_EN_o = Object.assign(Object.assign({}, en_EN_o), {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        MODAL: "You can close this modal content with the ESC key",
        ELEMENT_NOT_FOUND: "HTML Element Not Found",
        IFRAME_ERROR: "Error Loading Page"
    });
    /*! License details at fancyapps.com/license */
    const A = '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg tabindex="-1" width="24" height="24" viewBox="0 0 24 24"><path d="M19.286 4.714 4.714 19.286M4.714 4.714l14.572 14.572" /></svg></button>';
    carousel_toolbar_r().add("close", {
        tpl: A
    });
    const fancybox_k = e => {
        e.cancelable && e.preventDefault();
    };
    const O = (e = null, t = "", n) => {
        if (!e || !e.parentElement || !t) return void (n && n());
        R(e);
        const o = i => {
            i.target === e && e.dataset.animationName && (e.removeEventListener("animationend", o), 
            delete e.dataset.animationName, n && n(), e.classList.remove(t));
        };
        e.dataset.animationName = t, e.addEventListener("animationend", o), addClass_s(e, t);
    }, R = e => {
        e && e.dispatchEvent(new CustomEvent("animationend", {
            bubbles: !1,
            cancelable: !0,
            currentTarget: e
        }));
    };
    var _;
    !function(e) {
        e[e.Init = 0] = "Init", e[e.Ready = 1] = "Ready", e[e.Closing = 2] = "Closing", 
        e[e.Destroyed = 3] = "Destroyed";
    }(_ || (_ = {}));
    const I = {
        ajax: null,
        backdropClick: "close",
        Carousel: {},
        closeButton: "auto",
        closeExisting: !1,
        delegateEl: void 0,
        dragToClose: !0,
        fadeEffect: !0,
        groupAll: !1,
        groupAttr: "data-fancybox",
        hideClass: "f-fadeOut",
        hideScrollbar: !0,
        id: void 0,
        idle: !1,
        keyboard: {
            Escape: "close",
            Delete: "close",
            Backspace: "close",
            PageUp: "next",
            PageDown: "prev",
            ArrowUp: "prev",
            ArrowDown: "next",
            ArrowRight: "next",
            ArrowLeft: "prev"
        },
        l10n: l10n_en_EN_o,
        mainClass: "",
        mainStyle: {},
        mainTpl: '<dialog class="fancybox__dialog">\n    <div class="fancybox__container" tabindex="0" aria-label="{{MODAL}}">\n      <div class="fancybox__backdrop"></div>\n      <div class="fancybox__carousel"></div>\n    </div>\n  </dialog>',
        modal: !0,
        on: {},
        parentEl: void 0,
        placeFocusBack: !0,
        showClass: "f-zoomInUp",
        startIndex: 0,
        sync: void 0,
        theme: "dark",
        triggerEl: void 0,
        triggerEvent: void 0,
        zoomEffect: !0
    }, z = new Map;
    let H = 0;
    const D = "with-fancybox", B = () => {
        let r, T, M, B, q, F, V, W = _.Init, $ = Object.assign({}, I), K = -1, U = {}, X = [], G = !1, Y = !0, Z = 0;
        function J(e, ...t) {
            let n = $[e];
            return n && "function" == typeof n ? n(Oe, ...t) : n;
        }
        function Q(e, t = []) {
            const n = J("l10n") || {};
            e = String(e).replace(/\{\{(\w+)\}\}/g, (e, t) => n[t] || e);
            for (let n = 0; n < t.length; n++) e = e.split(t[n][0]).join(t[n][1]);
            return e = e.replace(/\{\{(.*?)\}\}/g, (e, t) => t);
        }
        const ee = new Map;
        function te(e, ...t) {
            const n = [ ...ee.get(e) || [] ];
            for (const [t, o] of Object.entries($.on || {})) (t === e || t.split(" ").indexOf(e) > -1) && n.push(o);
            for (const e of n) e && "function" == typeof e && e(Oe, ...t);
            "*" !== e && te("*", e, ...t);
        }
        function ne() {
            removeClass_s(T, "is-revealing");
            try {
                if (document.activeElement === r) ((null == T ? void 0 : T.querySelector("[autofocus]")) || T).focus();
            } catch (e) {}
        }
        function oe(e, n) {
            var o;
            ve(n), de(), null === (o = n.el) || void 0 === o || o.addEventListener("click", se), 
            "inline" !== n.type && "clone" !== n.type || function(e) {
                if (!B || !e || !e.el) return;
                let n = null;
                if (isString_t(e.src)) {
                    const t = e.src.split("#", 2).pop();
                    n = t ? document.getElementById(t) : null;
                }
                if (n) {
                    if (addClass_s(n, "f-html"), "clone" === e.type || n.closest(".fancybox__carousel")) {
                        n = n.cloneNode(!0);
                        const t = n.dataset.animationName;
                        t && (n.classList.remove(t), delete n.dataset.animationName);
                        let o = n.getAttribute("id");
                        o = o ? `${o}--clone` : `clone-${K}-${e.index}`, n.setAttribute("id", o);
                    } else if (n.parentNode) {
                        const t = document.createElement("div");
                        t.inert = !0, n.parentNode.insertBefore(t, n), e.placeholderEl = t;
                    }
                    e.htmlEl = n, addClass_s(e.el, "has-html"), e.el.prepend(n), n.classList.remove("hidden"), 
                    "none" === n.style.display && (n.style.display = ""), "none" === getComputedStyle(n).getPropertyValue("display") && (n.style.display = n.dataset.display || "flex"), 
                    null == B || B.emit("contentReady", e);
                } else null == B || B.showError(e, "{{ELEMENT_NOT_FOUND}}");
            }(n), "ajax" === n.type && function(e) {
                const t = e.el;
                if (!t) return;
                if (e.htmlEl || e.xhr) return;
                null == B || B.showLoading(e), e.state = 0;
                const n = new XMLHttpRequest;
                n.onreadystatechange = function() {
                    if (n.readyState === XMLHttpRequest.DONE && W === _.Ready) if (null == B || B.hideLoading(e), 
                    e.state = 1, 200 === n.status) {
                        let o = n.responseText + "", i = null, s = null;
                        if (e.filter) {
                            const t = document.createElement("div");
                            t.innerHTML = o, s = t.querySelector(e.filter + "");
                        }
                        s && s instanceof HTMLElement ? i = s : (i = document.createElement("div"), i.innerHTML = o), 
                        i.classList.add("f-html"), e.htmlEl = i, t.classList.add("has-html"), t.classList.add("has-ajax"), 
                        t.prepend(i), null == B || B.emit("contentReady", e);
                    } else null == B || B.showError(e);
                };
                const o = J("ajax") || null;
                n.open(o ? "POST" : "GET", e.src + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), 
                n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(o), e.xhr = n;
            }(n);
        }
        function ie(e, t) {
            var n;
            ye(t), null === (n = t.el) || void 0 === n || n.removeEventListener("click", se), 
            "inline" !== t.type && "clone" !== t.type || function(e) {
                const t = e.htmlEl, n = e.placeholderEl;
                t && ("none" !== getComputedStyle(t).getPropertyValue("display") && (t.style.display = "none"), 
                t.offsetHeight);
                n && (t && n.parentNode && n.parentNode.insertBefore(t, n), n.remove());
                e.htmlEl = void 0, e.placeholderEl = void 0;
            }(t), t.xhr && (t.xhr.abort(), t.xhr = void 0);
        }
        function se(e) {
            if (!be()) return;
            if (W !== _.Ready) return fancybox_k(e), void e.stopPropagation();
            if (e.defaultPrevented) return;
            if (!f.isClickAllowed()) return;
            const t = e.composedPath()[0];
            t.closest(".fancybox__carousel") && t.classList.contains("fancybox__slide") && fe(e);
        }
        function le() {
            Y = !1, T && B && T.classList.remove("is-revealing"), de();
            const e = J("sync");
            if (B && e) {
                const t = e.getPageIndex(B.getPageIndex()) || 0;
                e.goTo(t, {
                    transition: !1,
                    tween: !1
                });
            }
        }
        function re() {
            var e;
            !function() {
                const e = null == B ? void 0 : B.getViewport();
                if (!J("dragToClose") || !B || !e) return;
                if (q = f(e).init(), !q) return;
                let t = !1, n = 0, o = 0, s = {}, l = 1;
                function r() {
                    var e, t;
                    null == F || F.spring({
                        clamp: !0,
                        mass: 1,
                        tension: 0 === o ? 140 : 960,
                        friction: 17,
                        restDelta: .1,
                        restSpeed: .1,
                        maxSpeed: 1 / 0
                    }).from({
                        y: n
                    }).to({
                        y: o
                    }).start();
                    const i = (null === (e = null == B ? void 0 : B.getViewport()) || void 0 === e ? void 0 : e.getBoundingClientRect().height) || 0, s = null === (t = Ee()) || void 0 === t ? void 0 : t.panzoomRef;
                    if (i && s) if (0 === o) s.execute(v.Reset); else {
                        const e = map_t(Math.abs(n), 0, .33 * i, l, .77 * l, !1);
                        s.execute(v.ZoomTo, {
                            scale: e
                        });
                    }
                }
                const c = e => {
                    var t;
                    const n = e.srcEvent, o = n.target;
                    return B && !(gestures_e(n) && (null === (t = n.touches) || void 0 === t ? void 0 : t.length) > 1) && o && !getScrollableParent_n(o);
                };
                F = tween_c().on("step", t => {
                    if (T && e && W === _.Ready) {
                        const o = e.getBoundingClientRect().height;
                        n = Math.min(o, Math.max(-1 * o, t.y));
                        const i = map_t(Math.abs(n), 0, .5 * o, 1, 0, !0);
                        T.style.setProperty("--f-drag-opacity", i + ""), T.style.setProperty("--f-drag-offset", n + "px");
                    }
                }), q.on("start", function() {
                    t || (null == F || F.pause(), o = n);
                }).on("panstart", e => {
                    var n, o;
                    if (!t && c(e) && "y" === e.axis) {
                        fancybox_k(e.srcEvent), t = !0, Te(), null === (n = null == B ? void 0 : B.getViewport()) || void 0 === n || n.classList.add("is-dragging");
                        const i = null === (o = Ee()) || void 0 === o ? void 0 : o.panzoomRef;
                        if (i) {
                            l = i.getTransform().scale || 1;
                            const e = i.getOptions();
                            s = Object.assign({}, e), e.bounds = !1, e.gestures = !1;
                        }
                    } else t = !1;
                }).on("pan", function(e) {
                    t && c(e) && (fancybox_k(e.srcEvent), e.srcEvent.stopPropagation(), "y" === e.axis && (o += e.deltaY, 
                    r()));
                }).on("end", e => {
                    var i, l, a;
                    if (null === (i = null == B ? void 0 : B.getViewport()) || void 0 === i || i.classList.remove("is-dragging"), 
                    t) {
                        const t = null === (l = Ee()) || void 0 === l ? void 0 : l.panzoomRef;
                        if (t) {
                            null === (a = t.getTween()) || void 0 === a || a.end();
                            const e = t.getOptions();
                            e.bounds = s.bounds || !1, e.gestures = s.gestures || !1;
                        }
                        c(e) && "y" === e.axis && (Math.abs(e.velocityY) > 5 || Math.abs(n) > 50) && Me(e.srcEvent, "f-throwOut" + (e.velocityY > 0 ? "Down" : "Up"));
                    }
                    t = !1, W === _.Ready && 0 !== n && (o = 0, r());
                });
            }(), document.body.addEventListener("click", pe), document.body.addEventListener("keydown", ge, {
                passive: !1,
                capture: !0
            }), de(), je();
            const t = J("sync");
            B && t && (null === (e = t.getTween()) || void 0 === e || e.start()), he(Ee());
        }
        function ae() {
            (null == B ? void 0 : B.canGoNext()) ? je() : Ce();
        }
        function ce(e, t) {
            ve(t), he(t);
        }
        function ue() {
            var e;
            const t = null == B ? void 0 : B.getPlugins().Thumbs;
            toggleClass_s(T, "has-thumbs", (null == t ? void 0 : t.isEnabled()) || !1), toggleClass_s(T, "has-vertical-thumbs", !!t && ("scrollable" === t.getType() || !0 === (null === (e = t.getCarousel()) || void 0 === e ? void 0 : e.isVertical())));
        }
        function de() {
            if (T) {
                const e = (null == B ? void 0 : B.getPages()) || [], t = (null == B ? void 0 : B.getPageIndex()) || 0;
                for (const e of T.querySelectorAll("[data-fancybox-index]")) e.innerHTML = t + "";
                for (const e of T.querySelectorAll("[data-fancybox-page]")) e.innerHTML = t + 1 + "";
                for (const t of T.querySelectorAll("[data-fancybox-pages]")) t.innerHTML = e.length + "";
            }
        }
        function fe(e) {
            if (!!e.composedPath()[0].closest("[data-fancybox-close]")) return void Me(e);
            if (te("backdropClick", e), e.defaultPrevented) return;
            J("backdropClick") && Me(e);
        }
        function me() {
            Pe();
        }
        function ge(e) {
            if (!be()) return;
            if (W !== _.Ready) return;
            const t = e.key, o = J("keyboard");
            if (!o) return;
            if (e.ctrlKey || e.altKey || e.shiftKey) return;
            const i = e.composedPath()[0];
            if (!isNode_n(i)) return;
            if ("Escape" !== t && (e => {
                const t = [ "input", "textarea", "select", "option", "video", "iframe", "[contenteditable]", "[data-selectable]", "[data-draggable]" ].join(",");
                return e.matches(t) || e.closest(t);
            })(i)) return;
            if (te("keydown", e), e.defaultPrevented) return;
            const s = o[t];
            if (s) switch (s) {
              case "close":
                Me(e);
                break;

              case "next":
                fancybox_k(e), null == B || B.next();
                break;

              case "prev":
                fancybox_k(e), null == B || B.prev();
            }
        }
        function pe(e) {
            if (!be()) return;
            if (W !== _.Ready) return;
            if (Pe(), e.defaultPrevented) return;
            const t = e.composedPath()[0], n = !!t.closest("[data-fancybox-close]"), o = t.classList.contains("fancybox__backdrop");
            (n || o) && fe(e);
        }
        function ve(e) {
            var t;
            const {el: n, htmlEl: i, panzoomRef: s, closeButtonEl: l} = e, r = s ? s.getWrapper() : i;
            if (!n || !n.parentElement || !r) return;
            let a = J("closeButton");
            if ("auto" === a && (a = !0 !== (null === (t = null == B ? void 0 : B.getPlugins().Toolbar) || void 0 === t ? void 0 : t.isEnabled())), 
            a) {
                if (!l) {
                    const t = strToHtml_e(Q(A));
                    t && (addClass_s(t, "is-close-button"), e.closeButtonEl = r.insertAdjacentElement("afterbegin", t), 
                    addClass_s(n, "has-close-btn"));
                }
            } else ye(e);
        }
        function ye(e) {
            e.closeButtonEl && (e.closeButtonEl.remove(), e.closeButtonEl = void 0), removeClass_s(e.el, "has-close-btn");
        }
        function he(e) {
            if (!(Y && B && 1 === B.getState() && e && e.index === B.getOptions().initialPage && e.el && e.el.parentElement)) return;
            if (void 0 !== e.state && 1 !== e.state) return;
            Y = !1;
            const t = e.panzoomRef, n = null == t ? void 0 : t.getTween(), o = J("zoomEffect") && n ? we(e) : void 0;
            if (t && n && o) {
                const {x: e, y: i, scale: s} = t.getStartPosition();
                return void n.spring({
                    tension: 215,
                    friction: 25,
                    restDelta: .001,
                    restSpeed: .001,
                    maxSpeed: 1 / 0
                }).from(o).to({
                    x: e,
                    y: i,
                    scale: s
                }).start();
            }
            const i = (null == t ? void 0 : t.getContent()) || e.htmlEl;
            i && O(i, J("showClass", e));
        }
        function be() {
            var e;
            return (null === (e = N.getInstance()) || void 0 === e ? void 0 : e.getId()) === K;
        }
        function Ee() {
            var e;
            return null === (e = null == B ? void 0 : B.getPage()) || void 0 === e ? void 0 : e.slides[0];
        }
        function xe() {
            const e = Ee();
            return e ? e.triggerEl || J("triggerEl") : void 0;
        }
        function we(e) {
            var t, n;
            const o = e.thumbEl;
            if (!o || !(e => {
                const t = e.getBoundingClientRect(), n = e.closest("[style]"), o = null == n ? void 0 : n.parentElement;
                if (n && n.style.transform && o) {
                    const e = o.getBoundingClientRect();
                    if (t.left < e.left || t.left > e.left + e.width - t.width) return !1;
                    if (t.top < e.top || t.top > e.top + e.height - t.height) return !1;
                }
                const i = Math.max(document.documentElement.clientHeight, window.innerHeight), s = Math.max(document.documentElement.clientWidth, window.innerWidth);
                return !(t.bottom < 0 || t.top - i >= 0 || t.right < 0 || t.left - s >= 0);
            })(o)) return;
            const i = null === (n = null === (t = e.panzoomRef) || void 0 === t ? void 0 : t.getWrapper()) || void 0 === n ? void 0 : n.getBoundingClientRect(), s = null == i ? void 0 : i.width, l = null == i ? void 0 : i.height;
            if (!s || !l) return;
            const r = o.getBoundingClientRect();
            let a = r.width, c = r.height, u = r.left, d = r.top;
            if (!r || !a || !c) return;
            if (o instanceof HTMLImageElement) {
                const e = window.getComputedStyle(o).getPropertyValue("object-fit");
                if ("contain" === e || "scale-down" === e) {
                    const {width: t, height: n} = ((e, t, n, o, i = "contain") => {
                        if ("contain" === i || e > n || t > o) {
                            const i = n / e, s = o / t, l = Math.min(i, s);
                            e *= l, t *= l;
                        }
                        return {
                            width: e,
                            height: t
                        };
                    })(o.naturalWidth, o.naturalHeight, a, c, e);
                    u += .5 * (a - t), d += .5 * (c - n), a = t, c = n;
                }
            }
            if (Math.abs(s / l - a / c) > .1) return;
            return {
                x: u + .5 * a - (i.left + .5 * s),
                y: d + .5 * c - (i.top + .5 * l),
                scale: a / s
            };
        }
        function Le() {
            V && clearTimeout(V), V = void 0, document.removeEventListener("mousemove", me);
        }
        function je() {
            if (G) return;
            if (V) return;
            const e = J("idle");
            e && (V = setTimeout(Se, e));
        }
        function Se() {
            T && (Le(), addClass_s(T, "is-idle"), document.addEventListener("mousemove", me), 
            G = !0);
        }
        function Pe() {
            G && (Ce(), je());
        }
        function Ce() {
            Le(), null == T || T.classList.remove("is-idle"), G = !1;
        }
        function Te() {
            const e = xe();
            var t;
            !e || (t = e.getBoundingClientRect()).bottom > 0 && t.right > 0 && t.left < (window.innerWidth || document.documentElement.clientWidth) && t.top < (window.innerHeight || document.documentElement.clientHeight) || e.closest("[inert]") || e.scrollIntoView({
                behavior: "instant",
                block: "center",
                inline: "center"
            });
        }
        function Me(e, t) {
            var n, o, i, s, r;
            if (W === _.Closing || W === _.Destroyed) return;
            const a = new Event("shouldClose", {
                bubbles: !0,
                cancelable: !0
            });
            if (te("shouldClose", a, e), a.defaultPrevented) return;
            if (Le(), e) {
                if (e.defaultPrevented) return;
                fancybox_k(e), e.stopPropagation(), e.stopImmediatePropagation();
            }
            if (W = _.Closing, null == F || F.pause(), null == q || q.destroy(), B) {
                null === (n = B.getGestures()) || void 0 === n || n.destroy(), null === (o = B.getTween()) || void 0 === o || o.pause();
                for (const e of B.getSlides()) {
                    const t = e.panzoomRef;
                    t && (extend_r(t.getOptions(), {
                        clickAction: !1,
                        dblClickAction: !1,
                        wheelAction: !1,
                        bounds: !1,
                        minScale: 0,
                        maxScale: 1 / 0
                    }), null === (i = t.getGestures()) || void 0 === i || i.destroy(), null === (s = t.getTween()) || void 0 === s || s.pause());
                }
            }
            const c = null == B ? void 0 : B.getPlugins();
            null === (r = null == c ? void 0 : c.Autoplay) || void 0 === r || r.stop();
            const u = null == c ? void 0 : c.Fullscreen;
            u && u.inFullscreen() ? Promise.resolve(u.exit()).then(() => {
                setTimeout(() => {
                    Ae(e, t);
                }, 150);
            }) : Ae(e, t);
        }
        function Ae(e, t) {
            var n, o;
            if (W !== _.Closing) return;
            te("close", e), Y = !1, document.body.removeEventListener("click", pe), document.body.removeEventListener("keydown", ge, {
                passive: !1,
                capture: !0
            }), J("placeFocusBack") && Te();
            const i = document.activeElement;
            i && (null == r ? void 0 : r.contains(i)) && i.blur(), J("fadeEffect") && (null == T || T.classList.remove("is-ready"), 
            null == T || T.classList.add("is-hiding")), null == T || T.classList.add("is-closing");
            const s = Ee(), l = null == s ? void 0 : s.el, a = null == s ? void 0 : s.panzoomRef, c = null === (n = null == s ? void 0 : s.panzoomRef) || void 0 === n ? void 0 : n.getTween(), u = t || J("hideClass");
            let d = !1, m = !1;
            if (B && s && l && a && c) {
                let e;
                if (J("zoomEffect") && 1 === s.state && (e = we(s)), e) {
                    d = !0;
                    const t = () => {
                        e = we(s), e ? c.to(Object.assign(Object.assign({}, y), e)) : ke();
                    };
                    a.on("refresh", () => {
                        t();
                    }), c.easing(tween_c.Easings.EaseOut).duration(350).from(Object.assign({}, a.getTransform())).to(Object.assign(Object.assign({}, y), e)).start(), 
                    (null == l ? void 0 : l.getAnimations()) && (l.style.animationPlayState = "paused", 
                    requestAnimationFrame(() => {
                        t();
                    }));
                }
            }
            const g = (null == s ? void 0 : s.htmlEl) || (null === (o = null == s ? void 0 : s.panzoomRef) || void 0 === o ? void 0 : o.getWrapper());
            g && R(g), !d && u && g && (m = !0, O(g, u, () => {
                ke();
            })), d || m ? setTimeout(() => {
                ke();
            }, 350) : ke();
        }
        function ke() {
            var e, t, n, o, i;
            if (W === _.Destroyed) return;
            W = _.Destroyed;
            const l = xe();
            te("destroy"), null === (t = null === (e = J("sync")) || void 0 === e ? void 0 : e.getPlugins().Autoplay) || void 0 === t || t.resume(), 
            null === (o = null === (n = J("sync")) || void 0 === n ? void 0 : n.getPlugins().Autoscroll) || void 0 === o || o.resume(), 
            r instanceof HTMLDialogElement && r.close(), null === (i = null == B ? void 0 : B.getContainer()) || void 0 === i || i.classList.remove("is-idle"), 
            null == B || B.destroy();
            for (const e of Object.values(U)) null == e || e.destroy();
            if (U = {}, null == r || r.remove(), r = void 0, T = void 0, B = void 0, z.delete(K), 
            !z.size && (scrollLock_t(!1), document.documentElement.classList.remove(D), J("placeFocusBack") && l && !l.closest("[inert]"))) try {
                null == l || l.focus({
                    preventScroll: !0
                });
            } catch (e) {}
        }
        const Oe = {
            close: Me,
            destroy: ke,
            getCarousel: function() {
                return B;
            },
            getContainer: function() {
                return T;
            },
            getId: function() {
                return K;
            },
            getOptions: function() {
                return $;
            },
            getPlugins: function() {
                return U;
            },
            getSlide: function() {
                return Ee();
            },
            getState: function() {
                return W;
            },
            init: function(t = [], n = {}) {
                W !== _.Init && (Oe.destroy(), W = _.Init), $ = extend_r({}, I, n), K = J("id") || "fancybox-" + ++H;
                const a = z.get(K);
                if (a && a.destroy(), z.set(K, Oe), te("init"), function() {
                    for (const [e, t] of Object.entries(Object.assign(Object.assign({}, N.Plugins), $.plugins || {}))) if (e && !U[e] && t instanceof Function) {
                        const n = t();
                        n.init(Oe), U[e] = n;
                    }
                    te("initPlugins");
                }(), function(e = []) {
                    te("initSlides", e), X = [ ...e ];
                }(t), function() {
                    const t = J("parentEl") || document.body;
                    if (!(t && t instanceof HTMLElement)) return;
                    const n = Q(J("mainTpl") || "");
                    if (r = strToHtml_e(n) || void 0, !r) return;
                    if (T = r.querySelector(".fancybox__container"), !(T && T instanceof HTMLElement)) return;
                    const l = J("mainClass");
                    l && addClass_s(T, l);
                    const a = J("mainStyle");
                    if (a && isPlainObject_t(a)) for (const [e, t] of Object.entries(a)) T.style.setProperty(e, t);
                    const u = J("theme"), d = "auto" === u ? window.matchMedia("(prefers-color-scheme:light)").matches : "light" === u;
                    T.setAttribute("theme", d ? "light" : "dark"), r.setAttribute("id", `${K}`), r.addEventListener("keydown", e => {
                        "Escape" === e.key && fancybox_k(e);
                    }), r.addEventListener("wheel", e => {
                        const t = e.target;
                        let n = J("wheel", e);
                        t.closest(".f-thumbs") && (n = "slide");
                        const o = "slide" === n, s = [ -e.deltaX || 0, -e.deltaY || 0, -e.detail || 0 ].reduce(function(e, t) {
                            return Math.abs(t) > Math.abs(e) ? t : e;
                        }), l = Math.max(-1, Math.min(1, s)), r = Date.now();
                        Z && r - Z < 300 ? o && fancybox_k(e) : (Z = r, te("wheel", e, l), e.defaultPrevented || ("close" === n ? Me(e) : "slide" === n && B && !getScrollableParent_n(t) && (fancybox_k(e), 
                        B[l > 0 ? "prev" : "next"]())));
                    }, {
                        capture: !0,
                        passive: !1
                    }), r.addEventListener("cancel", e => {
                        Me(e);
                    }), t.append(r), 1 === z.size && (J("hideScrollbar") && scrollLock_t(!0), document.documentElement.classList.add(D));
                    r instanceof HTMLDialogElement && (J("modal") ? r.showModal() : r.show());
                    te("initLayout");
                }(), function() {
                    if (M = (null == r ? void 0 : r.querySelector(".fancybox__carousel")) || void 0, 
                    !M) return;
                    M.fancybox = Oe;
                    const e = extend_r({}, {
                        Autoplay: {
                            autoStart: !1,
                            pauseOnHover: !1,
                            progressbarParentEl: e => {
                                const t = e.getContainer();
                                return (null == t ? void 0 : t.querySelector(".f-carousel__toolbar [data-autoplay-action]")) || t;
                            }
                        },
                        Fullscreen: {
                            el: T
                        },
                        Toolbar: {
                            absolute: !0,
                            items: {
                                counter: {
                                    tpl: '<div class="f-counter"><span data-fancybox-page></span>/<span data-fancybox-pages></span></div>'
                                }
                            },
                            display: {
                                left: [ "counter" ],
                                right: [ "toggleFull", "autoplay", "fullscreen", "thumbs", "close" ]
                            }
                        },
                        Video: {
                            autoplay: !0
                        },
                        Thumbs: {
                            minCount: 2,
                            Carousel: {
                                classes: {
                                    container: "fancybox__thumbs"
                                }
                            }
                        },
                        classes: {
                            container: "fancybox__carousel",
                            viewport: "fancybox__viewport",
                            slide: "fancybox__slide"
                        },
                        spinnerTpl: '<div class="f-spinner" data-fancybox-close></div>',
                        dragFree: !1,
                        slidesPerPage: 1,
                        plugins: {
                            Sync: carousel_sync_i,
                            Arrows: carousel_arrows_l,
                            Lazyload: carousel_lazyload_i,
                            Zoomable: carousel_zoomable_s,
                            Html: carousel_html_i,
                            Video: carousel_video_l,
                            Autoplay: carousel_autoplay_o,
                            Fullscreen: carousel_fullscreen_l,
                            Thumbs: carousel_thumbs_c,
                            Toolbar: carousel_toolbar_r
                        }
                    }, J("Carousel") || {}, {
                        slides: X,
                        enabled: !0,
                        initialPage: J("startIndex") || 0,
                        l10n: J("l10n")
                    });
                    B = carousel_E(M, e), te("initCarousel", B), B.on("*", (e, t, ...n) => {
                        te(`Carousel.${t}`, e, ...n);
                    }), B.on("attachSlideEl", oe), B.on("detachSlideEl", ie), B.on("contentReady", ce), 
                    B.on("ready", re), B.on("change", le), B.on("settle", ae), B.on("thumbs:ready", ue), 
                    B.on("thumbs:destroy", ue), B.init();
                }(), r && T) {
                    if (J("closeExisting")) for (const [e, t] of z.entries()) e !== K && t.close();
                    J("fadeEffect") ? (setTimeout(() => {
                        ne();
                    }, 500), addClass_s(T, "is-revealing")) : ne(), T.classList.add("is-ready"), W = _.Ready, 
                    te("ready");
                }
            },
            isCurrentSlide: function(e) {
                const t = Ee();
                return !(!e || !t) && t.index === e.index;
            },
            isTopMost: function() {
                return be();
            },
            off: function(e, t) {
                return ee.has(e) && ee.set(e, ee.get(e).filter(e => e !== t)), Oe;
            },
            on: function(e, t) {
                return ee.set(e, [ ...ee.get(e) || [], t ]), Oe;
            },
            toggleIdle(e) {
                (G || !0 === e) && Se(), G && !1 !== e || Ce();
            }
        };
        return Oe;
    };
    function q(e, t = {}) {
        var n, o, i;
        if (!(e && e instanceof Element)) return;
        let s, r, a, c, u = {};
        for (const [t, n] of N.openers) if (t.contains(e)) for (const [o, i] of n) {
            let n;
            if (o) {
                for (const i of t.querySelectorAll(o)) if (i.contains(e)) {
                    n = i;
                    break;
                }
                if (!n) continue;
            }
            for (const [o, d] of i) {
                let i = null;
                try {
                    i = e.closest(o);
                } catch (e) {}
                i && (r = t, a = n, s = i, c = o, extend_r(u, d || {}));
            }
        }
        if (!r || !c || !s) return;
        const d = extend_r({}, I, t, u, {
            triggerEl: s
        });
        let f = [].slice.call((a || r).querySelectorAll(c));
        const m = s.closest(".f-carousel"), g = null == m ? void 0 : m.carousel;
        if (g && (!a || !m.contains(a))) {
            const e = [];
            for (const t of null == g ? void 0 : g.getSlides()) {
                const n = t.el;
                n && (n.matches(c) ? e.push(n) : e.push(...[].slice.call(n.querySelectorAll(c))));
            }
            e.length && (f = [ ...e ], null === (n = g.getPlugins().Autoplay) || void 0 === n || n.pause(), 
            null === (o = g.getPlugins().Autoscroll) || void 0 === o || o.pause(), d.sync = g);
        }
        if (!1 === d.groupAll) {
            const e = d.groupAttr, t = e && s ? s.getAttribute(`${e}`) : "";
            f = e && t ? f.filter(n => n.getAttribute(`${e}`) === t) : [ s ];
        }
        if (!f.length) return;
        null === (i = d.triggerEvent) || void 0 === i || i.preventDefault();
        const p = N.getInstance();
        if (p) {
            const e = p.getOptions().triggerEl;
            if (e && f.indexOf(e) > -1) return;
        }
        return Object.assign({}, d.Carousel || {}).rtl && (f = f.reverse()), s && void 0 === t.startIndex && (d.startIndex = f.indexOf(s)), 
        N.fromNodes(f, d);
    }
    const N = {
        Plugins: {
            Hash: fancybox_hash_f
        },
        version: "6.1.6",
        openers: new Map,
        bind: function(e, n, o, i) {
            if (!canUseDOM_e()) return;
            let s = document.body, l = null, a = "[data-fancybox]", c = {};
            e instanceof Element && (s = e), isString_t(e) && isString_t(n) ? (l = e, a = n) : isString_t(n) && isString_t(o) ? (l = n, 
            a = o) : isString_t(n) ? a = n : isString_t(e) && (a = e), "object" == typeof n && (c = n || {}), 
            "object" == typeof o && (c = o || {}), "object" == typeof i && (c = i || {}), function(e, t, n, o = {}) {
                if (!(e && e instanceof Element && n)) return;
                const i = N.openers.get(e) || new Map, s = i.get(t) || new Map;
                if (s.set(n, o), i.set(t, s), N.openers.set(e, i), 1 === i.size && e.addEventListener("click", N.fromEvent), 
                1 === N.openers.size) for (const e of Object.values(N.Plugins)) {
                    const t = e.setup;
                    "function" == typeof t && t(N);
                }
            }(s, l, a, c);
        },
        close: function(e = !0, ...t) {
            if (e) for (const e of z.values()) e.close(...t); else {
                const e = N.getInstance();
                e && e.close(...t);
            }
        },
        destroy: function() {
            let e;
            for (;e = N.getInstance(); ) e.destroy();
            for (const e of N.openers.keys()) e.removeEventListener("click", N.fromEvent);
            N.openers.clear();
        },
        fromEvent: function(e) {
            if (e.defaultPrevented) return;
            if (e.button && 0 !== e.button) return;
            if (e.ctrlKey || e.metaKey || e.shiftKey) return;
            let t = e.composedPath()[0];
            const n = {
                triggerEvent: e
            };
            if (t.closest(".fancybox__container.is-hiding")) return fancybox_k(e), void e.stopPropagation();
            const o = t.closest("[data-fancybox-delegate]") || void 0;
            if (o) {
                const e = o.dataset.fancyboxDelegate || "", i = document.querySelectorAll(`[data-fancybox="${e}"]`), s = parseInt(o.dataset.fancyboxIndex || "", 10) || 0;
                t = i[s] || i[0], extend_r(n, {
                    delegateEl: o,
                    startIndex: s
                });
            }
            return q(t, n);
        },
        fromNodes: function(e, t) {
            t = extend_r({}, I, t || {});
            const n = [], o = e => e instanceof HTMLImageElement ? e : e instanceof HTMLElement ? e.querySelector("img:not([aria-hidden])") : void 0;
            for (const i of e) {
                const s = i.dataset || {}, l = t.delegateEl && e.indexOf(i) === t.startIndex ? t.delegateEl : void 0, r = o(l) || o(i) || void 0, a = s.src || i.getAttribute("href") || i.getAttribute("currentSrc") || i.getAttribute("src") || void 0, c = s.thumb || s.thumbSrc || (null == r ? void 0 : r.getAttribute("currentSrc")) || (null == r ? void 0 : r.getAttribute("src")) || (null == r ? void 0 : r.dataset.lazySrc) || void 0, u = {
                    src: a,
                    alt: s.alt || (null == r ? void 0 : r.getAttribute("alt")) || void 0,
                    thumbSrc: c,
                    thumbEl: r,
                    triggerEl: i,
                    delegateEl: l
                };
                for (const e in s) {
                    let t = s[e] + "";
                    t = "false" !== t && ("true" === t || t), u[e] = t;
                }
                n.push(u);
            }
            return N.show(n, t);
        },
        fromSelector: function(e, n, o, i) {
            if (!canUseDOM_e()) return;
            let s = document.body, l = null, a = "[data-fancybox]", c = {};
            e instanceof Element && (s = e), isString_t(e) && isString_t(n) ? (l = e, a = n) : isString_t(n) && isString_t(o) ? (l = n, 
            a = o) : isString_t(n) ? a = n : isString_t(e) && (a = e), "object" == typeof n && (c = n || {}), 
            "object" == typeof o && (c = o || {}), "object" == typeof i && (c = i || {});
            for (const [e, t] of N.openers) for (const [n, o] of t) for (const [t, i] of o) if (e === s && n === l) {
                const e = s.querySelector((n ? `${n} ` : "") + a);
                if (e && e.matches(t)) return N.fromTriggerEl(e, c);
            }
        },
        fromTriggerEl: q,
        getCarousel: function() {
            var e;
            return (null === (e = N.getInstance()) || void 0 === e ? void 0 : e.getCarousel()) || void 0;
        },
        getDefaults: function() {
            return I;
        },
        getInstance: function(e) {
            if (e) {
                const t = z.get(e);
                return t && t.getState() !== _.Destroyed ? t : void 0;
            }
            return Array.from(z.values()).reverse().find(e => {
                if (e.getState() !== _.Destroyed) return e;
            }) || void 0;
        },
        getSlide: function() {
            var e;
            return (null === (e = N.getInstance()) || void 0 === e ? void 0 : e.getSlide()) || void 0;
        },
        show: function(e = [], t = {}) {
            return B().init(e, t);
        },
        unbind: function(e, n, o) {
            if (!canUseDOM_e()) return;
            let i = document.body, s = null, l = "[data-fancybox]";
            e instanceof Element && (i = e), isString_t(e) && isString_t(n) ? (s = e, l = n) : isString_t(n) && isString_t(o) ? (s = n, 
            l = o) : isString_t(n) ? l = n : isString_t(e) && (l = e), function(e, t, n) {
                if (!(e && e instanceof Element && n)) return;
                const o = N.openers.get(e) || new Map, i = o.get(t) || new Map;
                i && n && i.delete(n), i.size && n || o.delete(t), o.size || (N.openers.delete(e), 
                e.removeEventListener("click", N.fromEvent));
            }(i, s, l);
        }
    };
    function getHash() {
        if (location.hash) return location.hash.replace("#", "");
    }
    function setHash(hash) {
        hash = hash ? `#${hash}` : window.location.href.split("#")[0];
        history.pushState("", "", hash);
    }
    let _slideUp = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    };
    let _slideDown = (target, duration = 500, showmore = 0) => {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    };
    let _slideToggle = (target, duration = 500) => {
        if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
    };
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
                lockPaddingElements.forEach(lockPaddingElement => {
                    lockPaddingElement.style.paddingRight = "";
                });
                document.body.style.paddingRight = "";
                document.documentElement.classList.remove("lock");
            }, delay);
            bodyLockStatus = false;
            setTimeout(function() {
                bodyLockStatus = true;
            }, delay);
        }
    };
    let bodyLock = (delay = 500) => {
        if (bodyLockStatus) {
            const lockPaddingElements = document.querySelectorAll("[data-lp]");
            const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
            lockPaddingElements.forEach(lockPaddingElement => {
                lockPaddingElement.style.paddingRight = lockPaddingValue;
            });
            document.body.style.paddingRight = lockPaddingValue;
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout(function() {
                bodyLockStatus = true;
            }, delay);
        }
    };
    function spollers() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            document.addEventListener("click", setSpollerAction);
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerItems = spollersBlock.querySelectorAll("details");
                if (spollerItems.length) spollerItems.forEach(spollerItem => {
                    let spollerTitle = spollerItem.querySelector("summary");
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerItem.hasAttribute("data-open")) {
                            spollerItem.open = false;
                            spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.classList.add("_spoller-active");
                            spollerItem.open = true;
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        spollerTitle.classList.remove("_spoller-active");
                        spollerItem.open = true;
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("summary") && el.closest("[data-spollers]")) {
                    e.preventDefault();
                    if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
                        const spollerTitle = el.closest("summary");
                        const spollerBlock = spollerTitle.closest("details");
                        const spollersBlock = spollerTitle.closest("[data-spollers]");
                        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                        const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        if (!spollersBlock.querySelectorAll("._slide").length) {
                            if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
                            !spollerBlock.open ? spollerBlock.open = true : setTimeout(() => {
                                spollerBlock.open = false;
                            }, spollerSpeed);
                            spollerTitle.classList.toggle("_spoller-active");
                            _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                            if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
                                const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
                                const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
                                const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                                window.scrollTo({
                                    top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                                    behavior: "smooth"
                                });
                            }
                        }
                    }
                }
                if (!el.closest("[data-spollers]")) {
                    const spollersClose = document.querySelectorAll("[data-spoller-close]");
                    if (spollersClose.length) spollersClose.forEach(spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerCloseBlock = spollerClose.parentNode;
                        if (spollersBlock.classList.contains("_spoller-init")) {
                            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                            spollerClose.classList.remove("_spoller-active");
                            _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                            setTimeout(() => {
                                spollerCloseBlock.open = false;
                            }, spollerSpeed);
                        }
                    });
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveBlock = spollersBlock.querySelector("details[open]");
                if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
                    const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                    setTimeout(() => {
                        spollerActiveBlock.open = false;
                    }, spollerSpeed);
                }
            }
        }
    }
    function tabs() {
        const tabs = document.querySelectorAll("[data-tabs]");
        let tabsActiveHash = [];
        if (tabs.length > 0) {
            const hash = getHash();
            if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
            tabs.forEach((tabsBlock, index) => {
                tabsBlock.classList.add("_tab-init");
                tabsBlock.setAttribute("data-tabs-index", index);
                tabsBlock.addEventListener("click", setTabsAction);
                initTabs(tabsBlock);
            });
            let mdQueriesArray = dataMediaQueries(tabs, "tabs");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }
        function setTitlePosition(tabsMediaArray, matchMedia) {
            tabsMediaArray.forEach(tabsMediaItem => {
                tabsMediaItem = tabsMediaItem.item;
                let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
                let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
                let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
                let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
                tabsTitleItems = Array.from(tabsTitleItems).filter(item => item.closest("[data-tabs]") === tabsMediaItem);
                tabsContentItems = Array.from(tabsContentItems).filter(item => item.closest("[data-tabs]") === tabsMediaItem);
                tabsContentItems.forEach((tabsContentItem, index) => {
                    if (matchMedia.matches) {
                        tabsContent.append(tabsTitleItems[index]);
                        tabsContent.append(tabsContentItem);
                        tabsMediaItem.classList.add("_tab-spoller");
                    } else {
                        tabsTitles.append(tabsTitleItems[index]);
                        tabsMediaItem.classList.remove("_tab-spoller");
                    }
                });
            });
        }
        function initTabs(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
            if (tabsActiveHashBlock) {
                const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
                tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
            }
            if (tabsContent.length) tabsContent.forEach((tabsContentItem, index) => {
                tabsTitles[index].setAttribute("data-tabs-title", "");
                tabsContentItem.setAttribute("data-tabs-item", "");
                if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
                tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
            });
        }
        function setTabsStatus(tabsBlock) {
            let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
            const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
            function isTabsAnamate(tabsBlock) {
                if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
            }
            const tabsBlockAnimate = isTabsAnamate(tabsBlock);
            if (tabsContent.length > 0) {
                const isHash = tabsBlock.hasAttribute("data-tabs-hash");
                tabsContent = Array.from(tabsContent).filter(item => item.closest("[data-tabs]") === tabsBlock);
                tabsTitles = Array.from(tabsTitles).filter(item => item.closest("[data-tabs]") === tabsBlock);
                tabsContent.forEach((tabsContentItem, index) => {
                    if (tabsTitles[index].classList.contains("_tab-active")) {
                        if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                        if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
                    } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
                });
            }
        }
        function setTabsAction(e) {
            const el = e.target;
            if (el.closest("[data-tabs-title]")) {
                const tabTitle = el.closest("[data-tabs-title]");
                const tabsBlock = tabTitle.closest("[data-tabs]");
                if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
                    let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
                    tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter(item => item.closest("[data-tabs]") === tabsBlock) : null;
                    tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
                    tabTitle.classList.add("_tab-active");
                    setTabsStatus(tabsBlock);
                }
                e.preventDefault();
            }
        }
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        });
    }
    function uniqArray(array) {
        return array.filter(function(item, index, self) {
            return self.indexOf(item) === index;
        });
    }
    function dataMediaQueries(array, dataSetValue) {
        const media = Array.from(array).filter(function(item, index, self) {
            if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
        });
        if (media.length) {
            const breakpointsArray = [];
            media.forEach(item => {
                const params = item.dataset[dataSetValue];
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            });
            let mdQueries = breakpointsArray.map(function(item) {
                return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
            });
            mdQueries = uniqArray(mdQueries);
            const mdQueriesArray = [];
            if (mdQueries.length) {
                mdQueries.forEach(breakpoint => {
                    const paramsArray = breakpoint.split(",");
                    const mediaBreakpoint = paramsArray[1];
                    const mediaType = paramsArray[2];
                    const matchMedia = window.matchMedia(paramsArray[0]);
                    const itemsArray = breakpointsArray.filter(function(item) {
                        if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                    });
                    mdQueriesArray.push({
                        itemsArray,
                        matchMedia
                    });
                });
                return mdQueriesArray;
            }
        }
    }
    var PipsMode;
    (function(PipsMode) {
        PipsMode["Range"] = "range";
        PipsMode["Steps"] = "steps";
        PipsMode["Positions"] = "positions";
        PipsMode["Count"] = "count";
        PipsMode["Values"] = "values";
    })(PipsMode || (PipsMode = {}));
    var PipsType;
    (function(PipsType) {
        PipsType[PipsType["None"] = -1] = "None";
        PipsType[PipsType["NoValue"] = 0] = "NoValue";
        PipsType[PipsType["LargeValue"] = 1] = "LargeValue";
        PipsType[PipsType["SmallValue"] = 2] = "SmallValue";
    })(PipsType || (PipsType = {}));
    function isValidFormatter(entry) {
        return isValidPartialFormatter(entry) && typeof entry.from === "function";
    }
    function isValidPartialFormatter(entry) {
        return typeof entry === "object" && typeof entry.to === "function";
    }
    function removeElement(el) {
        el.parentElement.removeChild(el);
    }
    function isSet(value) {
        return value !== null && value !== void 0;
    }
    function preventDefault(e) {
        e.preventDefault();
    }
    function unique(array) {
        return array.filter(function(a) {
            return !this[a] ? this[a] = true : false;
        }, {});
    }
    function closest(value, to) {
        return Math.round(value / to) * to;
    }
    function offset(elem, orientation) {
        var rect = elem.getBoundingClientRect();
        var doc = elem.ownerDocument;
        var docElem = doc.documentElement;
        var pageOffset = getPageOffset(doc);
        if (/webkit.*Chrome.*Mobile/i.test(navigator.userAgent)) pageOffset.x = 0;
        return orientation ? rect.top + pageOffset.y - docElem.clientTop : rect.left + pageOffset.x - docElem.clientLeft;
    }
    function isNumeric(a) {
        return typeof a === "number" && !isNaN(a) && isFinite(a);
    }
    function addClassFor(element, className, duration) {
        if (duration > 0) {
            addClass(element, className);
            setTimeout(function() {
                removeClass(element, className);
            }, duration);
        }
    }
    function limit(a) {
        return Math.max(Math.min(a, 100), 0);
    }
    function asArray(a) {
        return Array.isArray(a) ? a : [ a ];
    }
    function countDecimals(numStr) {
        numStr = String(numStr);
        var pieces = numStr.split(".");
        return pieces.length > 1 ? pieces[1].length : 0;
    }
    function addClass(el, className) {
        if (el.classList && !/\s/.test(className)) el.classList.add(className); else el.className += " " + className;
    }
    function removeClass(el, className) {
        if (el.classList && !/\s/.test(className)) el.classList.remove(className); else el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
    function hasClass(el, className) {
        return el.classList ? el.classList.contains(className) : new RegExp("\\b" + className + "\\b").test(el.className);
    }
    function getPageOffset(doc) {
        var supportPageOffset = window.pageXOffset !== void 0;
        var isCSS1Compat = (doc.compatMode || "") === "CSS1Compat";
        var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
        var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
        return {
            x,
            y
        };
    }
    function getActions() {
        return window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        };
    }
    function getSupportsPassive() {
        var supportsPassive = false;
        try {
            var opts = Object.defineProperty({}, "passive", {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener("test", null, opts);
        } catch (e) {}
        return supportsPassive;
    }
    function getSupportsTouchActionNone() {
        return window.CSS && CSS.supports && CSS.supports("touch-action", "none");
    }
    function subRangeRatio(pa, pb) {
        return 100 / (pb - pa);
    }
    function fromPercentage(range, value, startRange) {
        return value * 100 / (range[startRange + 1] - range[startRange]);
    }
    function toPercentage(range, value) {
        return fromPercentage(range, range[0] < 0 ? value + Math.abs(range[0]) : value - range[0], 0);
    }
    function isPercentage(range, value) {
        return value * (range[1] - range[0]) / 100 + range[0];
    }
    function getJ(value, arr) {
        var j = 1;
        while (value >= arr[j]) j += 1;
        return j;
    }
    function toStepping(xVal, xPct, value) {
        if (value >= xVal.slice(-1)[0]) return 100;
        var j = getJ(value, xVal);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return pa + toPercentage([ va, vb ], value) / subRangeRatio(pa, pb);
    }
    function fromStepping(xVal, xPct, value) {
        if (value >= 100) return xVal.slice(-1)[0];
        var j = getJ(value, xPct);
        var va = xVal[j - 1];
        var vb = xVal[j];
        var pa = xPct[j - 1];
        var pb = xPct[j];
        return isPercentage([ va, vb ], (value - pa) * subRangeRatio(pa, pb));
    }
    function getStep(xPct, xSteps, snap, value) {
        if (value === 100) return value;
        var j = getJ(value, xPct);
        var a = xPct[j - 1];
        var b = xPct[j];
        if (snap) {
            if (value - a > (b - a) / 2) return b;
            return a;
        }
        if (!xSteps[j - 1]) return value;
        return xPct[j - 1] + closest(value - xPct[j - 1], xSteps[j - 1]);
    }
    var Spectrum = function() {
        function Spectrum(entry, snap, singleStep) {
            this.xPct = [];
            this.xVal = [];
            this.xSteps = [];
            this.xNumSteps = [];
            this.xHighestCompleteStep = [];
            this.xSteps = [ singleStep || false ];
            this.xNumSteps = [ false ];
            this.snap = snap;
            var index;
            var ordered = [];
            Object.keys(entry).forEach(function(index) {
                ordered.push([ asArray(entry[index]), index ]);
            });
            ordered.sort(function(a, b) {
                return a[0][0] - b[0][0];
            });
            for (index = 0; index < ordered.length; index++) this.handleEntryPoint(ordered[index][1], ordered[index][0]);
            this.xNumSteps = this.xSteps.slice(0);
            for (index = 0; index < this.xNumSteps.length; index++) this.handleStepPoint(index, this.xNumSteps[index]);
        }
        Spectrum.prototype.getDistance = function(value) {
            var distances = [];
            for (var index = 0; index < this.xNumSteps.length - 1; index++) distances[index] = fromPercentage(this.xVal, value, index);
            return distances;
        };
        Spectrum.prototype.getAbsoluteDistance = function(value, distances, direction) {
            var xPct_index = 0;
            if (value < this.xPct[this.xPct.length - 1]) while (value > this.xPct[xPct_index + 1]) xPct_index++; else if (value === this.xPct[this.xPct.length - 1]) xPct_index = this.xPct.length - 2;
            if (!direction && value === this.xPct[xPct_index + 1]) xPct_index++;
            if (distances === null) distances = [];
            var start_factor;
            var rest_factor = 1;
            var rest_rel_distance = distances[xPct_index];
            var range_pct = 0;
            var rel_range_distance = 0;
            var abs_distance_counter = 0;
            var range_counter = 0;
            if (direction) start_factor = (value - this.xPct[xPct_index]) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]); else start_factor = (this.xPct[xPct_index + 1] - value) / (this.xPct[xPct_index + 1] - this.xPct[xPct_index]);
            while (rest_rel_distance > 0) {
                range_pct = this.xPct[xPct_index + 1 + range_counter] - this.xPct[xPct_index + range_counter];
                if (distances[xPct_index + range_counter] * rest_factor + 100 - start_factor * 100 > 100) {
                    rel_range_distance = range_pct * start_factor;
                    rest_factor = (rest_rel_distance - 100 * start_factor) / distances[xPct_index + range_counter];
                    start_factor = 1;
                } else {
                    rel_range_distance = distances[xPct_index + range_counter] * range_pct / 100 * rest_factor;
                    rest_factor = 0;
                }
                if (direction) {
                    abs_distance_counter -= rel_range_distance;
                    if (this.xPct.length + range_counter >= 1) range_counter--;
                } else {
                    abs_distance_counter += rel_range_distance;
                    if (this.xPct.length - range_counter >= 1) range_counter++;
                }
                rest_rel_distance = distances[xPct_index + range_counter] * rest_factor;
            }
            return value + abs_distance_counter;
        };
        Spectrum.prototype.toStepping = function(value) {
            value = toStepping(this.xVal, this.xPct, value);
            return value;
        };
        Spectrum.prototype.fromStepping = function(value) {
            return fromStepping(this.xVal, this.xPct, value);
        };
        Spectrum.prototype.getStep = function(value) {
            value = getStep(this.xPct, this.xSteps, this.snap, value);
            return value;
        };
        Spectrum.prototype.getDefaultStep = function(value, isDown, size) {
            var j = getJ(value, this.xPct);
            if (value === 100 || isDown && value === this.xPct[j - 1]) j = Math.max(j - 1, 1);
            return (this.xVal[j] - this.xVal[j - 1]) / size;
        };
        Spectrum.prototype.getNearbySteps = function(value) {
            var j = getJ(value, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[j - 2],
                    step: this.xNumSteps[j - 2],
                    highestStep: this.xHighestCompleteStep[j - 2]
                },
                thisStep: {
                    startValue: this.xVal[j - 1],
                    step: this.xNumSteps[j - 1],
                    highestStep: this.xHighestCompleteStep[j - 1]
                },
                stepAfter: {
                    startValue: this.xVal[j],
                    step: this.xNumSteps[j],
                    highestStep: this.xHighestCompleteStep[j]
                }
            };
        };
        Spectrum.prototype.countStepDecimals = function() {
            var stepDecimals = this.xNumSteps.map(countDecimals);
            return Math.max.apply(null, stepDecimals);
        };
        Spectrum.prototype.hasNoSize = function() {
            return this.xVal[0] === this.xVal[this.xVal.length - 1];
        };
        Spectrum.prototype.convert = function(value) {
            return this.getStep(this.toStepping(value));
        };
        Spectrum.prototype.handleEntryPoint = function(index, value) {
            var percentage;
            if (index === "min") percentage = 0; else if (index === "max") percentage = 100; else percentage = parseFloat(index);
            if (!isNumeric(percentage) || !isNumeric(value[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
            this.xPct.push(percentage);
            this.xVal.push(value[0]);
            var value1 = Number(value[1]);
            if (!percentage) {
                if (!isNaN(value1)) this.xSteps[0] = value1;
            } else this.xSteps.push(isNaN(value1) ? false : value1);
            this.xHighestCompleteStep.push(0);
        };
        Spectrum.prototype.handleStepPoint = function(i, n) {
            if (!n) return;
            if (this.xVal[i] === this.xVal[i + 1]) {
                this.xSteps[i] = this.xHighestCompleteStep[i] = this.xVal[i];
                return;
            }
            this.xSteps[i] = fromPercentage([ this.xVal[i], this.xVal[i + 1] ], n, 0) / subRangeRatio(this.xPct[i], this.xPct[i + 1]);
            var totalSteps = (this.xVal[i + 1] - this.xVal[i]) / this.xNumSteps[i];
            var highestStep = Math.ceil(Number(totalSteps.toFixed(3)) - 1);
            var step = this.xVal[i] + this.xNumSteps[i] * highestStep;
            this.xHighestCompleteStep[i] = step;
        };
        return Spectrum;
    }();
    var defaultFormatter = {
        to: function(value) {
            return value === void 0 ? "" : value.toFixed(2);
        },
        from: Number
    };
    var cssClasses = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub"
    };
    var INTERNAL_EVENT_NS = {
        tooltips: ".__tooltips",
        aria: ".__aria"
    };
    function testStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'step' is not numeric.");
        parsed.singleStep = entry;
    }
    function testKeyboardPageMultiplier(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
        parsed.keyboardPageMultiplier = entry;
    }
    function testKeyboardMultiplier(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
        parsed.keyboardMultiplier = entry;
    }
    function testKeyboardDefaultStep(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
        parsed.keyboardDefaultStep = entry;
    }
    function testRange(parsed, entry) {
        if (typeof entry !== "object" || Array.isArray(entry)) throw new Error("noUiSlider: 'range' is not an object.");
        if (entry.min === void 0 || entry.max === void 0) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
        parsed.spectrum = new Spectrum(entry, parsed.snap || false, parsed.singleStep);
    }
    function testStart(parsed, entry) {
        entry = asArray(entry);
        if (!Array.isArray(entry) || !entry.length) throw new Error("noUiSlider: 'start' option is incorrect.");
        parsed.handles = entry.length;
        parsed.start = entry;
    }
    function testSnap(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'snap' option must be a boolean.");
        parsed.snap = entry;
    }
    function testAnimate(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'animate' option must be a boolean.");
        parsed.animate = entry;
    }
    function testAnimationDuration(parsed, entry) {
        if (typeof entry !== "number") throw new Error("noUiSlider: 'animationDuration' option must be a number.");
        parsed.animationDuration = entry;
    }
    function testConnect(parsed, entry) {
        var connect = [ false ];
        var i;
        if (entry === "lower") entry = [ true, false ]; else if (entry === "upper") entry = [ false, true ];
        if (entry === true || entry === false) {
            for (i = 1; i < parsed.handles; i++) connect.push(entry);
            connect.push(false);
        } else if (!Array.isArray(entry) || !entry.length || entry.length !== parsed.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); else connect = entry;
        parsed.connect = connect;
    }
    function testOrientation(parsed, entry) {
        switch (entry) {
          case "horizontal":
            parsed.ort = 0;
            break;

          case "vertical":
            parsed.ort = 1;
            break;

          default:
            throw new Error("noUiSlider: 'orientation' option is invalid.");
        }
    }
    function testMargin(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'margin' option must be numeric.");
        if (entry === 0) return;
        parsed.margin = parsed.spectrum.getDistance(entry);
    }
    function testLimit(parsed, entry) {
        if (!isNumeric(entry)) throw new Error("noUiSlider: 'limit' option must be numeric.");
        parsed.limit = parsed.spectrum.getDistance(entry);
        if (!parsed.limit || parsed.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
    }
    function testPadding(parsed, entry) {
        var index;
        if (!isNumeric(entry) && !Array.isArray(entry)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(entry) && !(entry.length === 2 || isNumeric(entry[0]) || isNumeric(entry[1]))) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
        if (entry === 0) return;
        if (!Array.isArray(entry)) entry = [ entry, entry ];
        parsed.padding = [ parsed.spectrum.getDistance(entry[0]), parsed.spectrum.getDistance(entry[1]) ];
        for (index = 0; index < parsed.spectrum.xNumSteps.length - 1; index++) if (parsed.padding[0][index] < 0 || parsed.padding[1][index] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
        var totalPadding = entry[0] + entry[1];
        var firstValue = parsed.spectrum.xVal[0];
        var lastValue = parsed.spectrum.xVal[parsed.spectrum.xVal.length - 1];
        if (totalPadding / (lastValue - firstValue) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
    }
    function testDirection(parsed, entry) {
        switch (entry) {
          case "ltr":
            parsed.dir = 0;
            break;

          case "rtl":
            parsed.dir = 1;
            break;

          default:
            throw new Error("noUiSlider: 'direction' option was not recognized.");
        }
    }
    function testBehaviour(parsed, entry) {
        if (typeof entry !== "string") throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
        var tap = entry.indexOf("tap") >= 0;
        var drag = entry.indexOf("drag") >= 0;
        var fixed = entry.indexOf("fixed") >= 0;
        var snap = entry.indexOf("snap") >= 0;
        var hover = entry.indexOf("hover") >= 0;
        var unconstrained = entry.indexOf("unconstrained") >= 0;
        var invertConnects = entry.indexOf("invert-connects") >= 0;
        var dragAll = entry.indexOf("drag-all") >= 0;
        var smoothSteps = entry.indexOf("smooth-steps") >= 0;
        if (fixed) {
            if (parsed.handles !== 2) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
            testMargin(parsed, parsed.start[1] - parsed.start[0]);
        }
        if (invertConnects && parsed.handles !== 2) throw new Error("noUiSlider: 'invert-connects' behaviour must be used with 2 handles");
        if (unconstrained && (parsed.margin || parsed.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
        parsed.events = {
            tap: tap || snap,
            drag,
            dragAll,
            smoothSteps,
            fixed,
            snap,
            hover,
            unconstrained,
            invertConnects
        };
    }
    function testTooltips(parsed, entry) {
        if (entry === false) return;
        if (entry === true || isValidPartialFormatter(entry)) {
            parsed.tooltips = [];
            for (var i = 0; i < parsed.handles; i++) parsed.tooltips.push(entry);
        } else {
            entry = asArray(entry);
            if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
            entry.forEach(function(formatter) {
                if (typeof formatter !== "boolean" && !isValidPartialFormatter(formatter)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
            });
            parsed.tooltips = entry;
        }
    }
    function testHandleAttributes(parsed, entry) {
        if (entry.length !== parsed.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
        parsed.handleAttributes = entry;
    }
    function testAriaFormat(parsed, entry) {
        if (!isValidPartialFormatter(entry)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
        parsed.ariaFormat = entry;
    }
    function testFormat(parsed, entry) {
        if (!isValidFormatter(entry)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
        parsed.format = entry;
    }
    function testKeyboardSupport(parsed, entry) {
        if (typeof entry !== "boolean") throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
        parsed.keyboardSupport = entry;
    }
    function testDocumentElement(parsed, entry) {
        parsed.documentElement = entry;
    }
    function testCssPrefix(parsed, entry) {
        if (typeof entry !== "string" && entry !== false) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
        parsed.cssPrefix = entry;
    }
    function testCssClasses(parsed, entry) {
        if (typeof entry !== "object") throw new Error("noUiSlider: 'cssClasses' must be an object.");
        if (typeof parsed.cssPrefix === "string") {
            parsed.cssClasses = {};
            Object.keys(entry).forEach(function(key) {
                parsed.cssClasses[key] = parsed.cssPrefix + entry[key];
            });
        } else parsed.cssClasses = entry;
    }
    function testOptions(options) {
        var parsed = {
            margin: null,
            limit: null,
            padding: null,
            animate: true,
            animationDuration: 300,
            ariaFormat: defaultFormatter,
            format: defaultFormatter
        };
        var tests = {
            step: {
                r: false,
                t: testStep
            },
            keyboardPageMultiplier: {
                r: false,
                t: testKeyboardPageMultiplier
            },
            keyboardMultiplier: {
                r: false,
                t: testKeyboardMultiplier
            },
            keyboardDefaultStep: {
                r: false,
                t: testKeyboardDefaultStep
            },
            start: {
                r: true,
                t: testStart
            },
            connect: {
                r: true,
                t: testConnect
            },
            direction: {
                r: true,
                t: testDirection
            },
            snap: {
                r: false,
                t: testSnap
            },
            animate: {
                r: false,
                t: testAnimate
            },
            animationDuration: {
                r: false,
                t: testAnimationDuration
            },
            range: {
                r: true,
                t: testRange
            },
            orientation: {
                r: false,
                t: testOrientation
            },
            margin: {
                r: false,
                t: testMargin
            },
            limit: {
                r: false,
                t: testLimit
            },
            padding: {
                r: false,
                t: testPadding
            },
            behaviour: {
                r: true,
                t: testBehaviour
            },
            ariaFormat: {
                r: false,
                t: testAriaFormat
            },
            format: {
                r: false,
                t: testFormat
            },
            tooltips: {
                r: false,
                t: testTooltips
            },
            keyboardSupport: {
                r: true,
                t: testKeyboardSupport
            },
            documentElement: {
                r: false,
                t: testDocumentElement
            },
            cssPrefix: {
                r: true,
                t: testCssPrefix
            },
            cssClasses: {
                r: true,
                t: testCssClasses
            },
            handleAttributes: {
                r: false,
                t: testHandleAttributes
            }
        };
        var defaults = {
            connect: false,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: true,
            cssPrefix: "noUi-",
            cssClasses,
            keyboardPageMultiplier: 5,
            keyboardMultiplier: 1,
            keyboardDefaultStep: 10
        };
        if (options.format && !options.ariaFormat) options.ariaFormat = options.format;
        Object.keys(tests).forEach(function(name) {
            if (!isSet(options[name]) && defaults[name] === void 0) {
                if (tests[name].r) throw new Error("noUiSlider: '" + name + "' is required.");
                return;
            }
            tests[name].t(parsed, !isSet(options[name]) ? defaults[name] : options[name]);
        });
        parsed.pips = options.pips;
        var d = document.createElement("div");
        var msPrefix = d.style.msTransform !== void 0;
        var noPrefix = d.style.transform !== void 0;
        parsed.transformRule = noPrefix ? "transform" : msPrefix ? "msTransform" : "webkitTransform";
        var styles = [ [ "left", "top" ], [ "right", "bottom" ] ];
        parsed.style = styles[parsed.dir][parsed.ort];
        return parsed;
    }
    function scope(target, options, originalOptions) {
        var actions = getActions();
        var supportsTouchActionNone = getSupportsTouchActionNone();
        var supportsPassive = supportsTouchActionNone && getSupportsPassive();
        var scope_Target = target;
        var scope_Base;
        var scope_ConnectBase;
        var scope_Handles;
        var scope_Connects;
        var scope_Pips;
        var scope_Tooltips;
        var scope_Spectrum = options.spectrum;
        var scope_Values = [];
        var scope_Locations = [];
        var scope_HandleNumbers = [];
        var scope_ActiveHandlesCount = 0;
        var scope_Events = {};
        var scope_ConnectsInverted = false;
        var scope_Document = target.ownerDocument;
        var scope_DocumentElement = options.documentElement || scope_Document.documentElement;
        var scope_Body = scope_Document.body;
        var scope_DirOffset = scope_Document.dir === "rtl" || options.ort === 1 ? 0 : 100;
        function addNodeTo(addTarget, className) {
            var div = scope_Document.createElement("div");
            if (className) addClass(div, className);
            addTarget.appendChild(div);
            return div;
        }
        function addOrigin(base, handleNumber) {
            var origin = addNodeTo(base, options.cssClasses.origin);
            var handle = addNodeTo(origin, options.cssClasses.handle);
            addNodeTo(handle, options.cssClasses.touchArea);
            handle.setAttribute("data-handle", String(handleNumber));
            if (options.keyboardSupport) {
                handle.setAttribute("tabindex", "0");
                handle.addEventListener("keydown", function(event) {
                    return eventKeydown(event, handleNumber);
                });
            }
            if (options.handleAttributes !== void 0) {
                var attributes_1 = options.handleAttributes[handleNumber];
                Object.keys(attributes_1).forEach(function(attribute) {
                    handle.setAttribute(attribute, attributes_1[attribute]);
                });
            }
            handle.setAttribute("role", "slider");
            handle.setAttribute("aria-orientation", options.ort ? "vertical" : "horizontal");
            if (handleNumber === 0) addClass(handle, options.cssClasses.handleLower); else if (handleNumber === options.handles - 1) addClass(handle, options.cssClasses.handleUpper);
            origin.handle = handle;
            return origin;
        }
        function addConnect(base, add) {
            if (!add) return false;
            return addNodeTo(base, options.cssClasses.connect);
        }
        function addElements(connectOptions, base) {
            scope_ConnectBase = addNodeTo(base, options.cssClasses.connects);
            scope_Handles = [];
            scope_Connects = [];
            scope_Connects.push(addConnect(scope_ConnectBase, connectOptions[0]));
            for (var i = 0; i < options.handles; i++) {
                scope_Handles.push(addOrigin(base, i));
                scope_HandleNumbers[i] = i;
                scope_Connects.push(addConnect(scope_ConnectBase, connectOptions[i + 1]));
            }
        }
        function addSlider(addTarget) {
            addClass(addTarget, options.cssClasses.target);
            if (options.dir === 0) addClass(addTarget, options.cssClasses.ltr); else addClass(addTarget, options.cssClasses.rtl);
            if (options.ort === 0) addClass(addTarget, options.cssClasses.horizontal); else addClass(addTarget, options.cssClasses.vertical);
            var textDirection = getComputedStyle(addTarget).direction;
            if (textDirection === "rtl") addClass(addTarget, options.cssClasses.textDirectionRtl); else addClass(addTarget, options.cssClasses.textDirectionLtr);
            return addNodeTo(addTarget, options.cssClasses.base);
        }
        function addTooltip(handle, handleNumber) {
            if (!options.tooltips || !options.tooltips[handleNumber]) return false;
            return addNodeTo(handle.firstChild, options.cssClasses.tooltip);
        }
        function isSliderDisabled() {
            return scope_Target.hasAttribute("disabled");
        }
        function isHandleDisabled(handleNumber) {
            var handleOrigin = scope_Handles[handleNumber];
            return handleOrigin.hasAttribute("disabled");
        }
        function disable(handleNumber) {
            if (handleNumber !== null && handleNumber !== void 0) {
                scope_Handles[handleNumber].setAttribute("disabled", "");
                scope_Handles[handleNumber].handle.removeAttribute("tabindex");
            } else {
                scope_Target.setAttribute("disabled", "");
                scope_Handles.forEach(function(handle) {
                    handle.handle.removeAttribute("tabindex");
                });
            }
        }
        function enable(handleNumber) {
            if (handleNumber !== null && handleNumber !== void 0) {
                scope_Handles[handleNumber].removeAttribute("disabled");
                scope_Handles[handleNumber].handle.setAttribute("tabindex", "0");
            } else {
                scope_Target.removeAttribute("disabled");
                scope_Handles.forEach(function(handle) {
                    handle.removeAttribute("disabled");
                    handle.handle.setAttribute("tabindex", "0");
                });
            }
        }
        function removeTooltips() {
            if (scope_Tooltips) {
                removeEvent("update" + INTERNAL_EVENT_NS.tooltips);
                scope_Tooltips.forEach(function(tooltip) {
                    if (tooltip) removeElement(tooltip);
                });
                scope_Tooltips = null;
            }
        }
        function tooltips() {
            removeTooltips();
            scope_Tooltips = scope_Handles.map(addTooltip);
            bindEvent("update" + INTERNAL_EVENT_NS.tooltips, function(values, handleNumber, unencoded) {
                if (!scope_Tooltips || !options.tooltips) return;
                if (scope_Tooltips[handleNumber] === false) return;
                var formattedValue = values[handleNumber];
                if (options.tooltips[handleNumber] !== true) formattedValue = options.tooltips[handleNumber].to(unencoded[handleNumber]);
                scope_Tooltips[handleNumber].innerHTML = formattedValue;
            });
        }
        function aria() {
            removeEvent("update" + INTERNAL_EVENT_NS.aria);
            bindEvent("update" + INTERNAL_EVENT_NS.aria, function(values, handleNumber, unencoded, tap, positions) {
                scope_HandleNumbers.forEach(function(index) {
                    var handle = scope_Handles[index];
                    var min = checkHandlePosition(scope_Locations, index, 0, true, true, true);
                    var max = checkHandlePosition(scope_Locations, index, 100, true, true, true);
                    var now = positions[index];
                    var text = String(options.ariaFormat.to(unencoded[index]));
                    min = scope_Spectrum.fromStepping(min).toFixed(1);
                    max = scope_Spectrum.fromStepping(max).toFixed(1);
                    now = scope_Spectrum.fromStepping(now).toFixed(1);
                    handle.children[0].setAttribute("aria-valuemin", min);
                    handle.children[0].setAttribute("aria-valuemax", max);
                    handle.children[0].setAttribute("aria-valuenow", now);
                    handle.children[0].setAttribute("aria-valuetext", text);
                });
            });
        }
        function getGroup(pips) {
            if (pips.mode === PipsMode.Range || pips.mode === PipsMode.Steps) return scope_Spectrum.xVal;
            if (pips.mode === PipsMode.Count) {
                if (pips.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
                var interval = pips.values - 1;
                var spread = 100 / interval;
                var values = [];
                while (interval--) values[interval] = interval * spread;
                values.push(100);
                return mapToRange(values, pips.stepped);
            }
            if (pips.mode === PipsMode.Positions) return mapToRange(pips.values, pips.stepped);
            if (pips.mode === PipsMode.Values) {
                if (pips.stepped) return pips.values.map(function(value) {
                    return scope_Spectrum.fromStepping(scope_Spectrum.getStep(scope_Spectrum.toStepping(value)));
                });
                return pips.values;
            }
            return [];
        }
        function mapToRange(values, stepped) {
            return values.map(function(value) {
                return scope_Spectrum.fromStepping(stepped ? scope_Spectrum.getStep(value) : value);
            });
        }
        function generateSpread(pips) {
            function safeIncrement(value, increment) {
                return Number((value + increment).toFixed(7));
            }
            var group = getGroup(pips);
            var indexes = {};
            var firstInRange = scope_Spectrum.xVal[0];
            var lastInRange = scope_Spectrum.xVal[scope_Spectrum.xVal.length - 1];
            var ignoreFirst = false;
            var ignoreLast = false;
            var prevPct = 0;
            group = unique(group.slice().sort(function(a, b) {
                return a - b;
            }));
            if (group[0] !== firstInRange) {
                group.unshift(firstInRange);
                ignoreFirst = true;
            }
            if (group[group.length - 1] !== lastInRange) {
                group.push(lastInRange);
                ignoreLast = true;
            }
            group.forEach(function(current, index) {
                var step;
                var i;
                var q;
                var low = current;
                var high = group[index + 1];
                var newPct;
                var pctDifference;
                var pctPos;
                var type;
                var steps;
                var realSteps;
                var stepSize;
                var isSteps = pips.mode === PipsMode.Steps;
                if (isSteps) step = scope_Spectrum.xNumSteps[index];
                if (!step) step = high - low;
                if (high === void 0) high = low;
                step = Math.max(step, 1e-7);
                for (i = low; i <= high; i = safeIncrement(i, step)) {
                    newPct = scope_Spectrum.toStepping(i);
                    pctDifference = newPct - prevPct;
                    steps = pctDifference / (pips.density || 1);
                    realSteps = Math.round(steps);
                    stepSize = pctDifference / realSteps;
                    for (q = 1; q <= realSteps; q += 1) {
                        pctPos = prevPct + q * stepSize;
                        indexes[pctPos.toFixed(5)] = [ scope_Spectrum.fromStepping(pctPos), 0 ];
                    }
                    type = group.indexOf(i) > -1 ? PipsType.LargeValue : isSteps ? PipsType.SmallValue : PipsType.NoValue;
                    if (!index && ignoreFirst && i !== high) type = 0;
                    if (!(i === high && ignoreLast)) indexes[newPct.toFixed(5)] = [ i, type ];
                    prevPct = newPct;
                }
            });
            return indexes;
        }
        function addMarking(spread, filterFunc, formatter) {
            var _a, _b;
            var element = scope_Document.createElement("div");
            var valueSizeClasses = (_a = {}, _a[PipsType.None] = "", _a[PipsType.NoValue] = options.cssClasses.valueNormal, 
            _a[PipsType.LargeValue] = options.cssClasses.valueLarge, _a[PipsType.SmallValue] = options.cssClasses.valueSub, 
            _a);
            var markerSizeClasses = (_b = {}, _b[PipsType.None] = "", _b[PipsType.NoValue] = options.cssClasses.markerNormal, 
            _b[PipsType.LargeValue] = options.cssClasses.markerLarge, _b[PipsType.SmallValue] = options.cssClasses.markerSub, 
            _b);
            var valueOrientationClasses = [ options.cssClasses.valueHorizontal, options.cssClasses.valueVertical ];
            var markerOrientationClasses = [ options.cssClasses.markerHorizontal, options.cssClasses.markerVertical ];
            addClass(element, options.cssClasses.pips);
            addClass(element, options.ort === 0 ? options.cssClasses.pipsHorizontal : options.cssClasses.pipsVertical);
            function getClasses(type, source) {
                var a = source === options.cssClasses.value;
                var orientationClasses = a ? valueOrientationClasses : markerOrientationClasses;
                var sizeClasses = a ? valueSizeClasses : markerSizeClasses;
                return source + " " + orientationClasses[options.ort] + " " + sizeClasses[type];
            }
            function addSpread(offset, value, type) {
                type = filterFunc ? filterFunc(value, type) : type;
                if (type === PipsType.None) return;
                var node = addNodeTo(element, false);
                node.className = getClasses(type, options.cssClasses.marker);
                node.style[options.style] = offset + "%";
                if (type > PipsType.NoValue) {
                    node = addNodeTo(element, false);
                    node.className = getClasses(type, options.cssClasses.value);
                    node.setAttribute("data-value", String(value));
                    node.style[options.style] = offset + "%";
                    node.innerHTML = String(formatter.to(value));
                }
            }
            Object.keys(spread).forEach(function(offset) {
                addSpread(offset, spread[offset][0], spread[offset][1]);
            });
            return element;
        }
        function removePips() {
            if (scope_Pips) {
                removeElement(scope_Pips);
                scope_Pips = null;
            }
        }
        function pips(pips) {
            removePips();
            var spread = generateSpread(pips);
            var filter = pips.filter;
            var format = pips.format || {
                to: function(value) {
                    return String(Math.round(value));
                }
            };
            scope_Pips = scope_Target.appendChild(addMarking(spread, filter, format));
            return scope_Pips;
        }
        function baseSize() {
            var rect = scope_Base.getBoundingClientRect();
            var alt = "offset" + [ "Width", "Height" ][options.ort];
            return options.ort === 0 ? rect.width || scope_Base[alt] : rect.height || scope_Base[alt];
        }
        function attachEvent(events, element, callback, data) {
            var method = function(event) {
                var e = fixEvent(event, data.pageOffset, data.target || element);
                if (!e) return false;
                if (isSliderDisabled() && !data.doNotReject) return false;
                if (hasClass(scope_Target, options.cssClasses.tap) && !data.doNotReject) return false;
                if (events === actions.start && e.buttons !== void 0 && e.buttons > 1) return false;
                if (data.hover && e.buttons) return false;
                if (!supportsPassive) e.preventDefault();
                e.calcPoint = e.points[options.ort];
                callback(e, data);
                return;
            };
            var methods = [];
            events.split(" ").forEach(function(eventName) {
                element.addEventListener(eventName, method, supportsPassive ? {
                    passive: true
                } : false);
                methods.push([ eventName, method ]);
            });
            return methods;
        }
        function fixEvent(e, pageOffset, eventTarget) {
            var touch = e.type.indexOf("touch") === 0;
            var mouse = e.type.indexOf("mouse") === 0;
            var pointer = e.type.indexOf("pointer") === 0;
            var x = 0;
            var y = 0;
            if (e.type.indexOf("MSPointer") === 0) pointer = true;
            if (e.type === "mousedown" && !e.buttons && !e.touches) return false;
            if (touch) {
                var isTouchOnTarget = function(checkTouch) {
                    var target = checkTouch.target;
                    return target === eventTarget || eventTarget.contains(target) || e.composed && e.composedPath().shift() === eventTarget;
                };
                if (e.type === "touchstart") {
                    var targetTouches = Array.prototype.filter.call(e.touches, isTouchOnTarget);
                    if (targetTouches.length > 1) return false;
                    x = targetTouches[0].pageX;
                    y = targetTouches[0].pageY;
                } else {
                    var targetTouch = Array.prototype.find.call(e.changedTouches, isTouchOnTarget);
                    if (!targetTouch) return false;
                    x = targetTouch.pageX;
                    y = targetTouch.pageY;
                }
            }
            pageOffset = pageOffset || getPageOffset(scope_Document);
            if (mouse || pointer) {
                x = e.clientX + pageOffset.x;
                y = e.clientY + pageOffset.y;
            }
            e.pageOffset = pageOffset;
            e.points = [ x, y ];
            e.cursor = mouse || pointer;
            return e;
        }
        function calcPointToPercentage(calcPoint) {
            var location = calcPoint - offset(scope_Base, options.ort);
            var proposal = location * 100 / baseSize();
            proposal = limit(proposal);
            return options.dir ? 100 - proposal : proposal;
        }
        function getClosestHandle(clickedPosition) {
            var smallestDifference = 100;
            var handleNumber = false;
            scope_Handles.forEach(function(handle, index) {
                if (isHandleDisabled(index)) return;
                var handlePosition = scope_Locations[index];
                var differenceWithThisHandle = Math.abs(handlePosition - clickedPosition);
                var clickAtEdge = differenceWithThisHandle === 100 && smallestDifference === 100;
                var isCloser = differenceWithThisHandle < smallestDifference;
                var isCloserAfter = differenceWithThisHandle <= smallestDifference && clickedPosition > handlePosition;
                if (isCloser || isCloserAfter || clickAtEdge) {
                    handleNumber = index;
                    smallestDifference = differenceWithThisHandle;
                }
            });
            return handleNumber;
        }
        function documentLeave(event, data) {
            if (event.type === "mouseout" && event.target.nodeName === "HTML" && event.relatedTarget === null) eventEnd(event, data);
        }
        function eventMove(event, data) {
            if (navigator.appVersion.indexOf("MSIE 9") === -1 && event.buttons === 0 && data.buttonsProperty !== 0) return eventEnd(event, data);
            var movement = (options.dir ? -1 : 1) * (event.calcPoint - data.startCalcPoint);
            var proposal = movement * 100 / data.baseSize;
            moveHandles(movement > 0, proposal, data.locations, data.handleNumbers, data.connect);
        }
        function eventEnd(event, data) {
            if (data.handle) {
                removeClass(data.handle, options.cssClasses.active);
                scope_ActiveHandlesCount -= 1;
            }
            data.listeners.forEach(function(c) {
                scope_DocumentElement.removeEventListener(c[0], c[1]);
            });
            if (scope_ActiveHandlesCount === 0) {
                removeClass(scope_Target, options.cssClasses.drag);
                setZindex();
                if (event.cursor) {
                    scope_Body.style.cursor = "";
                    scope_Body.removeEventListener("selectstart", preventDefault);
                }
            }
            if (options.events.smoothSteps) {
                data.handleNumbers.forEach(function(handleNumber) {
                    setHandle(handleNumber, scope_Locations[handleNumber], true, true, false, false);
                });
                data.handleNumbers.forEach(function(handleNumber) {
                    fireEvent("update", handleNumber);
                });
            }
            data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("change", handleNumber);
                fireEvent("set", handleNumber);
                fireEvent("end", handleNumber);
            });
        }
        function eventStart(event, data) {
            if (data.handleNumbers.some(isHandleDisabled)) return;
            var handle;
            if (data.handleNumbers.length === 1) {
                var handleOrigin = scope_Handles[data.handleNumbers[0]];
                handle = handleOrigin.children[0];
                scope_ActiveHandlesCount += 1;
                addClass(handle, options.cssClasses.active);
            }
            event.stopPropagation();
            var listeners = [];
            var moveEvent = attachEvent(actions.move, scope_DocumentElement, eventMove, {
                target: event.target,
                handle,
                connect: data.connect,
                listeners,
                startCalcPoint: event.calcPoint,
                baseSize: baseSize(),
                pageOffset: event.pageOffset,
                handleNumbers: data.handleNumbers,
                buttonsProperty: event.buttons,
                locations: scope_Locations.slice()
            });
            var endEvent = attachEvent(actions.end, scope_DocumentElement, eventEnd, {
                target: event.target,
                handle,
                listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            var outEvent = attachEvent("mouseout", scope_DocumentElement, documentLeave, {
                target: event.target,
                handle,
                listeners,
                doNotReject: true,
                handleNumbers: data.handleNumbers
            });
            listeners.push.apply(listeners, moveEvent.concat(endEvent, outEvent));
            if (event.cursor) {
                scope_Body.style.cursor = getComputedStyle(event.target).cursor;
                if (scope_Handles.length > 1) addClass(scope_Target, options.cssClasses.drag);
                scope_Body.addEventListener("selectstart", preventDefault, false);
            }
            data.handleNumbers.forEach(function(handleNumber) {
                fireEvent("start", handleNumber);
            });
        }
        function eventTap(event) {
            event.stopPropagation();
            var proposal = calcPointToPercentage(event.calcPoint);
            var handleNumber = getClosestHandle(proposal);
            if (handleNumber === false) return;
            if (!options.events.snap) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            setHandle(handleNumber, proposal, true, true);
            setZindex();
            fireEvent("slide", handleNumber, true);
            fireEvent("update", handleNumber, true);
            if (!options.events.snap) {
                fireEvent("change", handleNumber, true);
                fireEvent("set", handleNumber, true);
            } else eventStart(event, {
                handleNumbers: [ handleNumber ]
            });
        }
        function eventHover(event) {
            var proposal = calcPointToPercentage(event.calcPoint);
            var to = scope_Spectrum.getStep(proposal);
            var value = scope_Spectrum.fromStepping(to);
            Object.keys(scope_Events).forEach(function(targetEvent) {
                if ("hover" === targetEvent.split(".")[0]) scope_Events[targetEvent].forEach(function(callback) {
                    callback.call(scope_Self, value);
                });
            });
        }
        function eventKeydown(event, handleNumber) {
            if (isSliderDisabled() || isHandleDisabled(handleNumber)) return false;
            var horizontalKeys = [ "Left", "Right" ];
            var verticalKeys = [ "Down", "Up" ];
            var largeStepKeys = [ "PageDown", "PageUp" ];
            var edgeKeys = [ "Home", "End" ];
            if (options.dir && !options.ort) horizontalKeys.reverse(); else if (options.ort && !options.dir) {
                verticalKeys.reverse();
                largeStepKeys.reverse();
            }
            var key = event.key.replace("Arrow", "");
            var isLargeDown = key === largeStepKeys[0];
            var isLargeUp = key === largeStepKeys[1];
            var isDown = key === verticalKeys[0] || key === horizontalKeys[0] || isLargeDown;
            var isUp = key === verticalKeys[1] || key === horizontalKeys[1] || isLargeUp;
            var isMin = key === edgeKeys[0];
            var isMax = key === edgeKeys[1];
            if (!isDown && !isUp && !isMin && !isMax) return true;
            event.preventDefault();
            var to;
            if (isUp || isDown) {
                var direction = isDown ? 0 : 1;
                var steps = getNextStepsForHandle(handleNumber);
                var step = steps[direction];
                if (step === null) return false;
                if (step === false) step = scope_Spectrum.getDefaultStep(scope_Locations[handleNumber], isDown, options.keyboardDefaultStep);
                if (isLargeUp || isLargeDown) step *= options.keyboardPageMultiplier; else step *= options.keyboardMultiplier;
                step = Math.max(step, 1e-7);
                step *= isDown ? -1 : 1;
                to = scope_Values[handleNumber] + step;
            } else if (isMax) to = options.spectrum.xVal[options.spectrum.xVal.length - 1]; else to = options.spectrum.xVal[0];
            setHandle(handleNumber, scope_Spectrum.toStepping(to), true, true);
            fireEvent("slide", handleNumber);
            fireEvent("update", handleNumber);
            fireEvent("change", handleNumber);
            fireEvent("set", handleNumber);
            return false;
        }
        function bindSliderEvents(behaviour) {
            if (!behaviour.fixed) scope_Handles.forEach(function(handle, index) {
                attachEvent(actions.start, handle.children[0], eventStart, {
                    handleNumbers: [ index ]
                });
            });
            if (behaviour.tap) attachEvent(actions.start, scope_Base, eventTap, {});
            if (behaviour.hover) attachEvent(actions.move, scope_Base, eventHover, {
                hover: true
            });
            if (behaviour.drag) scope_Connects.forEach(function(connect, index) {
                if (connect === false || index === 0 || index === scope_Connects.length - 1) return;
                var handleBefore = scope_Handles[index - 1];
                var handleAfter = scope_Handles[index];
                var eventHolders = [ connect ];
                var handlesToDrag = [ handleBefore, handleAfter ];
                var handleNumbersToDrag = [ index - 1, index ];
                addClass(connect, options.cssClasses.draggable);
                if (behaviour.fixed) {
                    eventHolders.push(handleBefore.children[0]);
                    eventHolders.push(handleAfter.children[0]);
                }
                if (behaviour.dragAll) {
                    handlesToDrag = scope_Handles;
                    handleNumbersToDrag = scope_HandleNumbers;
                }
                eventHolders.forEach(function(eventHolder) {
                    attachEvent(actions.start, eventHolder, eventStart, {
                        handles: handlesToDrag,
                        handleNumbers: handleNumbersToDrag,
                        connect
                    });
                });
            });
        }
        function bindEvent(namespacedEvent, callback) {
            scope_Events[namespacedEvent] = scope_Events[namespacedEvent] || [];
            scope_Events[namespacedEvent].push(callback);
            if (namespacedEvent.split(".")[0] === "update") scope_Handles.forEach(function(a, index) {
                fireEvent("update", index);
            });
        }
        function isInternalNamespace(namespace) {
            return namespace === INTERNAL_EVENT_NS.aria || namespace === INTERNAL_EVENT_NS.tooltips;
        }
        function removeEvent(namespacedEvent) {
            var event = namespacedEvent && namespacedEvent.split(".")[0];
            var namespace = event ? namespacedEvent.substring(event.length) : namespacedEvent;
            Object.keys(scope_Events).forEach(function(bind) {
                var tEvent = bind.split(".")[0];
                var tNamespace = bind.substring(tEvent.length);
                if ((!event || event === tEvent) && (!namespace || namespace === tNamespace)) if (!isInternalNamespace(tNamespace) || namespace === tNamespace) delete scope_Events[bind];
            });
        }
        function fireEvent(eventName, handleNumber, tap) {
            Object.keys(scope_Events).forEach(function(targetEvent) {
                var eventType = targetEvent.split(".")[0];
                if (eventName === eventType) scope_Events[targetEvent].forEach(function(callback) {
                    callback.call(scope_Self, scope_Values.map(options.format.to), handleNumber, scope_Values.slice(), tap || false, scope_Locations.slice(), scope_Self);
                });
            });
        }
        function checkHandlePosition(reference, handleNumber, to, lookBackward, lookForward, getValue, smoothSteps) {
            var distance;
            if (scope_Handles.length > 1 && !options.events.unconstrained) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.margin, false);
                    to = Math.max(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.margin, true);
                    to = Math.min(to, distance);
                }
            }
            if (scope_Handles.length > 1 && options.limit) {
                if (lookBackward && handleNumber > 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber - 1], options.limit, false);
                    to = Math.min(to, distance);
                }
                if (lookForward && handleNumber < scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(reference[handleNumber + 1], options.limit, true);
                    to = Math.max(to, distance);
                }
            }
            if (options.padding) {
                if (handleNumber === 0) {
                    distance = scope_Spectrum.getAbsoluteDistance(0, options.padding[0], false);
                    to = Math.max(to, distance);
                }
                if (handleNumber === scope_Handles.length - 1) {
                    distance = scope_Spectrum.getAbsoluteDistance(100, options.padding[1], true);
                    to = Math.min(to, distance);
                }
            }
            if (!smoothSteps) to = scope_Spectrum.getStep(to);
            to = limit(to);
            if (to === reference[handleNumber] && !getValue) return false;
            return to;
        }
        function inRuleOrder(v, a) {
            var o = options.ort;
            return (o ? a : v) + ", " + (o ? v : a);
        }
        function moveHandles(upward, proposal, locations, handleNumbers, connect) {
            var proposals = locations.slice();
            var firstHandle = handleNumbers[0];
            var smoothSteps = options.events.smoothSteps;
            var b = [ !upward, upward ];
            var f = [ upward, !upward ];
            handleNumbers = handleNumbers.slice();
            if (upward) handleNumbers.reverse();
            if (handleNumbers.length > 1) handleNumbers.forEach(function(handleNumber, o) {
                var to = checkHandlePosition(proposals, handleNumber, proposals[handleNumber] + proposal, b[o], f[o], false, smoothSteps);
                if (to === false) proposal = 0; else {
                    proposal = to - proposals[handleNumber];
                    proposals[handleNumber] = to;
                }
            }); else b = f = [ true ];
            var state = false;
            handleNumbers.forEach(function(handleNumber, o) {
                state = setHandle(handleNumber, locations[handleNumber] + proposal, b[o], f[o], false, smoothSteps) || state;
            });
            if (state) {
                handleNumbers.forEach(function(handleNumber) {
                    fireEvent("update", handleNumber);
                    fireEvent("slide", handleNumber);
                });
                if (connect != void 0) fireEvent("drag", firstHandle);
            }
        }
        function transformDirection(a, b) {
            return options.dir ? 100 - a - b : a;
        }
        function updateHandlePosition(handleNumber, to) {
            scope_Locations[handleNumber] = to;
            scope_Values[handleNumber] = scope_Spectrum.fromStepping(to);
            var translation = transformDirection(to, 0) - scope_DirOffset;
            var translateRule = "translate(" + inRuleOrder(translation + "%", "0") + ")";
            scope_Handles[handleNumber].style[options.transformRule] = translateRule;
            if (options.events.invertConnects && scope_Locations.length > 1) {
                var handlesAreInOrder = scope_Locations.every(function(position, index, locations) {
                    return index === 0 || position >= locations[index - 1];
                });
                if (scope_ConnectsInverted !== !handlesAreInOrder) {
                    invertConnects();
                    return;
                }
            }
            updateConnect(handleNumber);
            updateConnect(handleNumber + 1);
            if (scope_ConnectsInverted) {
                updateConnect(handleNumber - 1);
                updateConnect(handleNumber + 2);
            }
        }
        function setZindex() {
            scope_HandleNumbers.forEach(function(handleNumber) {
                var dir = scope_Locations[handleNumber] > 50 ? -1 : 1;
                var zIndex = 3 + (scope_Handles.length + dir * handleNumber);
                scope_Handles[handleNumber].style.zIndex = String(zIndex);
            });
        }
        function setHandle(handleNumber, to, lookBackward, lookForward, exactInput, smoothSteps) {
            if (!exactInput) to = checkHandlePosition(scope_Locations, handleNumber, to, lookBackward, lookForward, false, smoothSteps);
            if (to === false) return false;
            updateHandlePosition(handleNumber, to);
            return true;
        }
        function updateConnect(index) {
            if (!scope_Connects[index]) return;
            var locations = scope_Locations.slice();
            if (scope_ConnectsInverted) locations.sort(function(a, b) {
                return a - b;
            });
            var l = 0;
            var h = 100;
            if (index !== 0) l = locations[index - 1];
            if (index !== scope_Connects.length - 1) h = locations[index];
            var connectWidth = h - l;
            var translateRule = "translate(" + inRuleOrder(transformDirection(l, connectWidth) + "%", "0") + ")";
            var scaleRule = "scale(" + inRuleOrder(connectWidth / 100, "1") + ")";
            scope_Connects[index].style[options.transformRule] = translateRule + " " + scaleRule;
        }
        function resolveToValue(to, handleNumber) {
            if (to === null || to === false || to === void 0) return scope_Locations[handleNumber];
            if (typeof to === "number") to = String(to);
            to = options.format.from(to);
            if (to !== false) to = scope_Spectrum.toStepping(to);
            if (to === false || isNaN(to)) return scope_Locations[handleNumber];
            return to;
        }
        function valueSet(input, fireSetEvent, exactInput) {
            var values = asArray(input);
            var isInit = scope_Locations[0] === void 0;
            fireSetEvent = fireSetEvent === void 0 ? true : fireSetEvent;
            if (options.animate && !isInit) addClassFor(scope_Target, options.cssClasses.tap, options.animationDuration);
            scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, resolveToValue(values[handleNumber], handleNumber), true, false, exactInput);
            });
            var i = scope_HandleNumbers.length === 1 ? 0 : 1;
            if (isInit && scope_Spectrum.hasNoSize()) {
                exactInput = true;
                scope_Locations[0] = 0;
                if (scope_HandleNumbers.length > 1) {
                    var space_1 = 100 / (scope_HandleNumbers.length - 1);
                    scope_HandleNumbers.forEach(function(handleNumber) {
                        scope_Locations[handleNumber] = handleNumber * space_1;
                    });
                }
            }
            for (;i < scope_HandleNumbers.length; ++i) scope_HandleNumbers.forEach(function(handleNumber) {
                setHandle(handleNumber, scope_Locations[handleNumber], true, true, exactInput);
            });
            setZindex();
            scope_HandleNumbers.forEach(function(handleNumber) {
                fireEvent("update", handleNumber);
                if (values[handleNumber] !== null && fireSetEvent) fireEvent("set", handleNumber);
            });
        }
        function valueReset(fireSetEvent) {
            valueSet(options.start, fireSetEvent);
        }
        function valueSetHandle(handleNumber, value, fireSetEvent, exactInput) {
            handleNumber = Number(handleNumber);
            if (!(handleNumber >= 0 && handleNumber < scope_HandleNumbers.length)) throw new Error("noUiSlider: invalid handle number, got: " + handleNumber);
            setHandle(handleNumber, resolveToValue(value, handleNumber), true, true, exactInput);
            fireEvent("update", handleNumber);
            if (fireSetEvent) fireEvent("set", handleNumber);
        }
        function valueGet(unencoded) {
            if (unencoded === void 0) unencoded = false;
            if (unencoded) return scope_Values.length === 1 ? scope_Values[0] : scope_Values.slice(0);
            var values = scope_Values.map(options.format.to);
            if (values.length === 1) return values[0];
            return values;
        }
        function destroy() {
            removeEvent(INTERNAL_EVENT_NS.aria);
            removeEvent(INTERNAL_EVENT_NS.tooltips);
            Object.keys(options.cssClasses).forEach(function(key) {
                removeClass(scope_Target, options.cssClasses[key]);
            });
            while (scope_Target.firstChild) scope_Target.removeChild(scope_Target.firstChild);
            delete scope_Target.noUiSlider;
        }
        function getNextStepsForHandle(handleNumber) {
            var location = scope_Locations[handleNumber];
            var nearbySteps = scope_Spectrum.getNearbySteps(location);
            var value = scope_Values[handleNumber];
            var increment = nearbySteps.thisStep.step;
            var decrement = null;
            if (options.snap) return [ value - nearbySteps.stepBefore.startValue || null, nearbySteps.stepAfter.startValue - value || null ];
            if (increment !== false) if (value + increment > nearbySteps.stepAfter.startValue) increment = nearbySteps.stepAfter.startValue - value;
            if (value > nearbySteps.thisStep.startValue) decrement = nearbySteps.thisStep.step; else if (nearbySteps.stepBefore.step === false) decrement = false; else decrement = value - nearbySteps.stepBefore.highestStep;
            if (location === 100) increment = null; else if (location === 0) decrement = null;
            var stepDecimals = scope_Spectrum.countStepDecimals();
            if (increment !== null && increment !== false) increment = Number(increment.toFixed(stepDecimals));
            if (decrement !== null && decrement !== false) decrement = Number(decrement.toFixed(stepDecimals));
            return [ decrement, increment ];
        }
        function getNextSteps() {
            return scope_HandleNumbers.map(getNextStepsForHandle);
        }
        function updateOptions(optionsToUpdate, fireSetEvent) {
            var v = valueGet();
            var updateAble = [ "margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips", "connect" ];
            updateAble.forEach(function(name) {
                if (optionsToUpdate[name] !== void 0) originalOptions[name] = optionsToUpdate[name];
            });
            var newOptions = testOptions(originalOptions);
            updateAble.forEach(function(name) {
                if (optionsToUpdate[name] !== void 0) options[name] = newOptions[name];
            });
            scope_Spectrum = newOptions.spectrum;
            options.margin = newOptions.margin;
            options.limit = newOptions.limit;
            options.padding = newOptions.padding;
            if (options.pips) pips(options.pips); else removePips();
            if (options.tooltips) tooltips(); else removeTooltips();
            scope_Locations = [];
            valueSet(isSet(optionsToUpdate.start) ? optionsToUpdate.start : v, fireSetEvent);
            if (optionsToUpdate.connect) updateConnectOption();
        }
        function updateConnectOption() {
            while (scope_ConnectBase.firstChild) scope_ConnectBase.removeChild(scope_ConnectBase.firstChild);
            for (var i = 0; i <= options.handles; i++) {
                scope_Connects[i] = addConnect(scope_ConnectBase, options.connect[i]);
                updateConnect(i);
            }
            bindSliderEvents({
                drag: options.events.drag,
                fixed: true
            });
        }
        function invertConnects() {
            scope_ConnectsInverted = !scope_ConnectsInverted;
            testConnect(options, options.connect.map(function(b) {
                return !b;
            }));
            updateConnectOption();
        }
        function setupSlider() {
            scope_Base = addSlider(scope_Target);
            addElements(options.connect, scope_Base);
            bindSliderEvents(options.events);
            valueSet(options.start);
            if (options.pips) pips(options.pips);
            if (options.tooltips) tooltips();
            aria();
        }
        setupSlider();
        var scope_Self = {
            destroy,
            steps: getNextSteps,
            on: bindEvent,
            off: removeEvent,
            get: valueGet,
            set: valueSet,
            setHandle: valueSetHandle,
            reset: valueReset,
            disable,
            enable,
            __moveHandles: function(upward, proposal, handleNumbers) {
                moveHandles(upward, proposal, scope_Locations, handleNumbers);
            },
            options: originalOptions,
            updateOptions,
            target: scope_Target,
            removePips,
            removeTooltips,
            getPositions: function() {
                return scope_Locations.slice();
            },
            getTooltips: function() {
                return scope_Tooltips;
            },
            getOrigins: function() {
                return scope_Handles;
            },
            pips
        };
        return scope_Self;
    }
    function initialize(target, originalOptions) {
        if (!target || !target.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + target);
        if (target.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
        var options = testOptions(originalOptions);
        var api = scope(target, options, originalOptions);
        target.noUiSlider = api;
        return api;
    }
    function rangeInit() {
        const priceSlider = document.querySelector("#range");
        if (!priceSlider) return;
        const min = Number(priceSlider.dataset.min);
        const max = Number(priceSlider.dataset.max);
        const start = Number(priceSlider.dataset.start);
        const end = Number(priceSlider.dataset.end);
        initialize(priceSlider, {
            start: [ start, end ],
            connect: true,
            range: {
                min,
                max
            },
            tooltips: [ true, true ],
            format: {
                to: value => `${Math.round(value)} грн`,
                from: value => Number(value.replace(" грн", ""))
            }
        });
    }
    rangeInit();
    function ssr_window_esm_isObject(obj) {
        return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
    }
    function extend(target = {}, src = {}) {
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        Object.keys(src).filter(key => noExtend.indexOf(key) < 0).forEach(key => {
            if (typeof target[key] === "undefined") target[key] = src[key]; else if (ssr_window_esm_isObject(src[key]) && ssr_window_esm_isObject(target[key]) && Object.keys(src[key]).length > 0) extend(target[key], src[key]);
        });
    }
    const ssrDocument = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector() {
            return null;
        },
        querySelectorAll() {
            return [];
        },
        getElementById() {
            return null;
        },
        createEvent() {
            return {
                initEvent() {}
            };
        },
        createElement() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute() {},
                getElementsByTagName() {
                    return [];
                }
            };
        },
        createElementNS() {
            return {};
        },
        importNode() {
            return null;
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function ssr_window_esm_getDocument() {
        const doc = typeof document !== "undefined" ? document : {};
        extend(doc, ssrDocument);
        return doc;
    }
    const ssrWindow = {
        document: ssrDocument,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function CustomEvent() {
            return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle() {
            return {
                getPropertyValue() {
                    return "";
                }
            };
        },
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia() {
            return {};
        },
        requestAnimationFrame(callback) {
            if (typeof setTimeout === "undefined") {
                callback();
                return null;
            }
            return setTimeout(callback, 0);
        },
        cancelAnimationFrame(id) {
            if (typeof setTimeout === "undefined") return;
            clearTimeout(id);
        }
    };
    function ssr_window_esm_getWindow() {
        const win = typeof window !== "undefined" ? window : {};
        extend(win, ssrWindow);
        return win;
    }
    function utils_classesToTokens(classes = "") {
        return classes.trim().split(" ").filter(c => !!c.trim());
    }
    function deleteProps(obj) {
        const object = obj;
        Object.keys(object).forEach(key => {
            try {
                object[key] = null;
            } catch (e) {}
            try {
                delete object[key];
            } catch (e) {}
        });
    }
    function utils_nextTick(callback, delay = 0) {
        return setTimeout(callback, delay);
    }
    function utils_now() {
        return Date.now();
    }
    function utils_getComputedStyle(el) {
        const window = ssr_window_esm_getWindow();
        let style;
        if (window.getComputedStyle) style = window.getComputedStyle(el, null);
        if (!style && el.currentStyle) style = el.currentStyle;
        if (!style) style = el.style;
        return style;
    }
    function utils_getTranslate(el, axis = "x") {
        const window = ssr_window_esm_getWindow();
        let matrix;
        let curTransform;
        let transformMatrix;
        const curStyle = utils_getComputedStyle(el);
        if (window.WebKitCSSMatrix) {
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if (curTransform.split(",").length > 6) curTransform = curTransform.split(", ").map(a => a.replace(",", ".")).join(", ");
            transformMatrix = new window.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
        } else {
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
            matrix = transformMatrix.toString().split(",");
        }
        if (axis === "x") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); else curTransform = parseFloat(matrix[4]);
        if (axis === "y") if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); else curTransform = parseFloat(matrix[5]);
        return curTransform || 0;
    }
    function utils_isObject(o) {
        return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
    }
    function isNode(node) {
        if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") return node instanceof HTMLElement;
        return node && (node.nodeType === 1 || node.nodeType === 11);
    }
    function utils_extend(...args) {
        const to = Object(args[0]);
        const noExtend = [ "__proto__", "constructor", "prototype" ];
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
                const keysArray = Object.keys(Object(nextSource)).filter(key => noExtend.indexOf(key) < 0);
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== void 0 && desc.enumerable) if (utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]); else if (!utils_isObject(to[nextKey]) && utils_isObject(nextSource[nextKey])) {
                        to[nextKey] = {};
                        if (nextSource[nextKey].__swiper__) to[nextKey] = nextSource[nextKey]; else utils_extend(to[nextKey], nextSource[nextKey]);
                    } else to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    }
    function utils_setCSSProperty(el, varName, varValue) {
        el.style.setProperty(varName, varValue);
    }
    function animateCSSModeScroll({swiper, targetPosition, side}) {
        const window = ssr_window_esm_getWindow();
        const startPosition = -swiper.translate;
        let startTime = null;
        let time;
        const duration = swiper.params.speed;
        swiper.wrapperEl.style.scrollSnapType = "none";
        window.cancelAnimationFrame(swiper.cssModeFrameID);
        const dir = targetPosition > startPosition ? "next" : "prev";
        const isOutOfBound = (current, target) => dir === "next" && current >= target || dir === "prev" && current <= target;
        const animate = () => {
            time = (new Date).getTime();
            if (startTime === null) startTime = time;
            const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            const easeProgress = .5 - Math.cos(progress * Math.PI) / 2;
            let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
            if (isOutOfBound(currentPosition, targetPosition)) currentPosition = targetPosition;
            swiper.wrapperEl.scrollTo({
                [side]: currentPosition
            });
            if (isOutOfBound(currentPosition, targetPosition)) {
                swiper.wrapperEl.style.overflow = "hidden";
                swiper.wrapperEl.style.scrollSnapType = "";
                setTimeout(() => {
                    swiper.wrapperEl.style.overflow = "";
                    swiper.wrapperEl.scrollTo({
                        [side]: currentPosition
                    });
                });
                window.cancelAnimationFrame(swiper.cssModeFrameID);
                return;
            }
            swiper.cssModeFrameID = window.requestAnimationFrame(animate);
        };
        animate();
    }
    function utils_elementChildren(element, selector = "") {
        const window = ssr_window_esm_getWindow();
        const children = [ ...element.children ];
        if (window.HTMLSlotElement && element instanceof HTMLSlotElement) children.push(...element.assignedElements());
        if (!selector) return children;
        return children.filter(el => el.matches(selector));
    }
    function elementIsChildOfSlot(el, slot) {
        const elementsQueue = [ slot ];
        while (elementsQueue.length > 0) {
            const elementToCheck = elementsQueue.shift();
            if (el === elementToCheck) return true;
            elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
        }
    }
    function elementIsChildOf(el, parent) {
        const window = ssr_window_esm_getWindow();
        let isChild = parent.contains(el);
        if (!isChild && window.HTMLSlotElement && parent instanceof HTMLSlotElement) {
            const children = [ ...parent.assignedElements() ];
            isChild = children.includes(el);
            if (!isChild) isChild = elementIsChildOfSlot(el, parent);
        }
        return isChild;
    }
    function showWarning(text) {
        try {
            console.warn(text);
            return;
        } catch (err) {}
    }
    function utils_createElement(tag, classes = []) {
        const el = document.createElement(tag);
        el.classList.add(...Array.isArray(classes) ? classes : utils_classesToTokens(classes));
        return el;
    }
    function elementPrevAll(el, selector) {
        const prevEls = [];
        while (el.previousElementSibling) {
            const prev = el.previousElementSibling;
            if (selector) {
                if (prev.matches(selector)) prevEls.push(prev);
            } else prevEls.push(prev);
            el = prev;
        }
        return prevEls;
    }
    function elementNextAll(el, selector) {
        const nextEls = [];
        while (el.nextElementSibling) {
            const next = el.nextElementSibling;
            if (selector) {
                if (next.matches(selector)) nextEls.push(next);
            } else nextEls.push(next);
            el = next;
        }
        return nextEls;
    }
    function elementStyle(el, prop) {
        const window = ssr_window_esm_getWindow();
        return window.getComputedStyle(el, null).getPropertyValue(prop);
    }
    function utils_elementIndex(el) {
        let child = el;
        let i;
        if (child) {
            i = 0;
            while ((child = child.previousSibling) !== null) if (child.nodeType === 1) i += 1;
            return i;
        }
        return;
    }
    function utils_elementParents(el, selector) {
        const parents = [];
        let parent = el.parentElement;
        while (parent) {
            if (selector) {
                if (parent.matches(selector)) parents.push(parent);
            } else parents.push(parent);
            parent = parent.parentElement;
        }
        return parents;
    }
    function elementOuterSize(el, size, includeMargins) {
        const window = ssr_window_esm_getWindow();
        if (includeMargins) return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
        return el.offsetWidth;
    }
    function utils_makeElementsArray(el) {
        return (Array.isArray(el) ? el : [ el ]).filter(e => !!e);
    }
    function utils_setInnerHTML(el, html = "") {
        if (typeof trustedTypes !== "undefined") el.innerHTML = trustedTypes.createPolicy("html", {
            createHTML: s => s
        }).createHTML(html); else el.innerHTML = html;
    }
    let support;
    function calcSupport() {
        const window = ssr_window_esm_getWindow();
        const document = ssr_window_esm_getDocument();
        return {
            smoothScroll: document.documentElement && document.documentElement.style && "scrollBehavior" in document.documentElement.style,
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
    }
    function getSupport() {
        if (!support) support = calcSupport();
        return support;
    }
    let deviceCached;
    function calcDevice({userAgent} = {}) {
        const support = getSupport();
        const window = ssr_window_esm_getWindow();
        const platform = window.navigator.platform;
        const ua = userAgent || window.navigator.userAgent;
        const device = {
            ios: false,
            android: false
        };
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        let ipad = ua.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
        const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        const windows = platform === "Win32";
        let macos = platform === "MacIntel";
        const iPadScreens = [ "1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810" ];
        if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
            ipad = ua.match(/(Version)\/([\d.]+)/);
            if (!ipad) ipad = [ 0, 1, "13_0_0" ];
            macos = false;
        }
        if (android && !windows) {
            device.os = "android";
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = "ios";
            device.ios = true;
        }
        return device;
    }
    function getDevice(overrides = {}) {
        if (!deviceCached) deviceCached = calcDevice(overrides);
        return deviceCached;
    }
    let browser;
    function calcBrowser() {
        const window = ssr_window_esm_getWindow();
        const device = getDevice();
        let needPerspectiveFix = false;
        function isSafari() {
            const ua = window.navigator.userAgent.toLowerCase();
            return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
        }
        if (isSafari()) {
            const ua = String(window.navigator.userAgent);
            if (ua.includes("Version/")) {
                const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map(num => Number(num));
                needPerspectiveFix = major < 16 || major === 16 && minor < 2;
            }
        }
        const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent);
        const isSafariBrowser = isSafari();
        const need3dFix = isSafariBrowser || isWebView && device.ios;
        return {
            isSafari: needPerspectiveFix || isSafariBrowser,
            needPerspectiveFix,
            need3dFix,
            isWebView
        };
    }
    function getBrowser() {
        if (!browser) browser = calcBrowser();
        return browser;
    }
    function Resize({swiper, on, emit}) {
        const window = ssr_window_esm_getWindow();
        let observer = null;
        let animationFrame = null;
        const resizeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("beforeResize");
            emit("resize");
        };
        const createObserver = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            observer = new ResizeObserver(entries => {
                animationFrame = window.requestAnimationFrame(() => {
                    const {width, height} = swiper;
                    let newWidth = width;
                    let newHeight = height;
                    entries.forEach(({contentBoxSize, contentRect, target}) => {
                        if (target && target !== swiper.el) return;
                        newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
                        newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
                    });
                    if (newWidth !== width || newHeight !== height) resizeHandler();
                });
            });
            observer.observe(swiper.el);
        };
        const removeObserver = () => {
            if (animationFrame) window.cancelAnimationFrame(animationFrame);
            if (observer && observer.unobserve && swiper.el) {
                observer.unobserve(swiper.el);
                observer = null;
            }
        };
        const orientationChangeHandler = () => {
            if (!swiper || swiper.destroyed || !swiper.initialized) return;
            emit("orientationchange");
        };
        on("init", () => {
            if (swiper.params.resizeObserver && typeof window.ResizeObserver !== "undefined") {
                createObserver();
                return;
            }
            window.addEventListener("resize", resizeHandler);
            window.addEventListener("orientationchange", orientationChangeHandler);
        });
        on("destroy", () => {
            removeObserver();
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", orientationChangeHandler);
        });
    }
    function Observer({swiper, extendParams, on, emit}) {
        const observers = [];
        const window = ssr_window_esm_getWindow();
        const attach = (target, options = {}) => {
            const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            const observer = new ObserverFunc(mutations => {
                if (swiper.__preventObserver__) return;
                if (mutations.length === 1) {
                    emit("observerUpdate", mutations[0]);
                    return;
                }
                const observerUpdate = function observerUpdate() {
                    emit("observerUpdate", mutations[0]);
                };
                if (window.requestAnimationFrame) window.requestAnimationFrame(observerUpdate); else window.setTimeout(observerUpdate, 0);
            });
            observer.observe(target, {
                attributes: typeof options.attributes === "undefined" ? true : options.attributes,
                childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
                characterData: typeof options.characterData === "undefined" ? true : options.characterData
            });
            observers.push(observer);
        };
        const init = () => {
            if (!swiper.params.observer) return;
            if (swiper.params.observeParents) {
                const containerParents = utils_elementParents(swiper.hostEl);
                for (let i = 0; i < containerParents.length; i += 1) attach(containerParents[i]);
            }
            attach(swiper.hostEl, {
                childList: swiper.params.observeSlideChildren
            });
            attach(swiper.wrapperEl, {
                attributes: false
            });
        };
        const destroy = () => {
            observers.forEach(observer => {
                observer.disconnect();
            });
            observers.splice(0, observers.length);
        };
        extendParams({
            observer: false,
            observeParents: false,
            observeSlideChildren: false
        });
        on("init", init);
        on("destroy", destroy);
    }
    var eventsEmitter = {
        on(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            events.split(" ").forEach(event => {
                if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
                self.eventsListeners[event][method](handler);
            });
            return self;
        },
        once(events, handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            function onceHandler(...args) {
                self.off(events, onceHandler);
                if (onceHandler.__emitterProxy) delete onceHandler.__emitterProxy;
                handler.apply(self, args);
            }
            onceHandler.__emitterProxy = handler;
            return self.on(events, onceHandler, priority);
        },
        onAny(handler, priority) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (typeof handler !== "function") return self;
            const method = priority ? "unshift" : "push";
            if (self.eventsAnyListeners.indexOf(handler) < 0) self.eventsAnyListeners[method](handler);
            return self;
        },
        offAny(handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsAnyListeners) return self;
            const index = self.eventsAnyListeners.indexOf(handler);
            if (index >= 0) self.eventsAnyListeners.splice(index, 1);
            return self;
        },
        off(events, handler) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            events.split(" ").forEach(event => {
                if (typeof handler === "undefined") self.eventsListeners[event] = []; else if (self.eventsListeners[event]) self.eventsListeners[event].forEach((eventHandler, index) => {
                    if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) self.eventsListeners[event].splice(index, 1);
                });
            });
            return self;
        },
        emit(...args) {
            const self = this;
            if (!self.eventsListeners || self.destroyed) return self;
            if (!self.eventsListeners) return self;
            let events;
            let data;
            let context;
            if (typeof args[0] === "string" || Array.isArray(args[0])) {
                events = args[0];
                data = args.slice(1, args.length);
                context = self;
            } else {
                events = args[0].events;
                data = args[0].data;
                context = args[0].context || self;
            }
            data.unshift(context);
            const eventsArray = Array.isArray(events) ? events : events.split(" ");
            eventsArray.forEach(event => {
                if (self.eventsAnyListeners && self.eventsAnyListeners.length) self.eventsAnyListeners.forEach(eventHandler => {
                    eventHandler.apply(context, [ event, ...data ]);
                });
                if (self.eventsListeners && self.eventsListeners[event]) self.eventsListeners[event].forEach(eventHandler => {
                    eventHandler.apply(context, data);
                });
            });
            return self;
        }
    };
    function updateSize() {
        const swiper = this;
        let width;
        let height;
        const el = swiper.el;
        if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) width = swiper.params.width; else width = el.clientWidth;
        if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) height = swiper.params.height; else height = el.clientHeight;
        if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) return;
        width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
        height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
        if (Number.isNaN(width)) width = 0;
        if (Number.isNaN(height)) height = 0;
        Object.assign(swiper, {
            width,
            height,
            size: swiper.isHorizontal() ? width : height
        });
    }
    function updateSlides() {
        const swiper = this;
        function getDirectionPropertyValue(node, label) {
            return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
        }
        const params = swiper.params;
        const {wrapperEl, slidesEl, rtlTranslate: rtl, wrongRTL} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
        const slides = utils_elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
        const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
        let snapGrid = [];
        const slidesGrid = [];
        const slidesSizesGrid = [];
        let offsetBefore = params.slidesOffsetBefore;
        if (typeof offsetBefore === "function") offsetBefore = params.slidesOffsetBefore.call(swiper);
        let offsetAfter = params.slidesOffsetAfter;
        if (typeof offsetAfter === "function") offsetAfter = params.slidesOffsetAfter.call(swiper);
        const previousSnapGridLength = swiper.snapGrid.length;
        const previousSlidesGridLength = swiper.slidesGrid.length;
        const swiperSize = swiper.size - offsetBefore - offsetAfter;
        let spaceBetween = params.spaceBetween;
        let slidePosition = -offsetBefore;
        let prevSlideSize = 0;
        let index = 0;
        if (typeof swiperSize === "undefined") return;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        swiper.virtualSize = -spaceBetween - offsetBefore - offsetAfter;
        slides.forEach(slideEl => {
            if (rtl) slideEl.style.marginLeft = ""; else slideEl.style.marginRight = "";
            slideEl.style.marginBottom = "";
            slideEl.style.marginTop = "";
        });
        if (params.centeredSlides && params.cssMode) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
        }
        const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
        if (gridEnabled) swiper.grid.initSlides(slides); else if (swiper.grid) swiper.grid.unsetSlides();
        let slideSize;
        const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter(key => typeof params.breakpoints[key].slidesPerView !== "undefined").length > 0;
        for (let i = 0; i < slidesLength; i += 1) {
            slideSize = 0;
            const slide = slides[i];
            if (slide) {
                if (gridEnabled) swiper.grid.updateSlide(i, slide, slides);
                if (elementStyle(slide, "display") === "none") continue;
            }
            if (isVirtual && params.slidesPerView === "auto") {
                if (params.virtual.slidesPerViewAutoSlideSize) slideSize = params.virtual.slidesPerViewAutoSlideSize;
                if (slideSize && slide) {
                    if (params.roundLengths) slideSize = Math.floor(slideSize);
                    slide.style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
                }
            } else if (params.slidesPerView === "auto") {
                if (shouldResetSlideSize) slide.style[swiper.getDirectionLabel("width")] = ``;
                const slideStyles = getComputedStyle(slide);
                const currentTransform = slide.style.transform;
                const currentWebKitTransform = slide.style.webkitTransform;
                if (currentTransform) slide.style.transform = "none";
                if (currentWebKitTransform) slide.style.webkitTransform = "none";
                if (params.roundLengths) slideSize = swiper.isHorizontal() ? elementOuterSize(slide, "width", true) : elementOuterSize(slide, "height", true); else {
                    const width = getDirectionPropertyValue(slideStyles, "width");
                    const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
                    const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
                    const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
                    const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
                    const boxSizing = slideStyles.getPropertyValue("box-sizing");
                    if (boxSizing && boxSizing === "border-box") slideSize = width + marginLeft + marginRight; else {
                        const {clientWidth, offsetWidth} = slide;
                        slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
                    }
                }
                if (currentTransform) slide.style.transform = currentTransform;
                if (currentWebKitTransform) slide.style.webkitTransform = currentWebKitTransform;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
            } else {
                slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
                if (params.roundLengths) slideSize = Math.floor(slideSize);
                if (slide) slide.style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
            }
            if (slide) slide.swiperSlideSize = slideSize;
            slidesSizesGrid.push(slideSize);
            if (params.centeredSlides) {
                slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
                if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
            } else {
                if (params.roundLengths) slidePosition = Math.floor(slidePosition);
                if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
                slidesGrid.push(slidePosition);
                slidePosition = slidePosition + slideSize + spaceBetween;
            }
            swiper.virtualSize += slideSize + spaceBetween;
            prevSlideSize = slideSize;
            index += 1;
        }
        swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
        if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
        if (params.setWrapperSize) wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
        if (gridEnabled) swiper.grid.updateWrapperSize(slideSize, snapGrid);
        if (!params.centeredSlides) {
            const newSlidesGrid = [];
            for (let i = 0; i < snapGrid.length; i += 1) {
                let slidesGridItem = snapGrid[i];
                if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
                if (snapGrid[i] <= swiper.virtualSize - swiperSize) newSlidesGrid.push(slidesGridItem);
            }
            snapGrid = newSlidesGrid;
            if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) snapGrid.push(swiper.virtualSize - swiperSize);
        }
        if (isVirtual && params.loop) {
            const size = slidesSizesGrid[0] + spaceBetween;
            if (params.slidesPerGroup > 1) {
                const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
                const groupSize = size * params.slidesPerGroup;
                for (let i = 0; i < groups; i += 1) snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
            }
            for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
                if (params.slidesPerGroup === 1) snapGrid.push(snapGrid[snapGrid.length - 1] + size);
                slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
                swiper.virtualSize += size;
            }
        }
        if (snapGrid.length === 0) snapGrid = [ 0 ];
        if (spaceBetween !== 0) {
            const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
            slides.filter((_, slideIndex) => {
                if (!params.cssMode || params.loop) return true;
                if (slideIndex === slides.length - 1) return false;
                return true;
            }).forEach(slideEl => {
                slideEl.style[key] = `${spaceBetween}px`;
            });
        }
        if (params.centeredSlides && params.centeredSlidesBounds) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach(slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            });
            allSlidesSize -= spaceBetween;
            const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
            snapGrid = snapGrid.map(snap => {
                if (snap <= 0) return -offsetBefore;
                if (snap > maxSnap) return maxSnap + offsetAfter;
                return snap;
            });
        }
        if (params.centerInsufficientSlides) {
            let allSlidesSize = 0;
            slidesSizesGrid.forEach(slideSizeValue => {
                allSlidesSize += slideSizeValue + (spaceBetween || 0);
            });
            allSlidesSize -= spaceBetween;
            const offsetSize = (offsetBefore || 0) + (offsetAfter || 0);
            if (allSlidesSize + offsetSize < swiperSize) {
                const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
                snapGrid.forEach((snap, snapIndex) => {
                    snapGrid[snapIndex] = snap - allSlidesOffset;
                });
                slidesGrid.forEach((snap, snapIndex) => {
                    slidesGrid[snapIndex] = snap + allSlidesOffset;
                });
            }
        }
        Object.assign(swiper, {
            slides,
            snapGrid,
            slidesGrid,
            slidesSizesGrid
        });
        if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
            utils_setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
            const addToSnapGrid = -swiper.snapGrid[0];
            const addToSlidesGrid = -swiper.slidesGrid[0];
            swiper.snapGrid = swiper.snapGrid.map(v => v + addToSnapGrid);
            swiper.slidesGrid = swiper.slidesGrid.map(v => v + addToSlidesGrid);
        }
        if (slidesLength !== previousSlidesLength) swiper.emit("slidesLengthChange");
        if (snapGrid.length !== previousSnapGridLength) {
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            swiper.emit("snapGridLengthChange");
        }
        if (slidesGrid.length !== previousSlidesGridLength) swiper.emit("slidesGridLengthChange");
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        swiper.emit("slidesUpdated");
        if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
            const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
            const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
            if (slidesLength <= params.maxBackfaceHiddenSlides) {
                if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
            } else if (hasClassBackfaceClassAdded) swiper.el.classList.remove(backFaceHiddenClass);
        }
    }
    function updateAutoHeight(speed) {
        const swiper = this;
        const activeSlides = [];
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let newHeight = 0;
        let i;
        if (typeof speed === "number") swiper.setTransition(speed); else if (speed === true) swiper.setTransition(swiper.params.speed);
        const getSlideByIndex = index => {
            if (isVirtual) return swiper.slides[swiper.getSlideIndexByData(index)];
            return swiper.slides[index];
        };
        if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) if (swiper.params.centeredSlides) (swiper.visibleSlides || []).forEach(slide => {
            activeSlides.push(slide);
        }); else for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
            const index = swiper.activeIndex + i;
            if (index > swiper.slides.length && !isVirtual) break;
            activeSlides.push(getSlideByIndex(index));
        } else activeSlides.push(getSlideByIndex(swiper.activeIndex));
        for (i = 0; i < activeSlides.length; i += 1) if (typeof activeSlides[i] !== "undefined") {
            const height = activeSlides[i].offsetHeight;
            newHeight = height > newHeight ? height : newHeight;
        }
        if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
    }
    function updateSlidesOffset() {
        const swiper = this;
        const slides = swiper.slides;
        const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
        for (let i = 0; i < slides.length; i += 1) slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
    }
    const toggleSlideClasses$1 = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
    };
    function updateSlidesProgress(translate = this && this.translate || 0) {
        const swiper = this;
        const params = swiper.params;
        const {slides, rtlTranslate: rtl, snapGrid} = swiper;
        if (slides.length === 0) return;
        if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
        let offsetCenter = -translate;
        if (rtl) offsetCenter = translate;
        swiper.visibleSlidesIndexes = [];
        swiper.visibleSlides = [];
        let spaceBetween = params.spaceBetween;
        if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size; else if (typeof spaceBetween === "string") spaceBetween = parseFloat(spaceBetween);
        for (let i = 0; i < slides.length; i += 1) {
            const slide = slides[i];
            let slideOffset = slide.swiperSlideOffset;
            if (params.cssMode && params.centeredSlides) slideOffset -= slides[0].swiperSlideOffset;
            const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide.swiperSlideSize + spaceBetween);
            const slideBefore = -(offsetCenter - slideOffset);
            const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
            const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
            const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
            if (isVisible) {
                swiper.visibleSlides.push(slide);
                swiper.visibleSlidesIndexes.push(i);
            }
            toggleSlideClasses$1(slide, isVisible, params.slideVisibleClass);
            toggleSlideClasses$1(slide, isFullyVisible, params.slideFullyVisibleClass);
            slide.progress = rtl ? -slideProgress : slideProgress;
            slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
        }
    }
    function updateProgress(translate) {
        const swiper = this;
        if (typeof translate === "undefined") {
            const multiplier = swiper.rtlTranslate ? -1 : 1;
            translate = swiper && swiper.translate && swiper.translate * multiplier || 0;
        }
        const params = swiper.params;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        let {progress, isBeginning, isEnd, progressLoop} = swiper;
        const wasBeginning = isBeginning;
        const wasEnd = isEnd;
        if (translatesDiff === 0) {
            progress = 0;
            isBeginning = true;
            isEnd = true;
        } else {
            progress = (translate - swiper.minTranslate()) / translatesDiff;
            const isBeginningRounded = Math.abs(translate - swiper.minTranslate()) < 1;
            const isEndRounded = Math.abs(translate - swiper.maxTranslate()) < 1;
            isBeginning = isBeginningRounded || progress <= 0;
            isEnd = isEndRounded || progress >= 1;
            if (isBeginningRounded) progress = 0;
            if (isEndRounded) progress = 1;
        }
        if (params.loop) {
            const firstSlideIndex = swiper.getSlideIndexByData(0);
            const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
            const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
            const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
            const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
            const translateAbs = Math.abs(translate);
            if (translateAbs >= firstSlideTranslate) progressLoop = (translateAbs - firstSlideTranslate) / translateMax; else progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
            if (progressLoop > 1) progressLoop -= 1;
        }
        Object.assign(swiper, {
            progress,
            progressLoop,
            isBeginning,
            isEnd
        });
        if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate);
        if (isBeginning && !wasBeginning) swiper.emit("reachBeginning toEdge");
        if (isEnd && !wasEnd) swiper.emit("reachEnd toEdge");
        if (wasBeginning && !isBeginning || wasEnd && !isEnd) swiper.emit("fromEdge");
        swiper.emit("progress", progress);
    }
    const toggleSlideClasses = (slideEl, condition, className) => {
        if (condition && !slideEl.classList.contains(className)) slideEl.classList.add(className); else if (!condition && slideEl.classList.contains(className)) slideEl.classList.remove(className);
    };
    function updateSlidesClasses() {
        const swiper = this;
        const {slides, params, slidesEl, activeIndex} = swiper;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        const getFilteredSlide = selector => utils_elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
        let activeSlide;
        let prevSlide;
        let nextSlide;
        if (isVirtual) if (params.loop) {
            let slideIndex = activeIndex - swiper.virtual.slidesBefore;
            if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
            if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
            activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
        } else activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`); else if (gridEnabled) {
            activeSlide = slides.find(slideEl => slideEl.column === activeIndex);
            nextSlide = slides.find(slideEl => slideEl.column === activeIndex + 1);
            prevSlide = slides.find(slideEl => slideEl.column === activeIndex - 1);
        } else activeSlide = slides[activeIndex];
        if (activeSlide) if (!gridEnabled) {
            nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !nextSlide) nextSlide = slides[0];
            prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
            if (params.loop && !prevSlide === 0) prevSlide = slides[slides.length - 1];
        }
        slides.forEach(slideEl => {
            toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
            toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
            toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
        });
        swiper.emitSlidesClasses();
    }
    const processLazyPreloader = (swiper, imageEl) => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
        const slideEl = imageEl.closest(slideSelector());
        if (slideEl) {
            let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (!lazyEl && swiper.isElement) if (slideEl.shadowRoot) lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`); else requestAnimationFrame(() => {
                if (slideEl.shadowRoot) {
                    lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
                    if (lazyEl) lazyEl.remove();
                }
            });
            if (lazyEl) lazyEl.remove();
        }
    };
    const unlazy = (swiper, index) => {
        if (!swiper.slides[index]) return;
        const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
        if (imageEl) imageEl.removeAttribute("loading");
    };
    const preload = swiper => {
        if (!swiper || swiper.destroyed || !swiper.params) return;
        let amount = swiper.params.lazyPreloadPrevNext;
        const len = swiper.slides.length;
        if (!len || !amount || amount < 0) return;
        amount = Math.min(amount, len);
        const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
        const activeIndex = swiper.activeIndex;
        if (swiper.params.grid && swiper.params.grid.rows > 1) {
            const activeColumn = activeIndex;
            const preloadColumns = [ activeColumn - amount ];
            preloadColumns.push(...Array.from({
                length: amount
            }).map((_, i) => activeColumn + slidesPerView + i));
            swiper.slides.forEach((slideEl, i) => {
                if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
            });
            return;
        }
        const slideIndexLastInView = activeIndex + slidesPerView - 1;
        if (swiper.params.rewind || swiper.params.loop) for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
            const realIndex = (i % len + len) % len;
            if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
        } else for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) unlazy(swiper, i);
    };
    function getActiveIndexByTranslate(swiper) {
        const {slidesGrid, params} = swiper;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        let activeIndex;
        for (let i = 0; i < slidesGrid.length; i += 1) if (typeof slidesGrid[i + 1] !== "undefined") {
            if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) activeIndex = i; else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) activeIndex = i + 1;
        } else if (translate >= slidesGrid[i]) activeIndex = i;
        if (params.normalizeSlideIndex) if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
        return activeIndex;
    }
    function updateActiveIndex(newActiveIndex) {
        const swiper = this;
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        const {snapGrid, params, activeIndex: previousIndex, realIndex: previousRealIndex, snapIndex: previousSnapIndex} = swiper;
        let activeIndex = newActiveIndex;
        let snapIndex;
        const getVirtualRealIndex = aIndex => {
            let realIndex = aIndex - swiper.virtual.slidesBefore;
            if (realIndex < 0) realIndex = swiper.virtual.slides.length + realIndex;
            if (realIndex >= swiper.virtual.slides.length) realIndex -= swiper.virtual.slides.length;
            return realIndex;
        };
        if (typeof activeIndex === "undefined") activeIndex = getActiveIndexByTranslate(swiper);
        if (snapGrid.indexOf(translate) >= 0) snapIndex = snapGrid.indexOf(translate); else {
            const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
            snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
        }
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        if (activeIndex === previousIndex && !swiper.params.loop) {
            if (snapIndex !== previousSnapIndex) {
                swiper.snapIndex = snapIndex;
                swiper.emit("snapIndexChange");
            }
            return;
        }
        if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
            swiper.realIndex = getVirtualRealIndex(activeIndex);
            return;
        }
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        let realIndex;
        if (swiper.virtual && params.virtual.enabled && params.loop) realIndex = getVirtualRealIndex(activeIndex); else if (gridEnabled) {
            const firstSlideInColumn = swiper.slides.find(slideEl => slideEl.column === activeIndex);
            let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
            if (Number.isNaN(activeSlideIndex)) activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
            realIndex = Math.floor(activeSlideIndex / params.grid.rows);
        } else if (swiper.slides[activeIndex]) {
            const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
            if (slideIndex) realIndex = parseInt(slideIndex, 10); else realIndex = activeIndex;
        } else realIndex = activeIndex;
        Object.assign(swiper, {
            previousSnapIndex,
            snapIndex,
            previousRealIndex,
            realIndex,
            previousIndex,
            activeIndex
        });
        if (swiper.initialized) preload(swiper);
        swiper.emit("activeIndexChange");
        swiper.emit("snapIndexChange");
        if (swiper.initialized || swiper.params.runCallbacksOnInit) {
            if (previousRealIndex !== realIndex) swiper.emit("realIndexChange");
            swiper.emit("slideChange");
        }
    }
    function updateClickedSlide(el, path) {
        const swiper = this;
        const params = swiper.params;
        let slide = el.closest(`.${params.slideClass}, swiper-slide`);
        if (!slide && swiper.isElement && path && path.length > 1 && path.includes(el)) [ ...path.slice(path.indexOf(el) + 1, path.length) ].forEach(pathEl => {
            if (!slide && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) slide = pathEl;
        });
        let slideFound = false;
        let slideIndex;
        if (slide) for (let i = 0; i < swiper.slides.length; i += 1) if (swiper.slides[i] === slide) {
            slideFound = true;
            slideIndex = i;
            break;
        }
        if (slide && slideFound) {
            swiper.clickedSlide = slide;
            if (swiper.virtual && swiper.params.virtual.enabled) swiper.clickedIndex = parseInt(slide.getAttribute("data-swiper-slide-index"), 10); else swiper.clickedIndex = slideIndex;
        } else {
            swiper.clickedSlide = void 0;
            swiper.clickedIndex = void 0;
            return;
        }
        if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) swiper.slideToClickedSlide();
    }
    var update = {
        updateSize,
        updateSlides,
        updateAutoHeight,
        updateSlidesOffset,
        updateSlidesProgress,
        updateProgress,
        updateSlidesClasses,
        updateActiveIndex,
        updateClickedSlide
    };
    function getSwiperTranslate(axis = (this.isHorizontal() ? "x" : "y")) {
        const swiper = this;
        const {params, rtlTranslate: rtl, translate, wrapperEl} = swiper;
        if (params.virtualTranslate) return rtl ? -translate : translate;
        if (params.cssMode) return translate;
        let currentTranslate = utils_getTranslate(wrapperEl, axis);
        currentTranslate += swiper.cssOverflowAdjustment();
        if (rtl) currentTranslate = -currentTranslate;
        return currentTranslate || 0;
    }
    function setTranslate(translate, byController) {
        const swiper = this;
        const {rtlTranslate: rtl, params, wrapperEl, progress} = swiper;
        let x = 0;
        let y = 0;
        const z = 0;
        if (swiper.isHorizontal()) x = rtl ? -translate : translate; else y = translate;
        if (params.roundLengths) {
            x = Math.floor(x);
            y = Math.floor(y);
        }
        swiper.previousTranslate = swiper.translate;
        swiper.translate = swiper.isHorizontal() ? x : y;
        if (params.cssMode) wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y; else if (!params.virtualTranslate) {
            if (swiper.isHorizontal()) x -= swiper.cssOverflowAdjustment(); else y -= swiper.cssOverflowAdjustment();
            wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
        }
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== progress) swiper.updateProgress(translate);
        swiper.emit("setTranslate", swiper.translate, byController);
    }
    function minTranslate() {
        return -this.snapGrid[0];
    }
    function maxTranslate() {
        return -this.snapGrid[this.snapGrid.length - 1];
    }
    function translateTo(translate = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
        const swiper = this;
        const {params, wrapperEl} = swiper;
        if (swiper.animating && params.preventInteractionOnTransition) return false;
        const minTranslate = swiper.minTranslate();
        const maxTranslate = swiper.maxTranslate();
        let newTranslate;
        if (translateBounds && translate > minTranslate) newTranslate = minTranslate; else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate; else newTranslate = translate;
        swiper.updateProgress(newTranslate);
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            if (speed === 0) wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate; else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: -newTranslate,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: -newTranslate,
                    behavior: "smooth"
                });
            }
            return true;
        }
        if (speed === 0) {
            swiper.setTransition(0);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionEnd");
            }
        } else {
            swiper.setTransition(speed);
            swiper.setTranslate(newTranslate);
            if (runCallbacks) {
                swiper.emit("beforeTransitionStart", speed, internal);
                swiper.emit("transitionStart");
            }
            if (!swiper.animating) {
                swiper.animating = true;
                if (!swiper.onTranslateToWrapperTransitionEnd) swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
                    if (!swiper || swiper.destroyed) return;
                    if (e.target !== this) return;
                    swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
                    swiper.onTranslateToWrapperTransitionEnd = null;
                    delete swiper.onTranslateToWrapperTransitionEnd;
                    swiper.animating = false;
                    if (runCallbacks) swiper.emit("transitionEnd");
                };
                swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
            }
        }
        return true;
    }
    var translate = {
        getTranslate: getSwiperTranslate,
        setTranslate,
        minTranslate,
        maxTranslate,
        translateTo
    };
    function setTransition(duration, byController) {
        const swiper = this;
        if (!swiper.params.cssMode) {
            swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
            swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
        }
        swiper.emit("setTransition", duration, byController);
    }
    function transitionEmit({swiper, runCallbacks, direction, step}) {
        const {activeIndex, previousIndex} = swiper;
        let dir = direction;
        if (!dir) if (activeIndex > previousIndex) dir = "next"; else if (activeIndex < previousIndex) dir = "prev"; else dir = "reset";
        swiper.emit(`transition${step}`);
        if (runCallbacks && dir === "reset") swiper.emit(`slideResetTransition${step}`); else if (runCallbacks && activeIndex !== previousIndex) {
            swiper.emit(`slideChangeTransition${step}`);
            if (dir === "next") swiper.emit(`slideNextTransition${step}`); else swiper.emit(`slidePrevTransition${step}`);
        }
    }
    function transitionStart(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        if (params.cssMode) return;
        if (params.autoHeight) swiper.updateAutoHeight();
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "Start"
        });
    }
    function transitionEnd(runCallbacks = true, direction) {
        const swiper = this;
        const {params} = swiper;
        swiper.animating = false;
        if (params.cssMode) return;
        swiper.setTransition(0);
        transitionEmit({
            swiper,
            runCallbacks,
            direction,
            step: "End"
        });
    }
    var transition = {
        setTransition,
        transitionStart,
        transitionEnd
    };
    function slideTo(index = 0, speed, runCallbacks = true, internal, initial) {
        if (typeof index === "string") index = parseInt(index, 10);
        const swiper = this;
        let slideIndex = index;
        if (slideIndex < 0) slideIndex = 0;
        const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;
        if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) return false;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
        let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
        if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
        const translate = -snapGrid[snapIndex];
        if (params.normalizeSlideIndex) for (let i = 0; i < slidesGrid.length; i += 1) {
            const normalizedTranslate = -Math.floor(translate * 100);
            const normalizedGrid = Math.floor(slidesGrid[i] * 100);
            const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
            if (typeof slidesGrid[i + 1] !== "undefined") {
                if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) slideIndex = i; else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) slideIndex = i + 1;
            } else if (normalizedTranslate >= normalizedGrid) slideIndex = i;
        }
        if (swiper.initialized && slideIndex !== activeIndex) {
            if (!swiper.allowSlideNext && (rtl ? translate > swiper.translate && translate > swiper.minTranslate() : translate < swiper.translate && translate < swiper.minTranslate())) return false;
            if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) if ((activeIndex || 0) !== slideIndex) return false;
        }
        if (slideIndex !== (previousIndex || 0) && runCallbacks) swiper.emit("beforeSlideChangeStart");
        swiper.updateProgress(translate);
        let direction;
        if (slideIndex > activeIndex) direction = "next"; else if (slideIndex < activeIndex) direction = "prev"; else direction = "reset";
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        const isInitialVirtual = isVirtual && initial;
        if (!isInitialVirtual && (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate)) {
            swiper.updateActiveIndex(slideIndex);
            if (params.autoHeight) swiper.updateAutoHeight();
            swiper.updateSlidesClasses();
            if (params.effect !== "slide") swiper.setTranslate(translate);
            if (direction !== "reset") {
                swiper.transitionStart(runCallbacks, direction);
                swiper.transitionEnd(runCallbacks, direction);
            }
            return false;
        }
        if (params.cssMode) {
            const isH = swiper.isHorizontal();
            const t = rtl ? translate : -translate;
            if (speed === 0) {
                if (isVirtual) {
                    swiper.wrapperEl.style.scrollSnapType = "none";
                    swiper._immediateVirtual = true;
                }
                if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
                    swiper._cssModeVirtualInitialSet = true;
                    requestAnimationFrame(() => {
                        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                    });
                } else wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
                if (isVirtual) requestAnimationFrame(() => {
                    swiper.wrapperEl.style.scrollSnapType = "";
                    swiper._immediateVirtual = false;
                });
            } else {
                if (!swiper.support.smoothScroll) {
                    animateCSSModeScroll({
                        swiper,
                        targetPosition: t,
                        side: isH ? "left" : "top"
                    });
                    return true;
                }
                wrapperEl.scrollTo({
                    [isH ? "left" : "top"]: t,
                    behavior: "smooth"
                });
            }
            return true;
        }
        const browser = getBrowser();
        const isSafari = browser.isSafari;
        if (isVirtual && !initial && isSafari && swiper.isElement) swiper.virtual.update(false, false, slideIndex);
        swiper.setTransition(speed);
        swiper.setTranslate(translate);
        swiper.updateActiveIndex(slideIndex);
        swiper.updateSlidesClasses();
        swiper.emit("beforeTransitionStart", speed, internal);
        swiper.transitionStart(runCallbacks, direction);
        if (speed === 0) swiper.transitionEnd(runCallbacks, direction); else if (!swiper.animating) {
            swiper.animating = true;
            if (!swiper.onSlideToWrapperTransitionEnd) swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
                if (!swiper || swiper.destroyed) return;
                if (e.target !== this) return;
                swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
                swiper.onSlideToWrapperTransitionEnd = null;
                delete swiper.onSlideToWrapperTransitionEnd;
                swiper.transitionEnd(runCallbacks, direction);
            };
            swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        }
        return true;
    }
    function slideToLoop(index = 0, speed, runCallbacks = true, internal) {
        if (typeof index === "string") {
            const indexAsNumber = parseInt(index, 10);
            index = indexAsNumber;
        }
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
        let newIndex = index;
        if (swiper.params.loop) if (swiper.virtual && swiper.params.virtual.enabled) newIndex += swiper.virtual.slidesBefore; else {
            let targetSlideIndex;
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                targetSlideIndex = swiper.slides.find(slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
            } else targetSlideIndex = swiper.getSlideIndexByData(newIndex);
            const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
            const {centeredSlides, slidesOffsetBefore, slidesOffsetAfter} = swiper.params;
            const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
            let slidesPerView = swiper.params.slidesPerView;
            if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
                slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
                if (bothDirections && slidesPerView % 2 === 0) slidesPerView += 1;
            }
            let needLoopFix = cols - targetSlideIndex < slidesPerView;
            if (bothDirections) needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
            if (internal && bothDirections && swiper.params.slidesPerView !== "auto" && !gridEnabled) needLoopFix = false;
            if (needLoopFix) {
                const direction = bothDirections ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
                swiper.loopFix({
                    direction,
                    slideTo: true,
                    activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
                    slideRealIndex: direction === "next" ? swiper.realIndex : void 0
                });
            }
            if (gridEnabled) {
                const slideIndex = newIndex * swiper.params.grid.rows;
                newIndex = swiper.slides.find(slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
            } else newIndex = swiper.getSlideIndexByData(newIndex);
        }
        requestAnimationFrame(() => {
            swiper.slideTo(newIndex, speed, runCallbacks, internal);
        });
        return swiper;
    }
    function slideNext(speed, runCallbacks = true, internal) {
        const swiper = this;
        const {enabled, params, animating} = swiper;
        if (!enabled || swiper.destroyed) return swiper;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        let perGroup = params.slidesPerGroup;
        if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
        const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "next"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
            if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
                requestAnimationFrame(() => {
                    swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
                });
                return true;
            }
        }
        if (params.rewind && swiper.isEnd) return swiper.slideTo(0, speed, runCallbacks, internal);
        return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
    }
    function slidePrev(speed, runCallbacks = true, internal) {
        const swiper = this;
        const {params, snapGrid, slidesGrid, rtlTranslate, enabled, animating} = swiper;
        if (!enabled || swiper.destroyed) return swiper;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        const isVirtual = swiper.virtual && params.virtual.enabled;
        if (params.loop) {
            if (animating && !isVirtual && params.loopPreventsSliding) return false;
            swiper.loopFix({
                direction: "prev"
            });
            swiper._clientLeft = swiper.wrapperEl.clientLeft;
        }
        const translate = rtlTranslate ? swiper.translate : -swiper.translate;
        function normalize(val) {
            if (val < 0) return -Math.floor(Math.abs(val));
            return Math.floor(val);
        }
        const normalizedTranslate = normalize(translate);
        const normalizedSnapGrid = snapGrid.map(val => normalize(val));
        const isFreeMode = params.freeMode && params.freeMode.enabled;
        let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
        if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
            let prevSnapIndex;
            snapGrid.forEach((snap, snapIndex) => {
                if (normalizedTranslate >= snap) prevSnapIndex = snapIndex;
            });
            if (typeof prevSnapIndex !== "undefined") prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
        }
        let prevIndex = 0;
        if (typeof prevSnap !== "undefined") {
            prevIndex = slidesGrid.indexOf(prevSnap);
            if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
            if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
                prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
                prevIndex = Math.max(prevIndex, 0);
            }
        }
        if (params.rewind && swiper.isBeginning) {
            const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
            return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
        } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
            requestAnimationFrame(() => {
                swiper.slideTo(prevIndex, speed, runCallbacks, internal);
            });
            return true;
        }
        return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    }
    function slideReset(speed, runCallbacks = true, internal) {
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
    }
    function slideToClosest(speed, runCallbacks = true, internal, threshold = .5) {
        const swiper = this;
        if (swiper.destroyed) return;
        if (typeof speed === "undefined") speed = swiper.params.speed;
        let index = swiper.activeIndex;
        const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
        const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
        const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
        if (translate >= swiper.snapGrid[snapIndex]) {
            const currentSnap = swiper.snapGrid[snapIndex];
            const nextSnap = swiper.snapGrid[snapIndex + 1];
            if (translate - currentSnap > (nextSnap - currentSnap) * threshold) index += swiper.params.slidesPerGroup;
        } else {
            const prevSnap = swiper.snapGrid[snapIndex - 1];
            const currentSnap = swiper.snapGrid[snapIndex];
            if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) index -= swiper.params.slidesPerGroup;
        }
        index = Math.max(index, 0);
        index = Math.min(index, swiper.slidesGrid.length - 1);
        return swiper.slideTo(index, speed, runCallbacks, internal);
    }
    function slideToClickedSlide() {
        const swiper = this;
        if (swiper.destroyed) return;
        const {params, slidesEl} = swiper;
        const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
        let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
        let realIndex;
        const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
        const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
        if (params.loop) {
            if (swiper.animating) return;
            realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
            if (params.centeredSlides) swiper.slideToLoop(realIndex); else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
                swiper.loopFix();
                slideToIndex = swiper.getSlideIndex(utils_elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
                utils_nextTick(() => {
                    swiper.slideTo(slideToIndex);
                });
            } else swiper.slideTo(slideToIndex);
        } else swiper.slideTo(slideToIndex);
    }
    var slide = {
        slideTo,
        slideToLoop,
        slideNext,
        slidePrev,
        slideReset,
        slideToClosest,
        slideToClickedSlide
    };
    function loopCreate(slideRealIndex, initial) {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
        const initSlides = () => {
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            slides.forEach((el, index) => {
                el.setAttribute("data-swiper-slide-index", index);
            });
        };
        const clearBlankSlides = () => {
            const slides = utils_elementChildren(slidesEl, `.${params.slideBlankClass}`);
            slides.forEach(el => {
                el.remove();
            });
            if (slides.length > 0) {
                swiper.recalcSlides();
                swiper.updateSlides();
            }
        };
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) clearBlankSlides();
        const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
        const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
        const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
        const addBlankSlides = amountOfSlides => {
            for (let i = 0; i < amountOfSlides; i += 1) {
                const slideEl = swiper.isElement ? utils_createElement("swiper-slide", [ params.slideBlankClass ]) : utils_createElement("div", [ params.slideClass, params.slideBlankClass ]);
                swiper.slidesEl.append(slideEl);
            }
        };
        if (shouldFillGroup) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else if (shouldFillGrid) {
            if (params.loopAddBlankSlides) {
                const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
                addBlankSlides(slidesToAdd);
                swiper.recalcSlides();
                swiper.updateSlides();
            } else showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
            initSlides();
        } else initSlides();
        const bothDirections = params.centeredSlides || !!params.slidesOffsetBefore || !!params.slidesOffsetAfter;
        swiper.loopFix({
            slideRealIndex,
            direction: bothDirections ? void 0 : "next",
            initial
        });
    }
    function loopFix({slideRealIndex, slideTo = true, direction, setTranslate, activeSlideIndex, initial, byController, byMousewheel} = {}) {
        const swiper = this;
        if (!swiper.params.loop) return;
        swiper.emit("beforeLoopFix");
        const {slides, allowSlidePrev, allowSlideNext, slidesEl, params} = swiper;
        const {centeredSlides, slidesOffsetBefore, slidesOffsetAfter, initialSlide} = params;
        const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
        swiper.allowSlidePrev = true;
        swiper.allowSlideNext = true;
        if (swiper.virtual && params.virtual.enabled) {
            if (slideTo) if (!bothDirections && swiper.snapIndex === 0) swiper.slideTo(swiper.virtual.slides.length, 0, false, true); else if (bothDirections && swiper.snapIndex < params.slidesPerView) swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true); else if (swiper.snapIndex === swiper.snapGrid.length - 1) swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
            swiper.allowSlidePrev = allowSlidePrev;
            swiper.allowSlideNext = allowSlideNext;
            swiper.emit("loopFix");
            return;
        }
        let slidesPerView = params.slidesPerView;
        if (slidesPerView === "auto") slidesPerView = swiper.slidesPerViewDynamic(); else {
            slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
            if (bothDirections && slidesPerView % 2 === 0) slidesPerView += 1;
        }
        const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
        let loopedSlides = bothDirections ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
        if (loopedSlides % slidesPerGroup !== 0) loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
        loopedSlides += params.loopAdditionalSlides;
        swiper.loopedSlides = loopedSlides;
        const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
        if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"); else if (gridEnabled && params.grid.fill === "row") showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
        const prependSlidesIndexes = [];
        const appendSlidesIndexes = [];
        const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
        const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !bothDirections;
        let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
        if (typeof activeSlideIndex === "undefined") activeSlideIndex = swiper.getSlideIndex(slides.find(el => el.classList.contains(params.slideActiveClass))); else activeIndex = activeSlideIndex;
        const isNext = direction === "next" || !direction;
        const isPrev = direction === "prev" || !direction;
        let slidesPrepended = 0;
        let slidesAppended = 0;
        const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
        const activeColIndexWithShift = activeColIndex + (bothDirections && typeof setTranslate === "undefined" ? -slidesPerView / 2 + .5 : 0);
        if (activeColIndexWithShift < loopedSlides) {
            slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
            for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) {
                    const colIndexToPrepend = cols - index - 1;
                    for (let i = slides.length - 1; i >= 0; i -= 1) if (slides[i].column === colIndexToPrepend) prependSlidesIndexes.push(i);
                } else prependSlidesIndexes.push(cols - index - 1);
            }
        } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
            slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
            if (isInitialOverflow) slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
            for (let i = 0; i < slidesAppended; i += 1) {
                const index = i - Math.floor(i / cols) * cols;
                if (gridEnabled) slides.forEach((slide, slideIndex) => {
                    if (slide.column === index) appendSlidesIndexes.push(slideIndex);
                }); else appendSlidesIndexes.push(index);
            }
        }
        swiper.__preventObserver__ = true;
        requestAnimationFrame(() => {
            swiper.__preventObserver__ = false;
        });
        if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
            if (appendSlidesIndexes.includes(activeSlideIndex)) appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
            if (prependSlidesIndexes.includes(activeSlideIndex)) prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
        }
        if (isPrev) prependSlidesIndexes.forEach(index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.prepend(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        });
        if (isNext) appendSlidesIndexes.forEach(index => {
            slides[index].swiperLoopMoveDOM = true;
            slidesEl.append(slides[index]);
            slides[index].swiperLoopMoveDOM = false;
        });
        swiper.recalcSlides();
        if (params.slidesPerView === "auto") swiper.updateSlides(); else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) swiper.slides.forEach((slide, slideIndex) => {
            swiper.grid.updateSlide(slideIndex, slide, swiper.slides);
        });
        if (params.watchSlidesProgress) swiper.updateSlidesOffset();
        if (slideTo) if (prependSlidesIndexes.length > 0 && isPrev) {
            if (typeof slideRealIndex === "undefined") {
                const currentSlideTranslate = swiper.slidesGrid[activeIndex];
                const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
                const diff = newSlideTranslate - currentSlideTranslate;
                if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                    swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
                    if (setTranslate) {
                        swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                        swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                    }
                }
            } else if (setTranslate) {
                const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
                swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
                swiper.touchEventsData.currentTranslate = swiper.translate;
            }
        } else if (appendSlidesIndexes.length > 0 && isNext) if (typeof slideRealIndex === "undefined") {
            const currentSlideTranslate = swiper.slidesGrid[activeIndex];
            const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
            const diff = newSlideTranslate - currentSlideTranslate;
            if (byMousewheel) swiper.setTranslate(swiper.translate - diff); else {
                swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
                if (setTranslate) {
                    swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
                    swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
                }
            }
        } else {
            const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
            swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.controller && swiper.controller.control && !byController) {
            const loopParams = {
                slideRealIndex,
                direction,
                setTranslate,
                activeSlideIndex,
                byController: true
            };
            if (Array.isArray(swiper.controller.control)) swiper.controller.control.forEach(c => {
                if (!c.destroyed && c.params.loop) c.loopFix({
                    ...loopParams,
                    slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo : false
                });
            }); else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) swiper.controller.control.loopFix({
                ...loopParams,
                slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo : false
            });
        }
        swiper.emit("loopFix");
    }
    function loopDestroy() {
        const swiper = this;
        const {params, slidesEl} = swiper;
        if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
        swiper.recalcSlides();
        const newSlidesOrder = [];
        swiper.slides.forEach(slideEl => {
            const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
            newSlidesOrder[index] = slideEl;
        });
        swiper.slides.forEach(slideEl => {
            slideEl.removeAttribute("data-swiper-slide-index");
        });
        newSlidesOrder.forEach(slideEl => {
            slidesEl.append(slideEl);
        });
        swiper.recalcSlides();
        swiper.slideTo(swiper.realIndex, 0);
    }
    var loop = {
        loopCreate,
        loopFix,
        loopDestroy
    };
    function setGrabCursor(moving) {
        const swiper = this;
        if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        el.style.cursor = "move";
        el.style.cursor = moving ? "grabbing" : "grab";
        if (swiper.isElement) requestAnimationFrame(() => {
            swiper.__preventObserver__ = false;
        });
    }
    function unsetGrabCursor() {
        const swiper = this;
        if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
        if (swiper.isElement) swiper.__preventObserver__ = true;
        swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
        if (swiper.isElement) requestAnimationFrame(() => {
            swiper.__preventObserver__ = false;
        });
    }
    var grabCursor = {
        setGrabCursor,
        unsetGrabCursor
    };
    function closestElement(selector, base = this) {
        function __closestFrom(el) {
            if (!el || el === ssr_window_esm_getDocument() || el === ssr_window_esm_getWindow()) return null;
            if (el.assignedSlot) el = el.assignedSlot;
            const found = el.closest(selector);
            if (!found && !el.getRootNode) return null;
            return found || __closestFrom(el.getRootNode().host);
        }
        return __closestFrom(base);
    }
    function preventEdgeSwipe(swiper, event, startX) {
        const window = ssr_window_esm_getWindow();
        const {params} = swiper;
        const edgeSwipeDetection = params.edgeSwipeDetection;
        const edgeSwipeThreshold = params.edgeSwipeThreshold;
        if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
            if (edgeSwipeDetection === "prevent") {
                event.preventDefault();
                return true;
            }
            return false;
        }
        return true;
    }
    function onTouchStart(event) {
        const swiper = this;
        const document = ssr_window_esm_getDocument();
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        const data = swiper.touchEventsData;
        if (e.type === "pointerdown") {
            if (data.pointerId !== null && data.pointerId !== e.pointerId) return;
            data.pointerId = e.pointerId;
        } else if (e.type === "touchstart" && e.targetTouches.length === 1) data.touchId = e.targetTouches[0].identifier;
        if (e.type === "touchstart") {
            preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
            return;
        }
        const {params, touches, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (swiper.animating && params.preventInteractionOnTransition) return;
        if (!swiper.animating && params.cssMode && params.loop) swiper.loopFix();
        let targetEl = e.target;
        if (params.touchEventsTarget === "wrapper") if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
        if ("which" in e && e.which === 3) return;
        if ("button" in e && e.button > 0) return;
        if (data.isTouched && data.isMoved) return;
        const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
        const eventPath = e.composedPath ? e.composedPath() : e.path;
        if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) targetEl = eventPath[0];
        const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
        const isTargetShadow = !!(e.target && e.target.shadowRoot);
        if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
            swiper.allowClick = true;
            return;
        }
        if (params.swipeHandler) if (!targetEl.closest(params.swipeHandler)) return;
        touches.currentX = e.pageX;
        touches.currentY = e.pageY;
        const startX = touches.currentX;
        const startY = touches.currentY;
        if (!preventEdgeSwipe(swiper, e, startX)) return;
        Object.assign(data, {
            isTouched: true,
            isMoved: false,
            allowTouchCallbacks: true,
            isScrolling: void 0,
            startMoving: void 0
        });
        touches.startX = startX;
        touches.startY = startY;
        data.touchStartTime = utils_now();
        swiper.allowClick = true;
        swiper.updateSize();
        swiper.swipeDirection = void 0;
        if (params.threshold > 0) data.allowThresholdMove = false;
        let preventDefault = true;
        if (targetEl.matches(data.focusableElements)) {
            preventDefault = false;
            if (targetEl.nodeName === "SELECT") data.isTouched = false;
        }
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) document.activeElement.blur();
        const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
        if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) e.preventDefault();
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) swiper.freeMode.onTouchStart();
        swiper.emit("touchStart", e);
    }
    function onTouchMove(event) {
        const document = ssr_window_esm_getDocument();
        const swiper = this;
        const data = swiper.touchEventsData;
        const {params, touches, rtlTranslate: rtl, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && event.pointerType === "mouse") return;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        if (e.type === "pointermove") {
            if (data.touchId !== null) return;
            const id = e.pointerId;
            if (id !== data.pointerId) return;
        }
        let targetTouch;
        if (e.type === "touchmove") {
            targetTouch = [ ...e.changedTouches ].find(t => t.identifier === data.touchId);
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        } else targetTouch = e;
        if (!data.isTouched) {
            if (data.startMoving && data.isScrolling) swiper.emit("touchMoveOpposite", e);
            return;
        }
        const pageX = targetTouch.pageX;
        const pageY = targetTouch.pageY;
        if (e.preventedByNestedSwiper) {
            touches.startX = pageX;
            touches.startY = pageY;
            return;
        }
        if (!swiper.allowTouchMove) {
            if (!e.target.matches(data.focusableElements)) swiper.allowClick = false;
            if (data.isTouched) {
                Object.assign(touches, {
                    startX: pageX,
                    startY: pageY,
                    currentX: pageX,
                    currentY: pageY
                });
                data.touchStartTime = utils_now();
            }
            return;
        }
        if (params.touchReleaseOnEdges && !params.loop) if (swiper.isVertical()) {
            if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
                data.isTouched = false;
                data.isMoved = false;
                return;
            }
        } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) return; else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) return;
        if (document.activeElement && document.activeElement.matches(data.focusableElements) && document.activeElement !== e.target && e.pointerType !== "mouse") document.activeElement.blur();
        if (document.activeElement) if (e.target === document.activeElement && e.target.matches(data.focusableElements)) {
            data.isMoved = true;
            swiper.allowClick = false;
            return;
        }
        if (data.allowTouchCallbacks) swiper.emit("touchMove", e);
        touches.previousX = touches.currentX;
        touches.previousY = touches.currentY;
        touches.currentX = pageX;
        touches.currentY = pageY;
        const diffX = touches.currentX - touches.startX;
        const diffY = touches.currentY - touches.startY;
        if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
        if (typeof data.isScrolling === "undefined") {
            let touchAngle;
            if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) data.isScrolling = false; else if (diffX * diffX + diffY * diffY >= 25) {
                touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
                data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
            }
        }
        if (data.isScrolling) swiper.emit("touchMoveOpposite", e);
        if (typeof data.startMoving === "undefined") if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) data.startMoving = true;
        if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
            data.isTouched = false;
            return;
        }
        if (!data.startMoving) return;
        swiper.allowClick = false;
        if (!params.cssMode && e.cancelable) e.preventDefault();
        if (params.touchMoveStopPropagation && !params.nested) e.stopPropagation();
        let diff = swiper.isHorizontal() ? diffX : diffY;
        let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
        if (params.oneWayMovement) {
            diff = Math.abs(diff) * (rtl ? 1 : -1);
            touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
        }
        touches.diff = diff;
        diff *= params.touchRatio;
        if (rtl) {
            diff = -diff;
            touchesDiff = -touchesDiff;
        }
        const prevTouchesDirection = swiper.touchesDirection;
        swiper.swipeDirection = diff > 0 ? "prev" : "next";
        swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
        const isLoop = swiper.params.loop && !params.cssMode;
        const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
        if (!data.isMoved) {
            if (isLoop && allowLoopFix) swiper.loopFix({
                direction: swiper.swipeDirection
            });
            data.startTranslate = swiper.getTranslate();
            swiper.setTransition(0);
            if (swiper.animating) {
                const evt = new window.CustomEvent("transitionend", {
                    bubbles: true,
                    cancelable: true,
                    detail: {
                        bySwiperTouchMove: true
                    }
                });
                swiper.wrapperEl.dispatchEvent(evt);
            }
            data.allowMomentumBounce = false;
            if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(true);
            swiper.emit("sliderFirstMove", e);
        }
        let loopFixed;
        (new Date).getTime();
        if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
            Object.assign(touches, {
                startX: pageX,
                startY: pageY,
                currentX: pageX,
                currentY: pageY,
                startTranslate: data.currentTranslate
            });
            data.loopSwapReset = true;
            data.startTranslate = data.currentTranslate;
            return;
        }
        swiper.emit("sliderMove", e);
        data.isMoved = true;
        data.currentTranslate = diff + data.startTranslate;
        let disableParentSwiper = true;
        let resistanceRatio = params.resistanceRatio;
        if (params.touchReleaseOnEdges) resistanceRatio = 0;
        if (diff > 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) swiper.loopFix({
                direction: "prev",
                setTranslate: true,
                activeSlideIndex: 0
            });
            if (data.currentTranslate > swiper.minTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
            }
        } else if (diff < 0) {
            if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) swiper.loopFix({
                direction: "next",
                setTranslate: true,
                activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
            });
            if (data.currentTranslate < swiper.maxTranslate()) {
                disableParentSwiper = false;
                if (params.resistance) data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
            }
        }
        if (disableParentSwiper) e.preventedByNestedSwiper = true;
        if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) data.currentTranslate = data.startTranslate;
        if (!swiper.allowSlidePrev && !swiper.allowSlideNext) data.currentTranslate = data.startTranslate;
        if (params.threshold > 0) if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
            if (!data.allowThresholdMove) {
                data.allowThresholdMove = true;
                touches.startX = touches.currentX;
                touches.startY = touches.currentY;
                data.currentTranslate = data.startTranslate;
                touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
                return;
            }
        } else {
            data.currentTranslate = data.startTranslate;
            return;
        }
        if (!params.followFinger || params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        if (params.freeMode && params.freeMode.enabled && swiper.freeMode) swiper.freeMode.onTouchMove();
        swiper.updateProgress(data.currentTranslate);
        swiper.setTranslate(data.currentTranslate);
    }
    function onTouchEnd(event) {
        const swiper = this;
        const data = swiper.touchEventsData;
        let e = event;
        if (e.originalEvent) e = e.originalEvent;
        let targetTouch;
        const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
        if (!isTouchEvent) {
            if (data.touchId !== null) return;
            if (e.pointerId !== data.pointerId) return;
            targetTouch = e;
        } else {
            targetTouch = [ ...e.changedTouches ].find(t => t.identifier === data.touchId);
            if (!targetTouch || targetTouch.identifier !== data.touchId) return;
        }
        if ([ "pointercancel", "pointerout", "pointerleave", "contextmenu" ].includes(e.type)) {
            const proceed = [ "pointercancel", "contextmenu" ].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
            if (!proceed) return;
        }
        data.pointerId = null;
        data.touchId = null;
        const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
        if (!enabled) return;
        if (!params.simulateTouch && e.pointerType === "mouse") return;
        if (data.allowTouchCallbacks) swiper.emit("touchEnd", e);
        data.allowTouchCallbacks = false;
        if (!data.isTouched) {
            if (data.isMoved && params.grabCursor) swiper.setGrabCursor(false);
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) swiper.setGrabCursor(false);
        const touchEndTime = utils_now();
        const timeDiff = touchEndTime - data.touchStartTime;
        if (swiper.allowClick) {
            const pathTree = e.path || e.composedPath && e.composedPath();
            swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
            swiper.emit("tap click", e);
            if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) swiper.emit("doubleTap doubleClick", e);
        }
        data.lastClickTime = utils_now();
        utils_nextTick(() => {
            if (!swiper.destroyed) swiper.allowClick = true;
        });
        if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
            data.isTouched = false;
            data.isMoved = false;
            data.startMoving = false;
            return;
        }
        data.isTouched = false;
        data.isMoved = false;
        data.startMoving = false;
        let currentPos;
        if (params.followFinger) currentPos = rtl ? swiper.translate : -swiper.translate; else currentPos = -data.currentTranslate;
        if (params.cssMode) return;
        if (params.freeMode && params.freeMode.enabled) {
            swiper.freeMode.onTouchEnd({
                currentPos
            });
            return;
        }
        const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
        let stopIndex = 0;
        let groupSize = swiper.slidesSizesGrid[0];
        for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
            const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
            if (typeof slidesGrid[i + increment] !== "undefined") {
                if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
                    stopIndex = i;
                    groupSize = slidesGrid[i + increment] - slidesGrid[i];
                }
            } else if (swipeToLast || currentPos >= slidesGrid[i]) {
                stopIndex = i;
                groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
            }
        }
        let rewindFirstIndex = null;
        let rewindLastIndex = null;
        if (params.rewind) if (swiper.isBeginning) rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1; else if (swiper.isEnd) rewindFirstIndex = 0;
        const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
        const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
        if (timeDiff > params.longSwipesMs) {
            if (!params.longSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            if (swiper.swipeDirection === "next") if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment); else swiper.slideTo(stopIndex);
            if (swiper.swipeDirection === "prev") if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment); else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) swiper.slideTo(rewindLastIndex); else swiper.slideTo(stopIndex);
        } else {
            if (!params.shortSwipes) {
                swiper.slideTo(swiper.activeIndex);
                return;
            }
            const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
            if (!isNavButtonTarget) {
                if (swiper.swipeDirection === "next") swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
                if (swiper.swipeDirection === "prev") swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
            } else if (e.target === swiper.navigation.nextEl) swiper.slideTo(stopIndex + increment); else swiper.slideTo(stopIndex);
        }
    }
    function onResize() {
        const swiper = this;
        const {params, el} = swiper;
        if (el && el.offsetWidth === 0) return;
        if (params.breakpoints) swiper.setBreakpoint();
        const {allowSlideNext, allowSlidePrev, snapGrid} = swiper;
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
        swiper.updateSize();
        swiper.updateSlides();
        swiper.updateSlidesClasses();
        const isVirtualLoop = isVirtual && params.loop;
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) swiper.slideTo(swiper.slides.length - 1, 0, false, true); else if (swiper.params.loop && !isVirtual) swiper.slideToLoop(swiper.realIndex, 0, false, true); else swiper.slideTo(swiper.activeIndex, 0, false, true);
        if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
            clearTimeout(swiper.autoplay.resizeTimeout);
            swiper.autoplay.resizeTimeout = setTimeout(() => {
                if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) swiper.autoplay.resume();
            }, 500);
        }
        swiper.allowSlidePrev = allowSlidePrev;
        swiper.allowSlideNext = allowSlideNext;
        if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
    }
    function onClick(e) {
        const swiper = this;
        if (!swiper.enabled) return;
        if (!swiper.allowClick) {
            if (swiper.params.preventClicks) e.preventDefault();
            if (swiper.params.preventClicksPropagation && swiper.animating) {
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
        }
    }
    function onScroll() {
        const swiper = this;
        const {wrapperEl, rtlTranslate, enabled} = swiper;
        if (!enabled) return;
        swiper.previousTranslate = swiper.translate;
        if (swiper.isHorizontal()) swiper.translate = -wrapperEl.scrollLeft; else swiper.translate = -wrapperEl.scrollTop;
        if (swiper.translate === 0) swiper.translate = 0;
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
        let newProgress;
        const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
        if (translatesDiff === 0) newProgress = 0; else newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
        if (newProgress !== swiper.progress) swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
        swiper.emit("setTranslate", swiper.translate, false);
    }
    function onLoad(e) {
        const swiper = this;
        processLazyPreloader(swiper, e.target);
        if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) return;
        swiper.update();
    }
    function onDocumentTouchStart() {
        const swiper = this;
        if (swiper.documentTouchHandlerProceeded) return;
        swiper.documentTouchHandlerProceeded = true;
        if (swiper.params.touchReleaseOnEdges) swiper.el.style.touchAction = "auto";
    }
    const events = (swiper, method) => {
        const document = ssr_window_esm_getDocument();
        const {params, el, wrapperEl, device} = swiper;
        const capture = !!params.nested;
        const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
        const swiperMethod = method;
        if (!el || typeof el === "string") return;
        document[domMethod]("touchstart", swiper.onDocumentTouchStart, {
            passive: false,
            capture
        });
        el[domMethod]("touchstart", swiper.onTouchStart, {
            passive: false
        });
        el[domMethod]("pointerdown", swiper.onTouchStart, {
            passive: false
        });
        document[domMethod]("touchmove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("pointermove", swiper.onTouchMove, {
            passive: false,
            capture
        });
        document[domMethod]("touchend", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerup", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointercancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("touchcancel", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerout", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("pointerleave", swiper.onTouchEnd, {
            passive: true
        });
        document[domMethod]("contextmenu", swiper.onTouchEnd, {
            passive: true
        });
        if (params.preventClicks || params.preventClicksPropagation) el[domMethod]("click", swiper.onClick, true);
        if (params.cssMode) wrapperEl[domMethod]("scroll", swiper.onScroll);
        if (params.updateOnWindowResize) swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true); else swiper[swiperMethod]("observerUpdate", onResize, true);
        el[domMethod]("load", swiper.onLoad, {
            capture: true
        });
    };
    function attachEvents() {
        const swiper = this;
        const {params} = swiper;
        swiper.onTouchStart = onTouchStart.bind(swiper);
        swiper.onTouchMove = onTouchMove.bind(swiper);
        swiper.onTouchEnd = onTouchEnd.bind(swiper);
        swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
        if (params.cssMode) swiper.onScroll = onScroll.bind(swiper);
        swiper.onClick = onClick.bind(swiper);
        swiper.onLoad = onLoad.bind(swiper);
        events(swiper, "on");
    }
    function detachEvents() {
        const swiper = this;
        events(swiper, "off");
    }
    var events$1 = {
        attachEvents,
        detachEvents
    };
    const isGridEnabled = (swiper, params) => swiper.grid && params.grid && params.grid.rows > 1;
    function setBreakpoint() {
        const swiper = this;
        const {realIndex, initialized, params, el} = swiper;
        const breakpoints = params.breakpoints;
        if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) return;
        const document = ssr_window_esm_getDocument();
        const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
        const breakpointContainer = [ "window", "container" ].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document.querySelector(params.breakpointsBase);
        const breakpoint = swiper.getBreakpoint(breakpoints, breakpointsBase, breakpointContainer);
        if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
        const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : void 0;
        const breakpointParams = breakpointOnlyParams || swiper.originalParams;
        const wasMultiRow = isGridEnabled(swiper, params);
        const isMultiRow = isGridEnabled(swiper, breakpointParams);
        const wasGrabCursor = swiper.params.grabCursor;
        const isGrabCursor = breakpointParams.grabCursor;
        const wasEnabled = params.enabled;
        if (wasMultiRow && !isMultiRow) {
            el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        } else if (!wasMultiRow && isMultiRow) {
            el.classList.add(`${params.containerModifierClass}grid`);
            if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") el.classList.add(`${params.containerModifierClass}grid-column`);
            swiper.emitContainerClasses();
        }
        if (wasGrabCursor && !isGrabCursor) swiper.unsetGrabCursor(); else if (!wasGrabCursor && isGrabCursor) swiper.setGrabCursor();
        [ "navigation", "pagination", "scrollbar" ].forEach(prop => {
            if (typeof breakpointParams[prop] === "undefined") return;
            const wasModuleEnabled = params[prop] && params[prop].enabled;
            const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
            if (wasModuleEnabled && !isModuleEnabled) swiper[prop].disable();
            if (!wasModuleEnabled && isModuleEnabled) swiper[prop].enable();
        });
        const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
        const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
        const wasLoop = params.loop;
        if (directionChanged && initialized) swiper.changeDirection();
        utils_extend(swiper.params, breakpointParams);
        const isEnabled = swiper.params.enabled;
        const hasLoop = swiper.params.loop;
        Object.assign(swiper, {
            allowTouchMove: swiper.params.allowTouchMove,
            allowSlideNext: swiper.params.allowSlideNext,
            allowSlidePrev: swiper.params.allowSlidePrev
        });
        if (wasEnabled && !isEnabled) swiper.disable(); else if (!wasEnabled && isEnabled) swiper.enable();
        swiper.currentBreakpoint = breakpoint;
        swiper.emit("_beforeBreakpoint", breakpointParams);
        if (initialized) if (needsReLoop) {
            swiper.loopDestroy();
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (!wasLoop && hasLoop) {
            swiper.loopCreate(realIndex);
            swiper.updateSlides();
        } else if (wasLoop && !hasLoop) swiper.loopDestroy();
        swiper.emit("breakpoint", breakpointParams);
    }
    function getBreakpoint(breakpoints, base = "window", containerEl) {
        if (!breakpoints || base === "container" && !containerEl) return;
        let breakpoint = false;
        const window = ssr_window_esm_getWindow();
        const currentHeight = base === "window" ? window.innerHeight : containerEl.clientHeight;
        const points = Object.keys(breakpoints).map(point => {
            if (typeof point === "string" && point.indexOf("@") === 0) {
                const minRatio = parseFloat(point.substr(1));
                const value = currentHeight * minRatio;
                return {
                    value,
                    point
                };
            }
            return {
                value: point,
                point
            };
        });
        points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
        for (let i = 0; i < points.length; i += 1) {
            const {point, value} = points[i];
            if (base === "window") {
                if (window.matchMedia(`(min-width: ${value}px)`).matches) breakpoint = point;
            } else if (value <= containerEl.clientWidth) breakpoint = point;
        }
        return breakpoint || "max";
    }
    var breakpoints = {
        setBreakpoint,
        getBreakpoint
    };
    function prepareClasses(entries, prefix) {
        const resultClasses = [];
        entries.forEach(item => {
            if (typeof item === "object") Object.keys(item).forEach(classNames => {
                if (item[classNames]) resultClasses.push(prefix + classNames);
            }); else if (typeof item === "string") resultClasses.push(prefix + item);
        });
        return resultClasses;
    }
    function addClasses() {
        const swiper = this;
        const {classNames, params, rtl, el, device} = swiper;
        const suffixes = prepareClasses([ "initialized", params.direction, {
            "free-mode": swiper.params.freeMode && params.freeMode.enabled
        }, {
            autoheight: params.autoHeight
        }, {
            rtl
        }, {
            grid: params.grid && params.grid.rows > 1
        }, {
            "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
        }, {
            android: device.android
        }, {
            ios: device.ios
        }, {
            "css-mode": params.cssMode
        }, {
            centered: params.cssMode && params.centeredSlides
        }, {
            "watch-progress": params.watchSlidesProgress
        } ], params.containerModifierClass);
        classNames.push(...suffixes);
        el.classList.add(...classNames);
        swiper.emitContainerClasses();
    }
    function swiper_core_removeClasses() {
        const swiper = this;
        const {el, classNames} = swiper;
        if (!el || typeof el === "string") return;
        el.classList.remove(...classNames);
        swiper.emitContainerClasses();
    }
    var classes = {
        addClasses,
        removeClasses: swiper_core_removeClasses
    };
    function checkOverflow() {
        const swiper = this;
        const {isLocked: wasLocked, params} = swiper;
        const {slidesOffsetBefore} = params;
        if (slidesOffsetBefore) {
            const lastSlideIndex = swiper.slides.length - 1;
            const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
            swiper.isLocked = swiper.size > lastSlideRightEdge;
        } else swiper.isLocked = swiper.snapGrid.length === 1;
        if (params.allowSlideNext === true) swiper.allowSlideNext = !swiper.isLocked;
        if (params.allowSlidePrev === true) swiper.allowSlidePrev = !swiper.isLocked;
        if (wasLocked && wasLocked !== swiper.isLocked) swiper.isEnd = false;
        if (wasLocked !== swiper.isLocked) swiper.emit(swiper.isLocked ? "lock" : "unlock");
    }
    var checkOverflow$1 = {
        checkOverflow
    };
    var defaults = {
        init: true,
        direction: "horizontal",
        oneWayMovement: false,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: false,
        updateOnWindowResize: true,
        resizeObserver: true,
        nested: false,
        createElements: false,
        eventsPrefix: "swiper",
        enabled: true,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: false,
        userAgent: null,
        url: null,
        edgeSwipeDetection: false,
        edgeSwipeThreshold: 20,
        autoHeight: false,
        setWrapperSize: false,
        virtualTranslate: false,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: false,
        centeredSlides: false,
        centeredSlidesBounds: false,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: true,
        centerInsufficientSlides: false,
        watchOverflow: true,
        roundLengths: false,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        shortSwipes: true,
        longSwipes: true,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: true,
        allowTouchMove: true,
        threshold: 5,
        touchMoveStopPropagation: false,
        touchStartPreventDefault: true,
        touchStartForcePreventDefault: false,
        touchReleaseOnEdges: false,
        uniqueNavElements: true,
        resistance: true,
        resistanceRatio: .85,
        watchSlidesProgress: false,
        grabCursor: false,
        preventClicks: true,
        preventClicksPropagation: true,
        slideToClickedSlide: false,
        loop: false,
        loopAddBlankSlides: true,
        loopAdditionalSlides: 0,
        loopPreventsSliding: true,
        rewind: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        swipeHandler: null,
        noSwiping: true,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: true,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: true,
        _emitClasses: false
    };
    function moduleExtendParams(params, allModulesParams) {
        return function extendParams(obj = {}) {
            const moduleParamName = Object.keys(obj)[0];
            const moduleParams = obj[moduleParamName];
            if (typeof moduleParams !== "object" || moduleParams === null) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (params[moduleParamName] === true) params[moduleParamName] = {
                enabled: true
            };
            if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) params[moduleParamName].auto = true;
            if ([ "pagination", "scrollbar" ].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) params[moduleParamName].auto = true;
            if (!(moduleParamName in params && "enabled" in moduleParams)) {
                utils_extend(allModulesParams, obj);
                return;
            }
            if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) params[moduleParamName].enabled = true;
            if (!params[moduleParamName]) params[moduleParamName] = {
                enabled: false
            };
            utils_extend(allModulesParams, obj);
        };
    }
    const prototypes = {
        eventsEmitter,
        update,
        translate,
        transition,
        slide,
        loop,
        grabCursor,
        events: events$1,
        breakpoints,
        checkOverflow: checkOverflow$1,
        classes
    };
    const extendedDefaults = {};
    class swiper_core_Swiper {
        constructor(...args) {
            let el;
            let params;
            if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") params = args[0]; else [el, params] = args;
            if (!params) params = {};
            params = utils_extend({}, params);
            if (el && !params.el) params.el = el;
            const document = ssr_window_esm_getDocument();
            if (params.el && typeof params.el === "string" && document.querySelectorAll(params.el).length > 1) {
                const swipers = [];
                document.querySelectorAll(params.el).forEach(containerEl => {
                    const newParams = utils_extend({}, params, {
                        el: containerEl
                    });
                    swipers.push(new swiper_core_Swiper(newParams));
                });
                return swipers;
            }
            const swiper = this;
            swiper.__swiper__ = true;
            swiper.support = getSupport();
            swiper.device = getDevice({
                userAgent: params.userAgent
            });
            swiper.browser = getBrowser();
            swiper.eventsListeners = {};
            swiper.eventsAnyListeners = [];
            swiper.modules = [ ...swiper.__modules__ ];
            if (params.modules && Array.isArray(params.modules)) swiper.modules.push(...params.modules);
            const allModulesParams = {};
            swiper.modules.forEach(mod => {
                mod({
                    params,
                    swiper,
                    extendParams: moduleExtendParams(params, allModulesParams),
                    on: swiper.on.bind(swiper),
                    once: swiper.once.bind(swiper),
                    off: swiper.off.bind(swiper),
                    emit: swiper.emit.bind(swiper)
                });
            });
            const swiperParams = utils_extend({}, defaults, allModulesParams);
            swiper.params = utils_extend({}, swiperParams, extendedDefaults, params);
            swiper.originalParams = utils_extend({}, swiper.params);
            swiper.passedParams = utils_extend({}, params);
            if (swiper.params && swiper.params.on) Object.keys(swiper.params.on).forEach(eventName => {
                swiper.on(eventName, swiper.params.on[eventName]);
            });
            if (swiper.params && swiper.params.onAny) swiper.onAny(swiper.params.onAny);
            Object.assign(swiper, {
                enabled: swiper.params.enabled,
                el,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                    return swiper.params.direction === "horizontal";
                },
                isVertical() {
                    return swiper.params.direction === "vertical";
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: true,
                isEnd: false,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: false,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: swiper.params.allowSlideNext,
                allowSlidePrev: swiper.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: swiper.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: true,
                allowTouchMove: swiper.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            });
            swiper.emit("_swiper");
            if (swiper.params.init) swiper.init();
            return swiper;
        }
        getDirectionLabel(property) {
            if (this.isHorizontal()) return property;
            return {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[property];
        }
        getSlideIndex(slideEl) {
            const {slidesEl, params} = this;
            const slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
            const firstSlideIndex = utils_elementIndex(slides[0]);
            return utils_elementIndex(slideEl) - firstSlideIndex;
        }
        getSlideIndexByData(index) {
            return this.getSlideIndex(this.slides.find(slideEl => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
        }
        getSlideIndexWhenGrid(index) {
            if (this.grid && this.params.grid && this.params.grid.rows > 1) if (this.params.grid.fill === "column") index = Math.floor(index / this.params.grid.rows); else if (this.params.grid.fill === "row") index %= Math.ceil(this.slides.length / this.params.grid.rows);
            return index;
        }
        recalcSlides() {
            const swiper = this;
            const {slidesEl, params} = swiper;
            swiper.slides = utils_elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
        }
        enable() {
            const swiper = this;
            if (swiper.enabled) return;
            swiper.enabled = true;
            if (swiper.params.grabCursor) swiper.setGrabCursor();
            swiper.emit("enable");
        }
        disable() {
            const swiper = this;
            if (!swiper.enabled) return;
            swiper.enabled = false;
            if (swiper.params.grabCursor) swiper.unsetGrabCursor();
            swiper.emit("disable");
        }
        setProgress(progress, speed) {
            const swiper = this;
            progress = Math.min(Math.max(progress, 0), 1);
            const min = swiper.minTranslate();
            const max = swiper.maxTranslate();
            const current = (max - min) * progress + min;
            swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
            swiper.updateActiveIndex();
            swiper.updateSlidesClasses();
        }
        emitContainerClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const cls = swiper.el.className.split(" ").filter(className => className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0);
            swiper.emit("_containerClasses", cls.join(" "));
        }
        getSlideClasses(slideEl) {
            const swiper = this;
            if (swiper.destroyed) return "";
            return slideEl.className.split(" ").filter(className => className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0).join(" ");
        }
        emitSlidesClasses() {
            const swiper = this;
            if (!swiper.params._emitClasses || !swiper.el) return;
            const updates = [];
            swiper.slides.forEach(slideEl => {
                const classNames = swiper.getSlideClasses(slideEl);
                updates.push({
                    slideEl,
                    classNames
                });
                swiper.emit("_slideClass", slideEl, classNames);
            });
            swiper.emit("_slideClasses", updates);
        }
        slidesPerViewDynamic(view = "current", exact = false) {
            const swiper = this;
            const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
            let spv = 1;
            if (typeof params.slidesPerView === "number") return params.slidesPerView;
            if (params.centeredSlides) {
                let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
                let breakLoop;
                for (let i = activeIndex + 1; i < slides.length; i += 1) if (slides[i] && !breakLoop) {
                    slideSize += Math.ceil(slides[i].swiperSlideSize);
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
                for (let i = activeIndex - 1; i >= 0; i -= 1) if (slides[i] && !breakLoop) {
                    slideSize += slides[i].swiperSlideSize;
                    spv += 1;
                    if (slideSize > swiperSize) breakLoop = true;
                }
            } else if (view === "current") for (let i = activeIndex + 1; i < slides.length; i += 1) {
                const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
                if (slideInView) spv += 1;
            } else for (let i = activeIndex - 1; i >= 0; i -= 1) {
                const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
                if (slideInView) spv += 1;
            }
            return spv;
        }
        update() {
            const swiper = this;
            if (!swiper || swiper.destroyed) return;
            const {snapGrid, params} = swiper;
            if (params.breakpoints) swiper.setBreakpoint();
            [ ...swiper.el.querySelectorAll('[loading="lazy"]') ].forEach(imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl);
            });
            swiper.updateSize();
            swiper.updateSlides();
            swiper.updateProgress();
            swiper.updateSlidesClasses();
            function setTranslate() {
                const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
                const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
                swiper.setTranslate(newTranslate);
                swiper.updateActiveIndex();
                swiper.updateSlidesClasses();
            }
            let translated;
            if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
                setTranslate();
                if (params.autoHeight) swiper.updateAutoHeight();
            } else {
                if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
                    const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
                    translated = swiper.slideTo(slides.length - 1, 0, false, true);
                } else translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
                if (!translated) setTranslate();
            }
            if (params.watchOverflow && snapGrid !== swiper.snapGrid) swiper.checkOverflow();
            swiper.emit("update");
        }
        changeDirection(newDirection, needUpdate = true) {
            const swiper = this;
            const currentDirection = swiper.params.direction;
            if (!newDirection) newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
            if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") return swiper;
            swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
            swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
            swiper.emitContainerClasses();
            swiper.params.direction = newDirection;
            swiper.slides.forEach(slideEl => {
                if (newDirection === "vertical") slideEl.style.width = ""; else slideEl.style.height = "";
            });
            swiper.emit("changeDirection");
            if (needUpdate) swiper.update();
            return swiper;
        }
        changeLanguageDirection(direction) {
            const swiper = this;
            if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
            swiper.rtl = direction === "rtl";
            swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
            if (swiper.rtl) {
                swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "rtl";
            } else {
                swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
                swiper.el.dir = "ltr";
            }
            swiper.update();
        }
        mount(element) {
            const swiper = this;
            if (swiper.mounted) return true;
            let el = element || swiper.params.el;
            if (typeof el === "string") el = document.querySelector(el);
            if (!el) return false;
            el.swiper = swiper;
            if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) swiper.isElement = true;
            const getWrapperSelector = () => `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
            const getWrapper = () => {
                if (el && el.shadowRoot && el.shadowRoot.querySelector) {
                    const res = el.shadowRoot.querySelector(getWrapperSelector());
                    return res;
                }
                return utils_elementChildren(el, getWrapperSelector())[0];
            };
            let wrapperEl = getWrapper();
            if (!wrapperEl && swiper.params.createElements) {
                wrapperEl = utils_createElement("div", swiper.params.wrapperClass);
                el.append(wrapperEl);
                utils_elementChildren(el, `.${swiper.params.slideClass}`).forEach(slideEl => {
                    wrapperEl.append(slideEl);
                });
            }
            Object.assign(swiper, {
                el,
                wrapperEl,
                slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
                hostEl: swiper.isElement ? el.parentNode.host : el,
                mounted: true,
                rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
                rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
                wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
            });
            return true;
        }
        init(el) {
            const swiper = this;
            if (swiper.initialized) return swiper;
            const mounted = swiper.mount(el);
            if (mounted === false) return swiper;
            swiper.emit("beforeInit");
            if (swiper.params.breakpoints) swiper.setBreakpoint();
            swiper.addClasses();
            swiper.updateSize();
            swiper.updateSlides();
            if (swiper.params.watchOverflow) swiper.checkOverflow();
            if (swiper.params.grabCursor && swiper.enabled) swiper.setGrabCursor();
            if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true); else swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
            if (swiper.params.loop) swiper.loopCreate(void 0, true);
            swiper.attachEvents();
            const lazyElements = [ ...swiper.el.querySelectorAll('[loading="lazy"]') ];
            if (swiper.isElement) lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
            lazyElements.forEach(imageEl => {
                if (imageEl.complete) processLazyPreloader(swiper, imageEl); else imageEl.addEventListener("load", e => {
                    processLazyPreloader(swiper, e.target);
                });
            });
            preload(swiper);
            swiper.initialized = true;
            preload(swiper);
            swiper.emit("init");
            swiper.emit("afterInit");
            return swiper;
        }
        destroy(deleteInstance = true, cleanStyles = true) {
            const swiper = this;
            const {params, el, wrapperEl, slides} = swiper;
            if (typeof swiper.params === "undefined" || swiper.destroyed) return null;
            swiper.emit("beforeDestroy");
            swiper.initialized = false;
            swiper.detachEvents();
            if (params.loop) swiper.loopDestroy();
            if (cleanStyles) {
                swiper.removeClasses();
                if (el && typeof el !== "string") el.removeAttribute("style");
                if (wrapperEl) wrapperEl.removeAttribute("style");
                if (slides && slides.length) slides.forEach(slideEl => {
                    slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
                    slideEl.removeAttribute("style");
                    slideEl.removeAttribute("data-swiper-slide-index");
                });
            }
            swiper.emit("destroy");
            Object.keys(swiper.eventsListeners).forEach(eventName => {
                swiper.off(eventName);
            });
            if (deleteInstance !== false) {
                if (swiper.el && typeof swiper.el !== "string") swiper.el.swiper = null;
                deleteProps(swiper);
            }
            swiper.destroyed = true;
            return null;
        }
        static extendDefaults(newDefaults) {
            utils_extend(extendedDefaults, newDefaults);
        }
        static get extendedDefaults() {
            return extendedDefaults;
        }
        static get defaults() {
            return defaults;
        }
        static installModule(mod) {
            if (!swiper_core_Swiper.prototype.__modules__) swiper_core_Swiper.prototype.__modules__ = [];
            const modules = swiper_core_Swiper.prototype.__modules__;
            if (typeof mod === "function" && modules.indexOf(mod) < 0) modules.push(mod);
        }
        static use(module) {
            if (Array.isArray(module)) {
                module.forEach(m => swiper_core_Swiper.installModule(m));
                return swiper_core_Swiper;
            }
            swiper_core_Swiper.installModule(module);
            return swiper_core_Swiper;
        }
    }
    Object.keys(prototypes).forEach(prototypeGroup => {
        Object.keys(prototypes[prototypeGroup]).forEach(protoMethod => {
            swiper_core_Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        });
    });
    swiper_core_Swiper.use([ Resize, Observer ]);
    function create_element_if_not_defined_createElementIfNotDefined(swiper, originalParams, params, checkProps) {
        if (swiper.params.createElements) Object.keys(checkProps).forEach(key => {
            if (!params[key] && params.auto === true) {
                let element = utils_elementChildren(swiper.el, `.${checkProps[key]}`)[0];
                if (!element) {
                    element = utils_createElement("div", checkProps[key]);
                    element.className = checkProps[key];
                    swiper.el.append(element);
                }
                params[key] = element;
                originalParams[key] = element;
            }
        });
        return params;
    }
    function classes_to_selector_classesToSelector(classes = "") {
        return `.${classes.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`;
    }
    function Pagination({swiper, extendParams, on, emit}) {
        const pfx = "swiper-pagination";
        extendParams({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: false,
                hideOnClick: false,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: false,
                type: "bullets",
                dynamicBullets: false,
                dynamicMainBullets: 1,
                formatFractionCurrent: number => number,
                formatFractionTotal: number => number,
                bulletClass: `${pfx}-bullet`,
                bulletActiveClass: `${pfx}-bullet-active`,
                modifierClass: `${pfx}-`,
                currentClass: `${pfx}-current`,
                totalClass: `${pfx}-total`,
                hiddenClass: `${pfx}-hidden`,
                progressbarFillClass: `${pfx}-progressbar-fill`,
                progressbarOppositeClass: `${pfx}-progressbar-opposite`,
                clickableClass: `${pfx}-clickable`,
                lockClass: `${pfx}-lock`,
                horizontalClass: `${pfx}-horizontal`,
                verticalClass: `${pfx}-vertical`,
                paginationDisabledClass: `${pfx}-disabled`
            }
        });
        swiper.pagination = {
            el: null,
            bullets: []
        };
        let bulletSize;
        let dynamicBulletIndex = 0;
        function isPaginationDisabled() {
            return !swiper.params.pagination.el || !swiper.pagination.el || Array.isArray(swiper.pagination.el) && swiper.pagination.el.length === 0;
        }
        function setSideBullets(bulletEl, position) {
            const {bulletActiveClass} = swiper.params.pagination;
            if (!bulletEl) return;
            bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
            if (bulletEl) {
                bulletEl.classList.add(`${bulletActiveClass}-${position}`);
                bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
                if (bulletEl) bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
            }
        }
        function getMoveDirection(prevIndex, nextIndex, length) {
            prevIndex %= length;
            nextIndex %= length;
            if (nextIndex === prevIndex + 1) return "next"; else if (nextIndex === prevIndex - 1) return "previous";
            return;
        }
        function onBulletClick(e) {
            const bulletEl = e.target.closest(classes_to_selector_classesToSelector(swiper.params.pagination.bulletClass));
            if (!bulletEl) return;
            e.preventDefault();
            const index = utils_elementIndex(bulletEl) * swiper.params.slidesPerGroup;
            if (swiper.params.loop) {
                if (swiper.realIndex === index) return;
                const moveDirection = getMoveDirection(swiper.realIndex, index, swiper.slides.length);
                if (moveDirection === "next") swiper.slideNext(); else if (moveDirection === "previous") swiper.slidePrev(); else swiper.slideToLoop(index);
            } else swiper.slideTo(index);
        }
        function update() {
            const rtl = swiper.rtl;
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            el = utils_makeElementsArray(el);
            let current;
            let previousIndex;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
            const total = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
            if (swiper.params.loop) {
                previousIndex = swiper.previousRealIndex || 0;
                current = swiper.params.slidesPerGroup > 1 ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup) : swiper.realIndex;
            } else if (typeof swiper.snapIndex !== "undefined") {
                current = swiper.snapIndex;
                previousIndex = swiper.previousSnapIndex;
            } else {
                previousIndex = swiper.previousIndex || 0;
                current = swiper.activeIndex || 0;
            }
            if (params.type === "bullets" && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
                const bullets = swiper.pagination.bullets;
                let firstIndex;
                let lastIndex;
                let midIndex;
                if (params.dynamicBullets) {
                    bulletSize = elementOuterSize(bullets[0], swiper.isHorizontal() ? "width" : "height", true);
                    el.forEach(subEl => {
                        subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
                    });
                    if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
                        dynamicBulletIndex += current - (previousIndex || 0);
                        if (dynamicBulletIndex > params.dynamicMainBullets - 1) dynamicBulletIndex = params.dynamicMainBullets - 1; else if (dynamicBulletIndex < 0) dynamicBulletIndex = 0;
                    }
                    firstIndex = Math.max(current - dynamicBulletIndex, 0);
                    lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
                    midIndex = (lastIndex + firstIndex) / 2;
                }
                bullets.forEach(bulletEl => {
                    const classesToRemove = [ ...[ "", "-next", "-next-next", "-prev", "-prev-prev", "-main" ].map(suffix => `${params.bulletActiveClass}${suffix}`) ].map(s => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
                    bulletEl.classList.remove(...classesToRemove);
                });
                if (el.length > 1) bullets.forEach(bullet => {
                    const bulletIndex = utils_elementIndex(bullet);
                    if (bulletIndex === current) bullet.classList.add(...params.bulletActiveClass.split(" ")); else if (swiper.isElement) bullet.setAttribute("part", "bullet");
                    if (params.dynamicBullets) {
                        if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        if (bulletIndex === firstIndex) setSideBullets(bullet, "prev");
                        if (bulletIndex === lastIndex) setSideBullets(bullet, "next");
                    }
                }); else {
                    const bullet = bullets[current];
                    if (bullet) bullet.classList.add(...params.bulletActiveClass.split(" "));
                    if (swiper.isElement) bullets.forEach((bulletEl, bulletIndex) => {
                        bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
                    });
                    if (params.dynamicBullets) {
                        const firstDisplayedBullet = bullets[firstIndex];
                        const lastDisplayedBullet = bullets[lastIndex];
                        for (let i = firstIndex; i <= lastIndex; i += 1) if (bullets[i]) bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
                        setSideBullets(firstDisplayedBullet, "prev");
                        setSideBullets(lastDisplayedBullet, "next");
                    }
                }
                if (params.dynamicBullets) {
                    const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
                    const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
                    const offsetProp = rtl ? "right" : "left";
                    bullets.forEach(bullet => {
                        bullet.style[swiper.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
                    });
                }
            }
            el.forEach((subEl, subElIndex) => {
                if (params.type === "fraction") {
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.currentClass)).forEach(fractionEl => {
                        fractionEl.textContent = params.formatFractionCurrent(current + 1);
                    });
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.totalClass)).forEach(totalEl => {
                        totalEl.textContent = params.formatFractionTotal(total);
                    });
                }
                if (params.type === "progressbar") {
                    let progressbarDirection;
                    if (params.progressbarOpposite) progressbarDirection = swiper.isHorizontal() ? "vertical" : "horizontal"; else progressbarDirection = swiper.isHorizontal() ? "horizontal" : "vertical";
                    const scale = (current + 1) / total;
                    let scaleX = 1;
                    let scaleY = 1;
                    if (progressbarDirection === "horizontal") scaleX = scale; else scaleY = scale;
                    subEl.querySelectorAll(classes_to_selector_classesToSelector(params.progressbarFillClass)).forEach(progressEl => {
                        progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                        progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
                    });
                }
                if (params.type === "custom" && params.renderCustom) {
                    utils_setInnerHTML(subEl, params.renderCustom(swiper, current + 1, total));
                    if (subElIndex === 0) emit("paginationRender", subEl);
                } else {
                    if (subElIndex === 0) emit("paginationRender", subEl);
                    emit("paginationUpdate", subEl);
                }
                if (swiper.params.watchOverflow && swiper.enabled) subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
            });
        }
        function render() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            const slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.grid && swiper.params.grid.rows > 1 ? swiper.slides.length / Math.ceil(swiper.params.grid.rows) : swiper.slides.length;
            let el = swiper.pagination.el;
            el = utils_makeElementsArray(el);
            let paginationHTML = "";
            if (params.type === "bullets") {
                let numberOfBullets = swiper.params.loop ? Math.ceil(slidesLength / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
                if (swiper.params.freeMode && swiper.params.freeMode.enabled && numberOfBullets > slidesLength) numberOfBullets = slidesLength;
                for (let i = 0; i < numberOfBullets; i += 1) if (params.renderBullet) paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass); else paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
            }
            if (params.type === "fraction") if (params.renderFraction) paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass); else paginationHTML = `<span class="${params.currentClass}"></span>` + " / " + `<span class="${params.totalClass}"></span>`;
            if (params.type === "progressbar") if (params.renderProgressbar) paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass); else paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
            swiper.pagination.bullets = [];
            el.forEach(subEl => {
                if (params.type !== "custom") utils_setInnerHTML(subEl, paginationHTML || "");
                if (params.type === "bullets") swiper.pagination.bullets.push(...subEl.querySelectorAll(classes_to_selector_classesToSelector(params.bulletClass)));
            });
            if (params.type !== "custom") emit("paginationRender", el[0]);
        }
        function init() {
            swiper.params.pagination = create_element_if_not_defined_createElementIfNotDefined(swiper, swiper.originalParams.pagination, swiper.params.pagination, {
                el: "swiper-pagination"
            });
            const params = swiper.params.pagination;
            if (!params.el) return;
            let el;
            if (typeof params.el === "string" && swiper.isElement) el = swiper.el.querySelector(params.el);
            if (!el && typeof params.el === "string") el = [ ...document.querySelectorAll(params.el) ];
            if (!el) el = params.el;
            if (!el || el.length === 0) return;
            if (swiper.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
                el = [ ...swiper.el.querySelectorAll(params.el) ];
                if (el.length > 1) el = el.find(subEl => {
                    if (utils_elementParents(subEl, ".swiper")[0] !== swiper.el) return false;
                    return true;
                });
            }
            if (Array.isArray(el) && el.length === 1) el = el[0];
            Object.assign(swiper.pagination, {
                el
            });
            el = utils_makeElementsArray(el);
            el.forEach(subEl => {
                if (params.type === "bullets" && params.clickable) subEl.classList.add(...(params.clickableClass || "").split(" "));
                subEl.classList.add(params.modifierClass + params.type);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                if (params.type === "bullets" && params.dynamicBullets) {
                    subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
                    dynamicBulletIndex = 0;
                    if (params.dynamicMainBullets < 1) params.dynamicMainBullets = 1;
                }
                if (params.type === "progressbar" && params.progressbarOpposite) subEl.classList.add(params.progressbarOppositeClass);
                if (params.clickable) subEl.addEventListener("click", onBulletClick);
                if (!swiper.enabled) subEl.classList.add(params.lockClass);
            });
        }
        function destroy() {
            const params = swiper.params.pagination;
            if (isPaginationDisabled()) return;
            let el = swiper.pagination.el;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach(subEl => {
                    subEl.classList.remove(params.hiddenClass);
                    subEl.classList.remove(params.modifierClass + params.type);
                    subEl.classList.remove(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
                    if (params.clickable) {
                        subEl.classList.remove(...(params.clickableClass || "").split(" "));
                        subEl.removeEventListener("click", onBulletClick);
                    }
                });
            }
            if (swiper.pagination.bullets) swiper.pagination.bullets.forEach(subEl => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
        }
        on("changeDirection", () => {
            if (!swiper.pagination || !swiper.pagination.el) return;
            const params = swiper.params.pagination;
            let {el} = swiper.pagination;
            el = utils_makeElementsArray(el);
            el.forEach(subEl => {
                subEl.classList.remove(params.horizontalClass, params.verticalClass);
                subEl.classList.add(swiper.isHorizontal() ? params.horizontalClass : params.verticalClass);
            });
        });
        on("init", () => {
            if (swiper.params.pagination.enabled === false) disable(); else {
                init();
                render();
                update();
            }
        });
        on("activeIndexChange", () => {
            if (typeof swiper.snapIndex === "undefined") update();
        });
        on("snapIndexChange", () => {
            update();
        });
        on("snapGridLengthChange", () => {
            render();
            update();
        });
        on("destroy", () => {
            destroy();
        });
        on("enable disable", () => {
            let {el} = swiper.pagination;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach(subEl => subEl.classList[swiper.enabled ? "remove" : "add"](swiper.params.pagination.lockClass));
            }
        });
        on("lock unlock", () => {
            update();
        });
        on("click", (_s, e) => {
            const targetEl = e.target;
            const el = utils_makeElementsArray(swiper.pagination.el);
            if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper.params.pagination.bulletClass)) {
                if (swiper.navigation && (swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl || swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl)) return;
                const isHidden = el[0].classList.contains(swiper.params.pagination.hiddenClass);
                if (isHidden === true) emit("paginationShow"); else emit("paginationHide");
                el.forEach(subEl => subEl.classList.toggle(swiper.params.pagination.hiddenClass));
            }
        });
        const enable = () => {
            swiper.el.classList.remove(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach(subEl => subEl.classList.remove(swiper.params.pagination.paginationDisabledClass));
            }
            init();
            render();
            update();
        };
        const disable = () => {
            swiper.el.classList.add(swiper.params.pagination.paginationDisabledClass);
            let {el} = swiper.pagination;
            if (el) {
                el = utils_makeElementsArray(el);
                el.forEach(subEl => subEl.classList.add(swiper.params.pagination.paginationDisabledClass));
            }
            destroy();
        };
        Object.assign(swiper.pagination, {
            enable,
            disable,
            render,
            update,
            init,
            destroy
        });
    }
    function initSliders() {
        if (document.querySelector(".reviews-swiper")) new swiper_core_Swiper(".reviews-swiper", {
            modules: [ Pagination ],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 14,
            speed: 800,
            pagination: {
                el: ".reviews-swiper .swiper-pagination",
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            },
            on: {}
        });
    }
    window.addEventListener("load", function(e) {
        initSliders();
    });
    class DynamicAdapt {
        constructor(type) {
            this.type = type;
        }
        init() {
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = [ ...document.querySelectorAll("[data-da]") ];
            this.nodes.forEach(node => {
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767.98";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            });
            this.arraySort(this.оbjects);
            this.mediaQueries = this.оbjects.map(({breakpoint}) => `(${this.type}-width: ${breakpoint / 16}em),${breakpoint}`).filter((item, index, self) => self.indexOf(item) === index);
            this.mediaQueries.forEach(media => {
                const mediaSplit = media.split(",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = this.оbjects.filter(({breakpoint}) => breakpoint === mediaBreakpoint);
                matchMedia.addEventListener("change", () => {
                    this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            });
        }
        mediaHandler(matchMedia, оbjects) {
            if (matchMedia.matches) оbjects.forEach(оbject => {
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }); else оbjects.forEach(({parent, element, index}) => {
                if (element.classList.contains(this.daClassname)) this.moveBack(parent, element, index);
            });
        }
        moveTo(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.append(element);
                return;
            }
            if (place === "first") {
                destination.prepend(element);
                return;
            }
            destination.children[place].before(element);
        }
        moveBack(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].before(element); else parent.append(element);
        }
        indexInParent(parent, element) {
            return [ ...parent.children ].indexOf(element);
        }
        arraySort(arr) {
            if (this.type === "min") arr.sort((a, b) => {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return 0;
                }
                return a.breakpoint - b.breakpoint;
            }); else {
                arr.sort((a, b) => {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return 0;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        }
    }
    const da = new DynamicAdapt("max");
    da.init();
    document.addEventListener("DOMContentLoaded", () => {
        function initAccordions() {
            const accordions = document.querySelectorAll("[data-accordion]");
            accordions.forEach(accordion => {
                const breakpoint = parseFloat(accordion.dataset.accordion);
                const btn = accordion.querySelector("[data-accordion-btn]");
                const body = accordion.querySelector("[data-accordion-body]");
                if (!btn || !body) return;
                const isAccordionMode = window.innerWidth <= breakpoint;
                if (isAccordionMode) {
                    if (!accordion.classList.contains("is-accordion")) {
                        accordion.classList.add("is-accordion");
                        body.hidden = true;
                    }
                    btn.onclick = () => {
                        _slideToggle(body);
                        btn.classList.toggle("active");
                    };
                } else {
                    accordion.classList.remove("is-accordion");
                    btn.classList.remove("active");
                    btn.onclick = null;
                    body.hidden = false;
                }
            });
        }
        initAccordions();
        window.addEventListener("resize", initAccordions);
        const dropdowns = document.querySelectorAll("[data-dropdown]");
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector("[data-dropdown-btn]");
            const menu = dropdown.querySelector("[data-dropdown-menu]");
            document.addEventListener("click", e => {
                if (!dropdown.contains(e.target)) collapseMenu(dropdown, menu);
            });
            btn.addEventListener("click", e => {
                e.stopPropagation();
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        const otherMenu = d.querySelector("[data-dropdown-menu]");
                        collapseMenu(d, otherMenu);
                    }
                });
                if (menu.style.height && menu.style.height !== "0px") collapseMenu(dropdown, menu); else expandMenu(dropdown, menu);
            });
        });
        function expandMenu(dropdown, menu) {
            dropdown.classList.add("dropdown--active");
            menu.style.display = "block";
            const height = menu.scrollHeight + "px";
            menu.style.height = "0px";
            menu.style.opacity = 0;
            requestAnimationFrame(() => {
                menu.style.height = height;
                menu.style.opacity = 1;
            });
            menu.addEventListener("transitionend", function handler() {
                menu.style.height = "auto";
                menu.removeEventListener("transitionend", handler);
            });
        }
        function collapseMenu(dropdown, menu) {
            dropdown.classList.remove("dropdown--active");
            menu.style.height = menu.scrollHeight + "px";
            requestAnimationFrame(() => {
                menu.style.height = "0px";
                menu.style.opacity = 0;
            });
        }
        const items = document.querySelectorAll(".menu-item.menu-item-has-children");
        items?.forEach(dropdown => {
            const btn = dropdown;
            const menu = dropdown.querySelector(".sub-menu");
            document.addEventListener("click", e => {
                if (!dropdown.contains(e.target)) collapseMenu(dropdown, menu);
            });
            btn.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                items.forEach(d => {
                    if (d !== dropdown) {
                        const otherMenu = d.querySelector(".sub-menu");
                        collapseMenu(d, otherMenu);
                    }
                });
                if (menu.style.height && menu.style.height !== "0px") collapseMenu(dropdown, menu); else expandMenu(dropdown, menu);
            });
        });
        function expandMenu(dropdown, menu) {
            dropdown.classList.add("item--active");
            menu.style.display = "block";
            const height = menu.scrollHeight + "px";
            menu.style.height = "0px";
            menu.style.opacity = 0;
            requestAnimationFrame(() => {
                menu.style.height = height;
                menu.style.opacity = 1;
            });
            menu.addEventListener("transitionend", function handler() {
                menu.style.height = "auto";
                menu.removeEventListener("transitionend", handler);
            });
        }
        function collapseMenu(dropdown, menu) {
            dropdown.classList.remove("item--active");
            menu.style.height = menu.scrollHeight + "px";
            requestAnimationFrame(() => {
                menu.style.height = "0px";
                menu.style.opacity = 0;
            });
        }
    });
    document.addEventListener("DOMContentLoaded", () => {
        const items = document.querySelectorAll(".footer-accordion .footer-item");
        function expand(item, list) {
            item.classList.add("active");
            list.style.display = "block";
            const height = list.scrollHeight + "px";
            list.style.height = "0px";
            list.style.opacity = 0;
            requestAnimationFrame(() => {
                list.style.height = height;
                list.style.opacity = 1;
            });
            list.addEventListener("transitionend", function handler() {
                list.style.height = "auto";
                list.removeEventListener("transitionend", handler);
            });
        }
        function collapse(item, list) {
            item.classList.remove("active");
            list.style.height = list.scrollHeight + "px";
            requestAnimationFrame(() => {
                list.style.height = "0px";
                list.style.opacity = 0;
            });
        }
        items.forEach(item => {
            const title = item.querySelector(".footer-item__title");
            const list = item.querySelector(".footer-item__list");
            title.addEventListener("click", e => {
                e.preventDefault();
                items.forEach(other => {
                    if (other !== item) {
                        const otherList = other.querySelector(".footer-item__list");
                        collapse(other, otherList);
                    }
                });
                if (item.classList.contains("active")) collapse(item, list); else expand(item, list);
            });
        });
    });
    document.addEventListener("DOMContentLoaded", () => {
        const search = document.querySelector(".search");
        if (!search) return;
        const btn = search.querySelector(".search__icon");
        const form = search.querySelector(".search__form");
        if (!btn || !form) return;
        btn.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            search.classList.toggle("active");
        });
        document.addEventListener("click", e => {
            if (!search.contains(e.target)) search.classList.remove("active");
        });
        const accordions = document.querySelectorAll("[data-accordion]");
        accordions?.forEach(accordion => {
            const accordionItems = accordion.querySelectorAll("[data-accordion-item]");
            accordionItems?.forEach(item => {
                const btn = item.querySelector("[data-accordion-title]");
                const list = item.querySelector("[data-accordion-list]");
                _slideUp(list);
                btn.addEventListener("click", e => {
                    _slideToggle(list);
                    accordionItems?.forEach(item => {
                        const list = item.querySelector("[data-accordion-list]");
                        _slideUp(list);
                    });
                });
            });
        });
    });
    menuInit();
    spollers();
    tabs();
    N.bind("[data-fancybox]", {});
})();
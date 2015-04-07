!function () {
    function provide(t, e) {
        e(function (e) {
            modules[t] = e
        })
    }

    function using() {
        for (var t, e = Array.prototype.slice.call(arguments, 0, -1), i = 0, n = [], r = arguments[arguments.length - 1]; t = e[i]; i++) {
            if (!modules[t])throw"[TWITTER] Module dependency missing: " + t;
            n.push(modules[t])
        }
        r && r.apply(window, n)
    }

    var modules = {};
    provide("util/util", function (t) {
        function e(t) {
            return t && String(t).toLowerCase().indexOf("[native code]") > -1
        }

        function i(t) {
            return f(arguments, function (e) {
                r(e, function (e, i) {
                    t[e] = i
                })
            }), t
        }

        function n(t) {
            return r(t, function (e, i) {
                u(i) && (n(i), l(i) && delete t[e]), (void 0 === i || null === i || "" === i) && delete t[e]
            }), t
        }

        function r(t, e) {
            for (var i in t)(!t.hasOwnProperty || t.hasOwnProperty(i)) && e(i, t[i]);
            return t
        }

        function o(t) {
            return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function s(t, e) {
            return t == o(e)
        }

        function a(t, e, i) {
            return i = i || [], function () {
                var n = w(arguments, function (t) {
                    return t
                });
                return t.apply(e, i.concat(n))
            }
        }

        function u(t) {
            return t === Object(t)
        }

        function l(t) {
            if (!u(t))return !1;
            if (Object.keys)return !Object.keys(t).length;
            for (var e in t)if (t.hasOwnProperty(e))return !1;
            return !0
        }

        function c(t, e) {
            window.setTimeout(function () {
                t.call(e || null)
            }, 0)
        }

        function d(t) {
            return Array.prototype.slice.call(t)
        }

        var h = function () {
            var t = Array.prototype.indexOf;
            return e(t) ? function (e, i) {
                return e ? t.apply(e, [i]) : -1
            } : function (t, e) {
                if (!t)return -1;
                for (var i = 0, n = t.length; n > i; i++)if (e == t[i])return i;
                return -1
            }
        }(), f = function () {
            var t = Array.prototype.forEach;
            return e(t) ? function (e, i) {
                e && i && t.apply(e, [i])
            } : function (t, e) {
                if (t && e)for (var i = 0, n = t.length; n > i; i++)e(t[i], i)
            }
        }(), m = function () {
            var t = Array.prototype.filter;
            return e(t) ? function (e, i) {
                return e ? i ? t.apply(e, [i]) : e : null
            } : function (t, e) {
                if (!t)return null;
                if (!e)return t;
                for (var i = [], n = 0, r = t.length; r > n; n++)e(t[n]) && i.push(t[n]);
                return i
            }
        }(), w = function () {
            var t = Array.prototype.map;
            return e(t) ? function (e, i) {
                return e ? i ? t.apply(e, [i]) : e : null
            } : function (t, e) {
                if (!t)return null;
                if (!e)return t;
                for (var i = [], n = 0, r = t.length; r > n; n++)i.push(e(t[n]));
                return i
            }
        }(), p = function () {
            var t = Array.prototype.reduce;
            return e(t) ? function (e, i, n) {
                return e ? i ? t.apply(e, [i, n]) : n : null
            } : function (t, e, i) {
                if (!t)return null;
                if (!e)return i;
                for (var n = i, r = 0, o = t.length; o > r; r++)n = e(n, t[r], r, t);
                return n
            }
        }(), g = function () {
            var t = String.prototype.trim;
            return e(t) ? function (e) {
                return e && t.apply(e)
            } : function (t) {
                return t && t.replace(/(^\s+|\s+$)/g, "")
            }
        }(), v = e(Object.create) ? Object.create : function (t) {
            function e() {
            }

            return e.prototype = t, new e
        };
        t({
            aug: i,
            async: c,
            compact: n,
            forIn: r,
            forEach: f,
            filter: m,
            map: w,
            reduce: p,
            trim: g,
            indexOf: h,
            isNative: e,
            isObject: u,
            isEmptyObject: l,
            createObject: v,
            bind: a,
            toType: o,
            isType: s,
            toRealArray: d
        })
    }), provide("util/typevalidator", function (t) {
        using("util/util", function (e) {
            function i(t) {
                return void 0 !== t && null !== t && "" !== t
            }

            function n(t) {
                return o(t) && t % 1 === 0
            }

            function r(t) {
                return o(t) && !n(t)
            }

            function o(t) {
                return i(t) && !isNaN(t)
            }

            function s(t) {
                return i(t) && "array" == e.toType(t)
            }

            function a(t) {
                if (!i(t))return !1;
                switch (t) {
                    case"on":
                    case"ON":
                    case"true":
                    case"TRUE":
                        return !0;
                    case"off":
                    case"OFF":
                    case"false":
                    case"FALSE":
                        return !1;
                    default:
                        return !!t
                }
            }

            function u(t) {
                return o(t) ? t : void 0
            }

            function l(t) {
                return r(t) ? t : void 0
            }

            function c(t) {
                return n(t) ? t : void 0
            }

            t({
                hasValue: i,
                isInt: n,
                isFloat: r,
                isNumber: o,
                isArray: s,
                asInt: c,
                asFloat: l,
                asNumber: u,
                asBoolean: a
            })
        })
    }), provide("tfw/util/globals", function (t) {
        using("util/typevalidator", function (e) {
            function i() {
                var t, e, i = document.getElementsByTagName("meta"), n = 0;
                for (o = {}; t = i[n]; n++)/^twitter:/.test(t.name) && (e = t.name.replace(/^twitter:/, ""), o[e] = t.content)
            }

            function n(t) {
                return o[t]
            }

            function r(t) {
                return e.asBoolean(t) && (o.dnt = !0), e.asBoolean(o.dnt)
            }

            var o;
            i(), t({init: i, val: n, dnt: r})
        })
    }), provide("util/logger", function (t) {
        using("util/util", function (e) {
            function i() {
                u("info", e.toRealArray(arguments))
            }

            function n() {
                u("warn", e.toRealArray(arguments))
            }

            function r() {
                u("error", e.toRealArray(arguments))
            }

            function o(t) {
                d && (c[t] = a())
            }

            function s(t) {
                var e;
                d && (c[t] ? (e = a(), i("_twitter", t, e - c[t])) : r("timeEnd() called before time() for id: ", t))
            }

            function a() {
                return window.performance && +window.performance.now() || +new Date
            }

            function u(t, e) {
                if (window[l] && window[l][t])switch (e.length) {
                    case 1:
                        window[l][t](e[0]);
                        break;
                    case 2:
                        window[l][t](e[0], e[1]);
                        break;
                    case 3:
                        window[l][t](e[0], e[1], e[2]);
                        break;
                    case 4:
                        window[l][t](e[0], e[1], e[2], e[3]);
                        break;
                    case 5:
                        window[l][t](e[0], e[1], e[2], e[3], e[4]);
                        break;
                    default:
                        0 !== e.length && window[l].warn && window[l].warn("too many params passed to logger." + t)
                }
            }

            var l = ["con", "sole"].join(""), c = {}, d = !!~location.href.indexOf("tw_debug=true");
            t({info: i, warn: n, error: r, time: o, timeEnd: s})
        })
    }), provide("util/domready", function (t) {
        function e() {
            o = 1;
            for (var t = 0, e = s.length; e > t; t++)s[t]()
        }

        var i, n, r, o = 0, s = [], a = !1, u = document.createElement("a"), l = "DOMContentLoaded", c = "addEventListener", d = "onreadystatechange";
        /^loade|c/.test(document.readyState) && (o = 1), document[c] && document[c](l, n = function () {
            document.removeEventListener(l, n, a), e()
        }, a), u.doScroll && document.attachEvent(d, i = function () {
            /^c/.test(document.readyState) && (document.detachEvent(d, i), e())
        }), r = u.doScroll ? function (t) {
            window.self != window.top ? o ? t() : s.push(t) : !function () {
                try {
                    u.doScroll("left")
                } catch (e) {
                    return setTimeout(function () {
                        r(t)
                    }, 50)
                }
                t()
            }()
        } : function (t) {
            o ? t() : s.push(t)
        }, t(r)
    }), provide("util/env", function (t) {
        using("util/domready", "util/typevalidator", "util/logger", "tfw/util/globals", function (e, i, n, r) {
            function o(t) {
                return t = t || window, t.devicePixelRatio ? t.devicePixelRatio >= 1.5 : t.matchMedia ? t.matchMedia("only screen and (min-resolution: 144dpi)").matches : !1
            }

            function s(t) {
                return t = t || v, /(Trident|MSIE \d)/.test(t)
            }

            function a(t) {
                return t = t || v, /MSIE 6/.test(t)
            }

            function u(t) {
                return t = t || v, /MSIE 7/.test(t)
            }

            function l(t) {
                return t = t || v, /MSIE 8/.test(t)
            }

            function c(t) {
                return t = t || v, /MSIE 9/.test(t)
            }

            function d(t) {
                return t = t || v, /(iPad|iPhone|iPod)/.test(t)
            }

            function h(t) {
                return t = t || v, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(t)
            }

            function f() {
                return b
            }

            function m(t, e) {
                return t = t || window, e = e || v, t.postMessage && !(s(e) && t.opener)
            }

            function w(t) {
                t = t || navigator;
                try {
                    return !!t.plugins["Shockwave Flash"] || !!new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
                } catch (e) {
                    return !1
                }
            }

            function p(t, e, i) {
                return t = t || window, e = e || navigator, i = i || v, "ontouchstart"in t || /Opera Mini/.test(i) || e.msMaxTouchPoints > 0
            }

            function g() {
                var t = document.body.style;
                return void 0 !== t.transition || void 0 !== t.webkitTransition || void 0 !== t.mozTransition || void 0 !== t.oTransition || void 0 !== t.msTransition
            }

            var v = window.navigator.userAgent, b = !1, y = !1, _ = "twitter-csp-test";
            window.twttr = window.twttr || {}, twttr.verifyCSP = function (t) {
                var e = document.getElementById(_);
                y = !0, b = !!t, e && e.parentNode.removeChild(e)
            }, e(function () {
                var t;
                return a() || u() ? b = !1 : i.asBoolean(r.val("widgets:csp")) ? b = !0 : (t = document.createElement("script"), t.id = _, t.text = "twttr.verifyCSP(false);", document.body.appendChild(t), void window.setTimeout(function () {
                    y || (n.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'), n.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied."))
                }, 5e3))
            }), t({
                retina: o,
                anyIE: s,
                ie6: a,
                ie7: u,
                ie8: l,
                ie9: c,
                ios: d,
                android: h,
                cspEnabled: f,
                flashEnabled: w,
                canPostMessage: m,
                touch: p,
                cssTransitions: g
            })
        })
    }), provide("util/querystring", function (t) {
        function e(t) {
            return encodeURIComponent(t).replace(/\+/g, "%2B").replace(/'/g, "%27")
        }

        function i(t) {
            return decodeURIComponent(t)
        }

        function n(t) {
            var i, n = [];
            for (i in t)null !== t[i] && "undefined" != typeof t[i] && n.push(e(i) + "=" + e(t[i]));
            return n.sort().join("&")
        }

        function r(t) {
            var e, n, r, o, s = {};
            if (t)for (e = t.split("&"), o = 0; r = e[o]; o++)n = r.split("="), 2 == n.length && (s[i(n[0])] = i(n[1]));
            return s
        }

        function o(t, e) {
            var i = n(e);
            return i.length > 0 ? t.indexOf("?") >= 0 ? t + "&" + n(e) : t + "?" + n(e) : t
        }

        function s(t) {
            var e = t && t.split("?");
            return 2 == e.length ? r(e[1]) : {}
        }

        t({url: o, decodeURL: s, decode: r, encode: n, encodePart: e, decodePart: i})
    }), provide("util/params", function (t) {
        using("util/querystring", function (e) {
            var i, n, r;
            i = function (t) {
                var i = t.search.substr(1);
                return e.decode(i)
            }, n = function (t) {
                var i = t.href, n = i.indexOf("#"), r = 0 > n ? "" : i.substring(n + 1);
                return e.decode(r)
            }, r = function (t) {
                var e, r = {}, o = i(t), s = n(t);
                for (e in o)o.hasOwnProperty(e) && (r[e] = o[e]);
                for (e in s)s.hasOwnProperty(e) && (r[e] = s[e]);
                return r
            }, t({combined: r, fromQuery: i, fromFragment: n})
        })
    }), provide("tfw/util/env", function (t) {
        using("util/params", function (e) {
            function i() {
                var t = 36e5, i = e.combined(document.location)._;
                return void 0 !== n ? n : (n = !1, i && /^\d+$/.test(i) && (n = +new Date - parseInt(i) < t), n)
            }

            var n;
            t({isDynamicWidget: i})
        })
    }), provide("util/widgetrpc", function (t) {
        using("tfw/util/env", "util/env", function (e, i) {
            function n() {
                if (o)return o;
                if (e.isDynamicWidget()) {
                    var t, n = 0, r = parent.frames.length;
                    try {
                        if (o = parent.frames[u])return o
                    } catch (s) {
                    }
                    if (i.anyIE())for (; r > n; n++)try {
                        if (t = parent.frames[n], t && "function" == typeof t.openIntent)return o = t
                    } catch (s) {
                    }
                }
            }

            function r() {
                var t, i, o, a, u, h, f = {};
                if ("function" === (typeof arguments[0]).toLowerCase() ? f.success = arguments[0] : f = arguments[0], t = f.success || function () {
                    }, i = f.timeout || function () {
                    }, o = f.nohub || function () {
                    }, a = f.complete || function () {
                    }, u = void 0 !== f.attempt ? f.attempt : d, !e.isDynamicWidget() || s)return o(), a(), !1;
                h = n(), u--;
                try {
                    if (h && h.trigger)return t(h), void a()
                } catch (m) {
                }
                return 0 >= u ? (s = !0, i(), void a()) : +new Date - l > c * d ? (s = !0, void o()) : void window.setTimeout(function () {
                    r({success: t, timeout: i, nohub: o, attempt: u, complete: a})
                }, c)
            }

            var o, s, a = "twttrHubFrameSecure", u = "http:" == document.location.protocol ? "twttrHubFrame" : a, l = +new Date, c = 100, d = 20;
            t({withHub: r, contextualHubId: u, secureHubId: a})
        })
    }), provide("util/promise", function (t) {
        using("util/util", function (e) {
            var i = function (t) {
                try {
                    var e = t.then;
                    if ("function" == typeof e)return !0
                } catch (i) {
                }
                return !1
            }, n = function (t) {
                Error.call(this, t)
            };
            n.prototype = e.createObject(Error.prototype);
            var r = function () {
                var t = [];
                return t.pump = function (i) {
                    e.async(function () {
                        for (var e = t.length, n = 0; e > n;)n++, t.shift()(i)
                    })
                }, t
            }, o = function (t, n, r, o, s, a) {
                var u = !1, l = this, c = function (t) {
                    e.async(function () {
                        a("fulfilled"), o(t), n.pump(t)
                    })
                }, d = function (t) {
                    e.async(function () {
                        a("rejected"), s(t), r.pump(t)
                    })
                }, h = function (t) {
                    return i(t) ? void t.then(h, d) : void c(t)
                }, f = function (t) {
                    return function (e) {
                        u || (u = !0, t(e))
                    }
                };
                this.resolve = f(h, "resolve"), this.fulfill = f(c, "fulfill"), this.reject = f(d, "reject"), this.cancel = function () {
                    l.reject(new Error("Cancel"))
                }, this.timeout = function () {
                    l.reject(new Error("Timeout"))
                }, a("pending")
            }, s = function (t) {
                var e, i, n = new r, s = new r, a = "pending";
                this._addAcceptCallback = function (t) {
                    n.push(t), "fulfilled" == a && n.pump(e)
                }, this._addRejectCallback = function (t) {
                    s.push(t), "rejected" == a && s.pump(i)
                };
                var u = new o(this, n, s, function (t) {
                    e = t
                }, function (t) {
                    i = t
                }, function (t) {
                    a = t
                });
                try {
                    t && t(u)
                } catch (l) {
                    u.reject(l)
                }
            }, a = function (t) {
                return "function" == typeof t
            }, u = function (t, i, n) {
                return a(t) ? function () {
                    try {
                        var e = t.apply(null, arguments);
                        i.resolve(e)
                    } catch (n) {
                        i.reject(n)
                    }
                } : e.bind(i[n], i)
            }, l = function (t, e, i) {
                return a(t) && i._addAcceptCallback(t), a(e) && i._addRejectCallback(e), i
            };
            e.aug(s.prototype, {
                then: function (t, e) {
                    var i = this;
                    return new s(function (n) {
                        l(u(t, n, "resolve"), u(e, n, "reject"), i)
                    })
                }, "catch": function (t) {
                    var e = this;
                    return new s(function (i) {
                        l(null, u(t, i, "reject"), e)
                    })
                }
            }), s.isThenable = i;
            var c = function (t) {
                return e.map(t, s.resolve)
            };
            s.any = function () {
                var t = c(arguments);
                return new s(function (i) {
                    if (t.length) {
                        var n = !1, r = function (t) {
                            n || (n = !0, i.resolve(t))
                        }, o = function (t) {
                            n || (n = !0, i.reject(t))
                        };
                        e.forEach(t, function (t) {
                            t.then(r, o)
                        })
                    } else i.reject("No futures passed to Promise.any()")
                })
            }, s.every = function () {
                var t = c(arguments);
                return new s(function (i) {
                    if (t.length) {
                        var n = new Array(t.length), r = 0, o = function (e, o) {
                            r++, n[e] = o, r == t.length && i.resolve(n)
                        };
                        e.forEach(t, function (t, n) {
                            t.then(e.bind(o, null, [n]), i.reject)
                        })
                    } else i.reject("No futures passed to Promise.every()")
                })
            }, s.some = function () {
                var t = c(arguments);
                return new s(function (i) {
                    if (t.length) {
                        var n = 0, r = function () {
                            n++, n == t.length && i.reject()
                        };
                        e.forEach(t, function (t) {
                            t.then(i.resolve, r)
                        })
                    } else i.reject("No futures passed to Promise.some()")
                })
            }, s.fulfill = function (t) {
                return new s(function (e) {
                    e.fulfill(t)
                })
            }, s.resolve = function (t) {
                return new s(function (e) {
                    e.resolve(t)
                })
            }, s.reject = function (t) {
                return new s(function (e) {
                    e.reject(t)
                })
            }, t(s)
        })
    }), provide("util/layout", function (t) {
        using("util/promise", function (e) {
            function i() {
            }

            var n, r = [];
            i.prototype.enqueue = function (t, i) {
                return new e(function (e) {
                    r.push({action: t, resolver: e, note: i})
                })
            }, i.prototype.exec = function () {
                var t, e = r;
                if (e.length)for (r = []; e.length;)t = e.shift(), t && t.action ? t.resolver.fulfill(t.action()) : t.resolver.reject()
            }, i.prototype.delayedExec = function () {
                n && window.clearTimeout(n), n = window.setTimeout(this.exec, 100)
            }, t(i)
        })
    }), provide("util/iframe", function (t) {
        using("util/util", function (e) {
            t(function (t, i, n) {
                var r;
                if (n = n || document, t = t || {}, i = i || {}, t.name) {
                    try {
                        r = n.createElement('<iframe name="' + t.name + '"></iframe>')
                    } catch (o) {
                        r = n.createElement("iframe"), r.name = t.name
                    }
                    delete t.name
                } else r = n.createElement("iframe");
                return t.id && (r.id = t.id, delete t.id), r.allowtransparency = "true", r.scrolling = "no", r.setAttribute("frameBorder", 0), r.setAttribute("allowTransparency", !0), e.forIn(t, function (t, e) {
                    r.setAttribute(t, e)
                }), e.forIn(i, function (t, e) {
                    r.style[t] = e
                }), r
            })
        })
    }), provide("dom/get", function (t) {
        using("util/util", function (e) {
            function i(t, e, i) {
                return r(t, e, i, 1)[0]
            }

            function n(t, i, r) {
                var o, s = i && i.parentNode;
                if (s && s !== r)return s.tagName == t ? s : (o = s.className.split(" "), 0 === t.indexOf(".") && ~e.indexOf(o, t.slice(1)) ? s : n(t, s, r))
            }

            var r = function () {
                var t = document.getElementsByClassName;
                return e.isNative(t) ? function (i, n, r, o) {
                    var s = n ? n.getElementsByClassName(i) : t.call(document, i), a = e.filter(s, function (t) {
                        return !r || t.tagName.toLowerCase() == r.toLowerCase()
                    });
                    return [].slice.call(a, 0, o || a.length)
                } : function (t, i, n, r) {
                    var o, s, a, u, l, c, d, h, f = [];
                    for (i = i || document, a = t.split(" "), c = a.length, o = i.getElementsByTagName(n || "*"), h = o.length, l = 0; c > l && h > 0; l++) {
                        for (f = [], u = a[l], d = 0; h > d && (s = o[d], ~e.indexOf(s.className.split(" "), u) && f.push(s), l + 1 != c || f.length !== r); d++);
                        o = f, h = o.length
                    }
                    return f
                }
            }();
            t({all: r, one: i, ancestor: n})
        })
    }), provide("tfw/widget/base", function (t) {
        using("dom/get", "util/domready", "util/iframe", "util/layout", "util/promise", "util/querystring", "util/typevalidator", "util/util", "tfw/util/globals", "util/logger", function (e, i, n, r, o, s, a, u, l, c) {
            function d(t) {
                var e;
                t && (t.ownerDocument ? (this.srcEl = t, this.classAttr = t.className.split(" ")) : (this.srcOb = t, this.classAttr = []), e = this.params(), this.id = this.generateId(), this.setLanguage(), this.related = e.related || this.dataAttr("related"), this.partner = e.partner || this.dataAttr("partner") || l.val("partner"), this.dnt = e.dnt || this.dataAttr("dnt") || l.dnt() || "", this.styleAttr = [], this.targetEl = t.targetEl, p[this.id] = this, this.completePromise = new o(u.bind(function (t) {
                    this.completeResolver = t
                }, this)), this.completed().then(function (t) {
                    t && t != document.body && twttr.events.trigger("rendered", {target: t})
                }))
            }

            function h() {
                u.forEach(g, function (t) {
                    t()
                }), d.doLayout()
            }

            function f(t) {
                return t ? t.lang ? t.lang : f(t.parentNode) : void 0
            }

            var m, w = 0, p = {}, g = [], v = new r, b = "data-twttr-rendered", y = {
                ar: {
                    "%{followers_count} followers": "عدد المتابعين %{followers_count}",
                    "100K+": "+100 ألف",
                    "10k unit": "10 آلاف وحدة",
                    Follow: "تابِع",
                    "Follow %{screen_name}": "تابِع %{screen_name}",
                    K: "ألف",
                    M: "م",
                    Tweet: "غرِّد",
                    "Tweet %{hashtag}": "غرِّد %{hashtag}",
                    "Tweet to %{name}": "غرِّد لـ %{name}"
                },
                bn: {"Follow %{screen_name}": "%{screen_name}-কে অনুসরণ করুন"},
                cs: {"Follow %{screen_name}": "Sledovat uživatele %{screen_name}"},
                da: {
                    "%{followers_count} followers": "%{followers_count} følgere",
                    "10k unit": "10k enhed",
                    Follow: "Følg",
                    "Follow %{screen_name}": "Følg %{screen_name}",
                    "Tweet to %{name}": "Tweet til %{name}"
                },
                de: {
                    "%{followers_count} followers": "%{followers_count} Follower",
                    "100K+": "100Tsd+",
                    "10k unit": "10tsd-Einheit",
                    Follow: "Folgen",
                    "Follow %{screen_name}": "%{screen_name} folgen",
                    K: "Tsd",
                    Tweet: "Twittern",
                    "Tweet to %{name}": "Tweet an %{name}"
                },
                es: {
                    "%{followers_count} followers": "%{followers_count} seguidores",
                    "10k unit": "unidad de 10 mil",
                    Follow: "Seguir",
                    "Follow %{screen_name}": "Seguir a %{screen_name}",
                    Tweet: "Twittear",
                    "Tweet %{hashtag}": "Twittear %{hashtag}",
                    "Tweet to %{name}": "Twittear a %{name}"
                },
                fa: {
                    "%{followers_count} followers": "%{followers_count} دنبال‌کننده",
                    "100K+": ">۱۰۰هزار",
                    "10k unit": "۱۰هزار واحد",
                    Follow: "دنبال کردن",
                    "Follow %{screen_name}": "دنبال کردن %{screen_name}",
                    K: "هزار",
                    M: "میلیون",
                    Tweet: "توییت",
                    "Tweet %{hashtag}": "توییت کردن %{hashtag}",
                    "Tweet to %{name}": "به %{name} توییت کنید"
                },
                fi: {
                    "%{followers_count} followers": "%{followers_count} seuraajaa",
                    "100K+": "100 000+",
                    "10k unit": "10 000 yksikköä",
                    Follow: "Seuraa",
                    "Follow %{screen_name}": "Seuraa käyttäjää %{screen_name}",
                    K: "tuhatta",
                    M: "milj.",
                    Tweet: "Twiittaa",
                    "Tweet %{hashtag}": "Twiittaa %{hashtag}",
                    "Tweet to %{name}": "Twiittaa käyttäjälle %{name}"
                },
                fil: {
                    "%{followers_count} followers": "%{followers_count} mga tagasunod",
                    "10k unit": "10k yunit",
                    Follow: "Sundan",
                    "Follow %{screen_name}": "Sundan si %{screen_name}",
                    Tweet: "I-tweet",
                    "Tweet %{hashtag}": "I-tweet ang %{hashtag}",
                    "Tweet to %{name}": "Mag-Tweet kay %{name}"
                },
                fr: {
                    "%{followers_count} followers": "%{followers_count} abonnés",
                    "10k unit": "unité de 10k",
                    Follow: "Suivre",
                    "Follow %{screen_name}": "Suivre %{screen_name}",
                    Tweet: "Tweeter",
                    "Tweet %{hashtag}": "Tweeter %{hashtag}",
                    "Tweet to %{name}": "Tweeter à %{name}"
                },
                he: {
                    "%{followers_count} followers": "%{followers_count} עוקבים",
                    "100K+": "מאות אלפים",
                    "10k unit": "עשרות אלפים",
                    Follow: "מעקב",
                    "Follow %{screen_name}": "לעקוב אחר %{screen_name}",
                    K: "אלף",
                    M: "מיליון",
                    Tweet: "ציוץ",
                    "Tweet %{hashtag}": "צייצו %{hashtag}",
                    "Tweet to %{name}": "ציוץ אל %{name}"
                },
                hi: {
                    "%{followers_count} followers": "%{followers_count} फ़ॉलोअर्स",
                    "100K+": "1 लाख से अधिक",
                    "10k unit": "10 हजार इकाईयां",
                    Follow: "फ़ॉलो",
                    "Follow %{screen_name}": "%{screen_name} को फ़ॉलो करें",
                    K: "हजार",
                    M: "मिलियन",
                    Tweet: "ट्वीट",
                    "Tweet %{hashtag}": "ट्वीट %{hashtag}",
                    "Tweet to %{name}": "%{name} के प्रति ट्वीट करें"
                },
                hu: {
                    "%{followers_count} followers": "%{followers_count} követő",
                    "100K+": "100E+",
                    "10k unit": "10E+",
                    Follow: "Követés",
                    "Follow %{screen_name}": "%{screen_name} követése",
                    K: "E",
                    "Tweet %{hashtag}": "%{hashtag} tweetelése",
                    "Tweet to %{name}": "Tweet küldése neki: %{name}"
                },
                id: {
                    "%{followers_count} followers": "%{followers_count} pengikut",
                    "100K+": "100 ribu+",
                    "10k unit": "10 ribu unit",
                    Follow: "Ikuti",
                    "Follow %{screen_name}": "Ikuti %{screen_name}",
                    K: "&nbsp;ribu",
                    M: "&nbsp;juta",
                    "Tweet to %{name}": "Tweet ke %{name}"
                },
                it: {
                    "%{followers_count} followers": "%{followers_count} follower",
                    "10k unit": "10k unità",
                    Follow: "Segui",
                    "Follow %{screen_name}": "Segui %{screen_name}",
                    "Tweet %{hashtag}": "Twitta %{hashtag}",
                    "Tweet to %{name}": "Twitta a %{name}"
                },
                ja: {
                    "%{followers_count} followers": "%{followers_count}人のフォロワー",
                    "100K+": "100K以上",
                    "10k unit": "万",
                    Follow: "フォローする",
                    "Follow %{screen_name}": "%{screen_name}さんをフォロー",
                    Tweet: "ツイート",
                    "Tweet %{hashtag}": "%{hashtag} をツイートする",
                    "Tweet to %{name}": "%{name}さんへツイートする"
                },
                ko: {
                    "%{followers_count} followers": "%{followers_count}명의 팔로워",
                    "100K+": "100만 이상",
                    "10k unit": "만 단위",
                    Follow: "팔로우",
                    "Follow %{screen_name}": "%{screen_name} 님 팔로우하기",
                    K: "천",
                    M: "백만",
                    Tweet: "트윗",
                    "Tweet %{hashtag}": "%{hashtag} 관련 트윗하기",
                    "Tweet to %{name}": "%{name} 님에게 트윗하기"
                },
                msa: {
                    "%{followers_count} followers": "%{followers_count} pengikut",
                    "100K+": "100 ribu+",
                    "10k unit": "10 ribu unit",
                    Follow: "Ikut",
                    "Follow %{screen_name}": "Ikut %{screen_name}",
                    K: "ribu",
                    M: "juta",
                    "Tweet to %{name}": "Tweet kepada %{name}"
                },
                nl: {
                    "%{followers_count} followers": "%{followers_count} volgers",
                    "100K+": "100k+",
                    "10k unit": "10k-eenheid",
                    Follow: "Volgen",
                    "Follow %{screen_name}": "%{screen_name} volgen",
                    K: "k",
                    M: " mln.",
                    Tweet: "Tweeten",
                    "Tweet %{hashtag}": "%{hashtag} tweeten",
                    "Tweet to %{name}": "Tweeten naar %{name}"
                },
                no: {
                    "%{followers_count} followers": "%{followers_count} følgere",
                    "100K+": "100 K+",
                    "10k unit": "10-K-enhet",
                    Follow: "Følg",
                    "Follow %{screen_name}": "Følg %{screen_name}",
                    "Tweet to %{name}": "Send en tweet til %{name}"
                },
                pl: {
                    "%{followers_count} followers": "%{followers_count} obserwujących",
                    "100K+": "100 tys.+",
                    "10k unit": "10 tys.",
                    Follow: "Obserwuj",
                    "Follow %{screen_name}": "Obserwuj %{screen_name}",
                    K: "tys.",
                    M: "mln",
                    Tweet: "Tweetnij",
                    "Tweet %{hashtag}": "Tweetnij %{hashtag}",
                    "Tweet to %{name}": "Tweetnij do %{name}"
                },
                pt: {
                    "%{followers_count} followers": "%{followers_count} seguidores",
                    "100K+": "+100 mil",
                    "10k unit": "10 mil unidades",
                    Follow: "Seguir",
                    "Follow %{screen_name}": "Seguir %{screen_name}",
                    K: "Mil",
                    Tweet: "Tweetar",
                    "Tweet %{hashtag}": "Tweetar %{hashtag}",
                    "Tweet to %{name}": "Tweetar para %{name}"
                },
                ro: {"Follow %{screen_name}": "Urmăreşte pe %{screen_name}"},
                ru: {
                    "%{followers_count} followers": "Читатели: %{followers_count} ",
                    "100K+": "100 тыс.+",
                    "10k unit": "блок 10k",
                    Follow: "Читать",
                    "Follow %{screen_name}": "Читать %{screen_name}",
                    K: "тыс.",
                    M: "млн.",
                    Tweet: "Твитнуть",
                    "Tweet %{hashtag}": "Твитнуть %{hashtag}",
                    "Tweet to %{name}": "Твитнуть %{name}"
                },
                sv: {
                    "%{followers_count} followers": "%{followers_count} följare",
                    "10k unit": "10k",
                    Follow: "Följ",
                    "Follow %{screen_name}": "Följ %{screen_name}",
                    Tweet: "Tweeta",
                    "Tweet %{hashtag}": "Tweeta %{hashtag}",
                    "Tweet to %{name}": "Tweeta till %{name}"
                },
                th: {
                    "%{followers_count} followers": "%{followers_count} ผู้ติดตาม",
                    "100K+": "100พัน+",
                    "10k unit": "หน่วย 10พัน",
                    Follow: "ติดตาม",
                    "Follow %{screen_name}": "ติดตาม %{screen_name}",
                    M: "ล้าน",
                    Tweet: "ทวีต",
                    "Tweet %{hashtag}": "ทวีต %{hashtag}",
                    "Tweet to %{name}": "ทวีตถึง %{name}"
                },
                tr: {
                    "%{followers_count} followers": "%{followers_count} takipçi",
                    "100K+": "+100 bin",
                    "10k unit": "10 bin birim",
                    Follow: "Takip et",
                    "Follow %{screen_name}": "Takip et: %{screen_name}",
                    K: "bin",
                    M: "milyon",
                    Tweet: "Tweetle",
                    "Tweet %{hashtag}": "Tweetle: %{hashtag}",
                    "Tweet to %{name}": "Tweetle: %{name}"
                },
                uk: {"Follow %{screen_name}": "Читати %{screen_name}"},
                ur: {
                    "%{followers_count} followers": "%{followers_count} فالورز",
                    "100K+": "ایک لاکھ سے زیادہ",
                    "10k unit": "دس ہزار یونٹ",
                    Follow: "فالو کریں",
                    "Follow %{screen_name}": "%{screen_name} کو فالو کریں",
                    K: "ہزار",
                    M: "ملین",
                    Tweet: "ٹویٹ کریں",
                    "Tweet %{hashtag}": "%{hashtag} ٹویٹ کریں",
                    "Tweet to %{name}": "%{name} کو ٹویٹ کریں"
                },
                vi: {"Follow %{screen_name}": "Theo dõi %{screen_name}"},
                "zh-cn": {
                    "%{followers_count} followers": "%{followers_count} 关注者",
                    "100K+": "10万+",
                    "10k unit": "1万单元",
                    Follow: "关注",
                    "Follow %{screen_name}": "关注 %{screen_name}",
                    K: "千",
                    M: "百万",
                    Tweet: "发推",
                    "Tweet %{hashtag}": "以 %{hashtag} 发推",
                    "Tweet to %{name}": "发推给 %{name}"
                },
                "zh-tw": {
                    "%{followers_count} followers": "%{followers_count} 位跟隨者",
                    "100K+": "超過十萬",
                    "10k unit": "1萬 單位",
                    Follow: "跟隨",
                    "Follow %{screen_name}": "跟隨 %{screen_name}",
                    K: "千",
                    M: "百萬",
                    Tweet: "推文",
                    "Tweet %{hashtag}": "推文%{hashtag}",
                    "Tweet to %{name}": "推文給%{name}"
                }
            };
            u.aug(d.prototype, {
                setLanguage: function (t) {
                    var e;
                    return t || (t = this.params().lang || this.dataAttr("lang") || f(this.srcEl)), (t = t && t.toLowerCase()) ? y[t] ? this.lang = t : (e = t.replace(/[\-_].*/, ""), y[e] ? this.lang = e : void(this.lang = "en")) : this.lang = "en"
                },
                _: function (t, e) {
                    var i = this.lang;
                    return e = e || {}, i && y.hasOwnProperty(i) || (i = this.lang = "en"), t = y[i] && y[i][t] || t, this.ringo(t, e, /%\{([\w_]+)\}/g)
                },
                ringo: function (t, e, i) {
                    return i = i || /\{\{([\w_]+)\}\}/g, t.replace(i, function (t, i) {
                        return void 0 !== e[i] ? e[i] : t
                    })
                },
                makeIframeSource: function () {
                    if (this.iframeSource) {
                        var t = s.encode(this.widgetUrlParams());
                        return [twttr.widgets.config.assetUrl(), this.ringo(this.iframeSource, {lang: this.lang}), "#", t].join("")
                    }
                },
                add: function (t) {
                    p[this.id] = t
                },
                create: function (t, e, i) {
                    var r, s = this;
                    return i[b] = !0, r = n(u.aug({
                        id: this.id,
                        src: t,
                        "class": this.classAttr.join(" ")
                    }, i), e, this.targetEl && this.targetEl.ownerDocument), this.srcEl ? this.layout(function () {
                        return s.srcEl.parentNode.replaceChild(r, s.srcEl), s.completeResolver.fulfill(r), r
                    }) : this.targetEl ? this.layout(function () {
                        return s.targetEl.appendChild(r), s.completeResolver.fulfill(r), r
                    }) : o.reject("Did not append widget")
                },
                params: function () {
                    var t, e;
                    return this.srcOb ? e = this.srcOb : (t = this.srcEl && this.srcEl.href && this.srcEl.href.split("?")[1], e = t ? s.decode(t) : {}), this.params = function () {
                        return e
                    }, e
                },
                widgetUrlParams: function () {
                    return {}
                },
                dataAttr: function (t) {
                    return this.srcEl && this.srcEl.getAttribute("data-" + t)
                },
                attr: function (t) {
                    return this.srcEl && this.srcEl.getAttribute(t)
                },
                layout: function (t) {
                    return v.enqueue(t)
                },
                styles: {
                    base: [["font", "normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"], ["margin", "0"], ["padding", "0"], ["whiteSpace", "nowrap"]],
                    button: [["fontWeight", "bold"], ["textShadow", "0 1px 0 rgba(255,255,255,.5)"]],
                    large: [["fontSize", "13px"], ["lineHeight", "26px"]],
                    vbubble: [["fontSize", "16px"]]
                },
                width: function () {
                    throw new Error(name + " not implemented")
                },
                height: function () {
                    return "m" == this.size ? 20 : 28
                },
                minWidth: function () {
                },
                maxWidth: function () {
                },
                minHeight: function () {
                },
                maxHeight: function () {
                },
                dimensions: function () {
                    function t(t) {
                        switch (typeof t) {
                            case"string":
                                return t;
                            case"undefined":
                                return;
                            default:
                                return t + "px"
                        }
                    }

                    var e = {width: this.width(), height: this.height()};
                    return this.minWidth() && (e["min-width"] = this.minWidth()), this.maxWidth() && (e["max-width"] = this.maxWidth()), this.minHeight() && (e["min-height"] = this.minHeight()), this.maxHeight() && (e["max-height"] = this.maxHeight()), u.forIn(e, function (i, n) {
                        e[i] = t(n)
                    }), e
                },
                generateId: function () {
                    return this.srcEl && this.srcEl.id || "twitter-widget-" + w++
                },
                completed: function () {
                    return this.completePromise
                }
            }), d.afterLoad = function (t) {
                g.push(t)
            }, d.doLayout = function () {
                v.exec()
            }, d.doLayoutAsync = function () {
                v.delayedExec()
            }, d.init = function (t) {
                m = t
            }, d.reset = function () {
                p = {}
            }, d.find = function (t) {
                return t && p[t] ? p[t].element : null
            }, d.embed = function (t) {
                var i = m.widgets, n = [], r = [], s = [];
                a.isArray(t) || (t = [t || document]), c.time("sandboxes"), u.forEach(t, function (t) {
                    u.forIn(i, function (i, r) {
                        var o, a;
                        i.match(/\./) ? (o = i.split("."), a = e.all(o[1], t, o[0])) : a = t.getElementsByTagName(i), u.forEach(a, function (t) {
                            var e;
                            t.getAttribute(b) || (t.setAttribute(b, "true"), e = new r(t), n.push(e), s.push(e.sandboxCreated))
                        })
                    })
                }), o.every.apply(null, s).then(function () {
                    c.timeEnd("sandboxes")
                }), d.doLayout(), u.forEach(n, function (t) {
                    r.push(t.completed()), t.render(m)
                }), o.every.apply(null, r).then(function (t) {
                    t = u.filter(t, function (t) {
                        return t
                    }), t.length && (twttr.events.trigger("loaded", {widgets: t}), c.timeEnd("load"))
                }), d.doLayoutAsync(), h()
            }, window.setInterval(function () {
                d.doLayout()
            }, 500), t(d)
        })
    }), provide("xd/json2", function (exports) {
        function f(t) {
            return 10 > t ? "0" + t : t
        }

        function quote(t) {
            return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) {
                var e = meta[t];
                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + t + '"'
        }

        function str(t, e) {
            var i, n, r, o, s, a = gap, u = e[t];
            switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(t)), "function" == typeof rep && (u = rep.call(e, t, u)), typeof u) {
                case"string":
                    return quote(u);
                case"number":
                    return isFinite(u) ? String(u) : "null";
                case"boolean":
                case"null":
                    return String(u);
                case"object":
                    if (!u)return "null";
                    if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(u)) {
                        for (o = u.length, i = 0; o > i; i += 1)s[i] = str(i, u) || "null";
                        return r = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]", gap = a, r
                    }
                    if (rep && "object" == typeof rep)for (o = rep.length, i = 0; o > i; i += 1)n = rep[i], "string" == typeof n && (r = str(n, u), r && s.push(quote(n) + (gap ? ": " : ":") + r)); else for (n in u)Object.hasOwnProperty.call(u, n) && (r = str(n, u), r && s.push(quote(n) + (gap ? ": " : ":") + r));
                    return r = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}", gap = a, r
            }
        }

        window.JSON || (window.JSON = {}), "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
        "function" != typeof JSON.stringify && (JSON.stringify = function (t, e, i) {
            var n;
            if (gap = "", indent = "", "number" == typeof i)for (n = 0; i > n; n += 1)indent += " "; else"string" == typeof i && (indent = i);
            if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length))throw new Error("JSON.stringify");
            return str("", {"": t})
        }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
            function walk(t, e) {
                var i, n, r = t[e];
                if (r && "object" == typeof r)for (i in r)Object.hasOwnProperty.call(r, i) && (n = walk(r, i), void 0 !== n ? r[i] = n : delete r[i]);
                return reviver.call(t, e, r)
            }

            var j;
            if (cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
                    return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({"": j}, "") : j;
            throw new SyntaxError("JSON.parse")
        }), exports(JSON)
    }), provide("util/events", function (t) {
        using("util/util", function (e) {
            var i = {
                bind: function (t, e) {
                    return this._handlers = this._handlers || {}, this._handlers[t] = this._handlers[t] || [], this._handlers[t].push(e)
                }, unbind: function (t, i) {
                    if (this._handlers[t])if (i) {
                        var n = e.indexOf(this._handlers[t], i);
                        n >= 0 && this._handlers[t].splice(n, 1)
                    } else this._handlers[t] = []
                }, trigger: function (t, i) {
                    var n = this._handlers && this._handlers[t];
                    i = i || {}, i.type = t, e.forEach(n, function (t) {
                        e.async(e.bind(t, this, [i]))
                    })
                }
            };
            t({Emitter: i})
        })
    }), provide("xd/jsonrpc", function (t) {
        using("util/util", "util/events", "xd/json2", function (e, i) {
            function n(t) {
                return (JSON.parse || JSON.decode)(t)
            }

            function r(t) {
                this.con = t
            }

            function o() {
                this.id = o.id++
            }

            e.aug(r.prototype, {
                expose: function (t) {
                    this.con.bind("message", this._handleRequest(t))
                }, call: function (t) {
                    var e, i = this;
                    return this._requests || (this._requests = {}, this.con.bind("message", function (t) {
                        var e;
                        try {
                            t = n(t)
                        } catch (r) {
                            return
                        }
                        t.callback && "number" == typeof t.id && (e = i._requests[t.id]) && (t.error ? e.trigger("error", t) : e.trigger("success", t), delete i._requests[t.id])
                    })), e = new o, this._requests[e.id] = e, e.send(this.con, t, Array.prototype.slice.call(arguments, 1))
                }, _handleRequest: function (t) {
                    var e = this;
                    return function (i) {
                        var r, o;
                        try {
                            i = n(i)
                        } catch (s) {
                            return
                        }
                        i.callback || "number" == typeof i.id && "function" == typeof t[i.method] && (o = e._responseCallbacks(i.id), r = t[i.method].apply(t, i.params.concat(o)), "undefined" != typeof r && o[0](r))
                    }
                }, _responseCallbacks: function (t) {
                    var e = this.con;
                    return [function (i) {
                        e.send(JSON.stringify({id: t, result: i, callback: !0}))
                    }, function i(n) {
                        e.send(JSON.stringify({id: t, error: i, callback: n}))
                    }]
                }
            }), o.id = 0, e.aug(o.prototype, i.Emitter, {
                send: function (t, e, i) {
                    return t.send(JSON.stringify({id: this.id, method: e, params: i})), this
                }, success: function (t) {
                    return this.bind("success", t), this
                }, error: function (t) {
                    return this.bind("error", t), this
                }
            }), t(function (t) {
                return new r(t)
            })
        })
    }), provide("xd/flash", function (t) {
        function e(t, e) {
            var i = e || Math.floor(100 * Math.random()), n = ['<object id="xdflashshim' + i + '" name="xdflashshim' + i + '"', 'type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"', 'width="1" height="1" style="position:absolute;left:-9999px;top:-9999px;">', '<param name="movie" value="' + t + "&debug=" + window.__XDDEBUG__ + '">', '<param name="wmode" value="window">', '<param name="allowscriptaccess" value="always">', "</object>"].join(" ");
            return n
        }

        t({object: e})
    }), provide("xd/base", function (t) {
        using("util/util", "util/events", function (e, i) {
            function n() {
            }

            e.aug(n.prototype, i.Emitter, {
                transportMethod: "", init: function () {
                }, send: function (t) {
                    var e;
                    this._ready ? this._performSend(t) : e = this.bind("ready", function () {
                        this.unbind("ready", e), this._performSend(t)
                    })
                }, ready: function () {
                    this.trigger("ready", this), this._ready = !0
                }, isReady: function () {
                    return !!this._ready
                }, receive: function (t) {
                    this.trigger("message", t)
                }
            }), t({Connection: n})
        })
    }), provide("xd/parent", function (t) {
        using("xd/base", "util/util", "util/env", function (e, i, n) {
            function r(t) {
                var e = [];
                return i.forIn(t, function (t, i) {
                    e.push(t + "=" + i)
                }), e.join(",")
            }

            function o() {
            }

            function s(t) {
                this.transportMethod = "PostMessage", this.options = t, this._createChild()
            }

            function a(t) {
                this.transportMethod = "Flash", this.options = t, this.token = Math.random().toString(16).substring(2), this._setup()
            }

            function u(t) {
                this.transportMethod = "Fallback", this.options = t, this._createChild()
            }

            var l, c = "__ready__", d = 0;
            o.prototype = new e.Connection, i.aug(o.prototype, {
                _createChild: function () {
                    this.options.window ? this._createWindow() : this._createIframe()
                }, _createIframe: function () {
                    function t() {
                        s.child = e.contentWindow, s._ready || s.init()
                    }

                    var e, n, r, o, s = this, a = {
                        allowTransparency: !0,
                        frameBorder: "0",
                        scrolling: "no",
                        tabIndex: "0",
                        name: this._name()
                    }, u = i.aug(i.aug({}, a), this.options.iframe), c = !1;
                    window.postMessage ? (l || (l = document.createElement("iframe")), e = l.cloneNode(!1)) : e = document.createElement('<iframe name="' + u.name + '">'), e.id = u.name, i.forIn(u, function (t, i) {
                        "style" != t && e.setAttribute(t, i)
                    }), o = e.getAttribute("style"), o && "undefined" != typeof o.cssText ? o.cssText = u.style : e.style.cssText = u.style, e.addEventListener ? e.addEventListener("load", t, !1) : e.attachEvent("onload", function () {
                        c || (c = !0, t())
                    }), e.src = this._source(), (n = this.options.appendTo) ? n.appendChild(e) : (r = this.options.replace) ? (n = r.parentNode, n && n.replaceChild(e, r)) : document.body.insertBefore(e, document.body.firstChild)
                }, _createWindow: function () {
                    var t, e = {
                        width: 550,
                        height: 450,
                        personalbar: "0",
                        toolbar: "0",
                        scrollbars: "1",
                        resizable: "1"
                    }, n = i.aug(i.aug({}, e), this.options.window), o = screen.width, s = screen.height, a = this._name();
                    n.left = n.left || Math.round(o / 2 - n.width / 2), n.top = n.top || Math.round(s / 2 - n.height / 2), s < n.height && (n.top = 0, n.height = s), t = window.open(this._source(), a, r(n)), t && t.focus(), this.child = t, this.init()
                }, _source: function () {
                    return this.options.src
                }, _name: function () {
                    var t = "_xd_" + d++;
                    return window.parent && window.parent != window && window.name && (t = window.name + t), t
                }
            }), s.prototype = new o, i.aug(s.prototype, {
                init: function () {
                    function t(t) {
                        t.source === e.child && (e._ready || t.data !== c ? e.receive(t.data) : e.ready())
                    }

                    var e = this;
                    window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent("onmessage", t)
                }, _performSend: function (t) {
                    this.child.postMessage(t, this.options.src)
                }
            }), a.prototype = new o, i.aug(a.prototype, {
                _setup: function () {
                    var t = this;
                    using("xd/flash", function (e) {
                        window["__xdcb" + t.token] = {
                            receive: function (e) {
                                t._ready || e !== c ? t.receive(e) : t.ready()
                            }, loaded: function () {
                            }
                        };
                        var i = document.createElement("div");
                        i.innerHTML = e.object("https://platform.twitter.com/xd/ft.swf?&token=" + t.token + "&parent=true&callback=__xdcb" + t.token + "&xdomain=" + t._host(), t.token), document.body.insertBefore(i, document.body.firstChild), t.proxy = i.firstChild, t._createChild()
                    })
                }, init: function () {
                }, _performSend: function (t) {
                    this.proxy.send(t)
                }, _host: function () {
                    return this.options.src.replace(/https?:\/\//, "").split(/(:|\/)/)[0]
                }, _source: function () {
                    return this.options.src + (this.options.src.match(/\?/) ? "&" : "?") + "xd_token=" + window.escape(this.token)
                }
            }), u.prototype = new o, i.aug(u.prototype, {
                init: function () {
                }, _performSend: function () {
                }
            }), t({
                connect: function (t) {
                    return !n.canPostMessage() || n.anyIE() && t.window ? n.anyIE() && n.flashEnabled() ? new a(t) : new u(t) : new s(t)
                }
            })
        })
    }), provide("tfw/hub/client", function (t) {
        using("xd/parent", "xd/jsonrpc", "tfw/widget/base", "util/widgetrpc", function (e, i, n, r) {
            function o(t, r) {
                var o = e.connect({
                    src: t,
                    iframe: {name: r, style: "position:absolute;top:-9999em;width:10px;height:10px"}
                });
                return i(o).expose({
                    trigger: function (t, e, i) {
                        e = e || {};
                        var r = e.region;
                        delete e.region, twttr.events.trigger(t, {target: n.find(i), data: e, region: r, type: t})
                    }, initXPHub: function () {
                        a(twttr.widgets.config, !0)
                    }
                }), o
            }

            function s(t) {
                return t ? r.secureHubId : r.contextualHubId
            }

            function a(t, e) {
                var i = t.assetUrl(e) + "/widgets/hub.1c5a573e465d84666458a45e49b0a735.html", n = s(e);
                if (!document.getElementById(n))return o(i, n)
            }

            function u(t, n) {
                var r = e.connect({window: {width: 550, height: 450}, src: t});
                i(r).expose({
                    trigger: function (t, e) {
                        twttr.events.trigger(t, {target: n, region: "intent", type: t, data: e})
                    }
                })
            }

            t({init: a, openIntent: u})
        })
    }), provide("util/twitter", function (t) {
        using("util/querystring", function (e) {
            function i(t) {
                return "string" == typeof t && h.test(t) && RegExp.$1.length <= 20
            }

            function n(t) {
                return i(t) ? RegExp.$1 : void 0
            }

            function r(t, i) {
                var r = e.decodeURL(t);
                return i = i || !1, r.screen_name = n(t), r.screen_name ? e.url("https://twitter.com/intent/" + (i ? "follow" : "user"), r) : void 0
            }

            function o(t) {
                return r(t, !0)
            }

            function s(t) {
                return "string" == typeof t && p.test(t)
            }

            function a(t, e) {
                return e = void 0 === e ? !0 : e, s(t) ? (e ? "#" : "") + RegExp.$1 : void 0
            }

            function u(t) {
                return "string" == typeof t && f.test(t)
            }

            function l(t) {
                return u(t) && RegExp.$1
            }

            function c(t) {
                return m.test(t)
            }

            function d(t) {
                return w.test(t)
            }

            var h = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i, f = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i, m = /^http(s?):\/\/(\w+\.)*twitter\.com([\:\/]|$)/i, w = /^http(s?):\/\/pbs\.twimg\.com\//, p = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/;
            t({
                isHashTag: s,
                hashTag: a,
                isScreenName: i,
                screenName: n,
                isStatus: u,
                status: l,
                intentForProfileURL: r,
                intentForFollowURL: o,
                isTwitterURL: c,
                isTwimgURL: d,
                regexen: {profile: h}
            })
        })
    }), provide("util/uri", function (t) {
        using("util/querystring", "util/util", "util/twitter", function (e, i, n) {
            function r(t, e) {
                var i, n;
                return e = e || location, /^https?:\/\//.test(t) ? t : /^\/\//.test(t) ? e.protocol + t : (i = e.host + (e.port.length ? ":" + e.port : ""), 0 !== t.indexOf("/") && (n = e.pathname.split("/"), n.pop(), n.push(t), t = "/" + n.join("/")), [e.protocol, "//", i, t].join(""))
            }

            function o() {
                for (var t, e = document.getElementsByTagName("link"), i = 0; t = e[i]; i++)if ("canonical" == t.rel)return r(t.href)
            }

            function s() {
                for (var t, e, i, r = document.getElementsByTagName("a"), o = document.getElementsByTagName("link"), s = [r, o], a = 0, u = 0, l = /\bme\b/; t = s[a]; a++)for (u = 0; e = t[u]; u++)if (l.test(e.rel) && (i = n.screenName(e.href)))return i
            }

            t({absolutize: r, getCanonicalURL: o, getScreenNameFromPage: s})
        })
    }), provide("dom/delegate", function (t) {
        using("util/util", function (e) {
            function i(t) {
                var e = t.getAttribute("data-twitter-event-id");
                return e ? e : (t.setAttribute("data-twitter-event-id", ++p), p)
            }

            function n(t, e, i) {
                var n = 0, r = t && t.length || 0;
                for (n = 0; r > n; n++)t[n].call(e, i)
            }

            function r(t, e, i) {
                for (var o = i || t.target || t.srcElement, s = o.className.split(" "), a = 0, u = s.length; u > a; a++)n(e["." + s[a]], o, t);
                n(e[o.tagName], o, t), t.cease || o !== this && r.call(this, t, e, o.parentElement || o.parentNode)
            }

            function o(t, e, i, n) {
                function o(n) {
                    r.call(t, n, i[e])
                }

                function a() {
                    r.call(t, t.ownerDocument.parentWindow.event, i[e])
                }

                return t.addEventListener ? (s(t, o, e, n), void t.addEventListener(e, o, !1)) : void(t.attachEvent && (s(t, a, e, n), t.attachEvent("on" + e, a)))
            }

            function s(t, e, i, n) {
                t.id && (g[t.id] = g[t.id] || [], g[t.id].push({el: t, listener: e, type: i, rootId: n}))
            }

            function a(t) {
                var i = g[t];
                i && (e.forEach(i, function (t) {
                    u(t.el, t.type, t.listener), delete w[t.rootId]
                }), delete g[t])
            }

            function u(t, e, i) {
                t && t.removeEventListener && t.removeEventListener(e, i), t && t.detachEvent && t.detachEvent(e, i)
            }

            function l(t, e, n, r) {
                var s = i(t);
                w[s] = w[s] || {}, w[s][e] || (w[s][e] = {}, o(t, e, w[s], s)), w[s][e][n] = w[s][e][n] || [], w[s][e][n].push(r)
            }

            function c(t, e, i) {
                t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent("on" + e, function () {
                    i(window.event)
                })
            }

            function d(t, e, n) {
                var o = i(e), s = w[o] && w[o];
                r.call(e, {target: n}, s[t])
            }

            function h(t) {
                return m(t), f(t), !1
            }

            function f(t) {
                t && t.preventDefault ? t.preventDefault() : t.returnValue = !1
            }

            function m(t) {
                t && (t.cease = !0) && t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0
            }

            var w = {}, p = -1, g = {};
            t({
                stop: h,
                stopPropagation: m,
                preventDefault: f,
                delegate: l,
                on: c,
                simulate: d,
                removeDelegatesForWidget: a,
                off: u
            })
        })
    }), provide("tfw/util/article", function (t) {
        using("dom/delegate", "tfw/util/globals", "util/uri", "xd/json2", function (e, i, n) {
            function r() {
                if (o = n.getCanonicalURL() || "" + document.location, window.top.postMessage) {
                    if (window == window.top)return void e.on(window, "message", function (t) {
                        var e;
                        if (!t.data || "{" == t.data[0]) {
                            try {
                                e = JSON.parse(t.data)
                            } catch (n) {
                            }
                            e && "twttr:private:requestArticleUrl" == e.name && t.source.postMessage(JSON.stringify({
                                name: "twttr:private:provideArticleUrl",
                                data: {url: o, dnt: i.dnt()}
                            }), "*")
                        }
                    });
                    e.on(window, "message", function (t) {
                        var e;
                        if (!t.data || "{" == t.data[0]) {
                            try {
                                e = JSON.parse(t.data)
                            } catch (n) {
                            }
                            e && "twttr:private:provideArticleUrl" == e.name && (o = e.data && e.data.url, i.dnt(e.data.dnt), s = document.location.href)
                        }
                    }), window.top.postMessage(JSON.stringify({name: "twttr:private:requestArticleUrl"}), "*")
                }
            }

            var o, s = "";
            r(), t({
                url: function () {
                    return o
                }, frameUrl: function () {
                    return s
                }
            })
        })
    }), provide("dom/classname", function (t) {
        function e(t) {
            return new RegExp("\\b" + t + "\\b", "g")
        }

        function i(t, i) {
            return t.classList ? void t.classList.add(i) : void(e(i).test(t.className) || (t.className += " " + i))
        }

        function n(t, i) {
            return t.classList ? void t.classList.remove(i) : void(t.className = t.className.replace(e(i), " "))
        }

        function r(t, e, r) {
            return void 0 === r && t.classList && t.classList.toggle ? t.classList.toggle(e, r) : (r ? i(t, e) : n(t, e), r)
        }

        function o(t, r, o) {
            return t.classList && s(t, r) ? (n(t, r), void i(t, o)) : void(t.className = t.className.replace(e(r), o))
        }

        function s(t, i) {
            return t.classList ? t.classList.contains(i) : e(i).test(t.className)
        }

        t({add: i, remove: n, replace: o, toggle: r, present: s})
    }), provide("util/throttle", function (t) {
        function e(t, e, i) {
            function n() {
                var i = +new Date;
                return window.clearTimeout(r), i - s > e ? (s = i, void t.call(o)) : void(r = window.setTimeout(n, e))
            }

            var r, o = i || this, s = 0;
            return n
        }

        t(e)
    }), provide("util/css", function (t) {
        using("util/util", function (e) {
            t({
                sanitize: function (t, i, n) {
                    var r, o = /^[\w ,%\/"'\-_#]+$/, s = t && e.map(t.split(";"), function (t) {
                            return e.map(t.split(":").slice(0, 2), function (t) {
                                return e.trim(t)
                            })
                        }), a = 0, u = [], l = n ? "!important" : "";
                    for (i = i || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/; s && (r = s[a]); a++)r[0].match(i) && r[1].match(o) && u.push(r.join(":") + l);
                    return u.join(";")
                }
            })
        })
    }), provide("tfw/util/params", function (t) {
        using("util/querystring", "util/twitter", function (e, i) {
            t(function (t, n) {
                return function (r) {
                    var o, s, a = "data-tw-params";
                    if (r && i.isTwitterURL(r.href) && !r.getAttribute(a)) {
                        if (r.setAttribute(a, !0), "function" == typeof n) {
                            o = n.call(this, r);
                            for (s in o)o.hasOwnProperty(s) && (t[s] = o[s])
                        }
                        r.href = e.url(r.href, t)
                    }
                }
            })
        })
    }), provide("util/tld", function (t) {
        function e(t) {
            return t in r ? r[t] : r[t] = n.test(t)
        }

        function i() {
            return e(document.location.host)
        }

        var n = /^[^#?]*\.(gov|mil)(:\d+)?([#?].*)?$/i, r = {};
        t({isUrlSensitive: e, isHostPageSensitive: i})
    }), provide("util/donottrack", function (t) {
        using("util/tld", "tfw/util/globals", function (e, i) {
            t(function (t, n) {
                var r = /https?:\/\/([^\/]+).*/i;
                return t = t || document.referrer, t = r.test(t) && RegExp.$1, n = n || document.location.host, i.dnt() ? !0 : e.isUrlSensitive(n) ? !0 : t && e.isUrlSensitive(t) ? !0 : document.navigator ? 1 == document.navigator.doNotTrack : navigator ? 1 == navigator.doNotTrack || 1 == navigator.msDoNotTrack : !1
            })
        })
    }), provide("sandbox/baseframe", function (t) {
        using("util/domready", "util/env", "util/iframe", "util/promise", "util/util", function (e, i, n, r, o) {
            function s(t, e, i, s) {
                var a;
                this.readyPromise = new r(o.bind(function (t) {
                    this.resolver = t
                }, this)), this.attrs = t || {}, this.styles = e || {}, this.appender = i || function (t) {
                    document.body.appendChild(t)
                }, this.layout = s || function (t) {
                    return new r(function (e) {
                        return e.fulfill(t())
                    })
                }, this.frame = a = n(this.attrs, this.styles), a.onreadystatechange = a.onload = this.getCallback(this.onLoad), this.layout(o.bind(function () {
                    this.appender(a)
                }, this))
            }

            var a = 0;
            window.twttr = window.twttr || {}, window.twttr.sandbox = window.twttr.sandbox || {}, s.prototype.getCallback = function (t) {
                var e = this, i = !1;
                return function () {
                    i || (i = !0, t.call(e))
                }
            }, s.prototype.registerCallback = function (t) {
                var e = "cb" + a++;
                return window.twttr.sandbox[e] = t, e
            }, s.prototype.onLoad = function () {
                try {
                    this.document = this.frame.contentWindow.document
                } catch (t) {
                    return void this.setDocDomain()
                }
                this.writeStandardsDoc(), this.resolver.fulfill(this)
            }, s.prototype.ready = function () {
                return this.readyPromise
            }, s.prototype.setDocDomain = function () {
                var t = n(this.attrs, this.styles), e = this.registerCallback(this.getCallback(this.onLoad));
                t.src = ["javascript:", 'document.write("");', "try { window.parent.document; }", "catch (e) {", 'document.domain="' + document.domain + '";', "}", 'window.parent.twttr.sandbox["' + e + '"]();'].join(""), this.layout(o.bind(function () {
                    this.frame.parentNode.removeChild(this.frame), this.frame = null, this.appender ? this.appender(t) : document.body.appendChild(t), this.frame = t
                }, this))
            }, s.prototype.writeStandardsDoc = function () {
                if (i.anyIE() && !i.cspEnabled()) {
                    var t = ["<!DOCTYPE html>", "<html>", "<head>", "<scr", "ipt>", "try { window.parent.document; }", 'catch (e) {document.domain="' + document.domain + '";}', "</scr", "ipt>", "</head>", "<body></body>", "</html>"].join("");
                    this.document.write(t), this.document.close()
                }
            }, t(s)
        })
    }), provide("sandbox/minimal", function (t) {
        using("sandbox/baseframe", "util/env", "util/promise", "util/util", function (e, i, n, r) {
            function o(t, e) {
                t && (this._frame = t, this._win = t.contentWindow, this._doc = this._win.document, this._body = this._doc.body, this._head = this._body.parentNode.children[0], this.layout = e)
            }

            r.aug(o.prototype, {
                createElement: function (t) {
                    return this._doc.createElement(t)
                }, createDocumentFragment: function () {
                    return this._doc.createDocumentFragment()
                }, appendChild: function (t) {
                    return this.layout(r.bind(function () {
                        return this._body.appendChild(t)
                    }, this))
                }, setBaseTarget: function (t) {
                    var e = this._doc.createElement("base");
                    return e.target = t, this.layout(r.bind(function () {
                        return this._head.appendChild(e)
                    }, this))
                }, setTitle: function (t) {
                    t && (this._frame.title = t)
                }, element: function () {
                    return this._frame
                }, document: function () {
                    return this._doc
                }
            }), o.createSandbox = function (t, i, n, r) {
                var s = new e(t, i, n, r);
                return s.ready().then(function (t) {
                    return new o(t.frame, t.layout)
                })
            }, t(o)
        })
    }), provide("dom/cookie", function (t) {
        using("util/util", function (e) {
            t(function (t, i, n) {
                var r, o, s, a, u = e.aug({}, n);
                return arguments.length > 1 && "[object Object]" !== String(i) ? ((null === i || void 0 === i) && (u.expires = -1), "number" == typeof u.expires && (r = u.expires, o = new Date((new Date).getTime() + 60 * r * 1e3), u.expires = o), i = String(i), document.cookie = [encodeURIComponent(t), "=", u.raw ? i : encodeURIComponent(i), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")) : (u = i || {}, a = u.raw ? function (t) {
                    return t
                } : decodeURIComponent, (s = new RegExp("(?:^|; )" + encodeURIComponent(t) + "=([^;]*)").exec(document.cookie)) ? a(s[1]) : null)
            })
        })
    }), provide("tfw/util/tracking", function (t) {
        var e = "77563b2f412d3f55518caac1d35a271a2ab1e774:1414175289";
        using("dom/cookie", "dom/delegate", "sandbox/minimal", "util/donottrack", "util/promise", "util/querystring", "util/tld", "tfw/util/env", "util/iframe", "util/util", "xd/json2", function (i, n, r, o, s, a, u, l, c, d) {
            function h() {
                return F ? W : (r.createSandbox({id: "rufous-sandbox"}, {display: "none"}).then(d.bind(function (t) {
                    M = t, C = k(), R = D(), P.fulfill([C, R])
                }, this)), F = !0, W)
            }

            function f(t, e, i, n) {
                return m(t, e, i, n, 2)
            }

            function m(t, e, i, n, r) {
                var o = !d.isObject(t), s = e ? !d.isObject(e) : !1;
                o || s || v(E(t), I(e, i, n, r), !0)
            }

            function w(t, e, i, n, r) {
                var o = p(t.target || t.srcElement);
                o.action = r || "click", m(o, e, i, n)
            }

            function p(t, e) {
                var i;
                return e = e || {}, t && 1 === t.nodeType ? ((i = t.getAttribute("data-scribe")) && d.forEach(i.split(" "), function (t) {
                    var i = d.trim(t).split(":"), n = i[0], r = i[1];
                    n && r && !e[n] && (e[n] = r)
                }), p(t.parentNode, e)) : e
            }

            function g(t, e, i) {
                var n, r;
                i && d.isObject(t) && d.isObject(e) && (n = d.aug({}, e, {event_namespace: t}), r = {l: L(n)}, n.dnt && (r.dnt = 1), O(a.url(i, r)))
            }

            function v(t, e, i) {
                var n, r, o, s;
                d.isObject(t) && d.isObject(e) && (i ? g(t, e, U) : (o = d.aug({}, e, {event_namespace: t}), n = C.firstChild, n.value = +(+n.value || o.dnt || 0), s = L(o), r = M.createElement("input"), r.type = "hidden", r.name = "l", r.value = s, C.appendChild(r)))
            }

            function b(t, e, i, n) {
                var r = !d.isObject(t), o = e ? !d.isObject(e) : !1;
                r || o || W.then(function () {
                    v(E(t), I(e, i, n))
                })
            }

            function y(t) {
                T("tweet", t)
            }

            function _(t) {
                T("timeline", t)
            }

            function T(t, e) {
                u.isHostPageSensitive() || H[t] || (H[t] = !0, g(E({page: t, action: "impression"}), N(e), z))
            }

            function x() {
                return W.then(function () {
                    if (C.children.length <= 2)return s.reject();
                    var t = s.every(M.appendChild(C), M.appendChild(R)).then(function (t) {
                        var e = t[0], i = t[1];
                        return n.on(i, "load", function () {
                            A(e, i)(), twttr.events.trigger("logFlushed")
                        }), e.submit(), t
                    });
                    return C = k(), R = D(), t
                })
            }

            function A(t, e) {
                return function () {
                    var i = t.parentNode;
                    i && (i.removeChild(t), i.removeChild(e))
                }
            }

            function E(t) {
                return d.aug({client: "tfw"}, t || {})
            }

            function I(t, i, n, r) {
                var s = t && t.widget_origin || document.referrer;
                return t = S("tfw_client_event", t, n || o(s)), t.client_version = e, t.format_version = void 0 !== r ? r : 1, i || (t.widget_origin = s), t
            }

            function N(t) {
                return S("syndicated_impression", {}, t)
            }

            function S(t, e, i) {
                return e = e || {}, d.aug(e, {_category_: t, triggered_on: e.triggered_on || +new Date, dnt: !!i})
            }

            function k() {
                var t = M.createElement("form"), e = M.createElement("input"), i = M.createElement("input");
                return j++, t.action = U, t.method = "POST", t.target = "rufous-frame-" + j, t.id = "rufous-form-" + j, e.type = "hidden", e.name = "dnt", e.value = 0, i.type = "hidden", i.name = "tfw_redirect", i.value = K, t.appendChild(e), t.appendChild(i), t
            }

            function D() {
                var t = "rufous-frame-" + j;
                return c({id: t, name: t, width: 0, height: 0, border: 0}, {display: "none"}, M.document())
            }

            function O(t) {
                var e = new Image;
                e.src = t
            }

            function L(t) {
                var e, i = Array.prototype.toJSON;
                return delete Array.prototype.toJSON, e = JSON.stringify(t), i && (Array.prototype.toJSON = i), e
            }

            var C, R, M, P, j = 0, F = !1, W = new s(function (t) {
                P = t
            }), H = {}, U = "https://syndication.twitter.com/i/jot", z = "https://syndication.twitter.com/i/jot/syndication", K = "https://platform.twitter.com/jot.html";
            twttr.widgets && twttr.widgets.endpoints && (U = twttr.widgets.endpoints.rufous || U, z = twttr.widgets.endpoints.rufous || z, K = twttr.widgets.endpoints.rufousRedirect || K), t({
                enqueue: b,
                flush: x,
                initPostLogging: h,
                scribeInteraction: w,
                extractTermsFromDOM: p,
                addPixel: m,
                addPixel2: f,
                scribeTweetAudienceImpression: y,
                scribeTimelineAudienceImpression: _
            })
        })
    }), provide("tfw/util/media", function (t) {
        using("dom/delegate", "dom/get", "util/util", "util/env", "util/twitter", function (e, i, n, r, o) {
            function s(t, e) {
                return 2 == t || 3 == t && 0 === +e
            }

            function a(t) {
                var e = t.split(" ");
                this.url = decodeURIComponent(n.trim(e[0])), this.width = +n.trim(e[1].replace(/w$/, ""))
            }

            function u(t, e, i) {
                var r, o, s, u;
                if (t = window.devicePixelRatio ? t * window.devicePixelRatio : t, o = n.map(e.split(","), function (t) {
                        return new a(t)
                    }), i)for (u = 0; u < o.length; u++)o[u].url === i && (r = o[u]);
                return s = n.reduce(o, function (e, i) {
                    return i.width < e.width && i.width >= t ? i : e
                }, o[0]), r && r.width > s.width ? r : s
            }

            function l(t, e) {
                var i, n = t.getAttribute("data-srcset"), r = t.src;
                n && (i = u(e, n, r), t.src = i.url)
            }

            function c(t, e) {
                e = e || r.retina(), e && n.forEach(t.getElementsByTagName("IMG"), function (t) {
                    var e = t.getAttribute("data-src-2x");
                    e && (t.src = e)
                })
            }

            function d(t, e, r, o) {
                var a = 0, u = r ? 600 : 375, c = i.one("multi-photo", t, "DIV"), d = c && +c.getAttribute("data-photo-count");
                if (t)return n.forEach(i.all("autosized-media", t), function (t) {
                    var i = h(t.getAttribute("data-width"), t.getAttribute("data-height"), e, u);
                    o(function () {
                        l(t, e), t.width = i.width, t.height = i.height, f(t, i)
                    }), a = i.height > a ? i.height : a
                }), n.forEach(i.all("cropped-media", t, "IMG"), function (t) {
                    var i, n, r, c = e - 12, f = t.parentNode, g = t.getAttribute("data-crop-x") || 0, v = t.getAttribute("data-crop-y") || 0, b = s(d, t.getAttribute("data-image-index")), y = Math.floor(c / 2 - m), _ = Math.floor(y / (b ? w : p));
                    b || (_ -= m / 2), r = h(t.getAttribute("data-width"), t.getAttribute("data-height"), y, u, y, _), i = r.width - y - g, n = r.height - _ - v, 0 > i && Math.max(0, g += i), 0 > n && Math.max(0, v += n), o(function () {
                        l(t, y), t.width = r.width, t.height = r.height, f.style.width = y - 1 + "px", f.style.height = _ + "px", g && (t.style.marginLeft = "-" + Math.floor(r.width * g / 100) + "px"), v && (t.style.marginTop = "-" + Math.floor(r.height * v / 100) + "px")
                    }), a = r.height * (b ? 2 : 1) > a ? r.height : a
                }), a
            }

            function h(t, e, i, n, r, o) {
                return i = i || t, n = n || e, r = r || 0, o = o || 0, t > i && (e *= i / t, t = i), e > n && (t *= n / e, e = n), r > t && (e *= r / t, t = r), o > e && (t *= o / e, e = o), {
                    width: Math.floor(t),
                    height: Math.floor(e)
                }
            }

            function f(t, i) {
                function n() {
                    var t = {name: "tfw:resize", dimensions: i};
                    a.postMessage(t, "*")
                }

                var s, a, u, l, c;
                t && (a = t.contentWindow, s = t.ownerDocument && t.ownerDocument.defaultView, u = r.ios() || r.android(), l = o.isTwitterURL(t.src), c = a && r.canPostMessage(a), u && l && c && (n(), s && e.on(s, "message", function (t) {
                    "tfw:requestsize" === t.data && n()
                })))
            }

            var m = 6, w = 8 / 9, p = 16 / 9;
            t({scaleDimensions: h, retinize: c, constrainMedia: d, __setSrcFromSet: l})
        })
    }), provide("tfw/util/data", function (t) {
        using("util/logger", "util/util", "util/querystring", function (e, i, n) {
            function r(t) {
                return function (i) {
                    i.error ? t.error && t.error(i) : i.headers && 200 != i.headers.status ? (t.error && t.error(i), e.warn(i.headers.message)) : t.success && t.success(i), t.complete && t.complete(i), o(t)
                }
            }

            function o(t) {
                var e = t.script;
                e && (e.onload = e.onreadystatechange = null, e.parentNode && e.parentNode.removeChild(e), t.script = void 0, e = void 0), t.callbackName && twttr.tfw.callbacks[t.callbackName] && delete twttr.tfw.callbacks[t.callbackName]
            }

            function s(t) {
                var e = {};
                return t.success && i.isType("function", t.success) && (e.success = t.success), t.error && i.isType("function", t.error) && (e.error = t.error), t.complete && i.isType("function", t.complete) && (e.complete = t.complete), e
            }

            window.twttr = window.twttr || {}, twttr.tfw = twttr.tfw || {}, twttr.tfw.callbacks = twttr.tfw.callbacks || {};
            var a = "twttr.tfw.callbacks", u = twttr.tfw.callbacks, l = "cb", c = 0, d = !1, h = {}, f = {
                tweets: "https://syndication.twitter.com/tweets.json",
                timeline: "https://cdn.syndication.twimg.com/widgets/timelines/",
                timelinePoll: "https://syndication.twitter.com/widgets/timelines/paged/",
                timelinePreview: "https://syndication.twitter.com/widgets/timelines/preview/"
            };
            twttr.widgets && twttr.widgets.endpoints && i.aug(f, twttr.widgets.endpoints), h.jsonp = function (t, e, i) {
                var o = i || l + c, s = a + "." + o, h = document.createElement("script"), f = {
                    callback: s,
                    suppress_response_codes: !0
                };
                u[o] = r(e), (d || !/^https?\:$/.test(window.location.protocol)) && (t = t.replace(/^\/\//, "https://")), h.src = n.url(t, f), h.async = "async", document.body.appendChild(h), e.script = h, e.callbackName = o, i || c++
            }, h.config = function (t) {
                (t.forceSSL === !0 || t.forceSSL === !1) && (d = t.forceSSL)
            }, h.tweets = function (t) {
                var e = arguments[0], i = s(e), r = {ids: t.ids.join(","), lang: t.lang}, o = n.url(f.tweets, r);
                this.jsonp(o, i)
            }, h.timeline = function (t) {
                var e, r = arguments[0], o = s(r), a = 9e5, u = Math.floor(+new Date / a), l = {
                    lang: t.lang,
                    t: u,
                    domain: window.location.host,
                    dnt: t.dnt,
                    override_type: t.overrideType,
                    override_id: t.overrideId,
                    override_name: t.overrideName,
                    override_owner_id: t.overrideOwnerId,
                    override_owner_name: t.overrideOwnerName,
                    with_replies: t.withReplies
                };
                i.compact(l), e = n.url(f.timeline + t.id, l), this.jsonp(e, o, "tl_" + t.id + "_" + t.instanceId)
            }, h.timelinePoll = function (t) {
                var e, r = arguments[0], o = s(r), a = {
                    lang: t.lang,
                    since_id: t.sinceId,
                    max_id: t.maxId,
                    min_position: t.minPosition,
                    max_position: t.maxPosition,
                    domain: window.location.host,
                    dnt: t.dnt,
                    override_type: t.overrideType,
                    override_id: t.overrideId,
                    override_name: t.overrideName,
                    override_owner_id: t.overrideOwnerId,
                    override_owner_name: t.overrideOwnerName,
                    with_replies: t.withReplies
                };
                i.compact(a), e = n.url(f.timelinePoll + t.id, a), this.jsonp(e, o, "tlPoll_" + t.id + "_" + t.instanceId + "_" + (t.sinceId || t.maxId || t.maxPosition || t.minPosition))
            }, h.timelinePreview = function (t) {
                var e = arguments[0], i = s(e), r = t.params, o = n.url(f.timelinePreview, r);
                this.jsonp(o, i)
            }, t(h)
        })
    }), provide("anim/transition", function (t) {
        function e(t, e) {
            var i;
            return e = e || window, (i = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || e.oRequestAnimationFrame || function () {
                e.setTimeout(function () {
                    t(+new Date)
                }, 1e3 / 60)
            })(t)
        }

        function i(t, e) {
            return Math.sin(Math.PI / 2 * e) * t
        }

        function n(t, i, n, r, o) {
            function s() {
                var u = +new Date, l = u - a, c = Math.min(l / n, 1), d = r ? r(i, c) : i * c;
                t(d), 1 != c && e(s, o)
            }

            var a = +new Date;
            e(s)
        }

        t({animate: n, requestAnimationFrame: e, easeOut: i})
    }), provide("util/datetime", function (t) {
        using("util/util", function (e) {
            function i(t) {
                return 10 > t ? "0" + t : t
            }

            function n(t) {
                function e(t, e) {
                    return r && r[t] && (t = r[t]), t.replace(/%\{([\w_]+)\}/g, function (t, i) {
                        return void 0 !== e[i] ? e[i] : t
                    })
                }

                var r = t && t.phrases, o = t && t.months || a, s = t && t.formats || u;
                this.timeAgo = function (t) {
                    var i, r = n.parseDate(t), a = +new Date, u = a - r;
                    return r ? isNaN(u) || 2 * l > u ? e("now") : c > u ? (i = Math.floor(u / l), e(s.abbr, {
                        number: i,
                        symbol: e(f, {abbr: e("s"), expanded: e(i > 1 ? "seconds" : "second")})
                    })) : d > u ? (i = Math.floor(u / c), e(s.abbr, {
                        number: i,
                        symbol: e(f, {abbr: e("m"), expanded: e(i > 1 ? "minutes" : "minute")})
                    })) : h > u ? (i = Math.floor(u / d), e(s.abbr, {
                        number: i,
                        symbol: e(f, {abbr: e("h"), expanded: e(i > 1 ? "hours" : "hour")})
                    })) : 365 * h > u ? e(s.shortdate, {
                        day: r.getDate(),
                        month: e(o[r.getMonth()])
                    }) : e(s.longdate, {
                        day: r.getDate(),
                        month: e(o[r.getMonth()]),
                        year: r.getFullYear().toString().slice(2)
                    }) : ""
                }, this.localTimeStamp = function (t) {
                    var r = n.parseDate(t), a = r && r.getHours();
                    return r ? e(s.full, {
                        day: r.getDate(),
                        month: e(o[r.getMonth()]),
                        year: r.getFullYear(),
                        hours24: i(a),
                        hours12: 13 > a ? a ? a : "12" : a - 12,
                        minutes: i(r.getMinutes()),
                        seconds: i(r.getSeconds()),
                        amPm: e(12 > a ? "AM" : "PM")
                    }) : ""
                }
            }

            var r = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/, o = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i, s = /^\d+$/, a = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], u = {
                abbr: "%{number}%{symbol}",
                shortdate: "%{day} %{month}",
                longdate: "%{day} %{month} %{year}",
                full: "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
            }, l = 1e3, c = 60 * l, d = 60 * c, h = 24 * d, f = '<abbr title="%{expanded}">%{abbr}</abbr>';
            n.parseDate = function (t) {
                var i, n, u = t || "", l = u.toString();
                return (i = function () {
                    var t;
                    return s.test(l) ? parseInt(l, 10) : (t = l.match(o)) ? Date.UTC(t[7], e.indexOf(a, t[1]), t[2], t[3], t[4], t[5]) : (t = l.match(r)) ? Date.UTC(t[1], t[2] - 1, t[3], t[4], t[5], t[6]) : void 0
                }()) ? (n = new Date(i), !isNaN(n.getTime()) && n) : !1
            }, t(n)
        })
    }), provide("sandbox/frame", function (t) {
        using("sandbox/baseframe", "sandbox/minimal", "util/env", "util/promise", "util/util", "dom/delegate", function (e, i, n, r, o, s) {
            function a() {
                var t, e;
                f = {}, c || (t = document.body.offsetHeight, e = document.body.offsetWidth, (t != w || e != m) && (o.forEach(h, function (t) {
                    t.dispatchFrameResize(m, w)
                }), w = t, m = e))
            }

            function u(t) {
                var e;
                return t.id ? t.id : (e = t.getAttribute("data-twttr-id")) ? e : (e = "twttr-sandbox-" + d++, t.setAttribute("data-twttr-id", e), e)
            }

            function l(t, e) {
                i.apply(this, [t, e]), this._resizeHandlers = [], h = o.filter(h, function (t) {
                    var e = t._frame.parentElement;
                    return e || o.async(function () {
                        s.removeDelegatesForWidget(t._frame.id)
                    }), e
                }), h.push(this), this._win.addEventListener ? this._win.addEventListener("resize", o.bind(function () {
                    this.dispatchFrameResize()
                }, this), !0) : this._win.attachEvent("onresize", o.bind(function () {
                    this.dispatchFrameResize(this._win.event)
                }, this))
            }

            var c, d = 0, h = [], f = {}, m = 0, w = 0;
            window.addEventListener ? window.addEventListener("resize", a, !0) : document.body.attachEvent("onresize", function () {
                a(window.event)
            }), l.prototype = new i, o.aug(l.prototype, {
                dispatchFrameResize: function () {
                    var t = this._frame.parentNode, e = u(t), i = f[e];
                    c = !0, this._resizeHandlers.length && (i || (i = f[e] = {
                        w: this._frame.offsetWidth,
                        h: this._frame.offsetHeight
                    }), (this._frameWidth != i.w || this._frameHeight != i.h) && (this._frameWidth = i.w, this._frameHeight = i.h, o.forEach(this._resizeHandlers, function (t) {
                        t(i.w, i.h)
                    }), window.setTimeout(function () {
                        f = {}
                    }, 50)))
                }, appendStyleSheet: function (t) {
                    var e = this._doc.createElement("link");
                    return e.type = "text/css", e.rel = "stylesheet", e.href = t, this.layout(o.bind(function () {
                        return this._head.appendChild(e)
                    }, this))
                }, appendCss: function (t) {
                    var e;
                    return n.cspEnabled() ? r.reject("CSP enabled; cannot embed inline styles.") : (e = this._doc.createElement("style"), e.type = "text/css", e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(this._doc.createTextNode(t)), this.layout(o.bind(function () {
                        return this._head.appendChild(e)
                    }, this)))
                }, style: function (t) {
                    return this.layout(o.bind(function () {
                        o.forIn(t, o.bind(function (t, e) {
                            this._frame.style[t] = e
                        }, this))
                    }, this))
                }, onresize: function (t) {
                    this._resizeHandlers.push(t)
                }, width: function (t) {
                    return void 0 !== t && (this._frame.style.width = t + "px"), n.ios() ? Math.min(this._frame.parentNode.offsetWidth, this._frame.offsetWidth) : this._frame.offsetWidth
                }, height: function (t) {
                    return void 0 !== t && (this._frame.height = t), this._frame.offsetHeight
                }
            }), l.createSandbox = function (t, i, n, r) {
                var o = new e(t, i, n, r);
                return o.ready().then(function (t) {
                    return new l(t.frame, t.layout)
                })
            }, t(l)
        })
    }), provide("dom/size", function (t) {
        function e(t) {
            return t && 1 === t.nodeType ? t.offsetWidth || e(t.parentNode) : 0
        }

        t({effectiveWidth: e})
    }), provide("rpc/postmessage", function (t) {
        using("dom/delegate", "util/util", "util/env", "util/twitter", "util/promise", "xd/json2", function (e, i, n, r, o) {
            function s(t, e) {
                t && t.postMessage && (e = c ? JSON.stringify(e) : e, t.postMessage(e, "*"))
            }

            function a(t) {
                var n = t.document;
                this.server = null, this.isTwitterFrame = r.isTwitterURL(n.location.href), e.on(t, "message", i.bind(this._onMessage, this))
            }

            function u(t) {
                this.pending = {}, this.target = t, this.isTwitterHost = r.isTwitterURL(document.location.href), e.on(window, "message", i.bind(this._onMessage, this))
            }

            function l(t) {
                return arguments.length > 0 && (c = !!t), c
            }

            var c = n.ie8() || n.ie9();
            i.aug(a.prototype, {
                _onMessage: function (t) {
                    this.server && (!this.isTwitterFrame || r.isTwitterURL(t.origin)) && this.server.receive(t.data, t.source).then(function (e) {
                        e && s(t.source, e)
                    })
                }, attachTo: function (t) {
                    this.server = t
                }, detach: function () {
                    this.server = null
                }
            }), i.aug(u.prototype, {
                _processResponse: function (t) {
                    var e = this.pending[t.id];
                    e && (e.fulfill(t), delete this.pending[t.id])
                }, _onMessage: function (t) {
                    var e = t.data;
                    if (!this.isTwitterHost || r.isTwitterURL(t.origin)) {
                        if (i.isType("string", e))try {
                            e = JSON.parse(e)
                        } catch (n) {
                            return
                        }
                        e = i.isType("array", e) ? e : [e], i.forEach(e, i.bind(this._processResponse, this))
                    }
                }, send: function (t) {
                    var e, i = this.pending;
                    return e = t.id ? new o(function (e) {
                        i[t.id] = e
                    }) : o.fulfill(), s(this.target, t), e
                }
            }), t({Listener: a, Transport: u, _stringifyPayload: l})
        })
    }), provide("rpc/jsonrpc_server", function (t) {
        using("util/util", "util/promise", "xd/json2", function (e, i) {
            function n() {
                this.registry = {}
            }

            function r(t) {
                return e.isType("string", t) ? JSON.parse(t) : t
            }

            function o(t) {
                var i, n, r;
                return e.isObject(t) ? (i = t.jsonrpc === d, n = e.isType("string", t.method), r = !("id"in t) || s(t.id), i && n && r) : !1
            }

            function s(t) {
                var i, n, r;
                return i = e.isType("string", t), n = e.isType("number", t), r = null === t, i || n || r
            }

            function a(t) {
                return e.isObject(t) && !e.isType("function", t)
            }

            function u(t, e) {
                return {jsonrpc: d, id: t, result: e}
            }

            function l(t, e) {
                return {jsonrpc: d, id: s(t) ? t : null, error: e}
            }

            function c(t) {
                return i.every.apply(i, t).then(function (t) {
                    return t = e.filter(t, function (t) {
                        return void 0 !== t
                    }), t.length ? t : void 0
                })
            }

            var d = "2.0", h = {code: -32700, message: "Parse error"}, f = {
                code: -32600,
                message: "Invalid Request"
            }, m = {code: -32602, message: "Invalid params"}, w = {
                code: -32601,
                message: "Method not found"
            }, p = {code: -32603, message: "Internal error"};
            n.prototype._invoke = function (t, n) {
                var r, o, s;
                r = this.registry[t.method], o = t.params || [], o = e.isType("array", o) ? o : [o];
                try {
                    s = r.apply(n.source || null, o)
                } catch (a) {
                    s = i.reject(a.message)
                }
                return i.isThenable(s) ? s : i.fulfill(s)
            }, n.prototype._processRequest = function (t, e) {
                function n(e) {
                    return u(t.id, e)
                }

                function r() {
                    return l(t.id, p)
                }

                var s, c = !!t.id;
                return o(t) ? s = "params"in t && !a(t.params) ? i.fulfill(l(t.id, m)) : this.registry[t.method] ? this._invoke(t, {source: e}).then(n, r) : i.fulfill(l(t.id, w)) : (c = !0, s = i.fulfill(l(t.id, f))), c ? s : i.fulfill()
            }, n.prototype.attachListener = function (t) {
                return t.attachTo(this), this
            }, n.prototype.bind = function (t, e) {
                return this.registry[t] = e, this
            }, n.prototype.receive = function (t, n) {
                var o, s, a;
                try {
                    t = r(t)
                } catch (u) {
                    return i.fulfill(l(null, h))
                }
                return n = n || null, o = e.isType("array", t), s = o ? t : [t], a = e.map(s, e.bind(function (t) {
                    return this._processRequest(t, n)
                }, this)), o ? c(a) : a[0]
            }, t(n)
        })
    }), provide("amplify/video_scribe_bridge", function (t) {
        using("util/util", "dom/get", "tfw/util/tracking", "rpc/jsonrpc_server", "rpc/postmessage", function (e, i, n, r, o) {
            function s(t, e) {
                return t && t.getAttribute ? t.getAttribute("data-" + e) : void 0
            }

            function a(t) {
                return {element: t.element || d, action: t.action || h}
            }

            function u(t, n) {
                var r = i.ancestor(".cards-multimedia", n), o = i.ancestor(".tweet", n), a = e.aug({
                    item_type: c,
                    id: s(o, "tweet-id"),
                    card_name: s(r, "card-name"),
                    publisher_id: s(r, "publisher-id"),
                    content_id: s(r, "video-content-id")
                }, t.itemData || {});
                return {items: [a]}
            }

            function l(t, e) {
                var i = this;
                if (arguments.length < 2)throw new Error("missing arguments");
                this.dnt = !!e, this.global = t, this.server = (new r).attachListener(new o.Listener(t)).bind("scribe", function (t) {
                    i.scribe(t, this)
                })
            }

            var c = 0, d = "amplify_player", h = "undefined";
            l.prototype.findIframeByWindow = function (t) {
                var e, i = this.global.document.getElementsByTagName("iframe"), n = i.length;
                for (e = 0; n > e; e++)if (i[e].contentWindow == t)return i[e]
            }, l.prototype.scribe = function (t, e) {
                var i, r, o;
                t = t && t.customScribe, i = this.findIframeByWindow(e), t && i && (r = a(t), o = u(t, i), n.addPixel2(r, o, !0, this.dnt))
            }, t(l)
        })
    }), provide("tfw/util/assets", function (t) {
        using("util/env", function (e) {
            function i(t, i) {
                var r, o = n[t];
                return r = e.retina() ? "2x" : e.ie6() || e.ie7() ? "gif" : "default", i && (r += ".rtl"), o[r]
            }

            var n = {
                "embed/timeline.css": {
                    "default": "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.default.css",
                    "2x": "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.2x.css",
                    gif: "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.gif.css",
                    "default.rtl": "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.default.rtl.css",
                    "2x.rtl": "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.2x.rtl.css",
                    "gif.rtl": "embed/timeline.3fb0c4c981cd3f8f8dfb6b0ab93d6a9e.gif.rtl.css"
                }
            };
            t(i)
        })
    }), provide("tfw/widget/intent", function (t) {
        using("tfw/widget/base", "util/util", "util/querystring", "util/twitter", "util/uri", "util/promise", function (e, i, n, r, o, s) {
            function a(t) {
                var e = Math.round(y / 2 - g / 2), i = 0;
                b > v && (i = Math.round(b / 2 - v / 2)), window.open(t, void 0, [p, "width=" + g, "height=" + v, "left=" + e, "top=" + i].join(","))
            }

            function u(t, e) {
                using("tfw/hub/client", function (i) {
                    i.openIntent(t, e)
                })
            }

            function l(t) {
                var e = ~location.host.indexOf("poptip.com") ? "https://poptip.com" : location.href, i = "original_referer=" + e;
                return [t, i].join(-1 == t.indexOf("?") ? "?" : "&")
            }

            function c(t) {
                var e, n, r;
                if (t = t || window.event, e = t.target || t.srcElement, !(t.altKey || t.metaKey || t.shiftKey)) {
                    for (; e && !~i.indexOf(["A", "AREA"], e.nodeName);)e = e.parentNode;
                    e && e.href && (n = e.href.match(w), n && (r = l(e.href), r = r.replace(/^http[:]/, "https:"), r = r.replace(/^\/\//, "https://"), d(r, e), t.returnValue = !1, t.preventDefault && t.preventDefault()))
                }
            }

            function d(t, e) {
                if (r.isTwitterURL(t))if (twttr.events.hub && e) {
                    var i = new h(m.generateId(), e);
                    m.add(i), u(t, e), twttr.events.trigger("click", {
                        target: e,
                        region: "intent",
                        type: "click",
                        data: {}
                    })
                } else a(t)
            }

            function h(t, e) {
                this.id = t, this.element = this.srcEl = e
            }

            function f(t) {
                this.srcEl = [], this.element = t
            }

            var m, w = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/, p = "scrollbars=yes,resizable=yes,toolbar=no,location=yes", g = 550, v = 520, b = screen.height, y = screen.width;
            f.prototype = new e, i.aug(f.prototype, {
                render: function () {
                    return m = this, window.twttr.__twitterIntentHandler || (document.addEventListener ? document.addEventListener("click", c, !1) : document.attachEvent && document.attachEvent("onclick", c), window.twttr.__twitterIntentHandler = !0), s.fulfill(document.body)
                }
            }), f.open = d, t(f)
        })
    }), provide("tfw/widget/syndicatedbase", function (t) {
        using("tfw/widget/base", "tfw/widget/intent", "tfw/util/assets", "tfw/util/globals", "tfw/util/media", "tfw/util/tracking", "amplify/video_scribe_bridge", "dom/classname", "dom/get", "dom/delegate", "dom/size", "sandbox/frame", "util/env", "util/promise", "util/twitter", "util/typevalidator", "util/util", function (e, i, n, r, o, s, a, u, l, c, d, h, f, m, w, p, g) {
            function v() {
                _ = b.VALID_COLOR.test(r.val("widgets:link-color")) && RegExp.$1, x = b.VALID_COLOR.test(r.val("widgets:border-color")) && RegExp.$1, T = r.val("widgets:theme")
            }

            function b(t) {
                if (t) {
                    var i;
                    this.readyPromise = new m(g.bind(function (t) {
                        this.readyResolver = t
                    }, this)), this.renderedPromise = new m(g.bind(function (t) {
                        this.renderResolver = t
                    }, this)), e.apply(this, [t]), i = this.params(), this.targetEl = this.srcEl && this.srcEl.parentNode || i.targetEl || document.body, this.predefinedWidth = b.VALID_UNIT.test(i.width || this.attr("width")) && RegExp.$1, this.layout(g.bind(function () {
                        return this.containerWidth = d.effectiveWidth(this.targetEl)
                    }, this)).then(g.bind(function (t) {
                        var e = this.predefinedWidth || t || this.dimensions.DEFAULT_WIDTH;
                        this.height = b.VALID_UNIT.test(i.height || this.attr("height")) && RegExp.$1, this.width = Math.max(this.dimensions.MIN_WIDTH, Math.min(e, this.dimensions.DEFAULT_WIDTH))
                    }, this)), this.linkColor = b.VALID_COLOR.test(i.linkColor || this.dataAttr("link-color")) ? RegExp.$1 : _, this.borderColor = b.VALID_COLOR.test(i.borderColor || this.dataAttr("border-color")) ? RegExp.$1 : x, this.theme = i.theme || this.attr("data-theme") || T, this.theme = /(dark|light)/.test(this.theme) ? this.theme : "", this.classAttr.push(f.touch() ? "is-touch" : "not-touch"), f.ie9() && this.classAttr.push("ie9"), this.sandboxCreated = h.createSandbox({
                        "class": this.renderedClassNames,
                        id: this.id,
                        allowfullscreen: ""
                    }, {
                        width: "1px",
                        height: "0px",
                        border: "none",
                        position: "absolute",
                        visibility: "hidden"
                    }, g.bind(function (t) {
                        this.srcEl ? this.targetEl.insertBefore(t, this.srcEl) : this.targetEl.appendChild(t)
                    }, this), this.layout).then(g.bind(function (t) {
                        this.setupSandbox(t), new a(t.element().contentWindow, this.dnt)
                    }, this))
                }
            }

            function y(t, e) {
                return t + e
            }

            var _, T, x, A = [".customisable", ".customisable:link", ".customisable:visited", ".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"], E = ["a:hover .ic-mask", "a:focus .ic-mask"], I = [".customisable-border"], N = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"], S = {
                TWEET: 0,
                RETWEET: 10
            };
            b.prototype = new e, g.aug(b.prototype, {
                setupSandbox: function (t) {
                    this.sandbox = t, m.some(t.appendCss("body{display:none}"), t.setBaseTarget("_blank"), t.appendStyleSheet(twttr.widgets.config.assetUrl() + "/" + n("embed/timeline.css"))).then(g.bind(function () {
                        this.readyResolver.fulfill(t)
                    }, this))
                }, ready: function () {
                    return this.readyPromise
                }, rendered: function () {
                    return this.renderedPromise
                }, contentWidth: function (t) {
                    var e = this.dimensions, i = this.borderless ? 0 : e.BORDERS, n = this.fullBleedPhoto ? 0 : this.chromeless && this.narrow ? e.NARROW_MEDIA_PADDING_CL : this.chromeless ? e.WIDE_MEDIA_PADDING_CL : this.narrow ? e.NARROW_MEDIA_PADDING : e.WIDE_MEDIA_PADDING;
                    return (t || this.width) - (n + i)
                }, addSiteStyles: function () {
                    var t = g.bind(function (t) {
                        return ("dark" == this.theme ? ".thm-dark " : "") + t
                    }, this), e = [];
                    return this.headingStyle && e.push(g.map(N, t).join(",") + "{" + this.headingStyle + "}"), this.linkColor && (e.push(g.map(A, t).join(",") + "{color:" + this.linkColor + "}"), e.push(g.map(E, t).join(",") + "{background-color:" + this.linkColor + "}")), this.borderColor && e.push(g.map(I, t).concat("dark" == this.theme ? [".thm-dark.customisable-border"] : []).join(",") + "{border-color:" + this.borderColor + "}"), e.length ? this.sandbox.appendCss(e.join("")) : void 0
                }, setNarrow: function () {
                    var t = this.narrow;
                    return this.narrow = this.width < this.dimensions.NARROW_WIDTH, t != this.narrow ? this.layout(g.bind(function () {
                        return u.toggle(this.element, "var-narrow", this.narrow)
                    }, this)) : m.fulfill(this.narrow)
                }, bindIntentHandlers: function () {
                    function t(t) {
                        var i = l.ancestor(".tweet", this, n), r = g.aug({}, e.baseScribeData(), {
                            item_ids: [],
                            item_details: e.extractTweetScribeDetails(i)
                        });
                        g.forIn(r.item_details, function (t) {
                            r.item_ids.push(t)
                        }), s.scribeInteraction(t, r, !0, e.dnt)
                    }

                    var e = this, n = this.element;
                    c.delegate(n, "click", "A", t), c.delegate(n, "click", "BUTTON", t), c.delegate(n, "click", ".profile", function () {
                        e.addUrlParams(this)
                    }), c.delegate(n, "click", ".follow-button", function (t) {
                        var n;
                        t.altKey || t.metaKey || t.shiftKey || f.ios() || f.android() || p.asBoolean(this.getAttribute("data-age-gate")) || (n = w.intentForFollowURL(this.href, !0), n && (i.open(n, e.sandbox.element()), c.preventDefault(t)))
                    }), c.delegate(n, "click", ".web-intent", function (t) {
                        e.addUrlParams(this), t.altKey || t.metaKey || t.shiftKey || (i.open(this.href, e.sandbox.element()), c.preventDefault(t))
                    })
                }, baseScribeData: function () {
                    return {}
                }, extractTweetScribeDetails: function (t) {
                    var e, i, n = {};
                    return t ? (e = t.getAttribute("data-tweet-id"), i = t.getAttribute("data-rendered-tweet-id") || e, i == e ? n[i] = {item_type: S.TWEET} : e && (n[i] = {
                        item_type: S.RETWEET,
                        target_type: S.TWEET,
                        target_id: e
                    }), n) : n
                }, constrainMedia: function (t, e) {
                    return o.constrainMedia(t || this.element, e || this.contentWidth(), this.fullBleedPhoto, this.layout)
                }, collapseRegions: function () {
                    g.forEach(l.all("collapsible-container", this.element), g.bind(function (t) {
                        var e, i, n = t.children, r = n.length && t.offsetWidth, o = n.length && g.map(n, function (t) {
                                return t.offsetWidth
                            }), s = n.length;
                        if (n.length)for (; s > 0;) {
                            if (s--, e = g.reduce(o, y, 0), !r || !e)return;
                            if (r > e)return;
                            i = n[s].getAttribute("data-collapsed-class"), i && (u.add(this.element, i), o[s] = n[s].offsetWidth)
                        }
                    }, this))
                }
            }), b.VALID_UNIT = /^([0-9]+)( ?px)?$/, b.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i, v(), t(b)
        })
    }), provide("tfw/widget/timeline", function (t) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "util/promise", "anim/transition", "tfw/util/article", "tfw/util/data", "tfw/util/media", "tfw/util/tracking", "tfw/util/params", "util/css", "util/env", "util/throttle", "util/twitter", "util/querystring", "util/typevalidator", "util/util", "dom/delegate", "dom/classname", "dom/get", function (e, i, n, r, o, s, a, u, l, c, d, h, f, m, w, p, g, v, b, y) {
            function _(t) {
                if (t) {
                    var e, n, r, o, s, a, u, l;
                    i.apply(this, [t]), e = this.params(), n = (e.chrome || this.dataAttr("chrome") || "").split(" "), this.preview = e.previewParams, this.widgetId = e.widgetId || this.dataAttr("widget-id"), this.instanceId = ++W, this.cursors = {
                        maxPosition: 0,
                        minPosition: 0
                    }, this.override = (o = e.screenName || this.dataAttr("screen-name")) || (s = e.userId || this.dataAttr("user-id")) ? {
                        overrideType: "user",
                        overrideId: s,
                        overrideName: o,
                        withReplies: p.asBoolean(e.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
                    } : (o = e.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (s = e.favoritesUserId || this.dataAttr("favorites-user-id")) ? {
                        overrideType: "favorites",
                        overrideId: s,
                        overrideName: o
                    } : ((o = e.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (s = e.listOwnerId || this.dataAttr("list-owner-id"))) && ((a = e.listId || this.dataAttr("list-id")) || (u = e.listSlug || this.dataAttr("list-slug"))) ? {
                        overrideType: "list",
                        overrideOwnerId: s,
                        overrideOwnerName: o,
                        overrideId: a,
                        overrideName: u
                    } : (l = e.customTimelineId || this.dataAttr("custom-timeline-id")) ? {
                        overrideType: "custom",
                        overrideId: l
                    } : {}, this.tweetLimit = p.asInt(e.tweetLimit || this.dataAttr("tweet-limit")), this.staticTimeline = this.tweetLimit > 0, n.length && (r = ~g.indexOf(n, "none"), this.chromeless = r || ~g.indexOf(n, "transparent"), this.headerless = r || ~g.indexOf(n, "noheader"), this.footerless = r || ~g.indexOf(n, "nofooter"), this.borderless = r || ~g.indexOf(n, "noborders"), this.noscrollbar = ~g.indexOf(n, "noscrollbar")), this.headingStyle = d.sanitize(e.headingStyle || this.dataAttr("heading-style"), void 0, !0), this.classAttr.push("twitter-timeline-rendered"), this.ariaPolite = e.ariaPolite || this.dataAttr("aria-polite")
                }
            }

            var T = {
                CLIENT_SIDE_USER: 0,
                CLIENT_SIDE_APP: 2
            }, x = "timeline", A = "new-tweets-bar", E = "timeline-header", I = "timeline-footer", N = "stream", S = "h-feed", k = "tweet", D = "expanded", O = "detail-expander", L = "expand", C = "permalink", R = "twitter-follow-button", M = "no-more-pane", P = "pending-scroll-in", j = "pending-new-tweet", F = "pending-new-tweet-display", W = 0;
            _.prototype = new i, g.aug(_.prototype, {
                renderedClassNames: "twitter-timeline twitter-timeline-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "600",
                    DEFAULT_WIDTH: "520",
                    NARROW_WIDTH: "320",
                    MIN_WIDTH: "180",
                    MIN_HEIGHT: "200",
                    WIDE_MEDIA_PADDING: 81,
                    NARROW_MEDIA_PADDING: 16,
                    WIDE_MEDIA_PADDING_CL: 60,
                    NARROW_MEDIA_PADDING_CL: 12,
                    BORDERS: 2
                },
                create: function (t) {
                    var i, n, o, s, a = this.sandbox.createElement("div"), c = [];
                    return a.innerHTML = t.body, (i = a.children[0] || !1) ? (this.reconfigure(t.config), this.discardStaticOverflow(i), this.sandbox.setTitle(i.getAttribute("data-iframe-title") || "Timeline"), u.retinize(i), this.constrainMedia(i), this.searchQuery = i.getAttribute("data-search-query"), this.profileId = i.getAttribute("data-profile-id"), this.timelineType = i.getAttribute("data-timeline-type"), s = this.getTweetDetails(y.one(S, a)), g.forIn(s, function (t) {
                        c.push(t)
                    }), o = this.baseScribeData(), o.item_ids = c, o.item_details = s, this.timelineType && l.enqueue({
                        page: this.timelineType + "_timeline",
                        component: "timeline",
                        element: "initial",
                        action: c.length ? "results" : "no_results"
                    }, o, !0, this.dnt), l.enqueue({
                        page: "timeline",
                        component: "timeline",
                        element: "initial",
                        action: c.length ? "results" : "no_results"
                    }, o, !0, this.dnt), l.scribeTimelineAudienceImpression(this.dnt), l.flush(), "assertive" == this.ariaPolite && (n = y.one(A, i, "DIV"), n.setAttribute("aria-polite", "assertive")), i.id = this.id, i.className += " " + this.classAttr.join(" "), i.lang = this.lang, this.augmentWidgets(i), this.ready().then(g.bind(function (t) {
                        t.appendChild(i).then(g.bind(function () {
                            this.renderResolver.fulfill(this.sandbox)
                        }, this)), t.style({
                            cssText: "",
                            border: "none",
                            maxWidth: "100%",
                            minWidth: this.dimensions.MIN_WIDTH + "px"
                        }), this.layout(g.bind(function () {
                            this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl), this.predefinedWidth = this.width, this.predefinedHeight = this.height, this.width = t.width(this.width), this.height = t.height(this.height)
                        }, this)).then(g.bind(function () {
                            var i = [];
                            this.width < this.predefinedWidth && i.push(this.layout(g.bind(function () {
                                this.width = t.width(this.predefinedWidth)
                            }, this))), this.height < this.predefinedHeight && i.push(this.layout(g.bind(function () {
                                this.height = t.height(this.predefinedHeight), this.recalculateStreamHeight()
                            }, this))), i.length && e.doLayoutAsync(), i.push(r.fulfill()), r.every.apply(null, i).then(g.bind(function () {
                                this.setNarrow(), this.sandbox.onresize(g.bind(this.handleResize, this)), this.completeResolver.fulfill(this.sandbox.element())
                            }, this))
                        }, this))
                    }, this)), i) : void 0
                },
                render: function (t, i) {
                    return this.preview || this.widgetId ? (this.rendered().then(this.staticTimeline ? g.bind(function (t) {
                        this.layout(g.bind(function () {
                            t.height(this.height = this.element.offsetHeight)
                        }, this)), e.doLayoutAsync()
                    }, this) : g.bind(function () {
                        this.recalculateStreamHeight(), e.doLayoutAsync()
                    }, this)), this.preview ? this.getPreviewTimeline() : this.getTimeline(), i && this.completed().then(i), this.completed()) : (this.completeResolver.reject(400), this.completed())
                },
                getPreviewTimeline: function () {
                    a.timelinePreview({
                        success: g.bind(function (t) {
                            this.ready().then(g.bind(function () {
                                this.element = this.create(t), this.readTranslations(), this.bindInteractions(), this.updateCursors(t.headers, {initial: !0}), e.doLayoutAsync()
                            }, this))
                        }, this), error: g.bind(function (t) {
                            return t && t.headers ? void this.completeResolver.reject(t.headers.status) : void this.completeResolver.fulfill(this.srcEl)
                        }, this), params: this.preview
                    })
                },
                getTimeline: function () {
                    l.initPostLogging(), a.timeline(g.aug({
                        id: this.widgetId,
                        instanceId: this.instanceId,
                        dnt: this.dnt,
                        lang: this.lang,
                        success: g.bind(function (t) {
                            this.ready().then(g.bind(function () {
                                this.element = this.create(t), this.readTranslations(), this.bindInteractions(), this.updateTimeStamps(), this.updateCursors(t.headers, {initial: !0}), t.headers.xPolling && /\d/.test(t.headers.xPolling) && (this.pollInterval = 1e3 * t.headers.xPolling), this.staticTimeline || this.schedulePolling(), e.doLayoutAsync()
                            }, this))
                        }, this),
                        error: g.bind(function (t) {
                            return t && t.headers ? void this.completeResolver.reject(t.headers.status) : void this.completeResolver.fulfill(this.srcEl)
                        }, this)
                    }, this.override))
                },
                reconfigure: function (t) {
                    this.lang = t.lang, this.theme || (this.theme = t.theme), "dark" == this.theme && this.classAttr.push("thm-dark"), this.chromeless && this.classAttr.push("var-chromeless"), this.borderless && this.classAttr.push("var-borderless"), this.headerless && this.classAttr.push("var-headerless"), this.footerless && this.classAttr.push("var-footerless"), this.staticTimeline && this.classAttr.push("var-static"), !this.linkColor && t.linkColor && i.VALID_COLOR.test(t.linkColor) && (this.linkColor = RegExp.$1), !this.height && i.VALID_UNIT.test(t.height) && (this.height = RegExp.$1), this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT), this.preview && this.classAttr.push("var-preview"), this.narrow = this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.addSiteStyles()
                },
                getTweetDetails: function (t) {
                    var e, i = {};
                    return e = t && t.children || [], g.forEach(e, g.bind(function (t) {
                        g.aug(i, this.extractTweetScribeDetails(t))
                    }, this)), i
                },
                baseScribeData: function () {
                    return {
                        widget_id: this.widgetId,
                        widget_origin: s.url(),
                        message: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId
                    }
                },
                bindInteractions: function () {
                    var t = this, e = this.element, i = !0;
                    this.bindIntentHandlers(), v.delegate(e, "click", ".load-tweets", function (e) {
                        i && (i = !1, t.forceLoad(), v.stop(e))
                    }), v.delegate(e, "click", ".display-sensitive-image", function (i) {
                        t.showNSFW(y.ancestor("." + k, this, e)), v.stop(i)
                    }), v.delegate(e, "mouseover", "." + x, function () {
                        t.mouseOver = !0
                    }), v.delegate(e, "mouseout", "." + x, function () {
                        t.mouseOver = !1
                    }), v.delegate(e, "mouseover", "." + A, function () {
                        t.mouseOverNotifier = !0
                    }), v.delegate(e, "mouseout", "." + A, function () {
                        t.mouseOverNotifier = !1, window.setTimeout(function () {
                            t.hideNewTweetNotifier()
                        }, 3e3)
                    }), this.staticTimeline || (v.delegate(e, "click", "." + L, function (i) {
                        i.altKey || i.metaKey || i.shiftKey || (t.toggleExpando(y.ancestor("." + k, this, e)), v.stop(i))
                    }), v.delegate(e, "click", "A", function (t) {
                        v.stopPropagation(t)
                    }), v.delegate(e, "click", ".with-expansion", function (e) {
                        t.toggleExpando(this), v.stop(e)
                    }), v.delegate(e, "click", ".load-more", function () {
                        t.loadMore()
                    }), v.delegate(e, "click", "." + A, function () {
                        t.scrollToTop(), t.hideNewTweetNotifier(!0)
                    }))
                },
                scrollToTop: function () {
                    var t = y.one(N, this.element, "DIV");
                    t.scrollTop = 0, t.focus()
                },
                update: function () {
                    var t = this, e = y.one(S, this.element), i = e && e.children[0], n = i && i.getAttribute("data-tweet-id");
                    this.updateTimeStamps(), this.requestTweets(n, !0, function (e) {
                        e.childNodes.length > 0 && t.insertNewTweets(e)
                    })
                },
                loadMore: function () {
                    var t = this, e = y.all(k, this.element, "LI").pop(), i = e && e.getAttribute("data-tweet-id");
                    this.requestTweets(i, !1, function (e) {
                        var n = y.one(M, t.element, "P"), r = e.childNodes[0];
                        return n.style.cssText = "", r && r.getAttribute("data-tweet-id") == i && e.removeChild(r), e.childNodes.length > 0 ? void t.appendTweets(e) : (b.add(t.element, "no-more"), void n.focus())
                    })
                },
                forceLoad: function () {
                    var t = this, e = !!y.all(S, this.element, "OL").length;
                    this.requestTweets(1, !0, function (i) {
                        i.childNodes.length && (t[e ? "insertNewTweets" : "appendTweets"](i), b.add(t.element, "has-tweets"))
                    })
                },
                schedulePolling: function (t) {
                    var e = this;
                    null !== this.pollInterval && (t = twttr.widgets.poll || t || this.pollInterval || 1e4, t > -1 && window.setTimeout(function () {
                        this.isUpdating || e.update(), e.schedulePolling()
                    }, t))
                },
                updateCursors: function (t, e) {
                    (e || {}).initial ? (this.cursors.maxPosition = t.maxPosition, this.cursors.minPosition = t.minPosition) : (e || {}).newer ? this.cursors.maxPosition = t.maxPosition || this.cursors.maxPosition : this.cursors.minPosition = t.minPosition || this.cursors.minPosition
                },
                requestTweets: function (t, e, i) {
                    var n = this, r = {
                        id: this.widgetId,
                        instanceId: this.instanceId,
                        screenName: this.widgetScreenName,
                        userId: this.widgetUserId,
                        withReplies: this.widgetShowReplies,
                        dnt: this.dnt,
                        lang: this.lang
                    };
                    e && this.cursors.maxPosition ? r.minPosition = this.cursors.maxPosition : !e && this.cursors.minPosition ? r.maxPosition = this.cursors.minPosition : e ? r.sinceId = t : r.maxId = t, r.complete = function () {
                        this.isUpdating = !1
                    }, r.error = function (t) {
                        if (t && t.headers) {
                            if ("404" == t.headers.status)return void(n.pollInterval = null);
                            if ("503" == t.headers.status)return void(n.pollInterval *= 1.5)
                        }
                    }, r.success = function (t) {
                        var r, o, s = n.sandbox.createDocumentFragment(), a = n.sandbox.createElement("ol"), c = [];
                        if (n.updateCursors(t.headers, {newer: e}), t && t.headers && t.headers.xPolling && /\d+/.test(t.headers.xPolling) && (n.pollInterval = 1e3 * t.headers.xPolling), t && void 0 !== t.body) {
                            if (a.innerHTML = t.body, a.children[0] && "LI" != a.children[0].tagName)return;
                            for (o = n.getTweetDetails(a), g.forIn(o, function (t) {
                                c.push(t)
                            }), c.length && (r = n.baseScribeData(), r.item_ids = c, r.item_details = o, r.event_initiator = e ? T.CLIENT_SIDE_APP : T.CLIENT_SIDE_USER, this.timelineType && l.enqueue({
                                page: this.timelineType + "_timeline",
                                component: "timeline",
                                element: "initial",
                                action: c.length ? "results" : "no_results"
                            }, r, !0, this.dnt), l.enqueue({
                                page: "timeline",
                                component: "timeline",
                                element: e ? "newer" : "older",
                                action: "results"
                            }, r, !0, n.dnt), l.flush()), u.retinize(a), n.constrainMedia(a); a.children[0];)s.appendChild(a.children[0]);
                            i(s)
                        }
                    }, a.timelinePoll(g.aug(r, this.override))
                },
                insertNewTweets: function (t) {
                    var e, i = this, n = y.one(N, this.element, "DIV"), r = y.one(S, n, "OL"), s = r.offsetHeight;
                    return r.insertBefore(t, r.firstChild), e = r.offsetHeight - s, twttr.events.trigger("timelineUpdated", {
                        target: this.sandbox.element(),
                        region: "newer"
                    }), n.scrollTop > 40 || this.mouseIsOver() ? (n.scrollTop = n.scrollTop + e, this.updateTimeStamps(), void this.showNewTweetNotifier()) : (b.remove(this.element, P), r.style.cssText = "margin-top: -" + e + "px", window.setTimeout(function () {
                        n.scrollTop = 0, b.add(i.element, P), h.cssTransitions() ? r.style.cssText = "" : o.animate(function (t) {
                            r.style.cssText = e > t ? "margin-top: -" + (e - t) + "px" : ""
                        }, e, 500, o.easeOut)
                    }, 500), this.updateTimeStamps(), void("custom" != this.timelineType && this.gcTweets(50)))
                },
                appendTweets: function (t) {
                    var e = y.one(N, this.element, "DIV"), i = y.one(S, e, "OL");
                    i.appendChild(t), this.updateTimeStamps(), twttr.events.trigger("timelineUpdated", {
                        target: this.sandbox.element(),
                        region: "older"
                    })
                },
                gcTweets: function (t) {
                    var e, i = y.one(S, this.element, "OL"), n = i.children.length;
                    for (t = t || 50; n > t && (e = i.children[n - 1]); n--)i.removeChild(e)
                },
                showNewTweetNotifier: function () {
                    var t = this, e = y.one(A, this.element, "DIV"), i = e.children[0];
                    e.style.cssText = "", e.removeChild(i), e.appendChild(i), b.add(this.element, F), window.setTimeout(function () {
                        b.add(t.element, j)
                    }, 10), this.newNoticeDisplayTime = +new Date, window.setTimeout(function () {
                        t.hideNewTweetNotifier()
                    }, 5e3)
                },
                hideNewTweetNotifier: function (t) {
                    var e = this;
                    (t || !this.mouseOverNotifier) && (b.remove(this.element, j), window.setTimeout(function () {
                        b.remove(e.element, F)
                    }, 500))
                },
                augmentWidgets: function (t) {
                    var e = y.one(R, t, "A");
                    e && (e.setAttribute("data-related", this.related), e.setAttribute("data-partner", this.partner), e.setAttribute("data-dnt", this.dnt), e.setAttribute("data-search-query", this.searchQuery), e.setAttribute("data-profile-id", this.profileId), this.width < 250 && e.setAttribute("data-show-screen-name", "false"), twttr.widgets.load(e.parentNode))
                },
                discardStaticOverflow: function (t) {
                    var e, i = y.one(S, t, "OL");
                    if (this.staticTimeline)for (this.height = 0; e = i.children[this.tweetLimit];)i.removeChild(e)
                },
                hideStreamScrollBar: function () {
                    var t, e = y.one(N, this.element, "DIV"), i = y.one(S, this.element, "OL");
                    e.style.width = "", t = this.element.offsetWidth - i.offsetWidth, t > 0 && (e.style.width = this.element.offsetWidth + t + "px")
                },
                readTranslations: function () {
                    var t = this.element, e = "data-dt-";
                    this.datetime = new n(g.compact({
                        phrases: {
                            now: t.getAttribute(e + "now"),
                            s: t.getAttribute(e + "s"),
                            m: t.getAttribute(e + "m"),
                            h: t.getAttribute(e + "h"),
                            second: t.getAttribute(e + "second"),
                            seconds: t.getAttribute(e + "seconds"),
                            minute: t.getAttribute(e + "minute"),
                            minutes: t.getAttribute(e + "minutes"),
                            hour: t.getAttribute(e + "hour"),
                            hours: t.getAttribute(e + "hours")
                        },
                        months: t.getAttribute(e + "months").split("|"),
                        formats: {
                            abbr: t.getAttribute(e + "abbr"),
                            shortdate: t.getAttribute(e + "short"),
                            longdate: t.getAttribute(e + "long")
                        }
                    }))
                },
                updateTimeStamps: function () {
                    for (var t, e, i, n, r = y.all(C, this.element, "A"), o = 0; t = r[o]; o++)i = t.getAttribute("data-datetime"), n = i && this.datetime.timeAgo(i, this.i18n), e = t.getElementsByTagName("TIME")[0], n && (e && e.innerHTML ? e.innerHTML = n : t.innerHTML = n)
                },
                mouseIsOver: function () {
                    return this.mouseOver
                },
                addUrlParams: function (t) {
                    var e = this, i = {
                        tw_w: this.widgetId,
                        related: this.related,
                        partner: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId,
                        original_referer: s.url(),
                        tw_p: "embeddedtimeline"
                    };
                    return this.addUrlParams = c(i, function (t) {
                        var i = y.ancestor("." + k, t, e.element);
                        return i && {tw_i: i.getAttribute("data-tweet-id")}
                    }), this.addUrlParams(t)
                },
                showNSFW: function (t) {
                    var e, i, n, r, o, s, a = y.one("nsfw", t, "DIV"), l = 0;
                    a && (i = u.scaleDimensions(a.getAttribute("data-width"), a.getAttribute("data-height"), this.contentWidth(), a.getAttribute("data-height")), e = !!(r = a.getAttribute("data-player")), e ? o = this.sandbox.createElement("iframe") : (o = this.sandbox.createElement("img"), r = a.getAttribute(h.retina() ? "data-image-2x" : "data-image"), o.alt = a.getAttribute("data-alt"), s = this.sandbox.createElement("a"), s.href = a.getAttribute("data-href"), s.appendChild(o)), o.title = a.getAttribute("data-title"), o.src = r, o.width = i.width, o.height = i.height, n = y.ancestor("." + O, a, t), l = i.height - a.offsetHeight, a.parentNode.replaceChild(e ? o : s, a), n.style.cssText = "height:" + (n.offsetHeight + l) + "px")
                },
                toggleExpando: function (t) {
                    var i, n, r = y.one(O, t, "DIV"), o = r && r.children[0], s = o && o.getAttribute("data-expanded-media"), a = 0, l = y.one(L, t, "A"), c = l && l.getElementsByTagName("B")[0], d = c && (c.innerText || c.textContent);
                    if (c) {
                        if (this.layout(function () {
                                c.innerHTML = l.getAttribute("data-toggled-text"), l.setAttribute("data-toggled-text", d)
                            }), b.present(t, D))return this.layout(function () {
                            b.remove(t, D)
                        }), r ? (this.layout(function () {
                            r.style.cssText = "", o.innerHTML = ""
                        }), void e.doLayout()) : void e.doLayout();
                        s && (i = this.sandbox.createElement("DIV"), i.innerHTML = s, u.retinize(i), a = this.constrainMedia(i), this.layout(function () {
                            o.appendChild(i)
                        })), r && this.layout(function () {
                            n = Math.max(o.offsetHeight, a), r.style.cssText = "height:" + n + "px"
                        }), this.layout(function () {
                            b.add(t, D)
                        }), e.doLayout()
                    }
                },
                recalculateStreamHeight: function (t) {
                    var e = y.one(E, this.element, "DIV"), i = y.one(I, this.element, "DIV"), n = y.one(N, this.element, "DIV");
                    this.layout(g.bind(function () {
                        var r = e.offsetHeight + (i ? i.offsetHeight : 0), o = t || this.sandbox.height();
                        n.style.cssText = "height:" + (o - r - 2) + "px", this.noscrollbar && this.hideStreamScrollBar()
                    }, this))
                },
                handleResize: function (t, i) {
                    var n = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, t)));
                    (n != this.width || i != this.height) && (this.width = n, this.height = i, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(n)), this.staticTimeline ? this.layout(g.bind(function () {
                        this.height = this.element.offsetHeight, this.sandbox.height(this.height), twttr.events.trigger("resize", {target: this.sandbox.element()})
                    }, this)) : (this.recalculateStreamHeight(i), twttr.events.trigger("resize", {target: this.sandbox.element()})), e.doLayoutAsync())
                }
            }), t(_)
        })
    }), provide("tfw/widget/embed", function (t) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "tfw/util/params", "dom/classname", "dom/get", "util/env", "util/promise", "util/util", "util/throttle", "util/twitter", "tfw/util/article", "tfw/util/data", "tfw/util/tracking", "tfw/util/media", function (e, i, n, r, o, s, a, u, l, c, d, h, f, m, w) {
            function p(t, e, i, n) {
                var r = s.one("subject", t, "BLOCKQUOTE"), o = s.one("reply", t, "BLOCKQUOTE"), a = r && r.getAttribute("data-tweet-id"), u = o && o.getAttribute("data-tweet-id"), c = {}, d = {};
                a && (c[a] = {item_type: 0}, m.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "tweet",
                    action: "results"
                }, l.aug({}, e, {
                    item_ids: [a],
                    item_details: c
                }), !0, n), m.scribeTweetAudienceImpression(n), u && (d[u] = {item_type: 0}, m.enqueue({
                    page: "tweet",
                    section: "conversation",
                    component: "tweet",
                    action: "results"
                }, l.aug({}, e, {
                    item_ids: [u],
                    item_details: d,
                    associations: {4: {association_id: a, association_type: 4}}
                }), !0, n)))
            }

            function g(t, e, i) {
                var n = {};
                t && (n[t] = {item_type: 0}, m.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "rawembedcode",
                    action: "no_results"
                }, {
                    widget_origin: h.url(),
                    widget_frame: h.frameUrl(),
                    message: e,
                    item_ids: [t],
                    item_details: n
                }, !0, i), m.scribeTweetAudienceImpression(i))
            }

            function v(t, e, i, n) {
                T[t] = T[t] || [], T[t].push({s: i, f: n, lang: e})
            }

            function b() {
                A.length && twttr.widgets.load(A)
            }

            function y(t) {
                if (t) {
                    var e, n, r;
                    i.apply(this, [t]), e = this.params(), n = this.srcEl && this.srcEl.getElementsByTagName("A"), r = n && n[n.length - 1], this.hideThread = "none" == (e.conversation || this.dataAttr("conversation")) || ~l.indexOf(this.classAttr, "tw-hide-thread"), this.hideCard = "hidden" == (e.cards || this.dataAttr("cards")) || ~l.indexOf(this.classAttr, "tw-hide-media"), "left" == (e.align || this.attr("align")) || ~l.indexOf(this.classAttr, "tw-align-left") ? this.align = "left" : "right" == (e.align || this.attr("align")) || ~l.indexOf(this.classAttr, "tw-align-right") ? this.align = "right" : ("center" == (e.align || this.attr("align")) || ~l.indexOf(this.classAttr, "tw-align-center")) && (this.align = "center", this.containerWidth > this.dimensions.MIN_WIDTH * (1 / .7) && this.width > .7 * this.containerWidth && (this.width = .7 * this.containerWidth)), this.narrow = e.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.tweetId = e.tweetId || r && d.status(r.href)
                }
            }

            var _ = "tweetembed", T = {}, x = [], A = [];
            y.prototype = new i, l.aug(y.prototype, {
                renderedClassNames: "twitter-tweet twitter-tweet-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "0",
                    DEFAULT_WIDTH: "500",
                    NARROW_WIDTH: "350",
                    MIN_WIDTH: "220",
                    MIN_HEIGHT: "0",
                    WIDE_MEDIA_PADDING: 32,
                    NARROW_MEDIA_PADDING: 32,
                    BORDERS: 0
                },
                create: function (t) {
                    var e, i, n = this.sandbox.createElement("div");
                    return n.innerHTML = t, (e = n.children[0] || !1) ? ("dark" == this.theme && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), o.present(e, "media-forward") && (this.fullBleedPhoto = !0), this.augmentWidgets(e), w.retinize(e), e.id = this.id, e.className += " " + this.classAttr.join(" "), e.lang = this.lang, this.sandbox.setTitle(e.getAttribute("data-iframe-title") || "Tweet"), this.sandbox.appendChild(e).then(l.bind(function () {
                        this.renderResolver.fulfill(this.sandbox)
                    }, this)), this.sandbox.style({
                        cssText: "",
                        display: "block",
                        maxWidth: "99%",
                        minWidth: this.dimensions.MIN_WIDTH + "px",
                        padding: "0",
                        borderRadius: "5px",
                        margin: "10px 0",
                        border: "#ddd 1px solid",
                        borderTopColor: "#eee",
                        borderBottomColor: "#bbb",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        position: "absolute",
                        visibility: "hidden"
                    }), i = this.layout(l.bind(function () {
                        this.predefinedWidth = this.width, this.width = this.sandbox.width(this.width), this.collapseRegions()
                    }, this), "Insert Sandbox"), i.then(l.bind(function () {
                        this.constrainMedia(e, this.contentWidth(this.width)), this.setNarrow().then(l.bind(function () {
                            this.layout(l.bind(function () {
                                this.completeResolver.fulfill(this.sandbox.element())
                            }, this))
                        }, this))
                    }, this)), p(e, this.baseScribeData(), this.partner, this.dnt), e) : void 0
                },
                render: function (t, i) {
                    var n = "", r = this.tweetId;
                    return r ? (this.hideCard && (n += "c"), this.hideThread && (n += "t"), n && (r += "-" + n), this.rendered().then(l.bind(function (t) {
                        this.srcEl && this.srcEl.parentNode && this.layout(l.bind(function () {
                            this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl)
                        }, this), "Remove Embed Code"), "center" == this.align ? t.style({
                            margin: "7px auto",
                            cssFloat: "none"
                        }) : this.align && (this.width == this.dimensions.DEFAULT_WIDTH && (this.predefinedWidth = this.width = this.dimensions.NARROW_WIDTH), t.style({cssFloat: this.align})), this.layout(l.bind(function () {
                            this.height = this.sandbox.height(this.element.offsetHeight)
                        }, this)).then(l.bind(function () {
                            return e.doLayoutAsync(), this.layout(l.bind(function () {
                                this.height = this.sandbox.height(this.element.offsetHeight)
                            }, this))
                        }, this)).then(l.bind(function () {
                            t.onresize(l.bind(this.handleResize, this))
                        }, this)), t.style({position: "static", visibility: "visible"}), e.doLayoutAsync()
                    }, this)), v(r, this.lang, l.bind(function (t) {
                        this.ready().then(l.bind(function () {
                            this.element = this.create(t), this.readTimestampTranslations(), this.updateTimeStamps(), this.bindIntentHandlers(), e.doLayoutAsync()
                        }, this))
                    }, this), l.bind(function () {
                        g(this.tweetId, this.partner, this.dnt), this.completeResolver.fulfill(this.srcEl)
                    }, this)), x.push(this.completed()), i && this.completed().then(i), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed())
                },
                augmentWidgets: function (t) {
                    var e = s.one("twitter-follow-button", t, "A");
                    e && (e.setAttribute("data-related", this.related), e.setAttribute("data-partner", this.partner), e.setAttribute("data-dnt", this.dnt), e.setAttribute("data-show-screen-name", "false"), A.push(e.parentNode))
                },
                addUrlParams: function (t) {
                    var e = this, i = {
                        related: this.related,
                        partner: this.partner,
                        original_referer: h.url(),
                        tw_p: _
                    };
                    return this.addUrlParams = r(i, function (t) {
                        var i = s.ancestor(".tweet", t, e.element);
                        return {tw_i: i.getAttribute("data-tweet-id")}
                    }), this.addUrlParams(t)
                },
                baseScribeData: function () {
                    return {widget_origin: h.url(), widget_frame: h.frameUrl(), message: this.partner}
                },
                handleResize: function (t) {
                    t != this.width && (this.width = t, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(t)), this.collapseRegions(), this.layout(l.bind(function () {
                        this.height = this.sandbox.height(this.element.offsetHeight), twttr.events.trigger("resize", {target: this.sandbox.element()})
                    }, this)), e.doLayoutAsync())
                },
                readTimestampTranslations: function () {
                    var t = this.element, e = "data-dt-", i = t.getAttribute(e + "months") || "";
                    this.datetime = new n(l.compact({
                        phrases: {
                            AM: t.getAttribute(e + "am"),
                            PM: t.getAttribute(e + "pm")
                        }, months: i.split("|"), formats: {full: t.getAttribute(e + "full")}
                    }))
                },
                updateTimeStamps: function () {
                    var t = s.one("long-permalink", this.element, "A"), i = t.getAttribute("data-datetime"), n = i && this.datetime.localTimeStamp(i), r = t.getElementsByTagName("TIME")[0];
                    n && (this.layout(function () {
                        return r && r.innerHTML ? void(r.innerHTML = n) : void(t.innerHTML = n)
                    }, "Update Timestamp"), e.doLayoutAsync())
                }
            }), y.fetchAndRender = function () {
                var t, i, n = T, r = [];
                if (T = {}, n.keys)r = n.keys(); else for (t in n)n.hasOwnProperty(t) && r.push(t);
                r.length && (m.initPostLogging(), i = n[r[0]][0].lang, f.tweets({
                    ids: r.sort(),
                    lang: i,
                    complete: function (t) {
                        l.forIn(t, function (t, e) {
                            var i = n[t];
                            l.forEach(i, function (t) {
                                t.s && t.s.call(this, e)
                            }), delete n[t]
                        }), e.doLayout(), l.forIn(n, function (t, e) {
                            l.forEach(e, function (e) {
                                e.f && e.f.call(this, t)
                            })
                        }), e.doLayout()
                    }
                }), u.every.apply(null, x).then(function () {
                    b(), m.flush()
                }), x = [])
            }, e.afterLoad(y.fetchAndRender), t(y)
        })
    }), provide("dom/textsize", function (t) {
        function e(t, e, i) {
            for (var n, r = [], o = 0; n = i[o]; o++)r.push(n[0]), r.push(n[1]);
            return t + e + r.join(":")
        }

        function i(t) {
            var e = t || "";
            return e.replace(/([A-Z])/g, function (t) {
                return "-" + t.toLowerCase()
            })
        }

        var n = {};
        t(function (t, r, o) {
            var s, a = document.createElement("span"), u = {}, l = "", c = 0, d = 0, h = [];
            if (o = o || [], r = r || "", l = e(t, r, o), n[l])return n[l];
            a.className = r + " twitter-measurement";
            try {
                for (; s = o[c]; c++)a.style[s[0]] = s[1]
            } catch (f) {
                for (; s = o[d]; d++)h.push(i(s[0]) + ":" + s[1]);
                a.setAttribute("style", h.join(";") + ";")
            }
            return a.innerHTML = t, document.body.appendChild(a), u.width = a.clientWidth || a.offsetWidth, u.height = a.clientHeight || a.offsetHeight, document.body.removeChild(a), a = null, n[l] = u
        })
    }), provide("tfw/widget/follow", function (t) {
        using("util/util", "tfw/widget/base", "util/querystring", "util/uri", "util/twitter", "util/promise", "dom/textsize", function (e, i, n, r, o, s, a) {
            function u(t) {
                if (t) {
                    var e, n, r, s;
                    i.apply(this, [t]), e = this.params(), n = e.size || this.dataAttr("size"), r = e.showScreenName || this.dataAttr("show-screen-name"), s = e.count || this.dataAttr("count"), this.classAttr.push("twitter-follow-button"), this.showScreenName = "false" != r, this.showCount = !(e.showCount === !1 || "false" == this.dataAttr("show-count")), "none" == s && (this.showCount = !1), this.explicitWidth = e.width || this.dataAttr("width") || "", this.screenName = e.screen_name || e.screenName || o.screenName(this.attr("href")), this.preview = e.preview || this.dataAttr("preview") || "", this.align = e.align || this.dataAttr("align") || "", this.size = "large" == n ? "l" : "m"
                }
            }

            u.prototype = new i, e.aug(u.prototype, {
                iframeSource: "/widgets/follow_button.33b190ea0cba008796487b65df7f6d8e.{{lang}}.html",
                widgetUrlParams: function () {
                    return e.compact({
                        screen_name: this.screenName,
                        lang: this.lang,
                        show_count: this.showCount,
                        show_screen_name: this.showScreenName,
                        align: this.align,
                        id: this.id,
                        preview: this.preview,
                        size: this.size,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +new Date
                    })
                },
                width: function () {
                    if (this.calculatedWidth)return this.calculatedWidth;
                    if (this.explicitWidth)return this.explicitWidth;
                    var t, i, n = {
                        cnt: 13,
                        btn: 24,
                        xlcnt: 22,
                        xlbtn: 38
                    }, r = this.showScreenName ? "Follow %{screen_name}" : "Follow", o = this._(r, {screen_name: "@" + this.screenName}), s = this._(~e.indexOf(["ja", "ko"], this.lang) ? "10k unit" : "M"), u = this._("%{followers_count} followers", {followers_count: "88888" + s}), l = 0, c = 0, d = this.styles.base;
                    return "l" == this.size ? (d = d.concat(this.styles.large), t = n.xlbtn, i = n.xlcnt) : (t = n.btn, i = n.cnt), this.showCount && (c = a(u, "", d).width + i), l = a(o, "", d.concat(this.styles.button)).width + t, this.calculatedWidth = l + c
                },
                render: function (t, i) {
                    if (!this.screenName)return s.reject("Missing Screen Name").then(i);
                    var n = this.makeIframeSource(), r = this.create(n, this.dimensions(), {title: this._("Twitter Follow Button")}).then(e.bind(function (t) {
                        return this.element = t
                    }, this));
                    return i && r.then(i), r
                }
            }), t(u)
        })
    }), provide("tfw/widget/tweetbutton", function (t) {
        using("tfw/widget/base", "tfw/util/globals", "util/util", "util/querystring", "util/uri", "util/twitter", "util/typevalidator", "dom/textsize", function (e, i, n, r, o, s, a, u) {
            function l(t) {
                e.apply(this, [t]);
                var r = this.params(), a = r.count || this.dataAttr("count"), u = r.size || this.dataAttr("size"), l = o.getScreenNameFromPage(), m = "" + (r.shareWithRetweet || this.dataAttr("share-with-retweet") || i.val("share-with-retweet"));
                this.classAttr.push("twitter-tweet-button"), "hashtag" == r.type || ~n.indexOf(this.classAttr, "twitter-hashtag-button") ? (this.type = "hashtag", this.classAttr.push("twitter-hashtag-button")) : "mention" == r.type || ~n.indexOf(this.classAttr, "twitter-mention-button") ? (this.type = "mention", this.classAttr.push("twitter-mention-button")) : this.classAttr.push("twitter-share-button"), this.text = r.text || this.dataAttr("text"), this.text && /\+/.test(this.text) && !/ /.test(this.text) && (this.text = this.text.replace(/\+/g, " ")), this.counturl = r.counturl || this.dataAttr("counturl"), this.searchlink = r.searchlink || this.dataAttr("searchlink"), this.button_hashtag = s.hashTag(r.button_hashtag || r.hashtag || this.dataAttr("button-hashtag"), !1), this.size = "large" == u ? "l" : "m", this.align = r.align || this.dataAttr("align") || "", this.via = r.via || this.dataAttr("via"), this.hashtags = r.hashtags || this.dataAttr("hashtags"), this.screen_name = s.screenName(r.screen_name || r.screenName || this.dataAttr("button-screen-name")), this.url = r.url || this.dataAttr("url"), this.type ? (this.count = "none", this.shareWithRetweet = "never", l && (this.related = this.related ? l + "," + this.related : l)) : (this.text = this.text || c, this.url = this.url || o.getCanonicalURL() || d, this.count = ~n.indexOf(h, a) ? a : "horizontal", this.count = "vertical" == this.count && "l" == this.size ? "none" : this.count, this.via = this.via || l, m && ~n.indexOf(f, m) && (this.shareWithRetweet = m.replace("-", "_")))
            }

            var c = document.title, d = location.href, h = ["vertical", "horizontal", "none"], f = [, "never", "publisher-first", "publisher-only", "author-first", "author-only"];
            l.prototype = new e, n.aug(l.prototype, {
                iframeSource: "/widgets/tweet_button.378d258ae34e4697b1163b509c82f85f.{{lang}}.html",
                widgetUrlParams: function () {
                    return n.compact({
                        text: this.text,
                        url: this.url,
                        via: this.via,
                        related: this.related,
                        count: this.count,
                        lang: this.lang,
                        counturl: this.counturl,
                        searchlink: this.searchlink,
                        placeid: this.placeid,
                        original_referer: location.href,
                        id: this.id,
                        size: this.size,
                        type: this.type,
                        screen_name: this.screen_name,
                        share_with_retweet: this.shareWithRetweet,
                        button_hashtag: this.button_hashtag,
                        hashtags: this.hashtags,
                        align: this.align,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +new Date
                    })
                },
                height: function () {
                    return "vertical" == this.count ? 62 : "m" == this.size ? 20 : 28
                },
                width: function () {
                    var t = {
                        ver: 8,
                        cnt: 14,
                        btn: 24,
                        xlcnt: 18,
                        xlbtn: 38
                    }, e = "vertical" == this.count, i = "hashtag" == this.type && this.button_hashtag ? "Tweet %{hashtag}" : "mention" == this.type && this.screen_name ? "Tweet to %{name}" : "Tweet", r = this._(i, {
                        name: "@" + this.screen_name,
                        hashtag: "#" + this.button_hashtag
                    }), o = this._("K"), s = this._("100K+"), a = (e ? "8888" : "88888") + o, l = 0, c = 0, d = 0, h = 0, f = this.styles.base, m = f;
                    return ~n.indexOf(["ja", "ko"], this.lang) ? a += this._("10k unit") : a = a.length > s.length ? a : s, e ? (m = f.concat(this.styles.vbubble), h = t.ver, d = t.btn) : "l" == this.size ? (f = m = f.concat(this.styles.large), d = t.xlbtn, h = t.xlcnt) : (d = t.btn, h = t.cnt), "none" != this.count && (c = u(a, "", m).width + h), l = u(r, "", f.concat(this.styles.button)).width + d, e ? l > c ? l : c : this.calculatedWidth = l + c
                },
                render: function (t, e) {
                    var i, r = this.makeIframeSource();
                    return this.count && this.classAttr.push("twitter-count-" + this.count), i = this.create(r, this.dimensions(), {title: this._("Twitter Tweet Button")}).then(n.bind(function (t) {
                        return this.element = t
                    }, this)), e && i.then(e), i
                }
            }), t(l)
        })
    }), provide("tfw/factories", function (t) {
        using("util/util", "util/promise", "util/twitter", "tfw/widget/base", "tfw/widget/tweetbutton", "tfw/widget/follow", "tfw/widget/embed", "tfw/widget/timeline", function (e, i, n, r, o, s, a, u) {
            function l(t, n, o, s) {
                return t = t || [], o = o || {}, function () {
                    var a, u, l, c, d = Array.prototype.slice.apply(arguments, [0, t.length]), h = Array.prototype.slice.apply(arguments, [t.length]);
                    return e.forEach(h, function (t) {
                        return t ? 1 === t.nodeType ? void(l = t) : e.isType("function", t) ? void(a = t) : void(e.isType("object", t) && (u = t)) : void 0
                    }), d.length != t.length || 0 === h.length ? (a && e.async(function () {
                        a(!1)
                    }), i.reject("Not enough parameters")) : l ? (u = e.aug(u || {}, o), u.targetEl = l, e.forEach(t, function (t) {
                        u[t] = d.shift()
                    }), c = new n(u), r.doLayout(), c.render(twttr.widgets.config), s && s(), a && c.completed().then(a, function () {
                        a(!1)
                    }), c.completed()) : (a && e.async(function () {
                        a(!1)
                    }), i.reject("No target specified"))
                }
            }

            function c(t) {
                var i;
                t.linkColor = t.linkColor || t.previewParams.link_color, t.theme = t.theme || t.previewParams.theme, t.height = t.height || t.previewParams.height, i = new u(t), this.render = e.bind(i.render, i), this.completed = e.bind(i.completed, i)
            }

            var d = l(["url"], o, {type: "share"}), h = l(["hashtag"], o, {type: "hashtag"}), f = l(["screenName"], o, {type: "mention"}), m = l(["screenName"], s), w = l(["tweetId"], a, {}, a.fetchAndRender), p = l(["widgetId"], u), g = l(["previewParams"], c), v = {
                createShareButton: d,
                createMentionButton: f,
                createHashtagButton: h,
                createFollowButton: m,
                createTweet: w,
                createTweetEmbed: w,
                createTimeline: p
            };
            n.isTwitterURL(window.location.href) && (v.createTimelinePreview = g), t(v)
        })
    }), !function () {
        window.twttr = window.twttr || {}, twttr.host = twttr.host || "platform.twitter.com", using("util/domready", "util/env", "util/logger", function (t, e, i) {
            function n(t) {
                return !t && /^http\:$/.test(window.location.protocol) || twttr.ignoreSSL ? "http" : "https"
            }

            if (!e.ie6()) {
                if (twttr.widgets && twttr.widgets.loaded)return twttr.widgets.load(), !1;
                if (twttr.init)return !1;
                twttr.init = !0, twttr._e = twttr._e || [], twttr.ready = twttr.ready || function (t) {
                    twttr.widgets && twttr.widgets.loaded ? t(twttr) : twttr._e.push(t)
                }, twttr.ignoreSSL = twttr.ignoreSSL || !1;
                var r = [];
                twttr.events = {
                    bind: function (t, e) {
                        return r.push([t, e])
                    }
                }, t(function () {
                    using("tfw/widget/base", "tfw/widget/follow", "tfw/widget/tweetbutton", "tfw/widget/embed", "tfw/widget/timeline", "tfw/widget/intent", "tfw/factories", "tfw/util/article", "util/events", "util/util", function (t, e, o, s, a, u, l, c, d, h) {
                        function f(t) {
                            var e = twttr.host;
                            return "https" == n(t) && twttr.secureHost && (e = twttr.secureHost), n(t) + "://" + e
                        }

                        function m() {
                            using("tfw/hub/client", function (t) {
                                twttr.events.hub = t.init(p), t.init(p, !0)
                            })
                        }

                        var w, p = {
                            widgets: {
                                "a.twitter-share-button": o,
                                "a.twitter-mention-button": o,
                                "a.twitter-hashtag-button": o,
                                "a.twitter-follow-button": e,
                                "blockquote.twitter-tweet": s,
                                "a.twitter-timeline": a,
                                "div.twitter-timeline": a,
                                body: u
                            }
                        }, g = twttr.events && twttr.events.hub ? twttr.events : {};
                        p.assetUrl = f, twttr.widgets = twttr.widgets || {}, h.aug(twttr.widgets, l, {
                            config: {assetUrl: f},
                            load: function (e) {
                                i.time("load"), t.init(p), t.embed(e), twttr.widgets.loaded = !0
                            }
                        }), h.aug(twttr.events, g, d.Emitter), w = twttr.events.bind, twttr.events.bind = function (t, e) {
                            m(), this.bind = w, this.bind(t, e)
                        }, h.forEach(r, function (t) {
                            twttr.events.bind(t[0], t[1])
                        }), h.forEach(twttr._e, function (t) {
                            h.async(function () {
                                t(twttr)
                            })
                        }), twttr.ready = function (t) {
                            h.async(function () {
                                t(twttr)
                            })
                        }, twttr.widgets.load()
                    })
                })
            }
        })
    }()
}();

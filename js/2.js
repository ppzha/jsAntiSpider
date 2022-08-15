!function () {
    "use strict";

    function l() {
        return (l = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n, r = arguments[e];
                for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n])
            }
            return t
        }).apply(this, arguments)
    }

    function e(t, e) {
        t.prototype = Object.create(e.prototype), t.prototype.constructor = t, n(t, e)
    }

    function n(t, e) {
        return (n = Object.setPrototypeOf || function n(t, e) {
            return t.__proto__ = e, t
        })(t, e)
    }

    function r(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t
    }

    function p(t, e, n) {
        return "undefined" == typeof t[e] ? n : t[e]
    }

    function h(o, i) {
        return function (t, n) {
            var r = !1;

            function e(t, e) {
                r || (r = !0, n(t, e))
            }

            setTimeout(function () {
                var t = new Error("Timeout.");
                i && g(t, i), e(t)
            }, o), t(e)
        }
    }

    function d() {
        return (new Date).getTime()
    }

    function g(t, e) {
        t.code || (t.originMsg = t.message), t.code = e, t.message = "Error code: [" + e + "]. " + t.originMsg
    }

    Object.create || (Object.create = function (t) {
        if ("object" != typeof t && "function" != typeof t) throw new TypeError("Object prototype may only be an Object: " + t);
        if (null === t) throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");

        function e() {
        }

        return e.prototype = t, new e
    });
    var f = function f(i, a) {
        var u, s = !1, e = [];

        function c() {
            for (; e.length;) e.shift().call(null, u)
        }

        return function (t, n, r, o) {
            t = l({}, r, {
                src: t,
                retryCnt: p(o, "mainCDNRetryCnt", 1),
                mainReportRetryCnt: p(o, "mainReportRetryCnt", 1),
                secondReportRetryCnt: p(o, "secondReportRetryCnt", 0)
            });
            return u = new a(i, t), n ? u.getTarget(function (t, e) {
                s = !0, !t && e || (t = l({}, r, {
                    src: n,
                    retryCnt: p(o, "secondCDNRetryCnt", 0),
                    mainReportRetryCnt: p(o, "mainReportRetryCnt", 1),
                    secondReportRetryCnt: p(o, "secondReportRetryCnt", 0)
                }), u = new a(i, t)), c()
            }) : (s = !0, c()), function (t) {
                s ? t(u) : e.push(t)
            }
        }
    }, o = "abclite", i = "acs", v = "auto-report", c = "active-report", s = "acs-get-sign";
    var a = "1.0.1-beta.0", y = !1;
    var u = function () {
        function t(t, e) {
            this.sid = t, this.group = e
        }

        var e = t.prototype;
        return e.log = function (t) {
            if (y) {
                var e = (t = {url: "https://miao.baidu.com/sdk_log", data: JSON.stringify(t)}).url, n = t.data,
                    r = t.success, o = t.error, i = void 0 === (a = t.headers) ? {} : a, a = t.withCredentials,
                    t = window.XDomainRequest;
                if (a === undefined && (a = !0), t) {
                    var u = new t;
                    u.open("post", e, !0), a && (u.withCredentials = !0), u.onerror = function (t) {
                        o && o(t)
                    }, u.onload = function () {
                        var t = u.responseText;
                        r && r(t)
                    }, u.send(n)
                } else {
                    var s, c = new XMLHttpRequest;
                    for (s in c.open("POST", e, !0), i) c.setRequestHeader(s, i[s]);
                    a && (c.withCredentials = !0), c.onreadystatechange = function (t) {
                        var e;
                        4 === c.readyState && 200 === c.status && (e = c.responseText, r && r(e, c))
                    }, c.onerror = function (t) {
                        o && o(t)
                    }, c.send(n)
                }
            }
        }, e.error = function (t, e, n) {
            var r = this.sid, o = this.group, i = n.code || 600, r = {
                sid: r,
                group: o,
                type: t,
                total: e,
                status: 1,
                error: n.message + "\n" + n.stack,
                extra: {errorCode: i, version: a}
            };
            this.log(r)
        }, e.success = function (t, e) {
            var n = this.sid, r = this.group;
            this.log({sid: n, group: r, type: t, total: e, status: 0, error: "", extra: {version: a}})
        }, t
    }();

    function m(t) {
        var e;
        return (t = void 0 === t ? "" : t) && (e = 0 < t.indexOf("?") ? "&" : "?", t = t + e + "_o=" + encodeURIComponent(location.protocol + "//" + location.host)), t
    }

    var R = function () {
        function t(t, e) {
            this.loadController = null, this.state = 1, this.evalData = null, this.autoResponse = "", this.autoError = null, this.reportCnt = 0, this.monitor = null, this.autoResponseQueue = [], this.loadController = e, this.monitor = new u(t, o)
        }

        var e = t.prototype;
        return e.handleTargetError = function (t) {
            this.state = 2, this.autoError = t, this.evalAutoQueue(t)
        }, e.autoReportInit = function () {
            var r = this, t = this.loadController, o = t.opts;
            t.getTarget(function (t, e) {
                if (t) r.handleTargetError(t); else {
                    t = e;
                    r.state = 3;
                    try {
                        t.initData(o, function (t) {
                            r.evalData = t, r.autoReport()
                        })
                    } catch (n) {
                        r.state = 4;
                        e = new Error("Eval error, msg: " + n.message);
                        return g(e, 551), r.autoError = e, void r.evalAutoQueue(e)
                    }
                }
            })
        }, e.autoReport = function (r) {
            var o = this, t = this.loadController, e = t.opts, i = e.reportTimeout, a = e.mainReportUrl;
            t.getTarget(function (t, e) {
                var n;
                t ? o.handleTargetError(t) : (o.reportCnt++, n = e, o.state = 5, h(i, 561)(function (e) {
                    r = r || m(a), n.report({
                        url: r, data: o.evalData, success: function (t) {
                            e(null, t)
                        }, error: function (t) {
                            g(t, 571), e(t)
                        }
                    })
                }, function (t, e) {
                    if (t) return o.state = 6, o.autoError = t, void o.evalAutoQueue(t, null);
                    o.state = 7, o.autoResponse = e, o.autoError = null, o.evalAutoQueue(null, e)
                }))
            })
        }, e.pushAutoQueue = function (t) {
            this.autoResponseQueue.push(t)
        }, e.evalAutoQueue = function () {
            for (; this.autoResponseQueue.length;) if (2 === this.autoResponseQueue.shift().apply(null, arguments)) break
        }, e.getAutoResponse = function (i) {
            var a = this, t = this.state, e = this.loadController, u = this.monitor, s = d();
            var e = e.opts, c = e.mainReportRetryCnt, l = e.secondReportRetryCnt, f = e.secondReportUrl,
                p = function p(t, e) {
                    if (6 === a.state) {
                        if (a.reportCnt - 1 < c) return a.autoReport(), a.pushAutoQueue(p), 2;
                        if (a.reportCnt - 1 - c < l + 1) return a.autoReport(m(f)), a.pushAutoQueue(p), 2
                    }
                    try {
                        n = t, r = e, o = d() - s, n ? u.error(v, o, n) : (u.success(v, o), i(n, r))
                    } finally {
                        return 1
                    }
                    var n, r, o
                };
            1 === t || 3 === t || 5 === t ? this.pushAutoQueue(p) : p(this.error, this.autoResponse)
        }, e.activeReport = function (r, o, i, a) {
            var u = this, t = (void 0 === i && (i = 0), this.loadController), s = t.opts, c = s.mainReportRetryCnt,
                l = s.reportTimeout, f = s.mainReportUrl, p = s.secondReportRetryCnt;
            i++, t.getTarget(function (t, e) {
                if (t) return o && o(t);
                var n = e;
                h(l, 562)(function (e) {
                    a = a || m(f), n.report({
                        url: a, data: r, success: function (t) {
                            e(null, t)
                        }, error: function (t) {
                            g(t, 570), e(t)
                        }
                    })
                }, function (t, e) {
                    if (t) return i - 1 < c ? void u.activeReport(r, o, i) : i - 1 - c < p + 1 ? void u.activeReport(r, o, i, m(s.secondReportUrl)) : o && o(t);
                    o && o(null, e)
                })
            })
        }, e.getActiveResponse = function (r, o) {
            var i = this, t = this.state, e = this.loadController, a = this.monitor, u = d();

            function s(t, e) {
                var n = d() - u;
                t ? a.error(c, n, t) : (a.success(c, n), o(t, e))
            }

            var n = function n() {
                e.getTarget(function (t, e) {
                    if (t) return s(t);
                    t = e;
                    try {
                        t.initActiveData(r, function (t) {
                            i.activeReport(t, s)
                        })
                    } catch (n) {
                        e = new Error("Eval error. msg: " + n.message);
                        g(e, 552), s(e)
                    }
                })
            };
            1 === t ? this.pushAutoQueue(n) : n()
        }, t
    }();

    function C(t, e) {
        t.onload = function () {
            this.onerror = this.onload = null, e(null, t)
        }, t.onerror = function () {
            this.onerror = this.onload = null, e(new Error("Failed to load " + this.src), t)
        }
    }

    function w(t, e) {
        t.onreadystatechange = function () {
            "complete" != this.readyState && "loaded" != this.readyState || (this.onreadystatechange = null, e(null, t))
        }
    }

    function b(t, e, n) {
        var r = !1, o = p(e, "timeout", 5e3), e = p(e, "clientCacheTTL", 0), i = t;

        function a(t, e) {
            r || (r = !0, n(t, e))
        }

        if (t) {
            e && (u = +new Date, u = "_=" + parseInt(u % (6e4 * e), 10), i = 0 < i.indexOf("?") ? i + "&" + u : i + "?" + u), o && setTimeout(function () {
                a(new Error("Load " + t + " timeout"), null)
            }, o);
            var e = i, u = a, o = void 0, i = document.head || document.getElementsByTagName("head")[0],
                s = document.createElement("script");
            if ("function" == typeof u && (o = u, u = {}), o = o || function () {
            }, s.type = (u = u || {}).type || "text/javascript", s.charset = u.charset || "utf8", s["async"] = !("async" in u) || !!u["async"], s.src = e, u.attrs) {
                var c, l = s, f = u.attrs;
                for (c in f) l.setAttribute(c, f[c])
            }
            u.text && (s.text = "" + u.text), ("onload" in s ? C : w)(s, o), s.onload || C(s, o), i.appendChild(s)
        } else a(new Error("Load script miss src"))
    }

    var T, E, t = function () {
        function t(t) {
            this.state = 0, this.queue = [], this.error = null, this.opts = {}, this.loadCnt = 0, this.opts = t, this.doLoad()
        }

        var e = t.prototype;
        return e.doLoad = function () {
            var n = this, t = (this.error = null, this.loadCnt++, this.state = 1, this.opts), e = t.timeout, r = t.src;
            h(e)(function (t) {
                b(r, n.opts, t)
            }, function (t, e) {
                t ? (n.error = t, n.state = 3) : n.state = 2, n.evalQueue(t, e)
            })
        }, e.pushQueue = function (t) {
            this.queue.push(t)
        }, e.evalQueue = function () {
            for (; this.queue.length;) if (2 === this.queue.shift().apply(null, arguments)) break
        }, e.clearQueue = function () {
            this.queue = []
        }, e.getTarget = function (o) {
            var i = this, t = this.state, a = this.opts, u = function u(t) {
                if (t) {
                    var e = a.retryCnt;
                    if (i.loadCnt - 1 < e) return i.doLoad(), i.pushQueue(u), 2
                }
                try {
                    var n = window[i.targetKey];
                    if (n) return o(null, n);
                    t ? g(t, 400) : n || g(t = new Error("Load for eval error."), 550), o(t, n)
                } catch (r) {
                }
                return 1
            };
            0 === t || 1 === t ? this.pushQueue(u) : u(this.error)
        }, t
    }(), Q = function (n) {
        function t(t, e) {
            e = n.call(this, e) || this;
            return e.targetKey = null, e.instance = null, e.targetKey = "BCat_" + t, window["__abbaidu_" + t + "_advanced"] = !0, window["__abbaidu_" + t + "_paris"] = !0, e.instance = new R(t, r(e)), e.init(), e
        }

        return e(t, n), t.prototype.init = function () {
            this.instance.autoReportInit()
        }, t
    }(t), _ = function () {
        function t(t, e) {
            this.loadController = null, this.state = 1, this.monitor = null, this.loadController = e, this.monitor = new u(t, i)
        }

        return t.prototype.getSign = function (r, o) {
            var i = this.monitor, a = d(), u = function u(t, e) {
                var n = d() - a;
                t ? i.error(s, n, t) : (i.success(s, n), r(t, e))
            };
            this.loadController.getTarget(function (t, e) {
                if (t) return u(t);
                t = e;
                try {
                    t.gs(function (t, e) {
                        u(e, t)
                    }, o)
                } catch (n) {
                    g(n = new Error("Eval error. msg: " + n.message), 553), u(n)
                }
            })
        }, t
    }(), A = function (n) {
        function t(t, e) {
            e = n.call(this, e) || this;
            return e.targetKey = null, e.instance = null, e.targetKey = "$BSB_" + t, e.instance = new _(t, r(e)), e
        }

        return e(t, n), t
    }(t), O = !1;
    window.Paris = {
        init: function (t) {
            var e = t.abcliteUrl, n = t.acsUrl, r = t.sid, o = t.disasterConfig, o = void 0 === o ? {} : o,
                i = t.abcliteFields, i = void 0 === i ? {} : i;
            if (!r) throw new Error("Missing param `sid`");
            var a, u = p(t, "monitoring", !(O = !0)), u = (y = u, {
                timeout: p(t, "timeout", 5e3),
                clientCacheTTL: p(t, "clientCacheTTL", 0),
                mainReportUrl: p(o, "mainReportUrl"),
                secondReportUrl: p(o, "secondReportUrl"),
                reportTimeout: p(o, "reportTimeout", 5e3)
            });
            e && (t = f(r, Q), a = p(o, "abcliteUrl"), T = t(e, a, l({}, u, {
                subid: p(i, "subid"),
                extraData: p(i, "extraData")
            }), o)), n && (e = f(r, A), a = p(o, "acsUrl"), E = e(n, a, u, o))
        }, getAbcliteInstance: function (n) {
            O ? T ? T(function (e) {
                e.getTarget(function (t) {
                    if (t) return n(t);
                    n(null, e.instance)
                })
            }) : n(null, new Error("Missing param `abcliteUrl` during initialization")) : n(null, new Error("You must initialize before getting an instance"))
        }, getAcsInstance: function (n) {
            O ? E ? E(function (e) {
                e.getTarget(function (t) {
                    if (t) return n(t);
                    n(null, e.instance)
                })
            }) : n(null, new Error("Missing param `acsUrl` during initialization")) : n(null, new Error("You must initialize before getting an instance"))
        }
    }
}();
;
var _p = window.Paris;
module.exports = _p;
exports.Paris = window.Paris;
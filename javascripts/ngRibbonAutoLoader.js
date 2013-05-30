/*!
* Bean - copyright (c) Jacob Thornton 2011-2012, https://github.com/fat/bean, MIT license
*/
!function (e, t, n) { typeof module != "undefined" && module.exports ? module.exports = n(e, t) : typeof define == "function" && typeof define.amd == "object" ? define(n) : t[e] = n(e, t) } ("bean", this, function (e, t) { var n = window, r = t[e], i = /[^\.]*(?=\..*)\.|.*/, s = /\..*/, o = "addEventListener", u = "removeEventListener", a = document || {}, f = a.documentElement || {}, l = f[o], c = l ? o : "attachEvent", h = {}, p = Array.prototype.slice, d = function (e, t) { return e.split(t || " ") }, v = function (e) { return typeof e == "string" }, m = function (e) { return typeof e == "function" }, g = "click dblclick mouseup mousedown contextmenu mousewheel mousemultiwheel DOMMouseScroll mouseover mouseout mousemove selectstart selectend keydown keypress keyup orientationchange focus blur change reset select submit load unload beforeunload resize move DOMContentLoaded readystatechange message error abort scroll ", y = "show input invalid touchstart touchmove touchend touchcancel gesturestart gesturechange gestureend textinputreadystatechange pageshow pagehide popstate hashchange offline online afterprint beforeprint dragstart dragenter dragover dragleave drag drop dragend loadstart progress suspend emptied stalled loadmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate play pause ratechange volumechange cuechange checking noupdate downloading cached updateready obsolete ", b = function (e, t, n) { for (n = 0; n < t.length; n++) t[n] && (e[t[n]] = 1); return e } ({}, d(g + (l ? y : ""))), w = function () { var e = "compareDocumentPosition" in f ? function (e, t) { return t.compareDocumentPosition && (t.compareDocumentPosition(e) & 16) === 16 } : "contains" in f ? function (e, t) { return t = t.nodeType === 9 || t === window ? f : t, t !== e && t.contains(e) } : function (e, t) { while (e = e.parentNode) if (e === t) return 1; return 0 }, t = function (t) { var n = t.relatedTarget; return n ? n !== this && n.prefix !== "xul" && !/document/.test(this.toString()) && !e(n, this) : n == null }; return { mouseenter: { base: "mouseover", condition: t }, mouseleave: { base: "mouseout", condition: t }, mousewheel: { base: /Firefox/.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel"}} } (), E = function () { var e = d("altKey attrChange attrName bubbles cancelable ctrlKey currentTarget detail eventPhase getModifierState isTrusted metaKey relatedNode relatedTarget shiftKey srcElement target timeStamp type view which propertyName"), t = e.concat(d("button buttons clientX clientY dataTransfer fromElement offsetX offsetY pageX pageY screenX screenY toElement")), r = t.concat(d("wheelDelta wheelDeltaX wheelDeltaY wheelDeltaZ axis")), i = e.concat(d("char charCode key keyCode keyIdentifier keyLocation location")), s = e.concat(d("data")), o = e.concat(d("touches targetTouches changedTouches scale rotation")), u = e.concat(d("data origin source")), l = e.concat(d("state")), c = /over|out/, h = [{ reg: /key/i, fix: function (e, t) { return t.keyCode = e.keyCode || e.which, i } }, { reg: /click|mouse(?!(.*wheel|scroll))|menu|drag|drop/i, fix: function (e, n, r) { n.rightClick = e.which === 3 || e.button === 2, n.pos = { x: 0, y: 0 }; if (e.pageX || e.pageY) n.clientX = e.pageX, n.clientY = e.pageY; else if (e.clientX || e.clientY) n.clientX = e.clientX + a.body.scrollLeft + f.scrollLeft, n.clientY = e.clientY + a.body.scrollTop + f.scrollTop; return c.test(r) && (n.relatedTarget = e.relatedTarget || e[(r == "mouseover" ? "from" : "to") + "Element"]), t } }, { reg: /mouse.*(wheel|scroll)/i, fix: function () { return r } }, { reg: /^text/i, fix: function () { return s } }, { reg: /^touch|^gesture/i, fix: function () { return o } }, { reg: /^message$/i, fix: function () { return u } }, { reg: /^popstate$/i, fix: function () { return l } }, { reg: /.*/, fix: function () { return e } }], p = {}, v = function (e, t, r) { if (!arguments.length) return; e = e || ((t.ownerDocument || t.document || t).parentWindow || n).event, this.originalEvent = e, this.isNative = r, this.isBean = !0; if (!e) return; var i = e.type, s = e.target || e.srcElement, o, u, a, f, l; this.target = s && s.nodeType === 3 ? s.parentNode : s; if (r) { l = p[i]; if (!l) for (o = 0, u = h.length; o < u; o++) if (h[o].reg.test(i)) { p[i] = l = h[o].fix; break } f = l(e, this, i); for (o = f.length; o--; ) !((a = f[o]) in this) && a in e && (this[a] = e[a]) } }; return v.prototype.preventDefault = function () { this.originalEvent.preventDefault ? this.originalEvent.preventDefault() : this.originalEvent.returnValue = !1 }, v.prototype.stopPropagation = function () { this.originalEvent.stopPropagation ? this.originalEvent.stopPropagation() : this.originalEvent.cancelBubble = !0 }, v.prototype.stop = function () { this.preventDefault(), this.stopPropagation(), this.stopped = !0 }, v.prototype.stopImmediatePropagation = function () { this.originalEvent.stopImmediatePropagation && this.originalEvent.stopImmediatePropagation(), this.isImmediatePropagationStopped = function () { return !0 } }, v.prototype.isImmediatePropagationStopped = function () { return this.originalEvent.isImmediatePropagationStopped && this.originalEvent.isImmediatePropagationStopped() }, v.prototype.clone = function (e) { var t = new v(this, this.element, this.isNative); return t.currentTarget = e, t }, v } (), S = function (e, t) { return !l && !t && (e === a || e === n) ? f : e }, x = function () { var e = function (e, t, n, r) { var i = function (n, i) { return t.apply(e, r ? p.call(i, n ? 0 : 1).concat(r) : i) }, s = function (n, r) { return t.__beanDel ? t.__beanDel.ft(n.target, e) : r }, o = n ? function (e) { var t = s(e, this); if (n.apply(t, arguments)) return e && (e.currentTarget = t), i(e, arguments) } : function (e) { return t.__beanDel && (e = e.clone(s(e))), i(e, arguments) }; return o.__beanDel = t.__beanDel, o }, t = function (t, n, r, i, s, o, u) { var a = w[n], f; n == "unload" && (r = A(O, t, n, r, i)), a && (a.condition && (r = e(t, r, a.condition, o)), n = a.base || n), this.isNative = f = b[n] && !!t[c], this.customType = !l && !f && n, this.element = t, this.type = n, this.original = i, this.namespaces = s, this.eventType = l || f ? n : "propertychange", this.target = S(t, f), this[c] = !!this.target[c], this.root = u, this.handler = e(t, r, null, o) }; return t.prototype.inNamespaces = function (e) { var t, n, r = 0; if (!e) return !0; if (!this.namespaces) return !1; for (t = e.length; t--; ) for (n = this.namespaces.length; n--; ) e[t] == this.namespaces[n] && r++; return e.length === r }, t.prototype.matches = function (e, t, n) { return this.element === e && (!t || this.original === t) && (!n || this.handler === n) }, t } (), T = function () { var e = {}, t = function (n, r, i, s, o, u) { var a = o ? "r" : "$"; if (!r || r == "*") for (var f in e) f.charAt(0) == a && t(n, f.substr(1), i, s, o, u); else { var l = 0, c, h = e[a + r], p = n == "*"; if (!h) return; for (c = h.length; l < c; l++) if ((p || h[l].matches(n, i, s)) && !u(h[l], h, l, r)) return } }, n = function (t, n, r, i) { var s, o = e[(i ? "r" : "$") + n]; if (o) for (s = o.length; s--; ) if (!o[s].root && o[s].matches(t, r, null)) return !0; return !1 }, r = function (e, n, r, i) { var s = []; return t(e, n, r, null, i, function (e) { return s.push(e) }), s }, i = function (t) { var n = !t.root && !this.has(t.element, t.type, null, !1), r = (t.root ? "r" : "$") + t.type; return (e[r] || (e[r] = [])).push(t), n }, s = function (n) { t(n.element, n.type, null, n.handler, n.root, function (t, n, r) { return n.splice(r, 1), t.removed = !0, n.length === 0 && delete e[(t.root ? "r" : "$") + t.type], !1 }) }, o = function () { var t, n = []; for (t in e) t.charAt(0) == "$" && (n = n.concat(e[t])); return n }; return { has: n, get: r, put: i, del: s, entries: o} } (), N, C = function (e) { arguments.length ? N = e : N = a.querySelectorAll ? function (e, t) { return t.querySelectorAll(e) } : function () { throw new Error("Bean: No selector engine installed") } }, k = function (e, t) { if (!l && t && e && e.propertyName != "_on" + t) return; var n = T.get(this, t || e.type, null, !1), r = n.length, i = 0; e = new E(e, this, !0), t && (e.type = t); for (; i < r && !e.isImmediatePropagationStopped(); i++) n[i].removed || n[i].handler.call(this, e) }, L = l ? function (e, t, n) { e[n ? o : u](t, k, !1) } : function (e, t, n, r) { var i; n ? (T.put(i = new x(e, r || t, function (t) { k.call(e, t, r) }, k, null, null, !0)), r && e["_on" + r] == null && (e["_on" + r] = 0), i.target.attachEvent("on" + i.eventType, i.handler)) : (i = T.get(e, r || t, k, !0)[0], i && (i.target.detachEvent("on" + i.eventType, i.handler), T.del(i))) }, A = function (e, t, n, r, i) { return function () { r.apply(this, arguments), e(t, n, i) } }, O = function (e, t, n, r) { var i = t && t.replace(s, ""), o = T.get(e, i, null, !1), u = {}, a, f; for (a = 0, f = o.length; a < f; a++) (!n || o[a].original === n) && o[a].inNamespaces(r) && (T.del(o[a]), !u[o[a].eventType] && o[a][c] && (u[o[a].eventType] = { t: o[a].eventType, c: o[a].type })); for (a in u) T.has(e, u[a].t, null, !1) || L(e, u[a].t, !1, u[a].c) }, M = function (e, t) { var n = function (t, n) { var r, i = v(e) ? N(e, n) : e; for (; t && t !== n; t = t.parentNode) for (r = i.length; r--; ) if (i[r] === t) return t }, r = function (e) { var r = n(e.target, this); r && t.apply(r, arguments) }; return r.__beanDel = { ft: n, selector: e }, r }, _ = l ? function (e, t, r) { var i = a.createEvent(e ? "HTMLEvents" : "UIEvents"); i[e ? "initEvent" : "initUIEvent"](t, !0, !0, n, 1), r.dispatchEvent(i) } : function (e, t, n) { n = S(n, e), e ? n.fireEvent("on" + t, a.createEventObject()) : n["_on" + t]++ }, D = function (e, t, n) { var r = v(t), o, u, a, f; if (r && t.indexOf(" ") > 0) { t = d(t); for (f = t.length; f--; ) D(e, t[f], n); return e } u = r && t.replace(s, ""), u && w[u] && (u = w[u].base); if (!t || r) { if (a = r && t.replace(i, "")) a = d(a, "."); O(e, u, n, a) } else if (m(t)) O(e, null, t); else for (o in t) t.hasOwnProperty(o) && D(e, o, t[o]); return e }, P = function (e, t, n, r) { var o, u, a, f, l, v, g; if (n === undefined && typeof t == "object") { for (u in t) t.hasOwnProperty(u) && P.call(this, e, u, t[u]); return } m(n) ? (l = p.call(arguments, 3), r = o = n) : (o = r, l = p.call(arguments, 4), r = M(n, o, N)), a = d(t), this === h && (r = A(D, e, t, r, o)); for (f = a.length; f--; ) g = T.put(v = new x(e, a[f].replace(s, ""), r, o, d(a[f].replace(i, ""), "."), l, !1)), v[c] && g && L(e, v.eventType, !0, v.customType); return e }, H = function (e, t, n, r) { return P.apply(null, v(n) ? [e, n, t, r].concat(arguments.length > 3 ? p.call(arguments, 5) : []) : p.call(arguments)) }, B = function () { return P.apply(h, arguments) }, j = function (e, t, n) { var r = d(t), o, u, a, f, l; for (o = r.length; o--; ) { t = r[o].replace(s, ""); if (f = r[o].replace(i, "")) f = d(f, "."); if (!f && !n && e[c]) _(b[t], t, e); else { l = T.get(e, t, null, !1), n = [!1].concat(n); for (u = 0, a = l.length; u < a; u++) l[u].inNamespaces(f) && l[u].handler.apply(e, n) } } return e }, F = function (e, t, n) { var r = T.get(t, n, null, !1), i = r.length, s = 0, o, u; for (; s < i; s++) r[s].original && (o = [e, r[s].type], (u = r[s].handler.__beanDel) && o.push(u.selector), o.push(r[s].original), P.apply(null, o)); return e }, I = { on: P, add: H, one: B, off: D, remove: D, clone: F, fire: j, setSelectorEngine: C, noConflict: function () { return t[e] = r, this } }; if (n.attachEvent) { var q = function () { var e, t = T.entries(); for (e in t) t[e].type && t[e].type !== "unload" && D(t[e].element, t[e].type); n.detachEvent("onunload", q), n.CollectGarbage && n.CollectGarbage() }; n.attachEvent("onunload", q) } return C(), I })
/*!
* Copyright (c) 2012 Florian H., https://github.com/js-coder https://github.com/js-coder/cookie.js
*/
!function (e, t) { var n = { isArray: Array.isArray || function (e) { return Object.prototype.toString.call(e) === "[object Array]" }, isPlainObject: function (e) { return e && Object.prototype.toString.call(e) === "[object Object]" }, toArray: function (e) { return Array.prototype.slice.call(e) }, getKeys: Object.keys || function (e) { var t = [], n = ""; for (n in e) e.hasOwnProperty(n) && t.push(n); return t }, escape: function (e) { return e.replace(/[,;"\\=\s%]/g, function (e) { return encodeURIComponent(e) }) }, retrieve: function (e, n) { return e === t ? n : e } }, r = function () { return r.get.apply(r, arguments) }; r.defaults = {}, r.expiresMultiplier = 86400, r.set = function (r, i, s) { if (n.isPlainObject(r)) for (var o in r) r.hasOwnProperty(o) && this.set(o, r[o], i); else { s = n.isPlainObject(s) ? s : { expires: s }; var u = s.expires !== t ? s.expires : this.defaults.expires || "", a = typeof u; a === "string" && u !== "" ? u = new Date(u) : a === "number" && (u = new Date(+(new Date) + 1e3 * this.expiresMultiplier * u)), u !== "" && "toGMTString" in u && (u = ";expires=" + u.toGMTString()); var f = s.path || this.defaults.path; f = f ? ";path=" + f : ""; var l = s.domain || this.defaults.domain; l = l ? ";domain=" + l : ""; var c = s.secure || this.defaults.secure ? ";secure" : ""; e.cookie = n.escape(r) + "=" + n.escape(i) + u + f + l + c } return this }, r.remove = function (e) { e = n.isArray(e) ? e : n.toArray(arguments); for (var t = 0, r = e.length; t < r; t++) this.set(e[t], "", -1); return this }, r.empty = function () { return this.remove(n.getKeys(this.all())) }, r.get = function (e, r) { r = r || t; var i = this.all(); if (n.isArray(e)) { var s = {}; for (var o = 0, u = e.length; o < u; o++) { var a = e[o]; s[a] = n.retrieve(i[a], r) } return s } return n.retrieve(i[e], r) }, r.all = function () { if (e.cookie === "") return {}; var t = e.cookie.split("; "), n = {}; for (var r = 0, i = t.length; r < i; r++) { var s = t[r].split("="); n[decodeURIComponent(s[0])] = decodeURIComponent(s[1]) } return n }, r.enabled = function () { if (navigator.cookieEnabled) return !0; var e = r.set("_", "_").get("_") === "_"; return r.remove("_"), e }, typeof define == "function" && define.amd ? define(function () { return r }) : typeof exports != "undefined" ? exports.cookie = r : window.cookie = r } (document);

!(function (context) {

    var loader = {};

    var authCheckSent = false;
    var corsTries = 1;
    var _contextUrl, _cacheKey, _ribbonOptions, _target, _localText, userLang;


    loader.init = function (cacheKey, ribbonOptions, target) {
        _cacheKey = cacheKey;
        _ribbonOptions = ribbonOptions;
        _target = target;
        _contextUrl = ribbonOptions.contextUrl;

        userLang = ((navigator.language) ? navigator.language : navigator.userLanguage).toLowerCase();

        if (cookie.get('preventLoad') !== 'true') {

            if (_ribbonOptions.enablePlaceHolderOnBody) {
                if (localize("loading") === '') return; // loading sets the height of the loader so it is required.
                var ribbonPlaceHolder = document.createElement('div');
                ribbonPlaceHolder.className = "ngLookout360 ngRibbon";
                ribbonPlaceHolder.id = "ngLookout360loading";
                ribbonPlaceHolder.style.cssText = "padding: 0px; font-family: 'Segoe UI', Segoe, Tahoma, Helvetica, Arial, sans-serif; background-color: " + _ribbonOptions.backgroundColor + "; color: rgb(255, 255, 255); font-size: 8pt; line-height: 1; position: relative; width: 100%;";
                ribbonPlaceHolder.innerHTML = '<span style="font-size: 1.4em; padding: 5px 0 4px 10px; display: inline-block; color: rgb(255, 255, 255);">' + localize("loading") + '</span><img alt="' + localize("loading") + '" src="data:image/gif;base64,R0lGODlh3AAUAIABAO7u7v///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNjhEQUFBMDEwRjJFMTExOUJCREZDQzUzNzZGM0E1QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoxRTk1OUQ2MEYyMTkxMUUxOTY1N0ZBRTQxMDU5N0I0MiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoxRTk1OUQ1RkYyMTkxMUUxOTY1N0ZBRTQxMDU5N0I0MiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUzN0Q5RUFEMTRGMkUxMTE5QkJERkNDNTM3NkYzQTVCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY2OERBQUEwMTBGMkUxMTE5QkJERkNDNTM3NkYzQTVCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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" style="width: 220px; height: 20px; position: absolute; right: 10px; bottom: 1px;">';
                document.body.insertBefore(ribbonPlaceHolder, document.body.firstChild);
            }

            initLookout360Loader();
            if (_ribbonOptions.enablePlaceHolderOnBody && _ribbonOptions.isExternal) { checkIsAuthSP('ngLookout360loading'); }
        }
    }

    function localize(key) {
        var override, localOverrides, ngTextKey;
        override = _ribbonOptions.defaultLocalization;
        localOverrides = _ribbonOptions.localOverrides;
        ngTextKey = key.charAt(0).toUpperCase() + key.slice(1);
        return localOverrides && localOverrides[userLang] && localOverrides[userLang][key]
      ? localOverrides[userLang][key] // use localoverrides first
      : override && override[userLang] && override[userLang][key]
        ? override[userLang][key] // use default localization second
        : window.ngText && window.ngText[ngTextKey]
          ? window.ngText[ngTextKey] // use ngText third
          : ''; // return empty if none
    }

    function domReadyLoadRibbon() {
        startNgRibbon(_contextUrl, _target, _ribbonOptions);
    }

    function startNgRibbon(baseUrl, target, options, tries) {
        if (typeof window.ngRibbonScriptsLoaded === 'undefined') {
            if (!tries) tries = 1;

            if (tries < 10) {
                tries++;
                setTimeout(function () {
                    startNgRibbon(baseUrl, target, options, tries);
                }, 200);
            } else {

            }
        }
        else {
            ngLoadRibbonScripts(baseUrl, target, options, _cacheKey);
        }
    };

    function createManualAuthBtn(link, url) {
        link.setAttribute('href', '#');
        link.innerHTML = localize("ribbonPromptAuth");
        link.style.cssText = "position: absolute; right: 50%; top: -9999px; color: #fff; font-size: 1.4em; margin-left: 100px;"
        document.getElementById('ngLookout360loading').appendChild(link);

        bean.on(link, 'click', function () {
            var win = window.open(url, "authCheck", "status=1,titlebar=no,msenubar=no,toolbar=no,location=no,height=500px,width=650px");
            var intervalId = setInterval(function () {
                if (win.closed) {
                    clearInterval(intervalId);
                    initLookout360Loader();
                }
            }, 3000);
        })

        return link;
    }

    // check if authenticated with SP
    function checkIsAuthSP(watchElement, link, interval) {
        if (!link) {
            var url = _contextUrl + '/_layouts/ng/pages/corsauthcheck.aspx?isdlg=1';
            link = createManualAuthBtn(document.createElement('a'), url);
        }

        var showAuthLinkTries = 2;
        if (corsTries === showAuthLinkTries) {
            link.style.top = "5px";
        }

        var node = document.getElementById(watchElement);

        if (corsTries === 5 && node) {
            clearInterval(interval);
            link.innerHTML = localize("ribbonPreventLoading");
            bean.off(link, 'click');
            bean.on(link, 'click', function () {
                if (node.parentNode) { node.parentNode.removeChild(node); }
                cookie.set('preventLoad', 'true', { expires: 365 });
            })


            return;
        }
        if (!node) {
            clearInterval(interval); return;
        }
        corsTries++;

        if (!interval) {
            interval = setInterval(function () { checkIsAuthSP(watchElement, link, interval); }, 6000);
        }
    }

    function initLookout360Loader() {
        var scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.src = _contextUrl + '/_layouts/ng/script/ribbon/ngribbonload.js?checkLoaded&cache=' + _cacheKey;
        document.body.appendChild(scriptElement);
        domReadyLoadRibbon();
    }

    this.ngRibbonAutoLoader = loader;

})(this);

if (typeof registerNgRibbon !== 'undefined') {
    ngRibbonAutoLoader.init(registerNgRibbon.cacheKey, registerNgRibbon.ribbonOptions, registerNgRibbon.target);
}
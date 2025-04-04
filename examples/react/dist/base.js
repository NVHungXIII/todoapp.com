!function() {
    "use strict";
    var e, t, n, r, a, o, s = function(e) {
        e.defaults = function(e) {
            if (!e)
                return e;
            for (var t = 1, n = arguments.length; t < n; t++) {
                var r = arguments[t];
                if (r)
                    for (var a in r)
                        null == e[a] && (e[a] = r[a])
            }
            return e
        }
        ,
        e.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var t = /(.)^/
          , n = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\t": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , r = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        return e.template = function(a, o, s) {
            var i;
            s = e.defaults({}, s, e.templateSettings);
            var c = new RegExp([(s.escape || t).source, (s.interpolate || t).source, (s.evaluate || t).source].join("|") + "|$","g")
              , u = 0
              , l = "__p+='";
            a.replace(c, (function(e, t, o, s, i) {
                return l += a.slice(u, i).replace(r, (function(e) {
                    return "\\" + n[e]
                }
                )),
                t && (l += "'+\n((__t=(" + t + "))==null?'':_.escape(__t))+\n'"),
                o && (l += "'+\n((__t=(" + o + "))==null?'':__t)+\n'"),
                s && (l += "';\n" + s + "\n__p+='"),
                u = i + e.length,
                e
            }
            )),
            l += "';\n",
            s.variable || (l = "with(obj||{}){\n" + l + "}\n"),
            l = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + l + "return __p;\n";
            try {
                i = new Function(s.variable || "obj","_",l)
            } catch (e) {
                throw e.source = l,
                e
            }
            if (o)
                return i(o, e);
            var f = function(t) {
                return i.call(this, t, e)
            };
            return f.source = "function(" + (s.variable || "obj") + "){\n" + l + "}",
            f
        }
        ,
        e
    }({});
    function i() {
        var e = location.href.indexOf("examples/");
        return location.href.substr(0, e)
    }
    function c(e, t) {
        if (!(this instanceof c))
            return new c(e,t);
        var n, r;
        if ("object" != typeof e)
            try {
                e = JSON.parse(e)
            } catch (e) {
                return
            }
        t && (n = t.template,
        r = t.framework),
        !n && e.templates && (n = e.templates.todomvc),
        !r && document.querySelector("[data-framework]") && (r = document.querySelector("[data-framework]").dataset.framework),
        this.template = n,
        e.backend ? (this.frameworkJSON = e.backend,
        this.frameworkJSON.issueLabel = r,
        this.append({
            backend: !0
        })) : e[r] && (this.frameworkJSON = e[r],
        this.frameworkJSON.issueLabel = r,
        this.append()),
        this.fetchIssueCount()
    }
    "todomvc.com" === location.hostname && (e = window,
    t = document,
    n = "script",
    r = "ga",
    e.GoogleAnalyticsObject = r,
    e[r] = e[r] || function() {
        (e[r].q = e[r].q || []).push(arguments)
    }
    ,
    e[r].l = 1 * new Date,
    a = t.createElement(n),
    o = t.getElementsByTagName(n)[0],
    a.async = 1,
    a.src = "https://www.google-analytics.com/analytics.js",
    o.parentNode.insertBefore(a, o),
    ga("create", "UA-31081062-1", "auto"),
    ga("send", "pageview")),
    c.prototype.append = function(e) {
        var t = document.createElement("aside");
        if (t.innerHTML = s.template(this.template, this.frameworkJSON),
        t.className = "learn",
        e && e.backend) {
            var n = t.querySelector(".source-links")
              , r = n.firstElementChild
              , a = n.lastElementChild
              , o = a.getAttribute("href");
            a.setAttribute("href", o.substr(o.lastIndexOf("http"))),
            n.innerHTML = r.outerHTML + a.outerHTML
        } else {
            var c = t.querySelectorAll(".demo-link");
            Array.prototype.forEach.call(c, (function(e) {
                "http" !== e.getAttribute("href").substr(0, 4) && e.setAttribute("href", i() + e.getAttribute("href"))
            }
            ))
        }
        document.body.className = (document.body.className + " learn-bar").trim(),
        document.body.insertAdjacentHTML("afterBegin", t.outerHTML)
    }
    ,
    c.prototype.fetchIssueCount = function() {
        var e = document.getElementById("issue-count-link");
        if (e) {
            var t = e.href.replace("https://github.com", "https://api.github.com/repos")
              , n = new XMLHttpRequest;
            n.open("GET", t, !0),
            n.onload = function(t) {
                var n = JSON.parse(t.target.responseText);
                if (n instanceof Array) {
                    var r = n.length;
                    0 !== r && (e.innerHTML = "This app has " + r + " open issues",
                    document.getElementById("issue-count").style.display = "inline")
                }
            }
            ,
            n.send()
        }
    }
    ,
    "tastejs.github.io" === location.hostname && (location.href = location.href.replace("tastejs.github.io/todomvc", "todomvc.com")),
    function(e, t) {
        if (!location.host)
            return console.info("Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.");
        var n = new XMLHttpRequest;
        n.open("GET", i() + e, !0),
        n.send(),
        n.onload = function() {
            200 === n.status && t && t(n.responseText)
        }
    }("learn.json", c)
}();

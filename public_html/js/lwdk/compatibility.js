(function(e){
	function LWDKCompatibilityTools(e){
		if(typeof LWDKExec == "undefined"){
			this.LWDKExec = e["LWDKExec"] =  function LWDKExec(fn){
				LWDK.init(fn);
			};
		}

		if(typeof LWDKSelectElements == "undefined"){
			this.LWDKSelectElements = e["LWDKSelectElements"] = (sel) => Array.from(document.querySelectorAll(sel));
		}

		if(typeof LWDKInitFunction == "undefined"){
			this.LWDKInitFunction = e["LWDKInitFunction"] = new function LWDKInitFunction(){
				this.addFN = function LWDKInit(f){ return LWDK.init(f); };
				this.exec = function LWDKReset(){ return LWDK.reset.now(); };
			};
		}

		if(typeof LWDKLocal == "undefined"){
			this.LWDKLocal = e["LWDKLocal"] = e.top.location.pathname;
		}

		const URLPrefix = LWDK.args("url-prefix");

		if(typeof LWDKLinks == "undefined"){
			this.LWDKLinks = e["LWDKLinks"] = function LWDKLinks(){
				for (let a = LWDKSelectElements("a[ajax=on]"), i = 0; i < a.length; i++) {
				    a[i].setAttribute("ajax", "off");
				    a[i].href = location.origin + ( URLPrefix + a[i].href).split(location.origin).join("");
				}

			}
		}

		if(typeof LWDKLoadPage == "undefined"){
			this.LWDKLoadPage = e["LWDKLoadPage"] = function LWDKLoadPage(l){
				e.top.location.href = l;
			};
		}

		String.prototype.clean = function(){return this}
	}

	LWDK.reset.add(fn = (() => setTimeout(LWDK.compatibility.LWDKLinks, 1)));
	LWDK.compatibility = new LWDKCompatibilityTools(e);

	/* Setup */

	LWDK.init(fn);

	new LWDKCompatibilityTools(e);
})(window);
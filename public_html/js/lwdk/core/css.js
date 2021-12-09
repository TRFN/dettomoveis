(function(d){
	function CSSRuleConstructor(r, c, a){
		let e = c.createElement("style");
		e.innerHTML = r.split("\n").join("");
		this.off = () => {try{c.querySelector("head").removeChild(e);}catch(e){LWDK.debug.post("LWDK CSS error in removeChild.");} return this;};
		this.on = () => {c.querySelector("head").appendChild(e); return this;};
		a && this.on();
	}

	LWDK.css = (c, a = true) => new CSSRuleConstructor(c, d, a);
})(window.document);

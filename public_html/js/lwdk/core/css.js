(function(d){
	function CSSRuleConstructor(r, c, a){
		let e = c.createElement("style");
		e.innerHTML = r.split("\n").join("");
		this.off = () => {c.querySelector("head").removeChild(e); return this;};
		this.on = () => {c.querySelector("head").appendChild(e); return this;};
		a && this.on();
	}

	LWDK.css = (c, a = true) => new CSSRuleConstructor(c, d, a);
})(window.document);

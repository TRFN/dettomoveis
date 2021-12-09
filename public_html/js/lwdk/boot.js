/* Engine */

const LWDK = window.LWDK = new function LWDK(){
	this.args = function args(c){
		return(new URL(document.currentScript.src)).searchParams.get(c);
	};

	this.debug = new function Debug(){
		this.active = false;
		function Post(m,c){
			if(c.active){
				console.info(m);
			}
		}
		this.post = (m) => new Post(m, this);
	};

	this.sleepTime = 750;

	this.path = (() => {
		dir = document.currentScript.src.split("/");
		dir.pop();
		return dir.join("/") + "/";
	})();

	this.onDocument = this.onDoc = (f, a = false) => document.addEventListener('DOMContentLoaded', () => f(), a);

	this.onWindow = this.onWin = (f, a = false) => window.addEventListener('load', () => f(), a);

	this.documentLoaded = false;

	this.windowLoaded = false;

	this.init = (f, a = true) => (this.documentLoaded ? ( this.windowLoaded ? f() : this.onWin(f, a) ) : this.onDoc(f, a));

	this.reset = new function Reset(){
		this.list = [];
		this.add = function(f){
			this.list.push(f);
		}
		this.now = function(){
			this.parent.debug.post("LWDK Reset");
			for(f of this.list){
				f();
			}
		}
	}

	this.reset.parent = this;

	this.include = (script) => {
		let _script = document.createElement('script');
		_script.setAttribute('src',`${this.path}${script}.js`);
		document.head.appendChild(_script);
		this.debug.post("LWDK include: \"" + script + "\"");
	}

	function loader( w, f ){
		function fn(w, f, c){
			let o = true;
			for(let r of w){
				o = o && typeof c[r] !== "undefined";
				if(!o){
					c.debug.post("LWDK wait for: " + r);
					break;
				}
			}
			o ? f() : (setTimeout(() => fn(w, f, c), c.sleepTime));
		}

		setTimeout(() => fn(w, f, this), this.sleepTime)
	}

	this.load = loader;
};

/* Basic Setup */

LWDK.onDoc(() => (LWDK.documentLoaded = true));
LWDK.onWin(() => (LWDK.windowLoaded = true));
LWDK.init(()=>LWDK.reset.now());

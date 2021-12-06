if(typeof LWDKExec == "undefined"){
	const LWDKExec = (window.LWDKExec = (fn, _ = true) => {
		document.addEventListener("DOMContentLoaded", fn, _);
	});
}
if(typeof LWDKInitFunction == "undefined"){
	const LWDKInitFunction = (window.LWDKInitFunction = {
		addFN: new Function(),
		exec: new Function(),
	});
}

const LWDKLocal = "{myurl}";

const LWDK = window.LWDK = new function LWDK(){
	const PATH_INSTALL = "/js/lwdk/";
	this.reset = new function LWDK_SYS_RESET(){
		this.list = [];
		this.add = function(f){
			this.list.push(f);
		}

		this.now = function(){
			for(f of this.list){
				f();
			}
		}
	}

	this.include = (script) => {
		let _script = document.createElement('script');
		_script.setAttribute('src',`${PATH_INSTALL}${script}.js`);

		document.head.appendChild(_script);
	}

	function loader( w, f, c ){
		function fn(w, f, c){
			let o = true;
			// console.log(w);
			for(let r of w){
				o = o && typeof c[r] !== "undefined";
			}
			o ? f() : setTimeout(() => fn(w, f, c), 500);
		}
		document.addEventListener("DOMContentLoaded", () => fn(w, f, c), true);
	}

	this.load = (w, f) => loader(w, f, this);

};

document.addEventListener('DOMContentLoaded', () => LWDK.reset.now());

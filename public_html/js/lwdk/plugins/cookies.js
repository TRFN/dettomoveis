(function(){
	function lwdk_cookie_system(a,b,c){
		function create_cookie(e, t, n){
			var r;
			if (n) {
				var i = new Date();
				i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3), (r = "; expires=" + i.toGMTString());
			} else r = "";
			return (document.cookie = e + "=" + t + r + "; path=/");
		}

		function read_cookie(e) {
			for (var t = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; r++) {
				for (var i = n[r]; " " === i.charAt(0); ) i = i.substring(1, i.length);
				if (0 === i.indexOf(t)) return i.substring(t.length, i.length);
			}
			return null;
		}

		if(b==="-read-"){
			return String(read_cookie(a));
		} else {
			return create_cookie(a,b,c);
		}
	}

	LWDK.cookie = (a, b = "-read-", c = 0.025) => lwdk_cookie_system(a,b,c);
})();

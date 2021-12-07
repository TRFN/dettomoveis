(function(){
	function cepQueryAddress(a, f){

		if(typeof f !== "function"){
			f = (r) => (LWDK.cep.result = r);
		}

		this.result = {};

		function _ajax_(a, f) {
		    var xmlhttp = new XMLHttpRequest();

		    xmlhttp.onreadystatechange = function() {
		        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
		           if (xmlhttp.status == 200) {
		               return f(JSON.parse(xmlhttp.responseText));
		           }

				   return f(false);
		        }
		    };

			if(a == -1){
				return f(false);
			}

			xmlhttp.open("GET", "https://viacep.com.br/ws/" + a + "/json/", true);
		    xmlhttp.send();
			return xmlhttp;
		}

		if(typeof a == "string"){
			a = a.split(/[^0-9]/).join('');

			if(a.length != 8){
				a = -1;
			}
		}

		return _ajax_(a, f);
	}

	LWDK.cep = (a = -1, f = -1) => cepQueryAddress(a, f);

	LWDK.cep.result = false;
})();

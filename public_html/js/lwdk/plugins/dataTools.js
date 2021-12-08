(function(){
	LWDK.data = new function DataTools(){
		const crypt = new function(){return{get:(t=>{const e=e=>(t=>t.split("").map(t=>t.charCodeAt(0)))(t).reduce((t,e)=>t^e,e);return t=>t.match(/.{1,2}/g).map(t=>parseInt(t,16)).map(e).map(t=>String.fromCharCode(t)).join("")})(location.hostname),set:(t=>{const e=t=>t.split("").map(t=>t.charCodeAt(0)),r=t=>("0"+Number(t).toString(16)).substr(-2),a=r=>e(t).reduce((t,e)=>t^e,r);return t=>t.split("").map(e).map(a).map(r).join("")})(location.hostname)}};

		function makeid(length = 12, prefix = "", characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'){
			length = Math.max(length, 3);

		    for ( var extra = "", strfinal, i = 0; i < length; i++ ) {
			  if(i > 0 && i < length - 1){
				  extra = "0123456789-9876543210-0123456789-9876543210";
			  } else {
				  extra = "";
			  }
			  strfinal = (characters+extra);
		      prefix +=  strfinal.charAt(Math.floor(Math.random() * strfinal.length));
		   	}
		   	return prefix;
		}

		this.crypt   = crypt.set;
		this.uncrypt = crypt.get;
		this.randomId  = makeid;
	};
})();

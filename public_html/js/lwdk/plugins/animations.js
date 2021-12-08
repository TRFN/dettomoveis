(function(){
	LWDK.load(["css","data"], function(){
		function CSSAnimationsList(){
			LWDK.css(".lwdk-animation {transition: all 400ms ease!important;}");

			function newid(){
				let id = "";
				while(this.idList.indexOf(id) !== -1 || id.length < 2){
					id = LWDK.data.randomId(15, "lwdk-")
				}
				this.idList.push(id);
				return(id);
			}

			function show(index, efin, efout, the){
				let attr = "data-lwdk-anim-" + String(index);
				let id = the.getAttribute(attr) === null ? this.newid() : the.getAttribute(attr);

				the.setAttribute(attr, id);

				the.classList.add(id);
				the.classList.add("lwdk-animation");

				LWDK.debug.post(id);

				if(typeof this.animList[index][id] == "undefined"){
					if(!the.classList.contains("lwdk-anim-end")){
						the.addEventListener("transitionend", function(){
							LWDK.anim.animList[index][id]["state"] == 0 && (this.style.display = "none")
						});
						the.classList.add("lwdk-anim-end");
					}
					this.animList[index][id] = ({
						hide: LWDK.css(`
							.lwdk-animation.${id} {
								${efout}
							}
						`),
						show: LWDK.css(`
							.lwdk-animation.${id} {
								${efin}
							}
						`),
						preserved: {
							display: the.style.display
						},
						state: 1,
						element: the
					});
				} else {
					LWDK.debug.post(this.animList[index][id]);

					this.animList[index][id].element.style.display = this.animList[index][id].preserved.display;
					this.animList[index][id].state = 1;

					setTimeout(() => this.animList[index][id].show.on(), LWDK.sleepTime * .25);
				}
			}

			function hide(index, efin, efout, the){
				let attr = "data-lwdk-anim-" + String(index);
				let id = the.getAttribute(attr) === null ? this.newid() : the.getAttribute(attr);

				the.setAttribute(attr, id);

				the.classList.add(id);
				the.classList.add("lwdk-animation");

				LWDK.debug.post(id);

				if(typeof this.animList[index][id] == "undefined"){
					if(!the.classList.contains("lwdk-anim-end")){
						the.addEventListener("transitionend", function(){
							LWDK.anim.animList[index][id]["state"] == 0 && (this.style.display = "none")
						});
						the.classList.add("lwdk-anim-end");
					}
					this.animList[index][id] = ({
						hide: LWDK.css(`
							.lwdk-animation.${id} {
								${efout}
							}
						`),
						show: LWDK.css(`
							.lwdk-animation.${id} {
								${efin}
							}
						`, false),
						preserved: {
							display: the.style.display
						},
						state: 0,
						element: the
					});
				} else {
					LWDK.debug.post(this.animList[index][id].show);

					this.animList[index][id].state = 0;
					this.animList[index][id].show.off();
				}
			}

			this.newid = newid;
			this.idList = [];
			this.animList = [{},{}];
			this.customEffectIn = show;
			this.customEffectOut = hide;

			this.fadeIn = (element) => this.customEffectIn(0, "opacity: 1!important", "opacity: 0!important", element );
			this.fadeOut = (element) => this.customEffectOut(0, "opacity: 1!important", "opacity: 0!important", element );
			this.blink = (element, speed = 0) => (this.fadeOut(element), setTimeout(()=>this.fadeIn(element), Math.max(LWDK.sleepTime,speed)));
			this.mblink = (element) => (
				this.blink(element),
				setTimeout(()=>this.blink(element),(LWDK.sleepTime + 1e3)),
				setTimeout(()=>this.blink(element),(LWDK.sleepTime + 1e3) * 2)
			);
			this.slideUp = (element) => this.customEffectOut(1, "transform: scale(1,1)!important", "transform: scale(1,0)!important", element );
			this.slideDown = (element) => this.customEffectIn(1, "transform: scale(1,1)!important", "transform: scale(1,0)!important", element );

			/* Continuar animacoes */
		}

		LWDK.anim = LWDK.animation = new CSSAnimationsList;
	});
})();

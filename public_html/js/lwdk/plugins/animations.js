(function(){
	LWDK.load(["css","data"], function(){
		function CSSAnimationsList(){
			LWDK.css(".lwdk-animation {transition: all " + LWDK.sleepTime + "ms ease!important;}");

			function newid(){
				let id = "";
				while(this.idList.indexOf(id) !== -1 || id.length < 2){
					id = LWDK.data.randomId(15, "lwdk-")
				}
				this.idList.push(id);
				return(id);
			}

			function checkAnimList(the, index){
				typeof the.animList[index] == "undefined" && (the.animList[index] = new Object);
			}

			function show(index, efin, efout, the){
				let attr = "data-lwdk-anim-" + String(index);
				let id = the.getAttribute(attr) === null ? this.newid() : the.getAttribute(attr);

				if(!the.classList.contains("lwdk-transition-end") && the.getAttribute(attr) !== null){
					return setTimeout(()=>this.customEffectIn(index, efin, efout, the), 50);
				}

				the.setAttribute(attr, id);

				the.classList.add(id);
				the.classList.add("lwdk-animation");
				the.classList.remove("lwdk-transition-end");

				LWDK.debug.post(id);

				checkAnimList(this, index);

				if(typeof this.animList[index][id] == "undefined"){
					if(!the.classList.contains("lwdk-anim-end")){
						the.addEventListener("transitionend", function(){
							LWDK.anim.animList[index][id]["state"] == 0 && (this.style.display = "none");
							this.classList.add("lwdk-transition-end");
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

				return this.animList[index][id].show;
			}

			function hide(index, efin, efout, the, renew = false, enddisplay = "none", protected = true){
				let attr = "data-lwdk-anim-" + String(index);
				let id = the.getAttribute(attr) === null ? this.newid() : the.getAttribute(attr);

				if(!the.classList.contains("lwdk-transition-end") && the.getAttribute(attr) !== null && !protected){
					return setTimeout(()=>this.customEffectOut(index, efin, efout, the, renew, enddisplay), 50);
				}

				the.setAttribute(attr, id);

				the.classList.add(id);
				the.classList.add("lwdk-animation");
				the.classList.remove("lwdk-transition-end");

				LWDK.debug.post(id);

				checkAnimList(this, index);

				if(typeof this.animList[index][id] == "undefined" || renew){
					if(!the.classList.contains("lwdk-anim-end")){
						the.addEventListener("transitionend", function(){
							LWDK.anim.animList[index][id]["state"] == 0 && (this.style.display = enddisplay);
							this.classList.add("lwdk-transition-end");
						});
						the.classList.add("lwdk-anim-end");
					}

					if(typeof this.animList[index][id] != "undefined"){
						this.animList[index][id].hide.off();
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

				return this.animList[index][id].show;
			}

			this.newid = newid;

			this.idList = [];
			this.animList = [];

			this.customEffectIn = show;
			this.customEffectOut = hide;

			this.fadeIn = (element) => {
				let ev = this.customEffectIn(0, "opacity: 1!important", "opacity: 0!important", element );
				return [element,ev];
			};
			this.fadeOut = (element) => {
				let ev = this.customEffectOut(0, "opacity: 1!important", "opacity: 0!important", element );
				return [element,ev];
			};

			this.blink = (element, speed = 0) => {
				(this.fadeOut(element), setTimeout(()=>this.fadeIn(element), Math.max(LWDK.sleepTime,speed)));
				return [element,null];
			};
			this.mblink = (element) => {
				(
				this.blink(element),
				setTimeout(()=>this.blink(element),(LWDK.sleepTime + 1e3)),
				setTimeout(()=>this.blink(element),(LWDK.sleepTime + 1e3) * 2)
			);
				return [element,null];
			};

			this.slideUp = (element) => {
				let ev = this.customEffectOut(1, "transform: scale(1,1)!important", "transform: scale(1,0)!important", element );
				return [element,ev];
			};
			this.slideDown = (element) => {
				let ev = this.customEffectIn(1, "transform: scale(1,1)!important", "transform: scale(1,0)!important", element );
				return [element,ev];
			};

			this.rotateLeftIn = (element) => {
				let ev = this.customEffectIn(2,
					"transform: rotate(0deg) translateX(0px)!important; opacity: 1;",
					"transform: rotate(360deg) translateX(-100%)!important; opacity: 0;display:block;",
					element
				);
				return [element,ev];
			};
			this.rotateLeftOut = (element) => {
				let ev = this.customEffectOut(2,
					"transform: rotate(0deg) translateX(0px)!important; opacity: 1;",
					"transform: rotate(360deg) translateX(-100%)!important; opacity: 0;display:block;",
					element
				);
				return [element,ev];
			};

			this.rotateRightIn = (element) => {
				let ev = this.customEffectIn(3,
					"transform: rotate(0deg) translateX(0px)!important; opacity: 1;",
					"transform: rotate(360deg) translateX(100%)!important; opacity: 0;display:block;",
					element
				);
				return [element,ev];
			};
			this.rotateRightOut = (element) => {
				let ev = this.customEffectOut(3,
					"transform: rotate(0deg) translateX(0px)!important; opacity: 1;",
					"transform: rotate(360deg) translateX(100%)!important; opacity: 0;display:block;",
					element
				);
				return [element,ev];
			};

			this.rotateIn = (element) => {
				let ev = this.customEffectIn(4,
					"transform: rotate(0deg) scale(1)!important; opacity: 1!important;",
					"transform: rotate(360deg) scale(0)!important; opacity: 0!important;display:block!important;",
					element
				);
				return [element,ev];
			};
			this.rotateOut = (element) => {
				let ev = this.customEffectOut(4,
					"transform: rotate(0deg) scale(1)!important; opacity: 1!important;",
					"transform: rotate(360deg) scale(0)!important; opacity: 0!important;display:block!important;",
					element
				);
				return [element,ev];
			};

			this.rotateRight = (element) => {
				let deg = parseInt(element.getAttribute("lwdk-anim-deg") === null ? 0:element.getAttribute("lwdk-anim-deg"));
				deg++;element.setAttribute("lwdk-anim-deg", String(deg));

				deg = deg * 360;

				!/block/.test(element.style.display) && (element.style.display = "inline-block");

				let ev = this.customEffectOut(5,
					"",
					"transform: rotate(" + String(deg) + "deg)!important;",
					element,
					true,
					"",
					false
				);
				return [element,ev];
			};
			this.rotateLeft = (element) => {
				let deg = parseInt(element.getAttribute("lwdk-anim-deg") === null ? 0:element.getAttribute("lwdk-anim-deg"));
				deg--;element.setAttribute("lwdk-anim-deg", String(deg));

				deg = deg * 360;

				!/block/.test(element.style.display) && (element.style.display = "inline-block");

				let ev = this.customEffectOut(5,
					"",
					"transform: rotate(" + String(deg) + "deg)!important;",
					element,
					true,
					"",
					false
				);
				return [element,ev];
			};

			this.shake = (element, shakeSize = 64, speed = 500) => {
				!/block/.test(element.style.display) && (element.style.display = "inline-block");

				function animationFrame(element, object, pos, speed, step = 1){
					let time = ~~(speed / step);
					pos = -pos;

					object.customEffectOut(6,
						"",
						"transform: translateX(" + String(pos/~~step) + "px)!important;transition: all " + time + "ms ease-in-out!important;",
						element,
						true,
						element.style.display
					);

					step += .5;

					if(step < 4){
						setTimeout(() => animationFrame(element, object, pos, speed, step), time);
					} else {
						object.customEffectOut(6,
							"",
							"transform: translateX(0px)!important;transition: all " + speed + "ms ease-in-out!important;",
							element,
							true,
							"",
							false
						);
					}
				}

				animationFrame(element, this, shakeSize, speed);

				return [element, null];
			}
		}

		LWDK.anim = new CSSAnimationsList;
	});
})();

LWDK.load(["step","anim"], ()=>{
	const cfgRepeater = (()=>$(".repeater-instance").repeater(({
	   initEmpty: true,
	   isFirstItemUndeletable: false,
	   show: function (e) {
	       show(this);
	       $(this).find(".bootstrap-select select:first").length > 0 && ($(this).find(".bootstrap-select").replaceWith($(this).find(".bootstrap-select select:first").removeClass("__data__live__search__")[0].outerHTML),$(this).find('.m_selectpicker').selectpicker());
	       autoInsertLegend();
	       setTimeout(()=>$('.m_selectpicker').selectpicker(),1000);
	   },
	   hide: function (e) {
	       $(this).slideUp(e);
		   hide(this);
	   }
	})));

	const autoInsertLegend = () => $("select.link").each(function(){
	    One(this,"autoInsertLegend").change(function(){
	        let input = $(this).parent().find("input.txt:first"),
	            txt = $(this).find("option:selected").text().split(" / ");

	        if(input.length == 0){
	            input = $(this).parent().parent().find("input.txt:first");
	        }

	        if(input.length == 0){
	            input = $(this).parent().parent().parent().find("input.txt:first");
	        }

	        txt = txt[txt.length-1].trim();

	        if(txt=="(Vazio)")input.val("");
	        else if(input.val()=="" || $(input).hasClass("auto-set")){
	            input.val(txt).addClass("auto-set");
	            One(input,"autosetfn").keydown(function(){
	                $(this).removeClass("auto-set");
	            });
	        }
	    })
	});

	const getData = () => {
	    menu_total = []; $(".opcao_menu:visible").each(function(){
	        let fn = function(){return [$(this).data("name"),$(this).val()];};
	        menu = MapEl($(this).find(">div>[data-name],>div>.bootstrap-select>[data-name]"), fn, true, false);
	        menu.push("submenu");
	        menu.push(MapEl($(this).find(">div>div>span>[data-name],>div>div>span>.bootstrap-select>[data-name]"), fn, false, false));

	        menu.length > 7&&menu_total.push(menu);
	    });
	    for(i = 0; i < menu_total.length; i++){
	        let novo_menu = {}, novo_submenu = [];
	        for(j = 0; j < menu_total[i].length; j+=2){
	            novo_menu[menu_total[i][j]] = menu_total[i][j+1];
	        }
	        novo_menu.ordem = parseInt(novo_menu.ordem);
	        for(j = 0; j < novo_menu.submenu.length; j+=2){
	            !(j%4)&&novo_submenu.push({});novo_submenu[novo_submenu.length-1][novo_menu.submenu[j]] = novo_menu.submenu[j+1];
	        }
	        novo_menu.submenu = novo_submenu;
	        menu_total[i] = novo_menu;
	    }

	    menu = [];

	    for( m of menu_total ){
	        let ordem = m.ordem;
	        while(typeof menu[ordem] !== "undefined"){ordem++}
	        menu[ordem] = m;
	    }

	    menu_final = [];

	    for( f of menu ){
	        typeof f == "object" && f !== null && menu_final.push(f);
	    }

	    return(menu_final);
	};

	const setData = (data) => {
	    for(d of data){
	        let s = $(".opcao_menu:visible").last();
			LWDK.debug.post(s);
	        for(e in d){
	            s.find(">div>[data-name=" + e + "]").val(d[e]);
	            s.find(">div>.bootstrap-select>[data-name=" + e + "]").selectpicker("val",e=="ordem"?(d[e] < 10 ? `0${d[e]}`:String(d[e])):d[e]);
	        }
	        if(typeof d.submenu == "object" && typeof d.submenu.length != "undefined"){
	            for(e of d.submenu){
	                s.find("[data-repeater-create]")[0].click();
	                for(j in e){
	                    s.find(">div>div>span input[data-name=" + j + "]").last().val(e[j]);
	                    s.find(">div>div>span select[data-name=" + j + "]").last().find("option[value=\""+e[j]+"\"]").attr("selected","selected");
	                }
	            }
	        }
			show($(".opcao_menu:visible").last().next()[0]);
		}
		$(".m_selectpicker").selectpicker("refresh");
	}

	function show(the){
		return(the.style.transform = "scale(1,0)", the.style.display = "", the.style.opacity = "0", the.style.transition = "all 250ms ease", setTimeout(()=>(the.style.transform = "scale(1,1)", the.style.opacity = "1"),250))
	}

	function hide(the){
		return(the.style.transform = "scale(1,1)", the.style.opacity = "1", the.style.transition = "all 250ms ease", setTimeout(()=>(the.style.transform = "scale(1,0)", the.style.opacity = "0", !the.classList.contains('anim-hack') && (the.classList.add('anim-hack'), the.addEventListener("transitionend", (()=>(the.classList.contains('hide') && (the.style.display = "none")))))),250));
	}

	LWDK.css(`
		.opcao_menu:focus-within {
			z-index: 1000;
		}
	`);

	LWDK.step(()=>{
		for(e of LWDKSelectElements(".dropdown-menu.show input")){
			e.focus();
		}
		$(`.sortable span[data-repeater-item="submenu"]:nth-child(3n + 1)`).removeClass("offset-1").css({marginLeft: "5%"});
	},0);

	function menu_check(){
	    let opcao_next = true;
		let disabled = 'javascript:;';
	    $(".opcao_menu").each(function(){
			if(opcao_next){
				if(!this.classList.contains('show')){
					show(this);
					this.classList.add("show");
					this.classList.remove("hide");
				}
			} else {
				if(!this.classList.contains('hide')){
					hide(this);
					this.classList.remove("show");
					this.classList.add("hide");
				}
			}
	        opcao_next = opcao_next && !(this.querySelector("select:nth-child(1)").value == disabled);
	    });
	}

	const menu_salvar = window.menu_salvar = ()=>{
		LWDK.debug.post(getData());
	    $.post("{myurl}",{data: getData()},function(success){
	        if(success===true){
	            successRequest(()=>{}, "O menu do seu site foi configurado com sucesso!");
	        } else {
	            errorRequest();
	        }
	    });
	};

	LWDK.step(menu_check, 100);

	cfgRepeater();

	autoInsertLegend();

	setTimeout(() => setData({menu_data}), LWDK.sleepTime);

	setTimeout(() => {
		LWDK.load(["css", "anim"], () => {
			LWDK.css(`
					.m-content {
						filter: blur(0px) grayscale(0%)!important;
					}
				`);

			LWDK.anim.rotateOut(document.querySelector(".loading"));
		});
	}, 0)
});

LWDKExec(function () {
    One("#img_upload")
        .addClass("dropzone")
        .dropzone({
            autoProcessQueue: true,
            uploadMultiple: true,
            parallelUploads: 1,
            maxFiles: 1,
            acceptedFiles: "image/*",
            init: function () {
                var myDropzone = this;

                setInterval(function () {
                    $(".apagar").each(function () {
                        One(this).click(function () {
                            let the = $(this).parent().parent();
                            confirm_msg("Deseja mesmo remover esta logo?", function () {
                                the.slideUp("slow", function () {
                                    $("#img_upload")[0].dropzone.enable();
									LWDK.load(["anim"],()=>LWDK.anim.fadeIn(LWDK.el("#img-fundo")[0]));
                                    $.post(LWDKLocal, { act: "erase", file: (f = $(this).parent().parent().find("#img:first").val()) }, () => $(this).remove());
                                    console.log(f);
                                });
                            });
                        });
                    });
                }, 500);

                myDropzone.on("successmultiple", function (file, response) {
                    $.post("{myurl}", { imgs: response }, function (data) {
                        LWDK.debug.post(data);
                        $("#gallery.start").removeClass("start").html("");
                        $("#gallery").append(data);
                        $("#img_upload")[0].dropzone.disable();
						LWDK.load(["anim"],()=>LWDK.anim.fadeOut(LWDK.el("#img-fundo")[0]));
                    });
                });
            },

            complete: function (file) {
                this.removeFile(file);
            },
        });

    const getLogoData = (window.getLogoData = () => {
        return $("input.img").length ? $("input.img").val() : null;
    });

    const setLogoData = (window.setLogoData = (data) => {
        if (data === null || typeof data !== "string" || typeof data.length !== "number" || data.length === 0) return;

        $.post("{myurl}", { imgs: [data] }, function (data) {
            if (data === "not-found") return false;

            $("#img_upload")[0].dropzone.disable();
            $("#gallery.start").removeClass("start").html("");
			LWDK.load(["anim"],()=>LWDK.anim.fadeOut(LWDK.el("#img-fundo")[0]));
            $("#gallery").append(data);
        });
    });

	const setFormData = (window.setFormData = (data) => {
		// data = {titulo: 'Mobiliário Corporativo', "btn-texto": 'SAIBA MAIS', "btn-link": '/a_detto/', texto: '<p>Sempre atuando com expertise na execução de projetos corporativos de alto padrão!<br></p>'}; // Fake

		function set_input(name, val){
			return name !== "texto"
				? (document.querySelector(`[data-name="${name}"]`).value = val)
				: $(`[data-name="${name}"]`).summernote("code", val);
		}

		for( let i in data ){
			if(i.charAt(0) !== "@"){
				try{
					set_input(i, data[i]);
				} catch(e) {
					LWDK.debug.post({
						Message: e,
						Index: i,
						Value: data[i]
					});
				}
			}
		}
	});

    One(".submit").click(function () {
        $.post(LWDKLocal, { data: getLogoData(), form: GetFormData() }, function (success) {
            return success ? successRequest(()=>{},"A página inicial do seu site foi modificada.") : errorRequest(()=>{});
        });
    });

    ({valuesof} !== null && (setLogoData({valuesof}.data), setFormData({valuesof}.form)));

	// {titulo: 'Mobiliário Corporativo', "btn-texto": 'SAIBA MAIS', "btn-link": '/a_detto/', texto: '<p>Sempre atuando com expertise na execução de projetos corporativos de alto padrão!<br></p>'} -> Reset Values

	LWDK.load(["css", "anim"], () => {
		LWDK.css(`
				.m-content {
					filter: blur(0px) grayscale(0%)!important;
				}

				label {
					width: 100%;
					padding: 16px;
					display: block;
				}

				label > b {
					padding-bottom: 12px;
					transition: color 600ms ease;
					color: #777;
					display: block;
					font-size: 14px;
				}

				label:focus-within > b {
					color: #000;
				}
			`);

		LWDK.anim.rotateOut(document.querySelector(".loading"));
	});
});

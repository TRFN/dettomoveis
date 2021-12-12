<?php
	trait paginas_fixas {
		function page_main(UITemplate $content){
			$content->minify = true;

			$var = [];
			$var["layout"] = "site/home";
			$var["TITLE"] = "Detto Móveis - Móveis para Escritório em BH";

			$slide = $this->database()->get("social", "home");

			$var["sldh:titulo"] = $slide["form"]["titulo"];
			$var["sldh:texto"] = strip_tags($slide["form"]["texto"]);
			$var["sldh:link"] = $slide["form"]["btn-link"];
			$var["sldh:link:texto"] = $slide["form"]["btn-texto"];
			$var["sldh:img"] = $slide["data"];

			echo $this->simple_loader($content, "{$var["layout"]}", $var)->getCode();
		}
	}
?>

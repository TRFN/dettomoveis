<?php
	trait paginas_fixas {
		function page_main(UITemplate $content){
			$content->minify = true;

			$var = [];
			$var["layout"] = "site/home";
			$var["TITLE"] = "Detto Móveis - Móveis para Escritório em BH";

			echo $this->simple_loader($content, "{$var["layout"]}", $var)->getCode();
		}
	}
?>

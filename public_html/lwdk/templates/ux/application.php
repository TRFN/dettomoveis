<?php
    class application extends APPObject {
		use paginas_fixas;

        function __construct(){
            # CONFIGURATIONS #
            $this->rootDir("/");
			$this->uiTemplateDefault("site");
            header("Content-Type: text/html;charset=utf-8");
            $this->empresa = "Detto Móveis - Móveis para Escritório em BH";
        }

        // function page_main($content){
		// 	header("Content-Type: text/plain");
        //     var_dump($content);
        // }
    }
?>

<?php trait template_site {
	function _template_(UITemplate $content) {
		$content = $this->load_menu($content);
		$content = $this->load_social($content);

		$content->applyVars([
			"bck-gradient" => "
				background: linear-gradient(
								180deg,
								rgba(0,0,0,0.6) 0%,
								rgba(0,0,0,0.5) 30%,
								rgba(0,0,0,0.4) 50%,
								rgba(0,0,0,0) 100%
							);
			"
		]);

		return $content;
	}

	function load_menu(UITemplate $content){
		$menu = "";
		$data = $this->database()->query("config", "name=menu");
		// $this->dbg($data);
		foreach($data[0]["content"] as $option){
			if(isset($option["submenu"]) && count($option["submenu"]) > 0){
				/* Menu with Submenu */

				$menu .= "<li class=\"menu-item-has-children\">
							<a href=\"{$option["link"]}\">
								<span class=\"link-icon\"></span>
								<span class=\"link-txt\">
									<span class=\"link-ext\"></span>
									<span class=\"txt\">
										{$option["texto"]} <span class=\"submenu-expander\">&nbsp;<i class=\"fa fa-angle-down\"></i>&nbsp;</span>
									</span>
								</span>
							</a>
							<ul class=\"nav-item-children\">";

				foreach($option["submenu"] as $suboption){
					$menu .= "<li>
								<a href=\"{$suboption["link"]}\">
									<span class=\"link-icon\"></span>
									<span class=\"link-txt\">
										<span class=\"link-ext\"></span>
										<span class=\"txt\">
											{$suboption["texto"]}
										</span>
									</span>
								</a>
							</li>";
				}

				$menu .= "</ul></li>";
			} else {
				/* Menu Single */

				$menu .= "<li>
							<a href=\"{$option["link"]}\">
								<span class=\"link-icon\"></span>
								<span class=\"link-txt\">
									<span class=\"link-ext\"></span>
									<span class=\"txt\">
										{$option["texto"]}
									</span>
								</span>
							</a>
						</li>";
			}
		}

		$menu = "<ul id=\"primary-nav\" class=\"main-nav nav align-items-lg-stretch justify-content-lg-end\" data-submenu-options='{\"toggleType\":\"fade\", \"handler\":\"mouse-in-out\"}'>{$menu}</ul>";

		// $this->dbg($menu);

		$content->applyVars(["menu-principal" => $menu]);

		return $content;
	}

	function load_social(UITemplate $content){
		$data = $this->database()->get("social");
		// $this->dbg($data["contatos"]);
		if(isset($data["contatos"])){
			$content->applyVars($data["contatos"]);
			$content->applyVars([
				"logo-topo" => isset($data["logotipo-white"]) ? $data["logotipo-white"] : "./assets/img/logo-branca.png",
				"logo-rodape" => isset($data["logotipo-dark"]) ? $data["logotipo-dark"] : "./assets/img/logo-mobile.png"
			]);
		}

		return $content;
	}
} ?>

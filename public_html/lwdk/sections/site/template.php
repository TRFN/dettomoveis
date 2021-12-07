<?php trait template_site {
	function _template_(UITemplate $content) {
		$this->load_menu($content);
		$this->load_social($content);

		return $content;
	}

	function load_menu(UITemplate $content){
		$menu = "";
		$data = $this->database()->query("config", "name=menu");
		foreach($data["content"] as $option){
			/*<li>
				<a href="index.html">
					<span class="link-icon"></span>
					<span class="link-txt">
						<span class="link-ext"></span>
						<span class="txt">
							Home <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
						</span>
					</span>
				</a>
			</li>
			<li class="menu-item-has-children">
				<a href="produtos.html">
					<span class="link-icon"></span>
					<span class="link-txt">
						<span class="link-ext"></span>
						<span class="txt">
							Produtos <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
						</span>
					</span>
				</a>
				<ul class="nav-item-children">
					<li>
						<a href="cadeiras.html">
							<span class="link-icon"></span>
							<span class="link-txt">
								<span class="link-ext"></span>
								<span class="txt">
									Cadeiras <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
								</span>
							</span>
						</a>
					</li>
					<li>
						<a href="mobiliarios.html">
							<span class="link-icon"></span>
							<span class="link-txt">
								<span class="link-ext"></span>
								<span class="txt">
									Mobiliários <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
								</span>
							</span>
						</a>
					</li>
					<li>
						<a href="ambiente-externo.html">
							<span class="link-icon"></span>
							<span class="link-txt">
								<span class="link-ext"></span>
								<span class="txt">
									Ambiente Externo <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
								</span>
							</span>
						</a>
					</li>
					<li>
						<a href="persianas.html">
							<span class="link-icon"></span>
							<span class="link-txt">
								<span class="link-ext"></span>
								<span class="txt">
									Persianas <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
								</span>
							</span>
						</a>
					</li>
					<li>
						<a href="pisos.html">
							<span class="link-icon"></span>
							<span class="link-txt">
								<span class="link-ext"></span>
								<span class="txt">
									Pisos <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
								</span>
							</span>
						</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="a-detto.html">
					<span class="link-icon"></span>
					<span class="link-txt">
						<span class="link-ext"></span>
						<span class="txt">
							A Detto <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
						</span>
					</span>
				</a>
			</li>
			<li>
				<a href="contato.html">
					<span class="link-icon"></span>
					<span class="link-txt">
						<span class="link-ext"></span>
						<span class="txt">
							Fale Conosco <span class="submenu-expander">&nbsp;<i class="fa fa-angle-down"></i>&nbsp;</span>
						</span>
					</span>
				</a>
			</li>*/
		}
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
	}
} ?>

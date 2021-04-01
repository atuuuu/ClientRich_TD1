<?php
return array(
	"devtools-path"=>"Ubiquity",
	"info"=>[
			"rest"
			],
	"display-cache-types"=>[
			"controllers",
			"models"
			],
	"maintenance"=>[
			"on"=>false,
			"modes"=>[
					"maintenance"=>[
							"excluded"=>[
									"urls"=>[
											"admin",
											"Admin"
											],
									"ports"=>[
											8080,
											8090
											],
									"hosts"=>[
											"127.0.0.1"
											]
									],
							"controller"=>"\\controllers\\MaintenanceController",
							"action"=>"index",
							"title"=>"Maintenance mode",
							"icon"=>"recycle",
							"message"=>"Our application is currently undergoing sheduled maintenance.<br>Thank you for your understanding."
							]
					]
			]
	);
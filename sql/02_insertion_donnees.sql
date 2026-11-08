USE trouve_ton_artisan;
-- =====================
-- 1. Catégories
-- =====================
INSERT INTO categorie (nom) VALUES
  ('Alimentation'),  -- id 1
  ('Bâtiment'),      -- id 2
  ('Fabrication'),   -- id 3
  ('Services');      -- id 4

-- =====================
-- 2. Spécialités
-- =====================
INSERT INTO specialite (nom, id_categorie) VALUES
('Boucher', 1),		-- id 1
('Boulanger', 1),	-- id 2
('Chocolatier',1),	-- id 3 
('Traiteur',1),		-- id 4
('Chauffagiste',2),	-- id 5
('Electricien',2),	-- id 6
('Menuisier',2),	-- id 7
('Plombier',2),		-- id 8
('Bijoutier',3),	-- id 9
('Couturier',3),	-- id 10
('Ferronnier',3),	-- id 11
('Coiffeur',4),		-- id 12
('Fleuriste',4),	-- id 13
('Toiletteur',4),	-- id 14
('Webdesign',4);	-- id 15

-- =====================
-- 3. Artisans
-- =====================
INSERT INTO artisan 
(nom,       				note,	 ville,			    a_propos,			            email,						            site_web, 				      top, id_specialite) VALUES
('Boucherie Dumont',		4.5,	'Lyon',			    'Lorem ipsum dolor sit amet',   'boucherie.dumond@gmail.com',			     NULL,          					    	0,		1),
('Chocolaterie Labbé',		4.9,	'Lyon',			    'Lorem ipsum dolor sit amet',	'chocolaterie-labbe@gmail.com',			    'https://chocolaterie-labbe.fr',    		1,		3),
('Au pain chaud',   		4.8,	'Montélimar',		'Lorem ipsum dolor sit amet', 	'aupainchaud@hotmail.com',			         NULL,             						    1,		2),
('Traiteur Truchon',		4.1,	'Lyon',			    'Lorem ipsum dolor sit amet', 	'contact@truchon-traiteur.fr',			    'https://truchon-traiteur.fr',		    	0,		4),	
('Orville Salmons',	    	5.0,	'Evian',			'Lorem ipsum dolor sit amet', 	'o-salmons@live.com',				         NULL,				                		1,		5), 	
('Mont Blanc Electricité',	4.5,	'Chamonix',		    'Lorem ipsum dolor sit amet', 	'contact@mont-blanc-electricite.com',	    'https://mont-blanc-electricite.com',		0,		6),
('Boutot & fils',		    4.7,	'Bourg-en-Bresse',	'Lorem ipsum dolor sit amet', 	'boutot-menuiserie@gmail.com',			    'https://boutot-menuiserie.com',		    0,		7),
('Vallis Bellemare',		4.0,	'Vienne',		    'Lorem ipsum dolor sit amet', 	'v.bellemare@gmail.com',			        'https://plomberie-bellemare.com',		    0,		8),	
('Claude Quinn',	    	4.2,	'Aix-les-Bains',	'Lorem ipsum dolor sit amet', 	'claude.quinn@gmail.com',			         NULL,		                   				0,		9),
('Amitee Lécuyer',		    4.5,	'Annecy',		    'Lorem ipsum dolor sit amet', 	'a.amitee@hotmail.com',				        'https://lecuyer-couture.com',     			0,		10),	
('Ernest Carignan',	    	5.0,	'Le Puy-en-Velay',	'Lorem ipsum dolor sit amet', 	'e-carigan@hotmail.com',			         NULL,						                0,		11),	
('Royden Charbonneau',		3.8,	'Saint-Priest',		'Lorem ipsum dolor sit amet', 	'r.charbonneau@gmail.com',			         NULL,						                0,		12),	
('Leala Dennis',	    	3.8,	'Chambéry',		    'Lorem ipsum dolor sit amet',	'l.dennos@hotmail.fr',				        'https://coiffure-leala-chambery.fr',		0,		12),	
('C''est sup''hair',		4.1,	'Romans-sur-Isère',	'Lorem ipsum dolor sit amet', 	'sup-hair@gmail.com',				        'https://sup-hair.fr',		            	0,		12),
('Le monde des fleurs',		4.6,	'Annonay',		    'Lorem ipsum dolor sit amet', 	'contact@le-monde-des-fleurs-annonay.fr',	'https://le-monde-des-fleurs-annonay.fr',   0, 	    13),	
('Valérie Laderoute', 	    4.5,    'Valence',          'Lorem ipsum dolor sit amet',   'v-laredoute@gmail.com',                     NULL,                                      0,      14),
('CM Graphisme',	    	4.4,    'Valence',          'Lorem ipsum dolor sit amet',   'contact@cm-graphisme.com',                 'https://cm-graphisme.com',                 0,      15);    

superplaceholder({
	el: document.querySelector('#nombre'),
	sentences: ['Ingrese su Nombre','Sage Skylight','The Black Hardies','Langosta', 'La Milicia', 'Malas decisiones', 'Micelios', 'Punto de fuga', 'Save Atlantis', 'The S.H.U.L.L.S','Wolks'],
	options: {
		letterDelay: 100, 
		sentenceDelay: 600,
		startOnFocus: true,
		loop: true,
		shuffle: false,
		showCursor: true,
		cursor: '_'
	}
});

superplaceholder({
	el: document.querySelector('#correo'),
	sentences: ['Ingrese su correo electrónico','somos.booking@gmail.com','Sage-Skylight@hotmail.com','TheBlackHardies@yahoo.com','Langosta@outlook.com', 'La_Milicia@gmail.com', 'Malas-Decisiones@hotmail.com', 'Micelios@yahoo.com', 'Punto_de_fuga@outlook.com', 'Save_Atlantis@gmail.com', 'The-S.H.U.L.L.S@hotmail.com','Wolks@gmail.com'],
	options: {
		letterDelay: 100, 
		sentenceDelay: 600,
		startOnFocus: true, 
		loop: true,
		shuffle: false,
		showCursor: true,
		cursor: '_'
	}
});

superplaceholder({
	el: document.querySelector('#telefono'),
	sentences: ['Ingrese su teléfono','666 666 666','123 456 789','Interstella 5555'],
	options: {
		letterDelay: 100, 
		sentenceDelay: 600,
		startOnFocus: true,
		loop: true,
		shuffle: false,
		showCursor: true,
		cursor: '_'
	}
});

superplaceholder({
	el: document.querySelector('#mensaje'),
	sentences: ['Ingrese su mensaje.','¡Hola! ¿Cómo podemos ayudarte?','Quiero más información sobre el negocio.','Quiero más información sobre ti.','Entendemos que la exposición de la música es un trabajo de equipo.'],
	options: {
		letterDelay: 100, 
		sentenceDelay: 600,
		startOnFocus: false,
		loop: true,
		shuffle: false,
		showCursor: true,
		cursor: '_'
	}
});

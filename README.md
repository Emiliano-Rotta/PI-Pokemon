# PI - Henry Pokemon
## Autor: Emiliano Rotta

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Link del video.
https://www.linkedin.com/feed/update/urn:li:activity:6943334211676168192/

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

## Enunciado

Este proyecto consistió en crear una aplicación en la cual se pueden ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) y a partir de ella poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons

### Tecnologías usadas:
- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres

### Frontend

Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: contiene una landing page con:
- [ ] Una imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: contiene:
- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda es exacta, es decir solo encuentra al pokemon si se coloca el nombre completo)
- [ ] Área donde se ve el listado de pokemons. mostrando su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y por pokemon existente o creado por nosotros
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.

__Ruta de detalle de Pokemon__: contiene:
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad)
- [ ] Altura y peso

__Ruta de creación__: contiene:
- [ ] Un formulario __controlado con JavaScript__ con los campos mencionados en el detalle del Pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de Pokemon
- [ ] Botón/Opción para crear un nuevo Pokemon

> El formulario de creación está validado con JavaScript y con validaciones HTML. 
 
#### Base de datos

El modelo de la base de datos contiene las siguientes entidades:

  - [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon)  : No puede ser un ID de un pokemon ya existente en la API pokeapi
  - Nombre 
  - Vida
  - Fuerza
  - Defensa
  - Velocidad
  - Altura
  - Peso
  - [ ] Tipo con las siguientes propiedades:
  - ID
  - Nombre

a relación entre ambas entidades es de muchos a muchos ya que un pokemon puede pertenecer a más de un tipo y, a su vez, un tipo puede incluir a muchos pokemons.

#### Backend

Contiene un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /pokemons__:
  - Listado de los pokemons desde pokeapi.
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /pokemons/{idPokemon}__:
  - Obtiene el detalle de un pokemon en particular
  - Contiene solo los datos pedidos en la ruta de detalle de pokemon
  - Funciona tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
- [ ] __GET /pokemons?name="..."__:
  - Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
  - Si no existe ningún pokemon muestra un mensaje adecuado
- [ ] __POST /pokemons__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
  - Crea un pokemon en la base de datos
- [ ] __GET /types__:
  - Obtener todos los tipos de pokemons posibles
  - En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

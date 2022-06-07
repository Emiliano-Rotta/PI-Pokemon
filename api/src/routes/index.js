const { Router } = require('express');
// const Pokemon = require('../models/Pokemon');
const { Pokemon, Type } = require("../db")
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//me traigo la info de la api ver esta ruta!!!!!
const api = async () => {
  try {
    const pokeUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");
    const pokeUrls = pokeUrl.data.results.map((e) => axios.get(e.url));
    const allPokeUrls = await axios.all(pokeUrls);
    const pokemon = allPokeUrls.map((p) => {
      return {
        id: p.data.id,
        name: p.data.name,
        // image: p.data.sprites.front_default, //TARDA 4 SEGUNDOS
        image: p.data.sprites.other["official-artwork"].front_default, //TARDA 5 SEGUNDOS
        life: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[3].base_stat,
        height: p.data.height,
        weight: p.data.weight,
        types: p.data.types.map(t => {
          return {
            name: t.type.name,
          }
        }),
      };
    });
    return pokemon;
  } catch (err) {
    console.log(err);
  }
};

//me traigo la info de la base de datos
const baseDatos = async () => {
  try {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log("Hubo un error en baseDatos", error)
  }
};
//las concateno a ambos
const concatenada = async () => {
  try {
    const apiInfo = await api();
    const dbInfo = await baseDatos();
    const allInfo = apiInfo.concat(dbInfo);
    return allInfo;
  } catch (error) {
    console.log("Se encontro un error en concatenada", error)
  }
};

// const concatenada2 =async () => {
//   try {
//     const apiInfo = await api2();
//     const dbInfo = await baseDatos();
//     const allInfo = apiInfo.concat(dbInfo);
//     return allInfo;
//   } catch (error) {
//     console.log("Se encontro un error en concatenada", error)
//   }
// };


//2 
// router.get("/pokemons/:id", async (req, res) => {
//   const id = req.params.id;
//   const allPokemon = await concatenada();
//   if (id) {
//     let idPok = await allPokemon.filter(e => e.id == id)
//     idPok.length ?
//       res.status(200).json(idPok) :
//       res.status(404).send("No se encontro el Pokemon")
//   }
// })


//3 findOne where
// router.get("/pokemonsa", async (req, res) => {
//   try {
//     const name = req.query.name;
//     const allPok = await concatenada();
//     if (name) {
//       let pokName = await allPok.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
//       pokName.length ?
//         res.status(200).send(pokName) :
//         res.status(404).send("un mensaje adecuado");

//     } else {

//       res.status(200).send(allPok)
//     }

//   } catch (error) {
//     console.log("Se encontro una falla en el get /pokemon", error)
//   }
// });

//post 4 

router.post('/pokemons', async (req, res) => {
  try {

    let {
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      createdInDb } = req.body

    let pokCreated = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDb

    })

    let typeDb = await Type.findAll({
      where: { name: types }
    })

    await pokCreated.addType(typeDb); // se agrega el await para esperar que se encuentren los temperaments
    res.status(200).send("Pokemon creado");

  }
  catch (error) {
    console.log("Se presento un error en el Post", error)
  }
}
);

//5
router.get('/types', async (req, res) => {
  try {
    const api = await axios.get("https://pokeapi.co/api/v2/type"); //Trae todos los tipos
    const types = await api.data // trae la respuesta en data
    for (i of types.results) { //entra a la propiedad results, a cada elemento
      const find = await Type.findOne({ where: { name: i.name } }); // Entra a la propiedad name y busca si ya existe 
      if (!find) { // Si no lo encuentra..
        await Type.create({ name: i.name }); //Lo agrega a la base de datos
      } else {
        return res.json(await Type.findAll()) // Sino devuelve todos los tipos
      }
    }
    res.json(await Type.findAll()); //Finalmente devuelvo todos los tipos de la Db.
  } catch (error) {
    console.log("Se presento un error en el GET types", error)
  }

});






router.get("/pokemons", async (req, res) => {
  const name = req.query.name;
  const dbInfo = await concatenada()
  if (name) {
    let pokName = await dbInfo.filter(e => e.name.toLowerCase() === name.toLowerCase());//lo pasa a minuscula.. filter pregunta
    if (pokName.length) {
      res.status(200).send(pokName)
    }
    else {
      try {
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        var poke = {
          id: pokemon.data.id,
          name: pokemon.data.name,
          image: pokemon.data.sprites.other["official-artwork"].front_default, //TARDA 5 SEGUNDOS
          life: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[3].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map(t => {
            return {
              name: t.type.name,
            }
          }),
        };
        res.status(200).send([poke]);

      } catch (error) {
        res.status(404).send("escribi bien!!!!!!!!")
        console.log("no esta el pokemon en la API", error)
      }

    }
  } else {
    
    res.status(200).send(dbInfo)
  }
});







router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  const allPokemon = await concatenada();
  if (id) {
    let idPok = await allPokemon.filter(e => e.id == id)
    if (idPok.length) {
      res.status(200).json(idPok)
    }
    else {
      try {
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        var poke = {
          id: pokemon.data.id,
          name: pokemon.data.name,
          image: pokemon.data.sprites.other["official-artwork"].front_default, //TARDA 5 SEGUNDOS
          life: pokemon.data.stats[0].base_stat,
          attack: pokemon.data.stats[1].base_stat,
          defense: pokemon.data.stats[2].base_stat,
          speed: pokemon.data.stats[3].base_stat,
          height: pokemon.data.height,
          weight: pokemon.data.weight,
          types: pokemon.data.types.map(t => {
            return {
              name: t.type.name,
            }
          }),
        };
        res.status(200).send([poke]);

      } catch (error) {
        res.status(404).send("No se encontro el Pokemon")
        console.log("no esta el ID pokemon en la API", error)
      }

    }
  } else {
    
    res.status(200).send(dbInfo)
  }
});
























module.exports = router;

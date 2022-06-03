const { Router } = require('express');
// const Pokemon = require('../models/Pokemon');
const {Pokemon, Tipo} = require ("../db")
const axios = require ("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//me traigo la info de la api
const api = async () => {
    const resp = await axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=40")
      .then((data) => {
        return data.data.results;
      })
      .then((data) => {
        return Promise.all(data.map((res) => axios.get(res.url))); // ENTRAR A CADA ELEMENTO Y HACERLE UN GET A SU URL
      })
      .then((data) => {
        return data.map((res) => res.data); // RESULTADO FINAL DE CADA POKEMON CON TODOS SUS DATOS, SE GUARDAN EN RESP.
      });
    let arrayPoke = resp.map((result) => {  //DENTRO DE UN ARRAY ME TRAIGO TODAS LAS PROPIEDADES QUE QUIERO DE CADA POKEMON.
      return {
        id: result.id,
        name: result.name,
        types: result.types.map((t) => t.type.name), //lOS TIPOS ESTAN EN SU PROPIEDAD NAME
        image: result.sprites.front_default,
        life: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
      };
    });
    return arrayPoke;
  };
  
  //me traigo la info de la base de datos
  const baseDatos = async () => {
    try {
      return await Pokemon.findAll({
        include: {
          model: Tipo,
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


 
  //2
  router.get("/pokemons/:id", async (req,res)=>{
    const id = req.params.id ;
    const allPokemon = await concatenada();
    if (id){
        let idPok = await allPokemon.filter(e => e.id == id)
        idPok.length? 
        res.status (200).json (idPok):
        res.status (404).send ("No se encontro el Pokemon")
    }
  })

  //3
  router.get ("/pokemons", async (req, res)=>{
    try {
      const name = req.query.name;
      const allPok = await concatenada ();
      if (name){
        //modificar esta linea para buscar en la api https://pokeapi.co/api/v2/pokemon/{name} antes preguntar si esta en la base de datos
          let pokName = await allPok.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
          pokName.length ?
          res.status(200).send(pokName):
          res.status(404).send("un mensaje adecuado");
      }else{
          res.status(200).send(allPok)
      }
      
    } catch (error) {
      console.log("Se encontro una falla en el get /pokemon", error)
    }
  });

  //post 4 

  router.post('/pokemons', async (req, res) => {
    try{
  
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
    
        let typeDb = await Tipo.findAll({
          where: {name: types} 
        })
        
        await pokCreated.addTipo(typeDb); // se agrega el await para esperar que se encuentren los temperaments
        res.status(200).send ("Pokemon creado");
        
    }
    catch(error){
      console.log("Se presento un error en el Post", error)
    }
    }
    ); 

    //5
      router.get('/types', async (req, res) => {
            try {
              const api = await axios.get("https://pokeapi.co/api/v2/type"); //Trae todos los tipos
              const types = await api.data // trae la respuesta en data
              for (i of types.results) { //Entra a la propiedad results, a cada elemento..
                const find = await Tipo.findOne({ where: {name: i.name}}); // Entra a la propiedad name y busca si ya existe 
                if (!find)  { // Si no lo encuentra..
                  await Tipo.create({ name: i.name }); //Lo agrega a la base de datos
                } else {
                  return res.json(await Tipo.findAll()) // Sino devuelve todos los tipos
                }
              }
              res.json(await Tipo.findAll()); //Finalmente devuelvo todos los tipos de la Db.
            } catch (error){
                console.log("Se presento un error en el GET types", error)
              }
            
          });



    // router.get('/types', async (req, res) => {
    //   const api = await axios.get("https://pokeapi.co/api/v2/type"); //Trae todos los tipos
    //   const types = await api.data.map (e=>e.type) // me trae todos los arreglos
    //   const occEach = types.map (e => {
    //       for (let i = 0; i < e.length; i++) return e[i]})
    //       console.log (occEach)
    //     occEach.forEach (e =>{
    //       Tipo.findOrCreate({    //se fija si esta y si jno lo esta lo crea
    //         where: {name: e} 
    //       })
    //     }) 
    //     const allTypes = await Tipo.findAll();
    //     res.send (allTypes)
    // });

  //   router.get('/types', async (req, res) => {

  //     const tDataBase = await Tipo.findAll();
  
  //     if(tDataBase.length === 0) {
  //         try {
  //             const types = await axios.get('https://pokeapi.co/api/v2/type')
  //             for(let i=0; i<types.data.results.length; i++){
  //                 await Tipo.create({name: types.data.results[i].name});
  //             }
  //          } catch(error) {
  
  //            return res.status(404).send('Se produjo un Error')
  //          }
  //         } else {
  //             return res.status(200).json(tDataBase);
  //         }
  // })


module.exports = router;

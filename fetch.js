const API_URL="https://pokeapi.co/api/v2/";
const CARD_CONTAINER = document.getElementById("container");

const fetchPokemon=async(pokemon)=>{
try {
    const response=await fetch(`${API_URL}pokemon/${pokemon}`);
    const parsedResponse= await response.json();
    return parsedResponse;
} catch (error) {
    console.error(error)
}
};
const savePokemon=async ()=>{
    const savePokemonId=localStorage.getItem("pokemonId")
    if(savePokemonId){
        const pokemon=await fetchPokemon(savePokemonId);
        if(pokemon){
            renderCard(pokemon);
        }
    }
}
window.addEventListener('load', savePokemon);
//Get
document.getElementById('get-btn').addEventListener('click', async()=>{
        const texto=document.getElementById('pokemon-name').value.toLowerCase();
        const pokemon=await fetchPokemon(texto);
        if(pokemon){
         renderCard(pokemon);
        localStorage.setItem("pokemonId",pokemon.id)
        }
})
//Previous
document.getElementById('prev-btn').addEventListener('click',async()=>{
        const currentPomekonId=parseInt(localStorage.getItem("pokemonId"));
        const newId=Math.max(1,currentPomekonId - 1 );
        const pokemon=await fetchPokemon(newId);
        if(pokemon){
            renderCard(pokemon);
            localStorage.setItem("pokemonId",pokemon.id);
        }
})
//next
document.getElementById('next-btn').addEventListener('click',async()=>{
    const currentPomekonId=parseInt(localStorage.getItem("pokemonId"));
    const newId=Math.min(1025,currentPomekonId + 1 );
    const pokemon=await fetchPokemon(newId);
    if(pokemon){
        renderCard(pokemon);
        localStorage.setItem("pokemonId",pokemon.id);
    }
})
//Estructura de tarjeta
//crear img
const crearImg=(user)=>{
    const image = document.createElement("img");
    image.src = user.sprites.other["official-artwork"].front_default;
    image.alt = user.name;
    image.classList.add('diseimg');
    return image
};
//Crear info
const crearInfo=(user)=>{
    const descripContenedor=document.createElement('div');
    const userName = document.createElement("h3");
    const weightpoke = document.createElement("p");
    const id = document.createElement("p");
    userName.textContent = user.name;
    weightpoke.textContent = `Weight: ${user.weight}kg`;
    id.textContent =`Id: ${user.id}`; 
    descripContenedor.append(userName,weightpoke,id)
    return descripContenedor
}
//crearCard
const crearCardUser=(user)=>{
    const cardContainer=document.createElement('div')
    cardContainer.classList.add('rojo');
    const img=crearImg(user);
    const info=crearInfo(user);
    cardContainer.append(img,info);
    return cardContainer
};
//render
const renderCard=(user)=>{
        CARD_CONTAINER.innerHTML="";//limpia el contenedor
        const cardUser=crearCardUser(user)
        CARD_CONTAINER.appendChild(cardUser);
}


document.addEventListener("DOMContentLoaded", () => {
    fetchTypes();
    fetchAllPokemon();
});

const pokemonContainer = document.getElementById("pokemonContainer");
const searchInput = document.getElementById("searchInput");
const typeSelect = document.getElementById("typeSelect");

// Fetch Pokémon types to populate the dropdown
async function fetchTypes() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/type/");
        const data = await response.json();
        data.results.forEach(type => {
            const option = document.createElement("option");
            option.value = type.name;
            option.textContent = type.name.charAt(0).toUpperCase() + type.name.slice(1);
            typeSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching Pokémon types:", error);
    }
}

// Fetch and display all Pokémon
async function fetchAllPokemon() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        const data = await response.json();
        displayPokemon(data.results);
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
    }
}

// Display Pokémon cards
function displayPokemon(pokemonList) {
    pokemonContainer.innerHTML = "";
    pokemonList.forEach(pokemon => {
        const pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");
        pokemonCard.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIdFromUrl(pokemon.url)}.png" alt="${pokemon.name}">
            <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
        `;
        pokemonContainer.appendChild(pokemonCard);
    });
}

// Filter Pokémon by type
async function filterByType() {
    const selectedType = typeSelect.value;
    if (!selectedType) return;

    try {
         const data = await response.json();
        const pokemonList = data.pokemon.map(p => p.pokemon);
        displayPokemon(pokemonList);
    } catch (error) {
        console.error("Error filtering Pokémon by type:", error);
    }
}

// Reset filters and display all Pokémon
function resetFilters() {
    searchInput.value = "";
    typeSelect.value = "";
    fetchAllPokemon();
}

// Search Pokémon by name
function searchPokemon() {
    const searchQuery = searchInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    let found = false;

    pokemonCards.forEach(card => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        if (name.includes(searchQuery)) {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    if (!found) {
        pokemonContainer.innerHTML = <div class="no-results">No Pokémon found</div>;
    }
}

// Helper function to extract Pokémon ID from URL
function getIdFromUrl(url) {
    const parts = url.split("/");
    return parts[parts.length - 2];
}
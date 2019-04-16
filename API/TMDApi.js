import player from "../reducers/player";

export function getPlayer(){
   
}

export function getImage () {
    return name
  }

// Récupération du détail d'un film
export function getPlayerDetail(id) {
    return players[id]
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
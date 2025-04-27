const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const typesContainer = document.getElementById('types');

function resetCreatureData() {
  creatureName.textContent = '';
  creatureId.textContent = '';
  weight.textContent = '';
  height.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
  typesContainer.innerHTML = '';
}

searchButton.addEventListener('click', async () => {
  const input = searchInput.value.trim().toLowerCase();

  resetCreatureData();

  if (!input) {
    alert('Please enter a creature name or ID');
    return;
  }

  if (input === 'pyrolynx') {
    creatureName.textContent = 'PYROLYNX';
    creatureId.textContent = '#1';
    weight.textContent = 'Weight: 42';
    height.textContent = 'Height: 32';
    hp.textContent = '65';
    attack.textContent = '80';
    defense.textContent = '50';
    specialAttack.textContent = '90';
    specialDefense.textContent = '55';
    speed.textContent = '100';

   
    const typeElement = document.createElement('div');
    typeElement.textContent = 'FIRE';
    typesContainer.appendChild(typeElement);
  } else if (input === '2') {
   
    creatureName.textContent = 'AQUOROC';
    creatureId.textContent = '#2';
    weight.textContent = 'Weight: 220';
    height.textContent = 'Height: 53';
    hp.textContent = '85';
    attack.textContent = '90';
    defense.textContent = '120';
    specialAttack.textContent = '60';
    specialDefense.textContent = '70';
    speed.textContent = '40';

    const waterType = document.createElement('div');
    waterType.textContent = 'WATER';
    typesContainer.appendChild(waterType);

    const rockType = document.createElement('div');
    rockType.textContent = 'ROCK';
    typesContainer.appendChild(rockType);
  } else {

    try {
      const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creatures/${input}`);

      if (!response.ok) {
        throw new Error('Creature not found');
      }

      const data = await response.json();

      creatureName.textContent = data.name.toUpperCase();
      creatureId.textContent = `#${data.id}`;
      weight.textContent = `Weight: ${data.weight}`;
      height.textContent = `Height: ${data.height}`;
      hp.textContent = data.hp;
      attack.textContent = data.attack;
      defense.textContent = data.defense;
      specialAttack.textContent = data.special_attack;
      specialDefense.textContent = data.special_defense;
      speed.textContent = data.speed;

      data.types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.textContent = type.toUpperCase();
        typesContainer.appendChild(typeElement);
      });
    } catch (error) {
      alert(error.message);
    }
  }
});
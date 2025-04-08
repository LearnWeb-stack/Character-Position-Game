# Character Placement Game: A Comprehensive Tutorial

This tutorial provides a detailed explanation of the Character Placement Game code, covering the HTML structure, CSS styling, and JavaScript functionality. The game challenges players to place character icons in the correct positions based on textual hints.

## Table of Contents

1. [HTML Structure](#html-structure)
2. [CSS Styling](#css-styling)
3. [JavaScript Functionality](#javascript-functionality)
   - [Game Data](#game-data)
   - [Global Variables](#global-variables)
   - [Initialization](#initialization)
   - [Game Setup Functions](#game-setup-functions)
   - [Drag and Drop Functionality](#drag-and-drop-functionality)
   - [Game Logic Functions](#game-logic-functions)

## HTML Structure

The HTML creates the basic structure for the game with the following key elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Character Placement Game</title>
    <!-- CSS styles are included in the head section -->
</head>
<body>
    <h1>Character Placement Game</h1>
    
    <div class="game-container">
        <div class="puzzle-number" id="puzzle-number">Puzzle 1</div>
        
        <div class="hints-container">
            <h2>Hints:</h2>
            <div id="hints-list"></div>
        </div>
        
        <div class="characters" id="characters-container"></div>
        
        <div class="positions">
            <div class="position" id="position-left">
                <div class="position-label">Left</div>
            </div>
            <div class="position" id="position-center-left">
                <div class="position-label">Center-Left</div>
            </div>
            <div class="position" id="position-center">
                <div class="position-label">Center</div>
            </div>
            <div class="position" id="position-center-right">
                <div class="position-label">Center-Right</div>
            </div>
            <div class="position" id="position-right">
                <div class="position-label">Right</div>
            </div>
        </div>
        
        <div>
            <button class="random-btn" id="random-btn">Generate Random Puzzle</button>
        </div>
        
        <div>
            <button class="check-btn" id="check-btn">Check Placement</button>
            <button class="reset-btn" id="reset-btn">Reset</button>
        </div>
        
        <div class="message" id="message"></div>
    </div>

    <!-- JavaScript is included at the end of the body section -->
</body>
</html>
```

Key HTML elements:

1. `<div class="puzzle-number">` - Displays the current puzzle number
2. `<div class="hints-container">` - Contains the hints for the current puzzle
3. `<div class="characters">` - Contains the character icons that can be dragged
4. `<div class="positions">` - Contains the five positions where characters can be placed
5. Button elements for game control: random puzzle generation, checking placement, and resetting
6. `<div class="message">` - Displays success or error messages

## CSS Styling

The CSS defines the visual appearance of the game:

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f8ff;
    padding: 10px;
    text-align: center;
}

.game-container {
    max-width: 800px;
    margin: 0 auto;
}

.hints-container {
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    text-align: left;
}

.hint {
    padding: 8px;
    border-left: 4px solid #4a90e2;
    margin-bottom: 8px;
    background-color: #f5f8ff;
}

.characters {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 40px;
}

.character {
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: grab;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    position: relative;
}

.character img {
    width: 60px;
    height: 60px;
}

.character-name {
    position: absolute;
    bottom: -35px;
    font-size: 12px;
    font-weight: bold;
    width: 100%;
    text-align: center;
}

.positions {
    display: flex;
    justify-content: space-between;
    height: 150px;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.position {
    width: 90px;
    height: 90px;
    border: 2px dashed #ccc;
    border-radius: 50%;
    position: relative;
}

.position.highlight {
    border-color: #4a90e2;
    background-color: rgba(74, 144, 226, 0.1);
}

.position-label {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
    white-space: nowrap;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    margin: 0 10px 10px 10px;
}

.check-btn {
    background-color: #4a90e2;
    color: white;
}

.reset-btn {
    background-color: #e74c3c;
    color: white;
}

.random-btn {
    background-color: #9b59b6;
    color: white;
}

.message {
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    display: none;
}

.success {
    background-color: #2ecc71;
    color: white;
}

.error {
    background-color: #e74c3c;
    color: white;
}

.puzzle-number {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #333;
}
```

Key CSS features:

1. The overall layout is centered with a maximum width of 800px
2. Characters are displayed as circular elements with images inside
3. Positions are also circular with dashed borders
4. Hints are displayed with a blue left border in a white container
5. Button styling for the three game control buttons
6. Message styling for success and error messages
7. Responsive design elements to ensure good layout on different devices

## JavaScript Functionality

### Game Data

The JavaScript begins by defining data for the game:

```javascript
// All puzzles data
// Puzzle 1
let hints1 = [
    {silver: "The Silver Hedgehog is an outsider, trying to fit in."},
    {bat: "The Bat is a prankster, and loves to mess with the Blue Hedgehog."},
    {fox: "The Fox is Fully Left-handed, and is proud of it."},
    {cat: "The Cat is a silent one, keeping her distance from everyone else."},
    {blue: "The Blue Hedgehog loves being the Center of attention."}
];

// Puzzle 2
let hints2 = [
    {silver: "The Silver Hedgehog has only one friend, the Cat."},
    {bat: "The Bat loves to be the Middleman in trade deals."},
    {fox: "The Fox loves to hangout with the Blue Hedgehog, always sticking by his side."},
    {cat: "The Cat, dispite her beauty and status, is often too Far away to be noticed."},
    {blue: "The Blue Hedgehog is a carefree spirit, Left to run in the wind."}
];

// Puzzle 3
let hints3 = [
    {silver: "The Silver Hedgehog is flattered by the fox, although finding him a little strange."},
    {bat: "The Bat is clear and Center-minded, but always gets distracted by beautiful and shiny things."},
    {fox: "The Fox loves to learn about people he doesn't know to well, sometimes taking things a bit too Far."},
    {cat: "The Cat's soul burns so brightly and beautifly, dazzling everyone who's Righteous enough to see."},
    {blue: "The Blue Hedgehog has a friendly rivalry with the Cat, usually ending up in fights together."}
];
```

This section defines three sets of hints (one for each puzzle). Each hint is an object with a character ID as the key and the hint text as the value. The hints contain subtle clues about where each character should be placed.

```javascript
// Solutions for each puzzle
const puzzleSolutions = [
    // Puzzle 1 solutions
    { 
        "silver": "position-right",
        "bat": "position-center-right",
        "fox": "position-left",
        "cat": "position-center-left",
        "blue": "position-center"
    },
    // Puzzle 2 solutions
    { 
        "silver": "position-center-right",
        "bat": "position-center",
        "fox": "position-center-left",
        "cat": "position-right",
        "blue": "position-left"
    },
    // Puzzle 3 solutions
    { 
        "silver": "position-center-left",
        "bat": "position-center",
        "fox": "position-left",
        "cat": "position-right",
        "blue": "position-center-right"
    }
];
```

This section defines the solutions for each puzzle. Each solution is an object that maps character IDs to position IDs, indicating the correct position for each character.

```javascript
// Character information (stays the same for all puzzles)
const characters = [
    { id: "silver", name: "Silver Hedgehog", image: "images/silver-hedge-hog.webp" },
    { id: "bat", name: "Bat", image: "images/bat.png" },
    { id: "fox", name: "Fox", image: "images/fox.png" },
    { id: "cat", name: "Cat", image: "images/cat.png" },
    { id: "blue", name: "Blue Hedgehog", image: "images/blue-hedge-hog.webp" }
];
```

This section defines the characters used in the game. Each character has an ID, a display name, and an image path.

### Global Variables

```javascript
// Variable to store which character is being dragged
let draggedCharacter = null;

// Current puzzle number (1, 2, or 3)
let currentPuzzle = 1;

// Current puzzle solutions
let currentSolutions = puzzleSolutions[0];
```

These global variables track:
1. `draggedCharacter` - The character element being dragged
2. `currentPuzzle` - The current puzzle number (1, 2, or 3)
3. `currentSolutions` - The solution for the current puzzle

### Initialization

```javascript
// Wait for the page to load
window.onload = function() {
    // Initialize the game with the first puzzle
    setupPuzzle(1);
    
    // Set up the random puzzle button
    document.getElementById("random-btn").addEventListener("click", function() {
        // Generate a random puzzle number (1, 2, or 3)
        const randomPuzzle = Math.floor(Math.random() * 3) + 1;
        setupPuzzle(randomPuzzle);
    });
    
    // Check button
    document.getElementById("check-btn").addEventListener("click", function() {
        checkPlacement();
    });
    
    // Reset button
    document.getElementById("reset-btn").addEventListener("click", function() {
        resetGame();
    });
};
```

This `window.onload` function is executed when the page loads:
1. It calls `setupPuzzle(1)` to initialize the game with puzzle 1
2. It adds event listeners to the three buttons:
   - Random button: Generates a random puzzle number and calls `setupPuzzle`
   - Check button: Calls `checkPlacement` to verify if characters are correctly placed
   - Reset button: Calls `resetGame` to reset the game to its initial state

### Game Setup Functions

```javascript
// Setup a specific puzzle
function setupPuzzle(puzzleNumber) {
    currentPuzzle = puzzleNumber;
    
    // Update puzzle number display
    document.getElementById("puzzle-number").textContent = "Puzzle " + puzzleNumber;
    
    // Clear previous hints
    document.getElementById("hints-list").innerHTML = "";
    
    // Get the right hints for this puzzle
    let currentHints;
    if (puzzleNumber === 1) {
        currentHints = hints1;
        currentSolutions = puzzleSolutions[0];
    } else if (puzzleNumber === 2) {
        currentHints = hints2;
        currentSolutions = puzzleSolutions[1];
    } else {
        currentHints = hints3;
        currentSolutions = puzzleSolutions[2];
    }
    
    // Display hints
    const hintsList = document.getElementById("hints-list");
    currentHints.forEach(function(hint) {
        const key = Object.keys(hint)[0];
        const div = document.createElement("div");
        div.className = "hint";
        div.textContent = hint[key];
        hintsList.appendChild(div);
    });
    
    // Reset the game board
    resetGame();
    
    // Create characters if they don't exist
    if (document.getElementById("characters-container").children.length === 0) {
        createCharacters();
    }
}
```

The `setupPuzzle` function sets up a specific puzzle:
1. It updates the `currentPuzzle` variable
2. It updates the puzzle number display in the UI
3. It clears any previous hints
4. It selects the appropriate hints and solutions based on the puzzle number
5. It displays the hints for the current puzzle by:
   - Getting the key (character ID) from each hint object
   - Creating a div with the "hint" class
   - Setting the text content to the hint text
   - Appending the div to the hints list
6. It calls `resetGame` to reset the game board
7. It calls `createCharacters` if there are no characters yet (happens only on first load)

```javascript
// Create character elements
function createCharacters() {
    const container = document.getElementById("characters-container");
    
    // Clear container first
    container.innerHTML = "";
    
    characters.forEach(function(char) {
        const div = document.createElement("div");
        div.className = "character";
        div.id = char.id;
        
        const img = document.createElement("img");
        img.src = char.image;
        img.alt = char.name;
        
        const name = document.createElement("div");
        name.className = "character-name";
        name.textContent = char.name;
        
        div.appendChild(img);
        div.appendChild(name);
        container.appendChild(div);
        
        // Make character draggable
        div.draggable = true;
        
        // Add drag start event
        div.addEventListener("dragstart", function(event) {
            draggedCharacter = this;
            // Set data for the drag operation
            event.dataTransfer.setData("text", this.id);
        });
    });
    
    // Set up drop zones (positions)
    const positions = document.querySelectorAll(".position");
    positions.forEach(function(position) {
        // Allow drops to happen
        position.addEventListener("dragover", function(event) {
            event.preventDefault();
        });
        
        // Highlight when dragging over
        position.addEventListener("dragenter", function(event) {
            event.preventDefault();
            this.classList.add("highlight");
        });
        
        // Remove highlight when leaving
        position.addEventListener("dragleave", function() {
            this.classList.remove("highlight");
        });
        
        // Handle the drop
        position.addEventListener("drop", function(event) {
            event.preventDefault();
            this.classList.remove("highlight");
            
            // Get the dragged character
            const characterId = event.dataTransfer.getData("text");
            const character = document.getElementById(characterId);
            
            // If this position already has a character, move it back to the container
            if (this.querySelector(".character")) {
                const existingCharacter = this.querySelector(".character");
                document.getElementById("characters-container").appendChild(existingCharacter);
            }
            
            // Move the dragged character to this position
            this.appendChild(character);
        });
    });
}
```

The `createCharacters` function creates the character elements and sets up drag-and-drop functionality:

1. It gets the character container element
2. It clears the container
3. For each character in the `characters` array, it:
   - Creates a div with the "character" class and sets its ID
   - Creates an img element with the character's image
   - Creates a div with the "character-name" class and sets its text
   - Appends the img and name div to the character div
   - Appends the character div to the container
   - Makes the character draggable
   - Adds a "dragstart" event listener that:
     - Sets the `draggedCharacter` variable to the current character
     - Sets the data for the drag operation
4. It sets up the drop zones (positions) by:
   - Getting all elements with the "position" class
   - For each position, adding event listeners for:
     - "dragover": Prevents the default behavior to allow drops
     - "dragenter": Prevents the default behavior and adds a highlight
     - "dragleave": Removes the highlight
     - "drop": Handles the drop by:
       - Preventing the default behavior
       - Removing the highlight
       - Getting the dragged character
       - If there's already a character in this position, moving it back to the container
       - Moving the dragged character to this position

### Game Logic Functions

```javascript
// Check if placement is correct for the current puzzle
function checkPlacement() {
    let allCorrect = true;
    
    // Check each character's position against the current puzzle solution
    characters.forEach(function(char) {
        const character = document.getElementById(char.id);
        const parent = character.parentElement;
        
        // If character is not in a position or in wrong position
        if (!parent.classList.contains("position") || parent.id !== currentSolutions[char.id]) {
            allCorrect = false;
        }
    });
    
    // Show result message
    const msg = document.getElementById("message");
    if (allCorrect) {
        msg.textContent = "Congratulations! All characters are in the correct positions!";
        msg.className = "message success";
    } else {
        msg.textContent = "Not quite right. Try again!";
        msg.className = "message error";
    }
    msg.style.display = "block";
}
```

The `checkPlacement` function checks if all characters are correctly placed:
1. It sets a variable `allCorrect` to true initially
2. For each character in the `characters` array, it:
   - Gets the character element and its parent element
   - If the parent is not a position or if the parent's ID doesn't match the correct position in the current solutions, sets `allCorrect` to false
3. It shows a result message:
   - If all characters are correct, shows a success message
   - If not, shows an error message

```javascript
// Reset the game (move all characters back to container)
function resetGame() {
    // Move all characters back to the container
    const container = document.getElementById("characters-container");
    const characterElements = document.querySelectorAll(".character");
    characterElements.forEach(function(character) {
        container.appendChild(character);
    });
    
    // Hide the message
    document.getElementById("message").style.display = "none";
}
```

The `resetGame` function resets the game:
1. It moves all characters back to the character container
2. It hides the message element

## Summary of Key JavaScript Concepts Used

1. **Event Handling**: The code uses various event listeners like "click", "dragstart", "dragover", "dragenter", "dragleave", and "drop" to handle user interactions.

2. **DOM Manipulation**: The code creates, modifies, and repositions DOM elements dynamically.

3. **Drag and Drop API**: The code implements the HTML5 Drag and Drop API to allow users to drag characters and drop them in different positions.

4. **Array Methods**: The code uses array methods like `forEach` to iterate over arrays.

5. **Object Manipulation**: The code uses objects to store and access data like hints and solutions.

6. **Conditional Logic**: The code uses conditional statements to check if placements are correct and to set up different puzzles.

7. **Element Selection**: The code uses methods like `getElementById` and `querySelectorAll` to select elements from the DOM.

8. **Event Prevention**: The code uses `event.preventDefault()` to prevent the default behavior of certain events, such as the browser's default drag behavior.

This game provides an interactive way for players to solve puzzles by placing characters in the correct positions based on textual hints, utilizing modern web technologies for a smooth and engaging experience.
# Character-Position-Game

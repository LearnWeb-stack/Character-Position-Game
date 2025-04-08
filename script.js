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

        // Character information (stays the same for all puzzles)
        const characters = [
            { id: "silver", name: "Silver Hedgehog", image: "images/silver-hedge-hog.webp" },
            { id: "bat", name: "Bat", image: "images/bat.png" },
            { id: "fox", name: "Fox", image: "images/fox.png" },
            { id: "cat", name: "Cat", image: "images/cat.png" },
            { id: "blue", name: "Blue Hedgehog", image: "images/blue-hedge-hog.webp" }
        ];

        // Variable to store which character is being dragged
        let draggedCharacter = null;
        
        // Current puzzle number (1, 2, or 3)
        let currentPuzzle = 1;
        
        // Current puzzle solutions
        let currentSolutions = puzzleSolutions[0];

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
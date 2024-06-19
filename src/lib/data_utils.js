export const classes = {
    "FA": "Flame Archer",
    "FK": "Flame Knight",
    "Gl": "Glider",
    "Ne": "Neptune",
    "Ni": "Ninja",
    "Sp": "Spy",
    "Sw": "Swift"
}

export const pointsDistribution = {
    1: 18,
    2: 12,
    3: 6,
    4: 3,
    5: 2
};

export function calculateTotalKills(data) {
    let totalKills = {};

    for (const gameKey in data) {
        const game = data[gameKey];
        for (const player in game.players) {
            if (!totalKills[player]) {
                totalKills[player] = 0;
            }
            for (const stat in game.players[player]) {
                totalKills[player] += game.players[player][stat];
            }
        }
    }

    const sortedKills = Object.entries(totalKills)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [player, kills]) => {
            acc[player] = kills;
            return acc;
        }, {});

    return sortedKills;
}

export function calculatePlayerPoints(data) {
    let playerScores = {};

    for (const gameKey in data) {
        const game = data[gameKey];
        let kills = {};

        // Sum up kills for each player in the game
        for (const player in game.players) {
            kills[player] = 0;
            for (const stat in game.players[player]) {
                kills[player] += game.players[player][stat];
            }
        }

        // Sort players based on kills
        let sortedPlayers = Object.entries(kills).sort(([, a], [, b]) => b - a);

        // Assign points based on ranking
        sortedPlayers.forEach(([player, _], index) => {
            let rank = index + 1;
            if (rank <= 4) {
                if (!playerScores[player]) {
                    playerScores[player] = 0;
                }
                if (pointsDistribution[rank] != undefined){
                  playerScores[player] += pointsDistribution[rank];
                } else {
                  playerScores[player] += 1
                }
                
            }
        });
    }

    // Sort playerScores by total points in descending order
    const sortedPlayerScores = Object.entries(playerScores)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [player, score]) => {
            acc[player] = score;
            return acc;
        }, {});

    return sortedPlayerScores;
}

export function unixTimestampToDateTime(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a new Date object
    const dateObject = new Date(milliseconds);

    // Extract date components
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = dateObject.getDate().toString().padStart(2, '0'); // Get day of the month and pad with leading zero if needed

    // Extract time components
    const hours = dateObject.getHours().toString().padStart(2, '0'); // Get hours (0-23) and pad with leading zero if needed
    const minutes = dateObject.getMinutes().toString().padStart(2, '0'); // Get minutes (0-59) and pad with leading zero if needed

    // Return formatted datetime string
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

export function convertVersionString(input) {
    let result = '';

    // Check for 'a' (Alpha) in the input string
    if (input.includes('a')) {
        result += 'α-';
    }

    // Parse the version number (e.g., "2.1")
    const versionNumber = input.replace(/^a-/, '').replace(/-dev$/, '');

    // Append the version number
    result += versionNumber;

    // Check for 'dev' (Development) in the input string
    if (input.includes('dev')) {
        result += ' (dev)';
    }

    return result;
}

// @ts-ignore
export function convertMatchString(input) {
    // Split the input string into parts using "-"
    const parts = input.split('-');

    // Extract season and match numbers
    const season = parts[0].toUpperCase().replace('s', 'S');
    const match = parts[1];

    // Construct the output string
    const result = `${season}, Match ${match}`;

    return result;
}

export function capitalizeAndRemoveUnderscores(input) {
    // Split the input string by underscores and capitalize each word
    const words = input.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the capitalized words with a space
    const result = words.join(' ');

    return result;
}

export function reorderPlayersBySum(players) {
    // Convert the players object to an array of [name, data] pairs
    let playersArray = Object.entries(players);

    // Calculate the sum of values for each player
    playersArray.forEach(player => {
        let sum = Object.values(player[1]).reduce((acc, val) => acc + val, 0);
        player.push(sum);  // Add the sum to the player's array entry
    });

    // Sort the array based on the sum
    // @ts-ignore
    playersArray.sort((a, b) => b[2] - a[2]);

    // Convert the array back to an object, without the sum
    let orderedPlayers = {};
    playersArray.forEach(player => {
        orderedPlayers[player[0]] = player[1];
    });

    return orderedPlayers;
}

export function getMostFrequentName(rounds) {
    // Create an object to store the count of each name
    let countMap = {};

    // Iterate over the rounds array and count occurrences
    rounds.forEach(name => {
        countMap[name] = (countMap[name] || 0) + 1;
    });

    // Determine the name with the highest count
    let mostFrequentName = null;
    let maxCount = 0;

    for (let name in countMap) {
        if (countMap[name] > maxCount) {
            maxCount = countMap[name];
            mostFrequentName = name;
        }
    }

    return mostFrequentName;
}

export function countKillsPerClass(data) {
    const killsPerClass = {};

    for (const matchId in data) {
        const matchDetails = data[matchId];
        const players = matchDetails.players;

        for (const playerId in players) {
            const playerStats = players[playerId];

            for (const classId in playerStats) {
                const kills = playerStats[classId];
                let className = classes[classId]

                if (killsPerClass[className]) {
                    killsPerClass[className] += kills;
                } else {
                    killsPerClass[className] = kills;
                }
            }
        }
    }

    // Create a sorted object
    const sortedKillsPerClass = {};
    Object.keys(killsPerClass).sort().forEach(classId => {
        sortedKillsPerClass[classId] = killsPerClass[classId];
    });

    return sortedKillsPerClass;
}

export function averageKillsPerClassPerMatch(data) {
    const killsPerClass = {};
    const matchesPerClass = {};

    for (const matchId in data) {
        const matchDetails = data[matchId];
        const players = matchDetails.players;

        for (const playerId in players) {
            const playerStats = players[playerId];

            for (const classId in playerStats) {
                const kills = playerStats[classId];
                let className = classes[classId]

                if (killsPerClass[className]) {
                    killsPerClass[className] += kills;
                    matchesPerClass[className] += 1;
                } else {
                    killsPerClass[className] = kills;
                    matchesPerClass[className] = 1;
                }
            }
        }
    }

    const averageKillsPerClass = {};
    for (const classId in killsPerClass) {
        averageKillsPerClass[classId] = killsPerClass[classId] / matchesPerClass[classId];
    }

    // Create a sorted object
    const sortedAverageKillsPerClass = {};
    Object.keys(averageKillsPerClass).sort().forEach(classId => {
        sortedAverageKillsPerClass[classId] = averageKillsPerClass[classId].toFixed(2);
    });

    return sortedAverageKillsPerClass;
}

export function countClassUsage(data) {
    const classUsageCount = {};

    for (const matchId in data) {
        const matchDetails = data[matchId];
        const players = matchDetails.players;

        for (const playerId in players) {
            const playerStats = players[playerId];

            for (const classId in playerStats) {
                let className = classes[classId]

                if (classUsageCount[className]) {
                    classUsageCount[className] += 1;
                } else {
                    classUsageCount[className] = 1;
                }
            }
        }
    }

    // Create a sorted object
    const sortedClassUsageCount = {};
    Object.keys(classUsageCount).sort().forEach(classId => {
        sortedClassUsageCount[classId] = classUsageCount[classId];
    });

    return sortedClassUsageCount;
}

export function averagePicksPerClassPerMatch(data) {
    const classPickCount = {};
    let totalMatches = 0;

    for (const matchId in data) {
        totalMatches++;
        const matchDetails = data[matchId];
        const players = matchDetails.players;

        for (const playerId in players) {
            const playerStats = players[playerId];

            for (const classId in playerStats) {
                if (classPickCount[classId]) {
                    classPickCount[classId] += 1;
                } else {
                    classPickCount[classId] = 1;
                }
            }
        }
    }

    const averagePicksPerClass = {};
    for (const classId in classPickCount) {
        averagePicksPerClass[classId] = (classPickCount[classId] / totalMatches).toFixed(2);
    }

    // Create a sorted object
    const sortedAveragePicksPerClass = {};
    Object.keys(averagePicksPerClass).sort().forEach(classId => {
        sortedAveragePicksPerClass[classId] = averagePicksPerClass[classId];
    });

    return sortedAveragePicksPerClass;
}

export function totalKillsPerMap(data) {
    const killsPerMap = {};

    for (const matchId in data) {
        const matchDetails = data[matchId];
        const map = capitalizeAndRemoveUnderscores(matchDetails.map); 
        const players = matchDetails.players;

        for (const playerId in players) {
            const playerStats = players[playerId];

            for (const classId in playerStats) {
                const kills = playerStats[classId];

                if (killsPerMap[map]) {
                    killsPerMap[map] += kills;
                } else {
                    killsPerMap[map] = kills;
                }
            }
        }
    }

    return killsPerMap;
}
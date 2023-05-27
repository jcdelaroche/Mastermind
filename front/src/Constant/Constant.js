export const GameState = {
    PLAYING: 'PLAYING',
    LOST: 'LOST',
    WON: 'WON',
};

export const URL = {
    DEFAULT_AVATAR: 'http://localhost:3001/assets/avatars/01.png',
    ROOT: 'http://localhost:3000',
    SOCKET: 'http://localhost:3001',
    LOBBY: `http://localhost:3000/game/lobby/`,
    GAME: `http://localhost:3000/game/room/`,
}

export const INTERNAL_URL = {
    ROOT: '/',
    LOBBY: `/game/lobby/`,
    GAME: `/game/room/`,
}

export const GAMEMODE = {
    CLASSIC: {
        name: 'Classic',
        description: 'The classic game mode',
    },
    VERSUS: {
        name: 'Versus',
        description: 'Jouer avec le même code. Le moins de tentatives l\'emporte',
    },
    CHRONO: {
        name: 'Chrono',
        description: 'Jouer avec le même code. Le plus rapide l\'emporte',
    }
}
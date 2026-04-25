const openingTrainingLines = {
   "italian_game": {
        "classical": [ 
            {w: "e4", b: "e5"}, 
            {w: "Nf3", b: "Nc6"}, 
            {w: "Bc4", b: "Bc5"},
            {w: "c3", b: "Nf6"},
            {w: "d4", b: "exd4"},
            {w: "cxd4", b: "Bb4+"} ],
        "evans_gambit": [ 
            {w: "e4", b: "e5"}, 
            {w: "Nf3", b: "Nc6"}, 
            {w: "Bc4", b: "Bc5"}, 
            {w: "b4", b: "Bxb4"},
            {w: "c3", b: "Ba5"},
            {w: "d4", b: "d6"} ]
    },
    "sicilian_defence": {
        "najdorf": [ 
            {w: "e4", b: "c5"}, 
            {w: "Nf3", b: "d6"}, 
            {w: "d4", b: "cxd4"}, 
            {w: "Nxd4", b: "Nf6"}, 
            {w: "Nc3", b: "a6"} ],
        "dragon": [ 
            {w: "e4", b: "c5"}, 
            {w: "Nf3", b: "d6"}, 
            {w: "d4", b: "cxd4"}, 
            {w: "Nxd4", b: "Nf6"}, 
            {w: "Nc3", b: "g6"} ]
    },
    "french_defence": {
        "classical": [
            {w: "e4", b: "e6"},
            {w: "d4", b: "d5"},
            {w: "Nc3", b: "Nf6"},
            {w: "Bg5", b: "Be7"},
            {w: "e5", b: "Nfd7"},
            {w: "Bxe7", b: "Qxe7"},
            {w: "f4", b: "O-O"} ]
    },
    "london_system": {
        "main_line": [
            {w: "d4", b: "Nf6"},
            {w: "Bf4", b: "d5"},
            {w: "e3", b: "c5"},
            {w: "c3", b: "Nc6"},
            {w: "Bd3", b: "e6"},
            {w: "Nf3", b: "Bd6"},
            {w: "Bg3", b: "O-O"},
            {w: "Nbd2", b: "Bxg3"},
            {w: "hxg3", b: "Qb6"}
        ],
        "kings_indian":[
            {w: "d4", b: "Nf6"},
            {w: "Bf4", b: "g6"},
            {w: "Nc3", b: "Bg7"},
            {w: "e4", b: "d6"},
            {w: "h4", b: "O-O"},
            {w: "h5", b: "Nxh5"},
            {w: "Rxh5", b: "gxh5"},
            {w: "Qxh5", b: "e5"},
            {w: "dxe5", b: "dxe5"},
            {w: "Rd1", b: "Nd7"},
            {w: "Bg5", b: "f6"},
            {w: "Bc4+", b: "Kh8"},
            {w: "Be3", b: "b6"}
        ]
    }
}
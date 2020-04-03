export default [
  {
    type: 'genre',
    genre: 'rock',
    answers: [
      {
        src: 'music/linkin_park-numb.mp3',
        genre: 'rock',
      },
      {
        src: 'music/madona-LaIslaBonita.mp3',
        genre: 'pop',
      },
      {
        src: 'music/louis_armstrong-whatawonderfulworld.mp3',
        genre: 'jazz',
      },
      {
        src: 'music/50_Cent-Candy_Shop.mp3',
        genre: 'rap',
      },
    ],
  }, {
    type: 'artist',
    song: {
      artist: '50 cent',
      src: 'music/50_Cent-Candy_Shop.mp3',
    },
    answers: [
      {
        picture: 'music/Linkin park.jpg',
        artist: 'Linkin Park',
      },
      {
        picture: 'music/50-cent.jpg',
        artist: '50 cent',
      },
      {
        picture: 'music/Madonna.jpg',
        artist: 'Madonna',
      },
    ],
  },
];

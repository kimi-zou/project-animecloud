'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tracks', [
        {
          title: "The View From the Summit",
          description: "Haikyuu! Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/1-c.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/1-The+View+From+the+Summit.m4a",
          userId: 2,
        },
        {
          title: "Grief And Sorrow",
          description: "Naruto Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/3-c1.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/3-Grief+And+Sorrow.m4a",
          userId: 4,
        },
        {
          title: "Main Theme",
          description: "Naruto Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/3-c2.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/3-Naruto+Main+Theme.m4a",
          userId: 4,
        },
        {
          title: "Sakuras Theme",
          description: "Naruto Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/3-c3.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/3-Sakuras+Theme.m4a",
          userId: 4,
        },
        {
          title: "The Raising Fighting Spirit",
          description: "Naruto Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/3-c4.jpeg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/3-The+Raising+Fighting+Spirit.m4a",
          userId: 4,
        },
        {
          title: "Ultimate Secrets",
          description: "Naruto Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/3-c5.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/3-Ultimate+Secrets+.m4a",
          userId: 4,
        },
        {
          title: "A Haunted House",
          description: "Totoro Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/5-c1.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/5-A+Haunted+House.m4a",
          userId: 6,
        },
        {
          title: "Mei is Missing",
          description: "Totoro Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/5-c2.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/5-Mei+is+Missing.m4a",
          userId: 6,
        },
        {
          title: "Path of the Wind",
          description: "Totoro Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/5-c3.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/5-Path+of+the+Wind.m4a",
          userId: 6,
        },
        {
          title: "Tonari no Totoro",
          description: "Totoro Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/5-c4.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/5-Tonari+no+Totoro.m4a",
          userId: 6,
        },
        {
          title: "A Reliable Friend!",
          description: "One Piece Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/8-c1.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/8-A+Reliable+Friend!.m4a",
          userId: 9,
        },
        {
          title: "Gold And Oden",
          description: "One Piece Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/8-c2.jpeg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/8-Gold+And+Oden.m4a",
          userId: 9,
        },
        {
          title: "Shizuka Na Ikari",
          description: "One Piece Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/8-c3.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/8-Shizuka+Na+Ikari.m4a",
          userId: 9,
        },
        {
          title: "Let the stars fall down",
          description: "Fate/Zero Soundtrack",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/9-c1.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/9-Let+the+stars+fall+down.m4a",
          userId: 10,
        },
        {
          title: "Let the stars fall down",
          description: "Point Zero",
          coverImg: "https://animecloud.s3.amazonaws.com/mock-data/mock-covers/9-c2.jpg",
          trackPath: "https://animecloud.s3.amazonaws.com/mock-data/mock-tracks/9-Point+Zero.m4a",
          userId: 10,
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tracks', null, {});
  }
};

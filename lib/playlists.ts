export type Playlist = {
  title: string;
  description?: string;
  /** The playlist/album/track ID from its Spotify URL, e.g. open.spotify.com/playlist/{id} */
  spotifyId: string;
};

// Swap these IDs for your own playlists. Grab the ID from the Spotify share
// link: open.spotify.com/playlist/<this-part>?si=...
export const playlists: Playlist[] = [
  {
    title: "Beats to trigger flow state",
    description:
      "I put this on, every time I sit down to code, I'm like pavalov's dog hearing the bell ring.",
    spotifyId: "7dup7DQ0Oz1w6jy3IHGHKM",
  },
  {
    title: "When you start to slip redistrubute your weight",
    description:
      "Shower anthems, get you up and moving in the morning, definitely didn't come up with the name it after eating shit while dancing in the shower.",
    spotifyId: "4HX5N8xHYnPAm3YmYIMl46",
  },
  {
    title: "It has yet to be proven that intelligence has any survival value",
    description:
      "My favourite Arthur C. Clarke quote, if I were ever to reach escape velocity from our fair planet, this playlist would be banging in the background.",
    spotifyId: "1dG0JkzR2aCN5wtxep8M8P",
  },
  {
    title: "by a sleep to say we end the heartache",
    description:
      "The only quote I remember from secondary school english, this playlist is for when melancholy hits, and I need to be reminded that this too shall pass.",
    spotifyId: "5Ng0sK5kk8lmuXdTy6XgkV",
  },
  {
    title: "Indie head nodders",
    description:
      "Growing up I only listened to indie music and alt rock, after pumping all the tunes into spotify, this playlist is a collection of the songs the algorithm suggested. The only gate keeping is that you have to find yourself nodding along.",
    spotifyId: "0prPG7Pj4dCo3vopuAAebU",
  },
  {
    title: "The auld dog for the high road and the pup for the borine",
    description:
      "A favourate saying of my dad's, basically let the lads with experience take on the hard stuff, and let the young ones learn from it. This playlist is some of my favourate Irish tunes that capture that feeling.",
    spotifyId: "26tbFE9mEUf7CZY9teiJ87",
  },
  {
    title: "Rickty Rockity I'm coming for that banger",
    description: "This's nothing too high brow about this one, just pure bangers.",
    spotifyId: "0YpzENV0ctmbRKdy6zNPwZ",
  },
];

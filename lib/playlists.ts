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
    title: "Deep Focus",
    description: "For heads-down coding sessions.",
    spotifyId: "37i9dQZF1DWZeKCadgRdKQ",
  },
  {
    title: "Late Night Debugging",
    description: "Slower, quieter — for the 11pm bug hunts.",
    spotifyId: "37i9dQZF1DX4sWSpwq3LiO",
  },
  {
    title: "Weekend Shipping",
    description: "Higher energy, for weekend side-project sprints.",
    spotifyId: "37i9dQZF1DXcBWIGoYBM5M",
  },
];

import type { Metadata } from "next";
import { playlists } from "@/lib/playlists";
import { PlaylistEmbed } from "@/components/PlaylistEmbed";

export const metadata: Metadata = {
  title: "Playlists",
  description: "Playlists I keep on repeat while working.",
};

export default function PlaylistsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Playlists
        </h1>
        <p className="text-zinc-400">
          What I&apos;m listening to while I work — mostly instrumental, occasionally
          not.
        </p>
      </div>
      <div className="space-y-6">
        {playlists.map((playlist) => (
          <PlaylistEmbed key={playlist.spotifyId} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}

import type { Playlist } from "@/lib/playlists";

export function PlaylistEmbed({ playlist }: { playlist: Playlist }) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="p-5 pb-3">
        <h3 className="font-medium text-zinc-100">{playlist.title}</h3>
        {playlist.description && (
          <p className="mt-1 text-sm text-zinc-400">{playlist.description}</p>
        )}
      </div>
      <div className="px-2 pb-2">
        <iframe
          title={playlist.title}
          src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}?utm_source=generator&theme=0`}
          className="w-full rounded-lg"
          height={352}
          style={{ border: 0 }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
}

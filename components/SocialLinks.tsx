import { siteConfig } from "@/lib/site-config";
import { icons } from "@/components/icons";

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {siteConfig.social.map((link) => {
        const Icon = icons[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            aria-label={link.label}
            className="text-zinc-500 transition-colors hover:text-zinc-100"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
}

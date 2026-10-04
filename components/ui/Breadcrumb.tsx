import Link from "next/link";

export type Crumb = { label: string; href?: string };

/** "HOME / PAGE NAME": small uppercase trail above the page title. */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.72rem] font-semibold tracking-[0.16em] uppercase text-foreground/70">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2.5">
              {item.href && !last ? (
                <Link href={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-accent" : ""}>
                  {item.label}
                </span>
              )}
              {!last ? <span aria-hidden="true" className="text-foreground/40">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import styles from "./AppCard.module.css";

interface AppCardProps {
  icon: ReactNode;
  name: string;
  description: string;
  url: string;
}

export default function AppCard({ icon, name, description, url }: AppCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      title={`Buka ${name}`}
    >
      <div className={styles.topRow}>
        <div className={styles.iconWrapper}>{icon}</div>
        <div className={styles.badgeWrapper}>
          <ExternalLink
            className={styles.externalIcon}
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </a>
  );
}

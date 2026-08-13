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
    >
      <div className={styles.topRow}>
        <div className={styles.iconWrapper}>{icon}</div>
        <ExternalLink
          className={styles.externalIcon}
          size={18}
          strokeWidth={1.75}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </a>
  );
}

import Navbar from "@/components/Navbar";
import AppCard from "@/components/AppCard";
import { Users, Package, Globe, Utensils, Star, Sparkles } from "lucide-react";
import styles from "./page.module.css";

const APPS = [
  {
    id: "dcng",
    icon: <Users size={22} strokeWidth={1.75} />,
    name: "Data Customer Nasi Gerilya (DCNG)",
    description: "Database dan manajemen data informasi pelanggan Nasi Gerilya.",
    url: process.env.NEXT_PUBLIC_URL_DCNG || "#",
  },
  {
    id: "md-manager",
    icon: <Package size={22} strokeWidth={1.75} />,
    name: "Nasi Gerilya MD Manager",
    description: "Sistem manajemen merchandising, persediaan, dan operasional MD.",
    url: process.env.NEXT_PUBLIC_URL_MD_MANAGER || "#",
  },
  {
    id: "menu-online",
    icon: <Globe size={22} strokeWidth={1.75} />,
    name: "Menu Digital Online",
    description: "Katalog menu digital dan pemesanan online pelanggan.",
    url: process.env.NEXT_PUBLIC_URL_MENU_ONLINE || "#",
  },
  {
    id: "menu-dinein",
    icon: <Utensils size={22} strokeWidth={1.75} />,
    name: "Menu Digital Dine in",
    description: "Katalog menu digital untuk pemesanan makan di tempat (Dine In).",
    url: process.env.NEXT_PUBLIC_URL_MENU_DINEIN || "#",
  },
  {
    id: "review-rating",
    icon: <Star size={22} strokeWidth={1.75} />,
    name: "Form Review & Rating Pelanggan",
    description: "Formulir ulasan, masukan, dan penilaian kepuasan pelanggan.",
    url: process.env.NEXT_PUBLIC_URL_REVIEW_RATING || "#",
  },
];

export default function DashboardPage() {
  return (
    <div className={styles.mainContainer}>
      <Navbar />

      <main className={styles.contentWrapper}>
        <div className={styles.heroHeader}>
          <div className={styles.greetingRow}>
            <Sparkles size={20} strokeWidth={1.75} className={styles.heroIcon} />
            <h1 className={styles.greeting}>Selamat datang</h1>
          </div>
          <p className={styles.subtitle}>Pilih aplikasi yang ingin dibuka</p>
        </div>

        <div className={styles.grid}>
          {APPS.map((app) => (
            <AppCard
              key={app.id}
              icon={app.icon}
              name={app.name}
              description={app.description}
              url={app.url}
            />
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        &copy; 2026 Portal NG. All rights reserved.
      </footer>
    </div>
  );
}

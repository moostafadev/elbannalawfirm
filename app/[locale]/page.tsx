import Header from "@/components/Header";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />
      <div>
        <h1>{t("title")}</h1>
        <p>{t("about")}</p>
      </div>
    </>
  );
}

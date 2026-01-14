import { useQuery } from "@tanstack/react-query";
import { fetchUrls } from "../../api/urls";
import type { Url } from "../../types/url";
import { Link } from "../ui/Link";
import "./LinkList.css";

export function LinkList() {
  const {
    data: urls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["urls"],
    queryFn: fetchUrls,
    refetchInterval: 5000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Erreur de chargement</div>;

  if (!urls?.length) {
    return (
      <div className="link_list_container">
        <div className="link_list_empty">Vous n'avez aucun lien créé</div>
      </div>
    );
  }

  return (
    <div className="link_list_container">
      <div className="link_list_header">
        <span>Liens créés</span>
        <span>Liens d'origines</span>
        <span />
        <span />
      </div>

      <div className="link_list">
        {urls.map((item: Url) => {
          const shortUrl = `http://localhost:3001/${item.shortCode}`;

          return (
            <div className="link_list_row" key={item.id}>
              <div className="link_col shortened">
                <Link href={shortUrl}>{shortUrl}</Link>
              </div>
              <div className="link_col original">{item.originalUrl}</div>
              <div className="link_col click_count">
                {item.clickCount} clic(s)
              </div>
              <div className="link_col copy">
                <button
                  className="copy_button"
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl);
                    alert("Lien copié !");
                  }}
                >
                  Copier
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

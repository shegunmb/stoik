import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../../../api/urls";
import hero from "../../../assets/hero.webp";
import "./ShortUrlForm.css";

export function ShortUrlForm() {
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createShortUrl,
    onSuccess: () => {
      setUrl("");
      queryClient.invalidateQueries({ queryKey: ["urls"] });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url) return;
    mutation.mutate(url);
  }

  return (
    <div className="short_url_form">
      <div className="catch_section">
        <div className="catch_phrase">
          <h1>
            Transformez vos <span>liens</span> en outils de performance
          </h1>
          <p>
            Raccourcissement intelligent, tracking en temps réel,
            personnalisation et sécurité, sans compromis.
          </p>
        </div>
        <img src={hero} className="hero_img" alt="statistics" />
      </div>

      <form className="form_wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://www.exemple.com/long-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">
          {mutation.isPending ? "Raccourcissement..." : "Raccourcir"}
        </button>
      </form>
    </div>
  );
}

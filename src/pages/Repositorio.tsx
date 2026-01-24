import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { repositories as localRepositories } from "../data/repositories";
import type { Repository } from "../data/repositories";
import ReactMarkdown from 'react-markdown';
import { FaGithub } from "react-icons/fa";
// @ts-expect-error missing types
import { fetchUserRepositories, fetchRepoReadme } from "../utils/index";
import "./Repositorio.css";

export function Repositorio() {
  const { repoName } = useParams<{ repoName: string }>();
  const navigate = useNavigate();

  const local = localRepositories.find(
    (r) => r.name.toLowerCase().replace(/\s+/g, "-") === repoName
  );

  const [repo, setRepo] = useState<Repository | null | undefined>(
    local ?? undefined
  );
  const [loading, setLoading] = useState<boolean>(!local);
  const [readme, setReadme] = useState<string>(""); 
  const [loadingReadme, setLoadingReadme] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (repo !== undefined) return; 
    const user = import.meta.env.VITE_GITHUB_USER || "GuiLenoir";
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    fetchUserRepositories(user, token)
      .then((list: Repository[]) => {
        const found = list.find(
          (r: Repository) =>
            r.name.toLowerCase().replace(/\s+/g, "-") === repoName
        );
        setRepo(found ?? null);
      })
      .catch(() => setRepo(null))
      .finally(() => setLoading(false));
  }, [repoName, repo]);

  useEffect(() => {
  if (!repo) return;

  const user = import.meta.env.VITE_GITHUB_USER || 'GuiLenoir';
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const loadReadme = async () => {
    setLoadingReadme(true);
    try {
      const text = await fetchRepoReadme(user, repo.name, token);
      setReadme(text);
    } catch {
      setReadme("");
    } finally {
      setLoadingReadme(false);
    }
  };

  loadReadme();
}, [repo]);


  if (loading) {
    return (
      <div className="repositorio-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Voltar
        </button>
        <p>Loading...</p>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="repositorio-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Voltar
        </button>
        <p>Repositório não encontrado</p>
      </div>
    );
  }

  return (
    <div className="repositorio-container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Voltar
      </button>

      <div className="repo-detail">
        <div className="repo-header">
          <h1>{repo.name}</h1>
          <p className="repo-language">Language: {repo.language}</p>
        </div>

        <div className="repo-description">
          <h2>Descrição</h2>
          <p>{repo.description}</p>
        </div>

        <div className="repo-readme">
          {loadingReadme ? (
            <p>Carregando README...</p>
          ) : (
            <ReactMarkdown>{readme}</ReactMarkdown>
          )}
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="repo-topics">
            <h2>Tópicos</h2>
            <div className="topics-list">
              {repo.topics.map((topic) => (
                <span key={topic} className="topic-tag">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="repo-info">
          <p className="repo-stars">
            <b>⭐ {repo.stars}</b>
          </p>
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <FaGithub style={{ marginRight: "6px" }} />
            GitHub →</a>
        </div>
      </div>
    </div>
  );
}

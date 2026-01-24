import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { RepositoryCard } from '../components/RepositoryCard';
import { repositories as localRepositories } from '../data/repositories';
import type { Repository } from '../data/repositories';
// @ts-expect-error missing types

import { fetchUserRepositories } from '../utils/index';
import './Home.css';

const INITIAL_COUNT = 6; const INCREMENT = 6;

export function Home() {
  const [repos, setRepos] = useState<Repository[]>(localRepositories);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_COUNT); 
 const [lastStartIndex, setLastStartIndex] = useState<number>(0); 

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const user = import.meta.env.VITE_GITHUB_USER || 'GuiLenoir';
    


    fetchUserRepositories(user, token).then((data: Repository[] | null) => {
      if (data && data.length > 0) {
        setRepos(data as Repository[]);
        setLastStartIndex(0); 
      }
    });
  }, []);

  const handleShowMore = () => {
    setLastStartIndex(visibleCount); 
    setVisibleCount((prev) => prev + INCREMENT);
  };

  return (
  <div className="home">
    <Header />
    <section className="repositories">
      <h2>Projetos</h2>
      <div className="repositories-grid">
        {repos.slice(0, visibleCount).map((repo, index) => {
          const isNew = index >= lastStartIndex;
          const order = index - lastStartIndex; 

          return (
            <div
              key={repo.name}
              className={`repo-card-wrapper ${isNew ? 'enter' : ''}`}
              style={
                isNew
                  ? { animationDelay: `${Math.max(order, 0) * 80}ms` }
                  : undefined
              }
            >
              <RepositoryCard
                name={repo.name}
                description={repo.description}
                language={repo.language}
                stars={repo.stars}
                topics={repo.topics}
              />
            </div>
          );
        })}
      </div>

      {visibleCount < repos.length && (
        <button className="show-more" onClick={handleShowMore}>
          Mostrar mais
        </button>
      )}
    </section>
  </div>
);
}

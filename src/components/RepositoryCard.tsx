import { useNavigate } from 'react-router-dom';

interface RepositoryCardProps {
  name: string;
  description: string;
  language: string;
  stars?: number;
  topics?: string[];
}

export function RepositoryCard({
  name,
  description,
  language,
  stars = 0,
  topics = [],
}: RepositoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    const repoPath = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/repositorio/${repoPath}`);
  };

  return (
    <button className="repo-card" onClick={handleClick}>
      <div className="card-header">
        <h3>{name}</h3>
        <span className="stars">⭐ {stars}</span>
      </div>
      
      <p className="description">{description}</p>
      
      <div className="card-footer">
        <span className="language">{language}</span>
        {topics.length > 0 && (
          <div className="topics">
            {topics.map((topic) => (
              <span key={topic} className="topic">
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}

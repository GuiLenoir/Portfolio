const CACHE_TTL = 10 * 60 * 1000; // minutos pra cache
const cache = new Map(); 
const readmeCache = new Map(); 

// Lista de repositórios a ignorar
const REPO_BLACKLIST = [
  "paolalenoir-website"
];

/**
 * Clear cache para repositórios
 * @param {string} [user]
 */
export function clearRepoCache(user) {
  if (user) cache.delete(user);
  else cache.clear();
}

/**
 * Clear cache de README
 * @param {string} [repoName]
 */
export function clearReadmeCache(repoName) {
  if (repoName) readmeCache.delete(repoName);
  else readmeCache.clear();
}


function decodeBase64Utf8(base64) {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}


export async function fetchRepoReadme(user, repoName, token) {
  const now = Date.now();
  const cached = readmeCache.get(repoName);

  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data; 
  }

  const headers = {
    Accept: "application/vnd.github+json",
  };
  if (token) headers.Authorization = `token ${token}`;

  const response = await fetch(
    `https://api.github.com/repos/${user}/${repoName}/readme`,
    { headers }
  );

  if (!response.ok) {
    return "README não encontrado";
  }

  const data = await response.json();
  const decoded = decodeBase64Utf8(data.content);

  readmeCache.set(repoName, { ts: Date.now(), data: decoded });

  return decoded;
}


export async function fetchUserRepositories(user, token) {
  if (!user) {
    return [];
  }

  const now = Date.now();
  const cached = cache.get(user);
  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  try {
    const headers = {
      Accept: "application/vnd.github+json",
    };
    if (token) headers.Authorization = `token ${token}`;

    const response = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    const filtered = repos.filter(
      (repo) => !REPO_BLACKLIST.includes(repo.name)
    );

    const mapped = filtered.map((repo) => ({
      name: repo.name,
      description: repo.description || "",
      url: repo.html_url,
      language: repo.language || "",
      stars: repo.stargazers_count || 0,
      topics: repo.topics || [],
    }));

    cache.set(user, { ts: Date.now(), data: mapped });

    return mapped;
  } catch (error) {
    console.error("Failed to fetch repositories from GitHub:", error);
    return [];
  }
}

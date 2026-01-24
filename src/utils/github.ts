export interface GitHubRepoInfo {
  stargazers_count?: number;
  topics?: string[];
  language?: string;
}

function parseOwnerRepo(url: string) {
  try {
    const u = new URL(url);
    const parts = u.pathname.replace(/(^\/+|\/+$)/g, '').split('/');
    if (parts.length >= 2) {
      return { owner: parts[0], repo: parts[1] };
    }
  } catch {
    const m = url.match(/github\.com\/(.+?)\/(.+?)(?:$|\/)/i);
    if (m) return { owner: m[1], repo: m[2] };
  }
  return null;
}

export async function fetchRepoInfo(repoUrl: string): Promise<GitHubRepoInfo | null> {
  const parsed = parseOwnerRepo(repoUrl);
  if (!parsed) {
    console.log('Failed to parse repo from URL:', repoUrl);
    return null;
  }

  const token = (import.meta.env.VITE_GITHUB_TOKEN as string) || '';
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.mercy-preview+json',
  };
  if (token) headers.Authorization = `token ${token}`;

  try {
    const apiUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
    console.log('Fetching from:', apiUrl);
    const res = await fetch(apiUrl, { headers });
    if (!res.ok) {
      return null;
    }
    const data = await res.json();
    return {
      stargazers_count: data.stargazers_count,
      topics: data.topics || [],
      language: data.language || undefined,
    } as GitHubRepoInfo;
  } catch (_e) {
    console.error('Error fetching repo info:', _e);
    return null;
  }
}
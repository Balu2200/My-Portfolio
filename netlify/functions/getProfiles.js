// Netlify Function: getProfiles
// Fetch basic stats from LeetCode and CodeChef. This uses public pages/APIs where possible.
// Note: Some platforms rate limit or block CORS; for production, consider authenticated APIs or scraping with care.

export async function handler() {
  const usernameLeetCode = "BALU_PASUMARTHI3"; // Update if needed
  const usernameCodeChef = "balu_47"; // Update if needed

  async function fetchLeetCode() {
    try {
      // Unofficial LeetCode GraphQL endpoint
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query getUserProfile($username: String!) {
            matchedUser(username: $username) {
              username
              submitStatsGlobal {
                acSubmissionNum { difficulty count }
              }
              profile { ranking }
            }
          }`,
          variables: { username: usernameLeetCode },
        }),
      });
      if (!res.ok) throw new Error("LeetCode fetch failed");
      const data = await res.json();
      const matched = data?.data?.matchedUser;
      const totalSolved =
        matched?.submitStatsGlobal?.acSubmissionNum?.find?.(
          (x) => x.difficulty === "All"
        )?.count || null;
      const ranking = matched?.profile?.ranking ?? null;
      return { solved: totalSolved, ranking };
    } catch {
      // ignore errors and fall back
      return { solved: null, ranking: null, error: "leetcode_error" };
    }
  }

  async function fetchCodeChef() {
    try {
      // CodeChef v1 API requires OAuth; as a fallback, attempt public page scrape lite

      const res = await fetch(
        `https://codechef.com/users/${usernameCodeChef}`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
        }
      );
      if (!res.ok) throw new Error("CodeChef fetch failed");
      const html = await res.text();
      // Very loose extraction; this can break if CodeChef changes markup.
      const ratingMatch =
        html.match(/rating:\s*(\d+)/i) || html.match(/"rating"\s*:\s*(\d+)/i);
      const maxMatch =
        html.match(/highest rating\s*:?\s*(\d+)/i) ||
        html.match(/"highest_rating"\s*:\s*(\d+)/i);
      const rating = ratingMatch ? ratingMatch[1] : null;
      const maxRating = maxMatch ? maxMatch[1] : null;
      return { rating, maxRating };
    } catch {
      // ignore errors and fall back
      return { rating: null, maxRating: null, error: "codechef_error" };
    }
  }

  const [leetcode, codechef] = await Promise.all([
    fetchLeetCode(),
    fetchCodeChef(),
  ]);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ leetcode, codechef }),
  };
}

const REPO = "NutterButterInAA/Vuttara";
const RELEASES_URL = `https://github.com/${REPO}/releases`;
const FALLBACK_VERSION = "3.2.32";

function versionNumber(tag = "") {
  return String(tag).replace(/^v/i, "").trim();
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function selectWindowsInstaller(assets = []) {
  return (
    assets.find(
      (asset) => asset.name === "Vuttara-Setup.exe"
    ) ||
    assets.find(
      (asset) =>
        /vuttara/i.test(asset.name) &&
        /setup/i.test(asset.name) &&
        /\.exe$/i.test(asset.name)
    ) ||
    assets.find(
      (asset) =>
        /setup/i.test(asset.name) &&
        /\.exe$/i.test(asset.name)
    ) ||
    assets.find((asset) => /\.exe$/i.test(asset.name))
  );
}

function applyReleaseFallback() {
  setText("[data-version]", FALLBACK_VERSION);
  setText("[data-release-name]", `Vuttara ${FALLBACK_VERSION}`);
  setText(
    "[data-release-notes]",
    "Release details are temporarily unavailable. Open GitHub Releases for the current installer and release notes."
  );

  document.querySelectorAll("[data-download-link]").forEach((element) => {
    element.href = RELEASES_URL;
    element.textContent = `Download Vuttara ${FALLBACK_VERSION}`;
  });
}

async function requestGitHubJson(path) {
  const response = await fetch(
    `https://api.github.com/repos/${REPO}${path}`,
    {
      headers: {
        Accept: "application/vnd.github+json"
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub returned HTTP ${response.status}`
    );
  }

  return response.json();
}

async function loadLatestRelease() {
  const hasReleaseElements = document.querySelector(
    [
      "[data-version]",
      "[data-release-name]",
      "[data-release-notes]",
      "[data-download-link]"
    ].join(",")
  );

  if (!hasReleaseElements) {
    return;
  }

  applyReleaseFallback();

  try {
    const release = await requestGitHubJson("/releases/latest");
    const version =
      versionNumber(release.tag_name) || FALLBACK_VERSION;
    const installer = selectWindowsInstaller(
      Array.isArray(release.assets) ? release.assets : []
    );

    setText("[data-version]", version);
    setText(
      "[data-release-name]",
      release.name || `Vuttara ${version}`
    );
    setText(
      "[data-release-notes]",
      release.body || "No release notes were provided."
    );

    document.querySelectorAll("[data-download-link]").forEach((element) => {
      if (installer?.browser_download_url) {
        element.href = installer.browser_download_url;
        element.textContent = `Download Vuttara ${version}`;
      } else {
        element.href = release.html_url || RELEASES_URL;
        element.textContent = "View GitHub release";
      }
    });
  } catch (error) {
    console.error("Unable to load the latest Vuttara release:", error);
  }
}

async function loadReleases() {
  const list = document.querySelector("[data-release-list]");

  if (!list) {
    return;
  }

  try {
    const releases = await requestGitHubJson("/releases");

    if (!Array.isArray(releases) || releases.length === 0) {
      list.innerHTML =
        '<div class="release-item">No public releases yet.</div>';
      return;
    }

    list.innerHTML = releases
      .slice(0, 12)
      .map((release) => {
        const title = release.name || release.tag_name;
        const releaseType = release.prerelease ? " Â· Beta" : "";
        const notes =
          release.body || "No release notes provided.";

        return `
          <article class="release-item">
            <header>
              <div>
                <strong>${escapeHtml(title)}</strong>
                <div class="muted">
                  ${escapeHtml(release.tag_name)}${releaseType}
                </div>
              </div>
              <a
                class="button"
                href="${escapeHtml(release.html_url)}"
                rel="noopener noreferrer"
                target="_blank"
              >
                View release
              </a>
            </header>
            <pre>${escapeHtml(notes)}</pre>
          </article>
        `;
      })
      .join("");
  } catch (error) {
    console.error("Unable to load Vuttara release history:", error);

    list.innerHTML =
      '<div class="release-item">Release history is temporarily unavailable.</div>';
  }
}

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]
  );
}

void loadLatestRelease();
void loadReleases();


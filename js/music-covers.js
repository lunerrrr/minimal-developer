(() => {
  const entries = document.querySelectorAll('.song-entry[data-cover-query]');
  if (!entries.length) {
    return;
  }

  const transparentPixel = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  const fetchCover = async (query) => {
    const endpoint = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=1`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const response = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }
      const payload = await response.json();
      if (!payload.results || !payload.results.length) {
        return null;
      }
      const artwork = payload.results[0].artworkUrl100;
      if (!artwork) {
        return null;
      }
      return artwork.replace('100x100bb', '300x300bb');
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name !== 'AbortError') {
        console.warn('Album art lookup failed:', error);
      }
      return null;
    }
  };

  entries.forEach((entry) => {
    const img = entry.querySelector('.song-cover-img[data-cover-pending]');
    if (!img) {
      return;
    }

    const query = entry.getAttribute('data-cover-query');
    if (!query) {
      img.removeAttribute('data-cover-pending');
      img.classList.add('song-cover-missing');
      return;
    }

    fetchCover(query).then((coverUrl) => {
      if (coverUrl) {
        img.src = coverUrl;
      } else if (!img.src || img.src === transparentPixel) {
        img.classList.add('song-cover-missing');
      }
      img.removeAttribute('data-cover-pending');
    });
  });
})();

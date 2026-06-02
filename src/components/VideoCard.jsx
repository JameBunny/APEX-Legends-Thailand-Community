import React from 'react';

export default function VideoCard({ video }) {
  // ดึง ID จากวิดีโอ YouTube URL เพื่อทำ Embed Link
  const getEmbedUrl = (url) => {
    try {
      const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\/\\/|embed\\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    } catch (e) {
      return null;
    }
  };

  const embedUrl = getEmbedUrl(video.youtubeUrl);

  return (
    <div style={{ backgroundColor: 'var(--apex-card-bg)', border: '1px solid #232529', overflow: 'hidden' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
        {embedUrl ? (
          <iframe 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            src={embedUrl}
            title={video.titleTh}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
            Invalid Video Link
          </div>
        )}
      </div>
      <div style={{ padding: '15px' }}>
        <h4 style={{ fontSize: '1rem', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {video.titleTh}
        </h4>
      </div>
    </div>
  );
}

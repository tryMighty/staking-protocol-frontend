/**
 * Full-viewport looping video background.
 * The video is served from /public and referenced as a root-relative path.
 * The gradient overlay is tuned to the video's neon green palette:
 *   - deep black at edges  (absorbs the dark corners of the video)
 *   - very dark forest green mid-tone  (preserves the green ambient glow)
 */
export default function VideoBackground({ 
  onLoaded, 
  onProgress 
}: { 
  onLoaded?: () => void,
  onProgress?: (percent: number) => void
}) {
  const handleProgress = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    if (video.duration > 0 && video.buffered && video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      const percent = (bufferedEnd / video.duration) * 100;
      onProgress?.(percent);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: -1 }}>
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/background-video1.mp4"
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={onLoaded}
        onProgress={handleProgress}
      />
      {/* Dark overlay to increase UI contrast */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Tech grid with pulse effect */}
      <div className="absolute inset-0 tech-grid opacity-30">
        <div className="scanner-line" />
      </div>
    </div>
  )
}

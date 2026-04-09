/**
 * Full-viewport looping video background.
 * The video is served from /public and referenced as a root-relative path.
 * The gradient overlay is tuned to the video's neon green palette:
 *   - deep black at edges  (absorbs the dark corners of the video)
 *   - very dark forest green mid-tone  (preserves the green ambient glow)
 */
export default function VideoBackground({ onLoaded }: { onLoaded?: () => void }) {
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

export default function EnhancedBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Enhanced background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-primary/10 pointer-events-none" />

      {/* Radial glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 via-accent/10 to-transparent blur-3xl pointer-events-none" />

      {/* Additional atmospheric effects */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  )
}

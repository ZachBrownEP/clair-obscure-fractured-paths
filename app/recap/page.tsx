import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import EnhancedBackground from '@/components/enhanced-background'

export default function RecapPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <EnhancedBackground />
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <div className="glass rounded-3xl p-8 md:p-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
            The Story So Far
          </h1>
          <p className="text-xl text-accent font-light mb-8">
            A Recap of Clair Obscur: Expedition 33
          </p>

          <div className="space-y-8 text-foreground/90 leading-relaxed">
            {/* The World */}
            <section>
              <h2 className="text-2xl font-light text-primary mb-4">The World of Clair Obscur</h2>
              <p className="mb-4">
                The world exists under the shadow of the <strong className="text-primary">Monolith</strong>, an ancient structure that appears once each year to paint a cursed number upon its surface. Those who reach that age are consumed by the Monolith, their bodies transforming into painted statues, frozen forever in the moment of their taking.
              </p>
              <p className="mb-4">
                Year after year, the number decreases. What began as a distant threat has become an imminent catastrophe. This year, the Monolith painted the number <strong>33</strong>.
              </p>
              <p>
                The people of this world have adapted to live in the shadows—both literal and metaphorical. Belle Époque-inspired cities stand alongside shadowed wilderness, where humanity clings to what light remains before the next Marking.
              </p>
            </section>

            {/* The Expedition */}
            <section>
              <h2 className="text-2xl font-light text-primary mb-4">Expedition 33</h2>
              <p className="mb-4">
                Led by the brave and determined <strong>Gustave</strong>, Expedition 33 is humanity's desperate attempt to end the curse once and for all. A diverse group of warriors, scholars, and seekers joined forces to reach the Monolith and destroy it before it could claim another generation.
              </p>
              <p className="mb-4">
                The expedition faced impossible odds: painted creatures that guard the Monolith's approach, fractured realities that bend the laws of physics, and the psychological toll of knowing they might not return. Each member carried their own reasons for joining—some sought vengeance, others redemption, and many simply hoped to save those they loved.
              </p>
              <p>
                Through real-time turn-based combat and exploration, the expedition fought through Belle Époque-inspired landscapes painted in shadow and light, uncovering the truth about the Monolith's origins and the ancient civilization that created it.
              </p>
            </section>

            {/* The Painter and the Writer */}
            <section>
              <h2 className="text-2xl font-light text-accent mb-4">The Painter and The Writer</h2>
              <p className="mb-4">
                At the heart of the world's fractured state lies an ancient conflict between two cosmic forces:
              </p>
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h3 className="text-lg font-light text-primary mb-2">The Painter</h3>
                  <p className="text-sm text-muted-foreground">
                    Represents creation through art, emotion, and subjective reality. The Painter believes in the beauty of imperfection and the power of individual expression. Their philosophy values artistic truth over objective fact.
                  </p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                  <h3 className="text-lg font-light text-accent mb-2">The Writer</h3>
                  <p className="text-sm text-muted-foreground">
                    Embodies structure, language, and narrative truth. The Writer seeks to document and preserve reality through words and logic. Their philosophy values recorded history and the power of shared understanding.
                  </p>
                </div>
              </div>
              <p>
                The Monolith itself is a manifestation of their eternal struggle—neither can destroy the other, so the world fractures between painted reality and written truth.
              </p>
            </section>

            {/* The Discovery */}
            <section>
              <h2 className="text-2xl font-light text-primary mb-4">What They Found</h2>
              <p className="mb-4">
                As Expedition 33 pushed deeper into the Monolith's domain, they discovered that the curse was not simply a malevolent force, but a  <strong className="text-accent">broken mechanism</strong>—an ancient system designed to maintain balance between realities that had malfunctioned over millennia.
              </p>
              <p className="mb-4">
                The painted statues weren't destroyed; they existed in a liminal space between flesh and pigment, trapped in the threshold between the Painter's realm and the Writer's domain. Some could be saved, but doing so required unimaginable sacrifice.
              </p>
              <p>
                The expedition learned that previous attempts to reach the Monolith had all failed, not because they lacked strength, but because they didn't understand the nature of the choice before them: To destroy the Monolith would be to choose one philosophy over the other, potentially unraveling reality itself.
              </p>
            </section>

            {/* The Legacy */}
            <section>
              <h2 className="text-2xl font-light text-secondary mb-4">The Legacy</h2>
              <p className="mb-4">
                The events of Expedition 33 left ripples across the world. Some members of the expedition survived, forever changed by what they witnessed. Others were transformed, existing now in that threshold state between realities.
              </p>
              <p className="mb-4">
                The world remains fractured, caught between painted dreams and written truth. But now, some understand the nature of that fracture—and perhaps, understanding is the first step toward healing.
              </p>
              <p>
                The stories you'll experience in <strong>Fractured Paths</strong> follow characters whose fates were touched by Expedition 33, exploring the aftermath of those world-shaking discoveries.
              </p>
            </section>
          </div>
        </div>

        {/* Continue Section */}
        <div className="glass rounded-lg p-6 text-center">
          <h3 className="text-xl font-light text-foreground mb-3">
            Ready to Continue?
          </h3>
          <p className="text-muted-foreground mb-6">
            Choose a character path to experience the stories that unfold in the wake of Expedition 33.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/stories/verso"
              className="px-6 py-3 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition-all font-light"
            >
              Verso's Path
            </Link>
            <Link
              href="/stories/maelle"
              className="px-6 py-3 bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30 rounded-lg transition-all font-light"
            >
              Maelle's Path
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

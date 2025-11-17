import { notFound } from 'next/navigation'
import StoryEngine from '@/components/story/StoryEngine'
import { StoryRouteId, StoryNode } from '@/lib/story/types'
import versoData from '@/data/stories/verso.json'
import maelleData from '@/data/stories/maelle.json'

// Type for the story data structure
interface StoryData {
  route: {
    id: StoryRouteId
    name: string
    character: string
    subtitle: string
    description: string
    startNodeId: string
    totalChapters: number
  }
  nodes: StoryNode[]
}

const storyData: Record<string, StoryData> = {
  verso: versoData as StoryData,
  maelle: maelleData as StoryData
}

export default function StoryPlayPage({
  params
}: {
  params: { route: string }
}) {
  const data = storyData[params.route]

  if (!data) {
    notFound()
  }

  return (
    <StoryEngine
      routeId={data.route.id}
      nodes={data.nodes}
      startNodeId={data.route.startNodeId}
      totalChapters={data.route.totalChapters}
    />
  )
}

export function generateStaticParams() {
  return [
    { route: 'verso' },
    { route: 'maelle' }
  ]
}

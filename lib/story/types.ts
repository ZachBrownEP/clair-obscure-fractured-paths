// Story system type definitions for Clair Obscur: Fractured Paths

export type StoryRouteId = "verso" | "maelle";

// Effects that can be applied when a choice is made
export interface StoryChoiceEffectStat {
  type: "stat";
  key: "painterAlignment" | "writerAlignment" | "balance";
  delta: number;
}

export interface StoryChoiceEffectFlag {
  type: "flag";
  key: string;
  value: boolean;
}

export type StoryChoiceEffect = StoryChoiceEffectStat | StoryChoiceEffectFlag;

// A choice the player can make
export interface StoryChoice {
  id: string;
  label: string;
  nextId: string;
  effects?: StoryChoiceEffect[];
  // Optional: only show this choice if a condition is met
  condition?: {
    type: "flag" | "stat";
    key: string;
    value?: boolean | number;
    min?: number;
    max?: number;
  };
}

// A single node/scene in the story
export interface StoryNode {
  id: string;
  route: StoryRouteId;
  chapter: number;
  title?: string; // Optional scene title
  text: string; // The narrative text
  choices: StoryChoice[];
  isEnding?: boolean;
  endingKey?: string; // e.g. "verso_mediator", "maelle_dual_self"
  endingTitle?: string;
}

// Record of a choice made by the player
export interface ChoiceHistoryEntry {
  nodeId: string;
  nodeTitle?: string;
  choiceId: string;
  choiceLabel: string;
  timestamp: number;
  statChanges?: {
    painterAlignment?: number;
    writerAlignment?: number;
    balance?: number;
  };
  flagsSet?: Record<string, boolean>;
  chapter: number;
}

// The player's current state in a story
export interface StoryState {
  routeId: StoryRouteId;
  currentNodeId: string;
  stats: {
    painterAlignment: number; // 0-100
    writerAlignment: number; // 0-100
    balance: number; // 0-100
  };
  flags: Record<string, boolean>;
  seenNodes: string[];
  currentChapter: number;
  choiceHistory: ChoiceHistoryEntry[]; // Track all choices made
  startTime?: number; // When playthrough started
}

// Route metadata
export interface StoryRoute {
  id: StoryRouteId;
  name: string;
  character: string;
  subtitle: string;
  description: string;
  startNodeId: string;
  totalChapters: number;
}

// Ending metadata
export interface StoryEnding {
  key: string;
  route: StoryRouteId;
  title: string;
  description: string;
  unlockConditions?: {
    minPainterAlignment?: number;
    maxPainterAlignment?: number;
    minWriterAlignment?: number;
    maxWriterAlignment?: number;
    requiredFlags?: string[];
  };
}

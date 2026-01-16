
export enum View {
  SPLASH = 'splash',
  DASHBOARD = 'dashboard',
  CAMERA = 'camera',
  RESULT = 'result',
  PROFILE = 'profile',
}

export interface Idea {
  title: string;
  description: string;
  icon: string;
}

export interface FamilyMember {
  name: string;
  relation: string;
  avatarUrl: string;
  lastCall?: string;
}

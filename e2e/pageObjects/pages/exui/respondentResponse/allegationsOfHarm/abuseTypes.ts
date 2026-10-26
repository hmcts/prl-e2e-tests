/** Types of abuse, as labelled on the allegations of harm pages. */
export enum AbuseType {
  physical = "Physical abuse",
  psychological = "Psychological abuse",
  sexual = "Sexual abuse",
  emotional = "Emotional abuse",
  financial = "Financial abuse",
}

/** Help the respondent sought for a behaviour; omit "who" when they did not seek help. */
export interface SoughtHelp {
  soughtHelp: boolean;
  whoFrom?: string;
}

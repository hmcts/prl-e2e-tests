/** Types of abuse, as labelled on the allegations of harm pages. */
export enum AbuseType {
  physical = "Physical abuse",
  psychological = "Psychological abuse",
  sexual = "Sexual abuse",
  emotional = "Emotional abuse",
  financial = "Financial abuse",
}

export interface SoughtHelp {
  soughtHelp: boolean;
  whoFrom?: string;
}

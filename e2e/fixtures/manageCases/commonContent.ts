import { Config } from "../../config.ts"; // Assuming your Config class is in this file

const getJudgeCredentials = (): { name: string; email: string } => {
  const judgeCredentials = Config.baseUserCredentials.judge;
  const judgeName = judgeCredentials.email.split("@")[0];
  const judgeEmail = judgeCredentials.email;
  return { name: judgeName, email: judgeEmail };
};

const judgeCredentials = getJudgeCredentials();

export const CommonContent = {
  logo: "MyHMCTS",
  manageCases: "Manage Cases",
  signOut: "Sign out",
  caseList: "Case list",
  createCase: "Create case",
  noticeOfChange: "Notice of change",
  findCase: "Find case",
  betaContent:
    "This is a new service - your feedback(Opens in a new window) will help us to improve it.",
  welshTranslationButton: "Cymraeg",
  judgeName: judgeCredentials.name,
  judgeEmail: judgeCredentials.email,
  judgeNameAndEmail: `${judgeCredentials.name} (${judgeCredentials.email})`,
};

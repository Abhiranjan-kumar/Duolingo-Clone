import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2dr0UcA3Yhx4tuqAofCyAwrmdrz",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1
}
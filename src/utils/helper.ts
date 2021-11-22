import axios from "axios";

const checkStringForEmail = (text: string): string | null => {
  const email = text.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi
  );
  if (!email) return null;

  return email[0];
};

const fetchUsernameByEmail = async (email: string): Promise<string | null> => {
  try {
      const result = await axios.get(`${process.env.SEARCH_BY_MAIL_ENDPOINT}?email=${email}`);
      const { displayName } = result.data;
      return displayName;
    } catch (error) {
      console.log({ error });
    }
    return null;
};

export { checkStringForEmail, fetchUsernameByEmail };
